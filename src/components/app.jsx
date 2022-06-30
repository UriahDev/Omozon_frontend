import { Router } from 'preact-router';

//Firebase import and usage
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './config';

import Header from './header/index';
import Footer from './footer/footer';
import './app.css';

//Jotai
import { atom, useAtom } from 'jotai';
import { Provider } from 'jotai';

//Initializing firebase
export const app = initializeApp(firebaseConfig);

//Getting Data from local storage
let getCartDataFromLocalStorage;
getCartDataFromLocalStorage = JSON.parse(localStorage.getItem('items'));
if(getCartDataFromLocalStorage == null) {getCartDataFromLocalStorage = []};

//Getting User Data from local storage
let getUser;
getUser = JSON.parse(localStorage.getItem('user'));
if(getUser == null) getUser = false 
else getUser = true; 

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Profile from '../routes/profile';
import ProductPage from '../routes/product_page/productPage';
import CartPage from '../routes/cart/cartPage';

//Calculations
let final = 0;
let subTotal=0;
const result = getCartDataFromLocalStorage.map(product => Number(product.amount) + Number(subTotal));
for(let i = 0; i < result.length; i++) {
		final = final + result[i];
}

//Jotai constants
export const subtotal = atom(final);
export const allTotal = atom(final > 0? final + 5: 0);
export const allCart = atom(getCartDataFromLocalStorage);
export const logIn = atom(getUser);

const App = () => {
	const [subTotal, setSubTotal] = useAtom(subtotal);
	const [total, setTotal] = useAtom(allTotal);
	const [cartData] = useAtom(allCart);

	if(total === 0 && subTotal === 0) {
		let final = 0;
		const result = cartData.map(product => Number(product.amount) + Number(subTotal));
		for(let i = 0; i < result.length; i++) {
			final = final + result[i];
		}
		setSubTotal(prev => prev + final);
		if(final === 0) setTotal(prev => prev + final)
		else setTotal(prev => prev + final + 5);
	}

	return(
		<div id="app">
			<Provider>
				<Header />
				<Router>
					<Home path="/" />
					<Profile path="/profile/:user" />
					<ProductPage path="/product/:id" />
					<CartPage path="/cart" />
				</Router>
				<Footer />
			</Provider>
		</div>
	);
}

export default App;
