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
                const [value, setValue] = useState(input.value || defaultGradient);

                const update = (val) => {
                    setValue(val);
                    input.value = val;
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                    const preview = wrapper.querySelector('.components-custom-gradient-picker__gradient-bar-background');
                    if (preview) preview.style.background = val;
                };

                const onClear = () => {
                    update(defaultGradient);
                };

                // Otomatik eklenen Gutenberg Clear button'unu temizle
                setTimeout(() => {
                    const autoClear = wrapper.querySelector('.components-circular-option-picker__custom-clear-wrapper');
                    if (autoClear) autoClear.remove();
                }, 100); // biraz delay veriyoruz çünkü DOM’a geç ekleniyor


                return createElement('div', {},
                    createElement(GradientPicker, {
                        value: value,
                        onChange: update,
                        gradients: gradients
                    }),
                    createElement(Button, {
                        isSecondary: true,
                        onClick: onClear,
                        style: { marginTop: '8px' }
                    }, 'Clear')
                );
            };

            render(createElement(Picker), control);
        });
    }

    document.addEventListener('DOMContentLoaded', initGradientPickers);
    document.addEventListener('acf/append', initGradientPickers);
    document.addEventListener('acf/ready', initGradientPickers);

    acf.doAction = acf.doAction || function(){};
    acf.addAction('acfe/modal/open', function($modal, args){
        initGradientPickers();
    });

    acf.addAction('append', function($el){
        $el.find('[data-init]').removeAttr('data-init');
        setTimeout(() => {
            initGradientPickers();
        }, 50);
    });

})();
