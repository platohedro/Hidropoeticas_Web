# Hidropoéticas

Hidropoéticas es una experiencia web interactiva que explora la relación entre el arte, la cultura y los cuerpos de agua en Colombia. El proyecto presenta tres importantes fuentes hídricas: Río de Oro, Río Quilichao y la Quebrada Santa Elena, cada una con su propia historia y significado cultural.

## 🌊 Características Principales

- **Diseño Inmersivo**: Efectos de agua interactivos usando WebGL y efectos de ondulación
- **Navegación Fluida**: Transiciones suaves y efectos de desplazamiento personalizados
- **Contenido Dinámico**: Secciones interactivas para cada cuerpo de agua
- **Diseño Responsivo**: Experiencia optimizada para dispositivos móviles y escritorio
- **Efectos Visuales**: Animaciones personalizadas y efectos de agua usando Three.js

## 🛠️ Tecnologías Utilizadas

- **[Astro](https://astro.build/)** - Framework web moderno
- **[React](https://reactjs.org/)** - Biblioteca para interfaces de usuario
- **[TailwindCSS](https://tailwindcss.com/)** - Framework CSS utilitario
- **[Three.js](https://threejs.org/)** - Biblioteca 3D para efectos visuales
- **[jQuery](https://jquery.com/) con [jquery.ripples](https://github.com/sirxemic/jquery.ripples)** - Efectos de ondulación de agua

## 🚀 Instalación y Uso

1. Clonar el repositorio:
```bash
git clone https://github.com/platohedro/Hidropoeticas_Web.git
cd Hidropoeticas_Web
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

4. Construir para producción:
```bash
npm run build
```

## 📁 Estructura del Proyecto

```
Hidropoeticas_Web/
├── src/
│   ├── components/           # Componentes React reutilizables
│   │   ├── VerticalRiverNav.jsx    # Navbar dinámico con visualización de río
│   │   ├── WaterSectionTransition.jsx # Transiciones entre secciones
│   │   ├── RiverPath.jsx           # Elementos de navegación del río
│   │   ├── ProjectTitle.astro      # Título principal del proyecto
│   │   └── Modal.jsx               # Componente modal interactivo
│   ├── layouts/             # Plantillas de página
│   │   └── Layout.astro           # Layout principal con estilos globales
│   ├── pages/               # Páginas de la aplicación
│   │   ├── index.astro           # Página de inicio
│   │   ├── rio-de-oro/          # Secciones del Río de Oro
│   │   │   ├── index.astro        # Vista principal (IDs: juntxs, sandra, maria, sofia)
│   │   │   ├── introduccion.astro # Página de introducción
│   │   │   └── ...               # Otras subpáginas
│   │   ├── rio-quilichao/       # Secciones del Río Quilichao  
│   │   │   ├── index.astro        # Vista principal (IDs: quili1, quili2, quili3, quili4)
│   │   │   ├── introduccion.astro # Página de introducción
│   │   │   └── ...               # Otras subpáginas
│   │   └── quebrada-santaelena/ # Secciones de la Quebrada Santa Elena
│   │       ├── index.astro        # Vista principal (IDs: santa1, santa2, santa3, santa4)
│   │       ├── introduccion.astro # Página de introducción
│   │       └── ...               # Otras subpáginas
│   └── styles/              # Estilos globales
│       ├── global.css            # Estilos base
│       └── river-flow.css        # Efectos específicos de río
├── public/                  # Activos estáticos
│   ├── videos/                   # Videos de los ríos
│   └── images/                   # Imágenes de cada sección
└── astro.config.mjs         # Configuración de Astro
```

## 🌊 Componentes Principales

- **VerticalRiverNav**: Navbar dinámico que se adapta automáticamente a cada página, extrae los títulos H2 y genera la navegación del río con tributarios únicos por sección
- **WaterSectionTransition**: Efectos de transición de agua usando Three.js entre secciones
- **RiverPath**: Elementos de navegación interactiva inspirados en sistemas hidrográficos 
- **ProjectTitle**: Componente del título principal con animaciones
- **Modal**: Ventanas modales con efectos acuáticos

## 🎨 Características por Río

### Río de Oro
- **Secciones**: Juntxs, Sandra, María, Sofía
- **IDs dinámicos**: `juntxs`, `sandra`, `maria`, `sofia`
- **Tema**: Red dendrítica aurífera con terrazas aluviales y sistemas de placer históricos
- **Navegación**: Sistema hidrográfico complejo con quebradas auríferas

### Río Quilichao  
- **Secciones**: Quili 1, Quili 2, Quili 3, Quili 4
- **IDs dinámicos**: `quili1`, `quili2`, `quili3`, `quili4`
- **Tema**: Red dendrítica desde Munchique hasta desembocadura en el Cauca
- **Navegación**: Sistema con micro-cuencas urbanas y naturales desde la Reserva Natural

### Quebrada Santa Elena
- **Secciones**: Santa 1, Santa 2, Santa 3, Santa 4
- **IDs dinámicos**: `santa1`, `santa2`, `santa3`, `santa4`  
- **Tema**: Red dendrítica completa de montaña con micro-cuencas detalladas
- **Navegación**: Sistema desde páramo hasta valle urbano de Medellín

## 🔧 Sistema de Navegación Dinámico

El componente **VerticalRiverNav** implementa un sistema completamente dinámico que:

1. **Detecta automáticamente** las secciones existentes en cada página
2. **Extrae los títulos H2** para generar el texto del navbar
3. **Crea visualizaciones únicas** de río para cada sección con tributarios específicos
4. **Se adapta automáticamente** sin necesidad de configuración manual
5. **Mantiene la estética visual** mientras permite flexibilidad total de contenido

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz Fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

Desarrollado con 💙 por [Platohedro](https://github.com/platohedro)