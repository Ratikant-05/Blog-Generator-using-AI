


// styling code for index.html
// 001
 // Typewriter Effect
 const typewriterText = document.querySelector('.typewriter-text');
 const words = ['Social Media', 'Blog Writer', 'Image Generation'];
 let wordIndex = 0;
 let charIndex = 0;
 let isDeleting = false;
 let typingSpeed = 100;

 function typeWriter() {
     const currentWord = words[wordIndex];
     
     if (isDeleting) {
         typewriterText.textContent = currentWord.substring(0, charIndex - 1);
         charIndex--;
         typingSpeed = 50;
     } else {
         typewriterText.textContent = currentWord.substring(0, charIndex + 1);
         charIndex++;
         typingSpeed = 100;
     }

     if (!isDeleting && charIndex === currentWord.length) {
         isDeleting = true;
         typingSpeed = 1000; // Pause at end of word
     } else if (isDeleting && charIndex === 0) {
         isDeleting = false;
         wordIndex = (wordIndex + 1) % words.length;
         typingSpeed = 500; // Pause before typing next word
     }

     setTimeout(typeWriter, typingSpeed);
 }

 // Start the typewriter effect
 setTimeout(typeWriter, 1000);



// 002
 // Simple toggle for hamburger menu
 document.querySelector('.hamburger').addEventListener('click', function() {
     document.querySelector('.nav-links').classList.toggle('active');
 });


// 003
 // Intersection Observer for scroll animations
 const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             entry.target.classList.add('show');
             
             // Add animation to stat numbers when they come into view
             if (entry.target.classList.contains('stat-item')) {
                 entry.target.querySelector('.stat-number').classList.add('show');
             }
             
             // Add animation to steps when they come into view
             if (entry.target.classList.contains('step')) {
                 setTimeout(() => {
                     entry.target.classList.add('show');
                 }, Array.from(entry.target.parentNode.children).indexOf(entry.target) * 200);
             }
         }
     });
 }, { threshold: 0.1 });

//  004
 // Observe all sections, feature cards, testimonial cards, templates, and steps
 document.querySelectorAll('section, .feature-card, .testimonial-card, .template, .step').forEach(el => {
     observer.observe(el);
 });


//  005
 // Handle form submission
 document.querySelectorAll('form').forEach(form => {
     form.addEventListener('submit', function(e) {
         e.preventDefault();
         showLoading();
         const topic = this.querySelector('input[name="topic"]').value;
         window.location.href = `blog-generator.html?topic=${encodeURIComponent(topic)}`;
         setTimeout(hideLoading, 1000);
     });
 });
 
//  006
 // Add animated class to buttons on hover
 document.querySelectorAll('.btn').forEach(btn => {
     btn.addEventListener('mouseenter', function() {
         this.querySelector('i')?.classList.add('fa-beat');
     });
     
     btn.addEventListener('mouseleave', function() {
         this.querySelector('i')?.classList.remove('fa-beat');
     });
 });

//  007
 // Add scroll reveal functionality
 const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
 const scrollRevealObserver = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             entry.target.classList.add('show');
         }
     });
 }, { threshold: 0.1 });

 scrollRevealElements.forEach(el => scrollRevealObserver.observe(el));


//  008
 // Chart Animation
 const chartObserver = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             entry.target.classList.add('show');
             const bars = entry.target.querySelectorAll('.chart-bar');
             bars.forEach(bar => {
                 const targetHeight = bar.style.getPropertyValue('--target-height');
                 bar.style.height = targetHeight;
             });
         }
     });
 }, { threshold: 0.2 });

 document.querySelectorAll('.chart-card').forEach(card => {
     chartObserver.observe(card);
 });

//  009
 // Add loading animation handler
 function showLoading() {
     document.querySelector('.loading').style.display = 'block';
 }

 function hideLoading() {
     document.querySelector('.loading').style.display = 'none';
 }

