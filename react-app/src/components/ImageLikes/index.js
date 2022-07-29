import './imageLikes.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import {
	getLikesByImage,
	addALike,
	deleteALike,
} from '../../store/image-likes';

function imageLikes() {
	const { id } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const oneImage = useSelector((state) => state.images[id]);
	const [users, setUsers] = useState([]);
	const [likes, setLikes] = useState([]);
	const [isLoaded, setLoaded] = useState(false);
	const [validationErrors, setValidationErrors] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await fetch('/api/users/');
			const responseData = await response.json();
			setUsers(responseData.users);
		}
		fetchData();
	}, []);

	useEffect(() => {
		dispatch(getLikesByImage(id)).then(() => setLoaded(true));
	}, [id, dispatch]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const form = new FormData(e.target);
		const data = {
			user_id: form.get('user_id'),
			image_id: id,
			username: form.get('username'),
		};

		return <></>;
	};
}
export default imageLikes;
