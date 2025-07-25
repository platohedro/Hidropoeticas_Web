import { useEffect, useState } from 'react';

const RiverPath = () => {
  const [activeSection, setActiveSection] = useState('introduccion');
  const [windowHeight, setWindowHeight] = useState(0);
  const [isHovered, setIsHovered] = useState(null);
  const [sections, setSections] = useState([]);
  const [existingSections, setExistingSections] = useState([]);
  const [points, setPoints] = useState([]);

  // Secciones fijas para cada tipo de río
  const getSectionsByType = () => {
    const path = window.location.pathname;
    
    if (path.includes('rio-quilichao') || path.includes('rio-de-oro')) {
      return ['introduccion', 'origen', 'desafios', 'cultura'];
    } else if (path.includes('quebrada-santaelena')) {
      return ['introduccion', 'historia', 'transformacion', 'renacimiento'];
    }
    
    return ['introduccion', 'historia', 'transformacion', 'renacimiento'];
  };

  // Detectar qué río estamos mostrando basándose en las secciones existentes
  const detectRiverType = (sections) => {
    if (sections.includes('origen') && sections.includes('desafios')) {
      return 'quilichao'; // Rio Quilichao: introduccion, origen, desafios, cultura
    } else if (sections.includes('historia') && sections.includes('transformacion')) {
      // Verificar título de la página para distinguir entre quebrada y rio de oro
      const title = document.querySelector('h1')?.textContent || '';
      if (title.includes('Quebrada') || title.includes('Santaelena')) {
        return 'quebrada-santaelena'; // Quebrada Santaelena: introduccion, historia, transformacion, renacimiento
      } else {
        return 'rio-de-oro'; // Rio de Oro: introduccion, historia, transformacion, renacimiento
      }
    }
    return 'default';
  };

  // Generar puntos fijos para el río
  const generateRiverPoints = (sections = []) => {
    const basePoints = [];
    const riverSections = sections.length > 0 ? sections : getSectionsByType();
    const riverType = detectRiverType(riverSections);
    
    // Altura fija del contenedor
    const totalHeight = 1000;
    const startY = 10;
    const endY = totalHeight - 10;
    const availableHeight = endY - startY;
    
    // Espaciado fijo entre secciones
    const sectionSpacing = riverSections.length > 1 ? availableHeight / (riverSections.length - 1) : 0;
    
    switch (riverType) {
      case 'quilichao':
        // Diseño orgánico para Quilichao
        riverSections.forEach((sectionId, index) => {
          const yPos = startY + (index * sectionSpacing);
          const spiralRadius = 4 + (index * 2);
          const angle = index * 2.5;
          const xPos = 18 + Math.cos(angle) * spiralRadius;
          basePoints.push({ id: sectionId, x: xPos, y: yPos });
        });
        
        // Puntos adicionales para suavizar la línea
        const totalPoints = 200;
        for (let i = 0; i < totalPoints; i++) {
          const t = i / (totalPoints - 1);
          const yPos = startY + (t * availableHeight);
          const angle = i * 0.8;
          const radius = 3 + Math.sin(i * 0.3) * 4;
          const xPos = 18 + Math.cos(angle) * radius;
          basePoints.push({ x: xPos, y: yPos });
        }
        break;
        
      case 'quebrada-santaelena':
        // Diseño arquitectónico para Quebrada Santaelena
        riverSections.forEach((sectionId, index) => {
          const yPos = startY + (index * sectionSpacing);
          const moduleWidth = 10;
          const offset = index * 4;
          const xPos = 12 + (index % 4) * moduleWidth + offset;
          basePoints.push({ id: sectionId, x: xPos, y: yPos });
        });
        
        // Puntos adicionales para suavizar la línea
        const totalArquitectonicoPoints = 180;
        for (let i = 0; i < totalArquitectonicoPoints; i++) {
          const t = i / (totalArquitectonicoPoints - 1);
          const yPos = startY + (t * availableHeight);
          const module = i % 5;
          const xPos = 12 + module * 6 + (i % 2 === 0 ? 3 : -2);
          basePoints.push({ x: xPos, y: yPos });
        }
        break;
        
      case 'rio-de-oro':
        // Diseño de filigrana para Rio de Oro
        riverSections.forEach((sectionId, index) => {
          const yPos = startY + (index * sectionSpacing);
          const wave1 = Math.sin(index * 0.9) * 10;
          const wave2 = Math.cos(index * 1.3) * 5;
          const wave3 = Math.sin(index * 1.8) * 2.5;
          const xPos = 20 + wave1 + wave2 + wave3;
          basePoints.push({ id: sectionId, x: xPos, y: yPos });
        });
        
        // Puntos adicionales para suavizar la línea
        const totalFiligranasPoints = 250;
        for (let i = 0; i < totalFiligranasPoints; i++) {
          const t = i / (totalFiligranasPoints - 1);
          const yPos = startY + (t * availableHeight);
          const ornamentWave1 = Math.sin(t * Math.PI * 8) * 8;
          const ornamentWave2 = Math.cos(t * Math.PI * 6) * 4;
          const ornamentWave3 = Math.sin(t * Math.PI * 12) * 2;
          const xPos = 20 + ornamentWave1 + ornamentWave2 + ornamentWave3;
          basePoints.push({ x: xPos, y: yPos });
        }
        break;
        
      default:
        // Diseño genérico que ocupa toda la altura
        riverSections.forEach((sectionId, index) => {
          const yPos = startY + (index * sectionSpacing);
          basePoints.push({ id: sectionId, x: 18, y: yPos });
        });
        
        // Puntos adicionales para completar
        for (let i = 0; i < 100; i++) {
          const t = i / 99;
          const yPos = startY + (t * availableHeight);
          basePoints.push({ x: 18, y: yPos });
        }
    }
    
    // Ordenar puntos por posición Y para un flujo suave
    return basePoints.sort((a, b) => a.y - b.y);
  };
  
  // Calcular la posición de los puntos de navegación solo para secciones que existen
  
  useEffect(() => {
    // Detectar qué secciones realmente existen en la página
    const detectSections = () => {
      const allPossibleSections = ['introduccion', 'historia', 'origen', 'biodiversidad', 'cultura', 'desafios', 'transformacion', 'renacimiento'];
      const existing = allPossibleSections.filter(sectionId => {
        return document.getElementById(sectionId) !== null;
      });
      setExistingSections(existing);
    };
    
    // Ejecutar después de que se monte el componente
    const timer = setTimeout(detectSections, 100);
    return () => clearTimeout(timer);
  }, []);
  
  // Actualizar puntos cuando cambien las secciones existentes
  useEffect(() => {
    if (existingSections.length > 0) {
      setPoints(generateRiverPoints(existingSections));
    }
  }, [existingSections]);
  

  // Generar el path para el SVG con curvas más orgánicas
  const generatePath = () => {
    if (points.length === 0) return 'M 8 60';
    if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
    
    let path = `M ${points[0].x} ${points[0].y}`;
    
    // Usar curvas de Bézier para un flujo más natural
    for (let i = 1; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      path += ` Q ${points[i].x} ${points[i].y}, ${xc} ${yc}`;
    }
    
    // Suavizar la última curva
    const last = points[points.length - 1];
    path += ` T ${last.x} ${last.y}`;
    
    return path;
  };

  // Actualizar sección activa basada en el scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = existingSections;
      if (sections.length === 0) return;
      
      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      
      let currentSection = sections[0];
      let minDistance = Infinity;
      
      // Encontrar la sección más cercana al centro de la pantalla
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = scrollPosition + rect.top;
          const elementCenter = elementTop + (rect.height / 2);
          const distance = Math.abs(scrollPosition + (viewportHeight / 2) - elementCenter);
          
          // Actualizar la sección activa basada en la distancia más corta al centro
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = section;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    // Usar requestAnimationFrame para un scroll más suave
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    handleScroll(); // Verificar al cargar
    
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [existingSections]);

  // Efecto para manejar el redimensionamiento de la ventana
  useEffect(() => {
    const updateHeight = () => {
      setWindowHeight(window.innerHeight);
    };
    
    window.addEventListener('resize', updateHeight);
    updateHeight();
    
    return () => window.removeEventListener('resize', updateHeight);
  }, []);
  
  const navPoints = points.filter(point => point.id && existingSections.includes(point.id));
  
  // Configuraciones visuales específicas para cada río
  const getRiverStyles = () => {
    const riverType = detectRiverType(existingSections);
    
    switch (riverType) {
      case 'quilichao':
        return {
          gradient: {
            start: '#16a085', // Verde esmeralda montañoso
            end: '#27ae60'     // Verde natural
          },
          glow: 'rgba(22, 160, 133, 0.8)',
          strokeWidth: '12' // SÚPER GRUESO COMO RÍO REAL
        };
        
      case 'quebrada-santaelena':
        return {
          gradient: {
            start: '#3498db', // Azul urbano
            end: '#2980b9'     // Azul más profundo
          },
          glow: 'rgba(52, 152, 219, 0.8)',
          strokeWidth: '10' // SÚPER GRUESO COMO RÍO REAL
        };
        
      case 'rio-de-oro':
        return {
          gradient: {
            start: '#2563eb', // Azul río profundo
            end: '#1d4ed8'     // Azul más intenso
          },
          glow: 'rgba(37, 99, 235, 0.8)',
          strokeWidth: '14' // EL MÁS GRUESO - RÍO PRINCIPAL
        };
        
      default:
        return {
          gradient: {
            start: '#38bdf8',
            end: '#0ea5e9'
          },
          glow: 'rgba(56, 189, 248, 0.8)',
          strokeWidth: '8' // SÚPER GRUESO COMO RÍO REAL
        };
    }
  };
  
  const riverStyles = getRiverStyles();

  // Función para desplazarse a la sección
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 0;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Mapeo de IDs a textos de navegación
  const navItems = [
    { id: 'introduccion', text: 'INTRODUCCIÓN' },
    { id: 'origen', text: 'ORIGEN NATURAL' },
    { id: 'desafios', text: 'DESAFÍOS Y RESILIENCIA' },
    { id: 'cultura', text: 'CONEXIÓN CULTURAL' },
    { id: 'historia', text: 'HISTORIA Y MEMORIA' },
    { id: 'transformacion', text: 'TRANSFORMACIÓN URBANA' },
    { id: 'renacimiento', text: 'RENACIMIENTO Y FUTURO' }
  ];

  return (
    <div className="river-container fixed right-8 top-1/2 transform -translate-y-1/2 h-[80vh] z-20 flex items-start">
      {/* Contenedor del río con los textos */}
      <div className="relative h-full w-60">
        <svg 
          width="30" 
          height="100%" 
          viewBox="0 0 60 1000"
          className="absolute top-0 left-0 z-10 h-full"
          preserveAspectRatio="xMidYStretch meet"
        >
          <defs>
            <linearGradient id="riverGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={riverStyles.gradient.start} stopOpacity="0.9" />
              <stop offset="100%" stopColor={riverStyles.gradient.end} stopOpacity="0.9" />
            </linearGradient>
            <filter id="riverGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <path 
            d={generatePath()} 
            fill="none" 
            stroke="url(#riverGradient)" 
            strokeWidth={riverStyles.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500"
            filter="url(#riverGlow)"
          />
        </svg>

        {/* Puntos de navegación */}
        <div className="absolute top-0 left-0 w-full h-full z-20">
          {navPoints.map((point) => {
            const isActive = activeSection === point.id;
            const navItem = navItems.find(item => item.id === point.id);
            
            return (
              <div 
                key={point.id}
                className="absolute left-0 w-60 flex items-center"
                style={{
                  top: `${(point.y / 1000) * 100}%`,
                  transform: 'translateY(-50%)',
                  zIndex: 20,
                  pointerEvents: 'none',
                  height: '2rem'
                }}
              >
                {/* Punto de navegación */}
                <a 
                  href={`#${point.id}`}
                  className={`absolute left-1 w-3 h-3 rounded-full border-2 transition-all duration-300 z-20 pointer-events-auto
                    ${isActive 
                      ? 'bg-white border-white scale-125' 
                      : 'hover:bg-white hover:border-white hover:scale-110'}`}
                  style={{
                    backgroundColor: isActive ? 'white' : riverStyles.gradient.start,
                    borderColor: isActive ? 'white' : riverStyles.gradient.start,
                    boxShadow: isActive ? `0 0 10px ${riverStyles.glow}` : 'none',
                  }}
                  onMouseEnter={() => setIsHovered(point.id)}
                  onMouseLeave={() => setIsHovered(null)}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(point.id);
                  }}
                />
                
                {/* Línea de conexión fluida del punto al texto */}
                <div 
                  className={`absolute h-px transition-all duration-500 bg-gradient-to-r to-transparent
                    ${isActive ? 'w-8 opacity-80' : 'w-6 opacity-40'}`}
                  style={{
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: isActive 
                      ? 'linear-gradient(to right, white, transparent)' 
                      : `linear-gradient(to right, ${riverStyles.gradient.start}, transparent)`
                  }}
                />
                
                {/* Texto del ítem de navegación */}
                <a 
                  href={`#${point.id}`}
                  className={`text-cyan-100 text-sm font-light tracking-wider whitespace-nowrap transition-all duration-300 pointer-events-auto
                    ${isActive ? 'text-white font-medium' : 'hover:text-white'}`}
                  style={{
                    marginLeft: '28px',
                    opacity: isActive ? 1 : 0.8,
                    transform: isActive ? 'translateX(4px)' : 'none',
                    textShadow: isActive ? '0 0 8px rgba(255, 255, 255, 0.5)' : 'none'
                  }}
                  onMouseEnter={() => setIsHovered(point.id)}
                  onMouseLeave={() => setIsHovered(null)}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(point.id);
                  }}
                >
                  {navItem?.text || ''}
                </a>
              </div>
            );
          })}
        </div>
        
        {/* Línea vertical del río */}
        <div 
          className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-cyan-400/30 to-cyan-400/10 z-10"
          style={{
            left: '0.5rem'
          }}
        />
      </div>
    </div>
  );
};

export default RiverPath;