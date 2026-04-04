'use client'
import React, { Component } from "react";
import "./css/pet-finder.css";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { ChatProvider } from './chat/contexts/ChatContext.js';
import ChatBox from "./chat/chatBox.jsx";

class FinderTagView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showShareLocationButton: true,
            showAlert: false,
            shareWhatsappUrl: "",
            showChat: false,
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
    calculateAge = (birthDate) => {
        const today = new Date(); // Get today's date
        const birthDateObj = new Date(birthDate); // Convert the ISO 8601 string to a Date object

        if (isNaN(birthDateObj)) {
            return "Invalid date"; // Handle invalid date input
        }

        let years = today.getFullYear() - birthDateObj.getFullYear(); // Calculate years
        let months = today.getMonth() - birthDateObj.getMonth(); // Calculate months

        // Adjust if the birthday hasn't occurred yet this year
        if (months < 0 || (months === 0 && today.getDate() < birthDateObj.getDate())) {
            years--;
            months += 12;
        }

        // Adjust the month calculation if today’s date is earlier in the month than the birth date
        if (today.getDate() < birthDateObj.getDate()) {
            months--;
        }

        // Ensure months are within 0-11 range
        months = (months + 12) % 12;

        // Build the output string
        const yearString = years > 0 ? `${years} yr${years > 1 ? 's' : ''}` : '';
        const monthString = months > 0 ? `${months} month${months > 1 ? 's' : ''}` : '';

        return `${yearString} ${monthString}`.trim() || "0 month";
    };
    capitalizeAndReplace = (str) => {
        return str
            .replace(/_/g, ' ')                  // Replace underscores with spaces
            .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letter of each word
    };
    shareCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const currentTime = new Date().toISOString();
                    const newLocation = {
                        "location": {
                            latitude: parseFloat(latitude.toFixed(6)),
                            longitude: parseFloat(longitude.toFixed(6)),
                            timestamp: currentTime,
                        }
                    };

                    this.saveLocation(newLocation);
                },
                (error) => {
                    alert("Unable to retrieve location. Please enable location services.");
                }
            );
        }
    };
    shareCurrentLocationWhatsapp = (whatsapp_no, pet_type, pet_name) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
                    const message = `Hello, I found your ${encodeURIComponent(pet_type)} ${encodeURIComponent(pet_name)} at this location: ${locationUrl}`;
                    const whatsappUrl = `https://wa.me/91${whatsapp_no}?text=${encodeURIComponent(message)}`;

                    window.open(whatsappUrl, "_blank");
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    alert("Unable to retrieve location. Please enable location services.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };


    saveLocation = async (newLocation) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL_NEW}/tags/${this.props.data.tag_id}/save-location`, newLocation, {
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                },
            });

            if (response.status === 200) {
                this.notify();
            } else {
                console.error('Failed to submit data');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    }
    openChat = () => {
        this.setState({
            showChat: true
        })
    };
    closeChat = () => {
        this.setState({
            showChat: false
        })
    };


    render() {
        const { data } = this.props;
        return (
            <div className="pet-profile">
                {this.state.showChat?
                <ChatProvider tag_id={data.tag_id}>
                    <ChatBox  pet_name={data.pet_name} onClose={this.closeChat} />
                </ChatProvider>:<></>
                }
                <div className="pet-profile-header">
                    <div className="image-section">
                        <img
                            src={data.image != null ? `https://animoxkart-users.s3.ap-south-1.amazonaws.com/pets/${data.image}` : `/assets/images/pets/smart-pet/${data.pet_type.toLowerCase()}.png`}
                            // src={data.image || "default-dog-image.jpg"} // Use data.image or fallback to a default image
                            alt={data.name || "Pet"}
                            className="dog-image"
                        />
                    </div>
                    <div className="profile-name-section">
                        <div className="name-section">
                            <h2>{data.pet_name || "my pet"}</h2>
                            <p>{`${data.breed || "Breed"} · ${this.calculateAge(data.dob)}`}</p>
                        </div>
                    </div>
                </div>
                <div className="section-2-area">
                    <h3>About {data.pet_name || "the pet"}</h3>
                    <div className="about-section">
                        <div className="stats">
                            <div className="stat">
                                <p>Weight</p>
                                <h4>{data.weight || "N/A"} kg</h4>
                            </div>
                            <div className="stat">
                                <p>Gender</p>
                                <h4>{data.gender || "N/A"}</h4>
                            </div>
                            <div className="stat">
                                <p>Colour</p>
                                <h4>{data.colour || "N/A"}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="location-section">
                        {this.state.showShareLocationButton ? <><p>Share your location to pet owner</p><button className="location-button btn" onClick={this.shareCurrentLocation}>  <i className="fa-solid fa-map-location-dot"></i>&nbsp; Share </button></> : ''}


                    </div>
                    <div className="behaviour-section">
                        <h3><i className="fa-solid fa-paw"></i> Behaviour</h3>
                        <div className="capsule-area">
                            {
                                data.behaviour ? data.behaviour.map((behaviour, index) => (
                                    <span key={index} className="capsule">{this.capitalizeAndReplace(behaviour)}</span>
                                )) : ''
                            }
                        </div>
                    </div>
                    <div className="health-section">
                        <h3><i className="fa-solid fa-heart"></i> Health</h3>
                        <div className="capsule-area">
                            {
                                data.health ? data.health.map((health, index) => (
                                    <span key={index} className="capsule">{this.capitalizeAndReplace(health)}</span>
                                )) : ''
                            }
                        </div>
                    </div>
                    <div className="food-section">
                        <h3><i className="fa-solid fa-bone"></i> Food</h3>
                        <div className="capsule-area">
                            {
                                data.food ? data.food.map((food, index) => (
                                    <span key={index} className="capsule">{this.capitalizeAndReplace(food)}</span>
                                )) : ''
                            }
                        </div>
                    </div>
                </div>

                <div className="family-section">
                    <div className="family-section-header" >
                    {data.alert_on ?
                        <h3><i className="fa-solid fa-users"></i> Family's</h3> : <h3><i className="fa-solid fa-shield-halved"></i> Chat with pet parent's</h3>}
                    
                        <button className="btn" onClick={this.openChat}>
                            <img className="contact-icon" src={`/assets/images/icon/message.png`} alt="message" />
                        </button>
                    </div>
                    <div className="family-area">
                        {data.alert_on ?
                            data.owners ? data.owners.map((family, index) => (
                                <div key={index} className="family-member">
                                    <h4>{family.owner_name}</h4>
                                    {family.show_contact || family.show_whatsapp ? <h5>Phone</h5> : ''}
                                    {
                                        family.show_contact && <p>+91 {family.contact_no} </p>
                                    }
                                    {
                                        family.show_whatsapp && <p>+91 {family.whatsapp_no} </p>
                                    }
                                    {family.show_address ? <h5>Address</h5> : ''}
                                    {family.show_address == 1 ?
                                        <><p>
                                            {family.address.area}, {family.address.city} </p>
                                            <p> {family.address.state}, {family.address.country}, {family.address.pincode}
                                            </p></>

                                        : ""}

                                    {family.show_contact || family.show_whatsapp ? <h5>Quick Links</h5> : ''}
                                    <div className="quick-links">
                                        {family.show_contact ? <a href={`tel:+91${family.contact_no}`} >
                                            <img className="contact-icon" src={`/assets/images/icon/telephone.png`} alt="telephone" />
                                        </a> : ''}
                                        {family.show_whatsapp ? <a
                                            href={`https://wa.me/+91${family.whatsapp_no}?text=Hello,%20I%20found%20your%20${encodeURIComponent(data.pet_type)}%20${encodeURIComponent(data.pet_name)}`}
                                            className="contact-icon"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img className="contact-icon" src={`/assets/images/icon/whatsapp.png`} alt="whatsapp" />
                                        </a> : ''}
                                        {family.show_whatsapp ? <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault(); // Prevent default anchor action
                                                this.shareCurrentLocationWhatsapp(family.whatsapp_no, data.pet_type, data.pet_name);
                                            }}
                                            className="contact-icon"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img className="contact-icon" src={`/assets/images/icon/share-location.png`} alt="share whatsapp" />
                                        </a> : ''}
                                    </div>
                                </div>
                            )) : '' : ''
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default FinderTagView;
