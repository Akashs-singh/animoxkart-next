'use client';
import React, {Component} from 'react';
import { emptyCart } from '../../actions/index';
import { connect } from 'react-redux'
import {getImage} from './../common/utils'
import { useRouter } from 'next/navigation';

class orderSuccess extends Component {

    constructor (props) {
        super (props)
        this.state = {
            data: null
        }
    }
    
    componentDidMount() {
        // Read order data from sessionStorage
        const orderData = sessionStorage.getItem('orderData');
        if (!orderData) {
            this.props.router.push('/');
            return;
        }
        
        try {
            const data = JSON.parse(orderData);
            this.setState({ data });
            this.props.emptyCart();
            // Clear the session storage after reading
            sessionStorage.removeItem('orderData');
        } catch (error) {
            console.error('Error parsing order data:', error);
            this.props.router.push('/');
        }
    }
    
    render (){
        var data = this.state.data;
        
        if (!data) {
            return null; // Return null while loading or redirecting
        }
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var current = new Date();
        var next5days = new Date(Date.now() + 7 * 86400000);
        let CheckDate = current.toLocaleDateString("en-US", options).toString()
        let deliveryDate = next5days.toLocaleDateString("en-US", options).toString()
        
        return (
            (data)?
            (data.payment_id)?
            <div>
                <section className="section-b-space light-layout">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="success-text">
                                    <i className="fa fa-check-circle" aria-hidden="true"></i>
                                    <h2>thank you</h2>
                                    <p>Payment Is Has Been Received Order Placed Successfully</p>
                                    <p>Transaction ID: {(data.payment_id)?data.payment_id:data.orderId}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="product-order">
                                    <h3>your order details</h3>
                                    {data.orderItems.map((item, index) => {
                                    return <div className="row product-order-detail" key={index}>
                                                <div className="col-3">
                                                <img src={`${item.variants ? getImage(item.variants.filter((variant) => variant.productCode == item.productCode)[0].images) : getImage(item.images)}`} className="img-fluid" alt="" />
                                                </div>
                                                <div className="col-3 order_detail">
                                                    <div>
                                                        <h4>product name</h4>
                                                        <h5>{item.name}</h5>
                                                    </div>
                                                </div>
                                                <div className="col-3 order_detail">
                                                    <div>
                                                        <h4>quantity</h4>
                                                        <h5>{item.qty}</h5>
                                                    </div>
                                                </div>
                                                <div className="col-3 order_detail">
                                                    <div>
                                                        <h4>price</h4>
                                                        <h5>&#8377; {item.sum}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                    })}
                                    <div className="total-sec">
                                        <ul>
                                            <li>subtotal <span>&#8377; {(data.amount/100)}</span></li>
                                            <li>shipping <span>&#8377; 0</span></li>
                                            {/* <li>tax(GST) incl. <span>&#8377; {((data.amount/100)*18)/100}</span></li> */}
                                        </ul>
                                    </div>
                                    <div className="final-total">
                                        <h3>total <span>&#8377; {(data.amount/100)}</span></h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="row order-success-sec">
                                    <div className="col-sm-6">
                                        <h4>summary</h4>
                                        <ul className="order-detail">
                                            {(data.payment_id)?
                                                <div>
                                            <li>payment ID: {data.payment_id}</li>
                                                </div>
                                                :
                                            <li>Order ID: {data.orderId}</li> }
                                            <li>Order Date: {CheckDate}</li>
                                            <li>Order Total: &#8377; {(data.amount/100)}</li>
                                        </ul>
                                    </div>
                                    <div className="col-sm-6">
                                        <h4>shipping address</h4>
                                        <ul className="order-detail">{
                                            (data.data)?
                                            <>
                                            <li>{data.data.address}</li>
                                            <li>{data.data.city}</li>
                                            <li>{data.data.state}, {data.data.country}</li>
                                            <li>{data.data.pincode}</li>
                                            <li>Contact No. {data.data.contact_no}</li>
                                            </>
                                            :<li></li>
                                        }
                                            
                                        </ul>
                                    </div>

                                    <div className="col-sm-12 payment-mode">
                                        <h4>payment method</h4>
                                        <p>Online payment</p>
                                        {/* <p>Pay on Delivery (Cash/Card). Cash on delivery (COD) available. Card/Net
                                            banking acceptance subject to device availability.</p> */}
                                    </div>
                                    <div className="col-md-12">
                                        <div className="delivery-sec">
                                            <h3>expected date of delivery</h3>
                                            <h2>{deliveryDate}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>:<div>
                <section className="section-b-space light-layout">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="success-text">
                                    <i className="fa fa-check-circle" aria-hidden="true"></i>
                                    <h2>thank you</h2>
                                    <p>Your Order Has Been Placed Successfully</p>
                                    <p>Order ID: {(data.payment_id)?data.payment_id:data.order_id}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="product-order">
                                    <h3>your order details</h3>
                                    {data.orderItems.map((item, index) => {
                                    return <div className="row product-order-detail" key={index}>
                                                <div className="col-3">
                                                <img src={`${item.variants ? getImage(item.variants.filter((variant) => variant.productCode == item.productCode)[0].images) : getImage(item.images)}`} className="img-fluid" alt="" />
                                                </div>
                                                <div className="col-3 order_detail">
                                                    <div>
                                                        <h4>product name</h4>
                                                        <h5>{item.name}</h5>
                                                    </div>
                                                </div>
                                                <div className="col-3 order_detail">
                                                    <div>
                                                        <h4>quantity</h4>
                                                        <h5>{item.qty}</h5>
                                                    </div>
                                                </div>
                                                <div className="col-3 order_detail">
                                                    <div>
                                                        <h4>price</h4>
                                                        <h5>&#8377; {item.sum}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                    })}
                                    <div className="total-sec">
                                        <ul>
                                            <li>subtotal <span>&#8377; {(data.amount)}</span></li>
                                            <li>shipping <span>&#8377; 0</span></li>
                                            {/* <li>tax(GST) incl. <span>&#8377; {((data.amount/100)*18)/100}</span></li> */}
                                        </ul>
                                    </div>
                                    <div className="final-total">
                                        <h3>total <span>&#8377; {(data.amount)}</span></h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="row order-success-sec">
                                    <div className="col-sm-6">
                                        <h4>summary</h4>
                                        <ul className="order-detail">
                                            {(data.payment_id)?
                                                <div>
                                            <li>payment ID: {data.payment_id}</li>
                                                </div>
                                                :
                                            <li>Order ID: {data.order_id}</li> }
                                            <li>Order Date: {CheckDate}</li>
                                            <li>Order Total: &#8377; {(data.amount)}</li>
                                        </ul>
                                    </div>
                                    <div className="col-sm-6">
                                        <h4>shipping address</h4>
                                        <ul className="order-detail">{
                                            (data.data)?
                                            <>
                                            <li>{data.data.address}</li>
                                            <li>{data.data.city}</li>
                                            <li>{data.data.state}, {data.data.country}</li>
                                            <li>{data.data.pincode}</li>
                                            <li>Contact No. {data.data.contact_no}</li>
                                            </>
                                            :<li></li>
                                        }
                                            
                                        </ul>
                                    </div>

                                    <div className="col-sm-12 payment-mode">
                                        <h4>payment method</h4>
                                        <p>Cash On Delivery</p>
                                        {/* <p>Pay on Delivery (Cash/Card). Cash on delivery (COD) available. Card/Net
                                            banking acceptance subject to device availability.</p> */}
                                    </div>
                                    <div className="col-md-12">
                                        <div className="delivery-sec">
                                            <h3>expected date of delivery</h3>
                                            <h2>{deliveryDate}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
            :
            <section className="p-0">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="error-section">
                                <h1>404</h1>
                                <h2>page not found</h2>
                                <a href="index.html" className="btn btn-solid">back to home</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => ({
    cartItems: state.cartList.cart,
    symbol: state.data.symbol,
    data: state.data
})

const ConnectedOrderSuccess = connect(
    mapStateToProps,
    { emptyCart }
)(orderSuccess)

// Wrapper component to provide Next.js router to class component
function OrderSuccessWithRouter(props) {
    const router = useRouter();
    return <ConnectedOrderSuccess {...props} router={router} />;
}

export default OrderSuccessWithRouter;