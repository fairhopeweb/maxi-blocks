<?php
include('class-maxi-api.php');

class MaxiBlocks_Styles
{
    /**
     * This plugin's instance.
     *
     * @var MaxiBlocks_Styles
     */
    private static $instance;

    /**
     * Registers the plugin.
     */
    public static function register()
    {
        if (null === self::$instance) {
            self::$instance = new MaxiBlocks_Styles();
        }
    }

    /**
     * Constructor
     */
    public function __construct()
    {
        add_action('wp_enqueue_scripts', [$this, 'enqueue_styles']);
    }

    /**
     * Enqueuing styles
     */
    public function enqueue_styles()
    {
        $post_content = $this->getPostMeta();
        $styles = $this->getStyles($post_content);
        $fonts = $this->getFonts($post_content);

        if ($styles) {
            // Inline styles
            wp_register_style('maxi-blocks', false);
            wp_enqueue_style('maxi-blocks');
            wp_add_inline_style('maxi-blocks', $styles);
        }
        if ($fonts) {
            $this->enqueue_fonts($fonts);
        }

        wp_localize_script('maxi-hover-effects', 'maxi_custom_data', [
            'custom_data' => $this->customMeta(),
        ]);

        wp_localize_script('maxi-number-counter', 'maxi_custom_data', [
            'custom_data' => $this->customMeta(),
        ]);

        wp_localize_script('maxi-bg-video', 'maxi_custom_data', [
            'custom_data' => $this->customMeta(),
        ]);

        wp_localize_script('maxi-parallax', 'maxi_custom_data', [
            'custom_data' => $this->customMeta(),
        ]);
    }

    public function write_log($log)
    {
        if (is_array($log) || is_object($log)) {
            error_log(print_r($log, true));
        } else {
            error_log($log);
        }
    }

    /**
     * Gets post meta content
     */
    public function getPostMeta()
    {
        global $post;

        if (!$post || !isset($post->ID)) {
            return false;
        }

        // $post_content = get_option("mb_post_api_{$post->ID}");

        global $wpdb;
        $post_content = (array)$wpdb->get_results(
            "SELECT * FROM {$wpdb->prefix}maxi_blocks_styles WHERE post_id = {$post->ID}",
            OBJECT
        )[0];

        if (!$post_content) {
            return false;
        }
        
        return $post_content;
    }

    /**
     * Gets post styles content
     */
    public function getStyles($post_content)
    {
        $style =
            is_preview() || is_admin()
                ? $post_content['prev_css_value']
                : $post_content['css_value'];

        if (!$style || empty($style)) {
            return false;
        }

        return $style;
    }

    /**
     * Gets post styles content
     */
    public function getFonts($post_content)
    {
        $fonts =
            is_preview() || is_admin()
                ? $post_content['prev_fonts_value']
                : $post_content['fonts_value'];

        if (!$fonts || empty($fonts)) {
            return false;
        }

        return  explode(',', $fonts);
    }

    /**
     * Returns default breakpoints values in case breakpoints are not set
     */
    public function getBreakpoints($breakpoints)
    {
        if (!empty((array) $breakpoints)) {
            return $breakpoints;
        }

        // It may connect to the API to centralize the default values there
        return (object) [
            'xs' => 480,
            's' => 768,
            'm' => 1024,
            'l' => 1366,
            'xl' => 1920,
        ];
    }

    /**
     * Post fonts
     *
     * @return object   Font name with font options
     */

    public function enqueue_fonts($fonts)
    {
        if (!is_array($fonts)) {
            $fonts = [];
        }

        if (!array_key_exists('Roboto', $fonts)) {
            array_push($fonts, 'Roboto');
        }

        foreach ($fonts as $font) {
            wp_enqueue_style(
                $font,
                "https://fonts.googleapis.com/css2?family=$font:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900",
            );
        }
    }

    /**
     * Custom Meta
     */
    public function customMeta()
    {
        global $post;
        if (!$post || !isset($post->ID)) {
            return;
        }

        $MaxiBlocks_API = new MaxiBlocks_API();
        $custom_data = $MaxiBlocks_API->get_maxi_blocks_current_custom_data($post->ID);

        if (!$custom_data) {
            return;
        }

        $resultArr = (array)$custom_data[0];
        $resultString = $resultArr['custom_data_value'];
        $result = maybe_unserialize($resultString)['custom_data'];

        if (!$result || empty($result)) {
            return;
        }

        return json_decode($result);
    }
}