export const GET_USERS = "/api/users";
export const GET_USER = "/api/users/:id";
export const PUT_USER = "/api/users/:id";
export const DELETE_USER = "/api/users/:id";

const getUsers = (users) => ({
  type: GET_USERS,
  users,
});

const getUser = (user) => ({
  type: GET_USER,
  user,
});

const editUser = (user) => ({
  type: PUT_USER,
  user,
});

const deleteUser = (user) => ({
  type: DELETE_USER,
  user,
});

// GET ALL USERS
export const getAllUsers = () => async (dispatch) => {
  const response = await fetch("/api/users");
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
  }
};

//EDIT SINGLE USER
export const editSingleUser = (user) => async (dispatch) => {
  const response = await fetch(`/api/users/${user.id}`, {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(editUser(data));
    return data;
  }
};

//DELETE SINGLE USER
export const deleteSingleUser = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteUser(data.id));
  }
};
