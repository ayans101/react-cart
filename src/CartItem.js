import React from 'react';

class CartItem extends React.Component {

    // testing () {
    //     const promise = new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve('done');
    //     }, 5000);
    //     })

    //     promise.then(() => {
    //     // setState acts like a synchronus call
    //     this.setState({ qty: this.state.qty + 10 });

    //     this.setState({ qty: this.state.qty + 10 });

    //     this.setState({ qty: this.state.qty + 10 });

    //     console.log('state', this.state);
    //     });
    // }

    increaseQuantity = () => {
        //  setState() enqueues changes to the component state (shallow merging) and tells React that this component and its children need to be re-rendered with the updated state.

        //  setState form 1
        // this.setState({
        //     qty: this.state.qty + 1
        // }, () => {
        //     console.log(this.state);
        // });

        //  setState form 2
        this.setState((prevState) => {
            return {
                qty: prevState.qty + 1
            }
        }, () => {
            console.log(this.state);
        });

    }

    decreaseQuantity = () => {
        const { qty } = this.state;
        if(qty === 0){
            return;
        }
        this.setState((prevState) => {
            return {
                qty: prevState.qty - 1
            }
        });
    }

    render() {
        console.log(this.props);
        const { title, price, qty } = this.props.product;
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
                            onClick={this.increaseQuantity} 
                        />
                        <img 
                            alt="decrease" 
                            className="action-icons" 
                            src="https://www.flaticon.com/svg/vstatic/svg/992/992683.svg?token=exp=1614948672~hmac=50ebb944f7aca6d64047a08d6f4fed4a" 
                            onClick={this.decreaseQuantity}
                        />
                        <img 
                            alt="delete" 
                            className="action-icons" 
                            src="https://www.flaticon.com/svg/vstatic/svg/1214/1214428.svg?token=exp=1614948759~hmac=4e3768dab2daabd7dfd6fea4a71ce7f9" 
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