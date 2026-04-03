<?php
/**
 * Plugin Name: Gradient Picker for ACF
 * Description: A beautiful and professional gradient picker field for ACF, inspired by Gutenberg's native gradient tool.
 * Version: 1.0.2
 * Author: Salt Hareket
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: gradient-picker-for-acf
 */

if (!defined('ABSPATH')) exit;

add_action('plugins_loaded', function () {

    load_plugin_textdomain('gradient-picker-for-acf', false, dirname(plugin_basename(__FILE__)) . '/languages');

    if (!class_exists('acf')) {
        add_action('admin_notices', function () {
            echo '<div class="notice notice-error"><p>';
            echo esc_html__('Gradient Picker for ACF requires the Advanced Custom Fields plugin to be installed and activated.', 'gradient-picker-for-acf');
            echo '</p></div>';
        });
        return;
    }

    add_action('acf/include_field_types', function ($version) {
        include_once __DIR__ . '/fields/class-acf-field-gradient-picker.php';
        if (class_exists('acf_field_gradient_picker')) {
            acf_register_field_type(new acf_field_gradient_picker());
        }
    });

    add_action('acf/input/admin_enqueue_scripts', function () {
        $dir = plugin_dir_url(__FILE__);

        // CSS
        wp_enqueue_style('gradient-picker-for-acf', $dir . 'assets/css/gradient-picker.css', [], '1.0.0');

        // JS: WordPress components must be loaded first
        wp_enqueue_script('gradient-picker-for-acf', $dir . 'assets/js/gradient-picker.js', [
            'wp-element', 'wp-components', 'wp-i18n', 'wp-compose', 'wp-primitives'
        ], '1.0.0', true);

        $acfCustomGradients = apply_filters('acf_custom_gradients', []);

        if($acfCustomGradients){
            $acfCustomGradients = wp_json_encode($acfCustomGradients);
            wp_add_inline_script(
                'gradient-picker-for-acf',
                "window.acfCustomGradients = $acfCustomGradients;",
                'before'
            );            
        }
        // Ensure Gutenberg styles are present
        wp_enqueue_style('wp-components');
    });

});