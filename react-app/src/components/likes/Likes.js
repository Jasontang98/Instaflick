import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLikesByImage } from "../../store/image-likes";

const ImageLike = ({ imageId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLikesByImage(imageId));
  }, [dispatch, imageId]);

  return <div>Likes</div>;
};

export default ImageLike;
