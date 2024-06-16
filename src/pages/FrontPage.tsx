import React from 'react';
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {}

const FrontPage: React.FC<Props> = () => {
  // const CrossIcon = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.2806 14.2194C15.5737 14.5124 15.5737 14.9876 15.2806 15.2806C14.9876 15.5737 14.5124 15.5737 14.2194 15.2806L8 9.06031L1.78062 15.2806C1.48757 15.5737 1.01243 15.5737 0.719375 15.2806C0.426319 14.9876 0.426319 14.5124 0.719375 14.2194L6.93969 8L0.719375 1.78062C0.426319 1.48757 0.426319 1.01243 0.719375 0.719375C1.01243 0.426319 1.48757 0.426319 1.78062 0.719375L8 6.93969L14.2194 0.719375C14.5124 0.426319 14.9876 0.426319 15.2806 0.719375C15.5737 1.01243 15.5737 1.48757 15.2806 1.78062L9.06031 8L15.2806 14.2194Z" fill="white"/></svg>
  
  return (
    <div className="z-101 absolute top-0 h-screen w-screen grid place-items-center">
      <div className="w-375 h-667 relative top-0 flex flex-col place-items-center bg-[#240F14] rounded-25 snap-mandatory snap-y z-10">
        <div className="sticky top-0 left-0 w-full h-12 flex justify-around items-center">
          <div className='absolute w-4/5 top-0 h-12 flex items-center z-10 m-auto'>
          <Link to="/"><FontAwesomeIcon icon={faTimes} className='text-base text-white'/></Link>
          </div>
          <h2 className='text-sm font-medium text-white text-shadow px-10 py-0'>New Event Page</h2>
        </div>

        <div className="flex flex-col w-4/5 gap-2">
          {/* Ai Text Responses */}
          <h2 className="text-white">How do you want to create this?</h2>
          <div className="text-white text-base text-left bg-[#4A2129] border-none rounded-xl h-fit px-3 py-3">
            <p className="text-white text-center">Choose Existing</p>
          </div>
          <div className="text-white text-base text-left bg-[#4A2129] border-none rounded-xl h-fit px-3 py-3">
            <Link to='/ChatPage'><p className="text-white text-center">Choose Generate</p></Link>
          </div>

          <button className="absolute bottom-5 bg-[#FC2B55] text-white w-4/5 border-none rounded-md py-1.5 px-6">Select</button>
        </div> 
      </div>
    </div>
  );
};

export default FrontPage;