import Products from './products';
import './style.css';

const Home = () => (
	<div>
		<div class='inside_main_display'></div>
		<Products title='Popular Products' type='pd' />
		<Products title='Featured Products' type='dp' />
	</div>
);

export default Home;
