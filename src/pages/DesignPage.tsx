import React from 'react';
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {}

const DesignPage: React.FC<Props> = () => {
  const StickerIcon = <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.9167 0H5.41675C2.51854 0.00310025 0.169848 2.35179 0.166748 5.25V12.75C0.169848 15.6482 2.51854 17.9969 5.41675 18H9.91675C9.99735 17.9999 10.0774 17.9869 10.1539 17.9616C12.613 17.1413 17.308 12.4462 18.1283 9.98719C18.1537 9.91068 18.1667 9.83061 18.1667 9.75V5.25C18.1636 2.35179 15.815 0.00310025 12.9167 0V0ZM1.66675 12.75V5.25C1.66675 3.17893 3.34568 1.5 5.41675 1.5H12.9167C14.9878 1.5 16.6667 3.17893 16.6667 5.25V9H14.4167C11.5185 9.0031 9.16985 11.3518 9.16675 14.25V16.5H5.41675C3.34568 16.5 1.66675 14.8211 1.66675 12.75V12.75ZM10.6667 16.0444V14.25C10.6667 12.1789 12.3457 10.5 14.4167 10.5H16.2111C15.073 12.3281 12.4949 14.9062 10.6667 16.0444V16.0444Z" fill="white"/></svg>
  const TextIcon = <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.67887 0.930313C7.55523 0.667286 7.29076 0.499371 7.00012 0.499371C6.70949 0.499371 6.44501 0.667286 6.32137 0.930313L0.321372 13.6803C0.207326 13.9228 0.231312 14.2077 0.384296 14.4277C0.537279 14.6477 0.796017 14.7694 1.06305 14.747C1.33007 14.7245 1.56483 14.5612 1.67887 14.3188L3.24075 11H10.7595L12.3214 14.3188C12.4354 14.5612 12.6702 14.7245 12.9372 14.747C13.2042 14.7694 13.463 14.6477 13.6159 14.4277C13.7689 14.2077 13.7929 13.9228 13.6789 13.6803L7.67887 0.930313ZM3.94668 9.5L7.00012 3.01156L10.0536 9.5H3.94668ZM18.2501 5C17.0539 5 16.1192 5.32531 15.4723 5.9675C15.1907 6.2611 15.1945 6.72571 15.4809 7.01467C15.7673 7.30362 16.2319 7.31153 16.5279 7.0325C16.8842 6.67906 17.4654 6.5 18.2501 6.5C19.4904 6.5 20.5001 7.34375 20.5001 8.375V8.67688C19.8346 8.23159 19.0509 7.99583 18.2501 8C16.182 8 14.5001 9.51406 14.5001 11.375C14.5001 13.2359 16.182 14.75 18.2501 14.75C19.0512 14.7535 19.835 14.5168 20.5001 14.0703C20.5195 14.4845 20.8711 14.8046 21.2853 14.7852C21.6995 14.7657 22.0195 14.4142 22.0001 14V8.375C22.0001 6.51406 20.3182 5 18.2501 5V5ZM18.2501 13.25C17.0098 13.25 16.0001 12.4062 16.0001 11.375C16.0001 10.3438 17.0098 9.5 18.2501 9.5C19.4904 9.5 20.5001 10.3438 20.5001 11.375C20.5001 12.4062 19.4904 13.25 18.2501 13.25V13.25Z" fill="white"/></svg>
  const AudioIcon = <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.549 2.28188L9.049 0.0318749C8.82194 -0.0362808 8.57603 0.00692388 8.38581 0.148392C8.19558 0.289861 8.08344 0.512937 8.08337 0.75V10.8994C6.50051 9.48362 4.14332 9.36716 2.42861 10.62C0.713893 11.8728 0.108445 14.1539 0.976167 16.0922C1.84389 18.0305 3.94856 19.0983 6.02517 18.6538C8.10178 18.2094 9.58502 16.3736 9.58337 14.25V6.25781L16.1177 8.21813C16.3448 8.28628 16.5907 8.24308 16.7809 8.10161C16.9712 7.96014 17.0833 7.73706 17.0834 7.5V3C17.0833 2.66892 16.8661 2.37706 16.549 2.28188V2.28188ZM5.08337 17.25C3.42652 17.25 2.08337 15.9069 2.08337 14.25C2.08337 12.5931 3.42652 11.25 5.08337 11.25C6.74023 11.25 8.08337 12.5931 8.08337 14.25C8.08337 15.9069 6.74023 17.25 5.08337 17.25V17.25ZM15.5834 6.49219L9.58337 4.69219V1.75781L15.5834 3.5625V6.49219Z" fill="white"/></svg>
  const FilterIcon = <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.0231 12.0994L12.1847 10.3181L10.4034 5.47594C10.1874 4.88898 9.62827 4.499 9.00281 4.499C8.37736 4.499 7.81824 4.88898 7.60219 5.47594L5.81906 10.3125L0.976875 12.0938C0.389921 12.3098 -6.13928e-05 12.8689 -6.13928e-05 13.4944C-6.13928e-05 14.1198 0.389921 14.6789 0.976875 14.895L5.8125 16.6875L7.59375 21.5269C7.8098 22.1138 8.36892 22.5038 8.99438 22.5038C9.61983 22.5038 10.1789 22.1138 10.395 21.5269L12.1763 16.6884L17.0184 14.9072C17.6054 14.6911 17.9954 14.132 17.9954 13.5066C17.9954 12.8811 17.6054 12.322 17.0184 12.1059L17.0231 12.0994ZM11.6616 15.2812C11.2513 15.4318 10.9281 15.7551 10.7775 16.1653L8.99625 20.9897L7.21875 16.1616C7.06809 15.7536 6.74644 15.4319 6.33844 15.2812V15.2812L1.51406 13.5L6.33844 11.7188C6.74644 11.5681 7.06809 11.2464 7.21875 10.8384L9 6.01406L10.7812 10.8384C10.9318 11.2487 11.2551 11.5719 11.6653 11.7225L16.4897 13.5037L11.6616 15.2812ZM12 3.75C12 3.33579 12.3358 3 12.75 3H14.25V1.5C14.25 1.08579 14.5858 0.75 15 0.75C15.4142 0.75 15.75 1.08579 15.75 1.5V3H17.25C17.6642 3 18 3.33579 18 3.75C18 4.16421 17.6642 4.5 17.25 4.5H15.75V6C15.75 6.41421 15.4142 6.75 15 6.75C14.5858 6.75 14.25 6.41421 14.25 6V4.5H12.75C12.3358 4.5 12 4.16421 12 3.75V3.75ZM21.75 8.25C21.75 8.66421 21.4142 9 21 9H20.25V9.75C20.25 10.1642 19.9142 10.5 19.5 10.5C19.0858 10.5 18.75 10.1642 18.75 9.75V9H18C17.5858 9 17.25 8.66421 17.25 8.25C17.25 7.83579 17.5858 7.5 18 7.5H18.75V6.75C18.75 6.33579 19.0858 6 19.5 6C19.9142 6 20.25 6.33579 20.25 6.75V7.5H21C21.4142 7.5 21.75 7.83579 21.75 8.25V8.25Z" fill="white"/></svg>
  const MoreIcon = <svg width="22" height="6" viewBox="0 0 22 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.1666 0C9.50977 0 8.16663 1.34315 8.16663 3C8.16663 4.65685 9.50977 6 11.1666 6C12.8235 6 14.1666 4.65685 14.1666 3C14.1666 1.34315 12.8235 0 11.1666 0V0ZM11.1666 4.5C10.3382 4.5 9.66663 3.82843 9.66663 3C9.66663 2.17157 10.3382 1.5 11.1666 1.5C11.9951 1.5 12.6666 2.17157 12.6666 3C12.6666 3.82843 11.9951 4.5 11.1666 4.5V4.5ZM3.66663 0C2.00977 0 0.666626 1.34315 0.666626 3C0.666626 4.65685 2.00977 6 3.66663 6C5.32348 6 6.66663 4.65685 6.66663 3C6.66663 1.34315 5.32348 0 3.66663 0V0ZM3.66663 4.5C2.8382 4.5 2.16663 3.82843 2.16663 3C2.16663 2.17157 2.8382 1.5 3.66663 1.5C4.49505 1.5 5.16663 2.17157 5.16663 3C5.16663 3.82843 4.49505 4.5 3.66663 4.5V4.5ZM18.6666 0C17.0098 0 15.6666 1.34315 15.6666 3C15.6666 4.65685 17.0098 6 18.6666 6C20.3235 6 21.6666 4.65685 21.6666 3C21.6666 1.34315 20.3235 0 18.6666 0V0ZM18.6666 4.5C17.8382 4.5 17.1666 3.82843 17.1666 3C17.1666 2.17157 17.8382 1.5 18.6666 1.5C19.4951 1.5 20.1666 2.17157 20.1666 3C20.1666 3.82843 19.4951 4.5 18.6666 4.5V4.5Z" fill="white"/></svg>


  return (
    <div className="z-101 absolute top-0 h-screen w-screen grid place-items-center">
      <div className="w-375 h-667 relative top-0 flex flex-col place-items-center bg-[#240F14] rounded-25 snap-mandatory snap-y z-10">
        <div className="sticky top-0 left-0 w-full h-12 flex justify-around items-center">
          <div className='flex flex-row w-4/5 justify-between items-center'>
            <Link to="/"><FontAwesomeIcon icon={faTimes} className='text-base text-white cursor-pointer'/></Link>
            {TextIcon}
            {StickerIcon}
            {AudioIcon}
            {FilterIcon}
            {MoreIcon}
          </div>
        </div>
        
        {/* Include Image For Posting Below */}
        <div></div>

        <button className="absolute bottom-5 bg-[#FC2B55] text-white w-4/5 border-none rounded-md py-1.5 px-6">Publish</button>
      </div>
    </div>
  );
};

export default DesignPage;