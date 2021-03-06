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
    }

    handleIncreaseQuantity = (product) => {
        console.log('Increase the quantity of ', product);
        const { products } = this.state;
        const index = products.indexOf(product);

        products[index].qty += 1;

        this.setState({
            products
        })
    }
    handleDecreaseQuantity = (product) => {
        console.log('Decrease the quantity of ', product);
        const { products } = this.state;
        const index = products.indexOf(product);

        if(products[index].qty === 0){
            return;
        }

        products[index].qty -= 1;

        this.setState({
            products
        })
    }
    handleDeleteProduct = (id) => {
        const { products } = this.state;

        const items = products.filter((item) => item.id !== id);

        this.setState({
            products: items
        })
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
                            onIncreaseQuantity={this.handleIncreaseQuantity}
                            onDecreaseQuantity={this.handleDecreaseQuantity}
                            onDeleteProduct={this.handleDeleteProduct}
                        />
                    )
                })}
            </div>
        );
    }
}

export default Cart;