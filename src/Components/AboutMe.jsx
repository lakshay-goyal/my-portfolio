import React, { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import Lakshay from '../assets/img/Lakshay.png';
import Resume from '../assets/pdf/Resume.pdf';
import VideoResume from '../assets/img/VideoResume.mp4';

function AboutMe() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const modalRef = useRef(null);

  const openVideoModal = () => setIsVideoModalOpen(true);
  
  const closeVideoModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsVideoModalOpen(false);
    setIsPlaying(false);
    setIsMuted(false);
    setProgress(0);
  };

  // Close modal when clicking outside the video
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeVideoModal();
      }
    };

    if (isVideoModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isVideoModalOpen]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progressPercent = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progressPercent);
    }
  };

  const handleProgressChange = (e) => {
    const manualChange = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = (manualChange / 100) * videoRef.current.duration;
      setProgress(manualChange);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  return (
    <>
      {/* Previous sections remain the same */}
      <section id="About" className="my-16 px-4 sm:px-8 md:px-16">
        <div className="flex justify-center text-3xl font-semibold mb-8">
          <h2 className="relative">
            About Me
            <div className="bg-black h-1 w-full rounded mt-2"></div>
          </h2>
        </div>
        
        <div className="flex flex-col-reverse bg-white shadow-lg rounded-lg overflow-hidden md:flex-row items-center">
          <div className="p-6 md:w-2/3 space-y-6">
            <p className="text-gray-700 leading-relaxed text-justify">
              I'm Lakshay Goyal, a K.R. Mangalam University BCA student passionate about innovation and technology. 
              My expertise lies in web and app development, leveraging DevOps techniques and APIs to create seamless 
              user experiences. I thrive on challenging problems and am driven by a continuous learning mindset.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={Resume}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors text-center"
              >
                Written Resume
              </a>
              
              <button
                onClick={openVideoModal}
                className="px-4 py-2 border border-indigo-500 text-indigo-500 rounded-md hover:bg-indigo-50 flex items-center justify-center gap-2"
              >
                <Play size={20} /> Video Resume
              </button>
            </div>
          </div>
          
          <div className="md:w-1/3 p-4">
            <img
              className="rounded-lg object-cover w-full h-auto shadow-md"
              src={Lakshay}
              alt="Lakshay Goyal"
            />
          </div>
        </div>
      </section>
      
      {/* Video Resume Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
          <div 
            ref={modalRef}
            className="relative bg-black rounded-xl shadow-2xl w-full max-w-4xl aspect-video"
          >
            <button 
              onClick={closeVideoModal} 
              className="absolute top-4 right-4 z-60 text-white hover:text-gray-300"
            >
              <X size={24} />
            </button>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <video 
                ref={videoRef}
                src={VideoResume} 
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={() => {
                  if (videoRef.current) {
                    videoRef.current.play();
                    setIsPlaying(true);
                  }
                }}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            
            {/* Video Controls remain the same */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 flex items-center space-x-4">
              <button onClick={togglePlay} className="text-white">
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              
              <button onClick={toggleMute} className="text-white">
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
              
              <input 
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleProgressChange}
                className="flex-grow mx-4 h-1 appearance-none bg-gray-600 rounded-full"
              />
              
              <button onClick={toggleFullscreen} className="text-white">
                <Maximize2 size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AboutMe;