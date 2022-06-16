import ShoppingCart from './shoppingCart';
import Checkout from './checkout';
import ScrollToTopOnMount from '../../components/scrollToTop';
import './cartPage.css';

//Jotai
import { useAtom } from 'jotai';
import { allCart } from '../../components/app';


const CartPage = () => {
    const [allCartData] = useAtom(allCart);
    return(
        <div className='main_cart'>
            <ScrollToTopOnMount />
            {allCartData.length === 0 && <div className='empty'></div>}  
            <div className='cartContainer'>
                <div className='each_c'>
                    <ShoppingCart />
                </div>
                <div className='each_c'>
                    <Checkout />
                </div>
            </div>
            {allCartData.length === 0 && <div className='each'></div>}   
        </div>
    );
}

export default CartPage;