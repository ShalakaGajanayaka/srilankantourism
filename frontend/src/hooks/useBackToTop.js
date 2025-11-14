import { useEffect } from 'react';

export function useBackToTop() {
  useEffect(() => {
    let handleScroll;
    let handleClick;
    let progressParent;

    const initBackToTop = () => {
      const progressPath = document.querySelector('.progressParent path');
      if (!progressPath) return;

      const pathLength = progressPath.getTotalLength();
      if (!pathLength) return;

      // Set up the SVG path for progress animation
      progressPath.style.transition = 'none';
      progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
      progressPath.style.strokeDashoffset = pathLength.toString();
      progressPath.getBoundingClientRect();
      progressPath.style.transition = 'stroke-dashoffset 10ms linear';

      // Update progress on scroll
      const updateProgress = () => {
        const scroll = window.pageYOffset || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const progress = pathLength - (scroll * pathLength) / height;
        progressPath.style.strokeDashoffset = progress.toString();
      };

      updateProgress();

      // Get progressParent element
      progressParent = document.querySelector('.progressParent');

      // Show/hide button and update progress on scroll
      handleScroll = () => {
        updateProgress();
        const offset = 50;
        if (progressParent) {
          if (window.pageYOffset > offset) {
            progressParent.classList.add('rn-backto-top-active');
          } else {
            progressParent.classList.remove('rn-backto-top-active');
          }
        }
      };

      window.addEventListener('scroll', handleScroll);

      // Click handler to scroll to top
      if (progressParent) {
        handleClick = (event) => {
          event.preventDefault();
          const duration = 550;
          const start = window.pageYOffset;
          const startTime = performance.now();

          const animateScroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = progress < 0.5 
              ? 2 * progress * progress 
              : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            
            window.scrollTo(0, start * (1 - ease));
            
            if (progress < 1) {
              requestAnimationFrame(animateScroll);
            }
          };

          requestAnimationFrame(animateScroll);
          return false;
        };

        progressParent.addEventListener('click', handleClick);
      }
    };

    // Wait for DOM to be ready
    const timer = setTimeout(initBackToTop, 100);

    // Cleanup
    return () => {
      clearTimeout(timer);
      if (handleScroll) {
        window.removeEventListener('scroll', handleScroll);
      }
      if (progressParent && handleClick) {
        progressParent.removeEventListener('click', handleClick);
      }
    };
  }, []);
}

