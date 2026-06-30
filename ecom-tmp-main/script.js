document.addEventListener('DOMContentLoaded', () => {
    // Load Footer Component
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = `
<footer class="footer">
    <div class="footer-content stagger-reveal">
        <div class="footer-section stagger-item">
            <h4>Customer Service</h4>
            <ul>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Shipping & Delivery</a></li>
                <li><a href="#">Returns & Exchange</a></li>
                <li><a href="#">Track Order</a></li>
            </ul>
        </div>
        <div class="footer-section stagger-item">
            <h4>About Us</h4>
            <ul>
                <li><a href="#">Our Story</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Sustainability</a></li>
            </ul>
        </div>
        <div class="footer-section stagger-item">
            <h4>Quick Links</h4>
            <ul>
                <li><a href="#">Gift Cards</a></li>
                <li><a href="#">Store Locator</a></li>
                <li><a href="#">Size Guide</a></li>
                <li><a href="#">Wishlist</a></li>
            </ul>
        </div>
        <div class="footer-section stagger-item">
            <h4>Connect With Us</h4>
            <div class="social-links">
                <a href="#" class="social-link">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                </a>
                <a href="#" class="social-link">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                </a>
                <a href="#" class="social-link">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                </a>
                <a href="#" class="social-link youtube">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                </a>
            </div>
            <div class="newsletter">
                <h4>Subscribe to Newsletter</h4>
                <div class="newsletter-form">
                    <input type="email" placeholder="Enter your email">
                    <button type="submit">Subscribe</button>
                </div>
            </div>
        </div>
    </div>
    <div class="footer-bottom">
        <p>&copy; 2026 Dash and Dot. All Rights Reserved.</p>
        <div class="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
        </div>
    </div>
</footer>`;
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.scroll-reveal');
    animatedElements.forEach(el => observer.observe(el));

    const staggerElements = document.querySelectorAll('.stagger-reveal');
    staggerElements.forEach((container) => {
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const children = entry.target.querySelectorAll('.stagger-item');
                    children.forEach((child, index) => {
                        child.style.transitionDelay = `${index * 0.1}s`;
                        child.classList.add('revealed');
                    });
                    staggerObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        staggerObserver.observe(container);
    });

    const promoBanner = document.querySelector('.promo-banner');
    const promoClose = document.querySelector('.promo-close');
    if (promoClose && promoBanner) {
        promoClose.addEventListener('click', () => {
            promoBanner.style.transform = 'translateY(-100%)';
            promoBanner.style.opacity = '0';
            setTimeout(() => promoBanner.style.display = 'none', 300);
        });
    }

    // Mobile Menu Functionality
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuClose = document.getElementById('mobileMenuClose');

    function openMobileMenu() {
        if (mobileMenuDrawer && mobileMenuOverlay) {
            mobileMenuDrawer.classList.add('active');
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeMobileMenu() {
        if (mobileMenuDrawer && mobileMenuOverlay) {
            mobileMenuDrawer.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', openMobileMenu);
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    // Mobile Filter Drawer Functionality
    const mobileFilterBtn = document.getElementById('mobileFilterBtn');
    const filterDrawer = document.getElementById('filterDrawer');
    const filterDrawerClose = document.getElementById('filterDrawerClose');
    const filterApplyBtn = document.querySelector('.filter-apply-btn');
    const filterClearBtn = document.querySelector('.filter-clear-btn');

    function openFilterDrawer() {
        if (filterDrawer && mobileMenuOverlay) {
            filterDrawer.classList.add('active');
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeFilterDrawer() {
        if (filterDrawer && mobileMenuOverlay) {
            filterDrawer.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (mobileFilterBtn) {
        mobileFilterBtn.addEventListener('click', openFilterDrawer);
    }

    if (filterDrawerClose) {
        filterDrawerClose.addEventListener('click', closeFilterDrawer);
    }

    if (filterApplyBtn) {
        filterApplyBtn.addEventListener('click', closeFilterDrawer);
    }

    if (filterClearBtn) {
        filterClearBtn.addEventListener('click', () => {
            const checkboxes = filterDrawer.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(cb => cb.checked = false);
        });
    }

    // Close drawers on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
            closeFilterDrawer();
        }
    });

    // Handle window resize - close mobile menu on desktop
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
                closeFilterDrawer();
            }
        }, 250);
    });

    // Product Detail Page Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(tabId)?.classList.add('active');
        });
    });

    // Quantity Selector
    const qtyMinus = document.querySelector('.qty-btn.minus');
    const qtyPlus = document.querySelector('.qty-btn.plus');
    const qtyInput = document.querySelector('.qty-input');

    if (qtyMinus && qtyPlus && qtyInput) {
        qtyMinus.addEventListener('click', () => {
            let val = parseInt(qtyInput.value) || 1;
            if (val > 1) qtyInput.value = val - 1;
        });

        qtyPlus.addEventListener('click', () => {
            let val = parseInt(qtyInput.value) || 1;
            if (val < 10) qtyInput.value = val + 1;
        });
    }

    // Size Button Selection
    const sizeBtns = document.querySelectorAll('.size-btn:not(.disabled)');
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Color Button Selection with Variant Images
    const colorBtns = document.querySelectorAll('.color-btn');
    const thumbnailList = document.getElementById('thumbnailList');
    const mainProductImage = document.getElementById('mainProductImage');
    const selectedColorName = document.getElementById('selectedColorName');

    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            colorBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const colorName = btn.getAttribute('data-color');
            const imagesData = btn.getAttribute('data-images');

            if (selectedColorName && colorName) {
                selectedColorName.textContent = colorName;
            }

            if (imagesData && thumbnailList && mainProductImage) {
                const images = JSON.parse(imagesData);

                thumbnailList.innerHTML = images.map((img, index) => `
                    <button class="thumbnail ${index === 0 ? 'active' : ''}">
                        <img src="${img}?w=80&h=100&fit=crop" alt="Thumbnail ${index + 1}">
                    </button>
                `).join('');

                mainProductImage.src = `${images[0]}?w=600&h=800&fit=crop`;

                initThumbnailClicks();
            }
        });
    });

    function initThumbnailClicks() {
        const thumbnails = document.querySelectorAll('.thumbnail');
        const mainImage = document.getElementById('mainProductImage');

        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                if (mainImage) {
                    const thumbImg = thumb.querySelector('img');
                    mainImage.src = thumbImg.src.replace('w=80&h=100', 'w=600&h=800');
                }
            });
        });
    }

    initThumbnailClicks();

    // Gallery Navigation Buttons
    const prevBtn = document.querySelector('.main-image .nav-btn.prev');
    const nextBtn = document.querySelector('.main-image .nav-btn.next');

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            const thumbnails = document.querySelectorAll('.thumbnail');
            const activeThumb = document.querySelector('.thumbnail.active');
            const activeIndex = Array.from(thumbnails).indexOf(activeThumb);
            const prevIndex = activeIndex > 0 ? activeIndex - 1 : thumbnails.length - 1;
            thumbnails[prevIndex].click();
        });

        nextBtn.addEventListener('click', () => {
            const thumbnails = document.querySelectorAll('.thumbnail');
            const activeThumb = document.querySelector('.thumbnail.active');
            const activeIndex = Array.from(thumbnails).indexOf(activeThumb);
            const nextIndex = activeIndex < thumbnails.length - 1 ? activeIndex + 1 : 0;
            thumbnails[nextIndex].click();
        });
    }
});
