import { useEffect, useState } from 'preact/hooks';
import { useAtom } from 'jotai';
import './shopItem.css';

import { allTotal, subtotal, allCart, quantities } from '../../components/app';

const ShopItem = ({name, image, id, amount}) => {
    const [total, setTotal] = useAtom(allTotal);
    const [, setSubTotal] = useAtom(subtotal);
    const [, setCartData] = useAtom(allCart);
    const [quant, setQuant] = useAtom(quantities);
    const [ itemQuantity, setItemQuantity ] = useState(() => 1);

    const increaseQuantity = () => {
        setSubTotal(prev => prev + (amount));
        if(total == 0) setTotal(prev => prev + amount + 5);
        else setTotal(prev => prev + (amount));
        setItemQuantity(prev => prev + 1);
    }

    const decreaseQuantity = () => {
        if(itemQuantity > 1) { 
            setSubTotal(prev => prev - (amount));
            setTotal(prev => prev - (amount)); 
            setItemQuantity(prev => prev - 1);
        } else {
            setSubTotal(prev => prev - (amount));
            setTotal(prev => prev - (amount)); 
            const items = JSON.parse(localStorage.getItem('items'));
            const updatedStorage = items.filter(element => element.id !== id);
            localStorage.setItem('items', JSON.stringify(updatedStorage));
            setCartData(updatedStorage);
            setItemQuantity(1);
        }
        if(total == (amount + 5) ) setTotal(0);
    };

    useEffect(() => {
        let newQuant = [];
        for(let i = 0; i < quant.length; i++) {
            if(quant[i][0] == id) {
                quant[i][1] = itemQuantity;
            }
            newQuant.push(quant[i]);
        }
            setQuant(newQuant);
    }, [itemQuantity, id]);

    return (
    <div className='shopItem_contain' key={id}>
        <img src={image} className='image' />
        <div className='divs_one'>
            <p className='name'>{name.substring(0, 15)}{name.length > 15 && '...'}</p>
        </div>
        <div className='btn_contain_shopItem'>
            <button onClick={decreaseQuantity}>-</button>
            <p>{itemQuantity}</p>
            <button onClick={increaseQuantity}>+</button>
        </div>
        <div className='divs'>
            <p>${amount}</p>
        </div>
    </div>
);
}

export default ShopItem;