import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import '../../routes/cart/checkout.css';

//Firebase imports
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from '../app';

//Importing Jotai
import { useAtom } from 'jotai';
import { quantities, allCart, allTotal } from '../../components/app';

const ProductDisplay = () => {
  const [quant] = useAtom(quantities);
  const [cartData] = useAtom(allCart);
  const [total] = useAtom(allTotal);

  //Resolving time for orderInfo
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth()+1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const orderTime = `${day}/${month}/${year} ${hours}:${minutes}`;

  const orderInfo = {
    orderId: uuidv4(),
    orderTime,
    orederTotal: total,
    status: 'active'
  };

  const submitProducts = async (e) => {
    e.preventDefault();

    if(cartData.length > 0) {
      const result = await axios.post(import.meta.env.VITE_POST_URL, {
        products: quant,
      },{
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(() => {
        // Initializing Cloud Firestore and getting reference to the service
        const db = getFirestore(app);
        const auth = getAuth(app);
        const user = auth.currentUser;

        if(user !== null) {
          const name = user.displayName;
          const email = user.email;
          const uid = user.uid;

          const sendOrder = async () => {
            try {
              await addDoc(collection(db, 'users'), {
                uid,
                name,
                email,
                orderInfo,
                quant,
              });
            } catch (e) {
              console.error('Error adding document: ', e);
            }
          }
          sendOrder();
        }
      })
      .catch(err => console.log(err));
  
      const body = result;
      window.location.href = body.data;
    } else alert('Please add item to cart.');
  }

  return(
    <section>
      <form>
        <div className='btn_contain'>
          {/* <input type='hidden' value={products} name='products' /> */}
          <button className='edit_btn' onClick={submitProducts}>
            Purchase
          </button>
        </div>
      </form>
    </section>
  );
}

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function Purchase() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setMessage('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      setMessage(
        'Order canceled -- continue to shop around and checkout when you\'re ready.'
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}