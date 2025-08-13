import { useEffect, useState } from 'react';

const VerticalRiverNav = () => {
  const [activeSection, setActiveSection] = useState("introduccion");
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

  // Diferentes rutas de río según la página - basadas en patrones reales de ríos colombianos con bifurcaciones y confluencias
  const getRiverData = () => {
    switch(currentPage) {
      case 'quebrada':
        // Quebrada Santa Helena - Red dendrítica completa de montaña con micro-cuencas detalladas
        return {
          path: "M35,0 L32,15 Q20,25 28,45 L25,65 Q15,75 30,95 L28,115 Q10,125 25,145 L22,165 Q8,175 20,195 L18,215 Q12,225 25,245 L23,265 Q15,275 28,295 L25,315 Q18,325 30,345 L28,365 Q20,375 32,395 L30,415 Q25,425 35,445 L33,465 Q30,475 35,495",
          tributaries: [
            // CUENCA SUPERIOR - Nacimientos y cabeceras
            // Quebrada Los Pinos (orden 3) - Sistema dendrítico completo
            { path: "M5,30 Q15,35 20,25", connectsAt: { x: 20, y: 25 }, order: 3, name: "Q. Los Pinos" },
            { path: "M2,25 Q8,28 12,32", connectsAt: { x: 12, y: 32 }, order: 1, name: "Afluente A1" },
            { path: "M8,20 Q12,22 15,25", connectsAt: { x: 15, y: 25 }, order: 1, name: "Afluente A2" },
            { path: "M18,18 Q20,20 22,25", connectsAt: { x: 22, y: 25 }, order: 2, name: "Sub-trib B1" },
            
            // Quebrada El Salto (orden 4) - Afluente principal derecho
            { path: "M50,40 Q40,42 28,45", connectsAt: { x: 28, y: 45 }, order: 4, name: "Q. El Salto" },
            { path: "M55,35 Q52,38 50,40", connectsAt: { x: 50, y: 40 }, order: 2, name: "Caño Cascada" },
            { path: "M58,30 Q56,32 55,35", connectsAt: { x: 55, y: 35 }, order: 1, name: "Micro-trib C1" },
            { path: "M45,35 Q47,37 48,40", connectsAt: { x: 48, y: 40 }, order: 2, name: "Q. Rocosa" },
            { path: "M42,32 Q44,34 45,35", connectsAt: { x: 45, y: 35 }, order: 1, name: "Caño Piedra" },
            
            // CUENCA MEDIA - Confluencias principales
            // Sistema Q. Las Flores (red compleja)
            { path: "M8,95 Q18,92 28,95", connectsAt: { x: 28, y: 95 }, order: 3, name: "Q. Las Flores" },
            { path: "M5,100 Q15,98 25,95", connectsAt: { x: 25, y: 95 }, order: 3, name: "Q. Orquídeas" },
            { path: "M2,90 Q6,92 8,95", connectsAt: { x: 8, y: 95 }, order: 2, name: "Caño Musgo" },
            { path: "M1,85 Q3,87 5,90", connectsAt: { x: 5, y: 90 }, order: 1, name: "Naciente D1" },
            { path: "M3,105 Q7,103 10,100", connectsAt: { x: 10, y: 100 }, order: 2, name: "Q. Helechos" },
            { path: "M0,110 Q2,108 3,105", connectsAt: { x: 3, y: 105 }, order: 1, name: "Micro-trib D2" },
            
            // Quebrada Cristalina (orden 4) - Sistema lateral izquierdo
            { path: "M2,140 Q12,142 22,145", connectsAt: { x: 22, y: 145 }, order: 4, name: "Q. Cristalina" },
            { path: "M0,135 Q1,137 2,140", connectsAt: { x: 2, y: 140 }, order: 2, name: "Caño Claro" },
            { path: "M5,130 Q8,132 10,135", connectsAt: { x: 10, y: 135 }, order: 2, name: "Q. Transparente" },
            { path: "M12,125 Q15,128 18,132", connectsAt: { x: 18, y: 132 }, order: 2, name: "Arroyo Puro" },
            { path: "M3,125 Q4,127 5,130", connectsAt: { x: 5, y: 130 }, order: 1, name: "Naciente E1" },
            { path: "M15,120 Q16,122 17,125", connectsAt: { x: 17, y: 125 }, order: 1, name: "Micro-trib E2" },
            
            // CUENCA INFERIOR - Confluencia del Bosque (sistema dendrítico mayor)
            { path: "M45,180 Q35,185 20,195", connectsAt: { x: 20, y: 195 }, order: 5, name: "Q. del Bosque" },
            { path: "M50,185 Q30,190 25,195", connectsAt: { x: 25, y: 195 }, order: 4, name: "Rio Verdor" },
            { path: "M55,175 Q52,178 50,185", connectsAt: { x: 50, y: 185 }, order: 3, name: "Q. Ceiba" },
            { path: "M60,170 Q58,172 55,175", connectsAt: { x: 55, y: 175 }, order: 2, name: "Caño Guadua" },
            { path: "M52,165 Q54,167 55,170", connectsAt: { x: 55, y: 170 }, order: 1, name: "Naciente F1" },
            { path: "M48,172 Q49,174 50,175", connectsAt: { x: 50, y: 175 }, order: 2, name: "Q. Yarumo" },
            { path: "M40,175 Q42,177 45,180", connectsAt: { x: 45, y: 180 }, order: 3, name: "Arroyo Sombra" },
            { path: "M35,170 Q37,172 40,175", connectsAt: { x: 40, y: 175 }, order: 2, name: "Caño Fresco" },
            
            // Micro-red urbana inferior
            { path: "M3,245 Q13,247 23,245", connectsAt: { x: 23, y: 245 }, order: 3, name: "Q. Pueblo" },
            { path: "M1,240 Q2,242 3,245", connectsAt: { x: 3, y: 245 }, order: 1, name: "Desagüe G1" },
            { path: "M8,235 Q10,237 12,240", connectsAt: { x: 12, y: 240 }, order: 2, name: "Caño Urbano" },
            { path: "M8,295 Q18,297 28,295", connectsAt: { x: 28, y: 295 }, order: 3, name: "Q. La Escuela" },
            { path: "M5,290 Q7,292 8,295", connectsAt: { x: 8, y: 295 }, order: 1, name: "Cuneta H1" },
            { path: "M15,285 Q20,287 25,290", connectsAt: { x: 25, y: 290 }, order: 2, name: "Canal Deportivo" },
            
            // Sistema de desembocadura
            { path: "M50,400 Q40,395 32,395", connectsAt: { x: 32, y: 395 }, order: 4, name: "Q. Desembocadura" },
            { path: "M55,395 Q52,397 50,400", connectsAt: { x: 50, y: 400 }, order: 2, name: "Caño Final" },
            { path: "M45,385 Q47,387 48,390", connectsAt: { x: 48, y: 390 }, order: 2, name: "Último Afluente" }
          ],
          navItems: [
            { id: "introduccion", text: "INTRODUCCIÓN", x: -7, y: 45 },
            { id: "origen", text: "ORIGEN NATURAL", x: -5, y: 95 },
            { id: "cultura", text: "CONEXIÓN CULTURAL", x: -15, y: 145 },
            { id: "desafios", text: "DESAFÍOS Y RESILIENCIA", x: -12, y: 195 },
            { id: "historia", text: "HISTORIA Y MEMORIA", x: -7, y: 245 },
            { id: "transformacion", text: "TRANSFORMACIÓN URBANA", x: -5, y: 295 },
            { id: "renacimiento", text: "RENACIMIENTO Y FUTURO", x: -8, y: 345 }
          ]
        };
      case 'oro':
        // Rio de Oro - Red dendrítica aurífera con terrazas aluviales y sistemas de placer históricos
        return {
          path: "M35,0 Q50,20 40,50 Q25,70 45,100 Q60,120 35,150 Q15,170 50,200 Q70,220 30,250 Q10,270 55,300 Q75,320 25,350 Q5,370 45,400 Q65,420 35,450 Q20,470 45,500",
          tributaries: [
            // CUENCA SUPERIOR AURÍFERA - Zona de placeres históricos
            // Quebrada Dorada (orden 5) - Sistema principal aurífero
            { path: "M60,35 Q50,40 40,50", connectsAt: { x: 40, y: 50 }, order: 5, name: "Q. Dorada" },
            { path: "M65,45 Q55,48 50,50", connectsAt: { x: 50, y: 50 }, order: 4, name: "Rio Brillante" },
            { path: "M70,40 Q67,42 65,45", connectsAt: { x: 65, y: 45 }, order: 3, name: "Q. Pepitas" },
            { path: "M75,35 Q72,37 70,40", connectsAt: { x: 70, y: 40 }, order: 2, name: "Caño Oro" },
            { path: "M78,30 Q76,32 75,35", connectsAt: { x: 75, y: 35 }, order: 1, name: "Naciente Aurífera A1" },
            { path: "M68,32 Q69,34 70,36", connectsAt: { x: 70, y: 36 }, order: 1, name: "Micro-placer A2" },
            { path: "M62,48 Q63,49 64,50", connectsAt: { x: 64, y: 50 }, order: 2, name: "Arroyo Pepita" },
            { path: "M58,52 Q59,53 60,54", connectsAt: { x: 60, y: 54 }, order: 1, name: "Lavadero A3" },
            
            // Sistema Rio Brillante (red compleja izquierda)
            { path: "M5,80 Q20,85 25,70", connectsAt: { x: 25, y: 70 }, order: 4, name: "Rio Brillante" },
            { path: "M8,90 Q25,95 45,100", connectsAt: { x: 45, y: 100 }, order: 4, name: "Q. Resplandor" },
            { path: "M2,75 Q4,77 5,80", connectsAt: { x: 5, y: 80 }, order: 2, name: "Caño Lumbre" },
            { path: "M1,70 Q2,72 3,75", connectsAt: { x: 3, y: 75 }, order: 1, name: "Naciente B1" },
            { path: "M10,65 Q15,67 20,70", connectsAt: { x: 20, y: 70 }, order: 3, name: "Q. Fulgor" },
            { path: "M6,60 Q8,62 10,65", connectsAt: { x: 10, y: 65 }, order: 2, name: "Arroyo Destello" },
            { path: "M3,55 Q5,57 6,60", connectsAt: { x: 6, y: 60 }, order: 1, name: "Micro-trib B2" },
            
            // TERRAZAS ALUVIALES - Sistema de quebradas de placer
            { path: "M80,110 Q70,115 60,120", connectsAt: { x: 60, y: 120 }, order: 4, name: "Q. Placeres" },
            { path: "M85,125 Q65,130 45,135", connectsAt: { x: 45, y: 135 }, order: 5, name: "Rio Aluvión" },
            { path: "M90,105 Q85,107 80,110", connectsAt: { x: 80, y: 110 }, order: 3, name: "Q. Terraza Alta" },
            { path: "M95,100 Q92,102 90,105", connectsAt: { x: 90, y: 105 }, order: 2, name: "Caño Sedimento" },
            { path: "M88,115 Q86,117 85,120", connectsAt: { x: 85, y: 120 }, order: 2, name: "Arroyo Arena" },
            { path: "M82,130 Q83,132 84,135", connectsAt: { x: 84, y: 135 }, order: 3, name: "Q. Cascajo" },
            { path: "M78,135 Q80,137 81,140", connectsAt: { x: 81, y: 140 }, order: 2, name: "Caño Grava" },
            { path: "M75,140 Q76,142 77,145", connectsAt: { x: 77, y: 145 }, order: 1, name: "Lavadero C1" },
            
            // Rio Platino (sistema lateral izquierdo)
            { path: "M2,160 Q10,165 15,170", connectsAt: { x: 15, y: 170 }, order: 4, name: "Rio Platino" },
            { path: "M0,155 Q1,157 2,160", connectsAt: { x: 2, y: 160 }, order: 2, name: "Q. Plata" },
            { path: "M5,150 Q7,152 8,155", connectsAt: { x: 8, y: 155 }, order: 3, name: "Arroyo Metal" },
            { path: "M12,145 Q14,147 15,150", connectsAt: { x: 15, y: 150 }, order: 2, name: "Caño Mineral" },
            
            // ZONA MINERA HISTÓRICA - Quebrada del Minero
            { path: "M90,200 Q80,205 70,220", connectsAt: { x: 70, y: 220 }, order: 5, name: "Q. del Minero" },
            { path: "M95,210 Q75,215 50,200", connectsAt: { x: 50, y: 200 }, order: 4, name: "Rio Socavón" },
            { path: "M100,195 Q97,197 95,200", connectsAt: { x: 95, y: 200 }, order: 3, name: "Q. Túnel" },
            { path: "M105,190 Q102,192 100,195", connectsAt: { x: 100, y: 195 }, order: 2, name: "Caño Mina" },
            { path: "M92,205 Q93,207 94,210", connectsAt: { x: 94, y: 210 }, order: 2, name: "Arroyo Pique" },
            { path: "M85,215 Q87,217 88,220", connectsAt: { x: 88, y: 220 }, order: 3, name: "Q. Galería" },
            
            // Rio Tesoro (afluente principal medio con red compleja)
            { path: "M2,260 Q8,265 10,270", connectsAt: { x: 10, y: 270 }, order: 4, name: "Rio Tesoro" },
            { path: "M85,290 Q70,295 55,300", connectsAt: { x: 55, y: 300 }, order: 5, name: "Q. Fortuna" },
            { path: "M0,255 Q1,257 2,260", connectsAt: { x: 2, y: 260 }, order: 2, name: "Caño Riqueza" },
            { path: "M5,245 Q6,247 7,250", connectsAt: { x: 7, y: 250 }, order: 3, name: "Q. Cofre" },
            { path: "M90,285 Q87,287 85,290", connectsAt: { x: 85, y: 290 }, order: 3, name: "Arroyo Joya" },
            { path: "M95,280 Q92,282 90,285", connectsAt: { x: 90, y: 285 }, order: 2, name: "Caño Gema" },
            { path: "M75,295 Q77,297 78,300", connectsAt: { x: 78, y: 300 }, order: 2, name: "Q. Doblón" },
            
            // Red de quebradas menores auríferas modernas
            { path: "M90,315 Q80,320 75,320", connectsAt: { x: 75, y: 320 }, order: 3, name: "Q. Moderna" },
            { path: "M95,310 Q92,312 90,315", connectsAt: { x: 90, y: 315 }, order: 2, name: "Caño Actual" },
            { path: "M85,325 Q87,327 88,330", connectsAt: { x: 88, y: 330 }, order: 2, name: "Arroyo Nuevo" },
            { path: "M70,335 Q72,337 73,340", connectsAt: { x: 73, y: 340 }, order: 1, name: "Micro-placer D1" },
            
            // Sistema de desembocadura final
            { path: "M2,380 Q4,385 5,370", connectsAt: { x: 5, y: 370 }, order: 3, name: "Q. Desembocadura" },
            { path: "M75,410 Q70,415 65,420", connectsAt: { x: 65, y: 420 }, order: 4, name: "Rio Final" },
            { path: "M80,405 Q77,407 75,410", connectsAt: { x: 75, y: 410 }, order: 2, name: "Caño Último" },
            { path: "M70,425 Q71,427 72,430", connectsAt: { x: 72, y: 430 }, order: 2, name: "Arroyo Terminal" }
          ],
          navItems: [
            { id: "introduccion", text: "INTRODUCCIÓN", x: 5, y: 50 },
            { id: "origen", text: "ORIGEN NATURAL", x: 10, y: 100 },
            { id: "cultura", text: "CONEXIÓN CULTURAL", x: 0, y: 150 },
            { id: "desafios", text: "DESAFÍOS Y RESILIENCIA", x: 15, y: 200 },
            { id: "historia", text: "HISTORIA Y MEMORIA", x: -5, y: 250 },
            { id: "transformacion", text: "TRANSFORMACIÓN URBANA", x: 20, y: 300 },
            { id: "renacimiento", text: "RENACIMIENTO Y FUTURO", x: 10, y: 350 }
          ]
        };
      case 'quilichao':
        // Rio Quilichao - Red dendrítica compleja desde Munchique hasta desembocadura en el Cauca con micro-cuencas urbanas y naturales
        return {
          path: "M35,0 Q45,25 25,60 Q20,85 40,120 Q55,145 20,180 Q15,205 45,240 Q60,265 25,300 Q20,325 40,360 Q50,385 30,420 Q25,445 40,480 Q45,500 35,520",
          tributaries: [
            // NACIMIENTOS DESDE RESERVA MUNCHIQUE - Red de páramo
            // Sistema Quebrada Munchique (orden 5) - Cabecera principal
            { path: "M50,15 Q47,20 45,25", connectsAt: { x: 45, y: 25 }, order: 5, name: "Q. Munchique" },
            { path: "M55,20 Q48,22 42,25", connectsAt: { x: 42, y: 25 }, order: 4, name: "Rio Reserva" },
            { path: "M60,10 Q57,12 55,15", connectsAt: { x: 55, y: 15 }, order: 3, name: "Q. Páramo Alto" },
            { path: "M65,5 Q62,7 60,10", connectsAt: { x: 60, y: 10 }, order: 2, name: "Caño Neblina" },
            { path: "M68,2 Q66,3 65,5", connectsAt: { x: 65, y: 5 }, order: 1, name: "Naciente Andina A1" },
            { path: "M52,8 Q53,10 54,12", connectsAt: { x: 54, y: 12 }, order: 2, name: "Arroyo Musgo" },
            { path: "M48,12 Q49,14 50,16", connectsAt: { x: 50, y: 16 }, order: 1, name: "Micro-trib A2" },
            { path: "M45,18 Q46,20 47,22", connectsAt: { x: 47, y: 22 }, order: 2, name: "Q. Frailejón" },
            
            // CUENCA ALTA - Rio Claro y sistema de páramo
            { path: "M60,50 Q45,55 25,60", connectsAt: { x: 25, y: 60 }, order: 5, name: "Rio Claro" },
            { path: "M65,60 Q40,65 30,60", connectsAt: { x: 30, y: 60 }, order: 4, name: "Q. Cristal" },
            { path: "M70,45 Q67,47 65,50", connectsAt: { x: 65, y: 50 }, order: 3, name: "Arroyo Puro" },
            { path: "M75,40 Q72,42 70,45", connectsAt: { x: 70, y: 45 }, order: 2, name: "Caño Limpio" },
            { path: "M78,35 Q76,37 75,40", connectsAt: { x: 75, y: 40 }, order: 1, name: "Naciente B1" },
            { path: "M62,55 Q63,57 64,60", connectsAt: { x: 64, y: 60 }, order: 2, name: "Q. Transparente" },
            { path: "M58,65 Q59,67 60,70", connectsAt: { x: 60, y: 70 }, order: 1, name: "Micro-caño B2" },
            
            // Sistema de quebradas del páramo medio
            { path: "M5,75 Q15,80 20,85", connectsAt: { x: 20, y: 85 }, order: 3, name: "Q. Páramo Medio" },
            { path: "M70,110 Q60,115 55,145", connectsAt: { x: 55, y: 145 }, order: 4, name: "Rio Cordillera" },
            { path: "M2,70 Q4,72 5,75", connectsAt: { x: 5, y: 75 }, order: 2, name: "Caño Helecho" },
            { path: "M0,65 Q1,67 2,70", connectsAt: { x: 2, y: 70 }, order: 1, name: "Naciente C1" },
            { path: "M10,65 Q12,67 14,70", connectsAt: { x: 14, y: 70 }, order: 2, name: "Arroyo Bambu" },
            { path: "M75,105 Q72,107 70,110", connectsAt: { x: 70, y: 110 }, order: 3, name: "Q. Ladera" },
            { path: "M80,100 Q77,102 75,105", connectsAt: { x: 75, y: 105 }, order: 2, name: "Caño Pendiente" },
            { path: "M68,115 Q69,117 70,120", connectsAt: { x: 70, y: 120 }, order: 2, name: "Arroyo Bajada" },
            
            // ZONA DE TRANSICIÓN - Quebrada San Antonio (urbana)
            { path: "M75,140 Q65,142 55,145", connectsAt: { x: 55, y: 145 }, order: 4, name: "Q. San Antonio" },
            { path: "M8,170 Q14,175 20,180", connectsAt: { x: 20, y: 180 }, order: 3, name: "Q. Pueblo Alto" },
            { path: "M80,135 Q77,137 75,140", connectsAt: { x: 75, y: 140 }, order: 3, name: "Arroyo Capilla" },
            { path: "M85,130 Q82,132 80,135", connectsAt: { x: 80, y: 135 }, order: 2, name: "Caño Iglesia" },
            { path: "M72,145 Q73,147 74,150", connectsAt: { x: 74, y: 150 }, order: 2, name: "Q. Plaza" },
            { path: "M5,165 Q7,167 8,170", connectsAt: { x: 8, y: 170 }, order: 2, name: "Caño Escuela" },
            { path: "M12,160 Q14,162 15,165", connectsAt: { x: 15, y: 165 }, order: 1, name: "Cuneta D1" },
            
            // CUENCA MEDIA - Rio Negro (afluente histórico)
            { path: "M2,200 Q10,202 15,205", connectsAt: { x: 15, y: 205 }, order: 4, name: "Rio Negro" },
            { path: "M80,230 Q70,235 60,265", connectsAt: { x: 60, y: 265 }, order: 5, name: "Q. Principal" },
            { path: "M0,195 Q1,197 2,200", connectsAt: { x: 2, y: 200 }, order: 2, name: "Caño Oscuro" },
            { path: "M5,185 Q6,187 7,190", connectsAt: { x: 7, y: 190 }, order: 3, name: "Q. Carbón" },
            { path: "M85,225 Q82,227 80,230", connectsAt: { x: 80, y: 230 }, order: 3, name: "Arroyo Grande" },
            { path: "M90,220 Q87,222 85,225", connectsAt: { x: 85, y: 225 }, order: 2, name: "Caño Ancho" },
            { path: "M75,235 Q77,237 78,240", connectsAt: { x: 78, y: 240 }, order: 2, name: "Q. Profunda" },
            
            // Quebrada La Esperanza y red asociada
            { path: "M85,255 Q75,260 65,265", connectsAt: { x: 65, y: 265 }, order: 4, name: "Q. La Esperanza" },
            { path: "M90,250 Q87,252 85,255", connectsAt: { x: 85, y: 255 }, order: 3, name: "Rio Futuro" },
            { path: "M95,245 Q92,247 90,250", connectsAt: { x: 90, y: 250 }, order: 2, name: "Caño Mañana" },
            { path: "M82,260 Q83,262 84,265", connectsAt: { x: 84, y: 265 }, order: 2, name: "Arroyo Sueño" },
            { path: "M70,270 Q71,272 72,275", connectsAt: { x: 72, y: 275 }, order: 1, name: "Micro-trib E1" },
            
            // SISTEMA URBANO INFERIOR - Drenaje de Santander
            { path: "M5,290 Q15,295 20,325", connectsAt: { x: 20, y: 325 }, order: 3, name: "Q. Centro" },
            { path: "M75,350 Q65,355 50,385", connectsAt: { x: 50, y: 385 }, order: 4, name: "Rio Urbano" },
            { path: "M2,285 Q4,287 5,290", connectsAt: { x: 5, y: 290 }, order: 2, name: "Canal Norte" },
            { path: "M8,280 Q10,282 11,285", connectsAt: { x: 11, y: 285 }, order: 1, name: "Desagüe F1" },
            { path: "M12,320 Q14,322 15,325", connectsAt: { x: 15, y: 325 }, order: 2, name: "Q. Barrio" },
            { path: "M80,345 Q77,347 75,350", connectsAt: { x: 75, y: 350 }, order: 3, name: "Arroyo Sur" },
            { path: "M85,340 Q82,342 80,345", connectsAt: { x: 80, y: 345 }, order: 2, name: "Caño Mercado" },
            { path: "M70,360 Q71,362 72,365", connectsAt: { x: 72, y: 365 }, order: 2, name: "Q. Industrial" },
            
            // Quebrada El Pueblo (zona urbana consolidada)
            { path: "M85,380 Q70,383 55,385", connectsAt: { x: 55, y: 385 }, order: 4, name: "Q. El Pueblo" },
            { path: "M90,375 Q87,377 85,380", connectsAt: { x: 85, y: 380 }, order: 3, name: "Rio Comunidad" },
            { path: "M95,370 Q92,372 90,375", connectsAt: { x: 90, y: 375 }, order: 2, name: "Caño Familia" },
            { path: "M82,385 Q83,387 84,390", connectsAt: { x: 84, y: 390 }, order: 2, name: "Arroyo Hogar" },
            { path: "M75,390 Q76,392 77,395", connectsAt: { x: 77, y: 395 }, order: 1, name: "Micro-drenaje G1" },
            
            // DESEMBOCADURA EN EL CAUCA - Sistema final
            { path: "M10,440 Q20,442 25,445", connectsAt: { x: 25, y: 445 }, order: 4, name: "Q. Confluencia" },
            { path: "M60,490 Q55,495 45,500", connectsAt: { x: 45, y: 500 }, order: 5, name: "Rio Desembocadura" },
            { path: "M5,435 Q7,437 10,440", connectsAt: { x: 10, y: 440 }, order: 2, name: "Caño Final" },
            { path: "M15,430 Q17,432 18,435", connectsAt: { x: 18, y: 435 }, order: 1, name: "Último Afluente" },
            { path: "M65,485 Q62,487 60,490", connectsAt: { x: 60, y: 490 }, order: 3, name: "Arroyo Cauca" },
            { path: "M70,480 Q67,482 65,485", connectsAt: { x: 65, y: 485 }, order: 2, name: "Q. Delta" },
            { path: "M55,505 Q56,507 57,510", connectsAt: { x: 57, y: 510 }, order: 2, name: "Brazo Terminal" }
          ],
          navItems: [
            { id: "introduccion", text: "INTRODUCCIÓN", x: -10, y: 60 },
            { id: "origen", text: "ORIGEN NATURAL", x: 5, y: 120 },
            { id: "cultura", text: "CONEXIÓN CULTURAL", x: -15, y: 180 },
            { id: "desafios", text: "DESAFÍOS Y RESILIENCIA", x: 10, y: 240 },
            { id: "historia", text: "HISTORIA Y MEMORIA", x: -10, y: 300 },
            { id: "transformacion", text: "TRANSFORMACIÓN URBANA", x: 5, y: 360 },
            { id: "renacimiento", text: "RENACIMIENTO Y FUTURO", x: -5, y: 420 }
          ]
        };
      default:
        // Ruta por defecto - Sistema general de río andino con red de tributarios típica del Cauca
        return {
          path: "M35,0 Q40,25 32,50 Q25,75 38,105 Q45,130 28,155 Q20,180 35,205 Q42,230 30,255 Q22,280 38,305 Q45,330 32,355 Q28,380 35,405 Q38,430 35,455 Q32,480 35,500",
          tributaries: [
            // Quebrada del Páramo (nacimiento)
            { path: "M50,20 Q45,22 40,25", connectsAt: { x: 40, y: 25 } },
            // Rio Andino (afluente superior)
            { path: "M10,45 Q20,48 25,75", connectsAt: { x: 25, y: 75 } },
            { path: "M55,100 Q50,102 45,130", connectsAt: { x: 45, y: 130 } },
            // Sistema de quebradas medias
            { path: "M5,150 Q15,152 20,180", connectsAt: { x: 20, y: 180 } },
            { path: "M50,200 Q45,202 42,230", connectsAt: { x: 42, y: 230 } },
            // Confluencia central
            { path: "M8,250 Q18,252 22,280", connectsAt: { x: 22, y: 280 } },
            { path: "M55,300 Q50,302 45,330", connectsAt: { x: 45, y: 330 } },
            // Tributarios finales
            { path: "M10,350 Q20,352 28,380", connectsAt: { x: 28, y: 380 } },
            { path: "M45,450 Q40,452 38,430", connectsAt: { x: 38, y: 430 } }
          ],
          navItems: [
            { id: "introduccion", text: "INTRODUCCIÓN", x: 5, y: 50 },
            { id: "origen", text: "ORIGEN NATURAL", x: 3, y: 105 },
            { id: "cultura", text: "CONEXIÓN CULTURAL", x: -7, y: 155 },
            { id: "desafios", text: "DESAFÍOS Y RESILIENCIA", x: 0, y: 205 },
            { id: "historia", text: "HISTORIA Y MEMORIA", x: -5, y: 255 },
            { id: "transformacion", text: "TRANSFORMACIÓN URBANA", x: 3, y: 305 },
            { id: "renacimiento", text: "RENACIMIENTO Y FUTURO", x: -3, y: 355 }
          ]
        };
    }
  };

  const riverData = getRiverData();
  const navItems = riverData.navItems;

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
          
          {/* Río principal con curvas orgánicas más moderadas */}
          <path
            d={riverData.path}
            fill="none"
            stroke="url(#riverGradient)"
            strokeWidth="6"
            filter="url(#riverGlow)"
            className="animate-pulse"
          />
          
          {/* Variaciones en el ancho del río */}
          <path
            d={riverData.path}
            fill="none"
            stroke="url(#riverGradient)"
            strokeWidth="3"
            opacity="0.6"
          />
          
          {/* Río más estrecho en algunas partes */}
          <path
            d={riverData.path}
            fill="none"
            stroke="#67e8f9"
            strokeWidth="1.5"
            opacity="0.8"
          />
          
          {/* Sistema hidrográfico completo con clasificación por orden Strahler */}
          {riverData.tributaries && riverData.tributaries.map((tributary, index) => {
            // Configuración visual según orden de Strahler (clasificación hidrográfica profesional)
            const getStreamStyle = (order) => {
              switch(order) {
                case 1: return { width: 0.8, opacity: 0.4, color: "#a5f3fc" }; // Nacientes y micro-tributarios
                case 2: return { width: 1.2, opacity: 0.5, color: "#67e8f9" }; // Caños y arroyos menores
                case 3: return { width: 2.0, opacity: 0.6, color: "#22d3ee" }; // Quebradas 
                case 4: return { width: 3.0, opacity: 0.7, color: "#06b6d4" }; // Ríos menores
                case 5: return { width: 4.0, opacity: 0.8, color: "#0891b2" }; // Ríos principales
                default: return { width: 1.0, opacity: 0.5, color: "#67e8f9" };
              }
            };
            
            const style = getStreamStyle(tributary.order);
            
            return (
              <g key={`tributary-${index}`}>
                {/* Línea principal del tributario */}
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
                
                {/* Línea de sombra para dar profundidad */}
                <path
                  d={tributary.path}
                  fill="none"
                  stroke="#0c4a6e"
                  strokeWidth={style.width * 0.3}
                  opacity={style.opacity * 0.3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Punto de confluencia con tamaño según importancia */}
                <circle
                  cx={tributary.connectsAt.x}
                  cy={tributary.connectsAt.y}
                  r={tributary.order * 0.4 + 0.5}
                  fill="#4fe9ab"
                  opacity={style.opacity}
                  className={tributary.order >= 3 ? "animate-pulse" : ""}
                />
                
                {/* Halo de confluencia para tributarios importantes */}
                {tributary.order >= 4 && (
                  <circle
                    cx={tributary.connectsAt.x}
                    cy={tributary.connectsAt.y}
                    r={tributary.order + 1}
                    fill="none"
                    stroke="#4fe9ab"
                    strokeWidth="0.5"
                    opacity="0.3"
                    className="animate-ping"
                  />
                )}
                
                {/* Etiquetas para tributarios principales (orden 3+) */}
                {tributary.order >= 3 && tributary.name && (
                  <text
                    x={tributary.connectsAt.x + (tributary.order * 2)}
                    y={tributary.connectsAt.y - 2}
                    fontSize="6"
                    fill="#e0f7fa"
                    opacity="0.6"
                    className="pointer-events-none"
                    style={{ fontFamily: 'monospace' }}
                  >
                    {tributary.name}
                  </text>
                )}
              </g>
            );
          })}

          {/* Nodos de navegación conectados al río principal */}
          {existingSections.map((section, index) => {
            const navItem = navItems.find(item => item.id === section.id);
            if (!navItem) return null;
            
            const isActive = activeSection === section.id;
            const riverX = navItem.x > 0 ? 45 + navItem.x * 0.3 : 45 + navItem.x * 0.5;
            const nodeX = 45 + navItem.x;
            
            return (
              <g key={section.id}>
                {/* Afluente principal hacia el nodo */}
                <path
                  d={`M${riverX},${navItem.y} Q${riverX + navItem.x * 0.3},${navItem.y - 8} ${nodeX},${navItem.y}`}
                  fill="none"
                  stroke={isActive ? "#4fe9ab" : "#0891b2"}
                  strokeWidth={isActive ? "4" : "3"}
                  opacity={isActive ? "0.9" : "0.7"}
                  className="transition-all duration-500"
                />
                
                {/* Tributarios secundarios */}
                <path
                  d={`M${riverX + navItem.x * 0.2},${navItem.y - 12} Q${riverX + navItem.x * 0.4},${navItem.y - 6} ${nodeX - navItem.x * 0.2},${navItem.y + 3}`}
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="2"
                  opacity="0.5"
                />
                
                {/* Pequeños arroyos */}
                <path
                  d={`M${riverX - navItem.x * 0.1},${navItem.y + 8} Q${riverX + navItem.x * 0.15},${navItem.y + 4} ${nodeX - navItem.x * 0.3},${navItem.y - 2}`}
                  fill="none"
                  stroke="#67e8f9"
                  strokeWidth="1"
                  opacity="0.4"
                />
                
                {/* Remolinos y turbulencias en puntos activos */}
                {isActive && (
                  <>
                    <circle
                      cx={nodeX}
                      cy={navItem.y}
                      r="4"
                      fill="none"
                      stroke="#4fe9ab"
                      strokeWidth="1"
                      opacity="0.8"
                      className="animate-ping"
                    />
                    <circle
                      cx={riverX}
                      cy={navItem.y}
                      r="2"
                      fill="none"
                      stroke="#67e8f9"
                      strokeWidth="1"
                      opacity="0.6"
                      className="animate-ping"
                      style={{animationDelay: "0.3s"}}
                    />
                  </>
                )}
              </g>
            );
          })}
          
          {/* Efectos de flujo animado siguiendo el curso específico del río */}
          <circle r="2" fill="#67e8f9" opacity="0.7">
            <animateMotion dur="10s" repeatCount="indefinite" rotate="auto">
              <path d={riverData.path}/>
            </animateMotion>
          </circle>
          
          <circle r="1.5" fill="#3b82f6" opacity="0.5">
            <animateMotion dur="14s" repeatCount="indefinite" rotate="auto" begin="3s">
              <path d={riverData.path}/>
            </animateMotion>
          </circle>
          
          <circle r="1" fill="#0891b2" opacity="0.6">
            <animateMotion dur="16s" repeatCount="indefinite" rotate="auto" begin="6s">
              <path d={riverData.path}/>
            </animateMotion>
          </circle>
        </svg>

        {/* Nodos de navegación en posiciones irregulares */}
        <div className="relative">
          {existingSections.map((section, index) => {
            const isActive = activeSection === section.id;
            const navItem = navItems.find(item => item.id === section.id);
            if (!navItem) return null;
            
            return (
              <div 
                key={section.id} 
                className="absolute"
                style={{
                  left: `${45 + navItem.x}px`,
                  top: `${navItem.y - 15}px`
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