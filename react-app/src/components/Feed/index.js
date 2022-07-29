
import { getAllImages } from '../../../../react-app/src/store/images.js';
import { getCommentsByImage } from '../../store/comments.js';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import {
	getLikesByImage,
	addALike,
	deleteALike,
} from '../../store/image-likes';
import './feed.css';

const Images = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const imagesObject = useSelector((state) => state.images);
	const images = Object.values(imagesObject);
	const sessionUser = useSelector((state) => state.session.user);
	console.log(sessionUser, '--------------------------');
	// const likesObject = useSelector((state) => state.likes);
	const [users, setUsers] = useState([]);
	const [like, setLike] = useState(false);
	// console.log(likesObject,' 8788888888888888888888')



	useEffect(() => {
		async function fetchData() {
			const response = await fetch('/api/users/');
			const responseData = await response.json();
			setUsers(responseData.users);
		}
		fetchData();
	}, []);

	useEffect(() => {
		dispatch(getAllImages()).then(
			async () =>
				await dispatch(getCommentsByImage(id)).then(
					async () => await dispatch(getLikesByImage(id))
				)
		);
	}, [dispatch, id]);

	if (!sessionUser) return <Redirect to="/login" />;


	const singleImage = Object.values(images.map((image) => {}));
	console.log(singleImage, '4544444444444444444444444');
	// const newVariable = Object.values(singleImage)

	// const handleLikes = async (image) => {
	// 	if (image?.likes.length) {
	// 		await dispatch(addALike(likesObject?.image_id));
	// 		setLike(true);
	// 	}
	// };

	// let image_id;
	// images.map((image) => {
	//   console.log(image.likes, '7777777777777777777777777777')
	// 	image_id = image?.id;
	// });

	// const likePic = (image_id) => {
	// 	dispatch(addALike(image_id));
	// };

	return (
		<div className="wholepage">
			<div className="column-container">
				{images.map((image) => (
					<div className="card-container">
						<div className="image-container" key={image.id}>
							<div>
								{users.map((user) => {
									return (
										<>
											<div
												className="prof-pic-contain"
												key={user.prof_pic_url}
											>
												{user?.id === image?.user_id ? (
													<>
														<NavLink
															exact
															to={`/users/${image.user_id}`}
														>
															<img
																src={user?.prof_pic_url}
																alt="prof_pic_url"
																id="prof_pics"
															/>
														</NavLink>
														<div />
														<NavLink
															className="userName"
															exact
															to={`/users/${image.user_id}`}
														>
															<p>{user.username}</p>
														</NavLink>

														<NavLink to={`/images/${image.id}`}>
															<img
																alt="uploaded"
																className="image-frame"
																src={image.image_url}
																id="feed_img"
															/>
														</NavLink>
														{console.log(
															image,
															'ADDING SOME SHIT 00000000000000000'
														)}

														<button
															onClick={() =>
																dispatch(addALike(image, sessionUser.id))
															}
															type="submit"
														>
															Like
														</button>
														<button
															onClick={() =>
																dispatch(deleteALike(image, sessionUser.id))
															}
															type="submit"
														>
															Dislike
														</button>
														{/* <div>{myFunc(image)} Likes </div> */}
														<NavLink
															className="userName"
															exact
															to={`/users/${image.user_id}`}
														>
															<p>{user.username}</p>
														</NavLink>
													</>
												) : (
													<></>
												)}
											</div>
										</>
									);
								})}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);

};

export default Images;
