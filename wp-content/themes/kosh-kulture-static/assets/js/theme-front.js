(function () {
    function initMegaMenu() {
        var nav = document.querySelector('.navigation__list, .header__nav-list, .nav-list, [data-nav-component="list"]');
        if (!nav || document.querySelector('.kk-mega-menu')) return;

        var item = nav.querySelector('li') || nav;
        var mega = document.createElement('div');
        mega.className = 'kk-mega-menu';
        mega.innerHTML =
            '<div class="kk-mega-grid">' +
            '<div><h3>Women</h3><a href="#">Dresses</a><a href="#">Co-ord Sets</a><a href="#">Sarees</a><a href="#">Kaftans</a></div>' +
            '<div><h3>Men</h3><a href="#">Bandhgalas</a><a href="#">Kurtas</a><a href="#">Jackets</a><a href="#">Shirts</a></div>' +
            '<div><h3>Accessories</h3><a href="#">Bags</a><a href="#">Jewellery</a><a href="#">Belts</a><a href="#">Gift Cards</a></div>' +
            '<div class="kk-mega-promo"><strong>New Season Edit</strong><span>Breath SS26 arrivals with ready-to-ship styles.</span><a href="#">Shop collection</a></div>' +
            '</div>';
        item.classList.add('kk-mega-parent');
        item.appendChild(mega);
    }

    function initHeaderMenu() {
        var trigger = document.querySelector('[data-nav-component="trigger"]');
        var nav = document.getElementById('navigation');
        var close = document.querySelector('.header-flyout__close');
        var overlay = document.querySelector('.kk-mobile-overlay');
        var categories = document.querySelectorAll('.header-flyout__item.maincategory');
        var desktopQuery = window.matchMedia('(min-width: 1024px)');

        function setActiveCategory(item, isActive) {
            var submenu = item.querySelector(':scope > .header-flyout__container.level-2');
            var button = item.querySelector(':scope > button, :scope > a');

            item.classList.toggle('kk-category-open', isActive);
            item.classList.toggle('mega-item--active', isActive);

            if (submenu) {
                submenu.classList.toggle('mega-item--active', isActive);
            }

            if (button) {
                button.classList.toggle('mega-item--active', isActive);
                button.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            }
        }

        function closeCategories(exceptItem) {
            categories.forEach(function (item) {
                if (item !== exceptItem) {
                    setActiveCategory(item, false);
                }
            });
            if (!exceptItem) {
                document.body.classList.remove('kk-mega-open');
            }
        }

        function openMenu() {
            if (!nav) return;
            nav.classList.add('kk-open');
            document.body.classList.add('kk-menu-open');
        }

        function closeMenu() {
            if (!nav) return;
            nav.classList.remove('kk-open');
            document.body.classList.remove('kk-menu-open');
            closeCategories();
        }

        document.addEventListener('click', function (event) {
            var clickedTrigger = event.target.closest('[data-nav-component="trigger"], .header__hamburger-trigger');
            if (!clickedTrigger) return;
            event.preventDefault();
            event.stopPropagation();
            if (typeof event.stopImmediatePropagation === 'function') {
                event.stopImmediatePropagation();
            }
            if (document.body.classList.contains('kk-menu-open')) {
                closeMenu();
            } else {
                openMenu();
            }
        }, true);

        if (close) {
            close.addEventListener('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
                closeMenu();
            }, true);
        }

        if (overlay) {
            overlay.addEventListener('click', closeMenu);
        }

        categories.forEach(function (item) {
            var button = item.querySelector(':scope > button, :scope > a');
            if (!button) return;

            button.setAttribute('aria-expanded', 'false');

            item.addEventListener('mouseenter', function () {
                if (!desktopQuery.matches) return;
                closeCategories(item);
                setActiveCategory(item, true);
                document.body.classList.add('kk-mega-open');
            });

            item.addEventListener('mouseleave', function () {
                if (!desktopQuery.matches) return;
                setActiveCategory(item, false);
                document.body.classList.remove('kk-mega-open');
            });

            button.addEventListener('click', function (event) {
                var submenu = item.querySelector(':scope > .header-flyout__container.level-2');
                if (!submenu) return;
                event.preventDefault();
                event.stopPropagation();
                var willOpen = desktopQuery.matches ? true : !item.classList.contains('kk-category-open');
                closeCategories(item);
                setActiveCategory(item, willOpen);
                document.body.classList.toggle('kk-mega-open', willOpen && desktopQuery.matches);
            }, true);
        });

        document.addEventListener('click', function (event) {
            if (event.target.closest('#navigation')) return;
            closeCategories();
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeMenu();
                closeCategories();
            }
        });
    }

    function initSwiper() {
        if (window.Swiper && document.querySelector('.hero-swiper')) {
            new Swiper('.hero-swiper', {
                loop: true,
                autoplay: { delay: 3500 },
                pagination: { el: '.swiper-pagination', clickable: true }
            });
        }
    }

    function hydrateLazyMedia() {
        document.querySelectorAll('[data-src]').forEach(function (el) {
            if (!el.getAttribute('src')) {
                el.setAttribute('src', el.getAttribute('data-src'));
            }
        });
        document.querySelectorAll('[data-srcset]').forEach(function (el) {
            if (!el.getAttribute('srcset')) {
                el.setAttribute('srcset', el.getAttribute('data-srcset'));
            }
        });
        document.querySelectorAll('.lazyload').forEach(function (el) {
            el.classList.add('lazyloaded', 'opacity-up');
        });
    }

    function initPdpGallery() {
        document.querySelectorAll('.product-gallery-thumbnails__img, [data-image-index]').forEach(function (thumb) {
            thumb.addEventListener('click', function () {
                var src = thumb.getAttribute('src') || thumb.querySelector('img')?.getAttribute('src');
                var main = document.querySelector('.product-gallery__img, .primary-image img, .pdp-main img');
                if (src && main) main.setAttribute('src', src);
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        hydrateLazyMedia();
        initHeaderMenu();
        initMegaMenu();
        initSwiper();
        initPdpGallery();
    });
})();
