import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ExamplesTab from "../components/GenerationPage/ExamplesTab";
import CreationTab from "../components/GenerationPage/CreationTab";
import "../css/main.css";
import "../css/scrollbar.css";
import axios from "axios";

import {
  Button,
  Space,
  NotificationArgsProps,
  notification,
  Alert,
  Flex,
  Spin,
} from "antd";

type NotificationPlacement = NotificationArgsProps["placement"];

export interface ExampleProps {
  prompt: string;
  img1: string;
  img2: string;
  img3: string;
  img4: string;
  model: string | null; // Update type to allow null
  aspectRatio: string | null; // Update type to allow null
}

const GenerationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("1");
  const [inputValue, setInputValue] = useState<string>("");
  const navigate = useNavigate();
  const loadingRef = useRef<HTMLDivElement>(null);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Notification`,
      description: "Please Enter Prompt and Select Style before Generating",
      placement,
    });
  };

  // Initialize data object with default values
  const [data, setData] = useState<ExampleProps>({
    prompt: "",
    img1: "",
    img2: "",
    img3: "",
    img4: "",
    model: null, // Initialize model as null
    aspectRatio: null, // Initialize aspectRatio as null
  });

  const handleSwitchToTab1 = () => {
    setActiveTab("1");
  };

  const handleSwitchToTab2 = () => {
    setActiveTab("2");
  };

  const handleGenerate = async () => {
    const loading = document.getElementById("loading");

    if (loading) {
      loading.style.display = "block";
    }

    if (loadingRef.current) {
      loadingRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Check if inputValue, model, and aspectRatio are populated
    if (!inputValue || !data.model || !data.aspectRatio) {
      openNotification("top");
    } else {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/generate",
          { message: data },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        console.log(response.data.response.images);

        if (response.data.response.images) {
          const images = response.data.response.images;
          data.img1 = images[0];
          data.img2 = images[1];
          data.img3 = images[2];
          data.img4 = images[3];
        }
        console.log("test");
        console.log(data.prompt); // Check if data.prompt is correctly set
        // //Set images
        // data.img1 =
        //   "https://cdn.apiframe.pro/images/592383153187211210559832-1.png";
        // data.img2 =
        //   "https://cdn.apiframe.pro/images/592383153187211210559832-1.png";
        // data.img3 =
        //   "https://cdn.apiframe.pro/images/592383153187211210559832-1.png";
        // data.img4 =
        //   "https://cdn.apiframe.pro/images/592383153187211210559832-1.png";
        // Navigate to ChatPage with updated data
        navigate("/ChatPage", { state: { data } });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }

    if (loading) {
      loading.style.display = "none";
    }
  };

  return (
    <div className="z-101 absolute top-0 h-screen w-screen grid place-items-center">
      <div
        id="loading"
        ref={loadingRef}
        className="hidden absolute top-0 w-full h-full bg-black opacity-80 z-50"
      >
        <Flex gap="small" vertical>
          <Flex gap="small z">
            <div className="absolute inset-x-1/2 inset-y-1/2 z-50">
              <Spin tip="Loading" size="large"></Spin>
            </div>
          </Flex>
        </Flex>
        <h1 className="absolute flex w-full m-auto text-white items-center justify-center inset-y-2/3 z-60">
          AI is generating images <br /> please wait a moment
        </h1>
      </div>

      <div
        id="custom-scrollbar"
        className="w-375 h-667 max-h-full relative top-0 flex flex-col gap-3 place-items-center bg-[#240F14] rounded-25 snap-mandatory snap-y z-10 overflow-x-hidden overflow-scroll"
      >
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
        <div className="flex flex-row gap-6 self-center w-fit h-fit px-6 py-2 bg-[#4A2129] rounded-md">
          <button
            onClick={handleSwitchToTab1}
            className={`${activeTab === "1" ? "text-white" : "text-[#240F14]"}`}
          >
            Creation
          </button>
          <button
            onClick={handleSwitchToTab2}
            className={`${activeTab === "2" ? "text-white" : "text-[#240F14]"}`}
          >
            Examples
          </button>
        </div>

        <div
          id="tabSection"
          className="flex flex-col gap-4 place-items-center w-full h-[579px]"
        >
          {activeTab === "1" && (
            <div>
              <CreationTab
                inputValue={inputValue}
                setInputValue={setInputValue}
                setData={setData}
              />
            </div>
          )}
          {activeTab === "2" && <ExamplesTab />}
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
