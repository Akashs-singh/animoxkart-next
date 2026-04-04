'use client'
import React, { Component } from 'react';
import Breadcrumb from "../common/breadcrumb";
import Cookies from 'js-cookie';
import axios from 'axios';
import { BlinkBlur } from 'react-loading-indicators';
import { getContactIdFromJWT, isLoggedin } from '../common/utils/index';
import { toast } from 'react-hot-toast';
class Dashboard extends Component {

    constructor(props) {
        super(props)
        isLoggedin('dashboard', true);
        const contact_id = getContactIdFromJWT();
        const data = {
            "contact_id": contact_id
        }
        this.state = {
            data: [],
            coupons: [],
            name: '',
            phone: '',
            email_id: '',
            addresses: [],
            address: [],
            wallet: 0,
            loading: true,
        }
        this.getContactDetails(data);
    }
    getContactDetails = async (data) => {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/getContactAllDetails', data, {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        });
        if (response.data != null) {
            
            this.setState({
                loading: false,
                data: response.data,
                name: response.data.name,
                phone: response.data.phone_no,
                email_id: response.data.email_id,
                wallet: response.data.wallet,
                addresses: JSON.parse(response.data.details),
            })
            if (this.state.addresses) {
                this.state.addresses.map((address) => {
                    if (address.default == 1) {
                        this.setState({
                            address: address,
                        })
                    }
                })
            }
        }
    }
    notify = () => toast('Account Logged Out!',{
        duration: 2000,
        position: 'top-center'
});

    logout = (e) => {
        Cookies.remove('token');
        Cookies.remove('redirect');
        this.notify();
        this.props.history.push('/');
    }
    showUpdatePanel = (e) => {
        e.preventDefault();
        document.getElementById("showPasswordPanel").style.display = "block";
    }
    showUpdateAddressPanel = (e) => {
        e.preventDefault();
        document.getElementById("showUpdateAddressPanel").style.display = "block";
    }

