import Account from './components/account';
import RenderProfile from './components/renderProfile';
import './style.css';

//Jotai import
import { useAtom } from 'jotai';
import { logIn } from '../../components/app';

const Profile = () => {
	const [ loggedIn ] = useAtom(logIn);

	return (
		<section>
			{loggedIn ? <RenderProfile /> : <Account />}
		</section>
	);
}

export default Profile;
