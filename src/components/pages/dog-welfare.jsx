'use client';

import React, { Component } from 'react';
import Link from 'next/link';
import './dog-welfare.scss';

class DogWelfare extends Component {
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
            <div className="dog-welfare-page">
                {/* Section 1: Hero Section */}
                <section className="hero-section">
                    <div className="hero-image-container">
                        <img 
                            src="/assets/images/dog-welfare/hero-banner.jpg" 
                            alt="Caring for stray dogs"
                            className="hero-image"
                        />
                        <div className="hero-overlay"></div>
                    </div>
                    <div className="hero-content">
                        <h1 className="hero-headline">
                            Not every dog has a home… but together, we can care
                        </h1>
                        <p className="hero-subtext">
                            Every Animoxkart purchase helps support dogs beyond your own.
                        </p>
                        <div className="hero-cta-container">
                            <button 
                                className="btn-primary"
                                onClick={() => this.scrollToSection('impact-section')}
                            >
                                See Your Impact
                            </button>
                            <p className="secondary-cta">
                                You can save 15% on your first order
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 2: The Reality */}
                <section className="reality-section">
                    <div className="container">
                        <div className="reality-content">
                            <div className="reality-image">
                                <img 
                                    src="/assets/images/dog-welfare/reality.jpg" 
                                    alt="Street dogs in India"
                                />
                            </div>
                            <div className="reality-text">
                                <p className="reality-paragraph">
                                    Thousands of dogs live on the streets without consistent food, care, or safety. While some find homes, many rely on the kindness of strangers.
                                </p>
                                <p className="reality-paragraph emphasis">
                                    We believe every dog deserves dignity — not just the ones we bring home.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: What We Do */}
                <section className="action-section">
                    <div className="container">
                        <h2 className="section-title">What We Do</h2>
                        <div className="action-grid">
                            <div className="action-item">
                                <div className="action-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                                        <path d="M2 17l10 5 10-5"></path>
                                        <path d="M2 12l10 5 10-5"></path>
                                    </svg>
                                </div>
                                <h3 className="action-title">Feeding stray dogs regularly</h3>
                                <p className="action-description">
                                    Consistent meal support for street dogs in local communities
                                </p>
                            </div>
                            <div className="action-item">
                                <div className="action-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                    </svg>
                                </div>
                                <h3 className="action-title">Supporting local shelters</h3>
                                <p className="action-description">
                                    Providing resources and supplies to animal shelters
                                </p>
                            </div>
                            <div className="action-item">
                                <div className="action-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                    </svg>
                                </div>
                                <h3 className="action-title">Providing basic care and supplies</h3>
                                <p className="action-description">
                                    Essential medical care, food, and safety items
                                </p>
                            </div>
                            <div className="action-item">
                                <div className="action-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                    </svg>
                                </div>
                                <h3 className="action-title">Encouraging community involvement</h3>
                                <p className="action-description">
                                    Building awareness and support networks
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4: Real Moments */}
                <section className="moments-section">
                    <div className="container">
                        <h2 className="section-title">Real Moments</h2>
                        <div className="moments-scroll-container">
                            <div className="moment-item">
                                <img 
                                    src="/assets/images/dog-welfare/feeding.jpg" 
                                    alt="Morning feeding routine"
                                />
                                <p className="moment-caption">Morning feeding routine</p>
                            </div>
                            <div className="moment-item">
                                <img 
                                    src="/assets/images/dog-welfare/shelter-care.jpg" 
                                    alt="Care at local shelter"
                                />
                                <p className="moment-caption">Care at local shelter</p>
                            </div>
                            <div className="moment-item">
                                <img 
                                    src="/assets/images/dog-welfare/rescue.jpg" 
                                    alt="Rescue support"
                                />
                                <p className="moment-caption">Rescue support</p>
                            </div>
                            <div className="moment-item">
                                <img 
                                    src="/assets/images/dog-welfare/volunteers.jpg" 
                                    alt="Community volunteers"
                                />
                                <p className="moment-caption">Community volunteers in action</p>
                            </div>
                            <div className="moment-item">
                                <img 
                                    src="/assets/images/dog-welfare/medical-care.jpg" 
                                    alt="Medical care"
                                />
                                <p className="moment-caption">Basic medical care</p>
                            </div>
                            <div className="moment-item">
                                <img 
                                    src="/assets/images/dog-welfare/community.jpg" 
                                    alt="Community support"
                                />
                                <p className="moment-caption">Community coming together</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 5: Impact Numbers */}
                <section id="impact-section" className="impact-section">
                    <div className="container">
                        <div className="impact-grid">
                            <div className="impact-item">
                                <div className="impact-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="1"></circle>
                                        <circle cx="12" cy="5" r="1"></circle>
                                        <circle cx="12" cy="19" r="1"></circle>
                                    </svg>
                                </div>
                                <h3 className="impact-number">500+</h3>
                                <p className="impact-label">Dogs Fed</p>
                            </div>
                            <div className="impact-item">
                                <div className="impact-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    </svg>
                                </div>
                                <h3 className="impact-number">50+</h3>
                                <p className="impact-label">Shelter Support Activities</p>
                            </div>
                            <div className="impact-item">
                                <div className="impact-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                    </svg>
                                </div>
                                <h3 className="impact-number">100+</h3>
                                <p className="impact-label">Community Contributions</p>
                            </div>
                        </div>
                        <p className="impact-subtext">
                            These numbers grow with every order.
                        </p>
                    </div>
                </section>

                {/* Section 6: Transparency Section */}
                <section className="transparency-section">
                    <div className="container">
                        <div className="transparency-content">
                            <p className="transparency-text">
                                We're committed to transparency. A portion of every purchase contributes to dog welfare efforts — from food to care.
                            </p>
                            <p className="transparency-text">
                                We regularly share updates so you can see the real impact you're part of.
                            </p>
                            <Link href="/impact/updates" className="btn-updates">
                                View Monthly Updates
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Section 7: Why This Matters */}
                <section className="why-matters-section">
                    <div className="container">
                        <div className="why-matters-content">
                            <p className="why-matters-text">
                                When you buy for your dog, you also help one who doesn't have a home yet. Small actions, when done together, create real change.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 8: Final CTA */}
                <section className="final-cta-section">
                    <div className="container">
                        <h2 className="cta-headline">
                            Care for your dog. Help another.
                        </h2>
                        <p className="cta-subtext">
                            Every purchase makes a difference.
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

export default DogWelfare;

// Made with Bob
