import React from 'react';
import Responses from './Responses';
import examplesData from './data/Examples';

const GeneratedTab: React.FC = () => {

  return (
    <div className="relative w-375 left-[12px] top-0 flex flex-col gap-6 pb-6 place-items-center bg-[#240F14] rounded-md snap-mandatory snap-y z-10">
      {examplesData.map((example, index) => (
        <Responses key={index} data={example} />
      ))}
    </div>
  );
};

export default GeneratedTab;
