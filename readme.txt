=== Gradient Picker for ACF ===
Contributors: salthareket
Tags: acf, custom field, gradient, color picker
Requires at least: 5.0
Tested up to: 6.8
Requires PHP: 7.4
Requires Plugins: advanced-custom-fields
Stable tag: 1.0.2
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A beautiful and user-friendly custom gradient picker field for Advanced Custom Fields (ACF), inspired by Gutenberg's native gradient tools.

== Description ==

This plugin adds a new ACF field type called "Gradient Picker", allowing you to select linear or radial gradients with angle control and preset themes.

Developers can also define their own custom gradient presets using the `acf_custom_gradients` filter, providing reusable gradient options directly within the field UI.

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/gradient-picker-for-acf` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Use the new "Gradient Picker" field in your ACF field groups.

== Frequently Asked Questions ==

= Does this work with ACF Pro? =
Yes.

= Can I define custom gradient presets? =
Yes! You can define your own custom gradients in PHP via the `acf_custom_gradients` filter. These will appear as selectable presets in the gradient field UI.

Example:

```php
function my_custom_gradients() {
    return [
        [
            "name" => "Sunset",
            "gradient" => "linear-gradient(to right, #ff7e5f, #feb47b)"
        ],
        [
            "name" => "Ocean",
            "gradient" => "linear-gradient(to right, #2E3192, #1BFFFF)"
        ],
        [
            "name" => "Midnight",
            "gradient" => "linear-gradient(to right, #000000, #434343)"
        ],
    ];
}
add_filter('acf_custom_gradients', 'my_custom_gradients');
```

== Changelog ==

= 1.0.0 =

    Initial release.

    Added support for custom gradient presets via acf_custom_gradients filter.

== Upgrade Notice ==
= 1.0.0 =
First public release.
