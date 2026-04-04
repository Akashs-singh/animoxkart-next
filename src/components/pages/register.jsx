'use client';
import React, { Component } from 'react';
import axios from 'axios';
import Breadcrumb from "../common/breadcrumb";
import 'react-toastify/dist/ReactToastify.css';
import SimpleReactValidator from 'simple-react-validator';
import firebaseapp from '../firebase/firebase';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { ThreeDot } from 'react-loading-indicators';
const auth = getAuth(firebaseapp);
class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            phone: '',
            otp: '',
            cashback: '',
            loading: false,
            resendotp: false,
            otpSent: false,
            otpVerify: false,
            isOtpVerified: false,
            showAlert: false,
            alertMessage: '',
            showErrorAlert: false,
            errorMessage: '',
            showOtpErrorAlert: false,
            showSuccessAlert: false,
            showCashback: false
        }
        this.validator = new SimpleReactValidator();
    }
    setStateFromInput = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);

    }
    componentDidMount() {
        // Get cashback from Next.js params (optional catch-all route)
        const { params } = this.props;
        if (params && params.cashback) {
            // cashback is an array from catch-all route, get first element
            const cashbackValue = Array.isArray(params.cashback) ? params.cashback[0] : params.cashback;
            this.setState({
                cashback: cashbackValue
            });
        }
    }
    postData = async (datas) => {
        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL_NEW + '/register', datas, {
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                }
            });
            if (response.data.status == true) {

                this.setState({ showAlert: true, loading: false, alertMessage: response.data.message });
                if (this.state.cashback == "") {
                    setTimeout(function () {
                        window.location.href = "/login";
                    }, 1000);
                } else {
                    this.setState({ showCashback: true, showSuccessAlert: false });
                }
            }
            else {
                this.setState({ showErrorAlert: true, showSuccessAlert: false, errorMessage: response.data.message, loading: false });

            }
        }
        catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    this.setState({ showErrorAlert: true, showSuccessAlert: false, errorMessage: error.response.data.message, loading: false });
                } else {
                    this.setState({ showErrorAlert: true, showSuccessAlert: false, errorMessage: error.response.data.message, loading: false });
                }
            } else {
                this.setState({ showErrorAlert: true, showSuccessAlert: false, errorMessage: error.response.data.message, loading: false });
            }
        }
    }

    callVerify = (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            this.setState({ loading: true });
            this.verifyUserExists();
            return;
        }
        else {
            this.validator.showMessages();
            this.forceUpdate();
        }

    }
    verifyUserExists = async () => {
        let data = {
            email: this.state.email,
            phone: this.state.phone
        }
        // call verifyUserExists using get method
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/verifyUserExists', {
            params: data,
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        });
        this.setState({ loading: false });
        if (response.data.status == true) {
            this.setState({ otpSent: false, showErrorAlert: true, errorMessage: response.data.message });
            return;
        } else {
            this.setState({ showErrorAlert: false, errorMessage: "", loading: true });
            this.handleClick();
        }
    }

    handleClick = () => {
        this.setState({ otp: '', resendotp: false });
        this.sendOtp();
    }

    handleResendOtp = (e) => {
        e.preventDefault();
        this.setState({ otp: '', otpSent: false, otpVerify: false, showOtpErrorAlert: false, showSuccessAlert: false });
        this.sendOtp();
    }

    showTimer = () => {
        var timeleft = 60;
        var downloadTimer = setInterval(function () {
            let element = document.getElementById("verify-button");
            if (element !== null) {
                element.disabled = true;
                // console.log(timeleft);
                element.innerHTML = timeleft + " sec ";
                timeleft -= 1;
                if (timeleft <= 0) {
                    clearInterval(downloadTimer);
                    element.innerHTML = "Resend OTP";
                    element.disabled = false;
                }
            }

        }, 1000);
    }
    verifyCaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber
            },
            'expired-callback': () => {
                // Response expired, reset reCAPTCHA
                window.recaptchaVerifier.clear();
            }
        });
    }
    sendOtp = () => {
        if (!window.recaptchaVerifier) {
            this.verifyCaptcha();
        }
        const phoneNumber = "+91" + this.state.phone;
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;

                // ...
            }).catch((error) => {
                //    console.log(error);
                // ...
            });
        this.setState({ otpSent: true, otpVerify: true, loading: false });
        this.showTimer();
    }


    verifyOTP = (e) => {
        e.preventDefault();
        let otp = this.state.otp;
        window.confirmationResult.confirm(otp).then((result) => {
            // User signed in successfully.
            this.setState({ isOtpVerified: true, showSuccessAlert: true, showOtpErrorAlert: false, otpSent: false, otpVerify: false, loading: true });
            // this.createUser();
            this.postData(this.state);
            // ...
        }).catch((error) => {

            this.setState({ showOtpErrorAlert: true, showSuccessAlert: false, otpVerify: true });
            // User couldn't sign in (bad verification code?)
            // ...
        });
    }

    getCashbackBanner = (cashback) => {
        let amount = 0;
        if (cashback == "getflatfiftycashback") {
            amount = 50;
            return "<div style='text-align:center;'><span><Strong style='font-size:20px;'>Get Flat ₹" + amount + " Cashback!</Strong></span><br /><span>Create an account and get ₹" + amount + " cashback directly into your account. Thank you!</span></div>";
        } else if (cashback == "getflathundredcashback") {
            amount = 100;
            return "<div style='text-align:center;'><span><Strong style='font-size:20px;'>Get Flat ₹" + amount + " Cashback!</Strong></span><br /><span>Create an account and get ₹" + amount + " cashback directly into your account. Thank you!</span></div>";
        }
        else if (cashback == "getflattwentycashback") {
            amount = 20;
            return "<div style='text-align:center;'><span><Strong style='font-size:20px;'>Get Flat ₹" + amount + " Cashback!</Strong></span><br /><span>Create an account and get ₹" + amount + " cashback directly into your account. Thank you!</span></div>";
        } else if (cashback == "getfiftypercentcashbackuptohundred") {
            amount = 30;
            return "<div style='text-align:center;'><span><Strong style='font-size:20px;'>Get 50% Cashback Upto ₹100 !</Strong></span><br /><span>Create an account and get upto ₹100 cashback directly into your account. Thank you!</span></div>";
        }
        return ""
    }



    render() {
        const { otpSent, otpVerify, showAlert, alertMessage, showCashback, showErrorAlert, errorMessage, showOtpErrorAlert, showSuccessAlert } = this.state;
        const display = this.state.cashback != "" ? "flex" : "none";
        const cashbackdisplay = {
            display: display,
            backgroundColor: "#427fc1", color: "white", width: "100%", justifyContent: "center"
        }
        return (
            <div>
                <Breadcrumb title={'create account'} />


                {/*Regsiter section*/}
                <section className="register-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className='m-3 p-2' style={cashbackdisplay} dangerouslySetInnerHTML={{ __html: this.getCashbackBanner(this.state.cashback) }}></div>
                            <div className="col-lg-12">
                                <h3>create account</h3>

                                <div className="theme-card"  >

                                    <form className="theme-form">
                                        <div className="form-row">
                                            <div id="recaptcha-container"></div>
                                            <div className="col-md-6">
                                                <label htmlFor="email">Name</label>
                                                <input type="text" name="name" className="form-control" id="name"
                                                    placeholder="Name" value={this.state.name} onChange={this.setStateFromInput} required="" />
                                                {this.validator.message('name', this.state.name, 'required')}
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="review">Phone Number</label>
                                                <input type="number" name="phone" className="form-control" id="phone"
                                                    placeholder="Phone number" value={this.state.phone} onChange={this.setStateFromInput} required="" />
                                                {this.validator.message('phone', this.state.phone, 'required|phone')}
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <label htmlFor="email">email</label>
                                                <input type="text" className="form-control" id="email"
                                                    placeholder="Email" name="email" value={this.state.email} onChange={this.setStateFromInput} required="" />
                                                {this.validator.message('email', this.state.email, 'required|email')}
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="review">Password</label>
                                                <input type="password" className="form-control" id="review"
                                                    placeholder="Enter your password" name="password" value={this.state.password} onChange={this.setStateFromInput} required="" />
                                                {this.validator.message('password', this.state.password, 'required')}
                                            </div>
                                            {this.state.loading ?
                                                <div className="loading-indicator-center"><ThreeDot variant="bounce" color="#427fc1" size="small" text="" textColor="" /></div> :
                                                <div className="col-md-12">
                                                    {otpSent ? <button className="btn btn-solid" id="verify-button" onClick={(e) => this.handleResendOtp(e)}>Resend OTP</button> :
                                                        <button className="btn btn-solid" id="verify-button" onClick={(e) => this.callVerify(e)}>Register</button>
                                                    }
                                                </div>
                                            }

                                            {otpSent ? <div className="col-md-12 mt-2">
                                                <div className="alert alert-success" id="otp-sent-alert">
                                                    Your otp has been sent to your phone number.
                                                </div>
                                            </div> : ''}
                                            {otpVerify ? <div className="col-md-12 mt-3" id="otp-verify-section" >
                                                <input type="text" className="form-control" id="otp" name="otp" value={this.state.otp}
                                                    placeholder="Enter Your OTP" onChange={this.setStateFromInput} required />
                                                <button className="btn btn-solid" id="verifyOtpButton" onClick={(e) => this.verifyOTP(e)}>Verify OTP</button>
                                                {showOtpErrorAlert ? <div className="alert alert-danger" id="otp-invalid-alert">
                                                    <strong>Oops!</strong> OTP is not valid. Retry again.
                                                </div> : ""}

                                            </div> : ""}
                                            {showSuccessAlert ? <div className="alert alert-success" id="otp-success-alert">
                                                OTP verified successfully.
                                            </div> : ""}
                                            {showCashback ? <div id="cashbackMessage" className="m-2">
                                                <div className="">
                                                    <h6 className="title-font"><b>Cashback Redeemed Successfully</b></h6>
                                                    <p>Your cashback will be credited to your account wallet within the next 7 days. Thank you for registering with us.</p>
                                                    <a href="/login" className="btn btn-solid">Log In</a>
                                                </div>
                                            </div> : ""}
                                            {/* <div id="registerBox">
                                                <button type="buttton" onClick={(e) => this.createUser(e)} className="btn btn-solid">create Account</button>
                                            </div> */}
                                            {showErrorAlert ? <div id="messageBox" className="m-2">
                                                <div className="alert alert-danger" id="messageArea" role="alert">
                                                    {errorMessage}
                                                </div>

                                            </div> : ""}
                                            {showAlert ? <div id="messageBox" className="m-2">
                                                <div className="alert alert-success" id="messageArea" role="alert">
                                                    {errorMessage}
                                                </div>

                                            </div> : ""}


                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

export default Register