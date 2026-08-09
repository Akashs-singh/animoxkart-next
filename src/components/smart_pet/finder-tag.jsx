
'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FinderTagView from './finder-tag-view';
import AttachOrRegister from './attach-or-register';
import { BlinkBlur } from 'react-loading-indicators';

const FinderTag = ({ params }) => {
  const { tag_id } = params;

  const [state, setState] = useState({
    tag: {},
    petProfile: true,
    loading: true,
    notFound: false,
  });

  const getTagDetails = async (tagId) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL_NEW}/whoami/${tagId}`, {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
        }
      });

      if (response.status === 200 && response.data.tags.length > 0) {
        setState(prev => ({ ...prev, tag: response.data.tags[0], loading: false }));
      } else if (response.status === 200 && response.data.tags.length === 0) {
        setState(prev => ({ ...prev, loading: false, notFound: true }));
      } else {
        setState(prev => ({ ...prev, loading: false }));
      }
    } catch (error) {
      console.error('Error fetching tag data:', error);
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    if (tag_id) {
      getTagDetails(tag_id);
    }
  }, [tag_id]);

  const handleLocationClick = () => {
    setState(prev => ({
      ...prev,
      showLocation: true,
      petProfile: false,
    }));
  };

  const handleBackClick = () => {
    setState(prev => ({
      ...prev,
      showLocation: false,
      petProfile: true,
    }));
  };

  const { tag, petProfile, loading } = state;

  return (
    <div>
      <section className="collection section-b-space">
        {loading ?
          <div className="loading-indicator">
            <BlinkBlur color="#427fc1" size="small" text="loading" textColor="#020202" />
          </div>
          : state.notFound
            ? <AttachOrRegister tag_id={tag_id} />
            : <>{petProfile && <FinderTagView data={tag} onLocationClick={handleLocationClick} />}</>
        }
      </section>
    </div>
  );
};

export default FinderTag;