//  010
 // Enhanced Stats Animation
 const statsObserver = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             const stats = entry.target.querySelectorAll('.stat-item');
             stats.forEach((stat, index) => {
                 setTimeout(() => {
                     stat.classList.add('show');
                     const number = stat.querySelector('.stat-number');
                     const value = number.textContent;
                     let targetValue;
                     
                     if (value.includes('K')) {
                         targetValue = parseFloat(value) * 1000;
                     } else if (value.includes('M')) {
                         targetValue = parseFloat(value) * 1000000;
                     } else if (value.includes('%')) {
                         targetValue = parseFloat(value);
                     } else {
                         targetValue = parseFloat(value);
                     }
                     
                     number.textContent = '0';
                     animateValue(number, 0, targetValue, 2000);
                 }, index * 200);
             });
         }
     });
 }, { threshold: 0.5 });

 // Observe the stats section
 const statsSection = document.querySelector('.stats');
 if (statsSection) {
     statsObserver.observe(statsSection);
 }


//  011
 // Enhanced Value Animation
 function animateValue(element, start, end, duration) {
     let startTimestamp = null;
     const step = (timestamp) => {
         if (!startTimestamp) startTimestamp = timestamp;
         const progress = Math.min((timestamp - startTimestamp) / duration, 1);
         const value = Math.floor(progress * (end - start) + start);
         element.textContent = formatNumber(value);
         if (progress < 1) {
             window.requestAnimationFrame(step);
         }
     };
     window.requestAnimationFrame(step);
 }

//  012
 function formatNumber(num) {
     if (num >= 1000000) {
         return (num / 1000000).toFixed(1) + 'M';
     } else if (num >= 1000) {
         return (num / 1000).toFixed(1) + 'K';
     } else if (num % 1 !== 0) {
         return num.toFixed(1);
     }
     return num.toString();
 }


//  013
 // Add hover effects to stats
 document.querySelectorAll('.stat-item').forEach(stat => {
     stat.addEventListener('mouseenter', () => {
         const number = stat.querySelector('.stat-number');
         const originalValue = number.textContent;
         const trend = stat.querySelector('.stat-trend');
         
         // Add pulse animation
         number.style.animation = 'pulse 1s ease-in-out';
         trend.style.transform = 'scale(1.1)';
         
         // Reset after animation
         setTimeout(() => {
             number.style.animation = '';
             trend.style.transform = '';
         }, 1000);
     });
 });


//  014
 // Feature Popup Functionality
 const featureCards = document.querySelectorAll('.feature-card');
 const popup = document.querySelector('.feature-popup');
 const overlay = document.querySelector('.feature-popup-overlay');
 const closeBtn = document.querySelector('.popup-close');

 const featureData = {
     'ai-content': {
         icon: 'fa-robot',
         title: 'AI Content Generator',
         description: 'Create high-quality blog posts with our AI assistant.',
         details: 'Our advanced AI uses state-of-the-art language models to help you craft engaging content that resonates with your audience. Get suggestions, overcome writer\'s block, and optimize your content for maximum impact.'
     },
     'templates': {
         icon: 'fa-palette',
         title: 'Beautiful Templates',
         description: 'Choose from hundreds of professionally designed templates.',
         details: 'Each template is fully responsive and customizable to match your brand identity and content style. Make your blog stand out from the crowd with our carefully crafted designs.'
     },
     'seo': {
         icon: 'fa-magnifying-glass',
         title: 'SEO Optimization',
         description: 'Improve your search engine ranking with built-in SEO tools.',
         details: 'Get real-time recommendations for keywords, meta descriptions, and content structure to maximize your organic reach. Our SEO tools help you create content that ranks higher in search results.'
     },
     'export': {
         icon: 'fa-file-export',
         title: 'Easy Export',
         description: 'Export your blog posts in multiple formats.',
         details: 'Seamlessly publish to your existing platforms or download your content for offline use. Support for HTML, Markdown, and direct WordPress integration makes publishing a breeze.'
     }
 };

 featureCards.forEach(card => {
     card.addEventListener('click', () => {
         const feature = card.dataset.feature;
         const data = featureData[feature];
         
         // Update popup content
         popup.querySelector('.popup-icon').innerHTML = `<i class="fa-solid ${data.icon}"></i>`;
         popup.querySelector('.popup-title').textContent = data.title;
         popup.querySelector('.popup-description').textContent = data.description;
         popup.querySelector('.popup-details').textContent = data.details;
         
         // Show popup and overlay
         popup.classList.add('active');
         overlay.classList.add('active');
         document.body.style.overflow = 'hidden';
     });
 });


