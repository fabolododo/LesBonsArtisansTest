import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      name: "",
      type: "",
      price: 0,
      rating: 0,
      warranty_years: 0,
      available: "",
      productModal: false
    };
  }

  componentDidMount() {
    this.setState({
      name: this.props.name,
      newName : this.props.name,
      type: this.props.type,
      newType: this.props.newType,
      price: this.props.price,
      newPrice: this.props.newPrice,
      rating: this.props.rating,
      warranty_years: this.props.warranty_years,
      newWarranty_years: this.props.warranty_years,
      available: this.props.available,
      newAvailable: this.props.newAvailable
    });
    // this.setState({ newName: this.props.name });
    // this.setState({ quantity: this.props.quantity });
    // this.setState({ newQuantity: this.props.quantity });
    // this.setState({ unitType: this.props.unitType });
    // this.setState({ newUnitType: this.props.unitType });
  }

  // handleName = e => {
  //   this.setState({ newName: e.target.value });
  // };

  // handleQuantity = e => {
  //   this.setState({ newQuantity: e.target.value });
  // };

  // handleUnitType = e => {
  //   this.setState({ newUnitType: e.target.value });
  // };

  handleName = e => {
    this.setState({ newName: e.target.value });
  };

  handleType = e => {
    this.setState({ newType: e.target.value });
  };

  handleRating= e => {
    this.setState({ newRating: e.target.value });
  };

  handleWarrantyYears = e => {
    this.setState({ newWarranty_years: e.target.value });
  };

  handlePrice = e => {
    this.setState({ newPrice: e.target.value });
  };

  handleAvailable = e => {
    this.setState({ newAvailable: e.target.value });
  };

  handleEditProduct = e => {
    e.preventDefault();
    this.setState({ productModal: false });
    var editProduct = {
      name: this.state.newName,
      price: this.state.newPrice,
      type: this.state.newType,
      rating: this.state.newRating,
      warranty_years: this.state.newWarranty_years,
      available: this.state.newAvailable,
      type: this.state.newType,

      _id: this.props._id
    };

    this.props.onEditProduct(editProduct);
    this.setState({ name: this.state.newName });
    this.setState({ type: this.state.newType });
    this.setState({ price: this.state.newPrice });
    this.setState({ rating: this.state.newRating });
    this.setState({ warranty_years: this.state.newWarranty_years });
    this.setState({ available: this.state.newAvailable });
  };

  handleDeleteProduct = e => {
    e.preventDefault();

    var deleteProduct = {
      _id: this.props._id
    };

    const result = window.confirm("Do you really want to delete this item ?");
    if (result === true) {
      this.props.onDeleteProduct(deleteProduct);
    }
  };

  render() {
    const {
      newName,
      newType,
      newPrice,
      newWarranty_years,
      newAvailable,
      newRating,
      name,
      price,
      type,
      warranty_years,
      rating,
      available
    } = this.state;
    return (
      <tr>
        <td>{name}</td>
        <td>{type}</td>
        <td>{price}</td>
        <td>{rating}</td>
        <td>{warranty_years}</td>
        <td>{available}</td>
        <td>
          <Button
            className="btn btn-info"
            id={"edit" + name}
            onClick={() => this.setState({ productModal: true })}
          >
            Edit
          </Button>
        </td>
        <td>
          <Button
            id={"delete" + name}
            className="btn btn-danger"
            onClick={this.handleDeleteProduct}
          >
            Delete
          </Button>
        </td>

        <Modal show={this.state.productModal}>
          <Modal.Header>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-horizontal" name="newProductForm">
              <div className="form-group">
                <label className="col-md-4 control-label">Name</label>
                <div className="col-md-4">
                  <input
                    id="name"
                    name="name"
                    placeholder="Name"
                    onChange={this.handleName}
                    className="form-control"
                    value={newName}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label">Type</label>
                <div className="col-md-4">
                  <input
                    id="type"
                    name="type"
                    placeholder="Type"
                    onChange={this.handleType}
                    value={newType}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label">Price</label>
                <div className="col-md-4">
                  <input
                    id="price"
                    name="price"
                    placeholder="Price"
                    onChange={this.handlePrice}
                    value={newPrice}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label">Rating</label>
                <div className="col-md-4">
                  <input
                    id="rating"
                    name="rating"
                    placeholder="Rating"
                    onChange={this.handleRating}
                    value={newRating}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label">Warranty Years</label>
                <div className="col-md-4">
                  <input
                    id="warranty_years"
                    name="warranty_years"
                    placeholder="Warranty Years"
                    onChange={this.handleWarrantyYears}
                    value={newWarranty_years}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label">Available</label>
                <div className="col-md-4">
                  <input
                    id="available"
                    name="available"
                    placeholder="Available"
                    onChange={this.handleAvailable}
                    value={newAvailable}
                    className="form-control"
                  />
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ productModal: false })}>
              Close
            </Button>
            <Button id="submitform" onClick={this.handleEditProduct}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </tr>
    );
  }
}

export default Product;