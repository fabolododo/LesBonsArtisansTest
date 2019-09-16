import React, { Component } from "react";
import Product from "./Product";
import axios from "axios";
// import socketIOClient from "socket.io-client";
import { Modal, Button } from "react-bootstrap";

const HOST = "http://localhost:4242";


class Inventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      productFormModal: false,
      _id: "",
      name: "",
      snackMessage: "",
      type: "",
      price: 0,
      rating: 0,
      warranty_years: 0,
      available: "",
      displaySnackBar: false,
      // response: false,
      // endpoint: "http://localhost:4242"
    };

    this.handleNewProduct = this.handleNewProduct.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleRating = this.handleRating.bind(this);
    this.handleWarrantyYears = this.handleWarrantyYears.bind(this);
    this.handleAvailable = this.handleAvailable.bind(this);

    this.handleSnackbar = this.handleSnackbar.bind(this);
  }

  

  componentDidMount() {
    // const { endpoint, response } = this.state;
    // const socket = socketIOClient(endpoint);

    // socket.on("test", function(data) {
    //   console.log(data)
    // })
    // socket.on("listProduct", data => this.setState({ response: data }));
    // console.log('response: ', response);
    // console.log('data: ', data);
    
  // }


    var url = HOST + `/products/`;
    axios.get(url).then(response => {
      this.setState({ products: response.data });
      console.log(response.data);
    });
  }

  handleNewProduct = e => {
    e.preventDefault();
    this.setState({ productFormModal: false });
    var newProduct = {
      name: this.state.name,
      type: this.state.type,
      price: this.state.price,
      rating: this.state.rating,
      warranty_years: this.state.warranty_years,
      // available: this.state.available

    };

    axios
      .post(HOST + `/products`, newProduct)
      .then(response => {
        this.setState({ snackMessage: "Product Added Successfully!" });
        this.handleSnackbar();
        let products = this.state.products;
        products.push(response.data.product);
        this.setState({products});
      })
      .catch(err => {
        console.log(err);
        this.setState({ snackMessage: "Product failed to save!" });
        this.handleSnackbar();
      });
  };

  handleEditProduct = editProduct => {
    axios
      .put(HOST + `/products/` + editProduct._id + `/update`, editProduct)
      .then(response => {
        this.setState({ snackMessage: "Product Updated Successfully!" });
        this.handleSnackbar();
      })
      .catch(err => {
        console.log(err);
        this.setState({ snackMessage: "Product Update Failed!" });
        this.handleSnackbar();
      });
  };

  handleDeleteProduct = deleteProduct => {
    axios
      .delete(HOST + `/products/` + deleteProduct._id + `/delete`)
      .then(response => {
        this.setState({ snackMessage: "Product Deleted Successfully!" });
        this.handleSnackbar();
        let products = this.state.products;
        products = products.filter(product => product._id !== response.data.product._id);
        this.setState({products});
      })
      .catch(err => {
        console.log(err);
        this.setState({ snackMessage: "Product Delete Failed!" });
        this.handleSnackbar();
      });
  };

  handleName = e => {
    this.setState({ name: e.target.value });
  };

  handleType = e => {
    this.setState({ type: e.target.value });
  };

  handleRating= e => {
    this.setState({ rating: e.target.value });
  };

  handleWarrantyYears = e => {
    this.setState({ warranty_years: e.target.value });
  };

  handlePrice = e => {
    this.setState({ price: e.target.value });
  };

  handleAvailable = e => {
    this.setState({ available: e.target.value });
  };

  handleSnackbar = () => {
    this.setState({ displaySnackBar: true });
    setTimeout(() => this.setState({ displaySnackBar: false }), 3000);
  };

  render() {
    var { products, snackMessage } = this.state;

    var renderProducts = () => {
      if (products.length === 0) {
        return <tr>{products}</tr>;
      } else {
        return products.map((product, index) => (
          <Product
            {...product}
            key={index}
            onEditProduct={this.handleEditProduct}
            onDeleteProduct={this.handleDeleteProduct}
          />
        ));
      }
    };

    return (
      <div>
        <div className="container">
          <Button
            className="btn btn-success pull-right"
            id="addnewitem"
            onClick={() => this.setState({ productFormModal: true })}
          >
            Add New Item
          </Button>
          <br />
          <br />

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">type</th>
                <th scope="col">price</th>
                <th scope="col">rating</th>
                <th scope="col">warranty Years</th>
                <th scope="col">Available</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
                <th />
              </tr>
            </thead>
            <tbody>{renderProducts()}</tbody>
          </table>
        </div>

        <Modal show={this.state.productFormModal}>
          <Modal.Header>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-horizontal" name="newProductForm">
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="name">
                  Name
                </label>
                <div className="col-md-4">
                  <input
                    id="name"
                    name="name"
                    placeholder="Name"
                    className="form-control"
                    onChange={this.handleName}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="type">
                  Type
                </label>
                <div className="col-md-4">
                  <input
                    id="type"
                    name="type"
                    placeholder="Type"
                    onChange={this.handleType}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="price">
                  Price
                </label>
                <div className="col-md-4">
                  <input
                    id="price"
                    name="price"
                    placeholder="Price"
                    onChange={this.handlePrice}
                    className="form-control"
                  />
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              id="closeform"
              onClick={() => this.setState({ productFormModal: false })}
            >
              Close
            </Button>
            <Button id="submitform" onClick={this.handleNewProduct}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        {this.state.displaySnackBar ? (
          <div
            id="snackbar"
            style={{fontSize:"25px", color:"red", textAlign:"center"}}
          >
            {snackMessage}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Inventory;