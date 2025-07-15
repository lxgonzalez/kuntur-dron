import { useState, useEffect, useRef, createContext, useContext } from 'react';

const StreamingContext = createContext();

export const StreamingProvider = ({ children }) => {
    const [isVideoStreaming, setIsVideoStreaming] = useState(false);
    const [isAudioStreaming, setIsAudioStreaming] = useState(false);
    const [videoLoading, setVideoLoading] = useState(false);
    const [audioLoading, setAudioLoading] = useState(false);
    const [videoError, setVideoError] = useState(null);
    const [audioError, setAudioError] = useState(null);
    const [videoQuality, setVideoQuality] = useState('HD');
    const [audioLevel, setAudioLevel] = useState(0);

    const audioLevelInterval = useRef(null);

    const startAllStreams = async () => {
        await Promise.all([
            startVideoStream(),
            startAudioStream()
        ]);
    };

    const stopAllStreams = async () => {
        await Promise.all([
            stopVideoStream(),
            stopAudioStream()
        ]);
    };

    const startVideoStream = async () => {
        setVideoLoading(true);
        setVideoError(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

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

    const stopVideoStream = async () => {
        setVideoLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            setIsVideoStreaming(false);
        } catch (error) {
            setVideoError('Error al detener el stream');
        } finally {
            setVideoLoading(false);
        }
    };

    const startAudioStream = async () => {
        setAudioLoading(true);
        setAudioError(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (Math.random() < 0.05) {
                throw new Error('Error de audio del dron');
            }

            setIsAudioStreaming(true);

            audioLevelInterval.current = setInterval(() => {
                setAudioLevel(Math.floor(Math.random() * 100));
            }, 200);

        } catch (error) {
            setAudioError(error.message);
        } finally {
            setAudioLoading(false);
        }
    };

    const stopAudioStream = async () => {
        setAudioLoading(true);

        try {
            if (audioLevelInterval.current) {
                clearInterval(audioLevelInterval.current);
                audioLevelInterval.current = null;
            }

            await new Promise(resolve => setTimeout(resolve, 500));
            setIsAudioStreaming(false);
            setAudioLevel(0);
        } catch (error) {
            setAudioError('Error al detener el audio');
        } finally {
            setAudioLoading(false);
        }
    };

    const changeVideoQuality = (quality) => {
        setVideoQuality(quality);
    };

    useEffect(() => {
        return () => {
            if (audioLevelInterval.current) {
                clearInterval(audioLevelInterval.current);
            }
        };
    }, []);

    const value = {
        // Estados
        isVideoStreaming,
        isAudioStreaming,
        videoLoading,
        audioLoading,
        videoError,
        audioError,
        videoQuality,
        audioLevel,

        // Funciones de video
        startVideoStream,
        stopVideoStream,
        changeVideoQuality,

        // Funciones de audio
        startAudioStream,
        stopAudioStream,

        // Funciones de control general
        startAllStreams,
        stopAllStreams,

        // Funciones para limpiar errores
        clearVideoError: () => setVideoError(null),
        clearAudioError: () => setAudioError(null),
    };

    return (
        <StreamingContext.Provider value={value}>
            {children}
        </StreamingContext.Provider>
    );
};

// Hook para usar el contexto
export const useStreaming = () => {
    const context = useContext(StreamingContext);
    if (!context) {
        throw new Error('useStreaming must be used within a StreamingProvider');
    }
    return context;
};
