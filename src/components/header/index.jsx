import { useAtom } from 'jotai';
import { Link } from 'preact-router/match';
import { FaCartPlus, FaUser } from 'react-icons/fa';
import './style.css';

import { allCart } from '../app';

const IconDisplay = ({icon}) => ((icon == 'FaCartPlus')? <FaCartPlus className='icon' size={12}  />: <FaUser className='icon' size={12} />);


const NavLink = ({title, goto, icon}) => {
const [ cartData ] = useAtom(allCart);
return(
	<span className='nav'>
		<Link className='active' href={goto}>
			<IconDisplay icon = {icon}/>
			{title}
			{(icon == 'FaCartPlus') && cartData.length !== 0 && <sup>{cartData.length}</sup>}
		</Link>
	</span>
);
}

//This variable defines the path to a specific product 
const user = '/profile/' + 'Uriah Otchere';

const Header = () => (
	<header className='header'>
		<Link href="/"><h1>Omozon</h1></Link>
		<nav className='contain_nav'>
			<NavLink title='Account' goto={user} icon= 'true' />
			<NavLink title='Cart' goto='/cart' icon='FaCartPlus' />
		</nav>
	</header>
);


export default Header;
