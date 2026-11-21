/**
 * PACKERS & MOVERS — SCROLL ANIMATIONS & TIMELINE INTERACTION
 * Uses IntersectionObserver to reveal elements on scroll and trigger timeline line animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Reveal on scroll observer
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if (prefersReducedMotion) {
    revealElements.forEach(el => el.classList.add('revealed'));
  } else if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // 2. Timeline Progress Bar Animation
  const timelineSection = document.querySelector('.timeline-track-wrap');
  const timelineFill = document.querySelector('.timeline-line-fill');

  if (timelineSection && timelineFill && !prefersReducedMotion) {
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          timelineFill.style.transform = 'scaleX(1)';
        }
      });
    }, { threshold: 0.3 });

    timelineObserver.observe(timelineSection);
  } else if (timelineFill) {
    timelineFill.style.transform = 'scaleX(1)';
  }

  // 3. Counter Animation utility
  const counters = document.querySelectorAll('.counter-animate');
  if (counters.length > 0 && !prefersReducedMotion && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = +entry.target.getAttribute('data-target');
          let count = 0;
          const speed = 25;
          const step = Math.ceil(target / speed) || 1;
          
          const updateCount = () => {
            count += step;
            if (count < target) {
              entry.target.innerText = count;
              setTimeout(updateCount, 30);
            } else {
              entry.target.innerText = target;
            }
          };
          updateCount();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }
});
