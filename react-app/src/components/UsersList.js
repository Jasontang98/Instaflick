import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAllUsers } from "../store/user";
import { useSelector, useDispatch } from "react-redux";

function UsersList() {
  const dispatch = useDispatch();
  const usersObject = useSelector((state) => state.user);
  let users;
  if (usersObject) {
    users = Object?.values(usersObject);
  }

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const userComponents = users.map((user) => {
    return (
      <li key={user.id}>
        <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
      </li>
    );
  });

  return (
    <>
      <h1>User List: </h1>
      <ul>{userComponents}</ul>
    </>
  );
}

export default UsersList;
