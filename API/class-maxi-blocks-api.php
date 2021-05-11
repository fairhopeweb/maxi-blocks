<?php

/**
 * Maxi Blocks styles API
 */

if (!defined('ABSPATH')) {
	exit;
}

if (!class_exists('MaxiBlocksAPI')) :
	class MaxiBlocksAPI {

		private $version;
		private $namespace;

		/**
		 * Constructor.
		 */
		public function __construct() {
			$this->version   = '1.0';
			$this->namespace = 'maxi-blocks/v' . $this->version;

			// REST API
			add_action('rest_api_init', array($this, 'mb_register_routes'));

			// Handlers
			add_action('before_delete_post', array($this, 'mb_delete_register'));
		}

		/**
		 * Register options for REST API
		 */
		public function mb_register_options($id) {
			// Post API
			$default_array = [
				'_maxi_blocks_styles'           => '',
				'_maxi_blocks_styles_preview'   => '',
			];
			if (!get_option("mb_post_api_$id"))
				add_option("mb_post_api_$id", $default_array);
		}

		/**
		 * Register REST API routes
		 */
		public function mb_register_routes() {
			register_rest_route(
				$this->namespace,
				'/settings',
				array(
					'methods'             => 'GET',
					'callback'            => array($this, 'get_maxi_blocks_options'),
					'args' => array(
						'id' => array(
							'validate_callback' => function ($param) {
								return is_numeric($param);
							}
						),
					),
					'permission_callback' => function () {
						return current_user_can('edit_posts');
					},
				)
			);
			register_rest_route(
				$this->namespace,
				'/post/(?P<id>\d+)',
				array(
					'methods'             => 'GET',
					'callback'            => array($this, 'get_maxi_blocks_post'),
					'args' => array(
						'id' => array(
							'validate_callback' => function ($param) {
								return is_numeric($param);
							}
						),
					),
					'permission_callback' => function () {
						return current_user_can('edit_posts');
					},
				)
			);
			register_rest_route(
				$this->namespace,
				'/post',
				array(
					'methods'             => 'POST',
					'callback'            => array($this, 'post_maxi_blocks_post'),
					'args' => array(
						'id' => array(
							'validate_callback' => function ($param) {
								return is_numeric($param);
							}
						),
						'meta' => array(
							'validate_callback' => function ($param) {
								return is_string($param);
							}
						),
						'update' => array(
							'validate_callback' => function ($param) {
								return is_bool($param);
							}
						),
					),
					'permission_callback' => function () {
						return current_user_can('edit_posts');
					},
				)
			);
			register_rest_route(
				$this->namespace,
				'/breakpoints',
				array(
					'methods'             => 'GET',
					'callback'            => array($this, 'get_maxi_blocks_breakpoints'),
					'permission_callback' => function () {
						// return current_user_can('edit_posts');
						return true;
					},
				)
			);
			register_rest_route(
				$this->namespace,
				'/style-cards',
				array(
					'methods'             => 'GET',
					'callback'            => array($this, 'get_maxi_blocks_current_style_cards'),
					'permission_callback' => function () {
						return current_user_can('edit_posts');
					},
				)
			);
			register_rest_route(
				$this->namespace,
				'/style-cards',
				array(
					'methods'             => 'POST',
					'callback'            => array($this, 'set_maxi_blocks_current_style_cards'),
					'permission_callback' => function () {
						return current_user_can('edit_posts');
					},
				)
			);
			register_rest_route(
				$this->namespace,
				'/motion-presets',
				array(
					'methods'             => 'GET',
					'callback'            => array($this, 'get_maxi_blocks_current_global_motion_presets'),
					'permission_callback' => function () {
						return current_user_can('edit_posts');
					},
				)
			);
			register_rest_route(
				$this->namespace,
				'/motion-presets',
				array(
					'methods'             => 'POST',
					'callback'            => array($this, 'set_maxi_blocks_current_global_motion_presets'),
					'permission_callback' => function () {
						return current_user_can('edit_posts');
					},
				)
			);

			register_rest_route(
				$this->namespace,
				'/custom-data/(?P<id>\d+)',
				array(
					'methods'             => 'GET',
					'callback'            => array($this, 'get_maxi_blocks_current_custom_data'),
					'args' => array(
						'id' => array(
							'validate_callback' => function ($param) {
								return is_numeric($param);
							}
						),
					),
					'permission_callback' => function () {
						return current_user_can('edit_posts');
					},
				)
			);
			register_rest_route(
				$this->namespace,
				'/custom-data',
				array(
					'methods'             => 'POST',
					'callback'            => array($this, 'set_maxi_blocks_current_custom_data'),
					'args' => array(
						'id' => array(
							'validate_callback' => function ($param) {
								return is_numeric($param);
							}
						),
						'data' => array(
							'validate_callback' => function ($param) {
								return is_string($param);
							}
						),
						'update' => array(
							'validate_callback' => function ($param) {
								return is_bool($param);
							}
						),
					),
					'permission_callback' => function () {
						return current_user_can('edit_posts');
					},
				)
			);
		}


		/**
		 * Returns Maxi Blocks general settings
		 */
		public function get_maxi_blocks_options() {
			global $wp_version;

			$version = '';
			$is_core = true;

			// In case Gutenberg plugin has been installed
			if (defined('GUTENBERG_VERSION')) {
				$version = GUTENBERG_VERSION;
				$is_core = false;
			} else {
				// Versions based on initial compatibility with WP 5.5.3
				if (version_compare($wp_version, '5.5') >= 0 && version_compare($wp_version, '5.5.3') <= 0) {
					$version = '8.5';
				} elseif (version_compare($wp_version, '5.6') >= 0 && version_compare($wp_version, '5.6.1') <= 0) {
					$version = '9.2';
				} elseif (version_compare($wp_version, '5.7') >= 0 && version_compare($wp_version, '5.7.1') >= 0) {
					$version = '9.9';
				} elseif (version_compare($wp_version, '5.8') >= 0 && floatval($wp_version) >= floatval('5.8')) {
					$version = '10.7';
				}
			}


			$response = array(
				'core'     => array(
					'version' => $wp_version,
				),
				'editor'   => array(
					'version' => $version,
					'is_core' => $is_core,
				),
			);

			return $response;
		}

		/**
		 * Get the posts array with the info
		 *
		 * @return $posts JSON feed of returned objects
		 */
		public function get_maxi_blocks_post($data) {
			$this->mb_register_options($data['id']);

			$response = get_option("mb_post_api_{$data['id']}")['_maxi_blocks_styles_preview'];
			if (!$response)
				$response = '';

			return $response;
		}

		/**
		 * Post the posts
		 */
		public function post_maxi_blocks_post($data) {
			$this->mb_register_options($data['id']);

			$styles = get_option("mb_post_api_{$data['id']}");

			if ($data['update']) {
				$styles = [
					'_maxi_blocks_styles'           => $data['meta'],
					'_maxi_blocks_styles_preview'   => $data['meta'],
				];
			} else
				$styles['_maxi_blocks_styles_preview'] = $data['meta'];

			update_option("mb_post_api_{$data['id']}", $styles);

			return $styles;
		}

		public function get_maxi_blocks_breakpoints() {
			return [
				'xs'    => 480,
				's'     => 768,
				'm'     => 1024,
				'l'     => 1366,
				'xl'    => 1920
			];
		}

		public function mb_delete_register($postId) {
			delete_option("mb_post_api$postId");
		}

		public function get_maxi_blocks_current_style_cards() {
			global $wpdb;
			$table_name = $wpdb->prefix . 'maxi_blocks_general';  // table name
			$query = 'SELECT object FROM ' . $table_name . ' where id = "style_cards_current"';
			$style_cards = $wpdb->get_var($query);
			if ($style_cards && !empty($style_cards))
				return $style_cards;
			else {
				require_once (dirname(__FILE__) . '/style-cards/default-style-card-maxi.php');
				$defaultStyleCard = getDefaultStyleCard();

				$wpdb->replace($table_name, array(
					'id' => 'style_cards_current',
					'object' => $defaultStyleCard,
				));
				$style_cards = $wpdb->get_var($query);
				return $style_cards;
			}

		}

		public function set_maxi_blocks_current_style_cards($request) {
			global $wpdb;
			$table_name = $wpdb->prefix . 'maxi_blocks_general';  // table name

			$request_result = $request->get_json_params();

			$wpdb->replace($table_name, array(
				'id' => 'style_cards_current',
				'object' => $request_result['styleCards'],
			));
		}

		public function get_maxi_blocks_current_global_motion_presets() {
			return get_option('maxi_motion_interaction_presets');
		}

		public function set_maxi_blocks_current_global_motion_presets($request) {
			$request_result = $request->get_json_params();
			$result = $request_result;

			return update_option('maxi_motion_interaction_presets', $result['presets']);
		}

		public function mb_register_custom_data_option($id) {
			if (!get_option("mb_custom_data_$id"))
				add_option("mb_custom_data_$id", ['custom_data' => '']);
		}

		public function get_maxi_blocks_current_custom_data($data) {
			$this->mb_register_custom_data_option($data['id']);

			$response = get_option("mb_custom_data_{$data['id']}")['custom_data'];
			if (!$response)
				$response = '';

			return $response;
		}

		public function set_maxi_blocks_current_custom_data($data) {
			$this->mb_register_custom_data_option($data['id']);

			$custom_data = get_option("mb_custom_data_{$data['id']}");

			if ($data['update']) {

				$custom_data = ['custom_data' => $data['data']];

				update_option("mb_custom_data_{$data['id']}", $custom_data);
			}

			return $custom_data;
		}
	}


endif;

// Caller

return new MaxiBlocksAPI();
