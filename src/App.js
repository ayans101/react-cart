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
    this.db = firebase.firestore();
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
    this.db
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

    // products[index].qty += 1;

    // this.setState({
    //   products,
    // });

    const docRef = this.db.collection('products').doc(products[index].id);

    docRef
      .update({
        qty: products[index].qty + 1
      })
      .then(() => {
        console.log('Updated successfully');
      })
      .catch((error) => {
        console.log('Error : ', error);
      })

  };
  handleDecreaseQuantity = (product) => {
    console.log("Decrease the quantity of ", product);
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    // products[index].qty -= 1;

    // this.setState({
    //   products
    // });

    const docRef = this.db.collection('products').doc(products[index].id);

    docRef
      .update({
        qty: products[index].qty - 1
      })
      .then(() => {
        console.log('Updated successfully');
      })
      .catch((error) => {
        console.log('Error : ', error);
      })

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

  addProduct = () => {
    this.db
      .collection('products')
      .add({
        img: 'https://images-eu.ssl-images-amazon.com/images/I/41kBnxZ7z0L._SY300_SX300_QL70_FMwebp_.jpg',
        price: 100,
        qty: 2,
        title: 'Pen'
      })
      .then((docRef) => {
        console.log('Product has been added', docRef);
      })
      .catch((error) => {
        console.log('Error : ', error);
      })
  }

  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        {/* <button onClick={this.addProduct} style={{ padding: 10, fontSize: 20 }}>
          Add a product
        </button> */}
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
