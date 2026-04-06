'use client';

import React, { Component } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Slider to avoid SSR hydration issues
const Slider = dynamic(() => import('react-slick'), { ssr: false });
import { Slider6 } from "../../../services/script";

class ProductTypes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: false,
            selectedTypeId: 0 // Default to "all" (type_id: 0)
        };
    }

    handleTypeClick = (type) => {
        this.setState({ selectedTypeId: type.type_id });
        if (this.props.onTypeSelect) {
            this.props.onTypeSelect(type.type_name);
        }
    };

    formatTagSingle(str = "") {
        if (!str) return "";
        const clean = str.replace(/-/g, " ");
        return clean.charAt(0).toUpperCase() + clean.slice(1);
    };
    
    componentDidMount() {
        this.setState({ isMounted: true });
    }

    render() {
        const { categoryTag } = this.props;

        if (!categoryTag || !categoryTag.types) return null;
        const types = categoryTag?.types?.length
            ? [{ type_id: 0, type_name: "all", image: categoryTag.image }, ...categoryTag.types]
            : [];

        // Only render on client to avoid hydration mismatch
        if (!this.state.isMounted) return null;
        return (
            <section className="section-b-space premium-product-types-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Slider {...Slider6} className="slide-6 no-arrow premium-types-slider">
                                    {types.map((type) => {
                                        const isSelected = this.state.selectedTypeId === type.type_id;
                                        return (
                                            <div
                                                key={type.type_id}
                                                className={`product-type-item ${isSelected ? 'selected' : ''}`}
                                                onClick={() => this.handleTypeClick(type)}
                                            >
                                                <div className="product-type-circle">
                                                    <div className="circle-inner">
                                                        <img
                                                            src={type.image}
                                                            className="product-type-image"
                                                            alt={type.type_name}
                                                        />
                                                    </div>
                                                </div>
                                                <h5 className="product-type-label">
                                                    {this.formatTagSingle(type.type_name)}
                                                </h5>
                                           </div>
                                       );
                                   })}
                               </Slider>
                       </div>
                   </div>
               </div>
                <style jsx>{`
                    .premium-product-types-section {
                        padding: 50px 0;
                    }

                    .product-type-item {
                        padding: 15px;
                        text-align: center;
                        cursor: pointer;
                    }

                    .product-type-circle {
                        width: 140px;
                        height: 140px;
                        margin: 0 auto 15px;
                        border-radius: 50%;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        padding: 4px;
                        transition: all 0.3s ease;
                        box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
                    }

                    .product-type-item:hover .product-type-circle {
                        transform: translateY(-5px) scale(1.05);
                        box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4);
                    }

                    .product-type-item.selected .product-type-circle {
                        background: linear-gradient(135deg, #ff5722 0%, #ff9800 100%);
                        box-shadow: 0 12px 30px rgba(255, 87, 34, 0.4);
                        transform: scale(1.08);
                    }

                    .circle-inner {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        background: #ffffff;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        overflow: hidden;
                        // padding: 20px;
                    }

                    .product-type-image {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                        transition: transform 0.3s ease;
                    }

                    .product-type-item:hover .product-type-image {
                        transform: scale(1.1);
                    }

                    .product-type-label {
                        margin: 0;
                        font-size: 16px;
                        font-weight: 600;
                        color: #2d3748;
                        transition: color 0.3s ease;
                        letter-spacing: 0.5px;
                    }

                    .product-type-item:hover .product-type-label {
                        color: #667eea;
                    }

                    .product-type-item.selected .product-type-label {
                        color: #ff5722;
                        font-weight: 700;
                    }

                    .premium-types-slider :global(.slick-slide) {
                        padding: 0 10px;
                    }

                    @media (max-width: 768px) {
                        .premium-product-types-section {
                            padding: 30px 0;
                        }

                        .product-type-circle {
                            width: 120px;
                            height: 120px;
                        }

                        .product-type-label {
                            font-size: 14px;
                        }
                    }

                    @media (max-width: 480px) {
                        .product-type-circle {
                            width: 100px;
                            height: 100px;
                        }

                        .circle-inner {
                            // padding: 15px;
                        }
                    }
                `}</style>
            </section>
        );
    }
}

export default ProductTypes;
