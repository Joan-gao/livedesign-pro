import React from 'react';
import { Image } from 'antd';

import fashionBrand1 from './Assets/fashionBrand1.jpg';
import fashionBrand2 from './Assets/fashionBrand2.jpg';
import fashionBrand3 from './Assets/fashionBrand3.jpg';
import fashionBrand4 from './Assets/fashionBrand4.jpg';

import foodBrand1 from './Assets/foodBrand1.jpg';
import foodBrand2 from './Assets/foodBrand2.jpg';
import foodBrand3 from './Assets/foodBrand3.jpg';
import foodBrand4 from './Assets/foodBrand4.jpg';

import skincareBrand1 from './Assets/skincareBrand1.jpg';
import skincareBrand2 from './Assets/skincareBrand2.jpg';
import skincareBrand3 from './Assets/skincareBrand3.jpg';
import skincareBrand4 from './Assets/skincareBrand4.jpg';

import sportsBrand1 from './Assets/sportsBrand1.jpg';
import sportsBrand2 from './Assets/sportsBrand2.jpg';
import sportsBrand3 from './Assets/sportsBrand3.jpg';
import sportsBrand4 from './Assets/sportsBrand4.jpg';

import toyBrand1 from './Assets/toyBrand1.jpg';
import toyBrand2 from './Assets/toyBrand2.jpg';
import toyBrand3 from './Assets/toyBrand3.jpg';
import toyBrand4 from './Assets/toyBrand4.jpg';

const GeneratedTab: React.FC = () => {

  return (
    <div className="w-375 top-0 flex flex-col gap-6 pb-6 place-items-center bg-[#240F14] rounded-md snap-mandatory snap-y z-10">
      <div className="flex flex-col w-4/5 gap-2">
        <p className="text-[#CC8F99]">AI Bot</p>
        <div className="flex flex-col gap-4 text-white text-base text-left bg-[#4A2129] border-none rounded-md h-fit px-3 py-3">
          <p className="text-white text-xs">
            Design a dreamy event poster with pastel colors (pink, lavender, mint green) and a secret garden theme. Use the new collection's dresses image in the center. Heading: "Join Our Live Stream Event!" Text: "Discover Our Secret Garden Collection." Date and time: "One Week from Today, 8 PM EST." Add "Set a Reminder" button, brand's logo, and social media icons (Instagram, Facebook, YouTube).
          </p>
          <div className='grid grid-cols-2 grid-rows-2 gap-2'>
            <Image src={fashionBrand1}></Image>
            <Image src={fashionBrand2}></Image>
            <Image src={fashionBrand3}></Image>
            <Image src={fashionBrand4}></Image>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-4/5 gap-2">
        <p className="text-[#CC8F99]">AI Bot</p>
        <div className="flex flex-col gap-4 text-white text-base text-left bg-[#4A2129] border-none rounded-md h-fit px-3 py-3">
          <p className="text-white text-xs">
            Design a vibrant event poster with bold colors (red, yellow, brown). Use a beef burger image in the center. Heading: "Join Our Live Stream Event!" Text: "Discover Our Signature Beef Burgers." Date and time: "One Week from Today, 8 PM EST." Add "Set a Reminder" button, restaurant's logo, and social media icons (Instagram, Facebook, YouTube).
          </p>
          <div className='grid grid-cols-2 grid-rows-2 gap-2'>
            <Image src={foodBrand1}></Image>
            <Image src={foodBrand2}></Image>
            <Image src={foodBrand3}></Image>
            <Image src={foodBrand4}></Image>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-4/5 gap-2">
        <p className="text-[#CC8F99]">AI Bot</p>
        <div className="flex flex-col gap-4 text-white text-base text-left bg-[#4A2129] border-none rounded-md h-fit px-3 py-3">
          <p className="text-white text-xs">
            Design a mobile-friendly event poster with a pastel background (light pink, white, beige). Use the product image in the center. Heading: "Join Our Live Stream Event!" Text: "Discover Our Latest Skincare Products." Date and time: "One Week from Today, 8 PM EST." Add "Set a Reminder" button, brand's logo, and social media icons (Instagram, Facebook, YouTube).
          </p>
          <div className='grid grid-cols-2 grid-rows-2 gap-2'>
            <Image src={skincareBrand1}></Image>
            <Image src={skincareBrand2}></Image>
            <Image src={skincareBrand3}></Image>
            <Image src={skincareBrand4}></Image>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-4/5 gap-2">
        <p className="text-[#CC8F99]">AI Bot</p>
        <div className="flex flex-col gap-4 text-white text-base text-left bg-[#4A2129] border-none rounded-md h-fit px-3 py-3">
          <p className="text-white text-xs">
            Design a realistic event poster with outdoor elements (mountains, forests, trails) and earthy colors (greens, browns, blues). Use product images (tents, hiking shoes) in the center. Heading: "Join Our Outdoor Gear Sale Event!" Text: "Discover the Best Gear for Your Next Adventure." Date and time: "2024/07/29, 8 PM, Live on TikTok." Add "Learn More" button, brand's logo, and social media icons (Instagram, Facebook, Twitter).            
          </p>
          <div className='grid grid-cols-2 grid-rows-2 gap-2'>
            <Image src={sportsBrand1}></Image>
            <Image src={sportsBrand2}></Image>
            <Image src={sportsBrand3}></Image>
            <Image src={sportsBrand4}></Image>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-4/5 gap-2">
        <p className="text-[#CC8F99]">AI Bot</p>
        <div className="flex flex-col gap-4 text-white text-base text-left bg-[#4A2129] border-none rounded-md h-fit px-3 py-3">
          <p className="text-white text-xs">
            Design a vibrant event poster with colors (dark blue, yellow, black) and a space adventure theme. Use the new collection's toys image in the center. Heading: "Join Our Live Stream Event!" Text: "Discover Our Space Adventure Collection." Date and time: "One Week from Today, 8 PM EST." Add "Set a Reminder" button, brand's logo, and social media icons (Instagram, Facebook, YouTube).
          </p>
          <div className='grid grid-cols-2 grid-rows-2 gap-2'>
            <Image src={toyBrand1}></Image>
            <Image src={toyBrand2}></Image>
            <Image src={toyBrand3}></Image>
            <Image src={toyBrand4}></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratedTab;
