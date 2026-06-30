/**
 * Cart functionality using localStorage
 */
const Cart = {
    STORAGE_KEY: 'ecom_cart',

    getCart: function() {
        const cart = localStorage.getItem(this.STORAGE_KEY);
        return cart ? JSON.parse(cart) : [];
    },

    saveCart: function(cart) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
        this.updateCartCount();
        this.renderMiniCart();
    },

    addItem: function(product) {
        const cart = this.getCart();
        const existingIndex = cart.findIndex(item =>
            item.pid === product.pid &&
            item.size === product.size &&
            item.color === product.color
        );

        if (existingIndex > -1) {
            cart[existingIndex].quantity += product.quantity || 1;
        } else {
            cart.push({
                pid: product.pid,
                name: product.name,
                price: product.price,
                image: product.image,
                color: product.color || '',
                size: product.size || '',
                quantity: product.quantity || 1,
                url: product.url || '#'
            });
        }

        this.saveCart(cart);
        return cart;
    },

    removeItem: function(pid, size, color) {
        let cart = this.getCart();
        cart = cart.filter(item => !(item.pid === pid && item.size === size && item.color === color));
        this.saveCart(cart);
        return cart;
    },

    updateQuantity: function(pid, size, color, quantity) {
        const cart = this.getCart();
        const item = cart.find(item =>
            item.pid === pid &&
            item.size === size &&
            item.color === color
        );

        if (item) {
            item.quantity = parseInt(quantity);
            if (item.quantity <= 0) {
                return this.removeItem(pid, size, color);
            }
        }

        this.saveCart(cart);
        return cart;
    },

    clearCart: function() {
        localStorage.removeItem(this.STORAGE_KEY);
        this.updateCartCount();
        this.renderMiniCart();
    },

    getTotal: function() {
        const cart = this.getCart();
        return cart.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            return total + (price * item.quantity);
        }, 0);
    },

    getItemCount: function() {
        const cart = this.getCart();
        return cart.reduce((count, item) => count + item.quantity, 0);
    },

    updateCartCount: function() {
        const count = this.getItemCount();
        const badges = document.querySelectorAll('[data-minicart-component="qty"]');
        badges.forEach(badge => {
            badge.textContent = count;
        });

        const noItemsLinks = document.querySelectorAll('.header__utility-anchor--no-items');
        const hasItemsLinks = document.querySelectorAll('.header__utility-anchor--has-items');

        noItemsLinks.forEach(link => {
            link.style.display = count === 0 ? 'flex' : 'none';
        });

        hasItemsLinks.forEach(link => {
            link.style.display = count > 0 ? 'flex' : 'none';
            link.setAttribute('title', `Shopping cart, ${count} item${count !== 1 ? 's' : ''} in your cart.`);
        });
    },

    formatPrice: function(price) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    },

    renderMiniCart: function() {
        const overlays = document.querySelectorAll('.header__minicart-overlay');
        const cart = this.getCart();

        overlays.forEach(overlay => {
            if (cart.length === 0) {
                overlay.innerHTML = `
                    <div class="minicart__content">
                        <div class="minicart__header padding--small flex flex-justify-between flex-align-center" style="border-bottom: 1px solid #eee;">
                            <span class="font-weight--semibold">Shopping Bag</span>
                            <button type="button" class="minicart__close" data-minicart-close aria-label="Close cart" style="background: none; border: none; cursor: pointer; padding: 8px; font-size: 20px;">
                                <svg aria-hidden="true" focusable="false" class="icon" style="width: 20px; height: 20px; pointer-events: none;"><use xlink:href="#icon--close"/></svg>
                            </button>
                        </div>
                        <div class="minicart__empty text-align--center padding--normal">
                            <p class="body-type--deci">Your cart is empty</p>
                            <a href="./products.html" class="button button--primary-outline">Continue Shopping</a>
                        </div>
                    </div>
                `;
                this.bindMiniCartEvents(overlay);
                return;
            }

            const itemsHtml = cart.map(item => this.renderMiniCartItem(item)).join('');
            const total = this.getTotal();

            overlay.innerHTML = `
                <div class="minicart__content">
                    <div class="minicart__header padding--small flex flex-justify-between flex-align-center" style="border-bottom: 1px solid #eee;">
                        <span class="font-weight--semibold">Shopping Bag (${this.getItemCount()})</span>
                        <button type="button" class="minicart__close" data-minicart-close aria-label="Close cart" style="background: none; border: none; cursor: pointer; padding: 8px; font-size: 20px;">
                            <svg aria-hidden="true" focusable="false" class="icon" style="width: 20px; height: 20px; pointer-events: none;"><use xlink:href="#icon--close"/></svg>
                        </button>
                    </div>
                    <div class="minicart__items">
                        ${itemsHtml}
                    </div>
                    <div class="minicart__footer padding--small">
                        <div class="minicart__total flex flex-justify-between padding--small-vertical">
                            <span class="font-weight--semibold">Subtotal</span>
                            <span class="font-weight--semibold">${this.formatPrice(total)}</span>
                        </div>
                        <div class="minicart__actions">
                            <a href="./cart.html" class="button button--primary-outline set--w-100 margin--small-bottom">View Cart</a>
                            <a href="./checkout.html" class="button button--primary set--w-100">Checkout</a>
                        </div>
                    </div>
                </div>
            `;

            this.bindMiniCartEvents(overlay);
        });
    },

    renderMiniCartItem: function(item) {
        return `
            <div class="utility-overlay__line-item product-line-item product-line-item--minicart"
                 data-product-container="card"
                 data-pid="${item.pid}"
                 data-item-size="${item.size}"
                 data-item-color="${item.color}">
                <div class="product-line-item__main">
                    <div class="product-line-item__details row">
                        <div class="col-3">
                            <a href="${item.url}" class="product-line-item__image-wrap link" title="${item.name}">
                                <img class="product-line-item__image set--w-100" src="${item.image}" alt="${item.name}" title="${item.name}">
                            </a>
                        </div>
                        <div class="col-9">
                            <div class="product-line-item__header line-item-header font-weight--semibold">
                                <a href="${item.url}" class="product-line-item__name link" title="${item.name}">
                                    ${item.name}
                                </a>
                            </div>
                            <div class="product-line-item__attributes body-type--deci">
                                <div class="row minicart_quantity">
                                    <div class="col-7">
                                        ${item.color ? `<p class="product-line-item__attribute"><span class="product-line-item__attribute-key">Colour:</span> <span class="product-line-item__attribute-value">${item.color}</span></p>` : ''}
                                        ${item.size ? `<p class="product-line-item__attribute"><span class="product-line-item__attribute-key">Size:</span> <span class="product-line-item__attribute-value">${item.size}</span></p>` : ''}
                                    </div>
                                    <div class="col-5">
                                        <div class="product-line-item__qty-form">
                                            <label class="product-line-item__qty-label form-control-label body-type--deci">Qty:</label>
                                            <select class="product-line-item__qty-input form-control form-control--select form-control--small"
                                                    data-cart-qty-select
                                                    data-pid="${item.pid}"
                                                    data-size="${item.size}"
                                                    data-color="${item.color}">
                                                ${[1,2,3,4,5,6,7,8,9,10].map(n => `<option value="${n}" ${n === item.quantity ? 'selected' : ''}>${n}</option>`).join('')}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row productDiscount">
                                    <div class="col-10 price flex--inline flex-flow-wrap">
                                        <span class="price__sales sales">
                                            <span class="value">${this.formatPrice(item.price)}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="product-line-item__actions body-type--deci margin--small-top">
                                <button type="button" class="link link--underline" data-cart-remove data-pid="${item.pid}" data-size="${item.size}" data-color="${item.color}">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    bindMiniCartEvents: function(overlay) {
        overlay.querySelectorAll('[data-cart-remove]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const button = e.target.closest('[data-cart-remove]');
                const pid = button.dataset.pid;
                const size = button.dataset.size;
                const color = button.dataset.color;
                this.removeItem(pid, size, color);
            });
        });

        overlay.querySelectorAll('[data-cart-qty-select]').forEach(select => {
            select.addEventListener('change', (e) => {
                const pid = e.target.dataset.pid;
                const size = e.target.dataset.size;
                const color = e.target.dataset.color;
                const quantity = e.target.value;
                this.updateQuantity(pid, size, color, quantity);
            });
        });

        overlay.querySelectorAll('[data-minicart-close]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                overlay.classList.remove('toggle--active');
                overlay.classList.remove('set--loaded');
            });
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('toggle--active');
                overlay.classList.remove('set--loaded');
            }
        });
    },

    renderCartPage: function() {
        const cartItemsContainer = document.querySelector('.cart__items');
        const cartSummary = document.querySelector('.cart__summary');

        if (!cartItemsContainer) return;

        const cart = this.getCart();

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="cart__empty text-align--center padding--large">
                    <h2 class="heading-type fluid-type--hecto-h6">Your cart is empty</h2>
                    <p class="body-type margin--normal-vertical">Looks like you haven't added anything to your cart yet.</p>
                    <a href="./products.html" class="button button--primary">Continue Shopping</a>
                </div>
            `;
            if (cartSummary) {
                cartSummary.style.display = 'none';
            }
            return;
        }

        if (cartSummary) {
            cartSummary.style.display = 'block';
        }

        const itemsHtml = cart.map(item => this.renderCartPageItem(item)).join('');
        cartItemsContainer.innerHTML = itemsHtml;

        this.updateCartSummary();
        this.bindCartPageEvents();
    },

    renderCartPageItem: function(item) {
        const itemTotal = item.price * item.quantity;
        return `
            <div class="cart__line-item product-line-item product-line-item--cart"
                 data-pid="${item.pid}"
                 data-item-size="${item.size}"
                 data-item-color="${item.color}">
                <div class="product-line-item__main">
                    <div class="product-line-item__details row">
                        <div class="col-3 col-md-2">
                            <a href="${item.url}" class="product-line-item__image-wrap link" title="${item.name}">
                                <img class="product-line-item__image set--w-100" src="${item.image}" alt="${item.name}" title="${item.name}">
                            </a>
                        </div>
                        <div class="col-9 col-md-10">
                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <div class="product-line-item__header line-item-header font-weight--semibold">
                                        <a href="${item.url}" class="product-line-item__name link" title="${item.name}">
                                            ${item.name}
                                        </a>
                                    </div>
                                    <div class="product-line-item__attributes body-type--deci margin--small-top">
                                        ${item.color ? `<p class="product-line-item__attribute"><span class="product-line-item__attribute-key">Colour:</span> <span class="product-line-item__attribute-value">${item.color}</span></p>` : ''}
                                        ${item.size ? `<p class="product-line-item__attribute"><span class="product-line-item__attribute-key">Size:</span> <span class="product-line-item__attribute-value">${item.size}</span></p>` : ''}
                                    </div>
                                </div>
                                <div class="col-12 col-md-3">
                                    <div class="product-line-item__qty-form margin--small-top">
                                        <label class="product-line-item__qty-label form-control-label body-type--deci">Quantity:</label>
                                        <select class="product-line-item__qty-input form-control form-control--select"
                                                data-cart-page-qty
                                                data-pid="${item.pid}"
                                                data-size="${item.size}"
                                                data-color="${item.color}">
                                            ${[1,2,3,4,5,6,7,8,9,10].map(n => `<option value="${n}" ${n === item.quantity ? 'selected' : ''}>${n}</option>`).join('')}
                                        </select>
                                    </div>
                                </div>
                                <div class="col-12 col-md-3 text-align--right">
                                    <div class="line-item-total-price margin--small-top">
                                        <span class="line-item-total-price-amount font-weight--semibold">${this.formatPrice(itemTotal)}</span>
                                    </div>
                                    <div class="unit-price body-type--deci text-color--grey">
                                        ${this.formatPrice(item.price)} each
                                    </div>
                                </div>
                            </div>
                            <div class="product-line-item__actions margin--normal-top">
                                <button type="button" class="product-line-item__remove link link--underline body-type--deci"
                                        data-cart-page-remove
                                        data-pid="${item.pid}"
                                        data-size="${item.size}"
                                        data-color="${item.color}">
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    updateCartSummary: function() {
        const subtotalEl = document.querySelector('[data-cart-subtotal]');
        const totalEl = document.querySelector('[data-cart-total]');
        const itemCountEl = document.querySelector('[data-cart-item-count]');

        const subtotal = this.getTotal();
        const itemCount = this.getItemCount();

        if (subtotalEl) subtotalEl.textContent = this.formatPrice(subtotal);
        if (totalEl) totalEl.textContent = this.formatPrice(subtotal);
        if (itemCountEl) itemCountEl.textContent = `${itemCount} Item${itemCount !== 1 ? 's' : ''}`;
    },

    bindCartPageEvents: function() {
        document.querySelectorAll('[data-cart-page-remove]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const pid = e.target.dataset.pid;
                const size = e.target.dataset.size;
                const color = e.target.dataset.color;
                this.removeItem(pid, size, color);
                this.renderCartPage();
            });
        });

        document.querySelectorAll('[data-cart-page-qty]').forEach(select => {
            select.addEventListener('change', (e) => {
                const pid = e.target.dataset.pid;
                const size = e.target.dataset.size;
                const color = e.target.dataset.color;
                const quantity = e.target.value;
                this.updateQuantity(pid, size, color, quantity);
                this.renderCartPage();
            });
        });
    },

    init: function() {
        this.updateCartCount();
        this.renderMiniCart();

        if (document.querySelector('.cart__items')) {
            this.renderCartPage();
        }

        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();

                const productContainer = btn.closest('[data-product-container]') || btn.closest('.pdp-main') || document;

                const pid = btn.dataset.pid || productContainer.querySelector('[data-pid]')?.dataset.pid || '';
                const nameEl = productContainer.querySelector('[data-product-component="name"]') || productContainer.querySelector('.pdp__name');
                const name = nameEl?.textContent?.trim() || 'Product';

                const priceEl = productContainer.querySelector('[itemprop="price"]') || productContainer.querySelector('.price__sales .value');
                let price = priceEl?.getAttribute('content') || priceEl?.textContent?.replace(/[^\d.]/g, '') || '0';

                const imageEl = productContainer.querySelector('.pdp-main__image img') || productContainer.querySelector('.product-tile__image');
                const image = imageEl?.src || './assets/images/products/placeholder.jpg';

                const colorEl = productContainer.querySelector('[data-attr="color"] .selected-assistive-text') ||
                               productContainer.querySelector('.color-value') ||
                               productContainer.querySelector('[data-product-component="color"] .selected');
                const color = colorEl?.textContent?.trim() || '';

                const sizeEl = productContainer.querySelector('[data-attr="size"] .selected-assistive-text') ||
                              productContainer.querySelector('.size-value') ||
                              productContainer.querySelector('[data-product-component="size"] .selected') ||
                              productContainer.querySelector('select[data-product-component="size"]');
                const size = sizeEl?.value || sizeEl?.textContent?.trim() || '';

                const product = {
                    pid: pid,
                    name: name,
                    price: parseFloat(price),
                    image: image,
                    color: color,
                    size: size,
                    quantity: 1,
                    url: window.location.href
                };

                this.addItem(product);

                const minicartOverlay = document.querySelector('.header__minicart-overlay');
                if (minicartOverlay) {
                    minicartOverlay.classList.add('toggle--active');
                }

                btn.textContent = 'Added!';
                setTimeout(() => {
                    btn.textContent = 'Add To Cart';
                }, 1500);
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', function() {
    Cart.init();
});
