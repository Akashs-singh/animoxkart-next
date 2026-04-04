'use client';
import React, { Component } from 'react';
import Breadcrumb from "../common/breadcrumb";
import CustomAlert from "../common/alert/custom";
import Cookies from 'js-cookie';
import axios from 'axios';
import Select from "react-select";
import { isLoggedin, getContactIdFromJWT } from '../common/utils/index';
import './css/form.css'

class AddPetFinder extends Component {
  constructor(props) {
    super(props);

    const { match } = this.props;
    const { params } = match;
    const { tag_id } = params;

    this.state = {
      tag: {},
      tag_id: tag_id,
      contact_id: null, // Will be set in componentDidMount
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
        owners: [{
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
          show_address: true,
          show_contact: true,
          show_whatsapp: true,
          show_email: false
        }],
        alert_on: false,
      },
      isPreviewVisible: false,
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
      options: [
        { value: "Manufacturer", label: "Manufacturer" },
        { value: "Distributor", label: "Distributor" },
        { value: "Trader", label: "Trader" },
        { value: "Retailer", label: "Retailer" },
      ],
    }
    this.fileInputRef = React.createRef();
  }

  componentDidMount() {
    // Check authentication and get contact_id only on client side
    const { match } = this.props;
    const { params } = match;
    const { tag_id } = params;
    
    isLoggedin('pet-finder-tag/register/' + tag_id, true);
    
    const contact_id = getContactIdFromJWT();
    this.setState({ contact_id });
    
    this.getTags(tag_id);
  }

  // Fetch the tag data
  getTags = async (tag_id) => {
    const response = await axios.get(process.env.NEXT_PUBLIC_API_URL_NEW + '/tags/' + tag_id, {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + Cookies.get('token')
      }
    });
    if (response.data.status == true) {
      if (response.data.tag != null) {
        this.props.history.push('/finder-tag/' + tag_id);
      }
    }
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
          show_address: true,
          show_contact: true,
          show_whatsapp: true,
          show_email: false
        }]
      }
    }));
  };

  // Remove an owner input
  removeOwner = (index) => {
    this.setState(prevState => {
      const updatedOwners = prevState.formData.owners.filter((_, i) => i !== index);
      return {
        formData: {
          ...prevState.formData,
          owners: updatedOwners,
        }
      };
    });
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


  handleHideAlert = () => {
    this.setState({ showAlert: false });
  };
  handleShowAlert = () => {
    this.setState({ showAlert: true });
  };

  // Handle form submission
  // handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const { formData } = this.state;
  //   const updatedFormData = {
  //     ...formData,
  //     tag_id: this.state.tag_id,
  //     contact_id: this.state.contact_id,
  //   };
  //   console.log(updatedFormData)

  //   try {
  //     const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL_NEW}/add-tag`, updatedFormData);

  //     if (response.status === 200) {
  //       this.handleShowAlert();
  //     } else {
  //       console.error('Failed to submit data');
  //     }
  //   } catch (error) {
  //     console.error('Error submitting data:', error);
  //   }
  // };

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
    // Handle the 'image' field (ensure the file is attached)
    if (formData.image) {
      updatedFormData.append('image', formData.image); // Assuming formData.image contains the file object
    }

    // Handle 'owners' array - iterate and append each owner as a separate JSON string
    formData.owners.forEach((owner, index) => {
      updatedFormData.append(`owners[${index}][owner_name]`, owner.owner_name);
      updatedFormData.append(`owners[${index}][contact_no]`, owner.contact_no);
      updatedFormData.append(`owners[${index}][whatsapp_no]`, owner.whatsapp_no);
      updatedFormData.append(`owners[${index}][email]`, owner.email);
      updatedFormData.append(`owners[${index}][address]`, JSON.stringify(owner.address));
      updatedFormData.append(`owners[${index}][show_contact]`, owner.show_contact ? 1 : 0);  // Use 1 for true and 0 for false
      updatedFormData.append(`owners[${index}][show_whatsapp]`, owner.show_whatsapp ? 1 : 0);  // Same as above
      updatedFormData.append(`owners[${index}][show_email]`, owner.show_email ? 1 : 0);
      updatedFormData.append(`owners[${index}][show_address]`, owner.show_address ? 1 : 0);
    });

    // Now make the API request using axios with the FormData
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL_NEW}/add-tag`, updatedFormData, {
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
    const { formData, petBreeds, states, suggestedBehaviours, suggestedFoods, suggestedHealths, suggestedDiseases, isPreviewVisible, showAlert, options } = this.state;
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

            <form onSubmit={this.handleSubmit}>
              {showAlert && <CustomAlert path={"/pet-finder-tag"} title={"Tag Registration Successful"} message={"You will be redirected shortly..."} time={3000} onClose={this.handleHideAlert} />}
              <h3>Pet Details</h3>
              <div className="row">
                <div className="form-group col-md-3">
                  <label htmlFor="pet_name">Pet name<span>*</span></label>
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
                  <label htmlFor="pet_type">Type<span>*</span> </label>
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
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                  </select>
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="gender">Gender<span>*</span></label>
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
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                  </select>
                </div>

                <div className="form-group col-md-3">
                  <label className="form-label" htmlFor="dob">Date-of-Birth<span>*</span></label>
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
                        src={formData.image ? URL.createObjectURL(formData.image) : ""}
                        alt="Selected preview"
                        style={{ maxWidth: '100%', maxHeight: '200px' }}
                      />
                    </div>
                  )}

                  <div className="input-group">
                    <div className="custom-file">
                      <input type="file" accept="image/*" ref={this.fileInputRef} className="custom-file-input" name='image' id="image" onChange={this.handleFileChange} />
                      <label className="custom-file-label" htmlFor="image" style={{ borderRadius: "8px", color: "#9EB1C6" }}>Choose file</label>
                    </div>
                    {isPreviewVisible ? <div className="input-group-append">
                      <button className="input-group-text" id="" onClick={this.togglePreview}>Clear</button>
                    </div> : <></>}
                  </div>
                </div>

                <div className="form-group col-md-3">
                  <label htmlFor="breed">Breed<span>*</span></label>
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
                    {/* {formData.breed !== "" ? <option value={formData.breed} selected>{formData.breed}</option>
                      : <option value="">Select</option>}
                      <option value="other">Other</option>
                    <optgroup label="Working Group">
                      <option value="alaskan_malamute">Alaskan Malamute</option>
                      <option value="bernese_mountain_dog">Bernese Mountain Dog</option>
                      <option value="boxer">Boxer</option>
                      <option value="doberman_pinscher">Doberman Pinscher</option>
                      <option value="great_dane">Great Dane</option>
                      <option value="mastiff">Mastiff</option>
                      <option value="rottweiler">Rottweiler</option>
                      <option value="saint_bernard">Saint Bernard</option>
                      <option value="siberian_husky">Siberian Husky</option>
                    </optgroup>

                    <optgroup label="Sporting Group">
                      <option value="labrador_retriever">Labrador Retriever</option>
                      <option value="golden_retriever">Golden Retriever</option>
                      <option value="cocker_spaniel">Cocker Spaniel</option>
                      <option value="english_springer_spaniel">English Springer Spaniel</option>
                      <option value="weimaraner">Weimaraner</option>
                      <option value="brittany_spaniel">Brittany Spaniel</option>
                      <option value="irish_setter">Irish Setter</option>
                      <option value="newfoundland">Newfoundland</option>
                    </optgroup>

                    <optgroup label="Herding Group">
                      <option value="australian_shepherd">Australian Shepherd</option>
                      <option value="border_collie">Border Collie</option>
                      <option value="collie">Collie</option>
                      <option value="german_shepherd">German Shepherd</option>
                      <option value="shetland_sheepdog">Shetland Sheepdog</option>
                      <option value="pembroke_welsh_corgi">Pembroke Welsh Corgi</option>
                      <option value="old_english_sheepdog">Old English Sheepdog</option>
                    </optgroup>

                    <optgroup label="Hound Group">
                      <option value="beagle">Beagle</option>
                      <option value="basset_hound">Basset Hound</option>
                      <option value="bloodhound">Bloodhound</option>
                      <option value="greyhound">Greyhound</option>
                      <option value="whippet">Whippet</option>
                      <option value="afghan_hound">Afghan Hound</option>
                      <option value="basenji">Basenji</option>
                    </optgroup>

                    <optgroup label="Toy Group">
                      <option value="chihuahua">Chihuahua</option>
                      <option value="pomeranian">Pomeranian</option>
                      <option value="shih_tzu">Shih Tzu</option>
                      <option value="pekingese">Pekingese</option>
                      <option value="yorkshire_terrier">Yorkshire Terrier</option>
                      <option value="maltese">Maltese</option>
                      <option value="papillon">Papillon</option>
                      <option value="toy_poodle">Toy Poodle</option>
                    </optgroup>

                    <optgroup label="Non-Sporting Group">
                      <option value="bulldog">Bulldog</option>
                      <option value="dalmatian">Dalmatian</option>
                      <option value="poodle">Poodle</option>
                      <option value="french_bulldog">French Bulldog</option>
                      <option value="shiba_inu">Shiba Inu</option>
                      <option value="bichon_frise">Bichon Frisé</option>
                      <option value="boston_terrier">Boston Terrier</option>
                    </optgroup>

                    <optgroup label="Terrier Group">
                      <option value="bull_terrier">Bull Terrier</option>
                      <option value="jack_russell_terrier">Jack Russell Terrier</option>
                      <option value="scottish_terrier">Scottish Terrier</option>
                      <option value="west_highland_white_terrier">West Highland White Terrier (Westie)</option>
                      <option value="cairn_terrier">Cairn Terrier</option>
                      <option value="airedale_terrier">Airedale Terrier</option>
                      <option value="schnauzer">Schnauzer</option>
                    </optgroup>

                    <optgroup label="Miscellaneous Group">
                      <option value="dogo_argentino">Dogo Argentino</option>
                      <option value="belgian_laekenois">Belgian Laekenois</option>
                      <option value="portuguese_water_dog">Portuguese Water Dog</option>
                      <option value="american_bully">American Bully</option>
                    </optgroup>

                    <optgroup label="Unique Breeds">
                      <option value="australian_cattle_dog">Australian Cattle Dog</option>
                      <option value="basenji">Basenji</option>
                      <option value="chinese_crested">Chinese Crested</option>
                      <option value="rhodesian_ridgeback">Rhodesian Ridgeback</option>
                    </optgroup> */}
                  </select>
                </div>
                <div className="form-group col-md-3">
                  <label className="form-label" htmlFor="weight">Weight (Kg):<span>*</span></label>
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
                  <label className="form-label" htmlFor="color">Colour<span>*</span> </label>
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

              <h3 style={{marginTop:"8px"}}>Guardian Details</h3>
              <span className='' style={{ "fontSize": "12px", "color": "green", "lineHeight": "normal" }}>Uncheck if you would like to hide your contact when this tag is scanned during your pet lost.</span>
              {formData.owners.map((owner, index) => (
                //  style={{paddingTop:"16px",borderTop:"10px solid #C3CBD4", }}
                <div key={index} className="row" style={{paddingTop:"16px", margin:"8px 0px",backgroundColor:"#FAFAFA", border:"1px solid #E0E0E0",position: "relative", borderRadius:"16px"}}>
                   {formData.owners.length> 1?<button
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
    </button>:'' }
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

              <button type="submit" className="mt-2 btn btn-outline">Submit</button>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

export default AddPetFinder;
