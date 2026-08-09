import React from 'react';
import './../css/benefits.css';

const BENEFITS = [
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
        ),
        title: 'No battery. No charging.',
        body: 'Purely QR-based. No hardware to maintain, no radiation, no rashes. Works as long as the tag is on the collar.',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
        ),
        title: 'Instant secure chat',
        body: 'The finder messages you directly through the app. Your phone number stays private — no awkward cold calls from strangers.',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
            </svg>
        ),
        title: 'Alert the moment it\'s scanned',
        body: 'You get a push notification with the finder\'s GPS location the second your pet\'s tag is scanned. React immediately.',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
        ),
        title: 'Live GPS from the finder\'s phone',
        body: 'No GPS chip needed in the tag. The finder\'s location is sent to you when they scan — so you know exactly where to go.',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>
            </svg>
        ),
        title: 'Full health records on the tag',
        body: 'Vaccinations, weight history, deworming — all linked to the QR. Your vet sees the complete health profile with one scan.',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
            </svg>
        ),
        title: 'No subscription. Ever.',
        body: 'Pay once for the tag. All features — alerts, chat, GPS, health records, unlimited scans — are included for life.',
    },
];

const Benefits = () => (
    <section className="benefits-section">
        <div className="benefits-inner">
            <p className="intro-eyebrow intro-eyebrow-center">Why pet parents love it</p>
            <h2 className="benefits-title">Everything your pet needs. Nothing you don&apos;t.</h2>
            <div className="benefits-grid">
                {BENEFITS.map((b, i) => (
                    <div key={i} className="benefit-card">
                        <div className="benefit-icon">{b.icon}</div>
                        <h3 className="benefit-card-title">{b.title}</h3>
                        <p className="benefit-card-body">{b.body}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Benefits;
