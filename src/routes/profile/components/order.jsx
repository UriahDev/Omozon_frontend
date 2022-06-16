import orderInfo from '../../../data/orderInfo';
import './order.css';

const OrderList = ({ title, list }) => (
    <div className='headers'>
        <h5>{title}</h5>
        {orderInfo.map(order => 
        <p className='p'>
                {
                list=='id'? order.id : 
                list=='time'? order.time : 
                list=='amount'? order.amount:
                list=='status'? order.status:
                list=='invoice'? <a>View</a>: null 
                }
        </p>  
        )}
    </div>
);

const Order = () => (
    <div className='contain'>
        <OrderList title='Order Id' list='id' />
        <OrderList title='Time' list='time' />
        <OrderList title='Amount' list='amount' />
        <OrderList title='Status' list='status' />
        <OrderList title='Invoice' list='invoice' />
    </div>
);

export default Order;