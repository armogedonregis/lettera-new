'use client'

import { useState, useEffect } from 'react';
import { Loader } from '.';

export default function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sessionId = Date.now().toString();
    const storedSessionId = localStorage.getItem('sessionId');
    const hasVisited = localStorage.getItem('hasVisited');

    if (sessionId !== storedSessionId) {
      localStorage.setItem('sessionId', sessionId);
      localStorage.removeItem('hasVisited');
      
      setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem('hasVisited', 'true');
      }, 3000);
    } else if (hasVisited) {
      setIsLoading(false);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem('hasVisited', 'true');
      }, 3000);
    }
  }, []);

  if (isLoading) {
    return (
        <div>
            <span className="fixed top-[60%] left-1/2 -translate-x-1/2 z-[70]">Здесь возможный лоадер при первоначальной загрузке</span>
            <Loader />
        </div>
);
  }

  return <>{children}</>;
}