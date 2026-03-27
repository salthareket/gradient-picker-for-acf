<?php

if (!defined('ABSPATH')) exit;

if (!class_exists('acf_field')) return;

class acf_field_gradient_picker extends acf_field {

    public function __construct($settings = []) {
        $this->name = 'gradient_picker';
        $this->label = __('Gradient Picker', 'gradient-picker-for-acf');
        $this->category = 'advanced';
        $this->defaults = ['default_value' => ''];
        parent::__construct();
    }

    public function render_field($field) {
        $value      = isset($field['value']) ? esc_attr($field['value']) : '';
        $field_id   = isset($field['id']) ? esc_attr($field['id']) : '';
        $field_name = isset($field['name']) ? esc_attr($field['name']) : '';

        printf(
            '<div class="acf-gradient-picker-wrapper" data-field-id="%s">',
            esc_attr($field_id)
        );

        printf(
            '<input type="hidden" name="%s" value="%s" class="acf-gradient-picker-input" />',
            esc_attr($field_name),
            esc_attr($value)
        );

        echo '<div class="acf-gradient-picker-control"></div>';
        echo '</div>';
    }


    public function format_value($value, $post_id, $field) {
        return $value;
    }

    public function update_value($value, $post_id, $field) {
        return sanitize_text_field($value);
    }
}
