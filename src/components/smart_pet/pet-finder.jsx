'use client'
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { BlinkBlur } from 'react-loading-indicators'
import { isLoggedin, getContactIdFromJWT } from '../common/utils/index';
import FinderTagIntro from './finder-tag-intro';
import './css/pet-finder.css'

// Dynamically import Pace to avoid SSR issues
const Pace = dynamic(() => import('react-pace-progress'), { ssr: false });

class PetFinder extends Component {

    constructor(props) {
        super(props)
        isLoggedin('pet-finder-tag/', true);

        this.state = {
            tags: [],
            loading: true,
        }
    }

    componentDidMount() {
        const contact_id = getContactIdFromJWT();
        if (contact_id) {
            this.load(contact_id);
        }
    }
    getTags = async (contact_id) => {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL_NEW + '/tags-by-contact/' + contact_id, {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + Cookies.get('token'),
            }
        });
        if (response.data != null) {
            this.setState({
                tags: response.data.tags,
            })
        }
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
    
    capitalizeFirstLetter = (str) => {
        if (str.length === 0) return str; // Handle empty string case
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    load = async (contact_id) => {
        try {
            // Wait for getTags to complete before proceeding
            await this.getTags(contact_id);
        } catch (error) {
            console.error("Error loading tags:", error);
        } finally {
            this.setState({ loading: false });
        }
    };

    render() {


        return (
            <div>
                {/* <Breadcrumb title={'Pet Finder'}/> */}


                {/*Collection section*/}
                <section className="collection section-b-space">
                    {/* <FinderTagIntro /> */}
                    <div className="container">
                        {this.state.loading ?
                            <div className="loading-indicator"><BlinkBlur color="#427fc1" size="small" text="loading" textColor="#020202" /></div> :
                            <div className="row partition-collection">
                                {this.state.tags.length > 0 ?
                                    this.state.tags.map((details, index) =>
                                        <div key={index} className="col-lg-3 col-md-6 finder-tag-box">
                                            <div className="collection-block finder-tag-box-area" >
                                                {details.image ? <img src={`https://animoxkart-users.s3.ap-south-1.amazonaws.com/pets/${details.image}`} className="img-fluid" alt="" style={{ maxHeight: 250, maxWidth: 250 }} /> : <img src={`/assets/images/pets/smart-pet/${details.pet_type.toLowerCase()}.png`} className="img-fluid" alt="pet" />}
                                                <div className="collection-content">

                                                    <h3>{details.pet_name}<span style={{ fontSize: "10px" }}> {details.pet_type}</span></h3>
                                                    <p>{this.capitalizeFirstLetter(details.gender)}, Age: {this.calculateAge(details.dob)}</p>

                                                    {/* <a href={`pet-finder-tag/update/${details.tag_id}`} className="m-2 btn btn-outline">Edit</a> */}
                                                </div>

                                                <a href={`pet-finder-tag/view/${details.tag_id}`}><div className="full-width-button">
                                                    View &nbsp;<i className="fa-solid fa-eye"></i>
                                                </div></a>
                                            </div>
                                        </div>
                                    ) :
                                    <div className="col-sm-12 empty-cart-cls text-center">
                                        <img src={`/assets/images/empty-search.jpg`} className="img-fluid mb-4" alt="" />
                                        <h3><strong>No Finder Tag Found</strong></h3>
                                        <h4>Register the finder tag. Scan the locket QR code, and register your pet.</h4>
                                    </div>
                                }

                            </div>
                        }

                    </div>
                </section>

            </div>
        )
    }
}

export default PetFinder