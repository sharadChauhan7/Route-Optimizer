import React, { useState } from "react";

function MapMarker({ imageSrc, reviews, location }) {
  const [rating, setRating] = useState(5); // Default rating to 5
  const profilePics = ["/profile1.png", "/profile2.png", "/profile3.png"]; // Profile images from public folder

  return (
    <div className="flex justify-center items-center gap-3 p-0 border-2  ">
      <div className="flex gap-3 bg-[#19191a] w-[350px] p-3 rounded-2xl h-[100px] shadow-lg relative items-center">
        {/* Image Section */}
        <div>
          <img
            className="h-[75px] w-[75px] rounded-xl object-cover"
            src={imageSrc}
            alt="location"
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col flex-1">
          {/* Profile Pictures, Reviews Count, and Star Rating in Same Line */}
          <div className="flex items-center text-white text-sm justify-between">
            <div className="flex items-center">
              {profilePics.map((pic, index) => (
                <img
                  key={index}
                  src={pic}
                  alt="profile"
                  className={`h-6 w-6 rounded-full border-2 border-black ${
                    index !== 0 ? "-ml-2" : ""
                  }`}
                />
              ))}
              <p className="ml-2">{reviews} reviews</p>
            </div>

            <div className="flex text-blue-400">
              {[...Array(5)].map((_, index) => (
                <span key={index} className="text-xl">
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* Location Name */}
          <p className="text-white font-bold text-lg mt-1">{location}</p>
          <div className="flex items-center gap-1 text-white text-center">
            <img className="w-4 h-4" src="/location.png" alt="Location" />
            <p>Queen Park</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapMarker;