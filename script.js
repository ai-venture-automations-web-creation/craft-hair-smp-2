// Smooth scroll behavior and navigation
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation scroll effect
    const nav = document.getElementById('nav');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Fade up animations on scroll
    const fadeElements = document.querySelectorAll('.fade-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100); // Stagger animation
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // Counter animation for stats
    const counters = document.querySelectorAll('[data-count]');
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const increment = target / 60; // 60 frames for smooth animation
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                countObserver.unobserve(counter); // Run only once
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        countObserver.observe(counter);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = nav.offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const submitButton = this.querySelector('.form__submit');
            const originalText = submitButton.textContent;
            
            // Update button state
            submitButton.textContent = 'Sending...';
            submitButton.style.opacity = '0.7';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual form handler)
            setTimeout(() => {
                submitButton.textContent = 'Message Sent!';
                submitButton.style.background = '#4ade80';
                
                // Reset form
                setTimeout(() => {
                    this.reset();
                    submitButton.textContent = originalText;
                    submitButton.style.opacity = '1';
                    submitButton.style.background = '';
                    submitButton.disabled = false;
                }, 2000);
            }, 1500);
        });
    }

    // Gallery lightbox effect (simple version)
    const galleryItems = document.querySelectorAll('.gallery__item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                // Create simple lightbox overlay
                const overlay = document.createElement('div');
                overlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    cursor: pointer;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;
                
                const lightboxImg = img.cloneNode();
                lightboxImg.style.cssText = `
                    max-width: 90%;
                    max-height: 90%;
                    object-fit: contain;
                    border-radius: 12px;
                `;
                
                overlay.appendChild(lightboxImg);
                document.body.appendChild(overlay);
                
                // Fade in
                setTimeout(() => {
                    overlay.style.opacity = '1';
                }, 10);
                
                // Close on click
                overlay.addEventListener('click', () => {
                    overlay.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(overlay);
                    }, 300);
                });
                
                // Close on escape key
                const handleEscape = (e) => {
                    if (e.key === 'Escape') {
                        overlay.click();
                        document.removeEventListener('keydown', handleEscape);
                    }
                };
                document.addEventListener('keydown', handleEscape);
            }
        });
    });

    // Parallax effect for hero image
    const heroImage = document.querySelector('.hero__image img');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroImage.style.transform = `translateY(${rate}px)`;
        });
    }

    // Mobile menu handling (if needed for smaller screens)
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Close mobile menu if open (add mobile menu logic here if needed)
        });
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });

});