    updatePassword = (e) => {
        e.preventDefault();
        document.getElementById("showPasswordPanel").style.display = "none";
    }
    updateAddress = (e) => {
        e.preventDefault();
        document.getElementById("showUpdateAddressPanel").style.display = "none";
    }
    showAllAddress = (e) => {
        e.preventDefault();
        document.getElementById("showAllAddress").style.display = "block";
    }
    handleAddressChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
          address: {
            ...prevState.address,
            [name]: value,
          },
        }));
      };
    render() {
        const { loading } = this.state;

        return (
            <div>
                <Breadcrumb title={'Dashboard'} />


                {/*Dashboard section*/}
                <section className="section-b-space">
                    <div className="container">
                        {loading? 
                        <div className="loading-indicator"><BlinkBlur color="#427fc1" size="small" text="loading" textColor="#020202" /></div>
                        : 
                        <div className="row">
                            <div className="col-lg-3">
                                {/* <div className="account-sidebar">
                                    <a className="popup-btn">
                                        my account
                                    </a>
                                </div> */}
                                {/* <div className="account-sidebar">
                                    <a className="popup-btn">
                                        wallet : 
                                    </a>
                                </div> */}

                                <div className="dashboard-left">
                                    <div className="collection-mobile-back">
                                        <span className="filter-back">
                                            <i className="fa fa-angle-left" aria-hidden="true"></i> back
                                        </span>
                                    </div>
                                    <div className="block-content">
                                        <ul>
                                            <li className="active"><a href='/dashboard'>Account Info</a></li>
                                            <li><a href="/orders">My Orders</a></li>
                                            <li><a href="/wishlist">My Wishlist</a></li>
                                            <li><a href="/cart">My Cart</a></li>
                                            <li className="last"><a href="#" onClick={(e) => this.logout(e)}>Log Out</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="m-2" style={{ display: "flex", alignItems: "center", flexDirection: "row", padding: "5px", border: "1px solid lightgray", float: "right" }}>
                                    <div><span style={{ fontSize: "16px", fontWeight: "600" }}>Wallet:&nbsp; </span> </div>
                                    <div style={{ fontSize: "20px", fontWeight: "600" }}>₹{this.state.wallet}</div>
                                </div>
                                <div className="dashboard-right">

                                    <div className="dashboard">
                                        <div className="page-title">
                                            <h2>My Account</h2>
                                        </div>
                                        <div className="welcome-msg">
                                            <p>Hello, {this.state.name.charAt(0).toUpperCase() + this.state.name.slice(1)} !</p>
                                            <p>From your My Account Dashboard you have the ability to view a snapshot of
                                                your recent account activity and update your account information. Select
                                                a link below to view or edit information.</p>
                                        </div>
                                        <div className="box-account box-info">
                                            <div className="box-head">
                                                <h2>Account Information</h2>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="box">
                                                        <div className="box-title">
                                                            <h3>Contact Information</h3>
                                                            <a href="#">Edit</a>
                                                        </div>
                                                        <div className="box-content">
                                                            <h6>{this.state.name.charAt(0).toUpperCase() + this.state.name.slice(1)}</h6>
                                                            <h6>{this.state.phone}</h6>
                                                            <h6>{this.state.email_id}</h6>
                                                            <h6><a onClick={(e) => this.showUpdatePanel(e)}  style={{cursor:"pointer"}}>Change Password</a></h6>
                                                        </div>
                                                        {/* <div className="box-content" id="showPanel" style={{display:"none"}}>
                                                            <label>Fill Password</label>
                                                            <input type="password" name="password" id="password" placeholder="Password" />
                                                            <label>Fill Confirm Password</label>
                                                            <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirm Password" />
                                                            <button className="btn btn-solid" onClick={(e)=>this.updatePassword(e)}>Update Password</button>
                                                        </div> */}
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="box" id="showPasswordPanel" style={{ display: "none" }}>
                                                        <div className="box-title">
                                                            <h3>Change Password</h3>
                                                        </div>
                                                        <div className="box-content" >
                                                            <label>New Password</label>
                                                            <input className='form-control' type="password" name="new_password" id="new_password" placeholder="Password" />
                                                            <label>Confirm Password</label>
                                                            <input className='form-control' type="password" name="confirm_password" id="confirm_password" placeholder="Confirm Password" />
                                                            <button className="btn btn-sm btn-solid mt-2" onClick={(e) => this.updatePassword(e)}>Update Password</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="box">
                                                    <div className="box-title">
                                                        <h3>Address Book</h3>
                                                        <a onClick={(e) => this.showAllAddress(e)}>Manage Addresses</a>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <h6>Default Shipping Address</h6>
                                                            <address>

                                                                <div className="box-content">
                                                                    {/* <div className="checkout-btn" style={{ float: "right" }}>
                                                                <input type="radio" className="" name="address" onClick={() => this.setState({ userData: address })} />
                                                            </div> */}
                                                                    <h6 className="card-text">{this.state.address.address} ,{this.state.address.landmark}, {this.state.address.city} , {this.state.address.state} </h6><h6> {this.state.address.pincode}</h6>
                                                                    <h6 className="card-text">{this.state.address.contact_no}</h6>
                                                                </div>
                                                                <a onClick={(e) => this.showUpdateAddressPanel(e)}>Edit Address</a>
                                                            </address>
                                                        </div>
                                                        <div className="col-sm-6" id="showUpdateAddressPanel" style={{ display: "none" }}>
                                                            <h6>Update Address</h6>
                                                            <address>
                                                                <label >Address</label>
                                                                <input className='form-control' type="text" name="address" id="address"  onChange={(e) => this.handleAddressChange(e)} value={this.state.address.address || ""} placeholder="Address" />
                                                                <label>Landmark</label>
                                                                <input className='form-control' type="text" name="landmark" id="landmark"  onChange={(e) => this.handleAddressChange(e)} value={this.state.address.landmark || ""} placeholder="Landmark" />
                                                                <label>City</label>
                                                                <input className='form-control' type="text" name="city" id="city"  onChange={(e) => this.handleAddressChange(e)} value={this.state.address.city || ""} placeholder="City" />
                                                                <label>State</label>
                                                                <input className='form-control' type="text" name="state" id="state"  onChange={(e) => this.handleAddressChange(e)} value={this.state.address.state || ""} placeholder="State" />
                                                                <label>Pincode</label>
                                                                <input className='form-control' type="text" name="pincode" id="pincode"  onChange={(e) => this.handleAddressChange(e)} value={this.state.address.pincode || ""} placeholder="Pincode" />
                                                                <label>Contact No</label>
                                                                <input className='form-control' type="text" name="contact_no" id="contact_no"  onChange={(e) => this.handleAddressChange(e)} value={this.state.address.contact_no || ""} placeholder="Contact No" />
                                                                <button className="btn btn-solid mt-2" onClick={(e) => this.updateAddress(e)}>Update Address</button>
                                                            </address>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="box" id="showAllAddress" style={{ display: "none" }}>
                                                    <div className="box-title">
                                                        <h3>Addresses</h3>
                                                        {/* <a href="#">Manage Addresses</a> */}
                                                    </div>
                                                    <div className="row">
                                                        {this.state.addresses ? this.state.addresses.map((address, index) => {
                                                            return (
                                                                <div className="col-lg-12 col-sm-12 col-xs-12 mt-2" key={index}>
                                                                    <div className="card">
                                                                        <div className="card-body">
                                                                            <div className="checkout-btn" style={{ float: "right" }}>
                                                                                <input type="radio" className="" name="address" onClick={() => this.setState({ userData: address })} />
                                                                            </div>
                                                                            <h5 className="card-title">{address.name}</h5>
                                                                            <p className="card-text">{address.address} ,{address.landmark}, {address.city} , {address.state} , {address.pincode}</p>
                                                                            <p className="card-text">{address.contact_no}</p>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            )
                                                        }) : ""}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    }
                    </div>
                </section>

            </div>
        )
    }
}

export default Dashboard