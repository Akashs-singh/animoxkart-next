'use client';

import React from 'react';
import Link from 'next/link';

const ImpactBanner = () => {
  const firstRowBanners = [
    { 
      href: '/impact/women', 
      img: '1.png', 
      alt: 'Made by women building their independence',
      h4: 'Made by women building their independence',
      h1: 'more than pet products',
      buttonText: 'meet the makers',
      h4Style: { color: 'white' },
      h1Style: { color: 'white' }
    },
    { 
      href: '/products/harness', 
      img: '2.png', 
      alt: 'Your dog deserves comfort, not control',
      h4: 'Your dog deserves comfort, not control',
      h1: 'stop pulling. start bonding',
      buttonText: 'shop now',
      h4Style: { color: 'white' },
      h1Style: { color: 'white' }
    },
    { 
      href: '/impact/dogs', 
      img: '3.png', 
      alt: 'not all dogs have a home',
      h4: 'not all dogs have a home',
      h1: 'your purchase helps them too',
      buttonText: 'see your impact',
      h4Style: { color: 'white' },
      h1Style: { color: 'white' }
    }
  ];

  const secondRowBanners = [
    { 
      href: '/shop/regular', 
      img: '4.png', 
      alt: 'your dog will love this',
      h4: 'your dog will love this',
      h1: 'save 15% today',
      buttonText: 'shop now',
      h4Style: {},
      h1Style: {}
    },
    { 
      href: '/impact/women', 
      img: '5.png', 
      alt: 'Every product is crafted by women building independence',
      h4: 'Every product is crafted by women building independence',
      h1: 'she stitched this so her family could grow',
      buttonText: 'meet the makers',
      h4Style: {},
      h1Style: {}
    },
    { 
      href: '/shop/regular', 
      img: '6.png', 
      alt: 'Get 15% off your first order',
      h4: 'Get 15% off your first order – limited time',
      h1: 'your dog will love this',
      buttonText: 'claim offer',
      h4Style: {},
      h1Style: {}
    }
  ];

  return (
    <section className="pt-0 mt-4 banner-6 ratio2_1">
      <style jsx>{`
        @media (max-width: 767px) {
          .banner-second-row {
            display: none !important;
          }
        }
        .collection-banner {
          position: relative;
          max-height: 240px;
        }
          .collection-banner::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.3);
}
        .banner-text-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          z-index: 2;
          width: 90%;
        }
        .banner-text-overlay h4 {
          font-size: 18px;
          margin-bottom: 10px;
          text-transform: capitalize;
        }
        .banner-text-overlay h1 {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 20px;
          text-transform: capitalize;
        }
        @media (max-width: 767px) {
          .banner-text-overlay h4 {
            font-size: 14px;
          }
          .banner-text-overlay h1 {
            font-size: 24px;
          }
        }
      `}</style>
      <div className="container">
        <div className="row partition3 mb-3">
          {firstRowBanners.map(({ href, img, alt, h4, h1, buttonText, h4Style, h1Style }, index) => (
            <div className="col-md-4" key={index}>
              <div className="collection-banner p-left">
                <div className="img-part">
                  <img
                    src={`assets/images/impact/${img}`}
                    className="img-fluid blur-up lazyload bg-img"
                    alt={alt}
                  />
                </div>
                <div className="banner-text-overlay">
                  <h4 style={h4Style}>{h4}</h4>
                  <h1 style={h1Style}>{h1}</h1>
                  <Link href={href} className="btn btn-solid">
                    {buttonText}
                  </Link>
                </div>
                <div className="contain-banner banner-3" />
              </div>
            </div>
          ))}
        </div>
        {/* <div className="row partition3 banner-top-cls banner-second-row">
          {secondRowBanners.map(({ href, img, alt, h4, h1, buttonText, h4Style, h1Style }, index) => (
            <div className="col-md-4" key={index}>
              <div className="collection-banner p-right">
                <div className="img-part">
                  <img
                    src={`https://animoxkart-products.s3.ap-south-1.amazonaws.com/banner/${img}`}
                    className="img-fluid blur-up lazyload bg-img"
                    alt={alt}
                  />
                </div>
                <div className="banner-text-overlay">
                  <h4 style={h4Style}>{h4}</h4>
                  <h1 style={h1Style}>{h1}</h1>
                  <Link href={href} className="btn btn-solid">
                    {buttonText}
                  </Link>
                </div>
                <div className="contain-banner banner-3" />
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default ImpactBanner;

// Made with Bob
