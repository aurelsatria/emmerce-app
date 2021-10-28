import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import { registerUser } from "../../redux/actions/user";
import { connect } from "react-redux";

class Register extends React.Component {
  state = {
    fullName: "",
    username: "",
    email: "",
    password: "",
  }

  inputHandler = (event) => {
    const value = event.target.value
    const name = event.target.name

    this.setState({ [name]: value })
  }

  registerHandler = () => {
    const { fullName, username, email, password } = this.state
    Axios.post(`${API_URL}/users`, {
      fullName,
      username,
      email,
      password,
      role: "user"
    })
    .then(() => {
      alert("Berhasil mendaftakan user")
    })
    .catch(() => {
      alert("Tidak berhasil mendaftarkan user")
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Register Now!</h1>
            <p className="lead">
              Register now and start shopping in the most affordable ecommerce platform
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-4 offset-4">
            <div className="card">
              <div className="card-body">
                <h5 className="font-weight-bold mb-3">Register</h5>
                <input name="fullName" onChange={this.inputHandler} placeholder="Full Name" type="text" className="form-control my-2" />
                <input name="username" onChange={this.inputHandler} placeholder="Username" type="text" className="form-control my-2" />
                <input name="email" onChange={this.inputHandler} placeholder="Email" type="text" className="form-control my-2" />
                <input name="password" onChange={this.inputHandler} placeholder="Password" type="password" className="form-control my-2" />
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <button onClick={() => this.props.registerUser(this.state)} className="btn btn-primary mt-2">
                    Register
                  </button>
                  <Link to="/login">Or Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = {
  registerUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);