//  015
 function closePopup() {
     popup.classList.remove('active');
     overlay.classList.remove('active');
     document.body.style.overflow = '';
 }

 closeBtn.addEventListener('click', closePopup);
 overlay.addEventListener('click', closePopup);

 // Close popup on escape key
 document.addEventListener('keydown', (e) => {
     if (e.key === 'Escape') {
         closePopup();
     }
 });

 // Scroll-based decorative elements behavior
 const starsContainer = document.querySelector('.stars-container');
 const squaresContainer = document.querySelector('.squares-container');
 const stars = document.querySelectorAll('.star, .star-small, .star-medium, .star-large');
 const squares = document.querySelectorAll('.square');
 
 function handleScroll() {
     const scrollPosition = window.scrollY;
     const windowHeight = window.innerHeight;
     const documentHeight = document.documentElement.scrollHeight;
     const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;
     
     // Reduce stars opacity and scale as we scroll down
     stars.forEach(star => {
         const opacity = Math.max(0, 1 - (scrollPercentage * 0.01));
         const scale = Math.max(0.5, 1 - (scrollPercentage * 0.005));
         star.style.opacity = opacity;
         star.style.transform = `scale(${scale})`;
     });
     
     // Increase squares opacity and scale as we scroll down
     squares.forEach(square => {
         const opacity = Math.min(1, scrollPercentage * 0.01);
         const scale = Math.min(1.5, 1 + (scrollPercentage * 0.005));
         square.style.opacity = opacity;
         square.style.transform = `scale(${scale})`;
     });
 }
 
 // Add scroll event listener
 window.addEventListener('scroll', handleScroll);
 
 // Initial call to set initial states
 handleScroll();

 // Intersection Observer for FAQ items
 const faqObserver = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             entry.target.classList.add('show');
         }
     });
 }, { threshold: 0.1 });

 // Observe all FAQ items
 document.querySelectorAll('.faq-item').forEach(item => {
     faqObserver.observe(item);
 });

 // FAQ Accordion Functionality
 document.querySelectorAll('.faq-item').forEach(item => {
     const question = item.querySelector('.faq-question');
     const answer = item.querySelector('.faq-answer');
     const icon = item.querySelector('.faq-icon i');

     question.addEventListener('click', () => {
         const isOpen = answer.style.maxHeight;
         
         // Close all other FAQ items
         document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
             if (otherAnswer !== answer) {
                 otherAnswer.style.maxHeight = null;
                 otherAnswer.parentElement.classList.remove('active');
                 otherAnswer.parentElement.querySelector('.faq-icon i').classList.remove('fa-minus');
                 otherAnswer.parentElement.querySelector('.faq-icon i').classList.add('fa-plus');
             }
         });
         
         // Toggle current FAQ item
         if (isOpen) {
             answer.style.maxHeight = null;
             item.classList.remove('active');
             icon.classList.remove('fa-minus');
             icon.classList.add('fa-plus');
         } else {
             answer.style.maxHeight = answer.scrollHeight + 'px';
             item.classList.add('active');
             icon.classList.remove('fa-plus');
             icon.classList.add('fa-minus');
         }
     });
 });






