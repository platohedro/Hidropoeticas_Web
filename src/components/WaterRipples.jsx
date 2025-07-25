import { useEffect } from 'react';

const WaterRipples = () => {
  useEffect(() => {
    // Guardar el estilo original del body
    const originalBackground = document.body.style.background;
    // Aplicar el fondo azul oscuro
    document.body.style.background = '#001a33';
    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.width = '100vw';
    document.body.style.height = '100vh';
    // Dynamically import jQuery and ripples
    const initRipples = async () => {
      try {
        // Import jQuery
        const $ = (await import('jquery')).default;
        
        // Import ripples plugin
        await import('jquery.ripples');
        
        // Initialize ripples effect
        if (typeof $.fn.ripples !== 'undefined') {
          $('body').ripples({
            resolution: 512,
            dropRadius: 40,
            perturbance: 0.09,
            interactive: true,
            crossOrigin: ''
          });
          
          // Add click event to create ripples on user interaction
          $(document).on('click', function(e) {
            $('body').ripples('drop', e.pageX, e.pageY, 20, 0.04);
          });
        }
      } catch (error) {
        console.log('WebGL not supported or ripples failed to load:', error);
      }
    };

    initRipples();

    // Cleanup function
    return () => {
      try {
        const $ = window.$;
        if ($ && typeof $.fn.ripples !== 'undefined') {
          $('body').ripples('destroy');
        }
        // Restaurar el estilo original del body
        document.body.style.background = originalBackground;
        document.body.style.margin = '';
        document.body.style.overflow = '';
        document.body.style.width = '';
        document.body.style.height = '';
      } catch (error) {
        console.log('Error cleaning up ripples:', error);
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default WaterRipples;

