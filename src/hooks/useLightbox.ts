// hooks/useLightbox.ts
import { useState, useEffect } from 'react';

interface UseLightboxArgs {
    gallery: string[];
}

export const useLightbox = ({ gallery }: UseLightboxArgs) => {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    // Keyboard navigation for Lightbox
    useEffect(() => {
        if (!isLightboxOpen) return;
        
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsLightboxOpen(false);
            }
            if (e.key === 'ArrowRight') {
                setLightboxIndex(prev => (prev + 1) % gallery.length);
            }
            if (e.key === 'ArrowLeft') {
                setLightboxIndex(prev => (prev - 1 + gallery.length) % gallery.length);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isLightboxOpen, gallery.length]);

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setIsLightboxOpen(true);
    };

    const closeLightbox = () => setIsLightboxOpen(false);

    const nextImage = () => setLightboxIndex(prev => (prev + 1) % gallery.length);
    const prevImage = () => setLightboxIndex(prev => (prev - 1 + gallery.length) % gallery.length);

    return {
        isLightboxOpen,
        lightboxIndex,
        openLightbox,
        closeLightbox,
        nextImage,
        prevImage,
        setLightboxIndex,
    };
};
