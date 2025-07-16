import { useState, useEffect } from 'react';
import { useUserName } from './useUserName';
import { useReverseGeocoding } from './useReverseGeocoding';


export const useRecordedVideos = () => {
    const { deviceId, latitude, longitude } = useUserName();
    const [videos, setVideos] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Hook para obtener dirección basada en coordenadas
    const {
        address,
        loading: addressLoading,
        error: addressError,
        formattedAddress,
        shortAddress,
        displayAddress,
        refreshAddress
    } = useReverseGeocoding(latitude, longitude);

    // Función para obtener videos desde la API
    const fetchVideos = async () => {
        if (!deviceId) return;

        setLoading(true);
        setError(null);

        try {
            // TODO: Reemplazar con la URL real de tu API
            const response = await fetch(`https://your-api.com/videos?deviceId=${deviceId}`);

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            setVideos(data.videos || []);

            // Si hay videos, seleccionar el más reciente
            if (data.videos && data.videos.length > 0) {
                setCurrentVideo(data.videos[0]);
            }

        } catch (err) {
            console.error('Error fetching videos:', err);
            setError(err.message || 'Error al obtener videos');
        } finally {
            setLoading(false);
        }
    };

    // Función para obtener un video específico
    const getVideoById = async (videoId) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://your-api.com/videos/${videoId}`);

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const videoData = await response.json();
            setCurrentVideo(videoData);

        } catch (err) {
            console.error('Error fetching video:', err);
            setError(err.message || 'Error al obtener el video');
        } finally {
            setLoading(false);
        }
    };

    // Función para subir metadatos del vuelo
    const uploadFlightMetadata = async (flightData) => {
        if (!deviceId) return;

        try {
            const metadata = {
                deviceId,
                latitude,
                longitude,
                timestamp: new Date().toISOString(),
                ...flightData
            };

            const response = await fetch('https://your-api.com/flights', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(metadata)
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Flight metadata uploaded:', result);

            // Actualizar la lista de videos después de subir
            fetchVideos();

        } catch (err) {
            console.error('Error uploading flight metadata:', err);
            setError(err.message || 'Error al subir metadatos del vuelo');
        }
    };

    // Función para limpiar errores
    const clearError = () => {
        setError(null);
    };

    // Función para obtener URL del video con CDN
    const getVideoUrl = (videoPath) => {
        // TODO: Reemplazar con tu dominio de CDN
        return `https://your-cdn.com/${videoPath}`;
    };

    // Efecto para cargar videos cuando hay deviceId
    useEffect(() => {
        if (deviceId) {
            fetchVideos();
        }
    }, [deviceId]);

    return {
        // Estados
        videos,
        currentVideo,
        loading,
        error,

        // Datos del video actual
        videoUrl: currentVideo?.videoUrl || currentVideo?.path ? getVideoUrl(currentVideo.path) : null,
        videoMetadata: currentVideo?.metadata || null,

        // Datos de ubicación y dirección
        address,
        addressLoading,
        addressError,
        formattedAddress,
        shortAddress,
        displayAddress,
        refreshAddress,

        // Funciones
        fetchVideos,
        getVideoById,
        uploadFlightMetadata,
        clearError,

        // Funciones de utilidad
        hasVideos: videos.length > 0,
        isVideoAvailable: !!currentVideo,
        hasAddress: !!address,

        // Información del vuelo actual
        flightInfo: {
            deviceId,
            location: { latitude, longitude },
            address: formattedAddress,
            shortAddress,
            timestamp: currentVideo?.timestamp || null,
            duration: currentVideo?.duration || null,
            fileSize: currentVideo?.fileSize || null,
        }
    };
};
