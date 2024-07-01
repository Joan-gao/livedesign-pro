import React, { useState} from 'react';
import animatedStyle from './Assets/animatedExample.jpg';
import realisticStyle from './Assets/realisticExample.jpg';

interface Props {
  inputValue: string;
  setInputValue: (value: string) => void;
}

const CreationTab: React.FC<Props> = ({ inputValue, setInputValue }) => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string | null>(null);

  const models = [
    {
      name: 'Realistic',
      imgSrc: realisticStyle,
    },
    {
      name: 'Animated',
      imgSrc: animatedStyle,
    },
  ];

  // Handle Model Selection
  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
  };

  // Handle Aspect Ratio Selection
  const handleAspectRatioSelect = (aspectRatio: string) => {
    setSelectedAspectRatio(aspectRatio);
  };

  return (
    <div className="w-375 top-0 flex flex-col place-items-center bg-[#240F14] rounded-25 snap-mandatory snap-y z-10">
      <div className="flex flex-col w-[90%] mx-auto gap-4">
        {/* Ai Text Responses */}
        <p className="text-[#CC8F99]">Descriptions</p>
        <div className="w-full gap-3">
          {/* User Prompt box */}
          <textarea
            id="userPrompt"
            className="text-white text-sm text-left bg-[#4A2129] border-none rounded-md w-full h-24 py-1.5 px-3 resize-none"
            placeholder="Enter your text here"
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setInputValue(e.target.value)
            }
          />
        </div>

        <p className="text-[#CC8F99]">Select Model</p>
        <div className='grid justify-center grid-rows-[auto] grid-cols-3 gap-2'>
          {models.map((model, index) => (
            <div
              key={index}
              className={`flex flex-col items-center cursor-pointer border-2 ${
                selectedModel === model.imgSrc ? 'border-[#4A2129] border-[4px] rounded-md' : 'border-transparent'
              }`}
              onClick={() => handleModelSelect(model.imgSrc)}
            >
              <img className="w-full h-full object-cover" src={model.imgSrc} alt={model.name} />
              <p className='text-white'>{model.name}</p>
            </div>
          ))}
        </div>

        <p className="text-[#CC8F99]">Aspect Ratio</p>
        <div className='flex flex-row items-center gap-4'>
          <button
            className={`rounded-md w-[100px] h-[100px] flex flex-col items-center justify-center border-4 ${
              selectedAspectRatio === '1:1' ? 'border-[#4A2129] bg-[#4A2129]' : 'border-[#4A2129] bg-transparent'
            }`}
            onClick={() => handleAspectRatioSelect('1:1')}
          >
            <div className='border-2 border-white border-solid w-[40px] h-[40px]'></div>
            <p className='text-white'>1:1</p>
          </button>
          <button
            className={`rounded-md w-[100px] h-[100px] flex flex-col items-center justify-center border-4 ${
              selectedAspectRatio === '9:16' ? 'border-[#4A2129] bg-[#4A2129]' : 'border-[#4A2129] bg-transparent'
            }`}
            onClick={() => handleAspectRatioSelect('9:16')}
          >
            <div className='border-2 border-white border-solid w-[32px] h-[64px]'></div>
            <p className='text-white'>9:16</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreationTab;
