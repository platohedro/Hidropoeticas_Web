import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

/**
 * ImageGallery - Componente reutilizable de galería con lightbox
 * 
 * @param {Object} props
 * @param {Array<{src: string, alt: string, thumbnail?: string}>} props.images - Array de imágenes
 * @param {string} props.title - Título opcional de la galería
 * @param {number} props.columns - Número de columnas (1-4), default: 3
 */
export default function ImageGallery({ images = [], title = '', columns = 3 }) {
	const [isOpen, setIsOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	// Configurar columnas responsive
	const getGridCols = () => {
		switch (columns) {
			case 1: return 'grid-cols-1';
			case 2: return 'grid-cols-1 sm:grid-cols-2';
			case 3: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
			case 4: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
			default: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
		}
	};

	// Abrir lightbox en una imagen específica
	const openLightbox = (index) => {
		setCurrentIndex(index);
		setIsOpen(true);
		document.body.style.overflow = 'hidden';
	};

	// Cerrar lightbox
	const closeLightbox = () => {
		setIsOpen(false);
		document.body.style.overflow = '';
	};

	// Navegar a la imagen anterior
	const goToPrevious = () => {
		setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
	};

	// Navegar a la siguiente imagen
	const goToNext = () => {
		setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
	};

	// Manejar teclas del teclado
	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (e) => {
			if (e.key === 'Escape') {
				closeLightbox();
			} else if (e.key === 'ArrowLeft') {
				e.preventDefault();
				goToPrevious();
			} else if (e.key === 'ArrowRight') {
				e.preventDefault();
				goToNext();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [isOpen, currentIndex, images.length]);

	if (!images || images.length === 0) {
		return null;
	}

	return (
		<div className="w-full">
			{/* Título de la galería */}
			{title && (
				<h2 className="text-3xl font-bold text-white mb-6 drop-shadow-lg">
					{title}
				</h2>
			)}

			{/* Grid de imágenes */}
			<div className={`grid ${getGridCols()} gap-4`}>
				{images.map((image, index) => (
					<button
						key={index}
						onClick={() => openLightbox(index)}
						className="group block relative overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-transparent"
						aria-label={`Ver ${image.alt || `imagen ${index + 1}`}`}
					>
						<img
							src={image.thumbnail || image.src}
							alt={image.alt || `Imagen ${index + 1}`}
							className="w-full h-48 object-cover transform group-hover:scale-105 transition duration-300 cursor-zoom-in"
							loading="lazy"
						/>
						{/* Overlay al hacer hover */}
						<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
								/>
							</svg>
						</div>
					</button>
				))}
			</div>

			{/* Lightbox Modal */}
			{isOpen && typeof document !== 'undefined' && createPortal(
				<div
					className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4"
					onClick={closeLightbox}
				>
					{/* Botón cerrar */}
					<button
						onClick={closeLightbox}
						className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/60 rounded-full p-3 transition z-10"
						aria-label="Cerrar galería"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-6 h-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>

					{/* Botón anterior */}
					{images.length > 1 && (
						<button
							onClick={(e) => {
								e.stopPropagation();
								goToPrevious();
							}}
							className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full p-3 transition z-10"
							aria-label="Imagen anterior"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-6 h-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</button>
					)}

					{/* Imagen principal */}
					<div
						onClick={(e) => e.stopPropagation()}
						className="relative max-w-[90vw] max-h-[85vh]"
					>
						<img
							src={images[currentIndex].src}
							alt={images[currentIndex].alt || `Imagen ${currentIndex + 1}`}
							className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain"
						/>
						{/* Contador de imágenes */}
						<div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
							{currentIndex + 1} / {images.length}
						</div>
					</div>

					{/* Botón siguiente */}
					{images.length > 1 && (
						<button
							onClick={(e) => {
								e.stopPropagation();
								goToNext();
							}}
							className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full p-3 transition z-10"
							aria-label="Imagen siguiente"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-6 h-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</button>
					)}
				</div>,
				document.body
			)}
		</div>
	);
}
