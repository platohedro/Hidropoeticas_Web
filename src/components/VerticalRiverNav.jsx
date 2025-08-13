import { useEffect, useState } from 'react';

const VerticalRiverNav = () => {
  const [activeSection, setActiveSection] = useState("introduccion");
  const [existingSections, setExistingSections] = useState([]);

  // Textos de navegación en orden vertical
  const navItems = [
    { id: "introduccion", text: "INTRODUCCIÓN" },
    { id: "origen", text: "ORIGEN NATURAL" },
    { id: "cultura", text: "CONEXIÓN CULTURAL" },
    { id: "desafios", text: "DESAFÍOS Y RESILIENCIA" },
    { id: "historia", text: "HISTORIA Y MEMORIA" },
    { id: "transformacion", text: "TRANSFORMACIÓN URBANA" },
    { id: "renacimiento", text: "RENACIMIENTO Y FUTURO" }
  ];

  // Detectar las secciones existentes en la página
  useEffect(() => {
    const detectSections = () => {
      const existing = navItems.filter(item => {
        return document.getElementById(item.id) !== null;
      });
      setExistingSections(existing);
    };

    const timer = setTimeout(detectSections, 100);
    return () => clearTimeout(timer);
  }, []);

  // Actualizar sección activa basada en el scroll
  useEffect(() => {
    const handleScroll = () => {
      if (existingSections.length === 0) return;
      
      let currentSection = existingSections[0].id;
      let minDistance = Infinity;
      
      existingSections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
          
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = section.id;
          }
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [existingSections]);

  // Función para desplazarse a la sección
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const header = document.querySelector("header");
      const headerHeight = header ? header.offsetHeight : 0;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight - 50;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  if (existingSections.length === 0) return null;

  return (
    <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-30 pointer-events-none">
      <div className="relative">
        {/* Línea principal del río */}
        <div className="absolute left-4 top-0 w-1 h-full river-flow">
          <div className="w-full h-full bg-gradient-to-b from-cyan-300/60 via-blue-400/70 to-teal-400/60 rounded-full shadow-lg shadow-cyan-500/30 relative overflow-hidden">
            {/* Efecto de flujo animado */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-flow"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-flow-delayed"></div>
          </div>
        </div>

        {/* Nodos de navegación */}
        <div className="relative space-y-16">
          {existingSections.map((section, index) => {
            const isActive = activeSection === section.id;
            const isLast = index === existingSections.length - 1;
            
            return (
              <div key={section.id} className="relative flex items-center">
                {/* Nodo principal */}
                <div 
                  className={`relative w-8 h-8 rounded-full border-2 cursor-pointer pointer-events-auto transition-all duration-500 group
                    ${isActive 
                      ? "bg-gradient-to-br from-cyan-300 to-blue-400 border-cyan-200 scale-125 shadow-lg shadow-cyan-400/50" 
                      : "bg-gradient-to-br from-cyan-600/80 to-blue-600/80 border-cyan-400/60 hover:scale-110 hover:border-cyan-300"
                    }`}
                  onClick={() => scrollToSection(section.id)}
                >
                  {/* Pulso interno */}
                  <div className={`absolute inset-2 rounded-full transition-all duration-500
                    ${isActive 
                      ? "bg-white/90 animate-pulse" 
                      : "bg-white/40 group-hover:bg-white/60"
                    }`}></div>
                  
                  {/* Ondas expansivas para sección activa */}
                  {isActive && (
                    <>
                      <div className="absolute inset-0 rounded-full border-2 border-cyan-300/60 animate-ping"></div>
                      <div className="absolute inset-0 rounded-full border border-cyan-400/40 animate-ping" style={{animationDelay: "0.5s"}}></div>
                    </>
                  )}
                </div>

                {/* Tributario lateral */}
                <div className={`ml-2 h-0.5 transition-all duration-500
                  ${isActive ? "w-8 bg-gradient-to-r from-cyan-400/80 to-transparent" : "w-4 bg-gradient-to-r from-cyan-600/60 to-transparent"}`}>
                </div>

                {/* Etiqueta de texto */}
                <div className={`ml-4 pointer-events-auto transition-all duration-500
                  ${isActive ? "opacity-100 transform translate-x-0" : "opacity-70 transform -translate-x-2 hover:opacity-100 hover:translate-x-0"}`}>
                  <span 
                    className={`text-sm font-medium tracking-wider cursor-pointer transition-all duration-300
                      ${isActive 
                        ? "text-cyan-200 drop-shadow-lg" 
                        : "text-cyan-300/80 hover:text-cyan-200"
                      }`}
                    onClick={() => scrollToSection(section.id)}
                  >
                    {section.text}
                  </span>
                </div>

                {/* Pequeños tributarios decorativos */}
                {!isLast && (
                  <div className="absolute left-4 top-8 w-3 h-0.5 bg-gradient-to-r from-cyan-500/40 to-transparent transform rotate-45 opacity-60"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desembocadura al final */}
        <div className="absolute left-2 -bottom-4 w-5 h-8 bg-gradient-to-b from-teal-400/60 to-transparent rounded-b-full blur-sm"></div>
      </div>
    </div>
  );
};

export default VerticalRiverNav;