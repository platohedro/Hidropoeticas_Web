# Componente ImageGallery - Guía de Uso

## Descripción
`ImageGallery` es un componente reutilizable de React que proporciona una galería de imágenes con funcionalidad de lightbox (ampliar imágenes). Permite a los usuarios hacer clic en las imágenes para verlas en tamaño completo y navegar entre ellas.

## Características
- ✅ Lightbox funcional con navegación
- ✅ Navegación por teclado (flechas izquierda/derecha, ESC para cerrar)
- ✅ Diseño responsive (1-4 columnas configurables)
- ✅ Animaciones suaves
- ✅ Contador de imágenes
- ✅ Lazy loading de imágenes
- ✅ Accesibilidad (ARIA labels)

## Instalación
El componente ya está disponible en:
```
/src/components/ImageGallery.jsx
```

## Uso Básico

### 1. Importar el componente en tu página Astro

```astro
---
import ImageGallery from '../../components/ImageGallery.jsx';

// Definir las imágenes de la galería
const galleryImages = [
	{ src: '/ruta/imagen1.png', alt: 'Descripción imagen 1' },
	{ src: '/ruta/imagen2.png', alt: 'Descripción imagen 2' },
	{ src: '/ruta/imagen3.png', alt: 'Descripción imagen 3' },
];
---
```

### 2. Usar el componente en el HTML

```astro
<ImageGallery 
	client:load
	images={galleryImages}
	title="Título de la Galería"
	columns={3}
/>
```

## Props (Parámetros)

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| `images` | Array | ✅ Sí | `[]` | Array de objetos con imágenes |
| `title` | String | ❌ No | `''` | Título opcional de la galería |
| `columns` | Number | ❌ No | `3` | Número de columnas (1-4) |

### Estructura del objeto `images`

```javascript
{
	src: '/ruta/a/imagen.jpg',        // Requerido: URL de la imagen
	alt: 'Texto alternativo',         // Requerido: Descripción de la imagen
	thumbnail: '/ruta/a/miniatura.jpg' // Opcional: Miniatura (si no se proporciona, usa src)
}
```

## Ejemplos

### Ejemplo 1: Galería básica de 3 columnas

```astro
---
import ImageGallery from '../../components/ImageGallery.jsx';

const photos = [
	{ src: '/galeria/foto1.jpg', alt: 'Foto 1' },
	{ src: '/galeria/foto2.jpg', alt: 'Foto 2' },
	{ src: '/galeria/foto3.jpg', alt: 'Foto 3' },
	{ src: '/galeria/foto4.jpg', alt: 'Foto 4' },
	{ src: '/galeria/foto5.jpg', alt: 'Foto 5' },
	{ src: '/galeria/foto6.jpg', alt: 'Foto 6' },
];
---

<ImageGallery 
	client:load
	images={photos}
	title="Galería de Fotos"
	columns={3}
/>
```

### Ejemplo 2: Galería de 2 columnas sin título

```astro
---
import ImageGallery from '../../components/ImageGallery.jsx';

const artworks = [
	{ src: '/arte/obra1.png', alt: 'Obra de arte 1' },
	{ src: '/arte/obra2.png', alt: 'Obra de arte 2' },
];
---

<ImageGallery 
	client:load
	images={artworks}
	columns={2}
/>
```

### Ejemplo 3: Galería con miniaturas personalizadas

```astro
---
import ImageGallery from '../../components/ImageGallery.jsx';

const portfolio = [
	{ 
		src: '/portfolio/proyecto1-full.jpg', 
		thumbnail: '/portfolio/proyecto1-thumb.jpg',
		alt: 'Proyecto 1' 
	},
	{ 
		src: '/portfolio/proyecto2-full.jpg', 
		thumbnail: '/portfolio/proyecto2-thumb.jpg',
		alt: 'Proyecto 2' 
	},
];
---

<ImageGallery 
	client:load
	images={portfolio}
	title="Mi Portfolio"
	columns={4}
/>
```

### Ejemplo 4: Galería dentro de un contenedor con estilos

