import React from 'react';
import './../css/benefits.css';
const Benefits = () => {
    return (
        <section className='bg-color-secondary'>
            <div className='third-section'>
                <div className="container program-highlights">
                    <h2>Why Choose Animoxkart Pet Finder Tag?</h2>
                    <p>Discover how the Animoxkart Pet Finder Tag helps you quickly locate your pet with real-time alerts, GPS tracking, and secure communication—all without any subscription fees. Enjoy peace of mind knowing your pet can always find its way back home.</p>
                    <div className='first-row'>
                        <div className="col-md-4">
                            <div className='highlight-card'>
                                <img src={`/assets/vector/course/program-highlights/goal.svg`} alt="" />
                                <h6>No Battery/App Required:</h6>
                                <p>No Battery, No Charging, No Radiation, No Rashes. Focus on responsive and user-friendly interface.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className='highlight-card'>
                                <img src={`/assets/vector/course/program-highlights/learning.svg`} alt="" />
                                <h6>Instant Chat Feature:</h6>
                                <p>Communicate directly with the person who found your pet, making it easier to coordinate the reunion.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className='highlight-card'>
                                <img src={`/assets/vector/course/program-highlights/design.svg`} alt="" />
                                <h6>Easy to Update:</h6>
                                <p>You can easily update your pet's profile and your contact information through your Animoxkart account.</p>
                            </div>
                        </div>
                    </div>
                    <div className='second-row'>
                        <div className="col-md-6">
                            <div className='highlight-card'>
                                <img src={`/assets/vector/course/program-highlights/exam.svg`} alt="" />
                                <h6>Alerts and GPS Location:</h6>
                                <p>Receive real-time alerts and GPS location when someone scans the tag, so you know exactly where your pet was last seen.</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className='highlight-card'>
                                <img src={`/assets/vector/course/program-highlights/curriculum-vitae.svg`} alt="" />
                                <h6>Secure and Private:</h6>
                                <p>Your personal information is protected, and you can control what details are shared with the person who finds your pet.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Benefits;
