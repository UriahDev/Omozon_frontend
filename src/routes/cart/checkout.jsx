import { useAtom } from 'jotai';
import { allTotal, subtotal } from '../../components/app';
import './checkout.css';

const Checkout = () => {
    const [ total ] = useAtom(allTotal);
    const [subTotal] = useAtom(subtotal);

    //Work on the delivery fees

return(
    <div className='checkout_contain'>
        <h4>Checkout</h4>
        <h5>SubTotal: ${subTotal}</h5>
        <h5>Delivery Fees: $5</h5>
        <h5>Total: ${total}</h5>
        <div className='btn_contain'>
            <button className='edit_btn'>Purchase</button>
        </div>
    </div>
);
}

export default Checkout;