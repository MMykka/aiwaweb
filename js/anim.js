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









        // Intersection Observer for scroll animations
const scrollAnimationOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animate AI tool items if this is the AI tools card
            if (entry.target.classList.contains('ai-tools-card')) {
                const toolItems = entry.target.querySelectorAll('.ai-tool-item');
                toolItems.forEach(item => {
                    item.classList.add('animate-item');
                });
            }
            
            // Don't unobserve to allow re-animation on scroll up if desired
            // animateOnScroll.unobserve(entry.target);
        }
    });
}, scrollAnimationOptions);

// Observe all feature cards
document.addEventListener('DOMContentLoaded', () => {
    const featureCards = document.querySelectorAll('.feature-card');
    const animatedSection = document.querySelector('.animated-card-section');
    
    featureCards.forEach(card => {
        animateOnScroll.observe(card);
    });
    
    if (animatedSection) {
        animateOnScroll.observe(animatedSection);
    }
});

// Optional: Re-trigger animations when scrolling back up
// Remove the lines above that unobserve elements if you want one-time animations







// Carousel and Integrations Scroll Animation Handler
function initCarouselScrollAnimations() {
    const carouselAnimationConfig = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };

    const carouselScrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-visible');
                
                // If it's the carousel section, also animate its children
                if (entry.target.classList.contains('carousel-logos')) {
                    const badge = entry.target.querySelector('.integrations-badge');
                    const title = entry.target.querySelector('.integrations-title');
                    const description = entry.target.querySelector('.integrations-description');
                    const containers = entry.target.querySelectorAll('.logoloop-container');
                    
                    // Trigger badge, title, and description animations
                    setTimeout(() => {
                        if (badge) badge.classList.add('scroll-visible');
                    }, 100);
                    
                    setTimeout(() => {
                        if (title) title.classList.add('scroll-visible');
                    }, 200);
                    
                    setTimeout(() => {
                        if (description) description.classList.add('scroll-visible');
                    }, 400);
                    
                    // Trigger logo container animations
                    containers.forEach((container, index) => {
                        setTimeout(() => {
                            container.classList.add('scroll-visible');
                        }, 600 + (index * 200));
                    });
                }
                
                // Optional: Unobserve after animation
                // carouselScrollObserver.unobserve(entry.target);
            }
        });
    }, carouselAnimationConfig);

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        // Observe the main carousel section
        const carouselSection = document.querySelector('.carousel-logos');
        if (carouselSection) {
            carouselScrollObserver.observe(carouselSection);
        }

        // Also observe individual elements for more granular control
        const integrationsBadge = document.querySelector('.integrations-badge');
        const integrationsTitle = document.querySelector('.integrations-title');
        const integrationsDescription = document.querySelector('.integrations-description');
        const logoContainers = document.querySelectorAll('.logoloop-container');

        if (integrationsBadge) carouselScrollObserver.observe(integrationsBadge);
        if (integrationsTitle) carouselScrollObserver.observe(integrationsTitle);
        if (integrationsDescription) carouselScrollObserver.observe(integrationsDescription);
        
        logoContainers.forEach(container => {
            carouselScrollObserver.observe(container);
        });
    });
}

// Initialize the carousel scroll animations
initCarouselScrollAnimations();













// Workflow Cards Scroll Animation Handler
function initWorkflowScrollAnimations() {
    const workflowAnimationConfig = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const workflowScrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-animate');
                
                // Animate workflow card children (steps and connectors)
                if (entry.target.classList.contains('workflow-card')) {
                    const steps = entry.target.querySelectorAll('.step-item');
                    const connectors = entry.target.querySelectorAll('.connector');
                    
                    // Animate steps with staggered delays
                    steps.forEach((step, index) => {
                        setTimeout(() => {
                            step.classList.add('scroll-step-animate');
                        }, 500 + (index * 150));
                    });
                    
                    // Animate connectors with staggered delays
                    connectors.forEach((connector, index) => {
                        setTimeout(() => {
                            connector.classList.add('scroll-connector-animate');
                        }, 550 + (index * 150));
                    });
                }
                
                // Optional: Uncomment to trigger animation only once
                // workflowScrollObserver.unobserve(entry.target);
            }
        });
    }, workflowAnimationConfig);

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        // Observe integrations section 2 elements
        const integrationsBadge2 = document.querySelector('.integrations-badge2');
        const integrationsTitle2 = document.querySelector('.integrations-title2');
        const integrationsDescription2 = document.querySelector('.integrations-description2');
        
        if (integrationsBadge2) workflowScrollObserver.observe(integrationsBadge2);
        if (integrationsTitle2) workflowScrollObserver.observe(integrationsTitle2);
        if (integrationsDescription2) workflowScrollObserver.observe(integrationsDescription2);
        
        // Observe workflow section elements
        const workflowsBadge = document.querySelector('.workflows-section .badge');
        const workflowsTitle = document.querySelector('.workflows-section .title');
        const workflowsDescription = document.querySelector('.workflows-section .description');
        
        if (workflowsBadge) workflowScrollObserver.observe(workflowsBadge);
        if (workflowsTitle) workflowScrollObserver.observe(workflowsTitle);
        if (workflowsDescription) workflowScrollObserver.observe(workflowsDescription);
        
        // Observe the workflow cards section
        const workflowCardsSection = document.querySelector('.workflow-cards-section');
        if (workflowCardsSection) {
            workflowScrollObserver.observe(workflowCardsSection);
        }
        
        // Observe individual workflow cards
        const workflowCards = document.querySelectorAll('.workflow-card');
        workflowCards.forEach(card => {
            workflowScrollObserver.observe(card);
        });
    });
}

// Initialize the workflow scroll animations
initWorkflowScrollAnimations();









// Features Grid Scroll Animation Handler
function initFeaturesGridScrollAnimations() {
    const featuresAnimationConfig = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };

    const featuresScrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-reveal');
                
                // If it's the features grid, animate all cards
                if (entry.target.classList.contains('bolt-features-grid')) {
                    const cards = entry.target.querySelectorAll('.bolt-feature-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('scroll-reveal');
                        }, index * 100);
                    });
                }
                
                // Optional: Uncomment to trigger animation only once
                // featuresScrollObserver.unobserve(entry.target);
            }
        });
    }, featuresAnimationConfig);

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        // Observe integrations section 3 elements
        const integrationsBadge3 = document.querySelector('.integrations-badge3');
        const integrationsTitle3 = document.querySelector('.integrations-title3');
        const integrationsDescription3 = document.querySelector('.integrations-description3');
        
        if (integrationsBadge3) featuresScrollObserver.observe(integrationsBadge3);
        if (integrationsTitle3) featuresScrollObserver.observe(integrationsTitle3);
        if (integrationsDescription3) featuresScrollObserver.observe(integrationsDescription3);
        
        // Observe the features grid
        const featuresGrid = document.querySelector('.bolt-features-grid');
        if (featuresGrid) {
            featuresScrollObserver.observe(featuresGrid);
        }
        
        // Observe individual feature cards
        const featureCards = document.querySelectorAll('.bolt-feature-card');
        featureCards.forEach(card => {
            featuresScrollObserver.observe(card);
        });
        
        // Observe the footer
        const featuresFooter = document.querySelector('.bolt-features-footer');
        if (featuresFooter) {
            featuresScrollObserver.observe(featuresFooter);
        }
    });
}

// Initialize the features grid scroll animations
initFeaturesGridScrollAnimations();