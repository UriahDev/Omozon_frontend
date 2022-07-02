import { useState, useEffect } from 'preact/hooks';
import '../../routes/cart/checkout.css';
import axios from 'axios';

//Importing Jotai
import { useAtom } from 'jotai';
import { quantities } from '../../components/app';

const ProductDisplay = () => {
  const [quant] = useAtom(quantities);

  const submitProducts = async (e) => {
    e.preventDefault();
    const result = await axios.post(import.meta.env.VITE_POST_URL, {
      products: quant,
    },{
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // .then(response => response.json())
    .catch(err => console.log(err));

    const body = result;
    return window.location.href = body.data;
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