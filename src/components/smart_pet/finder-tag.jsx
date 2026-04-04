'use client'
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import FinderTagView from './finder-tag-view';
import { BlinkBlur } from 'react-loading-indicators';

class FinderTag extends Component {
  constructor(props) {
    super(props);

    // Retrieve the tag_id from URL parameters
    const { match } = this.props;
    const { params } = match;
    const { tag_id } = params;

    this.state = {
      tag_id: tag_id,
      tag: {},
      petProfile: true,
      loading: true,
    };
    // Fetch tag data when the component is created
    this.getTagDetails(tag_id);
  }
  componentDidMount() {
    this.getTagDetails(this.state.tag_id);
  }

  // Fetch pet tag details based on tag_id
  getTagDetails = async (tag_id) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL_NEW}/whoami/${tag_id}`, {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
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
        this.props.history.push('/');
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
    const { tag, petProfile } = this.state;
  
    return (
      <div>
        <section className="collection section-b-space">
        {this.state.loading? 
                        <div className="loading-indicator"><BlinkBlur color="#427fc1" size="small" text="loading" textColor="#020202" /></div> :
          <>{petProfile && <FinderTagView data={tag} onLocationClick={this.handleLocationClick} />}</>
        }
        </section>
      </div>
    );
  }
}

export default FinderTag;
