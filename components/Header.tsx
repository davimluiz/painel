import React, { useState, useEffect } from 'react';
import { ClockIcon } from '../constants';

const formatDateTime = (date: Date): string => {
  const weekday = date.toLocaleDateString('pt-BR', { weekday: 'long' });
  const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);
  const datePart = date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  const timePart = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return `${capitalizedWeekday}, ${datePart} — ${timePart}`;
};

const Header: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <header className="w-full p-4 text-white font-poppins bg-gradient-to-b from-[#0b0b0f] to-[#1a1a20] shadow-xl">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-semibold tracking-wide">Painel de Aulas</h1>
        <div className="flex items-center gap-2 text-base md:text-lg font-light">
          <ClockIcon className="text-[#ff6600]" />
          <span className="tabular-nums">{formatDateTime(currentTime)}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
