
'use client'
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import FinderTagView from './finder-tag-view';
import { BlinkBlur } from 'react-loading-indicators';

const FinderTag = ({ params }) => {
  const router = useRouter();
  const { tag_id } = params;
  const isMountedRef = useRef(true);

  const [state, setState] = useState({
    tag: {},
    petProfile: true,
    loading: true,
  });

  // Fetch pet tag details based on tag_id
  const getTagDetails = async (tagId) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL_NEW}/whoami/${tagId}`, {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
        }
      });
      
      // Only update state if component is still mounted
      if (!isMountedRef.current) return;
      
      if (response.status === 200 && response.data.tags.length > 0) {
        setState(prev => ({
          ...prev,
          tag: response.data.tags[0],
          loading: false,
        }));
      } else if (response.status === 200 && response.data.tags.length === 0) {
        router.push('/pet-finder-tag/register/' + tagId);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Error fetching tag data:', error);
      // Only update state if component is still mounted
      if (isMountedRef.current) {
        setState(prev => ({ ...prev, loading: false }));
      }
    }
  };

  useEffect(() => {
    // Set mounted flag
    isMountedRef.current = true;
    
    // Fetch tag data after component is mounted
    if (tag_id) {
      getTagDetails(tag_id);
    }
    
    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMountedRef.current = false;
    };
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
          </div> :
          <>{petProfile && <FinderTagView data={tag} onLocationClick={handleLocationClick} />}</>
        }
      </section>
    </div>
  );
};

export default FinderTag;
