import { getAllImages } from "./images";
export const GET_LIKES = "likes/getLikes";
export const ADD_LIKE = "likes/addLike";
export const DELETE_LIKE = "likes/deleteLike";

const getLikes = (likes) => ({
  type: GET_LIKES,
  likes,
});

const addLike = (like) => ({
  type: ADD_LIKE,
  like,
});

const deleteLike = (id) => ({
  type: DELETE_LIKE,
  id,
});

export const getLikesByImage = (id) => async (dispatch) => {
  const response = await fetch(`/api/images/${id}/likes`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getLikes(data));
    return data;
  }
};

export const addALike = (image, userId) => async (dispatch) => {
  const form = new FormData();
  form.append("user_id", userId);
  form.append("id", image.id);

  const response = await fetch(`/api/likes/${image.id}`, {
    method: "POST",
    body: form,
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addLike(data));
    dispatch(getAllImages());
    return data;
  }
};

export const deleteALike = (image, userId) => async (dispatch) => {
  const likes = image.likes.map((like) => {
    return like;
  });
  const likeId = likes.filter((like) => like.user_id === userId)[0];

  const response = await fetch(`/api/likes/${image.id}/like/${likeId.id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteLike(likeId.id));
    dispatch(getAllImages());
    return data;
  }
};

const initialState = {};

const image_likes_reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_LIKES:
      newState = {};
      action.likes.forEach((like) => {
        newState[like.id] = like;
      });
      return newState;
    case ADD_LIKE:
      newState = { ...state };
      newState[action.like.id] = action.like;
      return newState;
    case DELETE_LIKE:
      newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default image_likes_reducer;
