'use client';

// src/components/layouts/pets/main.jsx
'use client'

import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { svgFreeShipping, svgservice, svgoffer, svgpayment } from '../../../services/script'
import { connect } from 'react-redux'

// ALL components that touch browser APIs — dynamic with ssr:false
const Slider = dynamic(() => import('react-slick'), { ssr: false })
const ProductBlock = dynamic(() => import('../common/product-block'), { ssr: false })
const SpecialProducts = dynamic(() => import('./specialProducts'), { ssr: false })
const CollectionNew = dynamic(() => import('./collection-new'), { ssr: false })
const RegularCollection = dynamic(() => import('./regularCollection'), { ssr: false })
const PremiumCollection = dynamic(() => import('./premiumCollection'), { ssr: false })
const SaveAndExtraCollection = dynamic(() => import('./saveAndExtraCollection'), { ssr: false })
const HeaderOne = dynamic(() => import('../../common/headers/header-one'), { ssr: false })
const FooterTwo = dynamic(() => import('../../common/footers/footer-two'), { ssr: false })
const ThemeSettings = dynamic(() => import('../../common/theme-settings'), { ssr: false })
const OfferSlider = dynamic(() => import('../common/offerBar'), { ssr: false })
const ImpactBanner = dynamic(() => import('./impact-banner'), { ssr: false })

