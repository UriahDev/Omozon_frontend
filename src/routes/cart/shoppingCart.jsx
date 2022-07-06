import { GrFormClose } from 'react-icons/gr';
import { BsBasket3 } from 'react-icons/bs';
import ShopItem from './shopItem';
import './shoppingCart.css';

//importing jotai context
import { useAtom } from 'jotai';
import { allTotal, subtotal, allCart, quantities } from '../../components/app';

const ShoppingCart = () => {
    const [total, setTotal] = useAtom(allTotal);
    const [subTotal, setSubTotal] = useAtom(subtotal);
    const [cartData,setCartData] = useAtom(allCart);
    const [quant] = useAtom(quantities);

    let itemQuant;

    const removeProduct = (id) => {
        const items = JSON.parse(localStorage.getItem('items'));
        const updatedStorage = items.filter(element => element.id !== id);
        const [ subtractItem ] = items.filter(element => element.id == id);
        const [item] = quant.filter(element => element[0] == id);
        itemQuant = item[1];
        let amountToSubtract;
        if(itemQuant == undefined) amountToSubtract = subtractItem.amount
        else amountToSubtract = itemQuant * subtractItem.amount;
        if(subTotal > 0) setSubTotal(prev => prev - amountToSubtract);
        if(total > 0) updatedStorage.length === 0 ? setTotal(prev => (prev - 5) - amountToSubtract) : setTotal(prev => prev - amountToSubtract);
        localStorage.setItem('items', JSON.stringify(updatedStorage));
        setCartData(() => updatedStorage);
    }

    return (
    <div className='shop_contain'>
        <h5>Shopping Cart</h5>
        {cartData.length !== 0 ? cartData.map(item => 
        <div className='inItem' key={item.id}>
            <ShopItem
                key={item.id}
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