import React from 'react';
import CartItem from './CartItem';

class Cart extends React.Component {
    constructor() {
        super();
        this.state = {
            products: [
                {
                    title: "Watch",
                    price: 899,
                    qty: 2,
                    img: "",
                    id: 1
                },
                {
                    title: "Book",
                    price: 999,
                    qty: 4,
                    img: "",
                    id: 2
                },
                {
                    title: "Laptop",
                    price: 154999,
                    qty: 1,
                    img: "",
                    id: 3
                }
            ]
        }
        // this.increaseQuantity = this.increaseQuantity.bind(this);
        // this.testing();
    }
    render() {
        const { products } = this.state;
        return (
            <div className="cart">
                {products.map((product) => {
                    return (
                        <CartItem
                            product={product}
                            key={product.id} 
                        />
                    )
                })}
            </div>
        );
    }
}

export default Cart;