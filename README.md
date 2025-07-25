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
│   ├── components/     # Componentes React reutilizables
│   ├── layouts/       # Plantillas de página
│   ├── pages/         # Páginas de la aplicación
│   └── styles/        # Estilos globales
├── public/           # Activos estáticos
└── astro.config.mjs  # Configuración de Astro
```

## 🌊 Componentes Principales

- **WaterTransition**: Efectos de transición de agua usando Three.js
- **RiverPath**: Navegación interactiva para las secciones del río
- **WaterRipples**: Efectos de ondulación de agua
- **Modal**: Ventanas modales con efectos acuáticos

## 🎨 Características por Río

### Río de Oro
- Diseño de filigrana
- Efectos de agua dorados
- Navegación fluida entre secciones

### Río Quilichao
- Diseño orgánico
- Efectos de montaña
- Transiciones naturales

### Quebrada Santa Elena
- Diseño arquitectónico
- Elementos urbanos
- Historia de transformación

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