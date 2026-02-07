
        // Scroll animations
        const bookingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe booking elements
        const bookingHeader = document.querySelector('.booking-header');
        const bookingGrid = document.querySelector('.booking-grid');
        
        if (bookingHeader) bookingObserver.observe(bookingHeader);
        if (bookingGrid) bookingObserver.observe(bookingGrid);

        // Form submission
        const bookingForm = document.getElementById('bookingForm');
        const N8N_WEBHOOK_URL = 'https://aiwaaiwa.app.n8n.cloud/webhook/7fd9a5f6-815b-4f46-853a-b5902060e13f'; // Replace with your webhook

        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = bookingForm.querySelector('.submit-button');
            const originalHTML = submitButton.innerHTML;
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value,
                timestamp: new Date().toISOString(),
                source: 'booking_page_form'
            };
            
            // Disable button
            submitButton.disabled = true;
            submitButton.innerHTML = '<span style="opacity: 0.7;">Submitting...</span>';
            
            try {
                // Send to N8N webhook
                const response = await fetch(N8N_WEBHOOK_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                if (response.ok) {
                    // Success
                    submitButton.innerHTML = '✓ Submitted Successfully!';
                    submitButton.style.background = '#10b981';
                    submitButton.style.color = '#ffffff';
                    
                    // Reset form after 2 seconds
                    setTimeout(() => {
                        bookingForm.reset();
                        submitButton.disabled = false;
                        submitButton.innerHTML = originalHTML;
                        submitButton.style.background = '';
                        submitButton.style.color = '';
                    }, 2000);
                    
                    // Scroll to Calendly section
                    document.querySelector('.calendly-card').scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'center'
                    });
                    
                } else {
                    throw new Error('Submission failed');
                }
                
            } catch (error) {
                console.error('Error:', error);
                
                // Error state
                submitButton.innerHTML = '✗ Error - Try Again';
                submitButton.style.background = '#ef4444';
                submitButton.style.color = '#ffffff';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalHTML;
                    submitButton.style.background = '';
                    submitButton.style.color = '';
                }, 2000);
            }
        });
   




        // orb js
// Animation trigger on scroll/load
document.addEventListener('DOMContentLoaded', function() {
    const orbContainer = document.querySelector('.bolt-orb-container');
    const orbLine = document.querySelector('.bolt-orb-line');
    const orb = document.querySelector('.bolt-orb');
    const glowEffect = document.querySelector('.bolt-glow-effect');
    const heroTitle = document.querySelector('.bolt-hero-title');
    const heroSubtitle = document.querySelector('.bolt-hero-subtitle');

    // Trigger animations with a slight delay
    setTimeout(() => {
        orbContainer.classList.add('animate');
        orbLine.classList.add('animate');
        orb.classList.add('animate');
        glowEffect.classList.add('animate');
        heroTitle.classList.add('animate');
        heroSubtitle.classList.add('animate');
    }, 300);
});
