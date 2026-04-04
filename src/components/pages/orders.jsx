'use client';

import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link'
import TrackStatus from "./trackStatus";
import Breadcrumb from "../common/breadcrumb";
import SimpleReactValidator from 'simple-react-validator';
import Modal from 'react-responsive-modal';
import { getImage } from './../common/utils'
import { BlinkBlur } from 'react-loading-indicators'
import { getContactIdFromJWT, isLoggedin } from '../common/utils/index';

class Orders extends Component {

    constructor(props) {
        super(props)
        isLoggedin('orders', true)
        this.state = {
            orders: [],
            open: false,
            returnorder_placed_id: "",
            returncod: "",
            returnReason: "",
            returnDescription: "",
            returnImage: "",
            trackingData: [],
            loading: true
        }
        this.validator = new SimpleReactValidator();
    }

    componentDidMount() {
        const data = {
            "contact_id": getContactIdFromJWT()
        }
        this.getOrderDetails(data);
    }
    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    calculateTimeDifference = (deliveryDateStr) => {

        if (deliveryDateStr != "null") {
            return 0;
        }
        const deliveryDate = new Date(deliveryDateStr);
        const currentDate = new Date();
        const timeDifference = currentDate - deliveryDate;
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24); // Convert milliseconds to days
        return parseInt(daysDifference, 10);
    };
    returnOrder = async (e, order_placed_id, cod) => {
        e.preventDefault();
        if (cod == true) {
            cod = 1;
        } else {
            cod = 0;
        }
        this.setState({
            returnorder_placed_id: order_placed_id,
            returncod: cod
        })
        this.onOpenModal();
    }
    returnOrderSubmit = async (e) => {
        e.preventDefault();
        // console.log(this.state)
        if (this.validator.allValid()) {
            const data = {
                "order_placed_id": this.state.returnorder_placed_id,
                "cod": this.state.returncod,
                "reason": this.state.returnReason,
                "description": this.state.returnDescription,
                "images": this.state.returnImage
            }
            // console.log(data)
            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/returnOrder', data, {
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                }
            });
            if (response.data != null) {
                if (response.data.status == true) {
                    window.location.reload();
                }
            }
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    cancelOrder = async (e, order_placed_id, cod) => {
        e.preventDefault();
        if (cod == true) {
            cod = 1;
        } else {
            cod = 0;
        }
        const data = {
            "order_placed_id": order_placed_id,
            "cod": cod
        }
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/cancelOrder', data, {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        });
        if (response.data != null) {
            if (response.data.status == true) {
                window.location.reload();
            } else {
                // alert(response.data.message);
            }
        }
    }
    getOrderDetails = async (data) => {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/getOrdersById', data, {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        });
        if (response.data != null) {
            this.setState({
                orders: response.data,
                loading: false
            })
        }
    }
    trackOrderStatus = async (e, shipment_id, cod) => {
        e.preventDefault();
        let id = getContactIdFromJWT()
        const data = {
            "contact_id": id,
            "shipment_id": shipment_id,
            "cod": cod
        }

        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/getTrackOrderStatus', data, {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        });
        // console.log(response)
        if (response.data.status != false) {
            let trackData = response.data.track;
            const filteredData = [];

            if (data.length === 0) {
                return filteredData;
            }
            filteredData.push(trackData[0]);
            for (let i = 1; i < trackData.length; i++) {
                const currentEntry = trackData[i];
                const previousEntry = trackData[i - 1];
                if (currentEntry.status !== previousEntry.status) {
                    filteredData.push(currentEntry);
                }
            }

            this.setState({
                trackingData: filteredData,
            });
        }
    }
    showOrderDetails = (e, id) => {
        e.preventDefault();
        var x = document.getElementById("show" + id);
        if (x.className === "hideTable") {
            x.className = "showTable";
        } else {
            x.className = "hideTable";
        }
    }

    render() {

        return (
            <div>
                <Breadcrumb title={'My Orders'} />

                <style jsx>{`
                    .premium-orders-page {
                        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                        min-height: 100vh;
                        padding: 40px 0;
                    }
                    
                    .premium-order-card {
                        background: #ffffff;
                        border-radius: 16px;
                        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
                        margin-bottom: 30px;
                        overflow: hidden;
                        transition: all 0.3s ease;
                        border: 1px solid rgba(0, 0, 0, 0.05);
                    }
                    
                    .premium-order-card:hover {
                        box-shadow: 0 15px 50px rgba(0, 0, 0, 0.12);
                        transform: translateY(-5px);
                    }
                    
                    .order-header {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        padding: 25px 30px;
                        color: white;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        flex-wrap: wrap;
                        gap: 15px;
                    }
                    
                    .order-header-left h3 {
                        color: white;
                        margin: 0;
                        font-size: 20px;
                        font-weight: 600;
                        letter-spacing: 0.5px;
                    }
                    
                    .order-header-left p {
                        color: white;
                        margin: 5px 0 0 0;
                        opacity: 0.9;
                        font-size: 14px;
                    }
                    
                    .order-header-right {
                        text-align: right;
                    }
                    
                    .payment-badge {
                        background: rgba(255, 255, 255, 0.2);
                        padding: 8px 16px;
                        border-radius: 20px;
                        font-size: 13px;
                        font-weight: 500;
                        display: inline-block;
                        backdrop-filter: blur(10px);
                    }
                    
                    .order-body {
                        padding: 0;
                    }
                    
                    .premium-table {
                        margin: 0;
                    }
                    
                    .premium-table thead {
                        background: #f8f9fa;
                    }
                    
                    .premium-table thead th {
                        border: none;
                        padding: 18px 20px;
                        font-weight: 600;
                        color: #2d3748;
                        text-transform: uppercase;
                        font-size: 12px;
                        letter-spacing: 1px;
                    }
                    
                    .premium-table tbody tr {
                        border-bottom: 1px solid #e2e8f0;
                        transition: background 0.2s ease;
                    }
                    
                    .premium-table tbody tr:hover {
                        background: #f7fafc;
                    }
                    
                    .premium-table tbody td {
                        padding: 20px;
                        vertical-align: middle;
                        border: none;
                    }
                    
                    .product-image-wrapper {
                        width: 80px;
                        height: 80px;
                        border-radius: 12px;
                        overflow: hidden;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    }
                    
                    .product-image-wrapper img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                    
                    .product-name-link {
                        color: #2d3748;
                        font-weight: 600;
                        font-size: 15px;
                        text-decoration: none;
                        transition: color 0.2s ease;
                    }
                    
                    .product-name-link:hover {
                        color: #667eea;
                    }
                    
                    .price-text {
                        font-size: 16px;
                        font-weight: 600;
                        color: #2d3748;
                    }
                    
                    .total-price {
                        font-size: 18px;
                        font-weight: 700;
                        color: #667eea;
                    }
                    
                    .order-summary {
                        background: #f8f9fa;
                        padding: 25px 30px;
                        border-top: 2px solid #e2e8f0;
                    }
                    
                    .summary-row {
                        display: flex;
                        justify-content: space-between;
                        padding: 10px 0;
                        font-size: 15px;
                    }
                    
                    .summary-row.total {
                        border-top: 2px solid #cbd5e0;
                        margin-top: 10px;
                        padding-top: 15px;
                        font-size: 18px;
                        font-weight: 700;
                    }
                    
                    .summary-row .label {
                        color: #4a5568;
                    }
                    
                    .summary-row .value {
                        font-weight: 600;
                        color: #2d3748;
                    }
                    
                    .summary-row .value.discount {
                        color: #48bb78;
                    }
                    
                    .order-actions {
                        padding: 25px 30px;
                        background: white;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        flex-wrap: wrap;
                        gap: 15px;
                        border-top: 1px solid #e2e8f0;
                    }
                    
                    .status-section {
                        flex: 1;
                    }
                    
                    .status-badge {
                        display: inline-block;
                        padding: 10px 20px;
                        border-radius: 25px;
                        font-weight: 600;
                        font-size: 14px;
                        margin-bottom: 10px;
                    }
                    
                    .status-badge.ready {
                        background: #bee3f8;
                        color: #2c5282;
                    }
                    
                    .status-badge.delivered {
                        background: #c6f6d5;
                        color: #22543d;
                    }
                    
                    .status-badge.cancelled {
                        background: #fed7d7;
                        color: #742a2a;
                    }
                    
                    .status-badge.returned {
                        background: #feebc8;
                        color: #7c2d12;
                    }
                    
                    .status-text {
                        color: #4a5568;
                        font-size: 14px;
                        margin: 8px 0;
                    }
                    
                    .status-text i {
                        margin-right: 8px;
                        color: #48bb78;
                    }
                    
                    .action-buttons {
                        display: flex;
                        gap: 12px;
                    }
                    
                    .btn-premium {
                        padding: 12px 28px;
                        border-radius: 25px;
                        font-weight: 600;
                        font-size: 14px;
                        border: none;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }
                    
                    .btn-premium.primary {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                    }
                    
                    .btn-premium.primary:hover {
                        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
                        transform: translateY(-2px);
                    }
                    
                    .btn-premium.secondary {
                        background: white;
                        color: #667eea;
                        border: 2px solid #667eea;
                    }
                    
                    .btn-premium.secondary:hover {
                        background: #667eea;
                        color: white;
                    }
                    
                    .btn-premium.danger {
                        background: linear-gradient(135deg, #f56565 0%, #c53030 100%);
                        color: white;
                        box-shadow: 0 4px 15px rgba(245, 101, 101, 0.4);
                    }
                    
                    .btn-premium.danger:hover {
                        box-shadow: 0 6px 20px rgba(245, 101, 101, 0.6);
                        transform: translateY(-2px);
                    }
                    
                    .empty-state {
                        text-align: center;
                        padding: 80px 20px;
                        background: white;
                        border-radius: 16px;
                        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
                    }
                    
                    .empty-state img {
                        max-width: 300px;
                        margin-bottom: 30px;
                        opacity: 0.8;
                    }
                    
                    .empty-state h3 {
                        font-size: 28px;
                        font-weight: 700;
                        color: #2d3748;
                        margin-bottom: 15px;
                    }
                    
                    .empty-state h4 {
                        font-size: 16px;
                        color: #718096;
                        font-weight: 400;
                    }
                    
                    @media (max-width: 768px) {
                        .premium-orders-page {
                            padding: 20px 0;
                        }
                        
                        .premium-order-card {
                            margin-bottom: 20px;
                        }
                        
                        .order-header {
                            padding: 20px;
                        }
                        
                        .order-header-left h3 {
                            font-size: 16px;
                        }
                        
                        .order-header-left p {
                            font-size: 12px;
                        }
                        
                        .payment-badge {
                            font-size: 11px;
                            padding: 6px 12px;
                        }
                        
                        .order-body {
                            overflow-x: auto;
                            -webkit-overflow-scrolling: touch;
                        }
                        
                        .premium-table {
                            display: block;
                            width: 100%;
                            overflow-x: auto;
                        }
                        
                        .premium-table thead {
                            display: none;
                        }
                        
                        .premium-table tbody {
                            display: block;
                        }
                        
                        .premium-table tbody tr {
                            display: block;
                            margin-bottom: 20px;
                            border: 1px solid #e2e8f0;
                            border-radius: 8px;
                            padding: 15px;
                            background: #fafafa;
                        }
                        
                        .premium-table tbody td {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding: 10px 0;
                            border: none;
                            text-align: left;
                        }
                        
                        .premium-table tbody td:before {
                            content: attr(data-label);
                            font-weight: 600;
                            color: #4a5568;
                            font-size: 13px;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                        }
                        
                        .premium-table tbody td:first-child {
                            justify-content: center;
                            padding-bottom: 15px;
                            border-bottom: 1px solid #e2e8f0;
                            margin-bottom: 10px;
                        }
                        
                        .premium-table tbody td:first-child:before {
                            display: none;
                        }
                        
                        .premium-table tbody td:nth-child(4) {
                            display: none;
                        }
                        
                        .product-image-wrapper {
                            width: 100px;
                            height: 100px;
                            margin: 0 auto;
                        }
                        
                        .product-name-link {
                            font-size: 14px;
                        }
                        
                        .price-text, .total-price {
                            font-size: 14px;
                        }
                        
                        .order-summary {
                            padding: 20px;
                        }
                        
                        .summary-row {
                            font-size: 14px;
                        }
                        
                        .summary-row.total {
                            font-size: 16px;
                        }
                        
                        .order-actions {
                            flex-direction: column;
                            align-items: stretch;
                            padding: 20px;
                        }
                        
                        .action-buttons {
                            width: 100%;
                            flex-direction: column;
                        }
                        
                        .btn-premium {
                            width: 100%;
                            padding: 14px 20px;
                        }
                        
                        .status-badge {
                            font-size: 12px;
                            padding: 8px 16px;
                        }
                        
                        .status-text {
                            font-size: 13px;
                        }
                        
                        .empty-state {
                            padding: 40px 20px;
                        }
                        
                        .empty-state img {
                            max-width: 200px;
                        }
                        
                        .empty-state h3 {
                            font-size: 22px;
                        }
                        
                        .empty-state h4 {
                            font-size: 14px;
                        }
                    }
                `}</style>

                {/*Orders section*/}
                <section className="premium-orders-page">
                    <div className="container">
                        {this.state.loading ?
                            <div className="loading-indicator"><BlinkBlur color="#667eea" size="medium" text="Loading your orders..." textColor="#2d3748" /></div> :
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className='row'>
                                        {this.state.orders.length > 0 ?
                                            this.state.orders.map((order, index) => {
                                                return (
                                                    <div className="col-lg-12 col-sm-12" key={index}>
                                                        <div className="premium-order-card">
                                                            <div className="order-header">
                                                                <div className="order-header-left">
                                                                    <h3>Order #{order.order_placed_id}</h3>
                                                                    <p>Placed on {order.created_at}</p>
                                                                </div>
                                                                <div className="order-header-right">
                                                                    <span className="payment-badge">
                                                                        <i className={`fa ${order.cod ? 'fa-money' : 'fa-credit-card'}`}></i> {order.cod ? "Cash On Delivery" : "Online Payment"}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="order-body">
                                                                <table className="table premium-table table-responsive-xs">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Image</th>
                                                                            <th>Product</th>
                                                                            <th>Price</th>
                                                                            <th></th>
                                                                            <th>Qty</th>
                                                                            <th>Total</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {order.orderItems.map((item, index) => (
                                                                            <tr key={index}>
                                                                                <td data-label="Image">
                                                                                    <Link href={`/view/product/${item.id}/${item.name}`}>
                                                                                        <div className="product-image-wrapper">
                                                                                            <img src={`${item.variants ? getImage(item.variants.filter((variant) => variant.productCode == item.productCode)[0].images) : getImage(item.images)}`} alt={item.displayName} />
                                                                                        </div>
                                                                                    </Link>
                                                                                </td>
                                                                                <td data-label="Product">
                                                                                    <Link href={`/view/product/${item.id}/${item.name}`} className="product-name-link">
                                                                                        {item.displayName}
                                                                                    </Link>
                                                                                </td>
                                                                                <td data-label="Price"><span className="price-text">₹{item.price}</span></td>
                                                                                <td><i className="fa fa-times"></i></td>
                                                                                <td data-label="Quantity"><span className="price-text">{item.quantity}</span></td>
                                                                                <td data-label="Total"><span className="total-price">₹{(item.quantity * item.price)}</span></td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                                
                                                                <div className="order-summary">
                                                                    <div className="summary-row">
                                                                        <span className="label">Subtotal:</span>
                                                                        <span className="value">₹{parseFloat(order.subtotal).toFixed(2)}</span>
                                                                    </div>
                                                                    {(order.subtotal - order.amount) > 0 && (
                                                                        <div className="summary-row">
                                                                            <span className="label">Coupon Discount:</span>
                                                                            <span className="value discount">-₹{parseFloat(order.subtotal - order.amount).toFixed(2)}</span>
                                                                        </div>
                                                                    )}
                                                                    {(order.totalPrice - order.subtotal) > 0 && (
                                                                        <div className="summary-row">
                                                                            <span className="label">Total Saved:</span>
                                                                            <span className="value discount">-₹{parseFloat(order.totalPrice - order.amount).toFixed(2)}</span>
                                                                        </div>
                                                                    )}
                                                                    <div className="summary-row total">
                                                                        <span className="label">Final Price:</span>
                                                                        <span className="value">₹{order.amount}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="order-actions">
                                                                {order.cancelled == 1 ? (
                                                                    <>
                                                                        <div className="status-section">
                                                                            <span className="status-badge cancelled">
                                                                                <i className="fa fa-times-circle"></i> Order Cancelled
                                                                            </span>
                                                                            {order.cancel_details.cancelled_on && (
                                                                                <div className="status-text">
                                                                                    Cancelled on {order.cancel_details.cancelled_on}
                                                                                </div>
                                                                            )}
                                                                            {order.cod == false && (
                                                                                <div className="status-text">
                                                                                    <strong>Refund Status:</strong> {order.refund == "0" ? "Pending" : (order.refund_details.refund_status || "Initiated")}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </>
                                                                ) : order.shipped == 0 ? (
                                                                    <>
                                                                        <div className="status-section">
                                                                            <span className="status-badge ready">
                                                                                <i className="fa fa-gift"></i> Ready To Ship
                                                                            </span>
                                                                        </div>
                                                                        <div className="action-buttons">
                                                                            <button className="btn-premium danger" onClick={(e) => this.cancelOrder(e, order.order_placed_id, order.cod)}>
                                                                                Cancel Order
                                                                            </button>
                                                                        </div>
                                                                    </>
                                                                ) : order.delivered == 1 ? (
                                                                    order.returned != 0 ? (
                                                                        <>
                                                                            <div className="status-section">
                                                                                <span className="status-badge returned">
                                                                                    <i className="fa fa-undo"></i> Returned
                                                                                </span>
                                                                                <div className="status-text">
                                                                                    <strong>Return Status:</strong> {order.return.return_status || "Pending"}
                                                                                </div>
                                                                                {order.return.confirmed_on && (
                                                                                    <div className="status-text">
                                                                                        <i className="fa fa-check-circle"></i> Return Confirmed - {order.return.confirmed_on}
                                                                                    </div>
                                                                                )}
                                                                                {order.return.shipped_on && (
                                                                                    <div className="status-text">
                                                                                        <i className="fa fa-truck"></i> Return Shipped - {order.return.shipped_on}
                                                                                    </div>
                                                                                )}
                                                                                {order.return.deliver_on && (
                                                                                    <div className="status-text">
                                                                                        <i className="fa fa-check-square"></i> Return Received - {order.return.deliver_on}
                                                                                    </div>
                                                                                )}
                                                                                {order.return.deliver_on && (
                                                                                    <div className="status-text">
                                                                                        <strong>Refund Status:</strong> {order.refund == "0" ? "Pending" : (order.refund_details.refund_status || "Initiated")}
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <div className="status-section">
                                                                                <span className="status-badge delivered">
                                                                                    <i className="fa fa-check-circle"></i> Delivered
                                                                                </span>
                                                                            </div>
                                                                            <div className="action-buttons">
                                                                                {this.calculateTimeDifference(order.delivered_date) <= 5 && (
                                                                                    <button className="btn-premium secondary" onClick={(e) => this.returnOrder(e, order.order_placed_id, order.cod)}>
                                                                                        Return Order
                                                                                    </button>
                                                                                )}
                                                                            </div>
                                                                        </>
                                                                    )
                                                                ) : (
                                                                    <>
                                                                        <div className="status-section">
                                                                            <span className="status-badge ready">
                                                                                <i className="fa fa-truck"></i> In Transit
                                                                            </span>
                                                                            <TrackStatus data={this.state.trackingData} />
                                                                        </div>
                                                                        <div className="action-buttons">
                                                                            <button className="btn-premium primary" onClick={(e) => this.trackOrderStatus(e, order.shipment_id, order.cod)}>
                                                                                Track Order
                                                                            </button>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }) :
                                            <div className="col-sm-12">
                                                <div className="empty-state">
                                                    <img src={`/assets/images/empty-search.jpg`} alt="No orders" />
                                                    <h3>No Orders Found</h3>
                                                    <h4>Explore our collection and place your first order!</h4>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    
                    <Modal open={this.state.open} onClose={this.onCloseModal} center>
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content quick-view-modal">
                                <div className="modal-body">
                                    <div className="row">
                                        <div className='col-12'>
                                            <h3>Return Order Details</h3>
                                        </div>
                                        <div className="col-lg-6 col-xs-12">
                                            <h5>Order ID: {this.state.returnorder_placed_id}</h5>
                                            <div className="form-group">
                                                <label htmlFor="exampleFormControlSelect1">Reason for return</label><span style={{ color: "red" }}>*</span>
                                                <select className="form-control" name="returnReason" id="exampleFormControlSelect1" onChange={(e) => this.setState({ returnReason: e.target.value })}>
                                                    <option value="">Select Reason</option>
                                                    <option value="Product Damaged">Product Damaged</option>
                                                    <option value="Product not as described">Product not as described</option>
                                                    <option value="Product not as expected">Product not as expected</option>
                                                    <option value="Product not as shown">Product not as shown</option>
                                                    <option value="Product not as ordered">Product not as ordered</option>
                                                    <option value="Product not as advertised">Product not as advertised</option>
                                                </select>
                                                {this.validator.message('returnReason', this.state.returnReason, 'required')}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleFormControlTextarea1">Description</label><span style={{ color: "red" }}>*</span>
                                                <textarea className="form-control" name="returnDescription" id="exampleFormControlTextarea1" rows="3" onChange={(e) => this.setState({ returnDescription: e.target.value })}></textarea>
                                                {this.validator.message('returnDescription', this.state.returnDescription, 'required')}
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-xs-12">
                                            <div>
                                                <button className="btn btn-solid" onClick={(e) => this.returnOrderSubmit(e)}>Submit Return Request</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </section>
            </div>
        )
    }
}

export default Orders

// Made with Bob
