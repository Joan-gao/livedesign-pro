import React from 'react';

interface Props {}

const EventPageGenerator: React.FC<Props> = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black">
      <div className="w-375 h-667 bg-[#240F14] rounded-md shadow-md p-4">
        <div className="top-navbar">
          <h2 className="text-2xl font-bold">Event Page Generator</h2>
        </div>

        <div className="container-ai py-4">
          {/* Ai Text Responses */}
          <p className="text-[#CC8F99]">AI Bot</p>
          <div className="ai-response bg-[#4A2129] rounded-md p-4">
            <p className="text-white">Rotogravure, Lola's mind is like a short stack of pancakes. 256 color radial laser  ray bg --v 6.0 --s 250</p>
            <div className="grid-poster"></div>
          </div>

          {/* Ai Design Output */}
          <div className="ai-output grid grid-cols-2 gap-4 mt-4">
            <div className="output-item bg-[#4A2129] rounded-md p-4">
              <button className="btn-edit absolute bottom-2 right-2 z-10 bg-[#FC2B55] text-white rounded-md px-4 py-2">Edit</button>
            </div>

            <div className="output-item bg-[#4A2129] rounded-md p-4">
              <button className="btn-edit absolute bottom-2 right-2 z-10 bg-[#FC2B55] text-white rounded-md px-4 py-2">Edit</button>
            </div>

            <div className="output-item bg-[#4A2129] rounded-md p-4">
              <button className="btn-edit absolute bottom-2 right-2 z-10 bg-[#FC2B55] text-white rounded-md px-4 py-2">Edit</button>
            </div>

            <div className="output-item bg-[#4A2129] rounded-md p-4">
              <button className="btn-edit absolute bottom-2 right-2 z-10 bg-[#FC2B55] text-white rounded-md px-4 py-2">Edit</button>
            </div>
          </div>

          <div className="bottom-chatbox absolute bottom-4 w-full flex flex-col items-center gap-4">
            <div className="user-options flex w-11/12 justify-between">
              <button className="btn-option1 w-1/2 bg-[#FC2B55] text-white rounded-md px-4 py-2">Select</button>
              <button className="btn-option2 w-1/2 bg-[#4A2129] text-white rounded-md px-4 py-2">Regenerate</button>
            </div>
            <input
              className="container-prompt w-11/12 bg-[#4A2129] text-white rounded-md p-4"
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

export default EventPageGenerator;