'use client'
import React, { Component } from "react";
import "./css/pet-finder.css";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import Review from './intro/review.jsx';
import Benefits from "./intro/benefits.jsx";
import Chat from "./chat.jsx";
import './css/intro.css';
import { ChatProvider } from './chat/contexts/ChatContext.js';
import ChatBox from "./chat/chatBox.jsx";
class FinderTagIntro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tag_id: "aman",
            showShareLocationButton: true,
            showAlert: false,
        };
    }

    componentDidMount = () => {
        if (!navigator.geolocation) {
            this.setState({
                showShareLocationButton: false
            })
        }
    }
    notify = () => toast('Thank You! Location shared.');
    openChat = () => {
        window.location.href = "/chat";
    };

    render() {
        const { data } = this.props;
        const { tag_id } = this.state;
        return (
            <div>
                {/* <Chat /> */}


                <section className="first-tag-intro-section">
                    {/* <div> */}
                    <div >
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="tag-intro-content">
                                        <h2>Smart and Secure – The Pet Finder Tag!</h2>
                                        <h4>Next-Level Pet Safety at Your Fingertips!</h4>
                                        <a href="shop/regular" className="btn btn-solid">buy now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </section>
                <section className="second-tag-intro-section">
                    <div>
                        <div >
                            <div className="container-area">
                                <div className="col details">
                                    <div>
                                        <h2>Did you know?
                                            Over 10 million pets go missing every year, with only 16-20% reunited.</h2>
                                        <h4>Smart Pet Finder Tag – Always connected, Always protected!</h4>
                                    </div>
                                </div>
                                <div className="mob-image">
                                    <img  src={`/assets/second-image.png`} alt="pet-finder-tag" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="third-tag-intro-section">
                    <div>
                        <div >
                            <div className="container-area">
                                <div className="col details">
                                    <div>
                                        <h2>Keep Your Pet Safe with Animoxkart Finder Tag!</h2>
                                        <h4>Our smart pet finder tag comes with GPS alerts and an online profile, ensuring your pet is always protected. If lost, a simple scan connects the finder to you instantly—bringing your furry friend home faster!</h4>
                                    </div>
                                </div>
                                <div className="mob-image">
                                    <img  src={`/assets/fourth-image.png`} alt="pet-finder-tag" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="fourth-tag-intro-section">
                    <div>
                        <div >
                            <div className="container-area">
                                <div className="col details">
                                    <div>
                                        <h2>Protect Your Pet & Your Privacy! 🐾🔒</h2>
                                        <h4>With our Smart Pet Finder Tag, your pet’s safety and your privacy come first! If someone finds your pet, they can scan the tag to view the profile—but your details stay hidden unless you choose to share them. Our Secure Chat feature lets finders and pet parents connect without revealing personal information, ensuring a safe and hassle-free reunion!</h4>
                                    </div>
                                </div>
                                <div className="mob-image">
                                    <img  src={`/assets/third-image.png`} alt="pet-finder-tag" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="how-it-works" style={{textAlign:"center"}}>
                    <h2 className="title">How does it work?</h2>
                    <div className="content">
                        <div className="text-section">
                            <h3 className="pet-sub-title">
                                <span className="icon"></span>  Scan the Tag
                            </h3>
                            <p className="description">
                            If someone finds your lost pet, they can scan the QR code on the <span className="highlight">Animoxkart Finder Tag </span> using their phone — no app needed!
                            </p>
                        </div>
                        <div className="image-section">
                            {/* <img src="your-image-path.jpg" alt="Scanning QR Code" /> */}
                        </div>
                    </div>
                    <div className="content">
                        <div className="text-section">
                            <h3 className="pet-sub-title">
                                <span className="icon"></span> Securely Connect
                            </h3>
                            <p className="description">
                            The finder can view essential pet details and parent details if shared. Even if you choose to hide your contact information, the finder can still reach you through secure chat—ensuring privacy while allowing a quick and safe reunion. No phone numbers or emails are shared, keeping both you and your pet protected.
                            </p>
                        </div>
                        <div className="image-section">
                            {/* <img src="your-image-path.jpg" alt="Scanning QR Code " /> */}
                        </div>
                    </div>
                    <div className="content">
                        <div className="text-section">
                            <h3 className="pet-sub-title">
                                <span className="icon"></span>  Get Instant Live Location & Reunite
                            </h3>
                            <p className="description">
                                You'll receive a real-time GPS alert when the tag is scanned, helping you quickly track and reunite with your pet.
                            </p>
                        </div>
                        <div className="image-section">
                            {/* <img src="your-image-path.jpg" alt="Scanning QR Code " /> */}
                        </div>
                    </div>
                </section>
                <Benefits />
                <Review />
                {/* <section>
                    <div className="customer-review">
                        <div className="row">
                            <div className="card" style={{ width: "18rem" }}>
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                            <div className="card" style={{ width: "18rem" }}>
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                            <div className="card" style={{ width: "18rem" }}>
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
                <section className="faq-section container my-5">
                    <h1 className="text-center mb-4">FAQs</h1>
                    <hr className="mx-auto" style={{ width: "50px", height: "2px", backgroundColor: "black" }} />
                    <div className="accordion accordion-flush" id="accordionFlushExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingOne">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                    - What is the Animoxkart Pet Finder Tag?
                                </button>
                            </h2>
                            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">The Pet Finder Tag is a smart tag with a QR code that helps locate your pet. When scanned, it displays your pet's details and your contact information. It also provides instant chat, GPS location, and alerts if someone scans the tag.</div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                    - How does the Tag QR code work?
                                </button>
                            </h2>
                            <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">When someone scans the QR code on your pet's tag, they'll see your pet's profile and your contact details. You’ll receive an alert and location, and you can chat instantly with the person who found your pet. or manually search using the URL link associated with your individual tag.</div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingThree">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                    - Is my personal information safe?
                                </button>
                            </h2>
                            <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">Yes, your personal information is secure. Only the details you choose to share will be visible to the person who scans the tag.</div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingFour">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                                    - Is there a subscription fee?
                                </button>
                            </h2>
                            <div id="flush-collapseFour" className="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">There are no subscription fees. You only pay for the tag.</div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingFour1">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour1" aria-expanded="false" aria-controls="flush-collapseFour1">
                                    - How long will a furtag work?
                                </button>
                            </h2>
                            <div id="flush-collapseFour1" className="accordion-collapse collapse" aria-labelledby="flush-headingFour1" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">One finder tag for each pet profile, think of it like QR Based Aadhar for your pet. Also, you can have as many pet profiles as you’d like linked to one or multiple parent account with no subscription.</div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingFour2">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour2" aria-expanded="false" aria-controls="flush-collapseFour2">
                                    - Does it work with multiple pets?
                                </button>
                            </h2>
                            <div id="flush-collapseFour2" className="accordion-collapse collapse" aria-labelledby="flush-headingFour2" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">One finder tag for each pet profile, think of it like QR Based Aadhar for your pet. Also, you can have as many pet profiles as you’d like linked to one or multiple parent account with no subscription.</div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingFive">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                                    - Do I need an app to use the Pet Finder Tag?
                                </button>
                            </h2>
                            <div id="flush-collapseFive" className="accordion-collapse collapse" aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">No, you don’t need to download any app. The QR code works with any smartphone browser.</div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingSix">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
                                    - How accurate is the GPS location?
                                </button>
                            </h2>
                            <div id="flush-collapseSix" className="accordion-collapse collapse" aria-labelledby="flush-headingSix" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">The GPS location is based on the phone's location that scans the QR code. It provides an approximate location of your pet.</div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingSeven">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSeven" aria-expanded="false" aria-controls="flush-collapseSeven">
                                    - What happens if someone finds my pet?
                                </button>
                            </h2>
                            <div id="flush-collapseSeven" className="accordion-collapse collapse" aria-labelledby="flush-headingSeven" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">If someone finds your pet and scans the tag, you will receive an instant alert along with the location. You can then chat directly with the finder to arrange the return of your pet.</div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingEight">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseEight" aria-expanded="false" aria-controls="flush-collapseEight">
                                    - Can I update my pet's or parent information?
                                </button>
                            </h2>
                            <div id="flush-collapseEight" className="accordion-collapse collapse" aria-labelledby="flush-headingEight" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">Yes, you can easily update your pet's profile and your contact details through your Animoxkart account.</div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingNine">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseNine" aria-expanded="false" aria-controls="flush-collapseNine">
                                    - How durable is the Pet Finder Tag?
                                </button>
                            </h2>
                            <div id="flush-collapseNine" className="accordion-collapse collapse" aria-labelledby="flush-headingNine" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">The tag is water-resistant and made of durable materials to withstand rough use.</div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingTen">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTen" aria-expanded="false" aria-controls="flush-collapseTen">
                                    - Where can I buy the Animoxkart Pet Finder Tag?
                                </button>
                            </h2>
                            <div id="flush-collapseTen" className="accordion-collapse collapse" aria-labelledby="flush-headingTen" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">You can purchase the Pet Finder Tag directly from our website or at selected pet stores.</div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingEleven">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseEleven" aria-expanded="false" aria-controls="flush-collapseEleven">
                                    - What can I do if the tag breaks?
                                </button>
                            </h2>
                            <div id="flush-collapseEleven" className="accordion-collapse collapse" aria-labelledby="flush-headingEleven" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">The Pet Finder Tags are made form a solid plastic and should be extremely durable and weatherproof. If you have any concerns about your tag, please contact us and a member of the team will be happy to help.</div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default FinderTagIntro;
