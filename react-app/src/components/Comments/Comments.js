import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Redirect } from "react-router-dom";
import EditComment from "../EditComment";

import {
  getCommentsByImage,
  deleteAComment,
  addAComment,
} from "../../store/comments";

const Comments = ({ setShowModal }) => {
  const history = useHistory();

  const dispatch = useDispatch();

  const { id } = useParams();

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
      return;
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
        <h1 className="comments-single-image">Comments</h1>
        <div className="comments">
          {comments.map((comment) => {
            return (
              <div className="new-comment-div" key={comment.id}>
                <p className="ptagz-comments">{comment?.comment}</p>
                <p className="ptagz-username">{comment?.username}</p>
                {users.map((user) => {
                  return (
                    <>
                      <div className="prof-pic-contain" key={user.prof_pic_url}>
                        {user?.id === comment?.user_id ? (
                          <>
                            <img
                              src={user.prof_pic_url}
                              alt="prof pic"
                              key={user.id}
                            ></img>
                            <div>{comment.likes}</div>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </>
                  );
                })}

                <div className="dlt-button-container">
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
          <ul>
            {validationErrors.map((error, idx) => (
              <li className="errors-signup" key={idx}>
                {error}
              </li>
            ))}
          </ul>
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
            Submit
          </button>
        </form>
      </>
    )
  );
};

export default Comments;
