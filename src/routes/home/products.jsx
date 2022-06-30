import Product from './product';
import './products.css';
import { products } from '../../data/products';

const Products = ({title}) => {

    return(
        <div className='products_container'>
            <h3 className='center'>{title}</h3>
            <div className='all_products_contain'>
                <div className='all_products'>
                    {    products.map(product => <Product
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