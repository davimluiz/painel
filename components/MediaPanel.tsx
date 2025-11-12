import React from 'react';
import { MediaInfo } from '../types';

interface MediaPanelProps {
    media: MediaInfo | null;
    isLoading: boolean;
}

const MediaPanel: React.FC<MediaPanelProps> = ({ media, isLoading }) => {
    return (
        <aside className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg min-h-[300px] lg:min-h-full flex items-center justify-center sticky top-6">
            {isLoading && (
                <div className="w-full h-full bg-gray-700/50 rounded-lg animate-pulse"></div>
            )}
            {!isLoading && !media && (
                <p className="text-white/70">Nenhum anúncio disponível no momento.</p>
            )}
            {!isLoading && media && (
                media.type === 'image' ? (
                    <img 
                        src={media.url} 
                        alt={media.alt} 
                        className="w-full h-full object-contain rounded-lg shadow-md"
                    />
                ) : (
                    <video 
                        src={media.url} 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        className="w-full h-full object-contain rounded-lg shadow-md"
                    >
                        Your browser does not support the video tag.
                    </video>
                )
            )}
        </aside>
    );
};

export default MediaPanel;
