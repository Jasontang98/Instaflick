import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { getSingleUser } from "../../store/user";
import { editSessionUser, deleteSingleUser } from "../../store/session";
import "./editUser.css";
import ChangePicture from "../ChangePicture";
// import RemoveAccountModal from "../../context/RemoveAccountModal/removeaccountmodal";

const EditUser = () => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.session.user);

  const user = useSelector((state) => state.session.user);

  const [username, setUsername] = useState(user?.username);

  const [description, setDescription] = useState(user?.description);
  const [file] = useState(user?.prof_pic_url);
  const [validationErrors, setValidationErrors] = useState([]);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];

    if (username.length > 40)
      errors.push("Username cannot be more than 40 characters long.");

    if (description.length > 500)
      errors.push("Description cannot be more than 500 characters.");

    if (errors.length) {
      setValidationErrors(errors);
      return errors;
    }

    const data = {
      description,
      file,
      username,
      id: user?.id,
    };

    await dispatch(getSingleUser(user?.id));
    await dispatch(editSessionUser(data));
    history.push(`/users/${user?.id}`);
  };

  const confirmDelete = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to remove your account from Instaflick?")) {
      dispatch(deleteSingleUser(user?.id)).then(history.push("/login"));
    }
  };

  if (!account) return <Redirect to="/login" />;

  return (
    <div className="mother-mount-container">
      <div>
        <div>
          <div className="mother-mount-container-child">
            <span></span>
            <span></span>
            <div className="mother-mount-container-child">
              <div className="mother-mount-container-grandchild">
                <div className="mother-mount-container-great-grandchild">
                  <div className="possible-header-container">
                    <div className="possible-header-container-child">
                      <div className="possible-header-container-grand-child">
                        <section className="edit-profile-section">
                          <div className="edit-profile-section-child">
                            <main className="edit-main-container" role="main">
                              <div className="edit-main-container-card">
                                <article className="edit-main-container-card-child">
                                  <div className="profilepic-username-change-container">
                                    <div className="editpage-profilepic-container">
                                      <div className="profile-pic-on-editpage">
                                        <img
                                          src={user?.prof_pic_url}
                                          alt="profile pic"
                                        />
                                      </div>
                                    </div>
                                    <div className="editprofile-page-username-and-button-container">
                                      <h1
                                        className="editprofile-page-username"
                                        tabIndex="-1"
                                      >
                                        {" "}
                                        {username}
                                      </h1>
                                      <ChangePicture />
                                    </div>
                                  </div>
                                  <form
                                    className="edit-profile-main-form"
                                    onSubmit={handleSubmit}
                                  >
                                    <div className="username-main-container">
                                      <aside className="username-left-side-container">
                                        <label className="username-left-side-text">
                                          Username
                                        </label>
                                      </aside>
                                      <div className="username-right-side-container">
                                        <div className="username-right-side-container-child">
                                          <input
                                            className="username-input-edit-profile"
                                            placeholder="Username"
                                            required
                                            value={username}
                                            onChange={(e) =>
                                              setUsername(e.target?.value)
                                            }
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="username-main-container">
                                      <aside className="username-left-side-container">
                                        <label className="username-left-side-text">
                                          Bio
                                        </label>
                                      </aside>
                                      <div className="username-right-side-container">
                                        <textarea
                                          className="edit-profile-bio-text-area"
                                          value={description}
                                          onChange={(e) =>
                                            setDescription(e.target?.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="username-main-container">
                                      <aside className="username-left-side-container-2">
                                        <label className="username-left-side-text"></label>
                                      </aside>
                                      <div className="username-right-side-container">
                                        <div className="edit-profile-buttons-container">
                                          <button
                                            className="edit-profile-buttons-submit"
                                            type="submit"
                                            id="edit-prof-submit"
                                          >
                                            Submit
                                          </button>
                                          <div className="delete-account-button-container">
                                            <button
                                              className="delete-account-button"
                                              type="submit"
                                              onClick={() => confirmDelete()}
                                            >
                                              Remove my account from Instaflick
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="error-handler-login">
                                      {validationErrors.map((error, ind) => (
                                        <div className="error-ptag" key={ind}>
                                          {error}
                                        </div>
                                      ))}
                                    </div>
                                  </form>
                                </article>
                              </div>
                            </main>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
