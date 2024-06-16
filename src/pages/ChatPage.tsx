import React from 'react';
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {}

const ChatPage: React.FC<Props> = () => {
  return (
    <div className="z-101 absolute top-0 h-screen w-screen grid place-items-center">
      <div className="w-375 h-667 relative top-0 flex flex-col place-items-center bg-[#240F14] rounded-25 snap-mandatory snap-y z-10">
        <div className="sticky top-0 left-0 w-full h-12 flex justify-around items-center">
          <div className='absolute w-4/5 top-0 h-12 flex items-center z-10 m-auto'>
            <Link to="/"><FontAwesomeIcon icon={faTimes} className='text-base text-white cursor-pointer'/></Link>
          </div>
          <h2 className='text-sm font-medium text-white text-shadow px-10 py-0'>Event Page Generator</h2>
        </div>

        <div className="flex flex-col w-4/5 gap-2">
          {/* Ai Text Responses */}
          <p className="text-[#CC8F99]">AI Bot</p>
          <div className="text-white text-base text-left bg-[#4A2129] border-none rounded-xl h-fit px-3 py-3">
            <p className="text-white">Rotogravure, Lola's mind is like a short stack of pancakes. 256 color radial laser  ray bg --v 6.0 --s 250</p>
          </div>

          {/* Ai Design Output */}
          <div className="grid grid-cols-2 gap-3 mt-3.5">
            <div className="relative bg-[#4A2129] h-32 rounded-xl">
              <button className="absolute bottom-2 right-2 z-10 text-white text-base bg-[#FC2B55] border-none rounded-md py-1.5 px-5">Edit</button>
            </div>

            <div className="relative bg-[#4A2129] h-32 rounded-xl">
              <button className="absolute bottom-2 right-2 z-10 text-white text-base bg-[#FC2B55] border-none rounded-md py-1.5 px-5">Edit</button>
            </div>

            <div className="relative bg-[#4A2129] h-32 rounded-xl">
              <button className="absolute bottom-2 right-2 z-10 text-white text-base bg-[#FC2B55] border-none rounded-md py-1.5 px-5">Edit</button>
            </div>

            <div className="relative bg-[#4A2129] h-32 rounded-xl">
              <button className="absolute bottom-2 right-2 z-10 text-white text-base bg-[#FC2B55] border-none rounded-md py-1.5 px-5">Edit</button>
            </div>
          </div>

          <div className="absolute flex flex-col w-full bottom-5 gap-3">
            <div className="flex flex-row w-4/5 gap-3">
              <button className="bg-[#FC2B55] text-white w-1/2 border-none rounded-md py-1.5 px-6">Select</button>
              <button className="bg-[#4A2129] text-white w-1/2 border-none rounded-md py-1.5 px-6">Regenerate</button>
            </div>
            <input
              className="text-white text-base text-left bg-[#4A2129] border-none rounded-md w-4/5 h-24 py-1.5 px-3"
              type="text"
              placeholder="Enter your text here"
              value=""
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => console.log(e.target.value)}
            />
          </div>
        </div> 
      </div>
    </div>
  );
};

export default ChatPage;