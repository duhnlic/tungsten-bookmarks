import {useContext} from 'react';

import {DataContext} from '../../App';

const BookmarkList= ({handleDelete, setSubmitMode, setFormData}) => {
    const data = useContext(DataContext);
    console.log(data);



    return (
        <div>
            <h2>Your Bookmarks</h2>
            <div>
                <ul>
                    {data.map((bookmarks, i) =>{
                        return(
                        <div key={bookmarks.i}>
                            <div>
                                <li>{bookmarks.label}</li>
                                <li><a href={bookmarks.url}>{bookmarks.url}</a></li>
                                <li>{bookmarks.tags[0]}</li>
                                <li>{bookmarks.tags[1]}</li>
                                <li>{bookmarks.tags[2]}</li>      
                            </div>
                            <div>
                                <button
                                    onClick={() => { 
                                        handleDelete(bookmarks._id)
                                    }
                                }>
                                    Delete
                                </button>
                            </div>
                            <div>
                                <button
                                    onClick={() => { 
                                        setSubmitMode("PUT")
                                        setFormData({...bookmarks})
                                        // handleDelete(bookmarks._id)
                                    }
                                }>
                                    Update
                                </button>
                            </div>                            
                        </div>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default BookmarkList;