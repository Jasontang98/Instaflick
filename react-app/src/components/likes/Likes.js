import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getLikesByImage,
  addALike,
  deleteALike,
} from "../../store/image-likes";

const ImageLike = ({ imageId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLikesByImage(imageId));
  }, [dispatch, imageId]);

  return <div>Likes</div>;
};

export default ImageLike;
