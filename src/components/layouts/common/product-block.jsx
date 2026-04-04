// src/components/common/product-block.jsx
'use client'

import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Slider6 } from '../../../services/script'

const Slider = dynamic(() => import('react-slick'), {
  ssr: false,
  loading: () => <div style={{ height: '100px' }} />
})

class ProductBlock extends Component {

  formatTagSingle(str = '') {
    const clean = str.replace(/-/g, ' ')
    return clean.charAt(0).toUpperCase() + clean.slice(1)
  }

  render() {
    const { productTags } = this.props
    console.log(productTags);
    return (
      <section className="section-b-space premium-product-block-section">
        <div className="container">
          <div className="row">
            <div className="col">
              <Slider {...Slider6} className="slide-6 no-arrow premium-slider">
                {productTags && productTags.map((tag, index) => (
                  <div className="product-block premium-product-block" key={index}>
                    <Link href={`/product/${tag.name}`} className="product-block-link">
                      <div className="product-block-circle">
                        <div className="circle-inner">
                          <img
                            src={tag.tag_image}
                            className="product-block-image"
                            alt={tag.name}
                          />
                        </div>
                      </div>
                      <h5 className="product-block-label">
                        {this.formatTagSingle(tag.name)}
                      </h5>
                    </Link>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
        <style jsx>{`
          .premium-product-block-section {
            padding: 50px 0;
          }

          .premium-product-block {
            padding: 15px;
            text-align: center;
          }

          .product-block-link {
            text-decoration: none;
            display: block;
          }

          .product-block-circle {
            width: 140px;
            height: 140px;
            margin: 0 auto 15px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 4px;
            transition: all 0.3s ease;
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
          }

          .premium-product-block:hover .product-block-circle {
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4);
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

          .product-block-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
            transition: transform 0.3s ease;
          }

          .premium-product-block:hover .product-block-image {
            transform: scale(1.1);
          }

          .product-block-label {
            margin: 0;
            font-size: 16px;
            font-weight: 600;
            color: #2d3748;
            transition: color 0.3s ease;
            letter-spacing: 0.5px;
          }

          .premium-product-block:hover .product-block-label {
            color: #667eea;
          }

          .premium-slider :global(.slick-slide) {
            padding: 0 10px;
          }

          @media (max-width: 768px) {
            .premium-product-block-section {
              padding: 30px 0;
            }

            .product-block-circle {
              width: 120px;
              height: 120px;
            }

            .product-block-label {
              font-size: 14px;
            }
          }

          @media (max-width: 480px) {
            .product-block-circle {
              width: 100px;
              height: 100px;
            }

            .circle-inner {
              // padding: 15px;
            }
          }
        `}</style>
      </section>
    )
  }
}

export default ProductBlock