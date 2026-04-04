'use client'
import React, { Component } from 'react';
import { connect } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator';
import { getContactIdFromJWT, isLoggedin } from '../common/utils/index';
import axios from 'axios';
import './../App.css';
import { removeFromWishlist } from '../../actions'
import { getCartTotal } from "../../services";
import { ThreeDot } from 'react-loading-indicators';
// Import the package
import useRazorpay from "react-razorpay";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

class checkOut extends Component {

    constructor(props) {
        super(props)
        isLoggedin('checkout', true);
        const contact_id = getContactIdFromJWT();
        
        this.state = {
            total_amount: this.props.total,
            payment: 'razorpay',
            coupon: '',
            coupon_amount: 0,
            coupons: [],
            name: '',
            phone: '',
            email: '',
            country: 'India',
            address: '',
            city: '',
            state: '',
            pincode: '',
            landmark: '',
            addresses: [],
            showPayment: false,
            wallet: 0,
            used_wallet_amount: 0,
            final_amount: 0,
            isMounted: false,

            userData:
            {
                "contact_id": contact_id,
                "name": "",
                "contact_no": "",
                "email": "",
                "country": "",
                "address": "",
                "city": "",
                "state": "",
                "pincode": ""
            },
            orderItems: [],
            couponLoading: true,
            addressLoading: true,

        }
        this.validator = new SimpleReactValidator();
    }

    componentDidMount() {
        const contact_id = getContactIdFromJWT();
        const data = {
            "contact_id": contact_id
        }
        
        // Set mounted state and cart items
        this.setState({
            isMounted: true,
            orderItems: this.props.cartItems
        });
        
        // Fetch data after mount
        this.getAddressDetails(data);
        this.getContactAllDetails(data);
        this.getCouponsList();
    }
    //Coupon Start
    getCouponsList = async () => {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/getCouponsList', {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        });
        if (response.data != null) {
            this.setState({
                coupons: response.data,
                couponLoading: false
            })
            // try {
            //     document.getElementById("couponsListSpinner").style.display = "none";
            // }
            // catch (e) {
            // }

        }

    }
    getContactAllDetails = async (data) => {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/getContactAllDetails', data, {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        });
        if (response.data != null) {
            this.setState({
                wallet: response.data.wallet,
            })
        }

    }
    clearCoupon = async (e) => {
        e.preventDefault();
        document.getElementById("couponInput").value = "";
        document.getElementById("couponMessage").style.display = "none";
        document.getElementById("couponMessageSuccess").style.display = "none";
        let { total_amount, wallet } = this.state;
        let used_wallet_amount = 0;
        let amount = 0;
        let isChecked = document.getElementById("wallet").checked;
        if (isChecked) {
            amount = total_amount > wallet ? total_amount - wallet : wallet - 1;
            used_wallet_amount = total_amount - amount;
        } else {
            amount = total_amount;
        }
        this.setState({
            used_wallet_amount: used_wallet_amount,
            final_amount: amount,
            coupon_amount: 0,
            coupon: "",
        })
    }
    applyCoupon = async (e) => {
        e.preventDefault();
        document.getElementById("couponMessage").style.display = "none";
        var code = document.getElementById("couponInput").value;
        if (code == "") {
            document.getElementById("couponMessage").innerHTML = "Please enter coupon code";
            document.getElementById("couponMessage").style.display = "block";
            return;
        }
        const coupon = this.state.coupons.filter(function (item) {
            if (item.coupon_code == code) {
                return item;
            }
        }.bind(this));
        if (coupon.length == 0) {
            document.getElementById("couponMessage").innerHTML = "Invalid coupon code";
            document.getElementById("couponMessage").style.display = "block";
            return;
        }

        if (this.state.total_amount >= parseFloat(coupon[0].min_price)) {
            if (coupon[0].discount_type == "percentage") {
                let discount = (this.state.total_amount * parseFloat(coupon[0].discount)) / 100;
                if (discount >= parseFloat(coupon[0].max_discount)) {
                    // let amount = this.state.total_amount - parseFloat(coupon[0].max_discount);
                    let amount = parseFloat(coupon[0].max_discount);
                    await this.checkWalletAndApplyCoupon(amount, code);
                    // this.setState({
                    //     coupon_amount: parseFloat(amount),
                    //     coupon: code,
                    // })
                    document.getElementById("couponMessageSuccess").style.display = "block";
                    document.getElementById("couponMessageSuccess").innerHTML = "Discount Coupon Applied!";
                }
                else {
                    // let amount = this.state.total_amount - discount;
                    let amount = discount;
                    // check wallet 
                    await this.checkWalletAndApplyCoupon(amount, code);
                    document.getElementById("couponMessageSuccess").style.display = "block";
                    document.getElementById("couponMessageSuccess").innerHTML = "Discount Coupon Applied!";
                }
            }
            else if (coupon[0].discount_type == "amount") {
                let discount = this.state.total_amount * parseFloat(coupon[0].discount);
                if (discount >= parseFloat(coupon[0].max_discount)) {
                    // let amount = this.state.total_amount - parseFloat(coupon[0].max_discount);
                    // this.setState({
                    //     coupon_amount: parseFloat(amount),
                    //     coupon: code,
                    // })
                    let amount = parseFloat(coupon[0].max_discount);
                    await this.checkWalletAndApplyCoupon(amount, code);
                }
                else {
                    // let amount = this.state.total_amount - discount;
                    // this.setState({
                    //     coupon_amount: parseFloat(amount),
                    //     coupon: code,
                    // })
                    let amount = discount;
                    // check wallet 
                    await this.checkWalletAndApplyCoupon(amount, code);
                }
            }
        }
        else {
            document.getElementById("couponMessage").innerHTML = "Minimum order amount is " + coupon[0].min_price;
            document.getElementById("couponMessage").style.display = "block";
        }
        // console.log(this.state);
        // const data ={
        //     coupon_code:code,
        //     contact_id:Cookies.get('id'),
        //     amount:this.props.total
        // }
        // const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/checkCouponCode', data,{
        //     headers: {
        //         "Content-Type": "application/json",
        //         'Access-Control-Allow-Origin': '*',
        //     }
        // });
        // console.log(response);
        // if(response.data.status == true){
        //     this.setState({
        //         coupon_amount: response.data.amount,
        //         coupon: code,
        //     })
        // }

    }
    checkWalletAndApplyCoupon = async (amount, code) => {
        amount=parseFloat(amount);
        let wallet = parseFloat(this.state.wallet);
        let total_amount = parseFloat(this.state.total_amount);
        let isChecked = document.getElementById("wallet").checked;
        if (isChecked) {
            let used_wallet_amount = 0;
            let temp_amount = wallet + amount;
            console.log(temp_amount)
            let amt = 0;
            if (total_amount > temp_amount) {
                amt = total_amount - temp_amount;
                used_wallet_amount = wallet;
            } else {
                let amt = total_amount > amount ? total_amount - amount : 1;
                if (amt != 1 && amt > wallet) {
                    used_wallet_amount = wallet;
                    amt = amt - used_wallet_amount;
                } else {
                    used_wallet_amount = wallet == amt ? amt - 1 : amt - 1
                    amt = amt - used_wallet_amount;
                }
            }
            // console.log(amt)
            // console.log(amount)
            // console.log(used_wallet_amount)
            this.setState({
                final_amount: parseFloat(amt),
                coupon_amount: parseFloat(amount),
                used_wallet_amount: parseFloat(used_wallet_amount),
                coupon: code,
            })
        }
        else {
            let amt = total_amount > amount ? total_amount - amount : 1;
            // console.log(amt)
            this.setState({
                final_amount: parseFloat(amt),
                coupon_amount: parseFloat(amount),
                coupon: code,
            })
        }
    }

