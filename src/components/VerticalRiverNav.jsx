import { useEffect, useState } from 'react';

const VerticalRiverNav = () => {
  const [activeSection, setActiveSection] = useState("");
  const [existingSections, setExistingSections] = useState([]);
  const [currentPage, setCurrentPage] = useState("");

  // Detectar la página actual
  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('quebrada-santaelena')) {
      setCurrentPage('quebrada');
    } else if (path.includes('rio-de-oro')) {
      setCurrentPage('oro');
    } else if (path.includes('rio-quilichao')) {
      setCurrentPage('quilichao');
    } else {
      setCurrentPage('default');
    }
  }, []);

  // Detectar automáticamente las secciones existentes y sus títulos
  useEffect(() => {
    const detectSections = () => {
      // Buscar todas las secciones con ID
      const sections = document.querySelectorAll('section[id]');
      const sectionData = [];

      sections.forEach((section, index) => {
        // Extraer el ID
        const id = section.id;
        
        // Buscar el título H2 dentro de la sección
        const h2 = section.querySelector('h2');
        let text = id.toUpperCase(); // fallback
        
        if (h2) {
          // Extraer el texto del H2, limpiando espacios y elementos innecesarios
          const textContent = h2.textContent || h2.innerText;
          text = textContent.trim();
        }

        // Calcular posición Y basada en el índice (espaciado uniforme)
        const baseY = 60;
        const spacing = 80;
        const y = baseY + (index * spacing);
        
        // Calcular posición X con variación según la página
        let x = 0;
        switch(currentPage) {
          case 'quebrada':
            x = [-7, -5, -15, -12][index] || 0;
            break;
          case 'oro':
            x = [5, 10, 0, 15][index] || 0;
            break;
          case 'quilichao':
            x = [-10, 5, -15, 10][index] || 0;
            break;
          default:
            x = [5, 3, -7, 0][index] || 0;
        }

        sectionData.push({
          id,
          text,
          x,
          y
        });
      });

      setExistingSections(sectionData);
      if (sectionData.length > 0) {
        setActiveSection(sectionData[0].id);
      }
    };

    // Esperar un poco para que el DOM esté completamente cargado
    const timer = setTimeout(detectSections, 100);
    return () => clearTimeout(timer);
  }, [currentPage]);

  // Generar datos del río basado en la página actual
  const getRiverData = () => {
    switch(currentPage) {
      case 'quebrada':
        return {
          path: "M35,0 L32,15 Q20,25 28,45 L25,65 Q15,75 30,95 L28,115 Q10,125 25,145 L22,165 Q8,175 20,195 L18,215 Q12,225 25,245 L23,265 Q15,275 28,295 L25,315 Q18,325 30,345 L28,365 Q20,375 32,395 L30,415 Q25,425 35,445 L33,465 Q30,475 35,495",
          tributaries: [
            { path: "M5,30 Q15,35 20,25", connectsAt: { x: 20, y: 25 }, order: 3, name: "Q. Los Pinos" },
            { path: "M50,40 Q40,42 28,45", connectsAt: { x: 28, y: 45 }, order: 4, name: "Q. El Salto" },
            { path: "M8,95 Q18,92 28,95", connectsAt: { x: 28, y: 95 }, order: 3, name: "Q. Las Flores" },
            { path: "M2,140 Q12,142 22,145", connectsAt: { x: 22, y: 145 }, order: 4, name: "Q. Cristalina" },
            { path: "M45,180 Q35,185 20,195", connectsAt: { x: 20, y: 195 }, order: 5, name: "Q. del Bosque" },
            { path: "M3,245 Q13,247 23,245", connectsAt: { x: 23, y: 245 }, order: 3, name: "Q. Pueblo" },
            { path: "M8,295 Q18,297 28,295", connectsAt: { x: 28, y: 295 }, order: 3, name: "Q. La Escuela" },
            { path: "M50,400 Q40,395 32,395", connectsAt: { x: 32, y: 395 }, order: 4, name: "Q. Desembocadura" }
          ]
        };
      case 'oro':
        return {
          path: "M35,0 Q50,20 40,50 Q25,70 45,100 Q60,120 35,150 Q15,170 50,200 Q70,220 30,250 Q10,270 55,300 Q75,320 25,350 Q5,370 45,400 Q65,420 35,450 Q20,470 45,500",
          tributaries: [
            { path: "M60,35 Q50,40 40,50", connectsAt: { x: 40, y: 50 }, order: 5, name: "Q. Dorada" },
            { path: "M5,80 Q20,85 25,70", connectsAt: { x: 25, y: 70 }, order: 4, name: "Rio Brillante" },
            { path: "M80,110 Q70,115 60,120", connectsAt: { x: 60, y: 120 }, order: 4, name: "Q. Placeres" },
            { path: "M2,160 Q10,165 15,170", connectsAt: { x: 15, y: 170 }, order: 4, name: "Rio Platino" },
            { path: "M90,200 Q80,205 70,220", connectsAt: { x: 70, y: 220 }, order: 5, name: "Q. del Minero" },
            { path: "M2,260 Q8,265 10,270", connectsAt: { x: 10, y: 270 }, order: 4, name: "Rio Tesoro" },
            { path: "M90,315 Q80,320 75,320", connectsAt: { x: 75, y: 320 }, order: 3, name: "Q. Moderna" },
            { path: "M75,410 Q70,415 65,420", connectsAt: { x: 65, y: 420 }, order: 4, name: "Rio Final" }
          ]
        };
      case 'quilichao':
        return {
          path: "M35,0 Q45,25 25,60 Q20,85 40,120 Q55,145 20,180 Q15,205 45,240 Q60,265 25,300 Q20,325 40,360 Q50,385 30,420 Q25,445 40,480 Q45,500 35,520",
          tributaries: [
            { path: "M50,15 Q47,20 45,25", connectsAt: { x: 45, y: 25 }, order: 5, name: "Q. Munchique" },
            { path: "M60,50 Q45,55 25,60", connectsAt: { x: 25, y: 60 }, order: 5, name: "Rio Claro" },
            { path: "M5,75 Q15,80 20,85", connectsAt: { x: 20, y: 85 }, order: 3, name: "Q. Páramo Medio" },
            { path: "M75,140 Q65,142 55,145", connectsAt: { x: 55, y: 145 }, order: 4, name: "Q. San Antonio" },
            { path: "M2,200 Q10,202 15,205", connectsAt: { x: 15, y: 205 }, order: 4, name: "Rio Negro" },
            { path: "M85,255 Q75,260 65,265", connectsAt: { x: 65, y: 265 }, order: 4, name: "Q. La Esperanza" },
            { path: "M5,290 Q15,295 20,325", connectsAt: { x: 20, y: 325 }, order: 3, name: "Q. Centro" },
            { path: "M10,440 Q20,442 25,445", connectsAt: { x: 25, y: 445 }, order: 4, name: "Q. Confluencia" }
          ]
        };
      default:
        return {
          path: "M35,0 Q40,25 32,50 Q25,75 38,105 Q45,130 28,155 Q20,180 35,205 Q42,230 30,255 Q22,280 38,305 Q45,330 32,355 Q28,380 35,405 Q38,430 35,455 Q32,480 35,500",
          tributaries: [
            { path: "M50,20 Q45,22 40,25", connectsAt: { x: 40, y: 25 } },
            { path: "M10,45 Q20,48 25,75", connectsAt: { x: 25, y: 75 } },
            { path: "M55,100 Q50,102 45,130", connectsAt: { x: 45, y: 130 } },
            { path: "M5,150 Q15,152 20,180", connectsAt: { x: 20, y: 180 } }
          ]
        };
    }
  };

  const riverData = getRiverData();

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
    <div className="fixed left-12 top-36 z-30 pointer-events-none">
      <div className="relative">
        {/* SVG para el río orgánico bifurcado */}
        <svg width="120" height="500" className="absolute left-0 top-0" viewBox="0 0 120 500">
          <defs>
            <linearGradient id="riverGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.6" />
              <stop offset="30%" stopColor="#3b82f6" stopOpacity="0.7" />
              <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0.6" />
            </linearGradient>
            <filter id="riverGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Río principal con curvas orgánicas */}
          <path
            d={riverData.path}
            fill="none"
            stroke="url(#riverGradient)"
            strokeWidth="6"
            filter="url(#riverGlow)"
            className="animate-pulse"
          />
          
          <path
            d={riverData.path}
            fill="none"
            stroke="url(#riverGradient)"
            strokeWidth="3"
            opacity="0.6"
          />
          
          <path
            d={riverData.path}
            fill="none"
            stroke="#67e8f9"
            strokeWidth="1.5"
            opacity="0.8"
          />
          
          {/* Sistema hidrográfico con tributarios */}
          {riverData.tributaries && riverData.tributaries.map((tributary, index) => {
            const getStreamStyle = (order) => {
              switch(order) {
                case 1: return { width: 0.8, opacity: 0.4, color: "#a5f3fc" };
                case 2: return { width: 1.2, opacity: 0.5, color: "#67e8f9" };
                case 3: return { width: 2.0, opacity: 0.6, color: "#22d3ee" };
                case 4: return { width: 3.0, opacity: 0.7, color: "#06b6d4" };
                case 5: return { width: 4.0, opacity: 0.8, color: "#0891b2" };
                default: return { width: 1.0, opacity: 0.5, color: "#67e8f9" };
              }
            };
            
            const style = getStreamStyle(tributary.order);
            
            return (
              <g key={`tributary-${index}`}>
                <path
                  d={tributary.path}
                  fill="none"
                  stroke={style.color}
                  strokeWidth={style.width}
                  opacity={style.opacity}
                  className="transition-all duration-500"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                <circle
                  cx={tributary.connectsAt.x}
                  cy={tributary.connectsAt.y}
                  r={tributary.order * 0.4 + 0.5}
                  fill="#4fe9ab"
                  opacity={style.opacity}
                  className={tributary.order >= 3 ? "animate-pulse" : ""}
                />
              </g>
            );
          })}

          {/* Nodos de navegación conectados al río principal */}
          {existingSections.map((section, index) => {
            const isActive = activeSection === section.id;
            const riverX = section.x > 0 ? 45 + section.x * 0.3 : 45 + section.x * 0.5;
            const nodeX = 45 + section.x;
            
            return (
              <g key={section.id}>
                {/* Afluente principal hacia el nodo */}
                <path
                  d={`M${riverX},${section.y} Q${riverX + section.x * 0.3},${section.y - 8} ${nodeX},${section.y}`}
                  fill="none"
                  stroke={isActive ? "#4fe9ab" : "#0891b2"}
                  strokeWidth={isActive ? "4" : "3"}
                  opacity={isActive ? "0.9" : "0.7"}
                  className="transition-all duration-500"
                />
                
                {/* Remolinos y turbulencias en puntos activos */}
                {isActive && (
                  <>
                    <circle
                      cx={nodeX}
                      cy={section.y}
                      r="4"
                      fill="none"
                      stroke="#4fe9ab"
                      strokeWidth="1"
                      opacity="0.8"
                      className="animate-ping"
                    />
                  </>
                )}
              </g>
            );
          })}
          
          {/* Efectos de flujo animado */}
          <circle r="2" fill="#67e8f9" opacity="0.7">
            <animateMotion dur="10s" repeatCount="indefinite" rotate="auto">
              <path d={riverData.path}/>
            </animateMotion>
          </circle>
        </svg>

        {/* Nodos de navegación dinámicos */}
        <div className="relative">
          {existingSections.map((section, index) => {
            const isActive = activeSection === section.id;
            
            return (
              <div 
                key={section.id} 
                className="absolute"
                style={{
                  left: `${45 + section.x}px`,
                  top: `${section.y - 15}px`
                }}
              >
                {/* Nodo principal */}
                <div 
                  className={`relative w-8 h-8 rounded-full border-2 cursor-pointer pointer-events-auto transition-all duration-500 group z-10 -translate-x-4 -translate-y-4
                    ${isActive 
                      ? "bg-gradient-to-br from-cyan-300 to-blue-400 border-cyan-200 scale-125 shadow-lg shadow-cyan-400/50" 
                      : "bg-gradient-to-br from-cyan-600/80 to-blue-600/80 border-cyan-400/60 hover:scale-110 hover:border-cyan-300"
                    }`}
                  onClick={() => scrollToSection(section.id)}
                  style={{
                    transform: 'translate(-50%, -50%)'
                  }}
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

                {/* Etiqueta de texto */}
                <div className={`absolute left-12 top-0 -translate-y-2 pointer-events-auto transition-all duration-500 whitespace-nowrap
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
              </div>
            );
          })}
        </div>

        {/* Delta/desembocadura al final */}
        <div className="absolute left-6 bottom-0 w-8 h-12 opacity-60">
          <svg width="32" height="48" viewBox="0 0 32 48">
            <path
              d="M16,0 Q8,12 4,24 Q0,36 8,48 M16,0 Q24,12 28,24 Q32,36 24,48 M16,0 Q12,15 16,30 Q20,45 16,48"
              fill="none"
              stroke="#0891b2"
              strokeWidth="2"
              opacity="0.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default VerticalRiverNav;