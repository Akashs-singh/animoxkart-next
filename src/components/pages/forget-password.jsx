'use client';
import React, { Component } from 'react';
import axios from 'axios';
import Breadcrumb from "../common/breadcrumb";
import firebaseapp from '../firebase/firebase';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
const auth = getAuth(firebaseapp);
class ForgetPassword extends Component {

    constructor(props) {
        super(props)
        this.state = {
            inputData: '',
            otp: '',
            type: 'number',
            password: '',
            confirmPassword: '',
            isOtpSent: false,
            isOtpVerified: false,
        }
    }
    componentDidMount() {
        // Function to reload the page
        const handleBackButton = () => {
          window.location.reload();
        };
    
        // Push a dummy state to the history stack
        window.history.pushState(null, null, window.location.href);
    
        // Attach the event listener to handle back button press
        window.onpopstate = handleBackButton;
      }
    
      componentWillUnmount() {
        // Clean up the event listener when the component is unmounted
        window.onpopstate = null;
      }
    setStateFromInput = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    }
    handleClick = async (e) => {
        e.preventDefault();
        //check input value is number or email
        if (this.state.inputData === '') {
            return;
        }
        document.getElementById("otp-sent-alert").style.display = "none";
        document.getElementById("not-register-alert").style.display = "none";
        document.getElementById("otp-invalid-alert").style.display = "none";
        document.getElementById("otp-verify-section").style.display = "none";
        document.getElementById("verify-button").disabled = true;
        document.getElementById("verify-button").innerHTML = "Verifying...";
        this.state.otp = '';

        const inputDataType = this.state.inputData.match(/^\d+$/) ? 'number' : 'email';
        if (inputDataType === 'number') {
            this.setState({ type: 'number' });
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/verifyUser', {
                params: { 'input': this.state.inputData },
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                }
            });
            if (!response.data.status) {
                document.getElementById("not-register-alert").style.display = "block";
                document.getElementById("verify-button").disabled = false;
                document.getElementById("verify-button").innerHTML = "Verify";
                return;
            }
            document.getElementById("verify-button").disabled = true;
            this.showTimer();
            this.sendOtp();
            document.getElementById("otp-sent-alert").style.display = "block";
            document.getElementById("otp-verify-section").style.display = "block";
        } else {
            this.setState({ type: 'email' });
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/verifyUser', {
                params: { 'input': this.state.inputData },
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                }
            });
            if (!response.data.status) {
                document.getElementById("not-register-alert").style.display = "block";
                document.getElementById("verify-button").disabled = false;
                document.getElementById("verify-button").innerHTML = "Verify";
                return;
            }
            document.getElementById("verify-button").disabled = true;
            this.showTimer();
            this.sendMail({ 'input': this.state.inputData });
        }
    }

    showTimer = () => {
        var timeleft = 60;
        var downloadTimer = setInterval(function () {
            let element = document.getElementById("verify-button");
            if (element !== null) {
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
    sendMail = async (data) => {
        // console.log(data);
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/sendMailOtp', {
            params: data,
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        });
        if (response.data.status) {
            document.getElementById("otp-sent-alert").style.display = "block";
            document.getElementById("otp-verify-section").style.display = "block";
        }
        else {
            document.getElementById("not-register-alert").style.display = "block";
            document.getElementById("not-register-alert").innerHTML = response.data.message;
        }
    }
    
    verifyMailOtp = async (e) => {
        e.preventDefault();
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/verifyMailOtp', {
            params: { 'email': this.state.inputData, 'otp': this.state.otp },
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        });
        if (response.data.status) {
            document.getElementById("otp-sent-alert").style.display = "none";
            document.getElementById("otp-invalid-alert").style.display = "none";
            document.getElementById("otp-success-alert").style.display = "block";
            document.getElementById("reset-password-section").style.display = "block";
            document.getElementById("forgot-area-section").style.display = "none";
            this.setState({ isOtpVerified: true });
        } else {
            document.getElementById("otp-sent-alert").style.display = "none";
            document.getElementById("otp-success-alert").style.display = "none";
            document.getElementById("otp-invalid-alert").style.display = "block";
        }
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
        const phoneNumber = "+91" + this.state.inputData;
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                // ...
            }).catch((error) => {
                // console.log(error);
                // ...
            });
    }

    verifyOTP = (e) => {
        e.preventDefault();
        let otp = this.state.otp;
        window.confirmationResult.confirm(otp).then((result) => {
            // User signed in successfully.
            document.getElementById("otp-sent-alert").style.display = "none";
            document.getElementById("otp-invalid-alert").style.display = "none";
            document.getElementById("otp-success-alert").style.display = "block";
            document.getElementById("reset-password-section").style.display = "block";
            document.getElementById("forgot-area-section").style.display = "none";
            this.setState({ isOtpVerified: true });
            // ...
        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            document.getElementById("otp-sent-alert").style.display = "none";
            document.getElementById("otp-success-alert").style.display = "none";
            document.getElementById("otp-invalid-alert").style.display = "block";
            // ...
        });
    }
    updatePassword = async (datas) => {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL_NEW + '/update-password', datas, {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        });
        if (response.data.status == true) {
            document.getElementById("password-mismatch-alert").style.display = "none";
            document.getElementById("password-blank-alert").style.display = "none";
            document.getElementById("reset-success-alert").style.display = "block";
            setTimeout(() => {
                this.props.history.push('/login');
            }, 2000);
        }
    }

    resetPassword = (e) => {
        e.preventDefault();
        document.getElementById("reset-button").innerHTML = "Updating...";
        document.getElementById("password-blank-alert").style.display = "none";
        document.getElementById("password-mismatch-alert").style.display = "none";
        document.getElementById("reset-success-alert").style.display = "none";
        if (this.state.isOtpVerified === false) {
            document.getElementById("reset-button").innerHTML = "Reset Password";
            return;
        }
        if (this.state.password === '' || this.state.confirmPassword === '') {
            document.getElementById("password-blank-alert").style.display = "block";
            document.getElementById("reset-button").innerHTML = "Reset Password";
            return;
        }
        if (this.state.password !== this.state.confirmPassword) {
            document.getElementById("password-mismatch-alert").style.display = "block";
            document.getElementById("reset-button").innerHTML = "Reset Password";
            return;
        }
        if (this.state.type === 'number') {
            let data = {
                type: this.state.type,
                phone_no: this.state.inputData,
                password: this.state.password
            }
            this.updatePassword(data);
        } else {
            let data = {
                type: this.state.type,
                email_id: this.state.inputData,
                password: this.state.password
            }
            this.updatePassword(data);
        }

    }
    render() {


        return (
            <div>
                <Breadcrumb title={'forgot password'} />
                {/*Forget Password section*/}
                <section className="pwd-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 offset-lg-3">
                                <h2>Forgot Your Password</h2>
                                <form className="theme-form">
                                    <div className="form-row" id="forgot-area-section" style={{ display: "block" }}>
                                        <div id="recaptcha-container"></div>
                                        <div className="col-md-12">
                                            <input type="text" className="form-control" id="number" name="inputData" value={this.state.inputData}
                                                placeholder="Enter Your Email / Number" onChange={this.setStateFromInput} required="" />
                                        </div>
                                        <div className="col-md-12">
                                            <button className="btn btn-solid" id="verify-button" onClick={(e) => this.handleClick(e)}>Verify</button>
                                        </div>
                                        <div className="col-md-12 mt-2">
                                            <div className="alert alert-success" style={{ display: "none" }} id="otp-sent-alert">
                                                Your otp has been sent to your {this.state.type}.
                                            </div>
                                            <div className="alert alert-danger" style={{ display: "none" }} id="not-register-alert">
                                                <strong>Sorry!</strong> You are not registered with us. Please register first.
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-3" id="otp-verify-section" style={{ display: "none" }}>
                                            <input type="text" className="form-control" id="otp" name="otp" value={this.state.otp}
                                                placeholder="Enter Your OTP" onChange={this.setStateFromInput} required="" />
                                            {this.state.type === 'number' ?
                                                <button className="btn btn-solid" onClick={(e) => this.verifyOTP(e)}>Submit</button> :
                                                <button className="btn btn-solid" onClick={(e) => this.verifyMailOtp(e)}>Submit</button>
                                            }
                                            <div className="alert alert-danger" style={{ display: "none" }} id="otp-invalid-alert">
                                                <strong>Oops!</strong> OTP is not valid. Retry again.
                                            </div>
                                            <div className="alert alert-success" style={{ display: "none" }} id="otp-success-alert">
                                                OTP verified successfully.
                                            </div>
                                        </div>

                                    </div>
                                    <div className="form-row" id="reset-password-section" style={{ display: "none" }}>
                                        {/* input password and confirm password */}
                                        <div className="col-md-12">
                                            <input type="text" className="form-control" name="password" id="password" onChange={this.setStateFromInput} placeholder="Password" required="" />
                                        </div>
                                        <div className="col-md-12">
                                            <input type="text" className="form-control" name='confirmPassword' id="confirmPassword" onChange={this.setStateFromInput} placeholder="Confirm Password" required="" />
                                        </div>
                                        <div className="col-md-12">
                                            <button className="btn btn-solid" id="reset-button" type="button" onClick={(e) => this.resetPassword(e)}>Reset Password</button>
                                        </div>
                                        <div className="col-md-12 mt-3" >
                                            <div className="alert alert-danger" style={{ display: "none" }} id="password-blank-alert">
                                                <strong>Oops!</strong> Please fill password.
                                            </div>
                                            <div className="alert alert-danger" style={{ display: "none" }} id="password-mismatch-alert">
                                                <strong>Oops!</strong> Password and confirm password does not match.
                                            </div>
                                            <div className="alert alert-success" style={{ display: "none" }} id="reset-success-alert">
                                                Password reset successfully. Login with your new password.
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

export default ForgetPassword