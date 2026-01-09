// Mobile Navigation Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const hamburger = document.querySelector('.hamburger');

if (menuToggle && navMenu && hamburger) {
    menuToggle.addEventListener('click', () => {
        console.log('Menu toggle clicked');
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Toggle body overflow when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            console.log('Nav link clicked');
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
} else {
    console.error('Navigation elements not found!');
}

// Update active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Particle System with Error Handling
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    
    if (!particlesContainer) {
        console.warn('Particles container not found');
        return;
    }
    
    const particlesCount = Math.min(60, Math.floor(window.innerWidth / 20));
    
    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 4 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        const color = Math.random() > 0.5 ? 'var(--python-blue)' : 'var(--neural-purple)';
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            opacity: ${Math.random() * 0.4 + 0.1};
            animation: floatParticle ${duration}s ease-in-out infinite;
            animation-delay: ${delay}s;
            pointer-events: none;
            z-index: 1;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add CSS for particle animation if not already present
    if (!document.getElementById('particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% {
                    transform: translate(0, 0) rotate(0deg);
                }
                25% {
                    transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) rotate(90deg);
                }
                50% {
                    transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) rotate(180deg);
                }
                75% {
                    transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) rotate(270deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Typewriter effect with better control
function initTypewriter() {
    const dynamicTextWrapper = document.querySelector('.dynamic-text-wrapper');
    
    if (!dynamicTextWrapper) {
        console.error('Typewriter element not found!');
        return;
    }
    
    const titles = ['Programmer', 'Python Developer', 'Web Developer', 'ML Engineer', 'Trainer'];
    
    // Clear existing content and add titles
    dynamicTextWrapper.innerHTML = '';
    titles.forEach(title => {
        const span = document.createElement('span');
        span.className = 'dynamic-text';
        span.textContent = title;
        dynamicTextWrapper.appendChild(span);
    });
    
    // Ensure animation runs smoothly
    dynamicTextWrapper.style.animation = 'slideUp 15s infinite';
    
    // Restart animation periodically to prevent glitches
    setInterval(() => {
        dynamicTextWrapper.style.animation = 'none';
        void dynamicTextWrapper.offsetWidth; // Trigger reflow
        dynamicTextWrapper.style.animation = 'slideUp 15s infinite';
    }, 15000);
}

// Skill hover effect
function initSkillEffects() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const progressBar = item.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.style.transform = 'scaleX(1.05)';
            }
            
            // Add glow effect
            item.style.boxShadow = '0 0 20px rgba(55, 118, 171, 0.3)';
        });
        
        item.addEventListener('mouseleave', () => {
            const progressBar = item.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.style.transform = 'scaleX(1)';
            }
            item.style.boxShadow = 'none';
        });
    });
}

// Form submission with validation
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name') || 'Guest';
            const email = formData.get('email') || '';
            const message = formData.get('message') || '';
            
            // Basic validation
            let isValid = true;
            const inputs = contactForm.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Here you would normally send the data to a server
            // For now, just show a success message
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            const submitBtn = contactForm.querySelector('.btn');
            const originalText = submitBtn.querySelector('span').textContent;
            const originalHTML = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-check"></i><span>Message Sent!</span>';
            submitBtn.style.background = 'var(--success)';
            submitBtn.disabled = true;
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        });
    }
}

// Intersection Observer for animations
function initScrollAnimations() {
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements
        document.querySelectorAll('.skill-category, .project-card, .contact-item').forEach(el => {
            observer.observe(el);
        });
    }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add CSS for animation classes
function addAnimationStyles() {
    if (!document.getElementById('animation-styles')) {
        const style = document.createElement('style');
        style.id = 'animation-styles';
        style.textContent = `
            .animate-in {
                animation: fadeInUp 0.6s ease forwards;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    
    try {
        addAnimationStyles();
        initParticles();
        initTypewriter();
        initSkillEffects();
        initContactForm();
        initScrollAnimations();
        initSmoothScroll();
        
        // Add form fields if they don't exist
        const contactForm = document.querySelector('.contact-form');
        if (contactForm && !contactForm.querySelector('input[name="name"]')) {
            contactForm.innerHTML = `
                <div class="form-group">
                    <input type="text" name="name" placeholder="Your Name" required>
                </div>
                <div class="form-group">
                    <input type="email" name="email" placeholder="Your Email" required>
                </div>
                <div class="form-group">
                    <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">
                    <span>Send Message</span>
                    <i class="fas fa-paper-plane"></i>
                </button>
            `;
        }
        
        console.log('Initialization complete!');
    } catch (error) {
        console.error('Initialization error:', error);
    }
});

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Reinitialize particles on resize
        const particlesContainer = document.getElementById('particles');
        if (particlesContainer) {
            particlesContainer.innerHTML = '';
            initParticles();
        }
    }, 250);
});

// Handle page load errors
window.addEventListener('error', (e) => {
    console.error('Page error:', e.message);
});

// Log when page is fully loaded
window.addEventListener('load', () => {
    console.log('Page fully loaded');
});