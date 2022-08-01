// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const EDIT_USER = "session/EDIT_USER";
const DELETE_USER = "session/DELETE_USER";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const editUser = (user) => ({
  type: EDIT_USER,
  user,
});

const deleteUser = (user) => ({
  type: DELETE_USER,
  user,
});

const initialState = { user: null };

// export const restoreUser = () => async (dispatch) => {
//   const response = await fetch("/api/session");
//   const data = await response.json();
//   dispatch(setUser(data.user));
//   return response;
// };

export const editSessionUser = (user) => async (dispatch) => {
  const { username, description, file } = user;

  const form = new FormData();
  form.append("username", username);
  form.append("description", description);
  form.append("file", file);

  const response = await fetch(`/api/users/${user.id}/edit`, {
    method: "PUT",
    body: form,
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(editUser(data));
    return data;
  }
};

export const deleteSingleUser = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteUser(data.id));
  }
};

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  }
  // else {
  //   return ["An error occurred. Please try again."];
  // }
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  }
  // else {
  //   return ["An error occurred. Please try again."];
  // }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    case EDIT_USER:
      return { user: action.user };
    case DELETE_USER:
      return delete { ...state, [action.user]: action.user };
    default:
      return state;
  }
}
