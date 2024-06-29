import React from 'react';
import { Image } from 'antd';

interface Props {
  inputText: string;
}

const GeneratedTab: React.FC<Props> = ({ inputText }) => {
  const placeholderIMG1 = 'https://anai-9atmfta1xwyli1hklmwd-assets.s3.ap-southeast-2.amazonaws.com/5lVaoQAxDn9e55u7qNF5.jpg';
  const placeholderIMG2 = 'https://anai-9atmfta1xwyli1hklmwd-assets.s3.ap-southeast-2.amazonaws.com/oXqKXlvxZSqV9ivfWZ21.jpg';
  const placeholderIMG3 = 'https://anai-9atmfta1xwyli1hklmwd-assets.s3.ap-southeast-2.amazonaws.com/u8LhInJHbwuu5DntvP5Z.jpg';
  const placeholderIMG4 = 'https://anai-9atmfta1xwyli1hklmwd-assets.s3.ap-southeast-2.amazonaws.com/AUDbh5NsUMK82HcC6F60.jpg';

  return (
    <div className="w-375 top-0 flex flex-col place-items-center bg-[#240F14] rounded-md snap-mandatory snap-y z-10">
      <div className="flex flex-col w-4/5 gap-2">
        <p className="text-[#CC8F99]">AI Bot</p>
        <div className="flex flex-col gap-4 text-white text-base text-left bg-[#4A2129] border-none rounded-md h-fit px-3 py-3">
          <p className="text-white">{inputText}</p>
          <div className='grid grid-cols-2 grid-rows-2 gap-2'>
            <Image width={134} height={134} src={placeholderIMG1}></Image>
            <Image width={134} height={134} src={placeholderIMG2}></Image>
            <Image width={134} height={134} src={placeholderIMG3}></Image>
            <Image width={134} height={134} src={placeholderIMG4}></Image>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GeneratedTab;
