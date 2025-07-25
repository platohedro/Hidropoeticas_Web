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
                    resolution: 512,
                    dropRadius: 20,
                    perturbance: 0.04,
                    interactive: true,
                    crossOrigin: ''
                });

                // Add click event to create ripples
                $(document).on('click', function(e) {
                    $('body').ripples('drop', e.pageX, e.pageY, 20, 0.04);
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

