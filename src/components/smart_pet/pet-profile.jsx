
'use client'
import React, { Component } from "react";
import "./css/pet-finder.css";
import { ChatProvider } from './chat/contexts/ChatContext.js';
import ChatBox from "./chat/chatBox.jsx";

class PetProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showChat: false,
        };
    }
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
        const yearString = years > 0 ? `${years} year${years > 1 ? 's' : ''}` : '';
        const monthString = months > 0 ? `${months} month${months > 1 ? 's' : ''}` : '';

        return `${yearString} ${monthString}`.trim() || "0 month";
    };
    capitalizeAndReplace = (str) => {
        return str
            .replace(/_/g, ' ')                  // Replace underscores with spaces
            .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letter of each word
    };
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
                            <h2>{data.pet_name || "My Pet"}</h2>
                            <p>{`${data.breed || "Breed"} · ${this.calculateAge(data.dob)}`}</p>
                        </div>
                    </div>
                </div>
                <div className="section-2-area">
                    <div className="edit-section"><h3>About {data.pet_name || "the pet"}</h3> <a href={`pet-finder-tag/update/${data.tag_id}`}><i className="fa-solid fa-pen-to-square"></i></a></div>
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
                        <p>View your {data.pet_name || "the Pet"}'s location</p><button className="location-button btn" onClick={this.props.onLocationClick}>View &nbsp; <i className="fa-solid fa-location-dot"></i></button>
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
                        <h3><i className="fa-solid fa-users"></i> Family's</h3>
                        <button className="btn" onClick={this.openChat} >
                            <img className="contact-icon" src={`/assets/images/icon/message.png`} alt="message" />
                        </button>
                    </div>
                    <div className="family-area">
                        {
                            data.owners ? data.owners.map((family, index) => (
                                <div key={index} className="family-member">
                                    <h4>{family.owner_name}</h4>
                                    <h5>Phone</h5>
                                    {
                                        family.show_contact && <p>+91 {family.contact_no} </p>
                                    }
                                    {
                                         family.show_whatsapp && <p>+91 {family.whatsapp_no} </p>
                                    }
                                    <h5>Address</h5>
                                    {
                                        <><p>
                                            {family.address.area}, {family.address.city} </p>
                                            <p> {family.address.state}, {family.address.country}, {family.address.pincode}
                                            </p></>

                                        }

                                    {/* <h5>Quick Links</h5>
                                    <div className="quick-links">
                                        {family.show_contact ? <a href={`tel:+91${family.contact_no}`} >
                                            <img className="contact-icon" src={`/assets/images/icon/telephone.png`} alt="telephone" />
                                        </a> : ''}
                                        {family.show_whatsapp ? <a
                                            href={`https://wa.me/+91${family.whatsapp_no}?text=Hello%20I%20found%20your%20${encodeURIComponent(data.pet_type)}%20${encodeURIComponent(data.pet_name)}`}
                                            className="contact-icon"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img className="contact-icon" src={`/assets/images/icon/whatsapp.png`} alt="whatsapp" />
                                        </a> : ''}
                                    </div> */}
                                </div>
                            )) : ''
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default PetProfile;
