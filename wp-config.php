<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'woocom_test' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );


define('FS_METHOD', 'direct');


/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'E,&8WXRDgJDx7$:rR_emCl6vH0#uv3Sn|w&Z&cxZ^rd=GAjQBe1Z%,M.cROc3UPI' );
define( 'SECURE_AUTH_KEY',  'G-T mB]8UOUTt{xIXep}HjrL7*HWb+&Z60b)]@Xp@,9[lO%@8M:/w MSkW7;>ohz' );
define( 'LOGGED_IN_KEY',    '[Xo1-%y^I~Kh8VO)H>c55Q_pu7}Fii[b?.g8y.+[%=~cnQ5esG,7XUKo^K,oe>yb' );
define( 'NONCE_KEY',        '[ci1<m0Y.hz=8-Y*Rc;Y*}S1E.b?UTyv0:9V<4N}hz}-{y>%UUEm9XXf`U=4sRse' );
define( 'AUTH_SALT',        '9yvjZ_]<RGM<oqSn;2zb1;sgqI4u+joT]EAMy59<*_9(Uqz+nO_@Z#68G(1 ,=:?' );
define( 'SECURE_AUTH_SALT', 'h UyoE3V}iSPKD=~QZj|<2T~.eR]snSnlkdieF-XL,yw,;-AKXd6(;00dEoz<9qt' );
define( 'LOGGED_IN_SALT',   'aQZBj#N{w^ltnABr+U;xkX0{3]5vy]zxmUQPd.Lst%Mk%C?thy@]z&(szcG1Zh(t' );
define( 'NONCE_SALT',       '4}!|wK:vEk&NYRg2.x1sleSY<v` GFQ0}<{RsRz Fz6QpcRv%KZz}B1KYAJ?<Yqp' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
