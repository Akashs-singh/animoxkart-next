'use client'
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import PetProfile from './pet-profile';
import Location from './location';
import { BlinkBlur } from 'react-loading-indicators';
import { isLoggedin } from '../common/utils/index';

class ViewPet extends Component {
  constructor(props) {
    super(props);

    // Retrieve the tag_id from URL parameters
    const { params } = this.props;
    const { tag_id } = params;
    isLoggedin('pet-finder-tag/view/' + tag_id, true);
    this.state = {
      tag_id: tag_id,
      tag: {},
      petProfile: true,
      showLocation: false,
      loading: true,
    };
  }

  componentDidMount() {
    // Fetch tag data after component is mounted
    this.getTagDetails(this.state.tag_id);
  }

  // Fetch pet tag details based on tag_id
  getTagDetails = async (tag_id) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL_NEW}/tag/${tag_id}`, {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Bearer ' + Cookies.get('token'),
        }
      });

      if (response.status === 200 && response.data.tags.length > 0) {
        this.setState({
          tag: response.data.tags[0],
          loading: false,
        });

      } else if (response.status === 200 && response.data.tags.length == 0) {
        this.props.history.push('/pet-finder-tag/register/' + tag_id);
      }
      else {
        console.error('Tag not found');
      }
    } catch (error) {
      console.error('Error fetching tag data:', error);
    }
  };

  handleLocationClick = () => {
    this.setState({
      showLocation: true,
      petProfile: false,
    });
  };
  handleBackClick = () => {
    this.setState({
      showLocation: false,
      petProfile: true,
    });
  };
  render() {
    const { tag, petProfile, showLocation } = this.state;
  
    return (
      <div>
        {this.state.loading? 
                        <div className="loading-indicator"><BlinkBlur color="#427fc1" size="small" text="loading" textColor="#020202" /></div> :
        <section className="collection section-b-space">
          {showLocation && <Location data={tag} onBackClick={this.handleBackClick} />}
          {petProfile && <PetProfile data={tag} onLocationClick={this.handleLocationClick} />}
        </section>
        }
      </div>
    );
  }
}

export default ViewPet;
