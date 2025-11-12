import React from 'react';
import { ClassInfo } from '../types';
import ClassCard from './ClassCard';
import SkeletonCard from './SkeletonCard';

interface ClassGridProps {
  classes: ClassInfo[];
  isLoading: boolean;
  error: string | null;
}

const ClassGrid: React.FC<ClassGridProps> = ({ classes, isLoading, error }) => {
  if (error) {
    return <div className="flex items-center justify-center h-full text-[#ff6600] text-lg">{error}</div>;
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (classes.length === 0) {
    return <div className="flex items-center justify-center h-full text-white/80 text-lg">Nenhuma aula registrada para hoje.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {classes.map((classInfo, index) => (
        <ClassCard key={`${classInfo.sala}-${index}`} classInfo={classInfo} />
      ))}
    </div>
  );
};

export default ClassGrid;
