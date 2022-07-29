import { getAllImages } from "./images";
export const GET_LIKES = 'likes/getLikes';
export const ADD_LIKE = 'likes/addLike';
export const DELETE_LIKE = 'likes/deleteLike';

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

export const getLikesByImage = (image_id) => async (dispatch) => {
	const response = await fetch(`/api/images/${image_id}/likes`);

	if (response.ok) {
		const data = await response.json();
		dispatch(getLikes(data));
		return data;
	}
};

export const addALike = (image, userId) => async (dispatch) => {
	// const { user_id, id } = data;
	// console.log(data, '1111111111111111111111111')
	// console.log(data.id, '222222222222')

	const form = new FormData();
	form.append('user_id', userId);
	form.append('id', image.id);
	// form.append('username', username);

	const response = await fetch(`/api/likes/${image.id}`, {
		method: 'POST',
		body: form,
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(addLike(data));
		dispatch(getAllImages())
		return data;
	}
};

export const deleteALike = (image, userId) => async (dispatch) => {
	console.log(image.likes, '7777')
	console.log(image, '232323232323')
	const likes = image.likes.map((like) => {

		return like
	})
	const likeId = likes.filter(like => like.user_id === userId)[0]
	console.log(likeId, '=====================')


	console.log(likeId, '333333333333333')
	const response = await fetch(`/api/likes/${image.id}/like/${likeId.id}`, {
		method: 'DELETE',
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(deleteLike(likeId.id));
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

export default image_likes_reducer
