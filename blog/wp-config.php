<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'tiberiu2_wp272');

/** MySQL database username */
define('DB_USER', 'tiberiu2_wp272');

/** MySQL database password */
define('DB_PASSWORD', '9](Sp04cfl');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'picgb9hkmqqngbebmxffkturjwwhqjjqwfpzplnsxwgq2vyext0kzr9jmbvn3wnf');
define('SECURE_AUTH_KEY',  'h6zkmjtikqbyirjldnoulbftv1ls4elo13qkmoijgp6nplc5lejp1juyfb0srnye');
define('LOGGED_IN_KEY',    'uzovur9rhdyz7cnh9xgjtt9scjjrhj47a4qtht7wiuj1ezrwuma6vkhanstbpvu4');
define('NONCE_KEY',        'gh8nczkgdzxkoxtlsfwkqzcexc6zyiooe5jx2kmhfvodzadwcnmoq8ymlaevpuvg');
define('AUTH_SALT',        'twrnt0se73smw7mnvadyolwgyyf9wecfrxgts9kgxqaf2gporx4fbvrcf5t5rfk4');
define('SECURE_AUTH_SALT', 'ysiwygqeeaeysymqh8ee3zaenjkmjxwrgpwfovr9diaxmu2a3do10hekcscai1sm');
define('LOGGED_IN_SALT',   'clzlv2w8gbzd6atcmy7mbpbxgsslu3pvq1hloukhe2tv3r9ms6tedxbkqduotpy1');
define('NONCE_SALT',       't3p4kzartppsajasu6hfbdegfi2cygldtgyynlvgr5rizbev6k0tn109oiy1zad4');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wpm6_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
