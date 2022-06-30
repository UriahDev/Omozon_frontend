import ScrollToTopOnMount from '../../components/scrollToTop';

import { products } from '../../data/products';
import './productPage.css';

//jotai import
import { useAtom } from 'jotai';
import { allCart, allTotal, subtotal } from '../../components/app';

const ProductPage = ({ id }) => {
    const [total, setTotal] = useAtom(allTotal);
    const [, setSubTotal] = useAtom(subtotal);
    const [, setAllCartData] = useAtom(allCart);

    let product;
    if (id <= 10) [ product ] = products.filter(element => element.id == id); 
    // else [ product ] = dataProduct.filter(element => element.id == id);   
    let allProduct = [];
    
    const storeProduct = () => {
        let addedProducts = JSON.parse(localStorage.getItem('items'));
        
        if(addedProducts === null || addedProducts.length === 0) {
            allProduct.push(product);
            localStorage.setItem('items', JSON.stringify(allProduct));
            setAllCartData(() => allProduct);
            setSubTotal(prev => prev + product.amount);
            total === 0 ? setTotal(prev => prev + product.amount + 5): setTotal(prev => prev + product.amount) //Add delivery fees
            allProduct = [];
        } else {
            allProduct = addedProducts;
            const isPart = allProduct.filter(element => element.id == id);
            if(isPart.length === 0) {
                allProduct.push(product);
                localStorage.setItem('items', JSON.stringify(allProduct));
                setAllCartData(() => allProduct);
                setSubTotal(prev => prev + product.amount);
                total === 0 ? setTotal(prev => prev + product.amount + 5): setTotal(prev => prev + product.amount) //Add delivery fees
                allProduct = [];
            } else alert('Item already added to cart');
        }
    }

    return (
    <div className='productPage_container'>
        <ScrollToTopOnMount />
        <div className='image_contain'>
            <img className='image_p' src={product.image} />
        </div>
        <div className='writings'>
            <p><strong>Product name: </strong></p>
            <p className='strong'>{product.name}</p>
            <p><strong>Description:</strong></p>
            <p className='strong'>{product.description}</p>
            <div className='button_container'>
                <button onClick={storeProduct} className='button'>Add To Cart</button>
            </div>
        </div>
    </div>);
};

export default ProductPage;