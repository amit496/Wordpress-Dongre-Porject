<?php
get_header();
$slug = get_post_field('post_name', get_queried_object_id());
if (in_array($slug, ['products', 'shop', 'product-listing'], true)) {
    kk_render_static_part('listing-main');
} elseif (in_array($slug, ['product-detail', 'product-details'], true)) {
    kk_render_static_part('detail-main');
} else {
    while (have_posts()) {
        the_post();
        the_content();
    }
}
get_footer();

