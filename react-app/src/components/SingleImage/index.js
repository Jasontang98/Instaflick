import { getSingleImage, deleteSingleImage } from '../../store/images';
import {
	getCommentsByImage,
	deleteAComment,
	editAComment,
	addAComment,
	cleanComments,
} from '../../store/comments';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, NavLink, Redirect } from 'react-router-dom';
import './SingleImage.css';

const SingleImage = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { id } = useParams();
	const oneImage = useSelector((state) => state.images[id]);
	const sessionUser = useSelector((state) => state.session.user);
	const account = useSelector((state) => state.session.user);
	const comments = Object.values(useSelector((state) => state.comments));
	const [comment, setComment] = useState('');
	const [isLoaded, setLoaded] = useState(false);
	const [validationErrors, setValidationErrors] = useState([]);
  console.log(account, '000000000000000')

	useEffect(() => {
		// if (!account) history.push('/');
		dispatch(getSingleImage(id))
			.then(async () => await dispatch(getCommentsByImage(id)))
			.then(() => setLoaded(true));

		return () => {
			dispatch(cleanComments());
		};
	}, [id, dispatch]);

	const ImageDeleter = async (e) => {
		await dispatch(deleteSingleImage(id));
		history.push('/feed');
	};

	if (!oneImage) return null;

	const notLoggedIn = () => {
		if (!account) history.push('/login');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setValidationErrors([]);
		const errors = [];

		if (comment.length > 500) errors.push('Comment is too long');
		if (errors.length) {
			setValidationErrors(errors);
			return;
		}

		const data = {
			comment,
			user_id: account?.id,
			image_id: oneImage?.id,
		};
		await dispatch(addAComment(data))
			// .then(dispatch(getSingleImage(id)))
			setComment('');
	};

	if (!sessionUser) return <Redirect to="/signup" />;

	return (
		isLoaded && (
			<div className="tester">
				<div className="images-background-image">
					<div className="single-image-container3">
						<p className="username">{oneImage?.user_id?.username}</p>
						<img
							alt="uploadedImage"
							className="single-image-image"
							src={oneImage.image_url}
							title={oneImage.title}
						/>
						<div className="edit-delete-comment-btn">
							{oneImage?.user_id === account?.id ? (
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
							) : (
								<></>
							)}
							{oneImage?.user_id === account?.id ? (
								<button
									className="single-image-submit-btn"
									onClick={ImageDeleter}
								>
									Delete
								</button>
							) : (
								<></>
							)}
						</div>
						<h3 className="description">{oneImage.description}</h3>
						<h1 className="comments-single-image">Comments</h1>
						<div className="comments">
							{comments.map((comment) => {
								return (
									<div className="new-comment-div" key={comment.id}>
										<p className="ptagz-comments">
											{comment?.comment}
										</p>
										<p className="ptagz-usename">
											{/* {comment?.user_id} */}
										</p>
										<div className="dlt-button-container">
											{comment?.user_id ===
											account.id ? (
												<button
													className="delete-comment-btn"
													onClick={() =>
														dispatch(
															deleteAComment(id, comment.id)
														).then(() =>
															dispatch(getCommentsByImage(id))
														)
													}
												>
													Delete
												</button>
											) : (
												<></>
											)}
										</div>
                    <div className="edit-button-container">
											{comment?.user_id ===
											account.id ? (
												<button
													className="edit-comment-btn"
													onClick={() =>
														dispatch(
															editAComment(id, comment.id)
														).then(() =>
															dispatch(getCommentsByImage(id))
														)
													}
												>
													Edit
												</button>
											) : (
												<></>
											)}
										</div>
									</div>
								);
							})}
						</div>
						<form onSubmit={handleSubmit}>
							<ul>
								{validationErrors.map((error, idx) => (
									<li className="errors-signup" key={idx}>
										{error}
									</li>
								))}
							</ul>
							<textarea
								className="comment-text-area"
								placeholder="Add a comment"
								value={comment}
								required
								onChange={(e) => setComment(e.target.value)}
							/>
							<button
								className="single-image-submit-btn"
								onClick={notLoggedIn}
								type="submit"
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		)
	);
};

export default SingleImage;
