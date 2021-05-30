import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import BookmarkList from './Components/BookmarkList/BookmarkList';
import Form from './Components/Form/Form';

export const DataContext = React.createContext();


export function App() {


    /* Authentication */
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [loginForm, setLoginForm] = useState({
      username: "",
      password: ""
    });
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:8000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ ...loginForm })
        });
        const data = await response.json();
        if (data.token) {
          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("username", data.username);
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    const handleLogout = () => {
      window.localStorage.clear();
      setLoggedIn(false);
    };
  
    const handleLoginChange = (e) => {
      setLoginForm({ ...loginForm, [e.target.id]: e.target.value });
    };
  
    /* END AUTHENTICATION */



  // Get/Read Bookmarks
  const [bookmarks, setBookmarks] = useState([])
  const getBookmarkData = async () => {
    try{
      const result = await fetch(
        `http://localhost:8000/user/${window.localStorage.getItem(
          "username"
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );
      const data = await result.json();
      setBookmarks([...data.bookmarks]);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getBookmarkData();
  }, []);


  // Create
  const [formData, setFormData] = useState({
  label: "",
  url: "",
  tags: []
  });

  const createBookmark = async (e) => {
  e.preventDefault();
  const body = { ...formData };
  try {
  // const response = await fetch("http://localhost:8000/bookmarks", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify(body)
  // });
  // const bookmark = await response.json();
  const addBookmark = await fetch(
    "http://localhost:8000/user/addBookmarkToUser",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${window.localStorage.getItem("token")}`

      },
      body: JSON.stringify({
        ...body,
        username: window.localStorage.getItem("username")
      })
    }
  );
  const data = await addBookmark.json();
  setFormData({
    label: "",
    url: "",
    tags: []
  });
  } catch (err) {
  console.error(err);
  } finally {
  await getBookmarkData();
  }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (e.target.id === "tags"){
      setFormData({...formData, "tags": e.target.value.split(" ")})
    }
  };


  // Update
  const [submitMode, setSubmitMode] = useState('POST');
  
  const updateBookmark = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/bookmarks/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({...formData})
      });
      const data = await response.json();
      setFormData({
        label: "",
        url: "",
        tags: []
      });
    } catch (error) {
      console.error(error);
    } finally {
      await getBookmarkData();
    }
  };
  
  const handleSubmit = (e) => {
    if (submitMode === "POST"){
      createBookmark(e)
    } else {
      updateBookmark(e)
    }

    setSubmitMode("POST")
  }



  // Delete
  const deleteBookmark = async (id) => {
    try {
        await fetch(`http://localhost:8000/bookmarks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }); 
    } catch (error) {
      console.error(error);
    } finally {
      await getBookmarkData();
    }
  };

  useEffect(() => {
    getBookmarkData();
  }, []);

  function handleDelete(e) {
    deleteBookmark(e);
    };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);
  useEffect(() => {
    if (isLoggedIn) {
      getBookmarkData();
    }
  }, [isLoggedIn]);


  return (
    <div>
      {isLoggedIn ?(
        <>
      <div className="app-header">
          <h1>TUNGSTEN BOOKMARKS</h1>
          <button className="logout" onClick={handleLogout}>Log Out Here</button>
      </div>
      <div className="app-body">
        <DataContext.Provider value={bookmarks}>
          <Router>
            {/* <Switch>
              <Route path='/bookmarks' component={bookmarks}/>
            </Switch> */}
            <Form
              formData={formData}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              submitMode={submitMode}
            />
            <BookmarkList
              handleDelete={handleDelete}
              setSubmitMode={setSubmitMode}
              setFormData={setFormData}
            />
          </Router>
        </DataContext.Provider>
      </div>
        </>
    ) : (
      <>
        <center>
            <h1>Login To Tungsten</h1>
          </center>
          <form onSubmit={handleLogin}>
            <label>
              {" "}
              Username:{" "}
              <input
                type="text"
                id="username"
                value={loginForm.username}
                onChange={handleLoginChange}
              />
            </label>
            <br />
            <br />
            <label>
              {" "}
              Password:{" "}
              <input
                type="password"
                id="password"
                value={loginForm.password}
                onChange={handleLoginChange}
              />
            </label>
            <br />
            <input type="submit" />
          </form>
      </>

    )}
    </div>
  );
}

export default App;

