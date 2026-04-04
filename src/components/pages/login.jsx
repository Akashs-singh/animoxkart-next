'use client';

import React, { Component } from 'react';
import axios from 'axios';
import Breadcrumb from "../common/breadcrumb";
import SimpleReactValidator from 'simple-react-validator';
// import { generateToken } from '../firebase/notifications/firebase';
import Link from 'next/link'
import Cookies from 'js-cookie';
import { ThreeDot } from 'react-loading-indicators'
import toast from 'react-hot-toast';
class Login extends Component {

    setStateFromInput = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);

    }
    notify = () => toast('Account Logged in!', {
        duration: 2000,
        position: 'top-center'
    });
    postData = async (datas) => {
        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL_NEW + '/login', datas, {
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                }
            });

            if (response.data.status == true) {
                this.notify();
                document.getElementById("addressListSpinner").style.display = "none";
                document.getElementById("messageBox").style.display = "block";
                document.getElementById("messageArea").innerHTML = response.data.message;
                document.getElementById("messageArea").className = "alert alert-success";
                const expirationDays = 7; // Set the desired expiration in days
                const currentDate = new Date();
                currentDate.setDate(currentDate.getDate() + expirationDays);
                Cookies.set('token', response.data.token, { expires: currentDate });
                // generateToken();
                if (Cookies.get('redirect')) {
                    Cookies.remove('redirect');
                    let path = Cookies.get("path")
                    if (path === undefined) {
                        this.props.history.push('/')
                    }
                    Cookies.remove('path');
                    window.location.href = '/' + path;
                }
                else {
                    window.location.href = '/';
                }

            }
            else {
                document.getElementById("addressListSpinner").style.display = "none";
                document.getElementById("registerBox").style.display = "block";
                document.getElementById("messageBox").style.display = "block";
                document.getElementById("messageArea").innerHTML = response.data.message;
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    document.getElementById("addressListSpinner").style.display = "none";
                    document.getElementById("registerBox").style.display = "block";
                    document.getElementById("messageBox").style.display = "block";
                    document.getElementById("messageArea").innerHTML = error.response.data.message;
                } else {
                    document.getElementById("addressListSpinner").style.display = "none";
                    document.getElementById("registerBox").style.display = "block";
                    document.getElementById("messageBox").style.display = "block";
                    document.getElementById("messageArea").innerHTML = error.response.data.message;
                }
            } else {
                console.error("Network error");
                // alert("Could not connect to the server. Please try again.");
            }
        }
    }
    loginUser = (e) => {
        e.preventDefault();
        // console.log(this.state)
        // convert this.state to json 
        if (this.validator.allValid()) {
            document.getElementById("addressListSpinner").style.display = "block";
            document.getElementById("registerBox").style.display = "none";
            document.getElementById("messageBox").style.display = "none";
            this.postData(this.state);
        }
        else {
            this.validator.showMessages();
            // render(<div>{this.validator.message('email')}</div>);
            this.forceUpdate();
        }

    }
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            password: ''
        }
        this.validator = new SimpleReactValidator();
    }

    render() {


        return (
            <div>
                <Breadcrumb title={'Login'} />


                {/*Login section*/}
                <section className="login-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <h3>Login</h3>
                                <div className="theme-card">
                                    <form className="theme-form">
                                        <div className="form-group">
                                            <label htmlFor="email">Email / Phone no</label>
                                            <input type="text" className="form-control" id="id" placeholder="Email / Phone no" name="id" value={this.state.id} onChange={this.setStateFromInput}
                                                required="" />
                                            {this.validator.message('id', this.state.id, 'required')}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="review">Password</label>
                                            <input type="password" className="form-control" id="review"
                                                placeholder="Enter your password" name='password' value={this.state.password} onChange={this.setStateFromInput} required="" />
                                            {this.validator.message('password', this.state.password, 'required')}
                                        </div>
                                        <div id="addressListSpinner" style={{ textAlign: 'center', zIndex: '999', position: "relative", display: "none" }}>
                                            <div className="loading-indicator-center"><ThreeDot variant="bounce" color="#427fc1" size="small" text="" textColor="" /></div>
                                        </div>
                                        <div id="registerBox">
                                            <button type="buttton" onClick={(e) => this.loginUser(e)} className="btn btn-solid">Login</button>
                                        </div>
                                        <div id="messageBox" className="m-2" style={{ display: "none" }}>
                                            {/* <h3 id="messageArea" className='text-center'></h3> */}
                                            <div className="alert alert-danger" id="messageArea" role="alert">
                                            </div>

                                        </div>
                                        <Link style={{ float: "right" }} href="/forget-password">Forgot Password</Link>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-6 right-login">
                                <h3>New Customer</h3>
                                <div className="theme-card authentication-right">
                                    <h6 className="title-font">Create A Account</h6>
                                    <p>Sign up for a free account at our store. Registration is quick and easy. It
                                        allows you to be able to order from our shop. To start shopping click
                                        Create an Account.</p>
                                    <a href="/register" className="btn btn-solid">Create an Account</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

export default Login