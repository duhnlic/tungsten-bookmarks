import {useContext} from 'react';

import {DataContext} from '../../App';

const BookmarkList= ({handleDelete, setSubmitMode, setFormData}) => {
    const data = useContext(DataContext);
    console.log(data);



    return (
        <div className="bookmark-list">
            <h2>Your Bookmarks</h2>
            <div>               
                {data.map((bookmarks, i) =>{
                    return(
                    <div key={bookmarks.i}>
                        <div>
                            <h4>{bookmarks.label}</h4>
                            <p><a href={bookmarks.url}>{bookmarks.url}</a></p>
                            <div className="tags">
                            <p className="tag-label">{bookmarks.tags[0]}</p>
                            <p className="tag-label">{bookmarks.tags[1]}</p>
                            <p className="tag-label">{bookmarks.tags[2]}</p>
                            </div>      
                        </div>
                        <div className="crud-buttons">
                            <div className="btn-div">
                                <button
                                    className="btn btn-ud"
                                    onClick={() => { 
                                        handleDelete(bookmarks._id)
                                    }
                                }>
                                    Delete
                                </button>
                            </div>
                            <div className="btn-div">
                                <button
                                    className="btn btn-ud"
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
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

export default BookmarkList;