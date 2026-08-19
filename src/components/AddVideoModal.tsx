import { useState, useRef, type ChangeEvent, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Upload,
  Link,
  Film,
  Sparkles,
  Camera,
  Image as ImageIcon,
  Check,
  AlertCircle
} from 'lucide-react';
import { VideoProject } from '../types';

interface AddVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVideo: (video: VideoProject) => void;
}

export function AddVideoModal({ isOpen, onClose, onAddVideo }: AddVideoModalProps) {
  const [sourceType, setSourceType] = useState<'url' | 'file'>('url');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'landscape' | 'portrait' | 'square'>('landscape');
  const [tagsInput, setTagsInput] = useState('');
  const [isGeneratingThumbnail, setIsGeneratingThumbnail] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbInputRef = useRef<HTMLInputElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('video/')) {
        setPreviewError('Please select a valid video file (MP4, WebM, MOV).');
        return;
      }
      setVideoFile(file);
      const objectUrl = URL.createObjectURL(file);
      setVideoUrl(objectUrl);
      setPreviewError(null);

      // Pre-fill title if empty
      if (!title) {
        const cleanName = file.name
          .replace(/\.[^/.]+$/, '')
          .replace(/[-_]/g, ' ')
          .toUpperCase();
        setTitle(cleanName);
      }
    }
  };

  const handleThumbFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setThumbnailUrl(objectUrl);
    }
  };

  // Auto-generate thumbnail from the video element using HTML5 Canvas
  const handleAutoGenerateThumbnail = () => {
    if (!previewVideoRef.current || !videoUrl) {
      setPreviewError('Please provide a valid video before generating a thumbnail.');
      return;
    }

    setIsGeneratingThumbnail(true);
    const video = previewVideoRef.current;

    try {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setThumbnailUrl(dataUrl);
      }
    } catch (err) {
      console.warn('Could not auto-generate thumbnail due to CORS or format:', err);
      setPreviewError('Could not auto-capture frame. You can upload an image directly instead.');
    } finally {
      setIsGeneratingThumbnail(false);
    }
  };

  const handleVideoLoaded = () => {
    if (previewVideoRef.current) {
      const { videoWidth, videoHeight } = previewVideoRef.current;
      if (videoWidth && videoHeight) {
        const ratio = videoWidth / videoHeight;
        if (ratio > 1.3) {
          setAspectRatio('landscape');
        } else if (ratio < 0.8) {
          setAspectRatio('portrait');
        } else {
          setAspectRatio('square');
        }
      }
      setPreviewError(null);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!videoUrl.trim()) {
      setPreviewError('Please provide a video URL or upload a video file.');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newVideo: VideoProject = {
      id: `custom-video-${Date.now()}`,
      title: title.trim() || undefined,
      description: description.trim() || undefined,
      videoUrl: videoUrl.trim(),
      thumbnailUrl: thumbnailUrl.trim() || undefined,
      aspectRatio,
      year: '2026',
      tags: tags.length > 0 ? tags : ['Video Edit', 'Showcase'],
      isCustom: true,
      createdAt: Date.now()
    };

    onAddVideo(newVideo);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          className="relative z-10 w-full max-w-2xl bg-[#0C101C] border border-white/15 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.8)] my-auto text-[#F5F5F7]"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-black/40">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0071E3]/20 border border-[#2997FF]/40 flex items-center justify-center text-[#2997FF]">
                <Film className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Add Video to Showcase</h3>
                <p className="text-xs text-white/60">Upload your video edit or paste a direct video link</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white/80 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Source Type Selector */}
            <div className="flex items-center gap-2 p-1 bg-white/5 border border-white/10 rounded-2xl">
              <button
                type="button"
                onClick={() => setSourceType('url')}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  sourceType === 'url'
                    ? 'bg-gradient-to-r from-[#0071E3] to-[#2997FF] text-white shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Link className="w-3.5 h-3.5" />
                <span>Video Direct URL</span>
              </button>
              <button
                type="button"
                onClick={() => setSourceType('file')}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  sourceType === 'file'
                    ? 'bg-gradient-to-r from-[#0071E3] to-[#2997FF] text-white shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Video File</span>
              </button>
            </div>

            {/* Video Input */}
            {sourceType === 'url' ? (
              <div className="space-y-2">
                <label className="text-xs font-medium text-white/80 flex items-center justify-between">
                  <span>Video URL (MP4 / WebM direct link) *</span>
                  <span className="text-[10px] text-[#2997FF] font-mono">REQUIRED</span>
                </label>
                <input
                  type="url"
                  value={videoUrl || ''}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://example.com/my-video-edit.mp4"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#2997FF] focus:outline-none text-sm text-white placeholder-white/30 transition-colors"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-xs font-medium text-white/80 flex items-center justify-between">
                  <span>Upload Video File (MP4, WebM, MOV) *</span>
                  <span className="text-[10px] text-[#2997FF] font-mono">REQUIRED</span>
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime,video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-white/20 hover:border-[#2997FF]/60 rounded-2xl p-6 text-center cursor-pointer transition-all hover:bg-white/[0.02]"
                >
                  <Upload className="w-8 h-8 text-[#2997FF] mx-auto mb-2 opacity-80" />
                  <p className="text-xs font-semibold text-white">
                    {videoFile ? videoFile.name : 'Click to select video file or drag here'}
                  </p>
                  <p className="text-[11px] text-white/50 mt-1">Supports MP4, WebM, MOV formats</p>
                </div>
              </div>
            )}

            {/* Error Message if any */}
            {previewError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-xs text-red-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{previewError}</span>
              </div>
            )}

            {/* Video Live Preview & Auto Thumbnail Generator */}
            {videoUrl && (
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-white/70 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#2997FF]" /> LIVE PREVIEW & THUMBNAIL
                  </span>
                  <button
                    type="button"
                    onClick={handleAutoGenerateThumbnail}
                    disabled={isGeneratingThumbnail}
                    className="px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/15 rounded-lg text-[11px] font-mono flex items-center gap-1.5 text-[#64D2FF] transition-all cursor-pointer"
                  >
                    <Camera className="w-3 h-3" />
                    <span>{isGeneratingThumbnail ? 'Capturing...' : 'Capture Frame as Thumbnail'}</span>
                  </button>
                </div>

                <div className="relative rounded-xl overflow-hidden bg-black max-h-48 flex items-center justify-center">
                  <video
                    key={videoUrl}
                    ref={previewVideoRef}
                    controls
                    playsInline
                    onLoadedMetadata={handleVideoLoaded}
                    onError={() => setPreviewError('Could not load video preview. Please verify URL or file format.')}
                    className="max-h-48 w-full object-contain mx-auto"
                  >
                    <source src={videoUrl} type="video/mp4" />
                    <source src={videoUrl} type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}

            {/* Optional Metadata Details */}
            <div className="space-y-4 pt-2 border-t border-white/10">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/80 flex items-center justify-between">
                  <span>Video Title (Optional)</span>
                  <span className="text-[10px] text-white/40 font-mono">OPTIONAL</span>
                </label>
                <input
                  type="text"
                  value={title || ''}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. BMW M8 COMPETITION: CINEMATIC CAR EDIT"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#2997FF] focus:outline-none text-sm text-white placeholder-white/30 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/80 flex items-center justify-between">
                  <span>Short Description (Optional)</span>
                  <span className="text-[10px] text-white/40 font-mono">OPTIONAL</span>
                </label>
                <textarea
                  rows={2}
                  value={description || ''}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief note about the editing style, transitions, color grading, or pacing..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#2997FF] focus:outline-none text-sm text-white placeholder-white/30 transition-colors resize-none"
                />
              </div>

              {/* Custom Thumbnail URL or Upload */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/80 flex items-center justify-between">
                  <span>Custom Thumbnail Image URL (Optional)</span>
                  <button
                    type="button"
                    onClick={() => thumbInputRef.current?.click()}
                    className="text-[10px] text-[#2997FF] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <ImageIcon className="w-3 h-3" /> Upload Image
                  </button>
                </label>
                <input
                  ref={thumbInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleThumbFileChange}
                  className="hidden"
                />
                <input
                  type="url"
                  value={thumbnailUrl || ''}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  placeholder="https://example.com/thumbnail.jpg (or use capture above)"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#2997FF] focus:outline-none text-sm text-white placeholder-white/30 transition-colors"
                />
              </div>

              {/* Tags / Keywords */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/80 flex items-center justify-between">
                  <span>Tags (Optional, comma separated)</span>
                  <span className="text-[10px] text-white/40 font-mono">COMMA SEPARATED</span>
                </label>
                <input
                  type="text"
                  value={tagsInput || ''}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="e.g. Motion Graphics, Speed Ramps, Color Grading"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#2997FF] focus:outline-none text-sm text-white placeholder-white/30 transition-colors"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!videoUrl}
                className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#0071E3] to-[#2997FF] hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(41,151,255,0.4)] transition-all flex items-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Add to Showcase</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