    applySelectCoupon = async (e, code) => {
        e.preventDefault();
        document.getElementById("couponMessage").style.display = "none";
        document.getElementById("couponMessageSuccess").style.display = "none";
        const coupon = this.state.coupons.filter(function (item) {
            if (item.coupon_code == code) {
                return item;
            }
        }.bind(this));
        const { wallet, total_amount } = this.state;
        if (this.state.total_amount >= parseFloat(coupon[0].min_price)) {
            if (coupon[0].discount_type == "percentage") {
                let discount = (this.state.total_amount * parseFloat(coupon[0].discount)) / 100;
                if (discount >= parseFloat(coupon[0].max_discount)) {
                    // let amount = this.state.total_amount - parseFloat(coupon[0].max_discount);
                    let amount = parseFloat(coupon[0].max_discount);
                    await this.checkWalletAndApplyCoupon(amount, code);
                    document.getElementById("couponInput").value = code;
                    document.getElementById("couponMessageSuccess").style.display = "block";
                    document.getElementById("couponMessageSuccess").innerHTML = "Discount Coupon Applied!";
                }
                else {
                    // let amount = this.state.total_amount - discount;
                    let amount = discount;
                    // check wallet 
                    await this.checkWalletAndApplyCoupon(amount, code);
                    document.getElementById("couponInput").value = code;
                    document.getElementById("couponMessageSuccess").style.display = "block";
                    document.getElementById("couponMessageSuccess").innerHTML = "Discount Coupon Applied!";
                }
            }
            else if (coupon[0].discount_type == "amount") {
                let discount = this.state.total_amount * parseFloat(coupon[0].discount);
                if (discount >= parseFloat(coupon[0].max_discount)) {
                    
                    // let amount = this.state.total_amount - parseFloat(coupon[0].max_discount);
                    let amount = parseFloat(coupon[0].max_discount);
                    await this.checkWalletAndApplyCoupon(amount, code);
                    // this.setState({
                    //     coupon_amount: parseFloat(amount),
                    //     coupon: code,
                    // })
                    document.getElementById("couponInput").value = code;
                    document.getElementById("couponMessageSuccess").style.display = "block";
                    document.getElementById("couponMessageSuccess").innerHTML = "Discount Coupon Applied!";
                }
                else {
                    // let amount = this.state.total_amount - discount;
                    let amount = discount;
                    await this.checkWalletAndApplyCoupon(amount, code);
                    // this.setState({
                    //     coupon_amount: parseFloat(amount),
                    //     coupon: code,
                    // })
                    document.getElementById("couponInput").value = code;
                    document.getElementById("couponMessageSuccess").style.display = "block";
                    document.getElementById("couponMessageSuccess").innerHTML = "Discount Coupon Applied!";
                }
            }
        }
        else {
            document.getElementById("couponMessage").innerHTML = "Minimum order amount is " + coupon[0].min_price;
            document.getElementById("couponMessage").style.display = "block";
        }
        // console.log(this.state);
        // const data ={
        //     coupon_code:code,
        //     contact_id:Cookies.get('id'),
        //     amount:this.props.total
        // }
        // const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/checkCouponCode', data,{
        //     headers: {
        //         "Content-Type": "application/json",
        //         'Access-Control-Allow-Origin': '*',
        //     }
        // });
        // console.log(response);
        // if(response.data.status == true){
        //     this.setState({
        //         coupon_amount: response.data.amount,
        //         coupon: code,
        //     })
        // }

    }

