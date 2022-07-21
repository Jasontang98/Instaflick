import { getSingleImage, deleteSingleImage } from '../../store/images';
// import {
// 	getCommentsAsync,
// 	addCommentAsync,
// 	deleteCommentAsync,
// 	cleanComments,
// } from '../../store/comments';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import './SingleImage.css';

const SingleImage = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { id } = useParams();
	const oneImage = useSelector((state) => state.images[id]);
	const account = useSelector((state) => state.session.user);
	// const comments = Object.values(useSelector((state) => state.comments));
	// const [comment, setComment] = useState('');
	const [isLoaded, setLoaded] = useState(false);
	const [validationErrors, setValidationErrors] = useState([]);
	// console.log(account, '------------')

	useEffect(() => {
		// if (!account) history.push('/');
		dispatch(getSingleImage(id))
			// .then(async () => await dispatch(getCommentsAsync(id)))
			.then(() => setLoaded(true));

		// return () => {
		// 	dispatch(cleanComments());
		// };
	}, [id, dispatch]);

	const ImageDeleter = async (e) => {
		await dispatch(deleteSingleImage(id));
		history.push('/feed');
	};

	if (!oneImage) return null;

	const notLoggedIn = () => {
		if (!account) history.push('/login');
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setValidationErrors([]);
		const errors = [];

		// if (comment.length > 255) errors.push('Comment is too long');

		if (errors.length) {
			setValidationErrors(errors);
			return;
		}

		const data = {
			// comment,
			userId: account?.id,
			imageId: oneImage?.id,
		};
		// dispatch(addCommentAsync(data))
		// 	.then(dispatch(getSingleImage(id)))
		// 	.then(setComment(''));
	};

	return (
		isLoaded && (
			<div className="tester">
				<div className="images-background-image">
					<div className="single-image-container3">
						<h1 className="title">{oneImage.title}</h1>
						<p className="username">{oneImage?.User?.username}</p>
						<img
							className="single-image-image"
							src={oneImage.image_url}
							title={oneImage.title}
						/>
						<div className="edit-delete-comment-btn">
							{/* {oneImage?.User?.username === account?.username ? ( */}
								<button
									className="single-image-submit-btn"
									type="submit"
								>
									<NavLink
										className="single-image-submit-btn"
										exact
										to={`/images/${id}/edit`}
									>
										Edit
									</NavLink>
								</button>
							{/* // ) : (
							// 	<></>
							// )} */}
							{/* {oneImage?.User?.username === account?.username ? ( */}
								<button
									className="single-image-submit-btn"
									onClick={ImageDeleter}
								>
									Delete
								</button>
							{/* ) : (
								<></>
							)} */}
						</div>
						<h3 className="description">{oneImage.description}</h3>
						{/* <h1 className="comments-single-image">Comments</h1>
						<div className="comments">
							{comments &&
								comments.map((comment) => {
									return (
										<div className='new-comment-div' key={comment.id}>
											<p className="ptagz-comments">
												{comment?.comment}
											</p>
											<p className="ptagz-usename">
												{comment?.User?.username}
											</p>
											<div className='dlt-button-container'>
												{comment?.User?.username ===
												account?.username ? (
													<button
														className="delete-comment-btn"
														onClick={() =>
															dispatch(
																deleteCommentAsync(
																	id,
																	comment.id
																)
															).then(() =>
																dispatch(getCommentsAsync(id))
															)
														}
													>
														Delete
													</button>
												) : (
													<></>
												)}
											</div>
										</div>
									);
								})}
						</div> */}

						{/* <form onSubmit={handleSubmit}>
							<ul>
								{validationErrors.map((error, idx) => (
									<li className="errors-signup" key={idx}>
										{error}
									</li>
								))}
							</ul>
							{/* <textarea
								className='comment-text-area'
								placeholder="Add a comment"
								value={comment}
								required
								onChange={(e) => setComment(e.target.value)}
							/> */}
							{/* <button
								className="single-image-submit-btn"
								onClick={notLoggedIn}
								type="submit"
							>
								Submit
							</button> */}
						{/* </form> */}
					</div>
				</div>
			</div>
		)
	);
};

export default SingleImage;
