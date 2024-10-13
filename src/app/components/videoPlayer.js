"use client";
import { useRef, useEffect, useState } from 'react';

const VideoPlayer = ({ isVisible, onClose }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isVisible && videoRef.current) {
      const playVideo = async () => {
        try {
          await videoRef.current.play();
          if (videoRef.current.requestFullscreen) {
            await videoRef.current.requestFullscreen();
          }
          setIsPlaying(true);
        } catch (error) {
          console.error("Failed to play video:", error);
        }
      };
      playVideo();
    }
  }, [isVisible]);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="relative w-full h-auto bg-black flex justify-center items-center">
      <div className="relative">
        <video
          ref={videoRef}
          className="max-w-[100%] max-h-[100vh] aspect-video"
          controls
        >
          <source src="/assets/video/big_buck_bunny.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <button
          onClick={onClose}
          className="absolute top-0 left-0 mt-2 ml-2 px-3 py-2 bg-transparent text-white rounded-full text-2xl font-bold"
        >
          X
        </button>
        {!isPlaying && (
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center text-white text-4xl"
          >
            ▶
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;