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
    }

    componentDidMount() {
        isLoggedin('dashboard', true);
        const contact_id = getContactIdFromJWT();
        const data = {
            "contact_id": contact_id
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
                
                <style jsx>{`
                    .premium-dashboard {
                        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                        min-height: 80vh;
                        padding: 40px 0;
                    }
                    .premium-card {
                        background: white;
                        border-radius: 15px;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                        padding: 25px;
                        margin-bottom: 20px;
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                    }
                    .premium-card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 15px 40px rgba(0,0,0,0.15);
                    }
                    .wallet-badge {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        padding: 15px 25px;
                        border-radius: 50px;
                        display: inline-flex;
                        align-items: center;
                        gap: 10px;
                        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
                        font-weight: 600;
                        margin-bottom: 20px;
                    }
                    .wallet-amount {
                        font-size: 24px;
                        font-weight: 700;
                    }
                    .sidebar-menu {
                        background: white;
                        border-radius: 15px;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                        overflow: hidden;
                    }
                    .sidebar-menu ul {
                        list-style: none;
                        padding: 0;
                        margin: 0;
                    }
                    .sidebar-menu li {
                    width: 100%;
                        border-bottom: 1px solid #f0f0f0;
                    }
                    .sidebar-menu li:last-child {
                        border-bottom: none;
                    }
                    .sidebar-menu a {
                        display: flex;
                        align-items: center;
                        padding: 18px 25px;
                        color: #333;
                        text-decoration: none;
                        transition: all 0.3s ease;
                        font-weight: 500;
                    }
                    .sidebar-menu a i {
                        margin-right: 12px;
                        width: 20px;
                        text-align: center;
                        color: #667eea;
                    }
                    .sidebar-menu li.active a,
                    .sidebar-menu a:hover {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                    }
                    .sidebar-menu li.active a i,
                    .sidebar-menu a:hover i {
                        color: white;
                    }
                    .welcome-section {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        padding: 30px;
                        border-radius: 15px;
                        margin-bottom: 30px;
                        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
                    }
                    .welcome-section h2 {
                        font-size: 32px;
                        font-weight: 700;
                        margin-bottom: 10px;
                    }
                    .welcome-section p {
                        opacity: 0.95;
                        font-size: 16px;
                        line-height: 1.6;
                        color: white;
                    }
                    .info-box {
                        background: white;
                        border-radius: 12px;
                        padding: 25px;
                        height: 100%;
                        border-left: 4px solid #667eea;
                    }
                    .info-box h3 {
                        color: #667eea;
                        font-size: 18px;
                        font-weight: 600;
                        margin-bottom: 15px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                    .info-box h6 {
                        color: #666;
                        margin-bottom: 8px;
                        font-size: 14px;
                    }
                    .edit-link {
                        color: #667eea;
                        font-size: 14px;
                        cursor: pointer;
                        text-decoration: none;
                        font-weight: 500;
                        transition: color 0.3s ease;
                    }
                    .edit-link:hover {
                        color: #764ba2;
                        text-decoration: underline;
                    }
                    .btn-premium {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        border: none;
                        color: white;
                        padding: 10px 25px;
                        border-radius: 25px;
                        font-weight: 600;
                        transition: all 0.3s ease;
                        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
                    }
                    .btn-premium:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
                    }
                    .address-card {
                        background: #f8f9fa;
                        padding: 20px;
                        border-radius: 10px;
                        border-left: 4px solid #667eea;
                        margin-bottom: 15px;
                    }
                    .form-control-premium {
                        border: 2px solid #e0e0e0;
                        border-radius: 8px;
                        padding: 10px 15px;
                        transition: border-color 0.3s ease;
                    }
                    .form-control-premium:focus {
                        border-color: #667eea;
                        box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
                    }
                    @media (max-width: 991px) {
                        .sidebar-menu {
                            display: none;
                        }
                    }
                `}</style>

                {/*Dashboard section*/}
                <section className="premium-dashboard">
                    <div className="container">
                        {loading?
                        <div className="loading-indicator"><BlinkBlur color="#667eea" size="medium" text="Loading your dashboard..." textColor="#667eea" /></div>
                        :
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="sidebar-menu">
                                    <ul>
                                        <li className="active">
                                            <a href='/dashboard'>
                                                <i className="fa fa-user-circle"></i>
                                                Account Info
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/orders">
                                                <i className="fa fa-shopping-bag"></i>
                                                My Orders
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/wishlist">
                                                <i className="fa fa-heart"></i>
                                                My Wishlist
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/cart">
                                                <i className="fa fa-shopping-cart"></i>
                                                My Cart
                                            </a>
                                        </li>
                                        <li className="last">
                                            <a href="#" onClick={(e) => this.logout(e)}>
                                                <i className="fa fa-sign-out"></i>
                                                Log Out
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="wallet-badge">
                                    <i className="fa fa-wallet"></i>
                                    <span>Wallet Balance:</span>
                                    <span className="wallet-amount">₹{this.state.wallet}</span>
                                </div>
                                
                                <div className="welcome-section">
                                    <h2>Welcome back, {this.state.name.charAt(0).toUpperCase() + this.state.name.slice(1)}! 👋</h2>
                                    <p>Manage your account, track orders, and update your information all in one place. We're here to make your shopping experience seamless and enjoyable.</p>
                                </div>
                                <div className="premium-card">
                                    <h3 style={{color: '#667eea', fontSize: '24px', fontWeight: '700', marginBottom: '25px'}}>
                                        <i className="fa fa-info-circle" style={{marginRight: '10px'}}></i>
                                        Account Information
                                    </h3>
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="info-box">
                                                <h3>
                                                    <span><i className="fa fa-address-card" style={{marginRight: '8px'}}></i>Contact Information</span>
                                                    <a className="edit-link">Edit</a>
                                                </h3>
                                                <div className="box-content">
                                                    <h6><i className="fa fa-user" style={{marginRight: '8px', color: '#667eea'}}></i>{this.state.name.charAt(0).toUpperCase() + this.state.name.slice(1)}</h6>
                                                    <h6><i className="fa fa-phone" style={{marginRight: '8px', color: '#667eea'}}></i>{this.state.phone}</h6>
                                                    <h6><i className="fa fa-envelope" style={{marginRight: '8px', color: '#667eea'}}></i>{this.state.email_id}</h6>
                                                    <h6><a onClick={(e) => this.showUpdatePanel(e)} className="edit-link"><i className="fa fa-lock" style={{marginRight: '8px'}}></i>Change Password</a></h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="info-box" id="showPasswordPanel" style={{ display: "none" }}>
                                                <h3>
                                                    <i className="fa fa-key" style={{marginRight: '8px'}}></i>Change Password
                                                </h3>
                                                <div className="box-content">
                                                    <label style={{fontWeight: '600', marginBottom: '5px', display: 'block'}}>New Password</label>
                                                    <input className='form-control form-control-premium mb-3' type="password" name="new_password" id="new_password" placeholder="Enter new password" />
                                                    <label style={{fontWeight: '600', marginBottom: '5px', display: 'block'}}>Confirm Password</label>
                                                    <input className='form-control form-control-premium mb-3' type="password" name="confirm_password" id="confirm_password" placeholder="Confirm password" />
                                                    <button className="btn btn-premium" onClick={(e) => this.updatePassword(e)}>
                                                        <i className="fa fa-check" style={{marginRight: '8px'}}></i>Update Password
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="premium-card">
                                    <h3 style={{color: '#667eea', fontSize: '24px', fontWeight: '700', marginBottom: '25px'}}>
                                        <i className="fa fa-map-marker" style={{marginRight: '10px'}}></i>
                                        Address Book
                                        <a onClick={(e) => this.showAllAddress(e)} className="edit-link" style={{fontSize: '14px', float: 'right'}}>
                                            <i className="fa fa-list" style={{marginRight: '5px'}}></i>Manage Addresses
                                        </a>
                                    </h3>
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="info-box">
                                                <h3>
                                                    <i className="fa fa-home" style={{marginRight: '8px'}}></i>Default Shipping Address
                                                </h3>
                                                <div className="address-card">
                                                    <h6 className="card-text" style={{lineHeight: '1.8'}}>
                                                        <i className="fa fa-map-pin" style={{marginRight: '8px', color: '#667eea'}}></i>
                                                        {this.state.address.address}, {this.state.address.landmark}, {this.state.address.city}, {this.state.address.state}
                                                    </h6>
                                                    <h6><i className="fa fa-location-arrow" style={{marginRight: '8px', color: '#667eea'}}></i>{this.state.address.pincode}</h6>
                                                    <h6 className="card-text"><i className="fa fa-phone" style={{marginRight: '8px', color: '#667eea'}}></i>{this.state.address.contact_no}</h6>
                                                </div>
                                                <a onClick={(e) => this.showUpdateAddressPanel(e)} className="edit-link">
                                                    <i className="fa fa-edit" style={{marginRight: '5px'}}></i>Edit Address
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4" id="showUpdateAddressPanel" style={{ display: "none" }}>
                                            <div className="info-box">
                                                <h3><i className="fa fa-edit" style={{marginRight: '8px'}}></i>Update Address</h3>
                                                <div className="box-content">
                                                    <label style={{fontWeight: '600', marginBottom: '5px', display: 'block'}}>Address</label>
                                                    <input className='form-control form-control-premium mb-2' type="text" name="address" id="address" onChange={(e) => this.handleAddressChange(e)} value={this.state.address.address || ""} placeholder="Address" />
                                                    <label style={{fontWeight: '600', marginBottom: '5px', display: 'block'}}>Landmark</label>
                                                    <input className='form-control form-control-premium mb-2' type="text" name="landmark" id="landmark" onChange={(e) => this.handleAddressChange(e)} value={this.state.address.landmark || ""} placeholder="Landmark" />
                                                    <label style={{fontWeight: '600', marginBottom: '5px', display: 'block'}}>City</label>
                                                    <input className='form-control form-control-premium mb-2' type="text" name="city" id="city" onChange={(e) => this.handleAddressChange(e)} value={this.state.address.city || ""} placeholder="City" />
                                                    <label style={{fontWeight: '600', marginBottom: '5px', display: 'block'}}>State</label>
                                                    <input className='form-control form-control-premium mb-2' type="text" name="state" id="state" onChange={(e) => this.handleAddressChange(e)} value={this.state.address.state || ""} placeholder="State" />
                                                    <label style={{fontWeight: '600', marginBottom: '5px', display: 'block'}}>Pincode</label>
                                                    <input className='form-control form-control-premium mb-2' type="text" name="pincode" id="pincode" onChange={(e) => this.handleAddressChange(e)} value={this.state.address.pincode || ""} placeholder="Pincode" />
                                                    <label style={{fontWeight: '600', marginBottom: '5px', display: 'block'}}>Contact No</label>
                                                    <input className='form-control form-control-premium mb-3' type="text" name="contact_no" id="contact_no" onChange={(e) => this.handleAddressChange(e)} value={this.state.address.contact_no || ""} placeholder="Contact No" />
                                                    <button className="btn btn-premium" onClick={(e) => this.updateAddress(e)}>
                                                        <i className="fa fa-save" style={{marginRight: '8px'}}></i>Update Address
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="premium-card" id="showAllAddress" style={{ display: "none" }}>
                                    <h3 style={{color: '#667eea', fontSize: '24px', fontWeight: '700', marginBottom: '25px'}}>
                                        <i className="fa fa-list-alt" style={{marginRight: '10px'}}></i>All Addresses
                                    </h3>
                                    <div className="row">
                                        {this.state.addresses ? this.state.addresses.map((address, index) => {
                                            return (
                                                <div className="col-lg-6 col-md-12 mb-3" key={index}>
                                                    <div className="address-card" style={{position: 'relative'}}>
                                                        <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
                                                            <input type="radio" name="address" onClick={() => this.setState({ userData: address })} style={{width: '20px', height: '20px', cursor: 'pointer'}} />
                                                        </div>
                                                        <h5 style={{color: '#667eea', fontWeight: '600', marginBottom: '10px'}}>
                                                            <i className="fa fa-user" style={{marginRight: '8px'}}></i>{address.name}
                                                        </h5>
                                                        <p className="card-text" style={{marginBottom: '8px', lineHeight: '1.6'}}>
                                                            <i className="fa fa-map-marker" style={{marginRight: '8px', color: '#667eea'}}></i>
                                                            {address.address}, {address.landmark}, {address.city}, {address.state}, {address.pincode}
                                                        </p>
                                                        <p className="card-text">
                                                            <i className="fa fa-phone" style={{marginRight: '8px', color: '#667eea'}}></i>{address.contact_no}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        }) : ""}
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