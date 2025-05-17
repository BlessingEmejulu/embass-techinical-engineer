document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 1500);
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu when clicking on links
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Smooth scrolling for navigation links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (mobileMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize Swiper for Projects
    const projectSwiper = new Swiper('.project-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            }
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });

    // Initialize Swiper for Testimonials
    const testimonialSwiper = new Swiper('.testimonial-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            }
        },
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
    });

    // Count-up animation for statistics
    const statItems = document.querySelectorAll('.count');
    const options = {
        threshold: 0.7
    };
    
    // IntersectionObserver for animations
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // For stat counters
                if (entry.target.classList.contains('count')) {
                    const finalValue = parseInt(entry.target.getAttribute('data-count'), 10);
                    let currentValue = 0;
                    const duration = 2000; // 2 seconds
                    const increment = finalValue / (duration / 20); // Update every 20ms
                    
                    const counter = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= finalValue) {
                            entry.target.textContent = finalValue;
                            clearInterval(counter);
                        } else {
                            entry.target.textContent = Math.floor(currentValue);
                        }
                    }, 20);
                } 
                // Add fadeIn animation to other observed elements
                else {
                    entry.target.classList.add('fadeIn');
                }
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // Observe stat counters
    statItems.forEach(stat => {
        observer.observe(stat);
    });
    
    // Observe section titles for fade in animation
    document.querySelectorAll('.section-title').forEach(title => {
        observer.observe(title);
    });
    
    // Form validation
    const quoteForm = document.getElementById('quoteForm');
    const formMessage = document.getElementById('form-message');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (name === '' || phone === '' || service === '' || message === '') {
                showFormMessage('Please fill in all fields', 'error');
                return;
            }
            
            // Validate phone number (basic)
            const phoneRegex = /^[0-9+\-\s]{10,15}$/;
            if (!phoneRegex.test(phone)) {
                showFormMessage('Please enter a valid phone number', 'error');
                return;
            }
            
            // Form would be submitted to server here in a real implementation
            // For this example, we'll just show a success message
            showFormMessage('Thank you for your enquiry! We\'ll contact you shortly.', 'success');
            quoteForm.reset();
        });
    }
    
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        
        setTimeout(() => {
            formMessage.style.display = 'block';
        }, 100);
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
    
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-list a[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('.nav-list a[href*=' + sectionId + ']').classList.remove('active');
            }
        });
    });
});
