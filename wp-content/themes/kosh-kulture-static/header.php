<?php
if (!defined('ABSPATH')) {
    exit;
}
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=2">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?> data-siteid="AD-INDIA">
<?php wp_body_open(); ?>
<?php kk_render_static_part('svg-symbols'); ?>
<?php kk_render_static_part('site-header-static'); ?>
<div class="kk-mobile-overlay" data-kk-close></div>

