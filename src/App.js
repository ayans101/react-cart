import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";
import firebase from 'firebase/app';
import 'firebase/firestore';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // products: [
      //   {
      //     title: "Watch",
      //     price: 899,
      //     qty: 2,
      //     img: "https://images-na.ssl-images-amazon.com/images/I/61wNVAsmJnL._UL1100_.jpg",
      //     id: 1,
      //   },
      //   {
      //     title: "Book",
      //     price: 999,
      //     qty: 4,
      //     img: "https://images.springer.com/sgw/books/medium/9781484239872.jpg",
      //     id: 2,
      //   },
      //   {
      //     title: "Laptop",
      //     price: 154999,
      //     qty: 1,
      //     img: "https://images-na.ssl-images-amazon.com/images/I/71an9eiBxpL._SL1500_.jpg",
      //     id: 3,
      //   },
      // ]
      products: [],
      loading: true
    };
  }

  // componentDidMount() {
  //   firebase
  //     .firestore()
  //     .collection('products')
  //     .get()
  //     .then((snapshot) => {
  //       console.log(snapshot.docs);
  //       snapshot.docs.forEach((doc) => {
  //         console.log(doc.data());
  //       });

  //       const products = snapshot.docs.map((doc) => {
  //         const data = doc.data();
  //         data['id'] = doc.id;
  //         return data;
  //       });

  //       this.setState({
  //         products,
  //         loading: false
  //       })
  //     });
  // }

  componentDidMount() {
    firebase
      .firestore()
      .collection('products')
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs);
        snapshot.docs.forEach((doc) => {
          console.log(doc.data());
        });

        const products = snapshot.docs.map((doc) => {
          const data = doc.data();
          data['id'] = doc.id;
          return data;
        });

        this.setState({
          products,
          loading: false
        })
      });
  }

  handleIncreaseQuantity = (product) => {
    console.log("Increase the quantity of ", product);
    const { products } = this.state;
    const index = products.indexOf(product);

    products[index].qty += 1;

    this.setState({
      products,
    });
  };
  handleDecreaseQuantity = (product) => {
    console.log("Decrease the quantity of ", product);
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    products[index].qty -= 1;

    this.setState({
      products
    });
  };
  handleDeleteProduct = (id) => {
    const { products } = this.state;

    const items = products.filter((item) => item.id !== id);

    this.setState({
      products: items,
    });
  };

  getCartCount = () => {
    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    })

    return count;
  }

  getCartTotal = () => {
    const { products } = this.state;

    let cartTotal = 0;

    products.forEach((product) => {
      cartTotal += product.qty * product.price;
    })

    return cartTotal;
  }

  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <Cart 
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        {loading && <h1>Loading Products...</h1>}
        <div style={ {padding: 10, fontSize: 20} }>TOTAL: {this.getCartTotal()}</div>
      </div>
    );
  }
}

export default App;
