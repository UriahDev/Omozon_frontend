import { useState } from 'preact/hooks';
import { getAuth, signOut } from "firebase/auth";
import { app } from '../../../components/app';
import '../style.css';

//Jotai imports
import { useAtom } from 'jotai';
import { logIn } from '../../../components/app';

import ScrollToTopOnMount from '../../../components/scrollToTop';
import Orders from './orders';
import Address from './address';
import Payments from './payments';

const RenderProfile = () => {
    const [,setLoggedIn] = useAtom(logIn);
	const [ render, setRender ] = useState('order');

    const signoutFunction = () => {
        const auth = getAuth(app);
        signOut(auth).then(() => {
            // Sign-out successful.
            localStorage.removeItem('user');
            setLoggedIn(false);
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    } 

	return (
		<>
		<ScrollToTopOnMount />
		<div className='profile_innerOne'>
				<div className='profile_pic'>
					<img src='https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80' />
				</div>
				<div className='profile_writings'>
					<h2>Name</h2>
					<p>City, Country</p>
					<button className='edit_btn'>Edit</button>
					<button onClick={signoutFunction} className='signout_btn'>Sign Out</button>
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

export default RenderProfile;