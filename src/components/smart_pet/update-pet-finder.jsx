'use client'
import React, { Component } from 'react';
import Breadcrumb from "../common/breadcrumb";
import CustomAlert from '../common/alert/custom';
import Cookies from 'js-cookie';
import axios from 'axios';
import Select from "react-select";
import { BlinkBlur } from 'react-loading-indicators';
import { isLoggedin, getContactIdFromJWT } from '../common/utils/index';
import './css/pet-finder.css';
class UpdatePetFinder extends Component {
  constructor(props) {
    super(props);

    const { params } = this.props;
    const { tag_id } = params;
    isLoggedin('pet-finder-tag/update/' + tag_id, true);
    const data = {
      "tag_id": tag_id
    };

    this._isMounted = false;

    this.state = {
      tag: {},
      tag_id: tag_id,
      contact_id: getContactIdFromJWT(),
      formData: {
        dob: "",
        pet_name: "",
        pet_type: "",
        gender: "",
        image: null,
        breed: "",
        weight: "",
        color: "",
        behaviour: [],
        health: [],
        diseases: [],
        food: [],
        remove_owners: [],
        owners: [{
          owner_id: "",
          owner_name: "",
          contact_no: "",
          whatsapp_no: "",
          email: "",
          address: {
            area: "",
            city: "",
            state: "",
            country: "India",  // Default to India
            pincode: ""
          },
          show_contact: true,
          show_whatsapp: true,
          show_email: false,
          show_address: true
        }],
        alert_on: false,
      },
      remove_owners: [],
      isPreviewVisible: true,
      states: [
        "Andhra Pradesh", "Andaman and Nicobar Islands", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Chandigarh", "Delhi", "Dadra and Nagar Haveli", "Daman and Diu", "Goa", "Gujarat",
        "Haryana", "Himachal Pradesh", "Jharkhand", "Jammu and Kashmir", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
        "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Other", "Puducherry", "Punjab", "Rajasthan",
        "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
      ],
      petBreeds: {
        dog: [
          "Other", "Alaskan Malamute", "Bernese Mountain Dog", "Boxer", "Doberman Pinscher", "Great Dane", "Mastiff",
          "Rottweiler", "Saint Bernard", "Siberian Husky", "Labrador Retriever", "Golden Retriever", "Cocker Spaniel",
          "English Springer Spaniel", "Weimaraner", "Brittany Spaniel", "Irish Setter", "Newfoundland",
          "Australian Shepherd", "Border Collie", "Collie", "German Shepherd", "Shetland Sheepdog",
          "Pembroke Welsh Corgi", "Old English Sheepdog", "Beagle", "Basset Hound", "Bloodhound", "Greyhound", "Whippet",
          "Chihuahua", "Pomeranian", "Shih Tzu", "Pekingese", "Yorkshire Terrier", "Maltese", "Papillon", "Toy Poodle",
          "Bulldog", "Dalmatian", "Poodle", "French Bulldog", "Shiba Inu", "Bichon Frisé", "Boston Terrier",
          "Bull Terrier", "Jack Russell Terrier", "Scottish Terrier", "West Highland White Terrier (Westie)", "Cairn Terrier",
          "Airedale Terrier", "Schnauzer", "Dogo Argentino", "Belgian Laekenois", "Portuguese Water Dog", "American Bully",
          "Australian Cattle Dog", "Basenji", "Chinese Crested", "Rhodesian Ridgeback"
        ],
        cat: [
          "Persian", "Maine Coon", "Siamese", "Bengal", "Sphynx", "Ragdoll", "Abyssinian", "British Shorthair",
          "Scottish Fold", "Russian Blue", "Exotic Shorthair", "Burmese", "Birman", "Oriental Shorthair", "Manx"
        ]
      },
      suggestedBehaviours: [
        { value: "friendly", label: "Friendly" },
        { value: "aggressive", label: "Aggressive" },
        { value: "playful", label: "Playful" },
        { value: "calm", label: "Calm" },
        { value: "energetic", label: "Energetic" },
        { value: "curious", label: "Curious" },
        { value: "loyal", label: "Loyal" },
        { value: "protective", label: "Protective" },
        { value: "shy", label: "Shy" },
        { value: "independent", label: "Independent" }
      ],
      suggestedFoods: [
        { value: "home_food", label: "Home Food" },
        { value: "veg", label: "Veg" },
        { value: "non_veg", label: "Non-veg" },
        { value: "pedigree", label: "Pedigree" },
        { value: "royal_canin", label: "Royal Canin" },
        { value: "hills_science_diet", label: "Hill's Science Diet" },
        { value: "blue_buffalo", label: "Blue Buffalo" },
        { value: "purina_pro_plan", label: "Purina Pro Plan" },
        { value: "iams", label: "Iams" },
        { value: "orijen", label: "Orijen" },
        { value: "acana", label: "Acana" },
        { value: "wellness_core", label: "Wellness Core" },
        { value: "nutro", label: "Nutro" },
        { value: "whiskas", label: "Whiskas" },
        { value: "merrick", label: "Merrick" }
      ],
      suggestedHealths: [
        { value: "good_health", label: "Good Health" },
        { value: "joint_issues", label: "Joint Issues" },
        { value: "skin_issues", label: "Skin Issues" },
        { value: "digestive_issues", label: "Digestive Issues" },
        { value: "respiratory_issues", label: "Respiratory Issues" },
        { value: "other_issues", label: "Other Issues" }
      ],
      suggestedDiseases: [
        { value: "arthritis", label: "Arthritis" },
        { value: "hip_dysplasia", label: "Hip Dysplasia" },
        { value: "elbow_dysplasia", label: "Elbow Dysplasia" },
        { value: "allergies", label: "Allergies" },
        { value: "hot_spots", label: "Hot Spots" },
        { value: "fleas", label: "Fleas" },
        { value: "fungal_infections", label: "Fungal Infections" },
        { value: "ibd", label: "IBD" },
        { value: "gastroenteritis", label: "Gastroenteritis" },
        { value: "kennel_cough", label: "Kennel Cough" },
        { value: "bronchitis", label: "Bronchitis" },
        { value: "asthma", label: "Asthma" },
        { value: "feline_herpesvirus", label: "Feline Herpesvirus" },
        { value: "pneumonia", label: "Pneumonia" },
        { value: "obesity", label: "Obesity" },
        { value: "metabolic_syndrome", label: "Metabolic Syndrome" }
      ],
      showAlert: false,
      loading: true,
    }
    this.fileInputRef = React.createRef();

    this.getTags(data.tag_id);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // Fetch the tag data
  getTags = async (tag_id) => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_API_URL_NEW + '/tags/' + tag_id, {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Bearer ' + Cookies.get('token'),
        }
      });
      
      if (this._isMounted && response.data.status == true) {
        if ((response.data.tags !== null)) {
          this.setState({
            tag: response.data.tag,
          }, () => {
            this.setFormData(response.data.tag);
          });
        }
      }
    } catch (error) {
      console.error('Error fetching tag data:', error);
      if (this._isMounted) {
        this.setState({ loading: false });
      }
    }
  };

  // Set form data after fetching tag
  setFormData = (tag) => {
    const dob = this.formatDateForInput(tag.dob);
    this.setState({
      formData: {
        remove_owners: [],
        email: tag.email || "",
        dob: dob || "",
        pet_name: tag.pet_name || "",
        pet_type: tag.pet_type || "",
        gender: tag.gender || "",
        image: tag.image || null,
        breed: tag.breed || "",
        weight: tag.weight || "",
        color: tag.colour || "",
        behaviour: tag.behaviour || [],
        health: tag.health || [],
        diseases: tag.diseases || [],
        food: tag.food || [],
        owners: tag.owners || [],
        alert_on: tag.alert_on || false,
      },
      tempImage: tag.image || null,
      loading: false,
    });
    
  };

  // Format date for the input field
  formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  // Handle form input changes
  handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: type === "checkbox" ? checked : value,
      }
    }));
  };



  // Handle form input changes for all form fields, including owners
  handleChange = (e, ownerIndex = null) => {
    const { name, value, type, checked } = e.target;

    if (name === 'pet_type') {
      // If pet type is selected, update the breed list
      this.setState(prevState => ({
        formData: {
          ...prevState.formData,
          pet_type: value,
          breed: "", // Reset breed when pet type changes
        }
      }));
    } else if (ownerIndex !== null) {
      // Handle owner fields
      if (name in this.state.formData.owners[ownerIndex].address) {
        this.setState(prevState => {
          const updatedOwners = [...prevState.formData.owners];
          updatedOwners[ownerIndex].address[name] = value;
          return {
            formData: {
              ...prevState.formData,
              owners: updatedOwners,
            }
          };
        });
      } else {
        this.setState(prevState => {
          const updatedOwners = [...prevState.formData.owners];
          updatedOwners[ownerIndex][name] = type === "checkbox" ? checked : value;
          return {
            formData: {
              ...prevState.formData,
              owners: updatedOwners,
            }
          };
        });
      }
    } else {
      // Handle other fields
      this.setState(prevState => ({
        formData: {
          ...prevState.formData,
          [name]: type === "checkbox" ? checked : value,
        }
      }));
    }
  };

  // Handle file input change for image upload
  handleFileChange = (e) => {
    const { name, files } = e.target;
    this.setState((prevState) => ({
      formData: { ...prevState.formData, [name]: files[0] },
      isPreviewVisible: true,
    }));
  };

  // Add a new owner input
  addOwner = () => {
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        owners: [...prevState.formData.owners, {
          owner_id: "",
          owner_name: "",
          contact_no: "",
          whatsapp_no: "",
          email: "",
          address: {
            area: "",
            city: "",
            state: "",
            country: "India",  // Default to India
            pincode: ""
          },
          show_contact: true,
          show_whatsapp: true,
          show_email: false,
          show_address: true
        }]
      }
    }));
  };

  // Remove an owner input
  removeOwner = (index) => {
    if (this.state.formData.owners.length > 1) {
      if (this.state.formData.owners[index].owner_id !== undefined) {
        this.setState(prevState => {
          return {
            formData: {
              ...prevState.formData,
              remove_owners: [
                ...prevState.formData.remove_owners,
                this.state.formData.owners[index].owner_id
              ],
            }
          };
        });
      }
      this.setState(prevState => {
        const updatedOwners = prevState.formData.owners.filter((_, i) => i !== index);
        return {
          formData: {
            ...prevState.formData,
            owners: updatedOwners,
          }
        };
      });
    }
  };

  handleBehaviourSelect = (selectedOptions) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        behaviour: selectedOptions ? selectedOptions.map(option => option.value) : [] // Store only values
      }
    }));
  };

  handleFoodSelect = (selectedOptions) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        food: selectedOptions ? selectedOptions.map(option => option.value) : []
      }
    }));
  };

  handleHealthSelect = (selectedOptions) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        health: selectedOptions ? selectedOptions.map(option => option.value) : []
      }
    }));
  };

  handleDiseaseSelect = (selectedOptions) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        diseases: selectedOptions ? selectedOptions.map(option => option.value) : []
      }
    }));
  };

  // Toggle preview visibility and image clearing
  togglePreview = (e) => {
    e.preventDefault();
    if (this.state.isPreviewVisible) {
      this.clearImage(); // Clear image if preview is currently visible
    } else {
      this.setState({ isPreviewVisible: true }); // Show preview if it's not already visible
    }
  };

  // Clear the image and reset the preview visibility while preserving other form data
  clearImage = () => {
    if (this.fileInputRef.current) {
      this.fileInputRef.current.value = ''; // Reset file input field
    }
    this.setState(prevState => ({
      formData: {
        ...prevState.formData, // Spread the existing form data
        image: null, // Remove the selected image
      },
      isPreviewVisible: false, // Hide the preview
    }));
  };
  cancel =()=>{
    window.history.back(); 
  }

  handleHideAlert = () => {
    this.setState({ showAlert: false });
  };
  handleShowAlert = () => {
    this.setState({ showAlert: true });
  };

  // Handle form submission
  handleSubmit = async (e) => {
    e.preventDefault();
    const { formData } = this.state;

    // Create a new FormData object
    const updatedFormData = new FormData();

    // Append basic fields to the FormData object
    updatedFormData.append('tag_id', this.state.tag_id);
    updatedFormData.append('contact_id', this.state.contact_id);
    updatedFormData.append('dob', formData.dob);
    updatedFormData.append('pet_name', formData.pet_name);
    updatedFormData.append('pet_type', formData.pet_type);
    updatedFormData.append('gender', formData.gender);
    updatedFormData.append('breed', formData.breed);
    updatedFormData.append('weight', formData.weight);
    updatedFormData.append('color', formData.color);
    updatedFormData.append('alert_on', formData.alert_on ? 1 : 0); // Convert boolean to 1 or 0

    // Append arrays like behaviour, health, food, diseases to FormData (convert them to JSON strings)
    updatedFormData.append('behaviour', JSON.stringify(formData.behaviour));
    updatedFormData.append('health', JSON.stringify(formData.health));
    updatedFormData.append('diseases', JSON.stringify(formData.diseases));
    updatedFormData.append('food', JSON.stringify(formData.food));
    updatedFormData.append('remove_owners', JSON.stringify(formData.remove_owners));
    // Handle the 'image' field (ensure the file is attached)
    let image = document.getElementById('image');
    if (image.files.length > 0) {
      updatedFormData.append('image', image.files[0]);
    }

    // Handle 'owners' array - iterate and append each owner as a separate JSON string
    formData.owners.forEach((owner, index) => {
      updatedFormData.append(`owners[${index}][owner_id]`, owner.owner_id);
      updatedFormData.append(`owners[${index}][owner_name]`, owner.owner_name);
      updatedFormData.append(`owners[${index}][contact_no]`, owner.contact_no);
      updatedFormData.append(`owners[${index}][whatsapp_no]`, owner.whatsapp_no);
      updatedFormData.append(`owners[${index}][email]`, owner.email);
      // Check if owner.address is a plain object (excluding arrays)
      const address = owner.address;
      updatedFormData.append(`owners[${index}][address]`, JSON.stringify(address));
      updatedFormData.append(`owners[${index}][show_contact]`, owner.show_contact ? 1 : 0);  // Use 1 for true and 0 for false
      updatedFormData.append(`owners[${index}][show_whatsapp]`, owner.show_whatsapp ? 1 : 0);  // Same as above
      updatedFormData.append(`owners[${index}][show_email]`, owner.show_email ? 1 : 0);
      updatedFormData.append(`owners[${index}][show_address]`, owner.show_address ? 1 : 0);
    });

    // return;
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL_NEW}/update-tag/${this.state.tag.tag_id}`, updatedFormData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important to set this header when sending form data
          'Authorization': 'Bearer ' + Cookies.get('token'),
        },
      });

      if (response.status === 200) {
        this.handleShowAlert();
      } else {
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  render() {
    const { formData, petBreeds, states, suggestedBehaviours, suggestedFoods, suggestedHealths, suggestedDiseases, isPreviewVisible, showAlert } = this.state;
    const availableBreeds = petBreeds[formData.pet_type.toLowerCase()] || [];
    const customStyles = {
      control: (provided, state) => ({
        ...provided,
        borderRadius: "8px", // ✅ Change border-radius
        borderColor: state.isFocused ? "#C8DCF7" : "#C8DCF7",
        "&:hover": { borderColor: "#9EB1C6" },
        boxShadow: state.isFocused ? "0 0 5px #C8DCF7" : "none"
      }),
      multiValue: (provided) => ({
        ...provided,
        backgroundColor: "#C8DCF7", // ✅ Change background color of selected option
        color: "#447CC4",
        borderRadius: "8px", // ✅ Change border-radius of multi-selected option
        ":hover": {
          borderRadius: "8px"
        }
      }),
      multiValueLabel: (provided) => ({
        ...provided,
        color: "#303841" // ✅ Change text color of selected option
      }),
      multiValueRemove: (provided) => ({
        ...provided,
        color: "#447CC4",
        ":hover": {
          backgroundColor: "#C8DCF7", // ✅ Change remove (❌) button hover color
          color: "#447CC4",
          borderRadius: "8px"
        }
      })
    };
    return (
      <div>
        <section className="collection section-b-space">
          <div className="container">
            {this.state.loading ?
              <div className="loading-indicator"><BlinkBlur color="#427fc1" size="small" text="fetching data" textColor="#020202" /></div> :
              <form onSubmit={this.handleSubmit}>
                {showAlert && <CustomAlert path={"/pet-finder-tag"} title={"Tag Updated Successfully"} message={"You will be redirected shortly..."} time={3000} onClose={this.handleHideAlert} />}
                <h3>Pet Details</h3>
                <div className="row">
                  <div className="form-group col-md-3">
                    <label htmlFor="pet_name"> Name <span style={{ color: "red" }}>*</span></label>
                    <input
                      type="text"
                      id="pet_name"
                      name="pet_name"
                      value={formData.pet_name}
                      onChange={this.handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="pet_type">Type <span style={{ color: "red" }}>*</span> </label>
                    <select
                      id="pet_type"
                      name="pet_type"
                      value={formData.pet_type}
                      onChange={this.handleChange}
                      required
                      className="form-control"
                    >
                      {formData.pet_type !== "" ? <option defaultValue={formData.pet_type}>{formData.pet_type}</option>
                        : <option value="">Select</option>}
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                    </select>
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="gender">Gender <span style={{ color: "red" }}>*</span> </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={this.handleChange}
                      required
                      className="form-control"
                    >
                      {formData.gender !== "" ? <option defaultValue={formData.gender}>{formData.gender}</option>
                        : <option value="">Select</option>}
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="prefer_not_to_say">Prefer not to say</option>
                    </select>
                  </div>

                  <div className="form-group col-md-3">
                    <label className="form-label" htmlFor="dob">Date-of-Birth <span style={{ color: "red" }}>*</span></label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      value={formData.dob}
                      onChange={this.handleChange}
                      required
                      className="form-control"
                    />
                  </div>

                  <div className="form-group col-md-3">
                    <label htmlFor="image">Image</label>
                    {isPreviewVisible && formData.image && (
                      <div className="mt-3">
                        <img
                          src={
                            typeof formData.image === 'string'
                              ? "https://animoxkart-users.s3.ap-south-1.amazonaws.com/pets/" + formData.image
                              : URL.createObjectURL(formData.image)  // If it's a File object, create an Object URL
                          }
                          alt="preview"
                          style={{ maxWidth: '100%', maxHeight: '200px' }}
                        />
                      </div>
                    )}

                    <div className="input-group">
                      <div className="custom-file">
                        <input accept="image/*" type="file" ref={this.fileInputRef} className="custom-file-input" name='image' id="image" onChange={this.handleFileChange} />
                        <label className="custom-file-label" htmlFor="image">Choose file</label>
                      </div>
                      {isPreviewVisible ? <div className="input-group-append">
                        <button className="input-group-text" id="" onClick={this.togglePreview}>Clear</button>
                      </div> : <></>}
                    </div>
                  </div>

                  <div className="form-group col-md-3">
                    <label htmlFor="breed">Breed  <span style={{ color: "red" }}>*</span> </label>
                    <select
                      id="breed"
                      name="breed"
                      value={formData.breed}
                      onChange={this.handleChange}
                      required
                      className="form-control"
                    >
                      <option value="">Select</option>
                      {availableBreeds.map((breed, index) => (
                        <option key={index} value={breed}>{breed}</option>
                      ))}

                    </select>
                  </div>
                  <div className="form-group col-md-3">
                    <label className="form-label" htmlFor="weight"> Weight <span style={{ color: "red" }}>*</span></label>
                    <input
                      type="number"
                      id="weight"
                      name="weight"
                      value={formData.weight}
                      onChange={this.handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label className="form-label" htmlFor="color">Colour <span style={{ color: "red" }}>*</span></label>
                    <input
                      type="text"
                      id="color"
                      name="color"
                      value={formData.color}
                      onChange={this.handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label className="form-label" htmlFor="behaviour">Behaviour</label>
                    <Select
                      id="behaviour"
                      options={this.state.suggestedBehaviours}
                      isMulti
                      value={this.state.suggestedBehaviours.filter(option => this.state.formData.behaviour.includes(option.value))}
                      onChange={this.handleBehaviourSelect}
                      placeholder="Select behaviour"
                      className="basic-multi-select"
                      classNamePrefix="select"
                      styles={customStyles}
                    />

                  </div>
                  <div className="form-group col-md-3">
                    <label className="form-label" htmlFor="food">Food</label>
                    <Select
                      id="food"
                      options={this.state.suggestedFoods}
                      isMulti
                      value={this.state.suggestedFoods.filter(option => this.state.formData.food.includes(option.value))}
                      onChange={this.handleFoodSelect}
                      placeholder="Select food"
                      className="basic-multi-select"
                      classNamePrefix="select"
                      styles={customStyles}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label className="form-label" htmlFor="health">Health</label>
                    <Select
                      id="health"
                      options={this.state.suggestedHealths}
                      isMulti
                      value={this.state.suggestedHealths.filter(option => this.state.formData.health.includes(option.value))}
                      onChange={this.handleHealthSelect}
                      placeholder="Select health"
                      className="basic-multi-select"
                      classNamePrefix="select"
                      styles={customStyles}
                    />
                  </div>

                  <div className="form-group col-md-3">
                    <label className="form-label" htmlFor="diseases">Diseases</label>
                    <Select
                      id="diseases"
                      options={this.state.suggestedDiseases}
                      isMulti
                      value={this.state.suggestedDiseases.filter(option => this.state.formData.diseases.includes(option.value))}
                      onChange={this.handleDiseaseSelect}
                      placeholder="Select diseases"
                      className="basic-multi-select"
                      classNamePrefix="select"
                      styles={customStyles}
                    />
                  </div>
                </div>
                {/* <div className="row">
                <div className="form-group col-md-3">
                  <label htmlFor="pet_name">Pet Name:</label>
                  <input
                    type="text"
                    id="pet_name"
                    name="pet_name"
                    value={formData.pet_name}
                    onChange={this.handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="pet_type">Pet Type:</label>
                  <select
                    id="pet_type"
                    name="pet_type"
                    value={formData.pet_type}
                    onChange={this.handleChange}
                    required
                    className="form-control"
                  >
                    {formData.pet_type !== "" ? <option value={formData.pet_type} selected>{formData.pet_type}</option>
                      : <option value="">Select</option>}
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                  </select>
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="gender">Pet Gender:</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={this.handleChange}
                    required
                    className="form-control"
                  >
                    {formData.gender !== "" ? <option value={formData.gender} selected>{formData.gender}</option>
                      : <option value="">Select</option>}
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
                    onChange={this.handleChange}
                    required
                    className="form-control"
                  />
                </div>
              </div> */}

<h3 style={{marginTop:"8px"}}>Guardian Details</h3>
                <span className='' style={{ "fontSize": "12px", "color": "green", "lineHeight": "normal" }}>Uncheck if you would like to hide your contact when this tag is scanned during your pet lost.</span>
                {formData.owners.map((owner, index) => (
                  //  style={{paddingTop:"16px",borderTop:"10px solid #C3CBD4", }}
                  <div key={index} className="row" style={{ paddingTop: "16px", margin: "8px 0px", backgroundColor: "#FAFAFA", border: "1px solid #E0E0E0", position: "relative", borderRadius: "16px" }}>
                    {formData.owners.length > 1 ? <button
                      type="button"
                      onClick={() => this.removeOwner(index)}
                      className="btn btn-sm"
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        zIndex: 1,
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                        padding: "0",
                      }}
                    >
                      X
                    </button> : ''}
                    <div className="form-group col-md-3">
                      <label htmlFor={`owner_name_${index}`}>Name<span>*</span> </label>
                      <input
                        type="text"
                        id={`owner_name_${index}`}
                        name="owner_name"
                        value={owner.owner_name}
                        onChange={(e) => this.handleChange(e, index)}
                        required
                        className="form-control"
                      />
                    </div>

                    <div className="form-group col-md-3">
                      <label htmlFor={`contact_no_${index}`}>Contact no<span>*</span> </label>
                      <div className="input-group mb-3">

                        <input
                          type="number"
                          id={`contact_no_${index}`}
                          name="contact_no"
                          value={owner.contact_no}
                          onChange={(e) => this.handleChange(e, index)}
                          required
                          className="form-control"
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            <input
                              type="checkbox"
                              id={`show_contact_${index}`}
                              name="show_contact"
                              checked={owner.show_contact}
                              onChange={(e) => this.handleChange(e, index)}
                              aria-label="Checkbox"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group col-md-3">
                      <label htmlFor={`whatsapp_no_${index}`}>Whatsapp no<span>*</span> </label>
                      <div className="input-group mb-3">

                        <input
                          type="number"
                          id={`whatsapp_no_${index}`}
                          name="whatsapp_no"
                          value={owner.whatsapp_no}
                          onChange={(e) => this.handleChange(e, index)}
                          required
                          className="form-control"
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            <input
                              type="checkbox"
                              id={`show_whatsapp_${index}`}
                              name="show_whatsapp"
                              checked={owner.show_whatsapp}
                              onChange={(e) => this.handleChange(e, index)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group col-md-3">
                      <label htmlFor={`email_${index}`}>Email</label>
                      <input
                        type="email"
                        id={`email_${index}`}
                        name="email"
                        value={owner.email}
                        onChange={(e) => this.handleChange(e, index)}
                        className="form-control"
                      />
                    </div>

                    <div className="form-group col-md-3">
                      <label htmlFor={`address_area_${index}`}>Address</label>

                      <div className="input-group mb-3">

                        <input
                          type="text"
                          id={`address_area_${index}`}
                          name="area"
                          value={owner.address.area}
                          onChange={(e) => this.handleChange(e, index)}
                          className="form-control"
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            <input
                              type="checkbox"
                              id={`show_address_${index}`}
                              name="show_address"
                              checked={owner.show_address}
                              onChange={(e) => this.handleChange(e, index)}
                            />
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="form-group col-md-3">
                      <label htmlFor={`address_city_${index}`}>City</label>
                      <input
                        type="text"
                        id={`address_city_${index}`}
                        name="city"
                        value={owner.address.city}
                        onChange={(e) => this.handleChange(e, index)}
                        className="form-control"
                      />
                    </div>

                    <div className="form-group col-md-3">
                      <label htmlFor={`address_state_${index}`}>State</label>
                      <select
                        id={`address_state_${index}`}
                        name="state"
                        value={owner.address.state}
                        onChange={(e) => this.handleChange(e, index)}
                        className="form-control"
                      >
                        <option value="">Select State</option>
                        {states.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group col-md-3">
                      <label htmlFor={`address_country_${index}`}>Country</label>
                      <select
                        id={`address_country_${index}`}
                        name="country"
                        value={owner.address.country}
                        onChange={(e) => this.handleChange(e, index)}
                        className="form-control"
                      >
                        <option value="India">India</option>
                      </select>
                    </div>

                    <div className="form-group col-md-3">
                      <label htmlFor={`address_pincode_${index}`}>Pincode</label>
                      <input
                        type="text"
                        id={`address_pincode_${index}`}
                        name="pincode"
                        value={owner.address.pincode}
                        onChange={(e) => this.handleChange(e, index)}
                        className="form-control"
                      />
                    </div>
                  </div>
                ))}

                <button type="button" onClick={this.addOwner} className="btn btn-sm add-text-button">+ Add another guardian</button>

                <h3 className='mt-3 mb-1'>Security settings</h3>
                <div className="">
                  <div className="form-group col-md-12" style={{padding:"0px"}} >
                    <label htmlFor="alert_on">Turn on lost alert:</label>
                    <input
                      className="m-2"
                      type="checkbox"
                      id="alert_on"
                      name="alert_on"
                      checked={formData.alert_on}
                      onChange={this.handleChange}
                    />

                    <p style={{ color: "red", fontSize:"12px" }}>Check if your pet is lost; this will activate the alert system. You can update later if needed.</p>
                  </div>

                </div>
                <div className='sticky-bottom'>
                <button type="submit" className="btn btn-solid" >Save</button>
                <button type="button" onClick={this.cancel} className="btn btn-outline">Cancel</button>
                </div>
                
              </form>
            }
          </div>
        </section>
      </div>
    );
  }
}

export default UpdatePetFinder;
