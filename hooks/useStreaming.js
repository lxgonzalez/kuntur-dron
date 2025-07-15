import { useState, useEffect, useRef } from 'react';

export const useStreaming = () => {
    const [isVideoStreaming, setIsVideoStreaming] = useState(false);
    const [isAudioStreaming, setIsAudioStreaming] = useState(false);
    const [videoLoading, setVideoLoading] = useState(false);
    const [audioLoading, setAudioLoading] = useState(false);
    const [videoError, setVideoError] = useState(null);
    const [audioError, setAudioError] = useState(null);
    const [videoQuality, setVideoQuality] = useState('HD'); // 'HD', 'SD', 'LOW'
    const [audioLevel, setAudioLevel] = useState(0); // 0-100

    // Simular niveles de audio
    const audioLevelInterval = useRef(null);

    // Simular stream de video
    const startVideoStream = async () => {
        setVideoLoading(true);
        setVideoError(null);

        try {
            // Simular conexión al endpoint de video
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Simular posibles errores (10% de probabilidad)
            if (Math.random() < 0.1) {
                throw new Error('Error de conexión con el dron');
            }

            setIsVideoStreaming(true);
        } catch (error) {
            setVideoError(error.message);
        } finally {
            setVideoLoading(false);
        }
    };

    // Detener stream de video
    const stopVideoStream = async () => {
        setVideoLoading(true);

        try {
            // Simular desconexión
            await new Promise(resolve => setTimeout(resolve, 800));
            setIsVideoStreaming(false);
        } catch (error) {
            setVideoError('Error al detener el stream');
        } finally {
            setVideoLoading(false);
        }
    };

    // Simular stream de audio
    const startAudioStream = async () => {
        setAudioLoading(true);
        setAudioError(null);

        try {
            // Simular conexión al endpoint de audio
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Simular posibles errores (5% de probabilidad)
            if (Math.random() < 0.05) {
                throw new Error('Error de audio del dron');
            }

            setIsAudioStreaming(true);

            // Simular niveles de audio cambiantes
            audioLevelInterval.current = setInterval(() => {
                setAudioLevel(Math.floor(Math.random() * 100));
            }, 200);

        } catch (error) {
            setAudioError(error.message);
        } finally {
            setAudioLoading(false);
        }
    };

    // Detener stream de audio
    const stopAudioStream = async () => {
        setAudioLoading(true);

        try {
            // Limpiar intervalo de audio
            if (audioLevelInterval.current) {
                clearInterval(audioLevelInterval.current);
                audioLevelInterval.current = null;
            }

            // Simular desconexión
            await new Promise(resolve => setTimeout(resolve, 500));
            setIsAudioStreaming(false);
            setAudioLevel(0);
        } catch (error) {
            setAudioError('Error al detener el audio');
        } finally {
            setAudioLoading(false);
        }
    };

    // Cambiar calidad de video
    const changeVideoQuality = (quality) => {
        setVideoQuality(quality);
        // Aquí se podría hacer una llamada para cambiar la calidad en el servidor
    };

    // Limpiar intervalos al desmontar
    useEffect(() => {
        return () => {
            if (audioLevelInterval.current) {
                clearInterval(audioLevelInterval.current);
            }
        };
    }, []);

    return {
        // Estados de video
        isVideoStreaming,
        videoLoading,
        videoError,
        videoQuality,

        // Estados de audio
        isAudioStreaming,
        audioLoading,
        audioError,
        audioLevel,

        // Funciones de video
        startVideoStream,
        stopVideoStream,
        changeVideoQuality,

        // Funciones de audio
        startAudioStream,
        stopAudioStream,

        // Función para limpiar errores
        clearVideoError: () => setVideoError(null),
        clearAudioError: () => setAudioError(null),
    };
};
