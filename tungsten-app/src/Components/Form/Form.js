import {useContext} from 'react';

import {DataContext} from '../../App';

const Form= ({handleSubmit, handleChange, formData, submitMode}) => {
    const data = useContext(DataContext);
    console.log(data);



    return (
        <div className="submit">
            <form
                onSubmit={handleSubmit}
                className="form-submit"
                >
            <h3 className="create-header">Create New Bookmark</h3>
            <label className="label-input">
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
            <label className="url-input">
                Url:{" "}
            <input
                type="text"
                id="url"
                value={formData.url}
                onChange={handleChange}
                placeholder={"enter url..."}
            ></input>{" "}
            </label>
            <label className="tags-input">
                Tags:{" "}
            <input
                type="text"
                id="tags"
                value={Array.isArray(formData.tags) ? formData.tags.join(" ") : formData.tags}
                onChange={handleChange}
                placeholder={"separate tags w/ a space..."}
            ></input>{" "}
            </label>
                <button className="btn btn-submit" type="submit">{submitMode === "POST" ? "Submit" : "Update"}</button>
            </form>
        </div>
    )
}

export default Form;