import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Redirect, NavLink } from "react-router-dom";
import { editSingleUser } from "../../store/user"

const EditUser = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user);

    const [username, setUsername] = useState(user.username);
    const [description, setDescription] = useState(user.description);
    const [file, setFile] = useState(user.prof_pic_url);
    const [validationErrors, setValidationErrors] = useState([]);

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = [];

        // if (description.length > 500) errors.push("Content is too long");

        if (errors.length) {
            setValidationErrors(errors);
            return;
        }

        const data = {
            description,
            file,
            username,
            id: user?.id
        }

        dispatch(editSingleUser(data))
        history.push(`/users/${user.id}`)
    }

    const handleChange = async (e) => {
        const uploadFile = e.target.files[0];
        setFile(uploadFile);
        };


    return (
        <div>
            <div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <ul>
                            {validationErrors.map((error, idx) => (
                                <li className="errors-signup" key={idx}>
                                    {error}
                                </li>
                            ))}
                        </ul>
                        <input
                        className="username-field"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                        <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        />
                        <input
                        type="file"
                        name="profile picture"
                        onChange={handleChange}
                        accept=".jpg, .jpeg, .png, .gif, .jfif"
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
 );
}

export default EditUser;
