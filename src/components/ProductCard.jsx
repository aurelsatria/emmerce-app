import React from "react";
import "../assets/styles/product_card.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Axios from "axios";
import { API_URL } from "../constants/API";
import { getCartData } from "../redux/actions/cart";

class ProductCard extends React.Component {

  addToCartHandler = () => {
    // Cek apakah user sudah memiliki barang tersebut di cart
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: this.props.userGlobal.id,
        productId: this.props.productData.id,
      }
    })
    .then((result) => {
      // Barang sudah ada di cart user
      if (result.data.length) {

        Axios.patch(`${API_URL}/carts/${result.data[0].id}`, {
          quantity: result.data[0].quantity + 1
        })
        .then (() => {
          alert("Berhasil menambahkan barang")
          this.props.getCartData(this.props.userGlobal.id)
        })
        .catch (() => {
          alert("Terjadi kesalahan di server")
        })

      // Barang belum ada di cart user  
      } else {

        Axios.post(`${API_URL}/carts`, {
          userId: this.props.userGlobal.id,
          productId: this.props.productData.id,
          price: this.props.productData.price,
          productName: this.props.productData.productName,
          productImage: this.props.productData.productImage,
          quantity: 1,
        })
        .then(() => {
          alert("Berhasil menambahkan barang")
          this.props.getCartData(this.props.userGlobal.id)
        })
        .catch(() => {
          alert("Terjadi kesalahan di server")
        })

      }
    })
  }

  render() {
    return (
      <div className="card product-card">
        <img
          src={this.props.productData.productImage}
          alt=""
        />
        <div className="mt-2">
          <div>
            <Link to={`/product-detail/${this.props.productData.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <h6>{this.props.productData.productName}</h6>
            </Link>
            <span className="text-muted">Rp. {this.props.productData.price}</span>
          </div>
          <div className="d-flex flex-row justify-content-end">
            <button onClick={this.addToCartHandler} className="btn btn-primary mt-2">Add to cart</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userGlobal: state.user,
  }
}

const mapDispatchToProps = {
  getCartData,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);