import React, { useEffect, useState, useRef, useMemo } from "react";
import "../App.css";
import VideoCard from "../components/VideoCard";
import BottomNavbar from "../components/BottomNavbar";
import TopNavbar from "../components/TopNavbar";

import { useLocation } from "react-router-dom";
import DesignSection from "../components/DesignPage/DesignSection";
import FooterLeft from "../components/FooterLeft";
import FooterRight from "../components/FooterRight";
import DraggableResizable from "../components/DesignPage/DraggableResizable";

import { Button, Space, notification } from "antd";
import type { NotificationArgsProps } from "antd";
import axios from "axios";
type NotificationType = "success" | "info" | "warning" | "error";

// Define the structure of a video object
interface Video {
  url: string;
  profilePic: string;
  username: string;
  description: string;
  song: string;
  likes: number | string;
  comments: number;
  saves: number;
  shares: number;
}

// This array holds information about different videos
const videoUrls: Video[] = [
  {
    url: require("../videos/video1.mp4"),
    profilePic:
      "https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/9d429ac49d6d18de6ebd2a3fb1f39269~c5_100x100.jpeg?x-expires=1688479200&x-signature=pjH5pwSS8Sg1dJqbB1GdCLXH6ew%3D",
    username: "csjackie",
    description: "Lol nvm #compsci #chatgpt #ai #openai #techtok",
    song: "Original sound - Famed Flames",
    likes: 430,
    comments: 13,
    saves: 23,
    shares: 1,
  },
  {
    url: require("../videos/video2.mp4"),
    profilePic:
      "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/eace3ee69abac57c39178451800db9d5~c5_100x100.jpeg?x-expires=1688479200&x-signature=wAkVmwL7lej15%2B16ypSWQOqTP8s%3D",
    username: "dailydotdev",
    description:
      "Every developer brain @francesco.ciulla #developerjokes #programming #programminghumor #programmingmemes",
    song: "tarawarolin wants you to know this isnt my sound - Chaplain J Rob",
    likes: "13.4K",
    comments: 3121,
    saves: 254,
    shares: 420,
  },
  {
    url: require("../videos/video3.mp4"),
    profilePic:
      "https://p77-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4e6698b235eadcd5d989a665704daf68~c5_100x100.jpeg?x-expires=1688479200&x-signature=wkwHDKfNuIDqIVHNm29%2FRf40R3w%3D",
    username: "wojciechtrefon",
    description:
      "#programming #softwareengineer #vscode #programmerhumor #programmingmemes",
    song: "help so many people are using my sound - Ezra",
    likes: 5438,
    comments: 238,
    saves: 12,
    shares: 117,
  },
  {
    url: require("../videos/video4.mp4"),
    profilePic:
      "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4bda52cf3ad31c728153859262c329db~c5_100x100.jpeg?x-expires=1688486400&x-signature=ssUbbCpZFJj6uj33D%2BgtcqxMvgQ%3D",
    username: "faruktutkus",
    description:
      "Wait for the end | Im RTX 4090 TI | #softwareengineer #softwareengineer #coding #codinglife #codingmemes ",
    song: "orijinal ses - Computer Science",
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
  },
];

type NotificationPlacement = NotificationArgsProps["placement"];

const Context = React.createContext({ name: "Default" });

const Index: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const location = useLocation();
  const imageData = location.state?.image;
  const audio = location.state?.audio;
  const pageData = location.state?.pageData;

  useEffect(() => {
    setVideos(videoUrls);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8, // Adjust this value to change the scroll trigger point
    };

    // This function handles the intersection of videos
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const videoElement = entry.target as HTMLVideoElement;
        // if (entry.isIntersecting) {
        //   videoElement.play();
        // } else {
        //   videoElement.pause();
        // }
        videoElement.pause()
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    // We observe each video reference to trigger play/pause
    videoRefs.current.forEach((videoRef) => {
      if (videoRef) {
        observer.observe(videoRef);
      }
    });

    // We disconnect the observer when the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, [videos]);

  // This function handles the reference of each video
  const handleVideoRef = (index: number) => (ref: HTMLVideoElement | null) => {
    videoRefs.current[index] = ref;
  };

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = async (type: NotificationType) => {
    console.log("Notification type:", type); // Add this line for debugging
    api[type]({
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    });
  };
  const optimizePageDataCaption = async () => {
    if (pageData.caption) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/optimize/caption",
          { message: pageData.caption },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        console.log(response.data.response);

        if (response.data.response) {
          pageData.caption = response.data.response;
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      console.log(
        "Can't optimize caption, because there is no caption content"
      );
    }
  };

  return (
    <div className="container">
      <TopNavbar className="top-navbar" />

      {pageData ? (
        <div className="video">
          <div className="player">
            <DesignSection imageData={pageData.image} />
            {pageData.stickers.map((item: any) => (
              <DraggableResizable
                key={item.id}
                id={item.id}
                x={item.x}
                y={item.y}
                width={item.width}
                height={item.height}
                type={item.type}
                src={item.src}
                text={item.text}
                link={item.link}
                advanced={item.advanced}
                textStyles={item.text ? item.textStyles : {}}
                onDragStop={() => {}} // Disable dragging in the published view
                onResizeStop={() => {}} // Disable resizing in the published view
                onSelect={() => {}} // Disable selection in the published view
                selected={false} // No selection in the published view
                onUpdate={() => {}} // No updates in the published view
                setIsEditing={() => {}} // No editing in the published view
                published={true} // 确保传递 published 属性
              />
            ))}
          </div>

          <div className="bottom-controls">
            <div className="footer-left">
              <FooterLeft
                username={"Test"}
                description={pageData.caption}
                song={pageData.audio}
              />
            </div>
            <div className="footer-right">
              <FooterRight
                likes={0}
                shares={0}
                comments={0}
                saves={0}
                profilePic={
                  "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/eace3ee69abac57c39178451800db9d5~c5_100x100.jpeg?x-expires=1688479200&x-signature=wAkVmwL7lej15%2B16ypSWQOqTP8s%3D"
                }
              />
            </div>
          </div>
        </div>
      ) : null}

      {videos.map((video, index) => (
        <VideoCard
          key={index}
          username={video.username}
          description={video.description}
          song={video.song}
          likes={video.likes}
          saves={video.saves}
          comments={video.comments}
          shares={video.shares}
          url={video.url}
          profilePic={video.profilePic}
          setVideoRef={handleVideoRef(index)}
          autoplay={index === 0}
        />
      ))}
      <BottomNavbar className="bottom-navbar" />
    </div>
  );
};

export default Index;
