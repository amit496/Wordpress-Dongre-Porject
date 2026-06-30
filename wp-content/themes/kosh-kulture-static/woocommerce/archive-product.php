<?php
/**
 * WooCommerce product archive override.
 *
 * The project currently uses a static product listing design. Rendering that
 * same layout for WooCommerce archives keeps /shop/ visually consistent while
 * products are still being configured in WooCommerce.
 */

defined('ABSPATH') || exit;

get_header();
kk_render_static_part('listing-main');
get_footer();
