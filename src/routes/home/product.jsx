import { Link } from 'preact-router/match';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
// import { FaStarHalfAlt } from 'react-icons/fa';
import './product.css';

const Product = ({name, id, description, image, amount}) => {
    let path = '/product/' + id;
    return (
    <Link className='link' href={path}>
        <div className='product_container'>
            <img className='images' src={image}/>
            <h4 className='margin'>{name.substring(0, 23)}</h4>
            <p className='margin' >{description.substring(0, 40)}...</p>
            <span className='inline_p'>
                <p className='each_p'>
                    <AiFillStar color='yellow'/>
                    <AiFillStar color='yellow'/>
                    <AiFillStar color='yellow'/>
                    <AiFillStar color='yellow'/>
                    <AiOutlineStar color='yellow'/>
                </p>
                <p className='each_p'><strong>${amount}</strong></p>
            </span>
        </div>
    </Link>
    );
};

export default Product;