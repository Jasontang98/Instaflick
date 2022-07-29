import { getAllImages } from "../../../../react-app/src/store/images.js";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { addALike, deleteALike } from "../../store/image-likes";
import "./feed.css";

const Images = () => {
	const dispatch = useDispatch();
	const imagesObject = useSelector((state) => state.images);
	const images = Object.values(imagesObject);

	const sessionUser = useSelector((state) => state.session.user);

	const [users, setUsers] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await fetch("/api/users/");
			const responseData = await response.json();
			setUsers(responseData.users);
		}
		fetchData();
	}, []);

	useEffect(() => {
		dispatch(getAllImages());
	}, [dispatch]);

	if (!sessionUser) return <Redirect to="/login" />;

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
