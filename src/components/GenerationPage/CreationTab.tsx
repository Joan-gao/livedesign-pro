import React, { useState } from "react";

interface Props {}

const CreationTab: React.FC<Props> = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string | null>(
    null
  );

  const models = [
    {
      name: "Animated",
      imgSrc:
        "https://anai-9atmfta1xwyli1hklmwd-assets.s3.ap-southeast-2.amazonaws.com/5lVaoQAxDn9e55u7qNF5.jpg",
    },
    {
      name: "Realistic",
      imgSrc:
        "https://anai-9atmfta1xwyli1hklmwd-assets.s3.ap-southeast-2.amazonaws.com/oXqKXlvxZSqV9ivfWZ21.jpg",
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
        <div className="grid justify-center grid-rows-[auto] grid-cols-3 gap-2">
          {models.map((model, index) => (
            <div
              key={index}
              className={`flex flex-col items-center cursor-pointer border-2 ${
                selectedModel === model.imgSrc
                  ? "border-[#4A2129] border-[4px] rounded-md"
                  : "border-transparent"
              }`}
              onClick={() => handleModelSelect(model.imgSrc)}
            >
              <img
                className="w-full h-full overflow-hidden"
                src={model.imgSrc}
                alt={model.name}
              />
              <p className="text-white">{model.name}</p>
            </div>
          ))}
        </div>

        <p className="text-[#CC8F99]">Aspect Ratio</p>
        <div className="flex flex-row items-center gap-4">
          <button
            className={`rounded-md w-[100px] h-[100px] flex flex-col items-center justify-center border-4 ${
              selectedAspectRatio === "1:1"
                ? "border-[#4A2129] bg-[#4A2129]"
                : "border-[#4A2129] bg-transparent"
            }`}
            onClick={() => handleAspectRatioSelect("1:1")}
          >
            <div className="border-2 border-white border-solid w-[40px] h-[40px]"></div>
            <p className="text-white">1:1</p>
          </button>
          <button
            className={`rounded-md w-[100px] h-[100px] flex flex-col items-center justify-center border-4 ${
              selectedAspectRatio === "9:16"
                ? "border-[#4A2129] bg-[#4A2129]"
                : "border-[#4A2129] bg-transparent"
            }`}
            onClick={() => handleAspectRatioSelect("9:16")}
          >
            <div className="border-2 border-white border-solid w-[32px] h-[64px]"></div>
            <p className="text-white">9:16</p>
          </button>
        </div>

        <button className="bg-[#FC2B55] text-white w-full border-none rounded-md py-1.5 px-6">
          Generate
        </button>
      </div>
    </div>
  );
};

export default CreationTab;
