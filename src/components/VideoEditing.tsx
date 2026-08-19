import { useState, useEffect, useRef, type MouseEvent, type DragEvent, type ChangeEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Play,
  Film,
  Plus,
  Trash2,
  Maximize2,
  Sparkles,
  Volume2,
  UploadCloud,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { VideoProject } from '../types';
import { INITIAL_VIDEOS } from '../data/videoData';
import { VideoPlayerModal } from './VideoPlayerModal';
import { AddVideoModal } from './AddVideoModal';
import {
  fadeUpVariant,
  staggerContainerVariant,
  TRANSITION_SMOOTH,
} from '../utils/motionVariants';

const LOCAL_STORAGE_KEY = 'rohit_portfolio_videos_user_uploaded_only_v20';

export function VideoEditing() {
  const shouldReduceMotion = useReducedMotion();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadToast, setUploadToast] = useState<string | null>(null);

  const [videos, setVideos] = useState<VideoProject[]>(() => {
    try {
      // Clear legacy storage keys containing demo videos
      [
        'rohit_portfolio_videos_showcase_v1',
        'rohit_portfolio_videos_showcase_v2',
        'rohit_portfolio_videos_showcase_v3',
        'rohit_portfolio_videos_showcase_v4_empty',
        'rohit_portfolio_videos_showcase_v5_clean',
        'rohit_portfolio_videos_showcase_v8_curated',
        'rohit_portfolio_videos_showcase_v10_actual_content',
        'rohit_portfolio_videos_showcase_v12_bugatti_drift_live',
        'rohit_portfolio_videos_showcase_v14_black_bugatti',
        'rohit_portfolio_videos_showcase_v16_custom_bugatti_thumb',
        'rohit_portfolio_videos_showcase_v18_bmw_smooth_edit'
      ].forEach(k => {
        try { localStorage.removeItem(k); } catch (e) {}
      });
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading videos from localStorage:', e);
    }
    return INITIAL_VIDEOS;
  });

  const [activeVideo, setActiveVideo] = useState<VideoProject | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(videos));
    } catch (e) {
      console.warn('Error writing videos to localStorage:', e);
    }
  }, [videos]);

  const handleAddVideo = (newVideo: VideoProject) => {
    setVideos((prev) => [newVideo, ...prev]);
    setActiveVideo(newVideo);
  };

  const deleteVideoById = (id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
    if (activeVideo?.id === id) {
      setActiveVideo(null);
    }
    setConfirmDeleteId(null);
  };

  const handleClearAllVideos = () => {
    setVideos([]);
    setActiveVideo(null);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
    } catch (e) {}
  };

  const handleResetDefaultVideos = () => {
    setVideos(INITIAL_VIDEOS);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_VIDEOS));
    } catch (e) {}
  };

  const handleDeleteClick = (e: MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirmDeleteId === id) {
      deleteVideoById(id);
    } else {
      setConfirmDeleteId(id);
      // Auto reset confirm state after 3.5 seconds
      setTimeout(() => {
        setConfirmDeleteId((cur) => (cur === id ? null : cur));
      }, 3500);
    }
  };

  // Helper to extract frame thumbnail and duration from a video file
  const processUploadedVideoFile = (file: File) => {
    if (!file.type.startsWith('video/')) {
      alert('Please upload a valid video file (MP4, WebM, MOV).');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    const cleanTitle = file.name
      .replace(/\.[^/.]+$/, '')
      .replace(/[-_]/g, ' ')
      .toUpperCase();

    // Create an offscreen video to extract thumbnail & metadata
    const tempVideo = document.createElement('video');
    tempVideo.src = objectUrl;
    tempVideo.crossOrigin = 'anonymous';
    tempVideo.muted = true;
    tempVideo.currentTime = 0.5;

    tempVideo.onloadeddata = () => {
      let thumbnailDataUrl: string | undefined = undefined;
      try {
        const canvas = document.createElement('canvas');
        canvas.width = tempVideo.videoWidth || 1280;
        canvas.height = tempVideo.videoHeight || 720;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(tempVideo, 0, 0, canvas.width, canvas.height);
          thumbnailDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        }
      } catch (err) {
        console.warn('Could not auto-capture frame from video:', err);
      }

      const durationSec = Math.floor(tempVideo.duration) || 0;
      const durationFormatted = durationSec > 0 
        ? `${Math.floor(durationSec / 60)}:${(durationSec % 60).toString().padStart(2, '0')}`
        : '0:15';

      const ratio = (tempVideo.videoWidth && tempVideo.videoHeight)
        ? tempVideo.videoWidth / tempVideo.videoHeight
        : 1.77;

      const detectedRatio = ratio > 1.3 ? 'landscape' : ratio < 0.8 ? 'portrait' : 'square';

      const newProj: VideoProject = {
        id: `uploaded-video-${Date.now()}`,
        title: cleanTitle,
        description: `Custom video edit uploaded on ${new Date().toLocaleDateString()}. High-definition render.`,
        videoUrl: objectUrl,
        thumbnailUrl: thumbnailDataUrl,
        aspectRatio: detectedRatio,
        duration: durationFormatted,
        year: '2026',
        tags: ['Original Cut', 'Uploaded Video', 'Motion Edit'],
        isCustom: true,
        createdAt: Date.now()
      };

      setVideos((prev) => [newProj, ...prev]);
      setActiveVideo(newProj);
      setUploadToast(`"${cleanTitle}" uploaded and added to showcase!`);
      setTimeout(() => setUploadToast(null), 4000);
    };

    tempVideo.onerror = () => {
      const fallbackProj: VideoProject = {
        id: `uploaded-video-${Date.now()}`,
        title: cleanTitle,
        description: `Custom video edit uploaded on ${new Date().toLocaleDateString()}.`,
        videoUrl: objectUrl,
        aspectRatio: 'landscape',
        year: '2026',
        tags: ['Uploaded Video', 'Motion Edit'],
        isCustom: true,
        createdAt: Date.now()
      };
      setVideos((prev) => [fallbackProj, ...prev]);
      setActiveVideo(fallbackProj);
      setUploadToast(`"${cleanTitle}" added to showcase!`);
      setTimeout(() => setUploadToast(null), 4000);
    };
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processUploadedVideoFile(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processUploadedVideoFile(file);
    }
  };

  return (
    <section 
      id="video-editing" 
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative py-24 sm:py-32 px-4 sm:px-8 border-t border-white/10 bg-black transition-colors ${
        isDragging ? 'bg-[#050D1D]/95 ring-2 ring-inset ring-[#2997FF]' : ''
      }`}
    >
      {/* Hidden file input for direct video upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/webm,video/quicktime,video/*"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Upload Success Toast */}
      {uploadToast && (
        <div className="fixed top-24 right-6 z-50 p-4 rounded-2xl bg-[#090C15]/95 border border-[#2997FF]/60 text-white shadow-[0_10px_40px_rgba(41,151,255,0.4)] backdrop-blur-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-[#2997FF]" />
          <span className="text-xs font-mono">{uploadToast}</span>
        </div>
      )}

      {/* Drag overlay indicator */}
      {isDragging && (
        <div className="absolute inset-0 bg-[#0071E3]/20 backdrop-blur-sm z-40 flex flex-col items-center justify-center pointer-events-none border-2 border-dashed border-[#2997FF]">
          <UploadCloud className="w-16 h-16 text-[#2997FF] animate-bounce mb-3" />
          <h3 className="text-xl font-bold text-white uppercase tracking-wider">Drop Video File to Upload</h3>
          <p className="text-xs text-white/70 font-mono mt-1">Supports MP4, WebM, and MOV formats</p>
        </div>
      )}

      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#0071E3]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#2997FF]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-[1280px] mx-auto space-y-12">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeUpVariant}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#2997FF] tracking-wider uppercase flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5 text-[#2997FF]" /> SHOWCASE & MOTION GALLERY
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-white/60">
                {videos.length} {videos.length === 1 ? 'VIDEO' : 'VIDEOS'}
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase">
              VIDEO EDITING
            </h2>

            <p className="text-base sm:text-lg text-white/75 max-w-2xl font-light leading-relaxed">
              Creative video edits, motion-based visuals, and engaging digital content.
            </p>
          </div>

          {/* Action Buttons: Direct Upload, Add Video Modal, and Management */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {videos.length > 0 && (
              <button
                type="button"
                onClick={handleClearAllVideos}
                className="px-3.5 py-2.5 rounded-full text-xs font-mono text-white/60 hover:text-red-300 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
                title="Remove all videos from showcase"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">CLEAR</span>
              </button>
            )}

            {/* Direct File Upload Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              data-cursor="UPLOAD"
              className="px-4 py-2.5 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#2997FF]/60 shadow-md transition-all flex items-center gap-2 cursor-pointer group"
              title="Upload MP4 / WebM video file directly from your computer"
            >
              <UploadCloud className="w-4 h-4 text-[#2997FF] group-hover:-translate-y-0.5 transition-transform" />
              <span>UPLOAD VIDEO</span>
            </button>

            {/* Add Video Modal Button (supports URL + File + Custom Thumbnail) */}
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              data-cursor="ADD"
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#0071E3] to-[#2997FF] hover:brightness-110 shadow-[0_0_20px_rgba(41,151,255,0.4)] transition-all flex items-center gap-2 cursor-pointer group"
            >
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              <span>ADD LINK / DETAILS</span>
            </button>
          </div>
        </motion.div>

        {/* Clean Showcase Gallery Grid */}
        {videos.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={shouldReduceMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : staggerContainerVariant}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {videos.map((video) => {
              return (
                <motion.div
                  key={video.id}
                  layout
                  variants={fadeUpVariant}
                  onMouseEnter={() => setHoveredVideoId(video.id)}
                  onMouseLeave={() => setHoveredVideoId(null)}
                  onClick={() => setActiveVideo(video)}
                  data-cursor="PLAY"
                  className="group relative rounded-3xl bg-[#090C15]/90 border border-white/10 hover:border-[#2997FF]/50 transition-all duration-500 overflow-hidden shadow-xl hover:shadow-[0_15px_40px_rgba(41,151,255,0.2)] flex flex-col justify-between cursor-pointer"
                >
                  {/* Visual Video Frame Container (Maintains Original Aspect Ratio with zero distortion) */}
                  <div className="relative w-full aspect-video bg-black/80 overflow-hidden flex items-center justify-center">
                    {/* Video Thumbnail Image / Poster */}
                    {video.thumbnailUrl ? (
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title || 'Video Thumbnail'}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      />
                    ) : (
                      /* Fallback Stylized Poster Frame */
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0c1020] via-[#05070d] to-black">
                        <Film className="w-10 h-10 text-[#2997FF]/50 mb-2 group-hover:text-[#2997FF] transition-colors" />
                        <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider">Video Project</span>
                      </div>
                    )}

                    {/* Dark subtle gradient overlay for contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
                      <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white/80 font-semibold flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-[#2997FF]" />
                        {video.aspectRatio ? video.aspectRatio.toUpperCase() : 'VIDEO'}
                      </span>

                      {video.duration && (
                        <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono text-[#64D2FF] font-semibold">
                          {video.duration}
                        </span>
                      )}
                    </div>

                    {/* Center Glowing Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                      <div className="w-14 h-14 rounded-full bg-black/75 backdrop-blur-xl border border-white/30 text-white flex items-center justify-center shadow-[0_0_30px_rgba(41,151,255,0.4)] group-hover:scale-115 group-hover:bg-[#0071E3] group-hover:border-[#64D2FF] transition-all duration-300">
                        <Play className="w-6 h-6 fill-current ml-1 text-white" />
                      </div>
                    </div>

                    {/* Bottom Hover Hint */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20 text-[10px] font-mono text-white/70 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-black/80 px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
                        <Maximize2 className="w-3 h-3 text-[#2997FF]" /> CLICK TO WATCH
                      </span>
                      <span className="bg-black/80 px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
                        <Volume2 className="w-3 h-3 text-[#64D2FF]" /> HD AUDIO
                      </span>
                    </div>

                    {/* Delete Button for Videos with Two-Step In-UI Confirmation */}
                    <button
                      type="button"
                      onClick={(e) => handleDeleteClick(e, video.id)}
                      className={`absolute bottom-3 right-3 z-30 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border transition-all cursor-pointer backdrop-blur-md ${
                        confirmDeleteId === video.id
                          ? 'bg-red-600 border-red-400 text-white shadow-[0_0_15px_rgba(239,68,68,0.6)] animate-pulse'
                          : 'bg-black/70 hover:bg-red-500/80 border-white/20 hover:border-red-500 text-white/70 hover:text-white'
                      }`}
                      title={confirmDeleteId === video.id ? 'Click again to confirm removal' : 'Delete video'}
                      aria-label="Delete video"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      {confirmDeleteId === video.id && (
                        <span className="text-[10px] font-mono font-bold tracking-wider uppercase">
                          CONFIRM
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Video Info Content (Title & Detailed Description) */}
                  <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      {video.title ? (
                        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug group-hover:text-[#2997FF] transition-colors line-clamp-2">
                          {video.title}
                        </h3>
                      ) : (
                        <h3 className="text-sm font-semibold text-white/60 font-mono">
                          VIDEO SHOWCASE
                        </h3>
                      )}

                      {video.description && (
                        <p className="text-xs sm:text-[13px] text-white/75 font-sans font-light leading-relaxed line-clamp-3 sm:line-clamp-4 mt-2">
                          {video.description}
                        </p>
                      )}
                    </div>

                    {/* Tags / Keywords (if provided) */}
                    {video.tags && video.tags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-white/10">
                        {video.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-white/60 border border-white/10"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Empty state when gallery has no videos */}
        {videos.length === 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeUpVariant}
            className="relative py-12 px-6 sm:px-10 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-black/60 backdrop-blur-xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(41,151,255,0.12),transparent_70%)] pointer-events-none" />
            
            <div className="relative z-10 max-w-lg mx-auto text-center space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#64D2FF]">
                <Sparkles className="w-3 h-3 text-[#2997FF]" />
                <span>VIDEO GALLERY READY</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  No videos uploaded yet.
                </h3>
                <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                  Upload your video edit file (MP4, WebM, MOV) or add video links and details to display your work.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#0071E3] to-[#2997FF] hover:brightness-110 shadow-[0_0_20px_rgba(41,151,255,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>UPLOAD VIDEO</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 hover:border-[#2997FF]/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[#2997FF]" />
                  <span>ADD LINK / DETAILS</span>
                </button>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-center gap-3 text-[10px] font-mono text-white/40">
                <span>PREMIERE PRO</span>
                <span>•</span>
                <span>AFTER EFFECTS</span>
                <span>•</span>
                <span>CAPCUT</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Lightbox / Video Player Modal */}
      <VideoPlayerModal
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
        onSelectVideo={(v) => setActiveVideo(v)}
        onDeleteVideo={deleteVideoById}
        allVideos={videos}
      />

      {/* Upload / Add Video Modal */}
      <AddVideoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddVideo={handleAddVideo}
      />
    </section>
  );
}
