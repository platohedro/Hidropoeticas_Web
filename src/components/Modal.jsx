import { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsAnimating(true);
    } else {
      document.body.style.overflow = 'unset';
      setIsAnimating(false);
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-700 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ 
        background: 'radial-gradient(circle at center, rgba(27, 120, 149, 0.9) 0%, rgba(46, 51, 49, 0.95) 100%)'
      }}
      onClick={onClose}
    >
      {/* Efecto de ondas de agua */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className={`absolute inset-0 transition-all duration-1000 ${
            isAnimating ? 'scale-100 opacity-100' : 'scale-150 opacity-0'
          }`}
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(175, 208, 216, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 40%, rgba(152, 186, 198, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(27, 120, 149, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 60% 60%, rgba(175, 208, 216, 0.2) 0%, transparent 50%)
            `,
            animation: isAnimating ? 'waterRipple 3s ease-out infinite' : 'none'
          }}
        />
      </div>

      {/* Modal centrado */}
      <div 
        className={`relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[85vh] flex flex-col transition-all duration-700 transform ${
          isAnimating ? 'translate-y-0 scale-100' : 'translate-y-10 scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, rgba(175, 208, 216, 0.98) 0%, rgba(152, 186, 198, 0.98) 100%)',
          backdropFilter: 'blur(20px)',
          border: '2px solid rgba(255, 255, 255, 0.3)'
        }}
      >
        {/* Header fijo */}
        <div 
          className="relative z-10 p-6 rounded-t-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(27, 120, 149, 0.95) 0%, rgba(46, 51, 49, 0.95) 100%)',
            borderBottom: '2px solid rgba(175, 208, 216, 0.3)'
          }}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white tracking-wide">{title}</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-[#afd0d8] transition-all duration-300 text-3xl font-bold leading-none hover:scale-110 hover:rotate-90"
              aria-label="Cerrar modal"
              style={{
                textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
              }}
            >
              ×
            </button>
          </div>
        </div>
        
        {/* Contenido principal - scrollable */}
        <div 
          className="flex-1 overflow-y-auto p-8"
          style={{
            maxHeight: 'calc(85vh - 100px)'
          }}
        >
          {children}
        </div>

        {/* Efecto de ondas en los bordes */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className={`absolute top-0 left-0 w-full h-2 transition-all duration-1000 ${
              isAnimating ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(175, 208, 216, 0.8), transparent)',
              animation: isAnimating ? 'slideWave 2s ease-in-out infinite' : 'none'
            }}
          />
          <div 
            className={`absolute bottom-0 left-0 w-full h-2 transition-all duration-1000 ${
              isAnimating ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(175, 208, 216, 0.8), transparent)',
              animation: isAnimating ? 'slideWave 2s ease-in-out infinite reverse' : 'none'
            }}
          />
        </div>
      </div>

      {/* Estilos CSS para las animaciones */}
      <style jsx>{`
        @keyframes waterRipple {
          0% {
            transform: scale(1) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1) rotate(180deg);
            opacity: 0.6;
          }
          100% {
            transform: scale(1) rotate(360deg);
            opacity: 0.3;
          }
        }

        @keyframes slideWave {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Modal;