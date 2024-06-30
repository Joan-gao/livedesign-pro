import React from 'react';
import { Image } from 'antd';

interface ExampleProps {
  data: {
    prompt: string;
    img1: string;
    img2: string;
    img3: string;
    img4: string;
  };
}

const Response: React.FC<ExampleProps> = ({ data }) => (
  <div className="flex flex-col w-4/5 gap-2">
    <p className="text-[#CC8F99]">AI Bot</p>
    <div className="flex flex-col gap-4 text-white text-base text-left bg-[#4A2129] border-none rounded-md h-fit px-3 py-3">
      <p className="text-white text-xs">
        {data.prompt ? (
          <p className="text-white text-xs" key={data.prompt}>{data.prompt}</p>
        ) : null}
      </p>

      <div className='grid grid-cols-2 grid-rows-2 gap-2'>
        <Image src={data.img1} />
        <Image src={data.img2} />
        <Image src={data.img3} />
        <Image src={data.img4} />
      </div>

      <button
        className="bg-[#FC2B55] self-center text-center text-white w-[90%] border-none rounded-md py-1.5 px-6"
      >
        Apply Examples
      </button>
    </div>
  </div>
);

export default Response;
