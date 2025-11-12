import React from 'react';
import { ClassInfo } from '../types';

interface ClassCardProps {
  classInfo: ClassInfo;
}

const ClassCard: React.FC<ClassCardProps> = ({ classInfo }) => {
  const { sala, turma, instrutor, unidade_curricular, inicio, fim } = classInfo;
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg hover:shadow-[#ff6600]/30 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-[#ff6600] transition-all duration-300 ease-in-out">
      <h2 className="text-[#ff6600] text-xl font-semibold mb-2 truncate" title={sala}>🏫 {sala}</h2>
      <p className="text-white/90 font-medium truncate" title={turma}>👥 {turma}</p>
      <p className="text-white/80 truncate" title={instrutor}>👨‍🏫 {instrutor}</p>
      <p className="text-white/70 text-sm truncate" title={unidade_curricular}>📘 {unidade_curricular}</p>
      <p className="text-white/70 italic text-sm mt-2">⏰ {inicio} - {fim}</p>
    </div>
  );
};

export default ClassCard;
