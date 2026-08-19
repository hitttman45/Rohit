import { useState, useRef, useEffect, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  Film,
  Settings,
  Tv,
  Check,
  Trash2
} from 'lucide-react';
import { VideoProject } from '../types';

interface VideoPlayerModalProps {
  video: VideoProject | null;
  onClose: () => void;
  onSelectVideo?: (v: VideoProject) => void;
  onDeleteVideo?: (id: string) => void;
  allVideos?: VideoProject[];
}

export function VideoPlayerModal({
  video,
  onClose,
  onSelectVideo,
  onDeleteVideo,
  allVideos = []
}: VideoPlayerModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isLooping, setIsLooping] = useState(true);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [hasPlaybackError, setHasPlaybackError] = useState(false);
  const controlsTimeoutRef = useRef<number | null>(null);

  // Reset state on video change
  useEffect(() => {
    if (video) {
      setIsPlaying(true);
      setCurrentTime(0);
      setIsVideoLoading(true);
      setHasPlaybackError(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [video]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!video) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ' || e.key === 'k') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'm') {
        toggleMute();
      } else if (e.key === 'f') {
        toggleFullscreen();
      } else if (e.key === 'ArrowRight') {
        if (videoRef.current) videoRef.current.currentTime += 5;
      } else if (e.key === 'ArrowLeft') {
        if (videoRef.current) videoRef.current.currentTime -= 5;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [video, isPlaying, isMuted]);

  // Handle Fullscreen Change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    const safeVal = Number.isFinite(val) ? Math.max(0, Math.min(1, val)) : 1;
    setVolume(safeVal);
    if (videoRef.current) {
      videoRef.current.volume = safeVal;
      videoRef.current.muted = safeVal === 0;
      setIsMuted(safeVal === 0);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const cur = videoRef.current.currentTime;
      setCurrentTime(Number.isFinite(cur) ? cur : 0);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const dur = videoRef.current.duration;
      setDuration(Number.isFinite(dur) ? dur : 0);
      setIsVideoLoading(false);
    }
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    const safeTime = Number.isFinite(time) ? Math.max(0, time) : 0;
    setCurrentTime(safeTime);
    if (videoRef.current) {
      videoRef.current.currentTime = safeTime;
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const changeSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSpeedMenu(false);
  };

  const togglePictureInPicture = async () => {
    if (!videoRef.current) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (document.pictureInPictureEnabled) {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (err) {
      console.warn('PiP error:', err);
    }
  };

  const handleMouseMove = () => {
    setIsControlsVisible(true);
    if (controlsTimeoutRef.current) {
      window.clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying) {
        setIsControlsVisible(false);
        setShowSpeedMenu(false);
      }
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!video) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 overflow-y-auto">
        {/* Backdrop Glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-2xl cursor-pointer"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-5xl bg-[#090C15]/95 border border-white/15 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] my-auto text-[#F5F5F7]"
        >
          {/* Header Bar */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0071E3]/20 border border-[#2997FF]/40 flex items-center justify-center text-[#2997FF]">
                <Film className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#2997FF] tracking-wider uppercase font-semibold block">
                  VIDEO SHOWCASE PLAYER
                </span>
                <h3 className="text-sm sm:text-base font-semibold text-white truncate max-w-xs sm:max-w-md">
                  {video.title || 'Untitled Video Showcase'}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {onDeleteVideo && (
                <button
                  type="button"
                  onClick={() => {
                    if (video) {
                      onDeleteVideo(video.id);
                      onClose();
                    }
                  }}
                  className="px-3 py-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 hover:text-red-200 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Delete this video from showcase"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">DELETE</span>
                </button>
              )}
              <span className="hidden sm:inline-block text-[11px] font-mono px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/70">
                ESC TO CLOSE
              </span>
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
                aria-label="Close video player"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Video Viewport */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setIsControlsVisible(false)}
            className="relative bg-black flex items-center justify-center overflow-hidden select-none group min-h-[300px] sm:min-h-[460px]"
          >
            {/* The HTML5 Video Element with supported sources */}
            {!hasPlaybackError ? (
              <video
                key={video.videoUrl}
                ref={videoRef}
                poster={video.thumbnailUrl}
                autoPlay
                loop={isLooping}
                playsInline
                onClick={togglePlay}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onWaiting={() => setIsVideoLoading(true)}
                onPlaying={() => {
                  setIsVideoLoading(false);
                  setHasPlaybackError(false);
                }}
                onError={() => {
                  setIsVideoLoading(false);
                  setHasPlaybackError(true);
                }}
                className="max-h-[65vh] w-full object-contain mx-auto transition-all"
              >
                <source src={video.videoUrl} type="video/mp4" />
                <source src={video.videoUrl} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 max-w-md my-auto">
                <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                  <Film className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-semibold text-white">Video Stream Unavailable</h4>
                  <p className="text-xs text-white/60">
                    The external video stream or file source could not be decoded. Please check network connectivity or upload a local MP4 file.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setHasPlaybackError(false);
                    setIsVideoLoading(true);
                    if (videoRef.current) {
                      videoRef.current.load();
                    }
                  }}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  Retry Playback
                </button>
              </div>
            )}

            {/* Video Loading Spinner */}
            {isVideoLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none z-20">
                <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-[#2997FF] animate-spin" />
              </div>
            )}

            {/* Big Center Play/Pause Indicator on click */}
            {!isPlaying && (
              <button
                type="button"
                onClick={togglePlay}
                className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-black/70 hover:bg-black/85 backdrop-blur-xl border border-white/25 flex items-center justify-center text-white shadow-[0_0_40px_rgba(41,151,255,0.5)] transition-transform hover:scale-110 cursor-pointer z-20"
                aria-label="Play video"
              >
                <Play className="w-8 h-8 fill-white ml-1 text-white" />
              </button>
            )}

            {/* Floating Custom Video Control Bar */}
            <motion.div
              initial={false}
              animate={{ opacity: isControlsVisible || !isPlaying ? 1 : 0, y: isControlsVisible || !isPlaying ? 0 : 20 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent z-30 flex flex-col gap-3"
            >
              {/* Progress Bar / Scrubber */}
              <div className="relative w-full group/scrubber cursor-pointer flex items-center">
                <input
                  type="range"
                  min="0"
                  max={duration > 0 ? duration : 100}
                  step="0.1"
                  value={Number.isFinite(currentTime) ? currentTime : 0}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-white/20 hover:h-2 rounded-lg appearance-none cursor-pointer accent-[#2997FF] transition-all"
                  aria-label="Video scrubber"
                />
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between text-xs font-mono text-white/90">
                {/* Left Controls */}
                <div className="flex items-center gap-3">
                  {/* Play / Pause Button */}
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="p-2 rounded-full hover:bg-white/15 transition-colors cursor-pointer text-white"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  {/* Volume Control */}
                  <div className="flex items-center gap-2 group/vol">
                    <button
                      type="button"
                      onClick={toggleMute}
                      className="p-2 rounded-full hover:bg-white/15 transition-colors cursor-pointer text-white"
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : (Number.isFinite(volume) ? volume : 1)}
                      onChange={handleVolumeChange}
                      className="w-16 sm:w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#2997FF]"
                      aria-label="Volume slider"
                    />
                  </div>

                  {/* Time Indicator */}
                  <span className="text-white/70 text-[11px]">
                    {formatTime(currentTime)} <span className="text-white/30">/</span> {formatTime(duration)}
                  </span>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-2">
                  {/* Loop Toggle */}
                  <button
                    type="button"
                    onClick={() => setIsLooping(!isLooping)}
                    className={`p-2 rounded-full transition-colors cursor-pointer ${
                      isLooping ? 'text-[#2997FF] bg-[#0071E3]/20' : 'text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                    title={isLooping ? 'Looping Enabled' : 'Looping Disabled'}
                    aria-label="Toggle loop"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  {/* Playback Speed Menu */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                      className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-[11px] font-mono cursor-pointer flex items-center gap-1 text-white"
                      title="Playback Speed"
                    >
                      <span>{playbackSpeed}x</span>
                      <Settings className="w-3 h-3 text-white/60" />
                    </button>

                    {showSpeedMenu && (
                      <div className="absolute bottom-full right-0 mb-2 p-1.5 rounded-xl bg-black/90 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col gap-1 min-w-[90px] z-40">
                        {[0.5, 0.75, 1, 1.25, 1.5, 2].map((spd) => (
                          <button
                            key={spd}
                            type="button"
                            onClick={() => changeSpeed(spd)}
                            className={`px-3 py-1 rounded-lg text-left text-xs flex items-center justify-between hover:bg-white/10 cursor-pointer ${
                              playbackSpeed === spd ? 'text-[#2997FF] font-bold' : 'text-white/70'
                            }`}
                          >
                            <span>{spd}x</span>
                            {playbackSpeed === spd && <Check className="w-3 h-3 text-[#2997FF]" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Picture-in-Picture */}
                  {document.pictureInPictureEnabled && (
                    <button
                      type="button"
                      onClick={togglePictureInPicture}
                      className="p-2 rounded-full hover:bg-white/15 transition-colors cursor-pointer text-white/80 hover:text-white hidden sm:inline-block"
                      title="Picture in Picture"
                      aria-label="Picture in Picture"
                    >
                      <Tv className="w-4 h-4" />
                    </button>
                  )}

                  {/* Fullscreen Button */}
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    className="p-2 rounded-full hover:bg-white/15 transition-colors cursor-pointer text-white"
                    title="Toggle Fullscreen"
                    aria-label="Toggle Fullscreen"
                  >
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Video Metadata & Description Bar */}
          <div className="p-6 sm:p-8 bg-[#0B0F1A] border-t border-white/10 flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="apple-glass-pill px-3 py-0.5 rounded-full text-[10px] font-mono text-[#2997FF] uppercase border border-[#2997FF]/30">
                  ORIGINAL EDIT
                </span>
                {video.year && (
                  <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 text-white/50 text-[10px] font-mono rounded-full">
                    {video.year}
                  </span>
                )}
                {video.duration && (
                  <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 text-white/70 text-[10px] font-mono rounded-full">
                    {video.duration}
                  </span>
                )}
              </div>

              {video.title && (
                <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {video.title}
                </h4>
              )}

              {video.description && (
                <p className="text-sm text-white/75 font-sans font-light leading-relaxed">
                  {video.description}
                </p>
              )}

              {video.tags && video.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {video.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 text-[10px] font-mono bg-white/5 border border-white/10 rounded-full text-white/60"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Switcher of other videos in showcase */}
            {allVideos.length > 1 && (
              <div className="shrink-0 space-y-2 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block">
                  MORE IN VIDEO SHOWCASE ({allVideos.length})
                </span>
                <div className="flex items-center gap-2 overflow-x-auto max-w-xs pb-1 scrollbar-none">
                  {allVideos.map((v) => {
                    const isCurrent = v.id === video.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => onSelectVideo && onSelectVideo(v)}
                        className={`relative w-16 h-10 rounded-lg overflow-hidden border shrink-0 transition-all cursor-pointer ${
                          isCurrent
                            ? 'border-[#2997FF] shadow-[0_0_12px_rgba(41,151,255,0.5)] scale-105'
                            : 'border-white/20 opacity-60 hover:opacity-100'
                        }`}
                        title={v.title || 'Video'}
                      >
                        {v.thumbnailUrl ? (
                          <img
                            src={v.thumbnailUrl}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-black/60 flex items-center justify-center">
                            <Play className="w-3 h-3 text-white/70" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
