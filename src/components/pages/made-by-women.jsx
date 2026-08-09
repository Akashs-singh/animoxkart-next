'use client';

import React, { Component } from 'react';
import Link from 'next/link';
import './made-by-women.scss';

class MadeByWomen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: false
        };
    }

    componentDidMount() {
        this.setState({ isMounted: true });
    }

    scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    render() {
        return (
            <div className="made-by-women-page">
                {/* Section 1: Hero Section */}
                <section className="hero-section">
                    <div className="hero-image-container">
                        <img 
                            src="/assets/images/made-by-women/hero-banner.png" 
                            alt="Indian woman stitching pet product"
                            className="hero-image"
                        />
                        <div className="hero-overlay"></div>
                    </div>
                    <div className="hero-content">
                        <h1 className="hero-headline">
                            Every Animoxkart product is crafted by women building their independence
                        </h1>
                        <p className="hero-subtext">
                            Behind every collar, leash, and harness is a story of strength, skill, and self-reliance.
                        </p>
                        <div className="hero-cta-container">
                            <button 
                                className="btn-primary"
                                onClick={() => this.scrollToSection('stories-section')}
                            >
                                Meet the Makers
                            </button>
                            <p className="secondary-cta">
                                You can save 15% on your first order
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 2: Real Stories */}
                <section id="stories-section" className="stories-section">
                    <div className="container">
                        <div className="story-item">
                            <div className="story-image">
                                <img 
                                    src="/assets/images/made-by-women/sunita.png" 
                                    alt="Sunita - Mother of 2"
                                />
                            </div>
                            <div className="story-content">
                                <div className="story-header">
                                    <h3 className="story-name">Sunita</h3>
                                    <p className="story-title">Mother of 2</p>
                                </div>
                                <p className="story-text">
                                    Sunita spent years as a homemaker, dependent on uncertain income. Today, she stitches pet harnesses with precision and pride. With every product she makes, she contributes to her children's education and her family's stability.
                                </p>
                                <p className="story-emotion">
                                    "This is more than work — it's dignity."
                                </p>
                            </div>
                        </div>

                        <div className="story-item reverse">
                            <div className="story-image">
                                <img 
                                    src="/assets/images/made-by-women/priya1.png" 
                                    alt="Priya - First income journey"
                                />
                            </div>
                            <div className="story-content">
                                <div className="story-header">
                                    <h3 className="story-name">Priya</h3>
                                    <p className="story-title">First income journey</p>
                                </div>
                                <p className="story-text">
                                    Priya had never earned before joining Animoxkart. Today, she not only earns but supports her household. What started as a small opportunity has become her confidence and independence.
                                </p>
                                <p className="story-emotion">
                                    "For the first time, she earns for herself."
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Behind the Scenes */}
                <section className="behind-scenes-section">
                    <div className="container">
                        <h2 className="section-title">Behind the Scenes</h2>
                        <div className="scenes-scroll-container">
                            <div className="scene-item">
                                <img 
                                    src="/assets/images/made-by-women/stitching.png" 
                                    alt="Precision stitching"
                                />
                                <p className="scene-caption">Precision stitching for durability</p>
                            </div>
                            <div className="scene-item">
                                <img 
                                    src="/assets/images/made-by-women/quality-check.png" 
                                    alt="Quality checks"
                                />
                                <p className="scene-caption">Careful quality checks</p>
                            </div>
                            <div className="scene-item">
                                <img 
                                    src="/assets/images/made-by-women/packing.png" 
                                    alt="Hand-packed products"
                                />
                                <p className="scene-caption">Hand-packed with attention</p>
                            </div>
                            <div className="scene-item">
                                <img 
                                    src="/assets/images/made-by-women/workspace.png" 
                                    alt="Workspace"
                                />
                                <p className="scene-caption">A workspace built on trust</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4: Impact Section */}
                <section className="impact-section">
                    <div className="container">
                        <div className="impact-grid">
                            <div className="impact-item">
                                <div className="impact-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                    </svg>
                                </div>
                                <h3 className="impact-number">20+</h3>
                                <p className="impact-label">Women Empowered</p>
                            </div>
                            <div className="impact-item">
                                <div className="impact-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="12" y1="1" x2="12" y2="23"></line>
                                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                    </svg>
                                </div>
                                <h3 className="impact-number">₹2,00,000+</h3>
                                <p className="impact-label">Income Generated</p>
                            </div>
                            <div className="impact-item">
                                <div className="impact-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                                    </svg>
                                </div>
                                <h3 className="impact-number">1000+</h3>
                                <p className="impact-label">Products Crafted</p>
                            </div>
                        </div>
                        <p className="impact-subtext">
                            Every purchase contributes to these growing numbers.
                        </p>
                    </div>
                </section>

                {/* Section 5: Why This Matters */}
                <section className="why-matters-section">
                    <div className="container">
                        <div className="why-matters-content">
                            <p className="why-matters-text">
                                In a world of mass production, we chose a different path — one that creates opportunities, not just products. When you choose Animoxkart, you're not just buying for your pet, you're supporting real people behind the scenes.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 6: Final CTA */}
                <section className="final-cta-section">
                    <div className="container">
                        <h2 className="cta-headline">
                            Support their work. Choose better for your pet.
                        </h2>
                        <p className="cta-subtext">
                            Every purchase creates impact beyond your home.
                        </p>
                        <Link href="/products/premium" className="btn-shop-now">
                            Shop Now
                        </Link>
                        <p className="cta-offer">
                            You can save 15% on your first order
                        </p>
                    </div>
                </section>

                {/* Sticky Mobile CTA */}
                <div className="sticky-mobile-cta">
                    <Link href="/products/premium" className="btn-sticky">
                        Shop Now
                    </Link>
                </div>
            </div>
        );
    }
}

export default MadeByWomen;

// Made with Bob
