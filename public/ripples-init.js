// Water Ripples Effect Initialization
(function() {
    // Function to load script dynamically
    function loadScript(src, callback) {
        const script = document.createElement('script');
        script.src = src;
        script.onload = callback;
        document.head.appendChild(script);
    }

    // Function to initialize ripples
    function initRipples() {
        if (typeof $ !== 'undefined' && $.fn.ripples) {
            try {
                $('body').ripples({
                    resolution: 768,      // sharper simulation grid
                    dropRadius: 35,       // bigger waves per interaction
                    perturbance: 0.09,    // stronger refraction/distortion
                    interactive: true,
                    crossOrigin: ''
                });

                // Stronger ripple on click
                $(document).on('click', function(e) {
                    $('body').ripples('drop', e.pageX, e.pageY, 45, 0.1);
                });

                // Extra ripples while moviendo el mouse (con limitador)
                let lastDrop = 0;
                const throttleMs = 80; // más bajo = más ondas
                $(document).on('mousemove', function(e) {
                    const now = Date.now();
                    if (now - lastDrop > throttleMs) {
                        lastDrop = now;
                        $('body').ripples('drop', e.pageX, e.pageY, 25, 0.08);
                    }
                });

                console.log('Water ripples effect initialized');
            } catch (error) {
                console.log('WebGL not supported, ripples effect disabled');
            }
        }
    }

    // Load jQuery first, then ripples plugin
    if (typeof $ === 'undefined') {
        loadScript('https://code.jquery.com/jquery-3.6.0.min.js', function() {
            loadScript('https://cdn.jsdelivr.net/npm/jquery.ripples@0.6.3/dist/jquery.ripples.min.js', initRipples);
        });
    } else {
        if (!$.fn.ripples) {
            loadScript('https://cdn.jsdelivr.net/npm/jquery.ripples@0.6.3/dist/jquery.ripples.min.js', initRipples);
        } else {
            initRipples();
        }
    }
})();
