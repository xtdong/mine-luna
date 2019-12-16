import React from 'react';
import './ProductListItem.css';

const ProductListItem = (props) => {
    return (
        <div className='card card-hover' onClick={props.click}>
            <img className='card-img-top' src={props.url} alt='' />
            <div class="middle">
                <div class="small badge badge-pill badge-secondary">More</div>
            </div>
            <div className='card-body'>
                <div>{props.title}</div>
                <div>{props.author}</div>
            </div>
        </div>
    )
}
export default ProductListItem;