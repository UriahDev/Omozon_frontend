import Account from './components/account';
import RenderProfile from './components/renderProfile';
import './style.css';

//Jotai import
import { useAtom } from 'jotai';
import { logIn } from '../../components/app';

// Note: `user` comes from the URL, courtesy of our router
const Profile = ({ user }) => {
	const [ loggedIn ] = useAtom(logIn);

	return (
		<section>
			{loggedIn ? <RenderProfile user={user}/> : <Account />}
		</section>
	);
}

export default Profile;
