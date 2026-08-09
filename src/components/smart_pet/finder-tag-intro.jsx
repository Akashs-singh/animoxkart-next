'use client'
import React, { Component } from "react";
import Script from 'next/script';
import "./css/pet-finder.css";
import Review from './intro/review.jsx';
import Benefits from "./intro/benefits.jsx";
import './css/intro.css';

class FinderTagIntro extends Component {
    render() {
        return (
            <div className="intro-root">
                <Script
                    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
                    strategy="lazyOnload"
                />

                {/* ── HERO ─────────────────────────────────────────────── */}
                <section className="intro-hero">
                    <div className="intro-hero-overlay">
                        <div className="intro-hero-inner">
                            <span className="intro-hero-badge">India&apos;s #1 Smart Pet Tag</span>
                            <h1 className="intro-hero-h1">
                                Your pet is one scan<br />away from coming home.
                            </h1>
                            <p className="intro-hero-sub">
                                A QR tag on their collar. A profile on your phone. If they ever wander off,
                                anyone who finds them can reach you in seconds — no app, no subscription, no hassle.
                            </p>
                            <div className="intro-hero-cta">
                                <a href="/products/tags" className="btn btn-solid intro-btn-primary">Get Your Tag — ₹299</a>
                                <a href="#how-it-works" className="intro-btn-ghost">See how it works ↓</a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── TRUST BAR ────────────────────────────────────────── */}
                <section className="intro-trust-bar">
                    <div className="intro-trust-inner">
                        <div className="intro-trust-item">
                            <span className="intro-trust-num">10,000+</span>
                            <span className="intro-trust-label">Pets protected</span>
                        </div>
                        <div className="intro-trust-divider"></div>
                        <div className="intro-trust-item">
                            <span className="intro-trust-num">₹0</span>
                            <span className="intro-trust-label">Subscription forever</span>
                        </div>
                        <div className="intro-trust-divider"></div>
                        <div className="intro-trust-item">
                            <span className="intro-trust-num">No app</span>
                            <span className="intro-trust-label">Works on any phone</span>
                        </div>
                        <div className="intro-trust-divider"></div>
                        <div className="intro-trust-item">
                            <span className="intro-trust-num">Instant</span>
                            <span className="intro-trust-label">Alert when tag is scanned</span>
                        </div>
                    </div>
                </section>

                {/* ── PROBLEM STATEMENT ────────────────────────────────── */}
                <section className="intro-problem">
                    <div className="intro-section-inner">
                        <div className="intro-problem-text">
                            <p className="intro-eyebrow">The hard truth</p>
                            <h2>Every 2 minutes, a pet goes missing in India.</h2>
                            <p className="intro-body-text">
                                Over 10 million pets go missing every year. Less than 20% make it back home.
                                Not because their owners didn&apos;t care — but because there was no fast,
                                reliable way for a stranger to reach them.
                            </p>
                            <p className="intro-body-text">
                                The Animoxkart Finder Tag changes that. One scan. Your phone rings.
                                Your pet comes home.
                            </p>
                        </div>
                        <div className="intro-problem-image">
                            <img src="/assets/second-image.png" alt="Pet finder app on phone" />
                        </div>
                    </div>
                </section>

                {/* ── HOW IT WORKS ─────────────────────────────────────── */}
                <section className="how-it-works" id="how-it-works">
                    <div className="container">
                        <div className="section-header">
                            <p className="intro-eyebrow intro-eyebrow-center">Simple by design</p>
                            <h2 className="section-title">How it works</h2>
                            <p className="section-subtitle">Three steps. No technical knowledge needed.</p>
                        </div>

                        <div className="steps-container">
                            <div className="step-card">
                                <div className="step-number">1</div>
                                <div className="step-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                                        <path d="M12 18h.01"></path>
                                    </svg>
                                </div>
                                <h3 className="step-title">Stranger scans the tag</h3>
                                <p className="step-description">
                                    Your pet is found. The finder points their phone at the QR code on the collar tag.
                                    No app download. Opens instantly in any browser.
                                </p>
                            </div>

                            <div className="step-arrow">→</div>

                            <div className="step-card">
                                <div className="step-number">2</div>
                                <div className="step-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                    </svg>
                                </div>
                                <h3 className="step-title">You get an instant alert</h3>
                                <p className="step-description">
                                    You receive a notification the moment the tag is scanned — with the finder&apos;s
                                    GPS location. You know exactly where your pet is.
                                </p>
                            </div>

                            <div className="step-arrow">→</div>

                            <div className="step-card">
                                <div className="step-number">3</div>
                                <div className="step-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                </div>
                                <h3 className="step-title">Chat privately &amp; reunite</h3>
                                <p className="step-description">
                                    Chat directly with the finder through the app — without sharing your phone number.
                                    Your privacy is protected while you coordinate the reunion.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── PRIVACY SECTION ──────────────────────────────────── */}
                <section className="intro-feature intro-feature-alt">
                    <div className="intro-section-inner intro-section-inner-rev">
                        <div className="intro-feature-image">
                            <img src="/assets/third-image.png" alt="Privacy protection" />
                        </div>
                        <div className="intro-feature-text">
                            <p className="intro-eyebrow">Your privacy first</p>
                            <h2>Show what you want.<br />Hide what you don&apos;t.</h2>
                            <p className="intro-body-text">
                                When someone scans your pet&apos;s tag, they see the pet&apos;s profile.
                                Your phone number, address, and personal details stay hidden unless
                                you choose to share them.
                            </p>
                            <p className="intro-body-text">
                                The built-in <strong>secure chat</strong> lets the finder message you
                                directly — no personal info exchanged, no risk.
                            </p>
                            <a href="/products/tags" className="btn btn-solid intro-btn-section">Order now</a>
                        </div>
                    </div>
                </section>

