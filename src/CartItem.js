import React from 'react';

class CartItem extends React.Component {
    render() {
        console.log(this.props);
        const { title, price, qty } = this.props.product;
        const { product, onIncreaseQuantity, onDecreaseQuantity, onDeleteProduct} = this.props;
        return (
            <div className="cart-item">
                <div className="left-block">
                    <img style={styles.image} alt=""/>
                </div>
                <div className="right-block">
                    <div style={ { fontSize: 25 } }>{title}</div>
                    <div style={ { color: '#777' } }>Rs {price}</div>
                    <div style={ { color: '#777' } }>Qty: {qty}</div>
                    <div className="cart-item-actions">
                        {/* Buttons */}
                        <img 
                            alt="increase" 
                            className="action-icons" 
                            src="https://www.flaticon.com/svg/vstatic/svg/992/992651.svg?token=exp=1614948735~hmac=04c4e34e2ddc8689fc4acca381e38de9" 
                            onClick={() => onIncreaseQuantity(product)} 
                        />
                        <img 
                            alt="decrease" 
                            className="action-icons" 
                            src="https://www.flaticon.com/svg/vstatic/svg/992/992683.svg?token=exp=1614948672~hmac=50ebb944f7aca6d64047a08d6f4fed4a" 
                            onClick={() => onDecreaseQuantity(product)}
                        />
                        <img 
                            alt="delete" 
                            className="action-icons" 
                            src="https://www.flaticon.com/svg/vstatic/svg/1214/1214428.svg?token=exp=1614948759~hmac=4e3768dab2daabd7dfd6fea4a71ce7f9" 
                            onClick={() => onDeleteProduct(product.id)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    image: {
        height: 110,
        width: 110,
        borderRadius: 4,
        background: '#ccc'
    }
}

export default CartItem;