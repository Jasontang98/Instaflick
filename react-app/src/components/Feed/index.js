import { getAllImages } from '../../../../react-app/src/store/images/index.js';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './feed.css';

const Images = () => {
    const dispatch = useDispatch();
    const imagesObject = useSelector((state) => state.images);
    const images = Object.values(imagesObject);

    useEffect(() => {
        dispatch(getAllImages());
    }, [dispatch]);

    return (
        <div className="tester">
            <div className="images-background-image">
                <div className="all-images-container">
                    {images.map((image) => (
                        <div className="image-container" key={image.id}>
                            <NavLink exact to={`/images/${image.id}`}>
                                <img
                                    className="image-frame"
                                    src={image.image_url}
                                />
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Images;