                {/* ── HEALTH PROFILE SECTION ───────────────────────────── */}
                <section className="intro-feature">
                    <div className="intro-section-inner">
                        <div className="intro-feature-text">
                            <p className="intro-eyebrow">More than a lost tag</p>
                            <h2>A complete health profile.<br />Always on the collar.</h2>
                            <p className="intro-body-text">
                                Store vaccination records, weight history, deworming schedule, and flea
                                treatment dates — all linked to the same QR tag. When your vet or groomer
                                scans it, they see Bruno&apos;s full health history instantly.
                            </p>
                            <ul className="intro-health-list">
                                <li><span className="intro-check">✓</span> Vaccination tracker with smart reminders</li>
                                <li><span className="intro-check">✓</span> Weight &amp; growth chart vs breed standards</li>
                                <li><span className="intro-check">✓</span> Deworming &amp; flea/tick schedule</li>
                                <li><span className="intro-check">✓</span> Visible on public QR scan for vets &amp; boarders</li>
                            </ul>
                        </div>
                        <div className="intro-feature-image">
                            <img src="/assets/fourth-image.png" alt="Pet health profile" />
                        </div>
                    </div>
                </section>

                {/* ── BENEFITS GRID ────────────────────────────────────── */}
                <Benefits />

                {/* ── REVIEWS ──────────────────────────────────────────── */}
                <Review />

                {/* ── BOTTOM CTA ───────────────────────────────────────── */}
                <section className="intro-bottom-cta">
                    <div className="intro-bottom-cta-inner">
                        <h2>Give your pet a voice when they can&apos;t speak.</h2>
                        <p>One tag. Lifetime protection. No monthly fees.</p>
                        <a href="/products/tags" className="btn btn-solid intro-btn-primary">Get the Finder Tag — ₹299</a>
                    </div>
                </section>

                {/* ── FAQ ──────────────────────────────────────────────── */}
                <section className="faq-section">
                    <div className="container">
                        <div className="faq-header">
                            <p className="intro-eyebrow intro-eyebrow-center">Got questions?</p>
                            <h2 className="faq-title">Frequently asked questions</h2>
                        </div>
                        <div className="faq-container">
                            <div className="accordion accordion-modern" id="faqAccordion">
                                {[
                                    { id: 'f1', q: 'What is the Animoxkart Pet Finder Tag?', a: 'A durable QR tag that attaches to your pet\'s collar. When scanned by anyone with a smartphone, it shows your pet\'s profile and lets the finder contact you securely — no app required on either side.' },
                                    { id: 'f2', q: 'Do I need to download an app to use it?', a: 'No. The finder just points their camera at the QR code. It opens in any smartphone browser instantly.' },
                                    { id: 'f3', q: 'Is my personal information safe?', a: 'Yes. You control exactly what\'s visible. Your phone number and address are hidden by default. The secure chat lets finders message you without your personal details ever being exposed.' },
                                    { id: 'f4', q: 'Is there a subscription fee?', a: 'No subscription, ever. You pay once for the tag. All features — alerts, chat, GPS, health records — are included for life.' },
                                    { id: 'f5', q: 'How accurate is the GPS location?', a: 'The GPS location is taken from the finder\'s phone at the moment they scan the tag. It gives you the exact location where your pet was found.' },
                                    { id: 'f6', q: 'Can I use one account for multiple pets?', a: 'Yes. Each pet gets their own tag and profile. You manage all of them from one Animoxkart account with no extra cost.' },
                                    { id: 'f7', q: 'What if my tag breaks or I need a replacement?', a: 'Order a new tag and scan it. You\'ll be asked whether to link it to an existing pet or register a new one — your pet\'s entire profile transfers instantly, no re-entering data.' },
                                    { id: 'f8', q: 'How durable is the tag?', a: 'The tag is water-resistant and built for daily outdoor use — walks, rain, mud. The QR code is protected and designed to last years of wear.' },
                                    { id: 'f9', q: 'What happens when someone scans my pet\'s tag?', a: 'You receive an instant notification with the finder\'s location. You can then open the secure chat to coordinate getting your pet back — all within the app.' },
                                    { id: 'f10', q: 'Where can I buy the tag?', a: 'Directly from animoxkart.com or from selected pet stores. Free shipping across India.' },
                                ].map(({ id, q, a }) => (
                                    <div key={id} className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse" data-bs-target={`#${id}`}
                                                aria-expanded="false" aria-controls={id}>
                                                {q}
                                            </button>
                                        </h2>
                                        <div id={id} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                            <div className="accordion-body">{a}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default FinderTagIntro;
