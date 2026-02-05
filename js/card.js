 const contents = [
            {
                icon: '⚡',
                title: 'Lightning Fast Performance',
                description: 'Experience blazing fast speeds with our optimized infrastructure. Build and deploy in seconds, not minutes.',
                features: [
                    { icon: '🚀', text: 'Instant deployments' },
                    { icon: '⚙️', text: 'Auto-optimization' },
                    { icon: '📊', text: 'Real-time monitoring' }
                ],
                glowColor: 'white'
            },
            {
                icon: '🎨',
                title: 'Beautiful Design System',
                description: 'Create stunning interfaces with our comprehensive component library and design tokens.',
                features: [
                    { icon: '🎭', text: 'Pre-built components' },
                    { icon: '🌈', text: 'Customizable themes' },
                    { icon: '📱', text: 'Responsive by default' }
                ],
                glowColor: 'blue'
            },
            {
                icon: '🔒',
                title: 'Enterprise Security',
                description: 'Bank-level security built in from the ground up. Your data is always protected and encrypted.',
                features: [
                    { icon: '🛡️', text: 'End-to-end encryption' },
                    { icon: '👥', text: 'Role-based access' },
                    { icon: '📋', text: 'Compliance ready' }
                ],
                glowColor: 'yellow'
            },
            {
                icon: '🤖',
                title: 'AI-Powered Automation',
                description: 'Let AI handle the repetitive tasks while you focus on what matters most - building great products.',
                features: [
                    { icon: '✨', text: 'Smart suggestions' },
                    { icon: '🔄', text: 'Auto-completion' },
                    { icon: '🎯', text: 'Error prevention' }
                ],
                glowColor: 'none'
            }
        ];

        let currentIndex = 0;
        let isTransitioning = false;
        const cardContent = document.getElementById('cardContent');
        const animatedCard = document.getElementById('animatedCard');
        const cardGlow = document.getElementById('cardGlow');

        function createContent(data) {
            return `
                <div class="card-icon icon-${data.glowColor}">${data.icon}</div>
                <h2 class="card-title">${data.title}</h2>
                <p class="card-description">${data.description}</p>
                <div class="card-features">
                    ${data.features.map(feature => `
                        <div class="feature-item">
                            <span class="feature-icon">${feature.icon}</span>
                            <span>${feature.text}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        function updateGlowColor(color) {
            animatedCard.classList.remove('glow-white', 'glow-blue', 'glow-yellow', 'glow-none');
            cardGlow.classList.remove('glow-white', 'glow-blue', 'glow-yellow', 'glow-none');
            
            animatedCard.classList.add(`glow-${color}`);
            cardGlow.classList.add(`glow-${color}`);
        }

        function updateContent() {
            if (isTransitioning) return;
            isTransitioning = true;

            cardContent.classList.remove('fade-in');
            cardContent.classList.add('fade-out');
            
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % contents.length;
                const currentContent = contents[currentIndex];
                
                cardContent.innerHTML = createContent(currentContent);
                updateGlowColor(currentContent.glowColor);
                
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        cardContent.classList.remove('fade-out');
                        cardContent.classList.add('fade-in');
                        
                        setTimeout(() => {
                            isTransitioning = false;
                        }, 800);
                    });
                });
            }, 500);
        }

        // Initialize
        cardContent.innerHTML = createContent(contents[0]);
        updateGlowColor(contents[0].glowColor);
        setTimeout(() => {
            cardContent.classList.add('fade-in');
        }, 100);

        // Auto-cycle every 5 seconds
        setInterval(updateContent, 5000);




        document.addEventListener('DOMContentLoaded', function() {
  // Intersection Observer for cards entering viewport
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        animateWorkflowSteps(card);
        cardObserver.unobserve(card);
      }
    });
  }, observerOptions);

  // Observe all workflow cards
  const cards = document.querySelectorAll('.workflow-card');
  cards.forEach(card => {
    cardObserver.observe(card);
  });

  // Animate workflow steps sequentially
  function animateWorkflowSteps(card) {
    const steps = card.querySelectorAll('.step-item');
    const connectors = card.querySelectorAll('.connector');
    
    steps.forEach((step, index) => {
      setTimeout(() => {
        step.classList.add('animate');
        step.style.animationDelay = `${index * 0.15}s`;
        
        // Animate connector after step
        if (connectors[index]) {
          setTimeout(() => {
            connectors[index].classList.add('animate');
          }, 300);
        }
      }, index * 400);
    });
  }

  // Add hover effect for entire card
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Continuous animation loop for workflows
  function startContinuousAnimation() {
    cards.forEach((card, cardIndex) => {
      setInterval(() => {
        const steps = card.querySelectorAll('.step-item');
        steps.forEach((step, stepIndex) => {
          setTimeout(() => {
            step.style.animation = 'none';
            setTimeout(() => {
              step.style.animation = '';
              step.classList.remove('animate');
              setTimeout(() => {
                step.classList.add('animate');
              }, 10);
            }, 10);
          }, stepIndex * 300);
        });
      }, 8000 + (cardIndex * 1000)); // Stagger each card's loop
    });
  }

  // Start continuous animation after initial load
  setTimeout(startContinuousAnimation, 3000);
});