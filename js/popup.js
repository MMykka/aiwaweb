 // Variables
        const automationPopupOverlay = document.getElementById('automationPopupOverlay');
        const automationCloseBtn = document.getElementById('automationCloseBtn');
        const automationForm = document.getElementById('automationForm');
        let automationHasShownPopup = false;

        // ⚠️ REPLACE THIS WITH YOUR N8N WEBHOOK URL
        const AUTOMATION_N8N_WEBHOOK_URL = 'https://aiwaaiwa.app.n8n.cloud/webhook/7fd9a5f6-815b-4f46-853a-b5902060e13f';

        // test one
    //   const AUTOMATION_N8N_WEBHOOK_URL = 'https://aiwaaiwa.app.n8n.cloud/webhook-test/7fd9a5f6-815b-4f46-853a-b5902060e13f';

        // URL to redirect after successful submission
        const AUTOMATION_REDIRECT_URL = 'pages/Booking.html'; // Change this to your desired page

        // Function to calculate scroll percentage
        function getAutomationScrollPercentage() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            return (scrollTop / scrollHeight) * 100;
        }

        // Function to show popup
        function showAutomationPopup() {
            automationPopupOverlay.classList.add('automation-popup-active');
            document.body.style.overflow = 'hidden';
        }

        // Function to hide popup
        function hideAutomationPopup() {
            automationPopupOverlay.classList.remove('automation-popup-active');
            document.body.style.overflow = '';
        }

        // Scroll event listener
        window.addEventListener('scroll', function() {
            if (!automationHasShownPopup && getAutomationScrollPercentage() >= 60) {
                showAutomationPopup();
                automationHasShownPopup = true;
            }
        });

        // Close button click
        automationCloseBtn.addEventListener('click', hideAutomationPopup);

        // Close on overlay click
        automationPopupOverlay.addEventListener('click', function(e) {
            if (e.target === automationPopupOverlay) {
                hideAutomationPopup();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && automationPopupOverlay.classList.contains('automation-popup-active')) {
                hideAutomationPopup();
            }
        });

        // Form submission handler
        automationForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = automationForm.querySelector('.automation-popup-cta-btn');
            const email = document.getElementById('automationEmailInput').value;
            const phone = document.getElementById('automationPhoneInput').value;
            
            // Disable button during submission
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';
            
            try {
                // Send data to N8N webhook
                const response = await fetch(AUTOMATION_N8N_WEBHOOK_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        phone: phone,
                        timestamp: new Date().toISOString(),
                        source: 'automation_popup_form'
                    })
                });
                
                if (response.ok) {
                    // Success - redirect to thank you page
                    window.location.href = AUTOMATION_REDIRECT_URL;
                } else {
                    throw new Error('Submission failed');
                }
                
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('There was an error submitting your information. Please try again.');
                submitButton.disabled = false;
                submitButton.textContent = 'Sign up';
            }
        });