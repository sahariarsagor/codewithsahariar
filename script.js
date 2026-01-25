 // Initialize AOS (Animate On Scroll)
        AOS.init({
            duration: 800,
            offset: 100,
            once: true
        });
        
        // Set current year in footer
        document.getElementById('current-year').textContent = new Date().getFullYear();
        
        // Initialize Typed.js for hero section
        document.addEventListener('DOMContentLoaded', function() {
            // Typed.js text animation
            var typed = new Typed('#typed-text', {
                strings: [
                    'Full-Stack Developer',
                    'UI/UX Designer',
                    'Problem Solver',
                    'Tech Enthusiast'
                ],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 1500,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
            
            // Initialize particles.js background
            particlesJS('particles-js', {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: "#00d9ff" },
                    shape: { type: "circle" },
                    opacity: { value: 0.3, random: true },
                    size: { value: 3, random: true },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#a855f7",
                        opacity: 0.1,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "repulse" },
                        onclick: { enable: true, mode: "push" }
                    }
                },
                retina_detect: true
            });
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('.smooth-scroll').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        // Close mobile menu if open
                        document.getElementById('mobile-menu').classList.remove('open');
                        
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Mobile menu toggle
            const menuToggle = document.getElementById('menu-toggle');
            const mobileMenu = document.getElementById('mobile-menu');
            const closeMenu = document.getElementById('close-menu');
            
            menuToggle.addEventListener('click', () => {
                mobileMenu.classList.add('open');
            });
            
            closeMenu.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
            });
            
            // Close mobile menu when clicking on a link
            document.querySelectorAll('#mobile-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('open');
                });
            });
            
            // Resume button functionality
            document.getElementById('resume-btn').addEventListener('click', () => {
                alert('Resume download would start here in a real implementation.');
                // In a real scenario, this would trigger a file download
                // window.open('path/to/resume.pdf', '_blank');
            });
            
            document.getElementById('mobile-resume-btn').addEventListener('click', () => {
                alert('Resume download would start here in a real implementation.');
                mobileMenu.classList.remove('open');
            });
            
            // Back to top button
            const backToTopButton = document.getElementById('back-to-top');
            
            window.addEventListener('scroll', () => {
                if (window.scrollY > 500) {
                    backToTopButton.classList.add('show');
                } else {
                    backToTopButton.classList.remove('show');
                }
                
                // Animate timeline line
                const timelineSection = document.getElementById('experience');
                const timelineLine = document.getElementById('timeline-line');
                const sectionTop = timelineSection.offsetTop;
                const sectionHeight = timelineSection.offsetHeight;
                const scrollPosition = window.scrollY;
                const windowHeight = window.innerHeight;
                
                if (scrollPosition > sectionTop - windowHeight / 2) {
                    const progress = Math.min(1, (scrollPosition - sectionTop + windowHeight / 2) / sectionHeight);
                    timelineLine.style.height = `${progress * 100}%`;
                } else {
                    timelineLine.style.height = '0%';
                }
            });
            
            backToTopButton.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // Contact form submission
            const contactForm = document.getElementById('contact-form');
            const successMessage = document.getElementById('success-message');
            
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Simple form validation
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;
                
                if (name && email && message) {
                    // Show success message
                    successMessage.classList.remove('hidden');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMessage.classList.add('hidden');
                    }, 5000);
                    
                    // In a real implementation, you would send the form data to a server
                    console.log('Form submitted:', { name, email, message });
                } else {
                    alert('Please fill in all required fields.');
                }
            });
            
            // Add tilt effect to project cards on mouse move
            document.querySelectorAll('.project-card').forEach(card => {
                card.addEventListener('mousemove', function(e) {
                    const cardRect = this.getBoundingClientRect();
                    const x = e.clientX - cardRect.left;
                    const y = e.clientY - cardRect.top;
                    
                    const centerX = cardRect.width / 2;
                    const centerY = cardRect.height / 2;
                    
                    const rotateY = (x - centerX) / 25;
                    const rotateX = (centerY - y) / 25;
                    
                    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
                });
            });
            
            // Magnetic effect for social icons
            document.querySelectorAll('.magnetic-wrap').forEach(wrap => {
                wrap.addEventListener('mousemove', function(e) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    
                    this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.1)`;
                });
                
                wrap.addEventListener('mouseleave', function() {
                    this.style.transform = 'translate(0, 0) scale(1)';
                });
            });
        });