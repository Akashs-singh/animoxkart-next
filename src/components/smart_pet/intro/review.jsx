'use client'
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './../css/review.css'
const reviews = [
    {
      id: 1,
      name: 'Aarav Mehta',
      state: 'Delhi, India',
      image: 'https://animoxkart.com/avatar.png',
      text: 'This pet finder tag is amazing! It helped me reunite with my lost dog within hours. A must-have for all pet parents!',
      review: 5,
    },
    {
      id: 2,
      name: 'Sanya Verma',
      state: 'Maharashtra, India',
      image: 'https://animoxkart.com/avatar.png',
      text: 'The secure chat feature is a game-changer. I was able to get my cat back without sharing my phone number!',
      review: 5,
    },
    {
      id: 3,
      name: 'Rajesh Kumar',
      state: 'Karnataka, India',
      image: 'https://animoxkart.com/avatar.png',
      text: 'Works perfectly! Very easy to use and no subscription fees! The GPS tracking is super helpful in case my pet goes missing.',
      review: 5,
    },
    {
      id: 4,
      name: 'Pooja Sharma',
      state: 'Rajasthan, India',
      image: 'https://animoxkart.com/avatar.png',
      text: 'I feel so much safer knowing my pet’s details are stored securely and can be accessed if needed. Love this!',
      review: 4,
    },
    {
      id: 5,
      name: 'Vikram Reddy',
      state: 'Telangana, India',
      image: 'https://animoxkart.com/avatar.png',
      text: 'Brilliant concept! My Labrador wandered off, and someone scanned the tag to inform me instantly. Thank you, Animoxkart!',
      review: 5,
    },
    {
      id: 6,
      name: 'Neha Joshi',
      state: 'Maharashtra, India',
      image: 'https://animoxkart.com/avatar.png',
      text: 'Best pet tracker ever! The instant chat feature ensures my details stay private while still being contacted.',
      review: 5,
    },
    {
      id: 7,
      name: 'Anil Nair',
      state: 'Kerala, India',
      image: 'https://animoxkart.com/avatar.png',
      text: 'Works perfectly! The tag is lightweight, waterproof, and easy to scan. My dog is much safer now.',
      review: 5,
    },
    {
      id: 8,
      name: 'Simran Kaur',
      state: 'Punjab, India',
      image: 'https://animoxkart.com/avatar.png',
      text: 'Superb quality and accuracy. The alerts were instant, and I was able to get my pet back without hassle!',
      review: 4,
    },
    {
      id: 9,
      name: 'Manish Tiwari',
      state: 'Uttar Pradesh, India',
      image: 'https://animoxkart.com/avatar.png',
      text: 'I was skeptical at first, but this tag is a lifesaver. Simple, effective, and secure!',
      review: 5,
    },
    {
      id: 10,
      name: 'Priya Das',
      state: 'West Bengal, India',
      image: 'https://animoxkart.com/avatar.png',
      text: 'I love how convenient and affordable this tag is. A great investment for pet safety!',
      review: 4,
    },
    {
      id: 11,
      name: 'Harish Patel',
      state: 'Gujarat, India',
      image: 'https://animoxkart.com/avatar.png',
      text: 'The pet finder tag is highly reliable. It makes sure my pet is always traceable.',
      review: 5,
    },
    {
      id: 12,
      name: 'Anita Choudhury',
      state: 'Assam, India',
      image: 'https://animoxkart.com/avatar.png',
      text: 'Highly recommend this to all pet parents! The secure chat feature is very helpful.',
      review: 5,
    },
    {
      id: 13,
      name: 'Rahul Saxena',
      state: 'Madhya Pradesh, India',
      image: 'https://animoxkart.com/avatar.png',
      text: 'Simple to use, effective, and well-designed. The best pet safety product!',
      review: 5,
    },
    {
      id: 14,
      name: 'Swati Nair',
      state: 'Tamil Nadu, India',
      image: 'https://animoxkart.com/avatar.png',
      text: 'Easy to attach to the collar and works flawlessly. The secure chat is a great feature!',
      review: 5,
    },
    {
      id: 15,
      name: 'Ravi Kapoor',
      state: 'Haryana, India',
      image: 'https://animoxkart.com/avatar.png',
      text: 'My pet’s safety is my priority, and this tag ensures just that. Highly recommended!',
      review: 5,
    },
    {
      id: 16,
      name: 'Meera Iyer',
      state: 'Karnataka, India',
      image: 'https://animoxkart.com/avatar.png',
      text: 'A brilliant solution for pet safety. Instant alerts and GPS tracking make it perfect!',
      review: 5,
    },
    {
      id: 17,
      name: 'Anuj Bhardwaj',
      state: 'Uttarakhand, India',
      image: 'https://animoxkart.com/avatar.png',
      text: 'Simple yet highly effective. This pet finder tag gives me peace of mind.',
      review: 5,
    },
    {
      id: 18,
      name: 'Deepa Ramesh',
      state: 'Andhra Pradesh, India',
      image: 'https://animoxkart.com/avatar.png',
      text: 'An incredible product! It ensures my pet’s safety without any subscription costs.',
      review: 5,
    },
    {
      id: 19,
      name: 'Suresh Yadav',
      state: 'Chhattisgarh, India',
      image: 'https://animoxkart.com/avatar.png',
      text: 'User-friendly and highly reliable. A must-have for all pet owners!',
      review: 5,
    },
    {
      id: 20,
      name: 'Tanya Grover',
      state: 'Himachal Pradesh, India',
      image: 'https://animoxkart.com/avatar.png',
      text: 'Brilliant product! The secure chat and real-time tracking work flawlessly!',
      review: 5,
    },  
];

const Review = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="text-center p-10">
      <h2 className="text-4xl font-bold mb-4">What our customers are saying!</h2>
      <p className="text-gray-600 mb-10">"Discover heartwarming stories from our happy pet parents. See how their journeys with Animoxkart have brought them peace of mind and joy."</p>
      <div className="relative overflow-hidden">
        <div className="flex transition-transform ease-in-out duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {reviews.map((review) => (
            <div key={review.id} className="min-w-full p-4">
              <div className="bg-lime-200 rounded-2xl p-6 shadow-md">
                <div className="flex justify-center mb-4">
                  {review.review === 5 && <span className="text-yellow-500">★★★★★</span>}
                  {review.review === 4 && <span className="text-yellow-500">★★★★☆</span>}
                  {review.review === 3 && <span className="text-yellow-500">★★★☆☆</span>}          
                  {review.review === 2 && <span className="text-yellow-500">★★☆☆☆</span>}
                  {review.review === 1 && <span className="text-yellow-500">★☆☆☆☆</span>}
                </div>
                <p className="mb-4">{review.text}</p>
                <div className="flex items-center">
                  <img className="w-10 h-10 rounded-full mr-3" src={`/assets/images/icon/user.png`} alt={review.name} />
                  <div>
                    <h4 className="font-bold">{review.name}</h4>
                    <p className="text-gray-500 text-sm">{review.state}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={handlePrev} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200">
          <ChevronLeft size={20} />
        </button>
        <button onClick={handleNext} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200">
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default Review;