class Pets extends Component {
  render() {
    return (
      <div>
        <HeaderOne logoName={'layout3/logo.png'} />

        <section className="p-0 small-slider" id="sectionSlider">
          <Slider className="slide-1 home-slider">
            <div>
              <div className="home home46"
                style={{ backgroundImage: "url('https://animoxkart-products.s3.ap-south-1.amazonaws.com/home/460.jpg')" }}>
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <div className="slider-contain">
                        <div>
                          <h4>Paw-some savings, just for you.</h4>
                          <h1>let's shop</h1>
                          <Link href="/shop/regular" className="btn btn-solid">shop now</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="home home45"
                style={{ backgroundImage: "url('https://animoxkart-products.s3.ap-south-1.amazonaws.com/home/450.jpg')" }}>
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <div className="slider-contain">
                        <div>
                          <h4 style={{ color: "white" }}>Save big on quality dog accessories.</h4>
                          <h1 style={{ color: "white" }}>save 20%</h1>
                          <Link href="/shop/offers" className="btn btn-solid">shop now</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </section>

        <ProductBlock productTags={this.props.productTags} />
        
        <OfferSlider />
           {/* Free Finder Tag promo banner */}
        <section className="pt-0 pb-0 mt-4">
          <style jsx>{`
            .finder-tag-banner {
              background: linear-gradient(135deg, #1a2e4a 0%, #2d5086 60%, #427fc1 100%);
              border-radius: 12px;
              overflow: hidden;
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 36px 48px;
              min-height: 180px;
              gap: 24px;
              position: relative;
            }
            .finder-tag-images {
              flex-shrink: 0;
              display: flex;
              align-items: center;
            }
            .finder-tag-images img {
              height: 160px;
              width: auto;
              object-fit: contain;
              display: block;
            }
            /* ── Mobile: image becomes a faded watermark behind the text ── */
            @media (max-width: 575px) {
              .finder-tag-banner {
                padding: 28px 24px;
                min-height: 200px;
              }
              .finder-tag-images {
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                align-items: center;
                opacity: 0.12;
                pointer-events: none;
              }
              .finder-tag-images img {
                height: 100% !important;
                max-height: 200px;
              }
            }
          `}</style>
          <div className="container mb-4">
            <div className="finder-tag-banner">

              {/* Text — always on top on mobile thanks to z-index */}
              <div style={{ flex: '1', minWidth: 0, position: 'relative', zIndex: 1 }}>
                <p style={{
                  color: '#a8c8ef',
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  marginBottom: '8px',
                  lineHeight: '1',
                }}>
                  🐾&nbsp; Free with every order
                </p>
                <h2 style={{
                  color: '#ffffff',
                  fontSize: '22px',
                  fontWeight: '700',
                  margin: '0 0 10px',
                  lineHeight: '1.25',
                  textTransform: 'none',
                  letterSpacing: '-0.01em',
                }}>
                  Smart GPS Pet Finder Tag — On Us
                </h2>
                <p style={{
                  color: '#c8dff5',
                  fontSize: '13.5px',
                  margin: '0 0 6px',
                  lineHeight: '1.6',
                }}>
                  Every Animoxkart order comes with a <strong style={{ color: '#ffffff' }}>free Smart Pet Finder Tag</strong> featuring{' '}
                  <strong style={{ color: '#ffffff' }}>GPS location tracking and health monitoring</strong>.
                </p>
                <p style={{
                  color: '#a8c8ef',
                  fontSize: '13px',
                  margin: '0 0 20px',
                  lineHeight: '1.5',
                }}>
                  Keep your pet closer, safer, and better monitored — wherever they go.
                </p>
                <Link
                  href="/pet-finder-tag/intro"
                  style={{
                    display: 'inline-block',
                    background: '#ffffff',
                    color: '#1a2e4a',
                    fontSize: '12px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    padding: '10px 22px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                  }}
                >
                  Learn more →
                </Link>
              </div>

              {/* Image — desktop: beside text · mobile: faded watermark via CSS */}
              <div className="finder-tag-images">
                <img
                  src="/assets/images/pets/smart-pet/backimage.png"
                  alt="Smart Pet Finder Tag"
                />
              </div>

            </div>
          </div>
        </section>

        {/* Impact Banner Section */}
        <ImpactBanner />
       
        <SpecialProducts />

     

        {/* Banner Section */}
        <section className="pt-0 mt-4 banner-6 ratio2_1">
          <style jsx>{`
            @media (max-width: 767px) {
              .banner-second-row {
                display: none !important;
              }
            }
          `}</style>
          <div className="container mb-4">
            <div className="row partition3">
              {[
                { href: '/shop/regular', img: '1' },
                { href: '/shop/premium', img: '2' },
                { href: '/shop/offers',  img: '3' },
              ].map(({ href, img }) => (
                <div className="col-md-4" key={img}>
                  <Link href={href}>
                    <div className="collection-banner p-left">
                      <div className="img-part">
                        <img
                          src={`https://animoxkart-products.s3.ap-south-1.amazonaws.com/banner/${img}.png`}
                          className="img-fluid blur-up lazyload bg-img"
                          alt=""
                        />
                      </div>
                      <div className="contain-banner banner-3" />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div className="row partition3 banner-top-cls banner-second-row">
              {[
                { href: '/shop/combo',      img: '4' },
                { href: '/shop/regular',    img: '5' },
                { href: '/shop/mega-combo', img: '6' },
              ].map(({ href, img }) => (
                <div className="col-md-4" key={img}>
                  <Link href={href}>
                    <div className="collection-banner p-right">
                      <div className="img-part">
                        <img
                          src={`https://animoxkart-products.s3.ap-south-1.amazonaws.com/banner/${img}.png`}
                          className="img-fluid blur-up lazyload bg-img"
                          alt=""
                        />
                      </div>
                      <div className="contain-banner banner-3" />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CollectionNew type={'wearable'} title="TOP COLLECTION" subtitle="Special Offer" />
        <RegularCollection type={'wearable'} title="PRODUCTS" subtitle="New Offer" />
        <PremiumCollection type={'wearable'} title="PREMIUM PRODUCTS" subtitle="Special Offer" />

        <section className="p-0 pet-parallax">
          <div className="full-banner parallax parallax-banner19 text-center p-center">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="banner-contain">
                    <h4>choose what your pet love</h4>
                    <h3>get upto 70% off</h3>
                    <p>Don't miss out on our amazing sale! Right now, we're offering up to 70% off on a wide selection of pet accessories.</p>
                    <Link href="/shop/regular" className="btn btn-solid black-btn">shop now</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="pet-decor">
              <img src="/assets/images/dog.png" alt="" className="img-fluid blur-up lazyload" />
            </div>
          </div>
        </section>

        <SaveAndExtraCollection type={'wearable'} title="SAVE AND EXTRA" />

        <div className="container">
          <section className="service section-b-space border-section border-top-0">
            <style jsx>{`
              @media (max-width: 767px) {
                .service-block1:nth-child(4) {
                  display: none !important;
                }
              }
            `}</style>
            <div className="row partition4">
              <div className="col-lg-3 col-md-6 service-block1">
                <div dangerouslySetInnerHTML={{ __html: svgFreeShipping }} />
                <h4>free shipping</h4>
                <p>Enjoy fast, FREE delivery on over 1000 items at any pincode.</p>
              </div>
              <div className="col-lg-3 col-md-6 service-block1">
                <div dangerouslySetInnerHTML={{ __html: svgservice }} />
                <h4>24 X 7 support</h4>
                <p>We offer fast and quick solution on all types of Animoxkart products.</p>
              </div>
              <div className="col-lg-3 col-md-6 service-block1">
                <div dangerouslySetInnerHTML={{ __html: svgoffer }} />
                <h4>festival offer</h4>
                <p>Best Offers and coupons are available for all festivals.</p>
              </div>
              <div className="col-lg-3 col-md-6 service-block1">
                <div dangerouslySetInnerHTML={{ __html: svgpayment }} />
                <h4>online payment</h4>
                <p>100+ modes - netbanking, all cards, UPI & Wallets.</p>
              </div>
            </div>
          </section>
        </div>

        {/* <ThemeSettings /> */}
        <FooterTwo logoName={'logo/14.png'} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  productTags: state.tags.tags,
  data: state.data,
})

export default connect(mapStateToProps)(Pets)