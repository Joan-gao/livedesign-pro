import React from 'react';
import { Image } from 'antd';

interface Props {
  inputText: string;
}

const GeneratedTab: React.FC<Props> = ({ inputText }) => {

  return (
    <div className="w-375 top-0 flex flex-col place-items-center bg-[#240F14] rounded-md snap-mandatory snap-y z-10">
      <div className="flex flex-col w-4/5 gap-2">
        <p className="text-[#CC8F99]">AI Bot</p>
        <div className="flex flex-col gap-4 text-white text-base text-left bg-[#4A2129] border-none rounded-md h-fit px-3 py-3">
          <p className="text-white">{inputText}</p>
          <div className='grid grid-cols-2 grid-rows-2 gap-2'>
            <Image src=""></Image>
            <Image width={134} height={134} src=""></Image>
            <Image width={134} height={134} src=""></Image>
            <Image width={134} height={134} src=""></Image>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GeneratedTab;
