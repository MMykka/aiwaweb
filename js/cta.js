document.addEventListener('DOMContentLoaded', function() {
  const ctaContainer = document.querySelector('.cta-container');
  const ctaButton = document.querySelector('.cta-button');

  // Intersection Observer for scroll animation
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
  };

  const ctaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        createFloatingElements();
        ctaObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  if (ctaContainer) {
    ctaObserver.observe(ctaContainer);
  }

  // Create floating elements effect
  function createFloatingElements() {
    const numberOfElements = 15;
    
    for (let i = 0; i < numberOfElements; i++) {
      const element = document.createElement('div');
      element.className = 'floating-element';
      element.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        pointer-events: none;
        animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
      `;
      ctaContainer.appendChild(element);
    }
  }

  // Add click ripple effect
  if (ctaButton) {
    ctaButton.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        animation: ripple 0.6s ease-out;
      `;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  }

  // Mouse move parallax effect
  ctaContainer?.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const title = this.querySelector('.cta-title');
    const description = this.querySelector('.cta-description');
    const button = this.querySelector('.cta-button');

    if (title) {
      title.style.transform = `translateY(${y * 10}px)`;
    }
    if (description) {
      description.style.transform = `translateY(${y * 15}px)`;
    }
    if (button) {
      button.style.transform = `translateY(${y * 20}px)`;
    }
  });

  ctaContainer?.addEventListener('mouseleave', function() {
    const title = this.querySelector('.cta-title');
    const description = this.querySelector('.cta-description');
    const button = this.querySelector('.cta-button');

    if (title) title.style.transform = '';
    if (description) description.style.transform = '';
    if (button) button.style.transform = '';
  });
});

// Add floating animation keyframe
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% {
      transform: translate(0, 0);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    50% {
      transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
    }
  }

  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);