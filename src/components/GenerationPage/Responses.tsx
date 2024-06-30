import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface ExampleProps {
  data: {
    prompt: string;
    img1: string;
    img2: string;
    img3: string;
    img4: string;
  };
}

const Response: React.FC<ExampleProps> = ({ data }) => {
  const navigate = useNavigate();

  const handleApplyExamples = () => {
    if (data) {
      navigate('/ChatPage', { state: {data: data} });
    }
  };

  return (
    <div className="flex flex-col w-4/5 gap-2">
      <p className="text-[#CC8F99]">AI Bot</p>
      <div className="flex flex-col gap-4 text-white text-base text-left bg-[#4A2129] border-none rounded-md h-fit px-3 py-3">
        <p className="text-white text-xs">{data.prompt}</p>

        <div className='grid grid-cols-2 grid-rows-2 gap-2'>
          <img src={data.img1} alt="Image 1" />
          <img src={data.img2} alt="Image 2" />
          <img src={data.img3} alt="Image 3" />
          <img src={data.img4} alt="Image 4" />
        </div>

        <button
          className="bg-[#FC2B55] self-center text-center text-white w-[90%] border-none rounded-md py-1.5 px-6"
          onClick={handleApplyExamples}
        >
          Apply Examples
        </button>
      </div>
    </div>
  );
};

export default Response;
