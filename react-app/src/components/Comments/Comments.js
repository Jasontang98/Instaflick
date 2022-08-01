import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Redirect, NavLink } from "react-router-dom";
import EditComment from "../EditComment";
// import { getSingleImage } from "../../store/images";
import { addALike, deleteALike } from "../../store/image-likes";
import "./comments.css";

import {
  getCommentsByImage,
  deleteAComment,
  addAComment,
} from "../../store/comments";

const Comments = ({ setShowModal }) => {
  const history = useHistory();

  const dispatch = useDispatch();

  const { id } = useParams();
  const oneImage = useSelector((state) => state.images[id]);
  const sessionUser = useSelector((state) => state.session.user);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const account = useSelector((state) => state.session.user);
  const comments = Object.values(useSelector((state) => state.comments));

  const [comment, setComment] = useState("");

  const [isLoaded, setLoaded] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    dispatch(getCommentsByImage(id)).then(() => setLoaded(true));
  }, [id, dispatch]);

  const notLoggedIn = () => {
    if (!account) history.push("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors([]);
    const errors = [];

    if (comment.length > 500) errors.push("Comment is too long");
    if (errors.length) {
      setValidationErrors(errors);
      return errors;
    }

    const data = {
      comment,
      user_id: account?.id,
      image_id: id,
      username: account.username,
    };

    await dispatch(addAComment(data));
    setComment("");
  };

  if (!account) return <Redirect to="/login" />;

  return (
    isLoaded && (
      <>
        <div className="all-comment">
          {comments.map((comment) => {
            return (
              <div className="new-comment-div" key={comment.id}>
                <div className="comment-name-description-profile">
                  {users.map((user) => {
                    return (
                      <>
                        <div className="all-comment">
                          <div className="prof-pic-contain" key={user.prof_pic_url}>
                            {user?.id === comment?.user_id ? (
                              <>
                                <div className="comment-container">
                                  <NavLink
                                    exact
                                    to={`/users/${user.id}`}>
                                    <img
                                      id="comment-prof-pic"
                                      src={user.prof_pic_url}
                                      alt="prof pic"
                                      key={user.id}
                                    ></img>
                                  </NavLink>
                                  <div className="comment-name">
                                    <NavLink
                                      exact
                                      className="comment-navlink"
                                      to={`/users/${user.id}`}>
                                      <p>{comment?.username}</p>
                                    </NavLink>
                                  </div>
                                  <div className="comment-comment">

                                    <p className="ptagz-comments">{comment?.comment}</p>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="edit-comment-delete">
                  {comment?.user_id === account.id ? (
                    <>
                      <div>
                        <EditComment editedComment={comment} />
                      </div>

                      <button
                        className="delete-comment-btn"
                        onClick={() =>
                          dispatch(deleteAComment(id, comment.id)).then(() =>
                            dispatch(getCommentsByImage(id))
                          )
                        }
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <></>
                  )}

                </div>
              </div>
            );
          })}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="errors-handler-login">
            {validationErrors.map((error, ind) => (
              <div className="error-ptag" key={ind}>
                {error}
              </div>
            ))}
          </div>
          <div className="single-like">
            <div id="like-heart">
              {oneImage.likes.filter((like) => {
                return sessionUser.id === like.user_id;
              }).length === 0 ? (



                <img
                  className="like-button"
                  src="https://i.imgur.com/JEkOshg.png"
                  onClick={() => dispatch(addALike(oneImage, sessionUser.id))}
                  type="submit"
                  alt="like-button"
                ></img>

              ) : (
                <img
                  className="like-button"
                  src="https://i.imgur.com/XXQN4Dk.png"
                  onClick={() => dispatch(deleteALike(oneImage, sessionUser.id))}
                  type="submit"
                  alt="dislike-button"
                ></img>

              )}
            </div>
            <div className="feed-likes-number">
              {oneImage.likes.length === 1
                ? `${oneImage.likes.length} like`
                : `${oneImage.likes.length} likes`}
            </div>
          </div>
          <div className="comment-submit-container">
          <textarea
            className="comment-text-area"
            placeholder="Add a comment"
            value={comment}
            required
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="single-image-submit-btn"
            onClick={notLoggedIn}
            type="submit"
          >
            Post
          </button>
          </div>
        </form>
      </>
    )
  );
};

export default Comments;
