document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.getElementById('main-image');
    const switchButtons = document.querySelectorAll('.switch-btn');
    
    // Add click event listeners to all switch buttons
    switchButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            switchButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the image source from data attribute
            const newImageSrc = this.getAttribute('data-image');
            
            // Add fade effect
            mainImage.style.opacity = '0.7';
            
            // Change image source after short delay for smooth transition
            setTimeout(() => {
                mainImage.src = newImageSrc;
                mainImage.style.opacity = '1';
            }, 150);
        });
    });
    
    // Add smooth scroll behavior for navigation links
    const navLinks = document.querySelectorAll('.top-nav a, .cta-button');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if it's a hash link for smooth scrolling
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            
            // Add a subtle click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
    
    // Add keyboard navigation for image switcher
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const activeButton = document.querySelector('.switch-btn.active');
            const buttons = Array.from(switchButtons);
            const currentIndex = buttons.indexOf(activeButton);
            
            let nextIndex;
            if (e.key === 'ArrowLeft') {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
            } else {
                nextIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
            }
            
            buttons[nextIndex].click();
        }
    });
    
    // Preload images for smoother transitions
    const imageUrls = ['images/IMG_3770.jpeg', 'images/IMG_3775.jpeg'];
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
    
    // Auto-switch images every 4 seconds
    let autoSwitchInterval;
    
    function startAutoSwitch() {
        autoSwitchInterval = setInterval(() => {
            const activeButton = document.querySelector('.switch-btn.active');
            const buttons = Array.from(switchButtons);
            const currentIndex = buttons.indexOf(activeButton);
            const nextIndex = (currentIndex + 1) % buttons.length;
            
            buttons[nextIndex].click();
        }, 4000);
    }
    
    function stopAutoSwitch() {
        if (autoSwitchInterval) {
            clearInterval(autoSwitchInterval);
        }
    }
    
    // Start auto-switching
    startAutoSwitch();
    
    // Pause auto-switch when user interacts with switcher buttons
    switchButtons.forEach(button => {
        button.addEventListener('mouseenter', stopAutoSwitch);
        button.addEventListener('mouseleave', startAutoSwitch);
    });
    
    // Also pause on manual clicks and resume after a delay
    switchButtons.forEach(button => {
        button.addEventListener('click', function() {
            stopAutoSwitch();
            setTimeout(startAutoSwitch, 6000); // Resume after 6 seconds
        });
    });
    
    // FAQ Modal functionality
    const faqQuestions = document.querySelectorAll('.faq-question-item');
    const modal = document.getElementById('faq-modal');
    const modalQuestion = document.getElementById('modal-question');
    const modalAnswer = document.getElementById('modal-answer');
    const closeBtn = document.querySelector('.close');
    
    const faqData = {
        '1': {
            question: 'How long does it take to see results from social media management?',
            answer: 'Typically, you\'ll start seeing engagement improvements within the first 2-4 weeks. Significant growth in followers and brand awareness usually occurs within 2-3 months of consistent, strategic posting and community engagement.'
        },
        '2': {
            question: 'What platforms do you manage?',
            answer: 'We specialize in Instagram, Facebook, TikTok, and LinkedIn. We\'ll recommend the best platforms for your specific business goals and target audience during our initial consultation.'
        },
        '3': {
            question: 'Do you create all the content or do I need to provide photos?',
            answer: 'We offer both options! We can create custom graphics, source stock photos, and design branded content. We also offer content creation days where we photograph your products/services. You\'re always welcome to provide your own photos too.'
        },
        '4': {
            question: 'What makes VV Social Media different from other agencies?',
            answer: 'Our founder Viktoria brings a unique artistic background and personal touch to every brand. We focus on authentic storytelling, creative content, and building genuine connections with your audience rather than just posting for the sake of posting.'
        }
    };
    
    if (faqQuestions.length > 0 && modal) {
        faqQuestions.forEach(item => {
            item.addEventListener('click', () => {
                const questionId = item.getAttribute('data-question');
                const data = faqData[questionId];
                
                if (data) {
                    modalQuestion.textContent = data.question;
                    modalAnswer.textContent = data.answer;
                    modal.style.display = 'block';
                }
            });
        });
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }
        
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Simple validation
            if (!formObject.name || !formObject.email || !formObject.service) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! We\'ll get back to you within 24 hours.');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
});