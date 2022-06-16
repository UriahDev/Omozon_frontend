import { GrFormClose } from 'react-icons/gr';
import { BsBasket3 } from 'react-icons/bs';
import ShopItem from './shopItem';
import './shoppingCart.css';

//importing jotai context
import { useAtom } from 'jotai';
import { allTotal, subtotal, allCart } from '../../components/app';

const ShoppingCart = () => {
    const [, setTotal] = useAtom(allTotal);
    const [, setSubTotal] = useAtom(subtotal);
    const [cartData,setCartData] = useAtom(allCart);

    const removeProduct = (id) => {
        const items = JSON.parse(localStorage.getItem('items'));
        const updatedStorage = items.filter(element => element.id !== id);
        const [ subtractItem ] = items.filter(element => element.id == id);
        setSubTotal(prev => prev - subtractItem.amount);
        updatedStorage.length === 0 ? setTotal(prev => (prev - 5) - subtractItem.amount) : setTotal(prev => prev - subtractItem.amount);
        localStorage.setItem('items', JSON.stringify(updatedStorage));
        setCartData(() => updatedStorage);
    }
    

    return (
    <div className='shop_contain'>
        <h5>Shopping Cart</h5>
        {cartData.length !== 0 ? cartData.map(item => 
        <div className='inItem'>
            <ShopItem
                name={item.name}
                image={item.image}
                id={item.id}
                amount={item.amount}
            />
            <div className='divs'>
                <GrFormClose onClick={() => removeProduct(item.id)} />
            </div>
        </div>
        ): <div className='other_display'>
                <p>Your shopping cart is empty!</p>
                <BsBasket3 size={150} color="#112B3C" />
                <p>Please add an item.</p>
            </div>}
    </div>
    );
}

export default ShoppingCart;