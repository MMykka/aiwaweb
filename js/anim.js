    // Simple scroll-triggered animation
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger animations when section becomes visible
                    document.querySelector('.bolt-orb-container').classList.add('animate');
                    document.querySelector('.bolt-orb-line').classList.add('animate');
                    document.querySelector('.bolt-orb').classList.add('animate');
                    document.querySelector('.bolt-glow-effect').classList.add('animate');
                    document.querySelector('.bolt-hero-title').classList.add('animate');
                    document.querySelector('.bolt-hero-subtitle').classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe the hero section
        const heroSection = document.querySelector('.bolt-hero-section');
        observer.observe(heroSection);