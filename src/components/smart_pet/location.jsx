'use client'
import React, { Component } from "react";
import "./css/pet-finder.css";
class SaveLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOverlayVisible: false,
            locations: props.data.locations || [],
            location: props.data.locations ? this.findLatestLocation(props.data.locations) : null,
            googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        };

    }
    componentDidUpdate(prevProps) {
        if (prevProps.data.locations !== this.props.data.locations) {
            this.setState({
                locations: this.props.data.locations || [],
                location: this.props.data.locations ? this.findLatestLocation(this.props.data.locations) : null,
            });
        }
    }
    setLocation = (location) => {
        this.setState({
            location: location
        })
        this.closeOverlay();
    }
    findLatestLocation = (locations) => {
        if (!Array.isArray(locations) || locations.length === 0) {
            return null; // Return null if the input is not a valid array or is empty
        }

        // Find the location with the most recent `added_at` timestamp
        const latestLocation = locations.reduce((latest, current) => {
            const latestDate = new Date(latest.timestamp);
            const currentDate = new Date(current.timestamp);

            return currentDate > latestDate ? current : latest;
        });

        return latestLocation;
    }

    calculateDate = (date) => {
        const today = new Date(); // Get today's date
        const birthDateObj = new Date(date); // Convert the input to a Date object

        if (isNaN(birthDateObj)) {
            return "Invalid date"; // Handle invalid date input
        }

        // Calculate the difference in time
        const timeDiff = today - birthDateObj;

        // Calculate time difference in seconds
        const seconds = Math.floor(timeDiff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = today.getMonth() - birthDateObj.getMonth() + (12 * (today.getFullYear() - birthDateObj.getFullYear()));
        const years = Math.floor(months / 12);

        // Handle seconds
        if (seconds < 60) {
            return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
        }

        // Handle minutes
        if (minutes < 60) {
            return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
        }

        // Handle hours
        if (hours < 24) {
            return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
        }

        // Handle days
        if (days < 30) {
            return days === 1 ? "1 day ago" : `${days} days ago`;
        }

        // Handle months
        if (months < 12) {
            return months === 1 ? "1 month ago" : `${months} months ago`;
        }

        // Handle years
        return years === 1 ? "1 year ago" : `${years} years ago`;
    };

    decimalToDMS = (decimalDegree, isLatitude) => {
        const degrees = Math.floor(decimalDegree); // Integer part is the degrees
        const fractionalPart = Math.abs(decimalDegree - degrees); // Fractional part for minutes
        const minutes = Math.floor(fractionalPart * 60); // Integer part is the minutes
        const seconds = Math.round((fractionalPart * 60 - minutes) * 60 * 10) / 10; // Remaining fraction is seconds, rounded to 1 decimal place

        // Determine the direction (N/S for latitude, E/W for longitude)
        let direction;
        if (isLatitude) {
            direction = decimalDegree >= 0 ? 'N' : 'S';
        } else {
            direction = decimalDegree >= 0 ? 'E' : 'W';
        }

        // Format the result
        return `${Math.abs(degrees)}°${minutes}'${seconds}"${direction}`;
    }
    formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString("en-GB").replace(/\//g, "-"); // "DD-MM-YYYY"
        const formattedTime = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }); // "HH:MM AM/PM"
    
        return `${formattedDate} ${formattedTime}`;
    };
    

    // Close the overlay
    closeOverlay = () => {
        this.setState({ isOverlayVisible: false });
    };
    openOverlay = () => {
        this.setState({ isOverlayVisible: true });
    };
    // Handle clicking outside the history box to close overlay
    handleOverlayClick = (e) => {
        if (e.target.className === 'history-overlay') {
            this.closeOverlay();
        }
    };


    render() {
        const { locations, googleMapsApiKey, location, isOverlayVisible } = this.state;
        const { data } = this.props;
        const defaultCenter = location ? { lat: location.latitude, lng: location.longitude } : { lat: 0, lng: 0 };
        return (
            <div className="location">
                {/* <div className="history-overlay">
                        <div className="history-box">
                            <h3 className="history-title">Locations History</h3>
                            {locations.length > 0 ? locations.map((location, index) => (
                                <button key={index} className="location-item">
                                    <div className="loc">
                                        <p className="history-message">
                                            <b>{this.formatTimestamp(location.timestamp)}</b>
                                        </p>
                                        <p className="history-message">
                                            {this.decimalToDMS(defaultCenter.lat, true)} & {this.decimalToDMS(defaultCenter.lng, false)}</p>


                                    </div>
                                    <div className="loc-image">
                                        <img className="loc-image-map" src={`/assets/images/icon/map.png`} alt="map" />
                                    </div>

                                </button>
                            )) : ""}
                        </div>
                    </div> */}
                {isOverlayVisible && (
                    <div className="history-overlay" onClick={this.handleOverlayClick}>
                        <div className="history-box">
                            <h3 className="history-title">Locations History</h3>
                            <button className="close-button" onClick={this.closeOverlay}>
                                &times; {/* Close button */}
                            </button>
                            {locations.length > 0 ? locations.map((location, index) => (
                                <button onClick={() => this.setLocation(location)} key={index} className="location-item">
                                    <div className="loc">
                                        <p className="history-message">
                                            <b>{this.formatTimestamp(location.timestamp)}</b>
                                        </p>
                                        <p className="history-message">
                                            {this.decimalToDMS(location.latitude, true)} & {this.decimalToDMS(location.longitude, false)}
                                        </p>
                                    </div>
                                    <div className="loc-image">
                                        <img className="loc-image-map" src={`/assets/images/icon/map.png`} alt="map" />
                                    </div>
                                </button>
                            )) : ""}
                        </div>
                    </div>
                )}
                <div className="first-section">
                    {
                        locations.length > 0 ? (
                            <h2>{data.pet_name}'s location has been shared with you.</h2>
                        ) : (
                            <h2>{data.pet_name}'s location has not been shared yet.</h2>
                        )
                    }
                </div>
                <div className="history-section">
                    <div>
                        {
                            locations.length > 0 ? (
                                <button className="" onClick={this.openOverlay}><i className="fa-solid fa-map-location-dot"></i> History</button>
                            ) : (
                                <></>
                            )
                        }

                        <button onClick={this.props.onBackClick}> <i className="fa-solid fa-circle-arrow-left"></i> Back</button>
                    </div>
                </div>
                <div className="second-section">
                    {location ?
                        <div>
                            <div className="location-detail">
                                <p>{data.pet_name} was found {this.calculateDate(location.timestamp)}, at this GPS location:</p>
                                <p>{this.decimalToDMS(defaultCenter.lat, true)} & {this.decimalToDMS(defaultCenter.lng, false)}</p>
                            </div>
                            <div className="map">
                                <iframe
                                    width="100%"
                                    height="500"
                                    frameBorder="0" style={{ border: 0 }}
                                    referrerPolicy="no-referrer-when-downgrade"
                                    src={`https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${defaultCenter.lat},${defaultCenter.lng}`}
                                    allowFullScreen>
                                </iframe>
                            </div>
                        </div> :
                        <div className="no-location">
                            <p>No location shared yet.</p>
                        </div>

                    }
                </div>
            </div>

        );
    }
}

export default SaveLocation;
