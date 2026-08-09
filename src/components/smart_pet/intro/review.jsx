'use client'
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './../css/review.css';

const reviews = [
    { id: 1,  name: 'Aarav Mehta',      state: 'Delhi',           stars: 5, text: 'My dog wandered off during a morning walk. Someone found him and scanned the tag — I got a WhatsApp-style alert with their location within minutes. Back home in under an hour.' },
    { id: 2,  name: 'Sanya Verma',      state: 'Maharashtra',     stars: 5, text: 'The secure chat was a lifesaver. I could talk to the person who found my cat without giving out my number. Felt completely safe the whole time.' },
    { id: 3,  name: 'Rajesh Kumar',     state: 'Bangalore',       stars: 5, text: 'No app to download, no subscription. That sold me. My dog\'s been wearing it for 8 months — tag is still in perfect condition.' },
    { id: 4,  name: 'Pooja Sharma',     state: 'Rajasthan',       stars: 5, text: 'I used to worry every time my dog ran out of the gate. Now I feel genuinely calm. The instant alert means I know within seconds if someone finds him.' },
    { id: 5,  name: 'Vikram Reddy',     state: 'Hyderabad',       stars: 5, text: 'My Labrador got out during Diwali fireworks. Panicked. Someone scanned the tag and I had their location in two minutes. Incredible product.' },
    { id: 6,  name: 'Neha Joshi',       state: 'Pune',            stars: 5, text: 'I love that I can track my dog\'s vaccinations and weight all in one place. The vet even commented on how organised my records were.' },
    { id: 7,  name: 'Anil Nair',        state: 'Kerala',          stars: 5, text: 'Lightweight, waterproof, my golden retriever swims with it every weekend. No fading on the QR code. Very well made.' },
    { id: 8,  name: 'Simran Kaur',      state: 'Chandigarh',      stars: 5, text: 'Bought it for my two dogs. Manage both profiles from one account. The price is crazy affordable for what you get.' },
    { id: 9,  name: 'Manish Tiwari',    state: 'Lucknow',         stars: 5, text: 'Was skeptical about a QR-based tag but it just works. The person who found my cat had no idea what to do but their phone camera opened the profile automatically.' },
    { id: 10, name: 'Priya Das',        state: 'Kolkata',         stars: 5, text: 'Setup took 10 minutes. The profile looks professional — photo, breed, health info, contact. Anyone who scans it knows exactly what to do.' },
    { id: 11, name: 'Harish Patel',     state: 'Ahmedabad',       stars: 5, text: 'My vet now checks the health records directly from the QR tag during every visit. No more carrying papers.' },
    { id: 12, name: 'Anita Choudhury',  state: 'Guwahati',        stars: 5, text: 'The whole experience from ordering to setup was smooth. Product quality is excellent. Highly recommend to every pet parent in India.' },
];

const Stars = ({ count }) => (
    <span className="review-stars">
        {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < count ? 'star-filled' : 'star-empty'}>★</span>
        ))}
    </span>
);

const Review = () => {
    const [index, setIndex] = useState(0);
    const prev = () => setIndex(i => (i - 1 + reviews.length) % reviews.length);
    const next = () => setIndex(i => (i + 1) % reviews.length);
    const r = reviews[index];

    return (
        <section className="reviews-section">
            <div className="reviews-inner">
                <p className="intro-eyebrow intro-eyebrow-center">Real stories</p>
                <h2 className="reviews-title">What pet parents are saying</h2>

                <div className="review-carousel">
                    <button className="review-nav review-nav-prev" onClick={prev} aria-label="Previous">
                        <ChevronLeft size={22} />
                    </button>

                    <div className="review-card">
                        <Stars count={r.stars} />
                        <p className="review-text">&ldquo;{r.text}&rdquo;</p>
                        <div className="review-author">
                            <img src="/assets/images/icon/user.png" alt={r.name} className="review-avatar" />
                            <div>
                                <strong className="review-name">{r.name}</strong>
                                <span className="review-state">{r.state}, India</span>
                            </div>
                        </div>
                    </div>

                    <button className="review-nav review-nav-next" onClick={next} aria-label="Next">
                        <ChevronRight size={22} />
                    </button>
                </div>

                <div className="review-dots">
                    {reviews.map((_, i) => (
                        <button key={i} className={`review-dot ${i === index ? 'review-dot-active' : ''}`} onClick={() => setIndex(i)} aria-label={`Review ${i + 1}`} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Review;