    //Coupon End
    // Address start

    getAddressDetails = async (datas) => {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/getContactAddress', datas, {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        });

        if (response.data != null) {
            // console.log(response.data);
            this.setState({
                addresses: response.data,
                addressLoading: false
            })
        } else {
            this.setState({
                addresses: [],
                addressLoading: false
            })
        }
        // document.getElementById("addressListSpinner").style.display = "none";
    }
    setStateFromInput = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    }

    setStateFromCheckbox = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.checked;
        this.setState(obj);

        if (!this.validator.fieldValid(event.target.name)) {
            this.validator.showMessages();
        }
    }

    checkhandle(value) {
        if (value == "cod") {
            document.getElementById("couponArea").style.display = "none";
            document.getElementById("codWarningMessage").style.display = "block";
            document.getElementById("couponInput").value = "";
            document.getElementById("couponMessage").style.display = "none";
            document.getElementById("couponMessageSuccess").style.display = "none";
            this.setState({
                coupon_amount: 0,
                final_amount: this.state.total_amount,
                used_wallet_amount: 0,
                coupon: "",
            })
        }
        else {
            document.getElementById("wallet").checked = false;
            document.getElementById("couponArea").style.display = "block";
            document.getElementById("codWarningMessage").style.display = "none";
        }
        this.setState({
            payment: value
        })
    }

    notify = (message) => toast.success(message,{
        style: {
            background: '#19a340',
            color: '#fff',
          },
        iconTheme: {
            primary: '#fff',
            secondary: '#427fc1',
          },
    });

    postAddress = async (data) => {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/addAddressDetails', data, {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        });
        if (response.data.status == true) {
            this.setState({
                addresses: [],
                name: '',
                email: '',
                phone: '',
                country: 'India',
                address: '',
                city: '',
                state: '',
                pincode: '',
                landmark: ''
            })
            this.addAddressCancel();
            const contact_id = getContactIdFromJWT();
            this.getAddressDetails({ contact_id: contact_id });

            this.notify(response.data.message);
        }
        else {
            // alert(response.data.message);
        }
    }

    showAddressPanel = (e) => {
        //hide all address panel
        document.getElementById("addressPanelButton").style.display = 'none';
        document.getElementById("addressBox").style.display = 'none';
        //show selected address panel
        document.getElementById("addressPanel").style.display = 'block';
    }
    addAddressCancel = (e) => {
        //hide all address panel
        document.getElementById("addressBox").style.display = 'block';
        document.getElementById("addressPanelButton").style.display = 'block';
        //show selected address panel
        document.getElementById("addressPanel").style.display = 'none';
    }

    addNewAddress = (e) => {
        e.preventDefault();
        var address = {
            id: new Date().getTime(),
            name: this.state.name,
            contact_no: this.state.phone,
            email: this.state.email,
            country: this.state.country,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            pincode: this.state.pincode,
            landmark: this.state.landmark,
        }
        const data = {
            "contact_id": getContactIdFromJWT(),
            "address": address
        }
        if (this.validator.allValid()) {
            // console.log(data)
            this.postAddress(data);
        }
        else {
            this.validator.showMessages();
            // render(<div>{this.validator.message('email')}</div>);
            this.forceUpdate();
        }
    }

    // Address end


    walletChecked = (event) => {
        const isChecked = event.target.checked;
        let amount = 0;
        let { total_amount, coupon_amount, wallet } = this.state;

        if (isChecked) {
            amount = coupon_amount != 0 ? total_amount - coupon_amount - wallet : total_amount - wallet;
            this.setState({ final_amount: amount ,used_wallet_amount: wallet});
            // console.log(amount)
        } else {
            amount = coupon_amount != 0 ? total_amount - coupon_amount : total_amount;
            this.setState({ final_amount: amount ,used_wallet_amount: 0});
            // console.log(amount)
        }

    }


    //Razorpay Payment start
    loadScript = (src) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    }
    displayRazorpay = async (e, amount) => {
        e.preventDefault();
        document.getElementById("razorpay-order-button").innerHTML = "Please Wait...";
        document.getElementById("razorpay-order-button").disabled = true;
        document.getElementById("placeOrderMessage").style.display = 'none';
        document.getElementById("addressAlertMessage").style.display = 'none';
        if (this.state.userData.contact_no != '') {
            var options = null;
            const response = await this.loadScript('https://checkout.razorpay.com/v1/checkout.js');
            if (!response) {
                alert("You are offline... Failed to load razorpay")
                document.getElementById("razorpay-order-button").innerHTML = "Place Order";
                document.getElementById("razorpay-order-button").disabled = false;
                return
            }
            try {
                const orderId = await this.createPaymentOrder({
                    "contact_id": getContactIdFromJWT(),
                    "amount": amount * 100
                });
            
            document.getElementById("razorpay-order-button").innerHTML = "Place Order";
            document.getElementById("razorpay-order-button").disabled = false;
            if (orderId == undefined) {
                alert("You are offline... Failed to load razorpay")
                return
            }
            else {
                options = {
                    "key": process.env.NEXT_PUBLIC_RAZORPAY_ID,
                    "currency": "INR",
                    "amount": amount * 100,
                    "name": "Animoxkart",
                    "description": "Payment for order",
                    "order_id": orderId,
                    "handler": async function (response) {
                        document.getElementById("placeOrderMessageSuccess").style.display = 'block';
                        document.getElementById("placeOrderMessageSuccess").innerHTML = "Order Placed Successfully";
                        document.getElementById("razorpay-order-button").innerHTML = "Please Wait...";
                        document.getElementById("razorpay-order-button").disabled = true;
                        let data = {
                            "contact_id": getContactIdFromJWT(),
                            "orderId": orderId,
                            "payment_id": response.razorpay_payment_id,
                            "order_id": response.razorpay_order_id,
                            "amount": amount * 100,
                            "status": "authorized",
                            "data": this.state.userData,
                            "orderItems": this.state.orderItems,
                            "coupon_code": this.state.coupon,
                            "used_wallet_amount": this.state.used_wallet_amount
                        };
                        await this.updatePaymentOrder(data);
                        //open order page and clear cart
                        // Store data in sessionStorage for order success page
                        sessionStorage.setItem('orderData', JSON.stringify(data));
                        this.props.router.push('/order-success');
                    }.bind(this),
                    "prefill": {
                        "name": this.state.userData['name'], //customer name
                        "contact": this.state.userData['contact_no'], //customer contact
                        "email": this.state.userData['email'] //customer email
                    },
                    "notes": {
                        "address": this.state.userData.address,
                        "creator": getContactIdFromJWT()//customer address
                    },
                    "theme": {
                        "color": "#3399cc"
                    }
                };
            }
        } catch (error) {
            console.error("Order Creation Error:", error);
            alert("Failed to place order. Please try again later.");
        }

            const paymentObject = new window.Razorpay(options);
            paymentObject.on('payment.failed', function (response) {
                document.getElementById("placeOrderMessage").style.display = 'block';
                document.getElementById("placeOrderMessage").innerHTML = "Payment failed, please try again";
                document.getElementById("razorpay-order-button").innerHTML = "Place Order";
                document.getElementById("razorpay-order-button").disabled = false;
            });
            paymentObject.open();
        }
        else {
            document.getElementById("placeOrderMessage").style.display = 'block';
            document.getElementById("placeOrderMessage").innerHTML = "Please select your address to place order";
            document.getElementById("razorpay-order-button").innerHTML = "Place Order";
            document.getElementById("razorpay-order-button").disabled = false;
        }
    }

    createPaymentOrder = async (data) => {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/createPaymentOrder', data, {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        });
        if (response.data.status == true) {
            return response.data.order_id;
        }
        else {
            // console.log(response.data.message);
        }
    }
    updatePaymentOrder = async (data) => {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/updateOrder', data, {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        });
        if (response.data.status == true) {
            // console.log(response.data);
        }
        else {
            // console.log(response.data.message);
        }
    }
    handleNext = (e) => {
        e.preventDefault();
        if (this.state.userData.contact_no != '') {
            document.getElementById("addressAlertMessage").style.display = 'none';
        } else {
            document.getElementById("addressAlertMessage").style.display = 'block';
            document.getElementById("addressAlertMessage").innerHTML = "Please select your address to place order";
            return;
        }
        this.setState({ showPayment: true });
    };
    handleBack = (e) => {
        e.preventDefault();
        this.setState({ showPayment: false });
    }
    setAddress = (address) => {
        this.setState({ userData: address })
        // console.log(this.state.userData)
    }
    //Razorpay Payment end

    //Cod Payment start
    codPlaceOrder = async (e, amount) => {
        e.preventDefault();
        const contact_id = getContactIdFromJWT();
        if (this.state.userData.contact_no == '') {
            document.getElementById("placeOrderMessage").style.display = 'block';
            document.getElementById("placeOrderMessage").innerHTML = "Please select your address to place order";
            return;
        }
        else {
            document.getElementById("placeOrderMessage").style.display = 'none';
            document.getElementById("placeOrderCod").innerHTML = "Placing order....";
            document.getElementById("placeOrderCod").disabled = true;
        }
        const data = {
            "contact_id": contact_id,
            "payment_method": "cod",
            "status": "pending",
            "amount": amount,
            "currency": "INR",
            "data": this.state.userData,
            "orderItems": this.state.orderItems,
        }
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/codCreateOrder', data, {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        });
        if (response.data.status == true) {
            document.getElementById("placeOrderCod").innerHTML = "Place Order COD";
            data.order_id = response.data.order_id;
            // Store data in sessionStorage for order success page
            sessionStorage.setItem('orderData', JSON.stringify(data));
            this.props.router.push('/order-success');
        }
        else {
            document.getElementById("placeOrderMessage").style.display = 'block';
            document.getElementById("placeOrderMessage").innerHTML = "Please retry to place order";
            document.getElementById("placeOrderCod").innerHTML = "Place Order COD";
            document.getElementById("placeOrderCod").disabled = false;
        }
    }

    //Cod Payment end


    // StripeClick = () => {
    //     if (this.state.userData['phone'] != '') {
    //         console.log(this.state.userData)
    //     }
    //     else {
    //         alert("Please add address")
    //     }
    //     // return false
    //     if (this.validator.allValid()) {
    //         alert('You submitted the form and stuff!');

    //         var handler = (window).StripeCheckout.configure({
    //             key: 'pk_test_glxk17KhP7poKIawsaSgKtsL',
    //             locale: 'auto',
    //             token: (token: any) => {
    //                 console.log(token)
    //                 this.props.history.push({
    //                     pathname: '/order-success',
    //                     state: { payment: token, items: this.props.cartItems, orderTotal: this.props.total, symbol: this.props.symbol }
    //                 })
    //             }
    //         });
    //         handler.open({
    //             name: 'Multikart',
    //             description: 'Online Fashion Store',
    //             amount: this.amount * 100
    //         })
    //     } else {
    //         this.validator.showMessages();
    //         // rerender to show messages for the first time
    //         this.forceUpdate();
    //     }
    // }
    formatDisplayName =(displayName) =>{
        // Remove 'Animoxkart' if it is at the beginning
        if (displayName.startsWith('Animoxkart')) {
            displayName = displayName.slice(10); // Remove the first 10 characters
        }
    
        // Truncate to 20 characters and add '...' if necessary
        return displayName.length > 20 ? displayName.slice(0, 20) + '...' : displayName;
    }

    render() {
        const { cartItems, symbol, total } = this.props;
        // Paypal Integration
        // const onSuccess = (payment) => {
        //     console.log("The payment was succeeded!", payment);
        //     this.props.history.push({
        //         pathname: '/order-success',
        //         state: { payment: payment, items: cartItems, orderTotal: total, symbol: symbol }
        //     })

        // }
        // const onCancel = (data) => {
        //     console.log('The payment was cancelled!', data);
        // }

        // const onError = (err) => {
        //     console.log("Error!", err);
        // }

        // const client = {
        //     sandbox: 'AZ4S98zFa01vym7NVeo_qthZyOnBhtNvQDsjhaZSMH-2_Y9IAJFbSD3HPueErYqN8Sa8WYRbjP7wWtd_',
        //     production: 'AZ4S98zFa01vym7NVeo_qthZyOnBhtNvQDsjhaZSMH-2_Y9IAJFbSD3HPueErYqN8Sa8WYRbjP7wWtd_',
        // }


        return (
            <div>

                {/*SEO Support*/}
                {/*SEO Support End */}


                <section className="section-b-space">
                    <div className="container padding-cls">
                        <div className="checkout-page">
                            <div className="checkout-form">
                                <form>
                                    <div className="checkout row">
                                        <div className={`col-md-6 col-lg-6 col-sm-12 col-xs-12 ${this.state.showPayment ? 'hide-in-mobile' : ''}`}>
                                            <div className="checkout-title" style={{ display: "flex", justifyContent: "space-between" }}>
                                                <h3>Address</h3>
                                                <button className="btn-sm btn-solid btn hide-if-not-in-mobile" onClick={(e) => this.handleNext(e)}>Next</button>

                                            </div>
                                            <p id="addressAlertMessage" style={{ display: 'none' }} className='alert alert-danger'></p>
                                            {this.state.addressLoading? 
                        <div className="loading-indicator-center"><ThreeDot variant="bounce" color="#427fc1" size="small" text="" textColor="" /></div> :
                                            <div className='row' id="addressBox">
                                                {this.state.addresses.length > 0 ?this.state.addresses.map((address, index) => {
                                                    return (
                                                        <div className="col-lg-12 col-sm-12 col-xs-12 mt-2" key={index}>
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <div className="" style={{ float: "right" }}>
                                                                        <input type="radio" className="" id={index} name="address" onChange={() => this.setAddress(address)} />
                                                                    </div>
                                                                    <h5 className="card-title">{address.name.charAt(0).toUpperCase() + address.name.slice(1)}</h5>
                                                                    <p className="card-text">{address.address} ,{address.landmark}, {address.city} , {address.state} , {address.pincode}</p>
                                                                    <p className="card-text">{address.email}</p>
                                                                    <p className="card-text">{address.contact_no}</p>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    )
                                                }): <div className="col-lg-12 col-sm-12 col-xs-12 mt-2">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <p className="card-text">No address found</p>
                                                        </div>
                                                        </div>
                                                        </div>
                                                }

                                            </div>
    }
                                            <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12" id="addressPanelButton">
                                                <button type="button" className="mt-3" style={{ border: "none", backgroundColor: "white", color: "blue", float: "right" }} onClick={(e) => this.showAddressPanel(e)} >+ Add New Address</button>
                                            </div>
                                            <div className="container-fluid mb-3" id="addressPanel" style={{ display: "none" }}>
                                                <div className="checkout-title mt-3">
                                                    <h3>Shipping Details</h3>
                                                </div>
                                                <div className="row check-out">
                                                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                        <div className="field-label">Name</div>
                                                        <input type="text" name="name" value={this.state.name} onChange={this.setStateFromInput} />
                                                        {this.validator.message('name', this.state.name, 'required')}
                                                    </div>
                                                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                        <div className="field-label">Phone</div>
                                                        <input type="text" name="phone" value={this.state.phone} onChange={this.setStateFromInput} />
                                                        {this.validator.message('phone', this.state.phone, 'required|phone')}
                                                    </div>
                                                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                        <div className="field-label">Email Id</div>
                                                        <input type="text" name="email" value={this.state.email} onChange={this.setStateFromInput} />
                                                        {this.validator.message('email', this.state.email, 'required|email')}
                                                    </div>

                                                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                        <div className="field-label">Address</div>
                                                        <input type="text" name="address" value={this.state.address} onChange={this.setStateFromInput} placeholder="Street address" />
                                                        {this.validator.message('address', this.state.address, 'required|min:20|max:120')}
                                                    </div>
                                                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                        <div className="field-label">Town/City</div>
                                                        <input type="text" name="city" value={this.state.city} onChange={this.setStateFromInput} />
                                                        {this.validator.message('city', this.state.city, 'required')}
                                                    </div>
                                                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                        <div className="field-label">State <span className="f-red">*</span></div>
                                                        <select name="state" value={this.state.state} onChange={this.setStateFromInput}>
                                                            <option value="">Select State</option>
                                                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar
                                                                Islands</option>
                                                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                                                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                                            <option value="Assam">Assam</option>
                                                            <option value="Bihar">Bihar</option>
                                                            <option value="Chandigarh">Chandigarh</option>
                                                            <option value="Chhattisgarh">Chhattisgarh</option>
                                                            <option value="Dadra and Nagar Haveli">Dadra and Nagar
                                                                Haveli</option>
                                                            <option value="Daman and Diu">Daman and Diu</option>
                                                            <option value="Delhi">Delhi</option>
                                                            <option value="Goa">Goa</option>
                                                            <option value="Gujarat">Gujarat</option>
                                                            <option value="Haryana">Haryana</option>
                                                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                                                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                                            <option value="Jharkhand">Jharkhand</option>
                                                            <option value="Karnataka">Karnataka</option>
                                                            <option value="Kerala">Kerala</option>
                                                            <option value="Lakshadweep">Lakshadweep</option>
                                                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                                                            <option value="Maharashtra">Maharashtra</option>
                                                            <option value="Manipur">Manipur</option>
                                                            <option value="Meghalaya">Meghalaya</option>
                                                            <option value="Mizoram">Mizoram</option>
                                                            <option value="Nagaland">Nagaland</option>
                                                            <option value="Odisha">Odisha</option>
                                                            <option value="Puducherry">Puducherry</option>
                                                            <option value="Punjab">Punjab</option>
                                                            <option value="Rajasthan">Rajasthan</option>
                                                            <option value="Sikkim">Sikkim</option>
                                                            <option value="Tamil Nadu">Tamil Nadu</option>
                                                            <option value="Telangana">Telangana</option>
                                                            <option value="Tripura">Tripura</option>
                                                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                                                            <option value="Uttarakhand">Uttarakhand</option>
                                                            <option value="West Bengal">West Bengal</option>
                                                        </select>
                                                        {this.validator.message('state', this.state.state, 'required')}
                                                    </div>
                                                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                        <div className="field-label">PinCode <span color='red'>*</span>  </div>
                                                        <input type="text" name="pincode" value={this.state.pincode} onChange={this.setStateFromInput} />
                                                        {this.validator.message('pincode', this.state.pincode, 'required|integer')}
                                                    </div>

                                                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                        <div className="field-label">Nearby Location (optional)</div>
                                                        <input type="text" name="landmark" value={this.state.landmark} onChange={this.setStateFromInput} />
                                                    </div>
                                                    {/* <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <input type="checkbox" name="create_account" id="account-option"  checked={this.state.create_account} onChange={this.setStateFromCheckbox}/>
                                                    &ensp; <label htmlFor="account-option">Shipping address same as Billing address</label>
                                                    {this.validator.message('checkbox', this.state.create_account, 'create_account')}
                                                </div> */}
                                                    {/* <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <input type="checkbox" name="create_account" id="account-option"  checked={this.state.create_account} onChange={this.setStateFromCheckbox}/>
                                                    &ensp; <label htmlFor="account-option">Create An Account?</label>
                                                    {this.validator.message('checkbox', this.state.create_account, 'create_account')}
                                                </div> */}
                                                    <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <button type="button" className="btn-solid btn" onClick={(e) => this.addNewAddress(e)} >Save Address</button>
                                                        <button type="button" className="btn-solid btn" onClick={(e) => this.addAddressCancel(e)} >Cancel</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className={`col-md-6 col-lg-6 col-sm-12 col-xs-12 ${!this.state.showPayment ? 'hide-in-mobile' : ''}`}>
                                            <button className="btn-sm btn-solid btn mb-2 hide-if-not-in-mobile" onClick={(e) => this.handleBack(e)}>Back</button>
                                            <div className="checkout-details">
                                                <div className="order-box">
                                                    <div className="title-box">
                                                        <div>Product <span style={{textAlign:"right"}}> Total</span></div>
                                                    </div>
                                                    <ul className="qty">
                                                        {this.state.isMounted && cartItems.map((item, index) => {
                                                            return <li key={index}>{this.formatDisplayName(item.displayName)} × {item.qty} <span style={{textAlign:"right"}}>{symbol} {item.sum}</span></li>
                                                        })
                                                        }
                                                    </ul>
                                                    <ul className="sub-total">
                                                        <li>Subtotal <span className="count" style={{textAlign:"right"}}>{symbol}{this.state.isMounted ? total : 0}</span></li>
                                                    </ul>
                                                    <p id="codWarningMessage" style={{ display: 'none' }} className='alert alert-warning'>Coupons & Wallet is not applicable in COD</p>
                                                    <ul className="sub-total" id="couponArea">
                                                        <li>
                                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                                <label htmlFor="wallet" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                                    <input type="checkbox" className='' name="" onChange={this.walletChecked} id="wallet" />
                                                                    Available Wallet Balance:
                                                                </label>
                                                                <span>₹<span>{this.state.wallet}</span></span>
                                                            </div>
                                                        </li>
                                                        <li>Apply Coupon <div className="shopping-option" id="couponBox" style={{ display: "flex" }}>
                                                            <input id="couponInput" type="text" name="free-shipping" />
                                                            <button id="couponClear" onClick={(e) => this.clearCoupon(e)}>Clear</button>
                                                            <button id="couponApply" onClick={(e) => this.applyCoupon(e)}>Apply</button>

                                                            {/* <label htmlFor="free-shipping">Free Shipping</label> */}
                                                        </div>
                                                            {/* <div className="shipping"> */}

                                                            {/* <div className="shopping-option" >
                                                                <a style={{ margin: "auto" }}>Apply</a><a style={{ margin: "auto" }}>Clear</a> */}
                                                            {/* <input type="button" name="local-pickup" id="local-pickup" />
                                                                    <label htmlFor="local-pickup">Local Pickup</label> */}
                                                            {/* </div> */}
                                                            {/* </div> */}
                                                        </li>
                                                        <li>
                                                            {/* error message */}
                                                            <div className="shopping-option" >
                                                                <p id="couponMessage" style={{ display: 'none' }} className='alert alert-danger'></p>
                                                                <p id="couponMessageSuccess" style={{ display: 'none' }} className='alert alert-success'></p>
                                                            </div>

                                                        </li>
                                                       {this.state.couponLoading ? <div className="loading-indicator-center"><ThreeDot variant="bounce" color="#427fc1" size="small" text="" textColor="" /></div>:
                                                        <ul className="Coupons">

                                                            {
                                                                this.state.coupons.map((item, index) => {
                                                                    return <div key={index} className="mt-1" style={{ border: "1px solid grey" }}>
                                                                        <div style={{ padding: "5px" }}>
                                                                            <span><b>{item.coupon_code}</b><button id="pillButton" style={{ float: "right" }} onClick={(e) => this.applySelectCoupon(e, item.coupon_code)} >Apply</button><br /></span>
                                                                            <span>{item.description}</span>
                                                                        </div>

                                                                    </div>
                                                                })
                                                            }
                                                        </ul>
    }
                                                    </ul>
                                                    
                                                    {this.state.coupon_amount != 0 ? 
                                                    <ul>
                                                        <hr />
                                                        <li><div>Coupon Discount: -{this.state.coupon_amount}</div> </li>
                                                    </ul>
                                                    : <></>}
                                                    {this.state.used_wallet_amount != 0 ?
                                                    <ul>
                                                        <li> <div>Wallet: -{this.state.used_wallet_amount}</div></li>
                                                        <hr />
                                                    </ul>  : <></>}
                                                    
                                                    <ul className="total">
                                                        <li>Total <span className="count">{symbol}{this.state.isMounted ? (this.state.final_amount == 0 ? total : this.state.final_amount) : 0}</span></li>
                                                    </ul>
                                                </div>

                                                <div className="payment-box">
                                                    <div className="upper-box">
                                                        <div className="payment-options">
                                                            <ul>
                                                                <li>
                                                                    <div className="radio-option stripe">
                                                                        <input type="radio" name="payment-group" id="payment-2" defaultChecked={true} onClick={() => this.checkhandle('razorpay')} />
                                                                        <label htmlFor="payment-2">Razorpay</label>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="radio-option paypal">
                                                                        <input type="radio" name="payment-group" id="payment-1" onClick={() => this.checkhandle('cod')} />
                                                                        <label htmlFor="payment-1">COD<span className="image"><img src={`/assets/images/paypal.png`} alt="" /></span></label>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    {/* <div>
                                                        <button onClick={(e) => this.displayRazorpay(e, 10)} className="btn-solid btn">Place Order</button>
                                                    </div> */}
                                                    <p id="placeOrderMessage" style={{ display: 'none' }} className='alert alert-danger'></p>
                                                    <p id="placeOrderMessageSuccess" style={{ display: 'none' }} className='alert alert-success'></p>
                                                    {(this.state.isMounted && total !== 0) ?

                                                        <div className="text-right">
                                                            {(this.state.payment === 'razorpay') ? <button onClick={(e) => this.displayRazorpay(e, this.state.final_amount == 0 ? total : this.state.final_amount)} id="razorpay-order-button" className="btn-solid btn">Place Order</button> :
                                                                <button onClick={(e) => this.codPlaceOrder(e, total)} className="btn-solid btn" id="placeOrderCod">Place Order COD</button>
                                                                // <PaypalExpressBtn env={'sandbox'} client={client} currency={'USD'} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
                                                            }
                                                        </div>
                                                        : ''}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="row section-t-space">
                                       
                                        <div className="col-lg-6">
                                            <div className="stripe-section">
                                                <h5>stripe js example</h5>
                                                <div>
                                                    <h5 className="checkout_class">dummy test</h5>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>cart number</td>
                                                                <td>4242424242424242</td>
                                                            </tr>
                                                            <tr>
                                                                <td>mm/yy</td>
                                                                <td>2/2020</td>
                                                            </tr>
                                                            <tr>
                                                                <td>cvc</td>
                                                                <td>2222</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 m-sm-t-2">
                                            <div className="stripe-section">
                                                <h5>paypal example</h5>
                                                <div>
                                                    <h5 className="checkout_class">dummy test</h5>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>cart number</td>
                                                                <td>4152521541244</td>
                                                            </tr>
                                                            <tr>
                                                                <td>mm/yy</td>
                                                                <td>11/18</td>
                                                            </tr>
                                                            <tr>
                                                                <td>cvc</td>
                                                                <td>521</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    cartItems: state.cartList.cart,
    symbol: state.data.symbol,
    total: getCartTotal(state.cartList.cart)
})

const ConnectedCheckout = connect(
    mapStateToProps,
    { removeFromWishlist }
)(checkOut)

// Wrapper component to provide Next.js router to class component
function CheckoutWithRouter(props) {
    const router = useRouter();
    return <ConnectedCheckout {...props} router={router} />;
}

export default CheckoutWithRouter;