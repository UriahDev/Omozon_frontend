import { useEffect, useState } from 'preact/hooks';
import axios from 'axios';

import Product from './product';
import './products.css';
import productData from '../../data/productsData';
import dataProduct from '../../data/dataProduct';

const Products = ({title, type}) => {
    const [products, setProducts] = useState([]);
    
    // useEffect(() => {
    //     axios.get('http://localhost:9000/').then(
    //         res => res
    //     ).then(data => setProducts(data.data))
    // }, []);

    return(
        <div className='products_container'>
            <h3 className='center'>{title}</h3>
            <div className='all_products_contain'>
                <div className='all_products'>
                    {type === 'pd' ?
                        productData.map(product => <Product
                            name={product.name}
                            id={product.id}
                            image={product.image}
                            description = {product.description}
                            amount = {product.amount}
                            />) :
                        dataProduct.map(product => <Product
                            name={product.name}
                            id={product.id}
                            image={product.image}
                            description = {product.description}
                            amount = {product.amount}
                            />)
                    }
                </div>
            </div>
        </div>
    );
}

export default Products;