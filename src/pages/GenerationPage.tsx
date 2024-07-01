import React, { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ExamplesTab from '../components/GenerationPage/ExamplesTab';
import CreationTab from '../components/GenerationPage/CreationTab';
import "../css/main.css";
import "../css/scrollbar.css"

import { Button, Divider, notification, Space } from 'antd';
import type { NotificationArgsProps } from 'antd';

type NotificationPlacement = NotificationArgsProps['placement'];

const GenerationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('1');
  const [inputValue, setInputValue] = useState<string>('');
  const navigate = useNavigate();
  let data = "";

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Notification`,
      description:
        'Please Enter Prompt and Select Style before Generating',
      placement,
    });
  };

  const handleSwitchToTab1 = () => {
    const btn1 = document.getElementById('Button1');
    const btn2 = document.getElementById('Button2');
    const GenerateBtn = document.getElementById('GenerateBtn');

    if (btn1) btn1.style.color = "white";
    if (btn2) btn2.style.color = "#240F14";
    if (GenerateBtn) GenerateBtn.style.display = "block";

    setActiveTab('1');
  };

  const handleSwitchToTab2 = () => {
    const btn1 = document.getElementById('Button1');
    const btn2 = document.getElementById('Button2');
    const GenerateBtn = document.getElementById('GenerateBtn');

    if (btn2) btn2.style.color = "white";
    if (btn1) btn1.style.color = "#240F14";
    if (GenerateBtn) GenerateBtn.style.display = "none";

    setActiveTab('2');
  };

  const handleGenerate = () => {
    if (data) {
      navigate('/ChatPage', { state: {data: data} });
    } else {
      openNotification('top');
    }
  };

  return (
    <div className="z-101 absolute top-0 h-screen w-screen grid place-items-center">
      <div id='custom-scrollbar' className="w-375 h-667 max-h-full relative top-0 flex flex-col gap-3 place-items-center bg-[#240F14] rounded-25 snap-mandatory snap-y z-10 overflow-x-hidden overflow-scroll">
        {/* Navigation to previous page and Page Title */}
        <div className=" w-4/5 h-[48px] flex items-center gap">
          <div className="relative top-0 left-0 h-[48px] flex items-center z-10 z-10">
            <Link to="/FrontPage">
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="text-base text-white cursor-pointer"
              />
            </Link>
          </div>
          <h2 className="flex m-auto relative text-left text-sm font-medium text-white text-shadow py-0">
            Event Page Generator
          </h2>
        </div>

        {/* Tabs */}
        <div className='flex flex-row gap-6 self-center w-fit h-fit px-6 py-2 bg-[#4A2129] rounded-md'>
          <button
            onClick={handleSwitchToTab1}
            id="Button1"
            className={`text-white ${activeTab === '1' ? 'text-white' : 'text-[#240F14]'}`}
          >
            Creation
          </button>
          <button
            onClick={handleSwitchToTab2}
            id="Button2"
            className={`${activeTab === '2' ? 'text-white' : 'text-[#240F14]'}`}
          >
            Examples
          </button>
        </div>

        <div id='tabSection' className='flex flex-col gap-4 place-items-center w-full h-[579px]'>
          {activeTab === '1' && (
            <div>
              <CreationTab inputValue={inputValue} setInputValue={setInputValue} />
            </div>
          )}
          {activeTab === '2' && <ExamplesTab />}
          {contextHolder}
          <Space>
            <Button
              onClick={handleGenerate}
              className="absolute bottom-5 bg-[#FC2B55] left-[5%] text-center text-white w-[90%] border-none rounded-md py-1.5 px-6"
            >
              Generate
            </Button>
          </Space>
        </div>


      </div>
    </div>
  );
};

export default GenerationPage;
