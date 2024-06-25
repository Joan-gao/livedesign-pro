import React, { InputHTMLAttributes, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTimes } from "@fortawesome/free-solid-svg-icons";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onPressEnter: () => void;
}
interface PreviewImage {
  url: string;
  id: string;
}
const DesignPage: React.FC<Props> = () => {
  // User's input
  // const [message, setMessage] = useState("");

  const [inputValue, setInputValue] = useState("");
  // For regeneration
  const [prompt, setPrompt] = useState("");

  // For prompt return from midjourney
  const [botMessage, setBotMessage] = useState("");
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  // For images return form midjourney
  // const [imageArray, setImageArray] = useState<string[]>(Array(4).fill(""));
  const [previewImage, setPreviewImage] = useState<PreviewImage | null>(null);
  const [placeholderIMG1, setPlaceholderIMG1] = useState(
    "https://anai-9atmfta1xwyli1hklmwd-assets.s3.ap-southeast-2.amazonaws.com/5lVaoQAxDn9e55u7qNF5.jpg"
  );
  const [placeholderIMG2, setPlaceholderIMG2] = useState(
    "https://anai-9atmfta1xwyli1hklmwd-assets.s3.ap-southeast-2.amazonaws.com/oXqKXlvxZSqV9ivfWZ21.jpg"
  );
  const [placeholderIMG3, setPlaceholderIMG3] = useState(
    "https://anai-9atmfta1xwyli1hklmwd-assets.s3.ap-southeast-2.amazonaws.com/u8LhInJHbwuu5DntvP5Z.jpg"
  );
  const [placeholderIMG4, setPlaceholderIMG4] = useState(
    "https://anai-9atmfta1xwyli1hklmwd-assets.s3.ap-southeast-2.amazonaws.com/AUDbh5NsUMK82HcC6F60.jpg"
  );

  const navigate = useNavigate();
  const handleEditClick = async (imageId: string) => {
    let imageUrl;
    if (imageId && imageId == "Design1") {
      imageUrl = placeholderIMG1;
    } else if (imageId && imageId == "Design2") {
      imageUrl = placeholderIMG2;
    } else if (imageId && imageId == "Design3") {
      imageUrl = placeholderIMG3;
    } else {
      imageUrl = placeholderIMG4;
    }
    setIsPreviewVisible(true);
    setPreviewImage({ url: imageUrl, id: imageId });
  };
  // Show Image Preview and Enable 'Select' Button
  const handleEdit = async () => {
    console.log(previewImage);
    if (inputValue && inputValue.trim() !== "") {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/edit",
          { imageUrl: previewImage!.url, prompt: inputValue },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );

        const data = response.data;
        console.log(data);
        if (data.response.images) {
          setBotMessage("Selected Image is re-generated");
          if (previewImage!.id == "Design1") {
            setPlaceholderIMG1(data.response.images);
          } else if (previewImage!.id == "Design2") {
            setPlaceholderIMG2(data.response.images);
          } else if (previewImage!.id == "Design3") {
            setPlaceholderIMG3(data.response.images);
          } else {
            setPlaceholderIMG4(data.response.images);
          }
        } else {
          setBotMessage(data.response.error);
        }

        // clear user'sinput
        setInputValue("");
      } catch (error) {
        setBotMessage("Error occured during generating images");
      }
    } else {
      setBotMessage(
        "You haven't enter any description yet ,please enter description in the textbox downbelow  to generate images first "
      );
    }
  };

  // Closing Preview and Disabling 'Select' Button
  const handleClosePreview = () => {
    setIsPreviewVisible(false);
  };

  // Bring Selected Images to the Final Design Page
  const handleSelectDesign = () => {};
  const handleGenerate = async () => {
    if (inputValue && inputValue.trim() !== "") {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/generate",
          { message: inputValue },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );

        const data = response.data;
        console.log(data);
        if (data.response.images) {
          setBotMessage("Below are the images generated");

          setPlaceholderIMG1(data.response.images[0]);
          setPlaceholderIMG2(data.response.images[1]);
          setPlaceholderIMG3(data.response.images[2]);
          setPlaceholderIMG4(data.response.images[3]);
        } else {
          setBotMessage(data.response.error);
        }
        // Save user's input incase re-generation for later
        setPrompt(inputValue);

        // clear user'sinput
        setInputValue("");
      } catch (error) {
        setBotMessage("Error occured during generating images");
      }
    } else {
      setBotMessage(
        "You haven't enter any description yet ,please enter description in the textbox downbelow  to generate images first "
      );
    }
  };
  const handleKeydown = () => {
    if (previewImage == null) {
      handleGenerate();
      console.log("Generation is executed");
    } else {
      handleEdit();
      console.log("Edit is executed");
    }
  };
  const handleRegenerate = async () => {
    if (prompt && prompt.trim() !== "") {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/re-generate",
          { prompt: prompt },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        const data = response.data;
        console.log(data);
        if (data.response.images) {
          setBotMessage("Images regnerated for you");
          setPlaceholderIMG1(data.response.images[0]);
          setPlaceholderIMG2(data.response.images[1]);
          setPlaceholderIMG3(data.response.images[2]);
          setPlaceholderIMG4(data.response.images[3]);
        } else {
          setBotMessage(data.response.error);
        }
      } catch (error) {
        setBotMessage("Error occured during generating images");
      }
    } else {
      setBotMessage(
        "You haven't generate any images yet,please enter description in the textbox downbelow  to generate images first "
      );
    }
  };

  return (
    <div className="z-101 absolute top-0 h-screen w-screen grid place-items-center">
      <div className="w-375 h-667 relative top-0 flex flex-col place-items-center bg-[#240F14] rounded-25 snap-mandatory snap-y z-10">
        {/* Navigation to previous page and Page Title */}
        <div className="sticky top-0 left-0 w-full h-12 flex justify-around items-center">
          <div className="absolute w-4/5 top-0 h-12 flex items-center z-10 m-auto">
            <Link to="/FrontPage">
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="text-base text-white cursor-pointer"
              />
            </Link>
          </div>
          <h2 className="text-sm font-medium text-white text-shadow px-10 py-0">
            Event Page Generator
          </h2>
        </div>

        <div className="flex flex-col w-4/5 gap-2">
          {/* Ai Text Responses */}
          <p className="text-[#CC8F99]">AI Bot</p>
          <div className="text-white text-base text-left bg-[#4A2129] border-none rounded-xl h-fit px-3 py-3">
            <p className="text-white">{botMessage}</p>
          </div>

          {/* Ai Design Output (4 designs) */}
          <div className="grid grid-cols-2 gap-3 mt-3.5">
            <div className="relative bg-[#4A2129] h-32 rounded-xl overflow-hidden">
              <img
                id="Design1"
                className="w-full h-full overflow-hidden"
                src={placeholderIMG1}
                alt="Generated Design"
              ></img>
              <button
                className="absolute bottom-2 right-2 z-10 text-white text-base bg-[#FC2B55] border-none rounded-md py-1.5 px-5"
                onClick={() => handleEditClick("Design1")}
              >
                Edit
              </button>
            </div>

            <div className="relative bg-[#4A2129] h-32 rounded-xl overflow-hidden">
              <img
                id="Design2"
                className="w-full h-full overflow-hidden"
                src={placeholderIMG2}
                alt="Generated Design"
              ></img>
              <button
                className="absolute bottom-2 right-2 z-10 text-white text-base bg-[#FC2B55] border-none rounded-md py-1.5 px-5"
                onClick={() => handleEditClick("Design2")}
              >
                Edit
              </button>
            </div>

            <div className="relative bg-[#4A2129] h-32 rounded-xl overflow-hidden">
              <img
                id="Design3"
                className="w-full h-full overflow-hidden"
                src={placeholderIMG3}
                alt="Generated Design"
              ></img>
              <button
                className="absolute bottom-2 right-2 z-10 text-white text-base bg-[#FC2B55] border-none rounded-md py-1.5 px-5"
                onClick={() => handleEditClick("Design3")}
              >
                Edit
              </button>
            </div>

            <div className="relative bg-[#4A2129] h-32 rounded-xl overflow-hidden">
              <img
                id="Design4"
                className="w-full h-full overflow-hidden"
                src={placeholderIMG4}
                alt="Generated Design"
              ></img>
              <button
                className="absolute bottom-2 right-2 z-10 text-white text-base bg-[#FC2B55] border-none rounded-md py-1.5 px-5"
                onClick={() => handleEditClick("Design4")}
              >
                Edit
              </button>
            </div>
          </div>

          {/* User Interaction Section */}
          <div className="absolute flex flex-col w-full bottom-5 gap-3">
            <div className="flex flex-row w-4/5 gap-3">
              {/* Select and Regenerate Buttons */}
              <button
                id="selectDesign"
                onClick={handleSelectDesign}
                className="bg-[#FC2B55] text-white text-center w-1/2 border-none rounded-md py-1.5 px-6 opacity-60 cursor-default"
                aria-disabled="true"
              >
                Select
              </button>

              <button
                className="bg-[#4A2129] text-white text-center w-1/2 border-none rounded-md py-1.5 px-6"
                onClick={handleRegenerate}
              >
                Regenerate
              </button>
            </div>
            <div className="flex flex-row w-4/5 gap-3 items-center">
              {/* User Prompt box */}
              <textarea
                id="userPrompt"
                className="text-white text-sm text-left bg-[#4A2129] border-none rounded-md w-full h-24 py-1.5 px-3"
                placeholder="Enter your text here"
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setInputValue(e.target.value)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                  if (e.key === "Enter") {
                    handleKeydown();
                  }
                }}
              />

              {/* Preview of Selected Image */}
              {isPreviewVisible && (
                <div className="w-2/5 h-2/5 flex items-center justify-center bg-opacity-75">
                  <div className="flex relative rounded-lg">
                    <button
                      className="absolute top-[-6px] right-[6px] text-gray-500 z-20 bg-white rounded-sm rotate-90"
                      onClick={handleClosePreview}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <img
                      id="previewImage"
                      src={previewImage!.url}
                      alt="Preview"
                      className="max-w-full max-h-full rounded-md z-10"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignPage;
