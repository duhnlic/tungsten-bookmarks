import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import BookmarkList from './Components/BookmarkList/BookmarkList';

export const DataContext = React.createContext();


export function App() {



  // Get/Read Bookmarks
  const [bookmarks, setBookmarks] = useState([])
  const getBookmarkData = async () => {
    try{
      const result = await fetch("http://localhost:8000/bookmarks");
      const data = await result.json();
      setBookmarks(data);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getBookmarkData();
  }, []);
  console.log(bookmarks);








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
  const response = await fetch("http://localhost:8000/bookmarks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
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











  return (
    <DataContext.Provider value={bookmarks}>
      <h1>Tungsten Bookmarks</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          border: "2px solid black",
          borderRadius: "25%",
          paddingBottom: "16px",
          boxShadow: "8px 8px 16px rgba(0,0,0, 0.3)"
        }}
      >
        <h3>Create New Bookmark</h3>
        <label>
          Label:{" "}
          <input
            type="text"
            id="label"
            value={formData.label}
            onChange={handleChange}
            placeholder={"enter bookmark label..."}
          ></input>{" "}
        </label>
        <br />
        <label>
          Url:{" "}
        <input
          type="text"
          id="url"
          value={formData.url}
          onChange={handleChange}
          placeholder={"enter url..."}
        ></input>{" "}
        </label>
        <label>
          Tags:{" "}
          <input
            type="text"
            id="tags"
            value={Array.isArray(formData.tags) ? formData.tags.join(" ") : formData.tags}
            onChange={handleChange}
            placeholder={"separate tags w/ a space..."}
            ></input>{" "}
        </label>
        <button type="submit">{submitMode === "POST" ? "Submit" : "Update"}</button>
      </form>
      <Router>
        {/* <Switch>
          <Route path='/bookmarks' component={bookmarks}/>
        </Switch> */}
        <BookmarkList
          handleDelete={handleDelete}
          setSubmitMode={setSubmitMode}
          setFormData={setFormData}
        />
      </Router>
    </DataContext.Provider>
  );
}

export default App;

