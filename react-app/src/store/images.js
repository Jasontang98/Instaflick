// import { csrfFetch } from "./csrf";

export const GET_IMAGES = '/feed/getImages';
export const GET_IMAGE = '/images/getImage';
export const ADD_IMAGE = '/images/addImage';
export const EDIT_IMAGE = '/images/editImage';
export const REMOVE_IMAGE = '/images/removeImage';

const getImages = (images) => ({
	type: GET_IMAGES,
	images,
});

const getImage = (image) => ({
	type: GET_IMAGE,
	image,
});

const addImage = (image) => ({
	type: ADD_IMAGE,
	image,
});

const editImage = (image) => ({
	type: EDIT_IMAGE,
	image,
});

const removeImage = (id) => ({
	type: REMOVE_IMAGE,
	id,
});

// GET ALL IMAGES
export const getAllImages = () => async (dispatch) => {
	const response = await fetch('/api/images/feed');
	console.log(response);

	if (response.ok) {
		const data = await response.json();
		dispatch(getImages(data));
	}
};

// GET SINGLE IMAGE
export const getSingleImage = (id) => async (dispatch) => {
	const response = await fetch(`/api/images/${id}`);

	if (response.ok) {
		const data = await response.json();
		dispatch(getImage(data));
		return data;
	}
};

// GET USERS' IMAGES
export const getImagesByUser = (userId) => async (dispatch) => {
	const response = await fetch(`/api/images/${userId}`);

	if (response.ok) {
		const data = await response.json();
		dispatch(getImages(data, userId));
	}
};

// POST
export const uploadImage = (image) => async (dispatch) => {
	const { user_id, description, file } = image;

	const form = new FormData();
	form.append('user_id', user_id);
	form.append('description', description);
	form.append('file', file);
	console.log(form);
	const response = await fetch('/api/images/', {
		method: 'POST',
		body: form,
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(addImage(data));
		return data;
	}
};

// // PUT
export const editSingleImage = (image) => async (dispatch) => {
	const { description, id } = image;
	const response = await fetch(`/api/images/edit/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ description }),
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(editImage(data));
		return data;
	}
};

// DELETE
export const deleteSingleImage = (id) => async (dispatch) => {
	const response = await fetch(`/api/images/${id}`, {
		method: 'DELETE',
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(removeImage(data.id));
	}
};

/* REDUCERS */
const initialState = {};

const imageReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case GET_IMAGES:
			const images = action.images;
			newState = { ...state };
			images.images.forEach((image) => {
				newState[image.id] = image;
			});
			return newState;
		case GET_IMAGE:
			return { ...state, [action.image.id]: action.image };
		case ADD_IMAGE:
			return { ...state, [action.image.id]: action.image };
		case EDIT_IMAGE:
			return { ...state, [action.image.id]: { ...action.image } };
		case REMOVE_IMAGE:
			return delete { ...state, [action.id]: action.id };
		default:
			return state;
	}
};

export default imageReducer;
