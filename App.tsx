import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ClassGrid from './components/ClassGrid';
import MediaPanel from './components/MediaPanel';
import { fetchClassData, fetchMediaData } from './services/dataService';
import { ClassInfo, MediaInfo } from './types';

const App: React.FC = () => {
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [media, setMedia] = useState<MediaInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const classDataPromise = fetchClassData();
        const mediaDataPromise = fetchMediaData();

        const [classData, mediaData] = await Promise.all([classDataPromise, mediaDataPromise]);

        setClasses(classData);
        setMedia(mediaData);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("Ocorreu um erro desconhecido.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0b0b0f] to-[#1a1a20] text-white font-poppins">
      <Header />
      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ClassGrid classes={classes} isLoading={isLoading} error={error} />
          </div>
          <div className="lg:col-span-1">
            <MediaPanel media={media} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
