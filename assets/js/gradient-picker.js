(function() {
    const { createElement, render, useState } = wp.element;
    const { GradientPicker, Button } = wp.components;

    const defaultGradient = 'linear-gradient(90deg, #000000 0%, #ffffff 100%)';
    const defaultGradients = [
        { name: 'Sunset', gradient: 'linear-gradient(to right, #ff7e5f, #feb47b)' },
        { name: 'Ocean', gradient: 'linear-gradient(to right, #2E3192, #1BFFFF)' },
        { name: 'Midnight', gradient: 'linear-gradient(to right, #000000, #434343)' },
    ];
    const gradients = window.acfCustomGradients || defaultGradients;

    function initGradientPickers() {
        document.querySelectorAll('.acf-gradient-picker-wrapper:not([data-init])').forEach(wrapper => {
            wrapper.setAttribute('data-init', '1');

            const input = wrapper.querySelector('.acf-gradient-picker-input');
            const control = wrapper.querySelector('.acf-gradient-picker-control');
            if (!input || !control) return;

            const Picker = () => {
                const [value, setValue] = useState(input.value || '');

                const update = (val) => {
                    setValue(val);
                    input.value = val;
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                };

                const onClear = () => {
                    update('');
                };

                // Remove auto-injected Gutenberg Clear button
                setTimeout(() => {
                    const autoClear = wrapper.querySelector('.components-circular-option-picker__custom-clear-wrapper');
                    if (autoClear) autoClear.remove();
                }, 150);

                return createElement('div', {},
                    createElement(GradientPicker, {
                        value: value || defaultGradient,
                        onChange: update,
                        gradients: gradients
                    }),
                    value
                        ? createElement(Button, {
                            isSecondary: true,
                            onClick: onClear,
                            style: { marginTop: '8px' }
                        }, 'Clear')
                        : null
                );
            };

            render(createElement(Picker), control);
        });
    }

    document.addEventListener('DOMContentLoaded', initGradientPickers);

    if (typeof acf !== 'undefined') {
        if (typeof acf.addAction === 'function') {
            acf.addAction('append', function($el) {
                $el.find('.acf-gradient-picker-wrapper[data-init]').removeAttr('data-init');
                setTimeout(initGradientPickers, 50);
            });

            acf.addAction('ready', initGradientPickers);
        }
    }

})();
