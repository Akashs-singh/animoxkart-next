'use client'
import React, { useState, useEffect } from "react";
import axios from 'axios';
function FinderForm({ tag }) {
    // Step 1: Create state to hold form data and initialize it with `tag` values

    const [formData, setFormData] = useState({
        email: tag && tag.email ? tag.email : "",
        dob: tag && tag.dob ? tag.dob : "",
        pet_name: tag && tag.pet_name ? tag.pet_name : "",
        pet_type: tag && tag.pet_type ? tag.pet_type : "",
        gender: tag && tag.gender ? tag.gender : "",
        owner_name: tag && tag.owner_name ? tag.owner_name : "",
        contact_no: tag && tag.contact_no ? tag.contact_no : "",
        whatsapp_no: tag && tag.whatsapp_no ? tag.whatsapp_no : "",
        alert_on: tag && tag.alert_on ? tag.alert_on : false,
        show_contact: tag && tag.show_contact ? tag.show_contact : false,
        show_whatsapp: tag && tag.show_whatsapp ? tag.show_whatsapp : false,
        show_email: tag && tag.show_email ? tag.show_email : false,
    });

    // Step 2: Handle form input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };
    const formatDateForInput = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); 
        const day = ('0' + date.getDate()).slice(-2);

        return `${year}-${month}-${day}`;
    }
    // Step 3: Handle form submission (optional, you can send the data to a server or use it locally)
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const updatedFormData = {
            ...formData,
            image: null,
            health: {},
            food: {},
        };
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL_NEW}`+'/update-tag/'+tag.tag_id, updatedFormData,{
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('token')
                },
            });

            if (response.status === 200) {
                this.props.history.push('/pet-finder-tag');
            } else {
                console.error('Failed to submit data');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    useEffect(() => {
        // If `tag` changes, update the form data (useful when editing an existing tag)
        if (tag) {
            let dob = formatDateForInput(tag.dob)
            setFormData({
                email: tag && tag.email ? tag.email : "",
                dob: tag && tag.dob ? dob : "",
                pet_name: tag && tag.pet_name ? tag.pet_name : "",
                pet_type: tag && tag.pet_type ? tag.pet_type : "",
                gender: tag && tag.gender ? tag.gender : "",
                owner_name: tag && tag.owner_name ? tag.owner_name : "",
                contact_no: tag && tag.contact_no ? tag.contact_no : "",
                whatsapp_no: tag && tag.whatsapp_no ? tag.whatsapp_no : "",
                alert_on: tag && tag.alert_on ? tag.alert_on : false,
                show_contact: tag && tag.show_contact ? tag.show_contact : false,
                show_whatsapp: tag && tag.show_whatsapp ? tag.show_whatsapp : false,
                show_email: tag && tag.show_email ? tag.show_email : false,
            });
        }
    }, [tag]); // Re-run the effect when `tag` prop changes

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            {/* Form */}
            <form onSubmit={handleSubmit}>
                <h3>Pet Details</h3>
                <div className="row">
                    <div className="form-group col-md-3">
                        <label htmlFor="pet_name">Pet Name:</label>
                        <input
                            type="text"
                            id="pet_name"
                            name="pet_name"
                            value={formData.pet_name}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="pet_type">Pet Type:</label>
                        <select
                            type="dropdown"
                            id="pet_type"
                            name="pet_type"
                            value={formData.pet_type}
                            onChange={handleChange}
                            required
                            className="form-control"
                        >
                            {formData.pet_type != "" ? <option value={formData.pet_type} selected>{formData.pet_type}</option>
                                : <option value="">Select</option>
                            }
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="gender">Pet Gender:</label>
                        <select
                            type="dropdown"
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                            className="form-control"
                        >
                           {formData.pet_type != "" ? <option value={formData.gender} selected>{formData.gender}</option>
                                : <option value="">Select</option>
                            }
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div className="form-group col-md-3">
                        <label className="form-label" htmlFor="dob">Pet Date-of-Birth:</label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                </div>

                <h3>Owner Details</h3>
                <div className="row">
                    <div className="form-group col-md-3">
                        <label className="form-label" htmlFor="owner_name">Owner name:</label>
                        <input
                            type="text"
                            id="owner_name"
                            name="owner_name"
                            value={formData.owner_name}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>

                    <div className="form-group col-md-3">
                        <label className="form-label" htmlFor="contact_no">Contact no:</label>
                        <input
                            type="number"
                            id="contact_no"
                            name="contact_no"
                            value={formData.contact_no}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>

                    <div className="form-group col-md-3">
                        <label className="form-label" htmlFor="whatsapp_no">Whatsapp no:</label>
                        <input
                            type="number"
                            id="whatsapp_no"
                            name="whatsapp_no"
                            value={formData.whatsapp_no}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>

                    <div className="form-group col-md-3">
                        <label className="form-label" htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                </div>

                {/* Security */}
                <div className="row">
                    <div className="form-group col-md-3">
                        <label className="form-label" htmlFor="alert_on">Turn on Lost Alert:</label>
                        <input
                            className="m-2"
                            type="checkbox"
                            id="alert_on"
                            name="alert_on"
                            checked={formData.alert_on}
                            onChange={handleChange}
                        />
                        <p>Check if your pet is lost; this will activate the alert system. You can update later if needed.</p>
                    </div>
                    <div className="form-group col-md-3">
                        <label className="form-label" htmlFor="show_contact">Show Contact:</label>
                        <input
                            className="m-2"
                            type="checkbox"
                            id="show_contact"
                            name="show_contact"
                            checked={formData.show_contact}
                            onChange={handleChange}
                        />
                        <p>Check if you want to display your contact information when your pet is lost, so people can reach you.</p>
                    </div>
                    <div className="form-group col-md-3">
                        <label className="form-label" htmlFor="show_whatsapp">Show Whatsapp:</label>
                        <input
                            className="m-2"
                            type="checkbox"
                            id="show_whatsapp"
                            name="show_whatsapp"
                            checked={formData.show_whatsapp}
                            onChange={handleChange}
                        />
                        <p>Check if you want to display your whatsapp information when your pet is lost, so people can reach you.</p>
                    </div>
                    <div className="form-group col-md-3">
                        <label className="form-label" htmlFor="show_email">Show Email:</label>
                        <input
                            className="m-2"
                            type="checkbox"
                            id="show_email"
                            name="show_email"
                            checked={formData.show_email}
                            onChange={handleChange}
                        />
                        <p>Check if you want to display your email information when your pet is lost, so people can reach you.</p>
                    </div>
                </div>

                {/* Form submission button */}
                <button type="submit" className="m-2 btn btn-outline">Submit</button>
            </form>
        </div>
    );
}

export default FinderForm;
