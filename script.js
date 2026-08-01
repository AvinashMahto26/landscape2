/**
 * AMBIUS LANDSCAPE - CASA PALERMO ARCHITECTURAL INTERACTIVE LOGIC
 * Features:
 * 1. 1-Second Minimalist Architectural Loading Screen ("Ambius")
 * 2. 6-Slide Full-Screen Architectural Auto Hero Carousel:
 *    - Vertically centered < and > arrows (extreme Left & Right)
 *    - DYNAMIC GLASSY CIRCULAR DOTS: automatically creates exact number of circular dots based on slides!
 * 3. 2 RADICALLY DISTINCT Image Reveal Animations:
 *    - .anim-curtain-navy (Navy Left-to-Right Wipe)
 *    - .anim-center-doors (Double Shutters Parting from Center)
 *    -> Triggers & Repeats EVERY TIME you scroll into view!
 * 4. Editorial Text Reveal Animations (Repeats on every scroll)
 * 5. Architectural Custom Trailing Cursor with Hover Expansion
 * 6. Transparent Frosted Glass Navbar on scroll
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. PREMIUM ANIMATED LOADING SCREEN
    const loader = document.getElementById('ambius-loader');
    if (loader) {
        document.body.style.overflow = 'hidden';
        // Let logo animation play out
        setTimeout(() => {
            loader.classList.add('loaded');
            document.body.style.overflow = 'auto';
            // Remove loader from DOM after exit animation finishes
            setTimeout(() => {
                loader.remove();
            }, 1300);
        }, 2000);
    }

    // 2. HERO CAROUSEL WITH DYNAMIC GLASSY CIRCULAR DOTS & VERTICAL ARROWS
    const slides = document.querySelectorAll('.hero-slide');
    const dotsContainer = document.getElementById('hero-dots-glassy');
    const nextBtn = document.getElementById('hero-next');
    const prevBtn = document.getElementById('hero-prev');

    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;
        let dots = [];

        // DYNAMICALLY GENERATE CIRCULAR DOTS IN GLASSY CONTAINER
        if (dotsContainer) {
            dotsContainer.innerHTML = ''; // Clean start
            slides.forEach((_, i) => {
                const dotBtn = document.createElement('button');
                dotBtn.className = 'hero-circle-dot' + (i === 0 ? ' active' : '');
                dotBtn.setAttribute('aria-label', `Go to Slide ${i + 1}`);
                dotBtn.addEventListener('click', () => {
                    updateSlide(i);
                    resetAutoSlide();
                });
                dotsContainer.appendChild(dotBtn);
                dots.push(dotBtn);
            });
        }

        const updateSlide = (index) => {
            slides.forEach((s, i) => {
                s.classList.toggle('active', i === index);
            });
            if (dots.length > 0) {
                dots.forEach((d, i) => {
                    d.classList.toggle('active', i === index);
                });
            }
            currentSlide = index;
        };

        const nextSlide = () => {
            let index = (currentSlide + 1) % slides.length;
            updateSlide(index);
        };

        const prevSlide = () => {
            let index = (currentSlide - 1 + slides.length) % slides.length;
            updateSlide(index);
        };

        const startAutoSlide = () => {
            slideInterval = setInterval(nextSlide, 4500); // Auto slide every 4.5s
        };

        const resetAutoSlide = () => {
            clearInterval(slideInterval);
            startAutoSlide();
        };

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetAutoSlide();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetAutoSlide();
            });
        }

        startAutoSlide();
    }

    // 3. 2 RADICALLY DISTINCT SIGNATURE REVEAL ANIMATIONS (Repeats EVERY TIME!)
    const revealSelectors = [
        '.anim-curtain-navy',
        '.anim-center-doors'
    ].join(', ');

    const imageReveals = document.querySelectorAll(revealSelectors);
    const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            } else {
                // Remove so animation replays every single time you scroll back to it
                entry.target.classList.remove('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    imageReveals.forEach(el => imgObserver.observe(el));

    // 4. EDITORIAL TEXT REVEAL ANIMATIONS (Repeats EVERY TIME!)
    const textReveals = document.querySelectorAll('.text-reveal-left, .text-reveal-right, .text-reveal-up');
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            } else {
                entry.target.classList.remove('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    textReveals.forEach(el => textObserver.observe(el));

    // 5. ARCHITECTURAL CUSTOM CURSOR (Desktop only - skip on touch devices)
    const isTouchDevice = !window.matchMedia('(pointer: fine)').matches;
    if (!isTouchDevice) {
        const cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        const cursorRing = document.createElement('div');
        cursorRing.className = 'cursor-ring';
        
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorRing);

        let mouseX = -100;
        let mouseY = -100;
        let ringX = -100;
        let ringY = -100;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
            cursorDot.style.opacity = '1';
            cursorRing.style.opacity = '1';
        });

        const animateCursor = () => {
            ringX += (mouseX - ringX) * 0.18;
            ringY += (mouseY - ringY) * 0.18;
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        const hoverSelectors = 'a, button, input, textarea, .big-card, .ed-value-card, .hero-circle-dot, .hero-arrow-btn';
        document.querySelectorAll(hoverSelectors).forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });

        // Dark Background Cursor Adaptation
        const darkSections = document.querySelectorAll('.hero-carousel, .page-hero-banner, .editorial-cta-banner, .ed-footer');
        darkSections.forEach(sec => {
            sec.addEventListener('mouseenter', () => document.body.classList.add('dark-theme-cursor'));
            sec.addEventListener('mouseleave', () => document.body.classList.remove('dark-theme-cursor'));
        });
    }

    // 6. TRANSPARENT FROSTED GLASS NAVBAR ON SCROLL
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 7. MOBILE HAMBURGER MENU TOGGLE
    const hamburger = document.querySelector('.nav-hamburger');
    const mobileOverlay = document.getElementById('mobile-nav-overlay');

    if (hamburger && mobileOverlay) {
        hamburger.addEventListener('click', () => {
            const isActive = hamburger.classList.toggle('active');
            mobileOverlay.classList.toggle('active');

            // Lock body scroll when menu is open
            if (isActive) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });

        // Close menu when a nav link is clicked
        mobileOverlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // 8. CONTACT FORM SUBMISSION
    const contactForm = document.getElementById('ambius-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'TRANSMITTING INQUIRY...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = 'INQUIRY SUBMITTED SUCCESSFULLY ✓';
                submitBtn.style.backgroundColor = '#10182B';
                submitBtn.style.color = '#FFFFFF';
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.color = '';
                    submitBtn.disabled = false;
                }, 4000);
            }, 1200);
        });
    }

    // 9. ARCHITECTURAL FULLSCREEN GALLERY LIGHTBOX
    const galleryImages = Array.from(document.querySelectorAll('.arch-gallery-card img, .arch-gallery-img-wrap img, .big-card-img img'));
    if (galleryImages.length > 0) {
        // Create Lightbox DOM automatically
        const lightboxEl = document.createElement('div');
        lightboxEl.id = 'ambius-lightbox';
        lightboxEl.className = 'ambius-lightbox';
        lightboxEl.setAttribute('role', 'dialog');
        lightboxEl.setAttribute('aria-modal', 'true');
        lightboxEl.setAttribute('aria-label', 'Image Fullscreen View');
        lightboxEl.innerHTML = `
            <div class="lightbox-backdrop"></div>
            <button class="lightbox-close" aria-label="Close Lightbox">&times;</button>
            <button class="lightbox-prev" aria-label="Previous Image">&#10094;</button>
            <div class="lightbox-content">
                <img id="lightbox-img" src="" alt="Full Screen Architecture">
                <div class="lightbox-caption" id="lightbox-caption"></div>
            </div>
            <button class="lightbox-next" aria-label="Next Image">&#10095;</button>
        `;
        document.body.appendChild(lightboxEl);

        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const closeBtn = lightboxEl.querySelector('.lightbox-close');
        const prevBtn = lightboxEl.querySelector('.lightbox-prev');
        const nextBtn = lightboxEl.querySelector('.lightbox-next');
        const backdrop = lightboxEl.querySelector('.lightbox-backdrop');

        let currentIndex = 0;

        function openLightbox(index) {
            currentIndex = index;
            const img = galleryImages[currentIndex];
            const imgSrc = img.getAttribute('src');
            const imgAlt = img.getAttribute('alt') || 'Architectural View';

            lightboxImg.setAttribute('src', imgSrc);
            lightboxImg.setAttribute('alt', imgAlt);
            lightboxCaption.textContent = `${imgAlt} // ( ${currentIndex + 1} / ${galleryImages.length} )`;

            lightboxEl.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightboxEl.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            openLightbox(currentIndex);
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            openLightbox(currentIndex);
        }

        galleryImages.forEach((img, index) => {
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                openLightbox(index);
            });
        });

        closeBtn.addEventListener('click', closeLightbox);
        backdrop.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showPrev();
        });
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showNext();
        });

        document.addEventListener('keydown', (e) => {
            if (!lightboxEl.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
        });
    }
});