```astro
---
import ImageGallery from '../../components/ImageGallery.jsx';

const eventos = [
	{ src: '/eventos/evento1.jpg', alt: 'Evento 1' },
	{ src: '/eventos/evento2.jpg', alt: 'Evento 2' },
	{ src: '/eventos/evento3.jpg', alt: 'Evento 3' },
];
---

<div class="bg-gradient-to-b from-white/10 to-white/5 rounded-lg backdrop-blur-md p-6 border border-white/20">
	<ImageGallery 
		client:load
		images={eventos}
		title="Galería de Eventos"
		columns={3}
	/>
</div>
```

## Navegación

### Con el Mouse
- **Click en imagen**: Abre el lightbox
- **Click en fondo oscuro**: Cierra el lightbox
- **Click en flechas**: Navega entre imágenes
- **Click en X**: Cierra el lightbox

### Con el Teclado
- **Flecha Izquierda (←)**: Imagen anterior
- **Flecha Derecha (→)**: Imagen siguiente
- **ESC**: Cerrar lightbox

## Configuración de Columnas

El componente es responsive y ajusta automáticamente las columnas según el tamaño de pantalla:

| `columns` | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| `1` | 1 col | 1 col | 1 col |
| `2` | 1 col | 2 cols | 2 cols |
| `3` | 1 col | 2 cols | 3 cols |
| `4` | 1 col | 2 cols | 3 cols → 4 cols |

## Notas Importantes

1. **client:load**: Siempre incluye `client:load` para que el componente React funcione correctamente en Astro.

2. **Rutas de imágenes**: Las rutas deben ser relativas a la carpeta `public/` del proyecto.

3. **Texto alternativo**: Siempre proporciona un `alt` descriptivo para accesibilidad.

4. **Rendimiento**: El componente usa `lazy loading` automáticamente para mejorar el rendimiento.

## Migración desde el Sistema Antiguo

Si tienes galerías con el sistema antiguo (HTML + script), puedes migrarlas fácilmente:

### Antes (Sistema antiguo):
```astro
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" data-gallery="mi-galeria">
	<a href="/imagen1.png">
		<img src="/imagen1.png" alt="Imagen 1" />
	</a>
	<a href="/imagen2.png">
		<img src="/imagen2.png" alt="Imagen 2" />
	</a>
</div>

<!-- Lightbox HTML -->
<div id="lightbox-mi-galeria">...</div>

<script>
	setupGalleryLightbox('mi-galeria');
</script>
```

### Después (Nuevo componente):
```astro
---
import ImageGallery from '../../components/ImageGallery.jsx';

const images = [
	{ src: '/imagen1.png', alt: 'Imagen 1' },
	{ src: '/imagen2.png', alt: 'Imagen 2' },
];
---

<ImageGallery 
	client:load
	images={images}
	columns={3}
/>
```

## Ejemplo Completo en una Página

```astro
---
import Layout from '../../layouts/Layout.astro';
import ImageGallery from '../../components/ImageGallery.jsx';

const galleryImages = [
	{ src: '/galeria-correspondencias/corres1.png', alt: 'Correspondencias 1' },
	{ src: '/galeria-correspondencias/corres2.png', alt: 'Correspondencias 2' },
	{ src: '/galeria-correspondencias/corres3.png', alt: 'Correspondencias 3' },
];
---

<Layout title="Mi Página con Galería">
	<main>
		<section class="py-16">
			<div class="max-w-6xl mx-auto px-4">
				<h1 class="text-4xl font-bold text-white mb-8">Mi Proyecto</h1>
				
				<p class="text-lg text-white/90 mb-8">
					Descripción del proyecto...
				</p>

				<!-- Galería -->
				<div class="bg-gradient-to-b from-white/10 to-white/5 rounded-lg backdrop-blur-md p-6 border border-white/20">
					<ImageGallery 
						client:load
						images={galleryImages}
						title="Galería del Proyecto"
						columns={3}
					/>
				</div>
			</div>
		</section>
	</main>
</Layout>
```

## Soporte

Si encuentras algún problema o necesitas ayuda, revisa:
1. Que las rutas de las imágenes sean correctas
2. Que hayas incluido `client:load`
3. Que el array de imágenes tenga la estructura correcta
4. Que las imágenes existan en la carpeta `public/`
