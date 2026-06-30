<?php
if (!defined('ABSPATH')) {
    exit;
}

function kk_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('woocommerce');
    register_nav_menus([
        'primary' => __('Primary Menu', 'kosh-kulture-static'),
        'footer' => __('Footer Menu', 'kosh-kulture-static'),
    ]);
}
add_action('after_setup_theme', 'kk_theme_setup');
add_filter('show_admin_bar', '__return_false');

function kk_theme_assets() {
    $uri = get_template_directory_uri();
    $dir = get_template_directory();
    $asset_version = static function ($path) use ($dir) {
        $file = $dir . $path;
        return file_exists($file) ? (string) filemtime($file) : '1.0';
    };

    wp_enqueue_style('kk-site-commons', $uri . '/assets/css/siteCommons.css', [], $asset_version('/assets/css/siteCommons.css'));
    wp_enqueue_style('kk-global', $uri . '/assets/css/global.css', ['kk-site-commons'], $asset_version('/assets/css/global.css'));
    wp_enqueue_style('kk-swiper', 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css', [], '11');
    wp_enqueue_style('kk-theme', $uri . '/assets/css/theme-front.css', ['kk-global'], $asset_version('/assets/css/theme-front.css'));

    wp_enqueue_script('jquery');
    wp_enqueue_script('kk-swiper', 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js', [], '11', true);

    $is_shop_archive = function_exists('is_shop') && (is_shop() || is_product_taxonomy());

    if (is_page(['products', 'shop', 'product-listing']) || $is_shop_archive) {
        wp_enqueue_style('kk-search', $uri . '/assets/css/searchMain.css', ['kk-global'], $asset_version('/assets/css/searchMain.css'));
        wp_enqueue_script('kk-search-page', $uri . '/assets/js/page-search.js', ['jquery'], $asset_version('/assets/js/page-search.js'), true);
    }

    if (is_page(['product-detail', 'product-details']) || is_singular('product')) {
        wp_enqueue_style('kk-product', $uri . '/assets/css/productMain.css', ['kk-global'], $asset_version('/assets/css/productMain.css'));
        wp_enqueue_style('kk-pdp', $uri . '/assets/css/pdpMain.css', ['kk-global'], $asset_version('/assets/css/pdpMain.css'));
        wp_enqueue_script('kk-product-page', $uri . '/assets/js/page-product.js', ['jquery'], $asset_version('/assets/js/page-product.js'), true);
    }

    wp_enqueue_script('kk-theme', $uri . '/assets/js/theme-front.js', ['jquery', 'kk-swiper'], $asset_version('/assets/js/theme-front.js'), true);
}
add_action('wp_enqueue_scripts', 'kk_theme_assets');

function kk_static_url_rewrite($html) {
    $uri = get_template_directory_uri();
    $home = esc_url(home_url('/'));
    $attrs = 'src|href|data-src|srcset|data-srcset|poster';

    $html = preg_replace('/\b(' . $attrs . ')=([\'"]?)\.\/assets\//i', '$1=$2' . $uri . '/assets/', $html);
    $html = preg_replace('/\b(' . $attrs . ')=([\'"]?)assets\//i', '$1=$2' . $uri . '/assets/', $html);
    $html = preg_replace('/\b(' . $attrs . ')=([\'"]?)\.\/images\//i', '$1=$2' . $uri . '/assets/template-images/', $html);
    $html = preg_replace('/\b(' . $attrs . ')=([\'"]?)images\//i', '$1=$2' . $uri . '/assets/template-images/', $html);
    $html = str_replace('/assets/images//', '/assets/images/', $html);

    return strtr($html, [
        'index.html' => $home,
        'products.html' => esc_url(home_url('/products/')),
        'product-detail.html' => esc_url(home_url('/product-detail/')),
        'cart.html' => esc_url(home_url('/cart/')),
        'wishlist.html' => esc_url(home_url('/wishlist/')),
        'login.html' => esc_url(home_url('/my-account/')),
        'contact.html' => esc_url(home_url('/contact/')),
        'orders.html' => esc_url(home_url('/orders/')),
        'check-balance.html' => esc_url(home_url('/check-balance/')),
    ]);
}

function kk_render_static_part($slug) {
    $file = get_template_directory() . '/template-parts/' . $slug . '.php';
    if (!file_exists($file)) {
        return;
    }
    ob_start();
    include $file;
    echo kk_static_url_rewrite(ob_get_clean());
}
