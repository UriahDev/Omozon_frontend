import { useState } from 'preact/hooks';
import Orders from './components/orders';
import Address from './components/address';
import Payments from './components/payments';
import Account from './components/account';
import ScrollToTopOnMount from '../../components/scrollToTop';
import './style.css';

// Note: `user` comes from the URL, courtesy of our router
const Profile = ({ user }) => {
	const [ loggedIn, setLoggedIn ] = useState(false);

	return (
		<section>
			{loggedIn ? <RenderProfile user={user}/> : <Account />}
			<small onClick={() => loggedIn ? setLoggedIn(false): setLoggedIn(true)}>Change</small>
		</section>
	);
}

const RenderProfile = ({ user }) => {
	const [ render, setRender ] = useState('order');

	return (
		<>
		<ScrollToTopOnMount />
		<div className='profile_innerOne'>
				<div className='profile_pic'>
					<img src='https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80' />
				</div>
				<div className='profile_writings'>
					<h2>{user}</h2>
					<p>Accra, Ghana</p>
					<button className='edit_btn'>Edit</button>
					<button className='signout_btn'>Sign Out</button>
				</div>
			</div>
			<div className='other'>
				<div className='btns'>
					<button className={render=='order'&&'isActive'} onClick={() => setRender('order')}>Orders</button>
					<button onClick={() => setRender('address')}>Address</button>
					<button onClick={() => setRender('payment')}>Payment</button>
				</div>
				<div>
					{render==='order'? <Orders /> : 
					render==='address'? <Address /> : 
					render==='payment'? <Payments /> : null}
				</div>
			</div>
			</>
	);
}

export default Profile;
