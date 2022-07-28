export const GET_USERS = '/api/users';
export const GET_USER = '/api/users/:id';
// export const PUT_USER = '/api/users/:id';
// export const DELETE_USER = '/api/users/:id';

const getUsers = (users) => ({
	type: GET_USERS,
	users,
});

const getUser = (user) => ({
	type: GET_USER,
	user,
});

// const editUser = (user) => ({
// 	type: PUT_USER,
// 	user,
// });

// const deleteUser = (user) => ({
// 	type: DELETE_USER,
// 	user,
// });

// //EDIT SINGLE USER
// export const editSingleUser = (user) => async (dispatch) => {
// 	const { username, description, file } = user;

// 	const form = new FormData();
// 	form.append('username', username);
// 	form.append('description', description);
// 	form.append('file', file);

// 	const response = await fetch(`/api/users/${user.id}/edit`, {
// 		method: 'PUT',
// 		body: form,
// 	});

// 	if (response.ok) {
// 		const data = await response.json();
// 		dispatch(editUser(data));
// 		return data;
// 	}
// };

// GET ALL USERS
export const getAllUsers = () => async (dispatch) => {
	const response = await fetch('/api/users');
	if (response.ok) {
		const users = await response.json();
		dispatch(getUsers(users));
	}
};

//GET SINGLE USER
export const getSingleUser = (id) => async (dispatch) => {
	const response = await fetch(`/api/users/${id}`);
	if (response.ok) {
		const user = await response.json();
		dispatch(getUser(user));
    return user
	}
};

//DELETE SINGLE USER
// export const deleteSingleUser = (id) => async (dispatch) => {
// 	const response = await fetch(`/api/users/${id}`, {
// 		method: 'DELETE',
// 	});
// 	if (response.ok) {
// 		const data = await response.json();
// 		dispatch(deleteUser(data.id));
// 	}
// };

// REDUCERS
const initialState = {};

export default function userReducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case GET_USERS:
      const users = action.users;
			newState = { ...state };
			users.users.forEach((user) => {
				newState[user.id] = user;
			});
			return newState;
		case GET_USER:
			return { [action.user.id]: action.user };
		// case PUT_USER:
		// 	return { ...state, [action.user.id]: { ...action.user } };
		// case DELETE_USER:
		// 	return delete { ...state, [action.user.id]: action.user.id };
		default:
			return state;
	}
}
