import { useState, useEffect } from 'react';

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    let requestId: number | null = null;
    let lastKnownScrollPosition = 0;

    const updateScrollPosition = () => {
      const scrollContainer = document.querySelector('.simplebar-content-wrapper');
      if (scrollContainer) {
        lastKnownScrollPosition = scrollContainer.scrollTop;
      }
      setScrollPosition(lastKnownScrollPosition);
      requestId = null;
    };

    const handleScroll = () => {
      if (requestId === null) {
        requestId = requestAnimationFrame(updateScrollPosition);
      }
    };

    const scrollContainer = document.querySelector('.simplebar-content-wrapper');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
      if (requestId !== null) {
        cancelAnimationFrame(requestId);
      }
    };
  }, []);

  return scrollPosition;
}