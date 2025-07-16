// Configuración de API para videos grabados del dron
// Reemplaza estos valores con tu configuración real

export const API_CONFIG = {
    // URL base de tu API
    baseUrl: 'https://your-api-domain.com/api',

    // URL de tu CDN para videos
    cdnUrl: 'https://your-cdn-domain.com',

    // Endpoints específicos
    endpoints: {
        videos: '/videos',
        flights: '/flights',
        upload: '/upload'
    }
};

// Ejemplo de estructura de respuesta esperada de la API
export const SAMPLE_API_RESPONSES = {
    // GET /videos?deviceId=123
    videos: {
        success: true,
        videos: [
            {
                id: 'video-123',
                deviceId: 'device-456',
                videoUrl: 'https://your-cdn.com/videos/video-123.mp4',
                path: 'videos/video-123.mp4',
                timestamp: '2025-01-15T10:30:00Z',
                duration: 120000, // milisegundos
                fileSize: 15728640, // bytes
                metadata: {
                    latitude: -12.046374,
                    longitude: -77.042793,
                    altitude: 154.3,
                    flightDuration: 120,
                    batteryLevel: 85
                }
            }
        ]
    },

    // GET /videos/123
    video: {
        success: true,
        video: {
            id: 'video-123',
            deviceId: 'device-456',
            videoUrl: 'https://your-cdn.com/videos/video-123.mp4',
            path: 'videos/video-123.mp4',
            timestamp: '2025-01-15T10:30:00Z',
            duration: 120000,
            fileSize: 15728640,
            metadata: {
                latitude: -12.046374,
                longitude: -77.042793,
                altitude: 154.3,
                flightDuration: 120,
                batteryLevel: 85
            }
        }
    },

    // POST /flights
    uploadFlight: {
        success: true,
        flightId: 'flight-789',
        message: 'Flight metadata uploaded successfully'
    }
};

// Función para construir URLs de la API
export const buildApiUrl = (endpoint, params = {}) => {
    const url = new URL(API_CONFIG.baseUrl + API_CONFIG.endpoints[endpoint]);

    Object.keys(params).forEach(key => {
        url.searchParams.append(key, params[key]);
    });

    return url.toString();
};

// Función para construir URLs del CDN
export const buildCdnUrl = (path) => {
    return `${API_CONFIG.cdnUrl}/${path}`;
};

// Headers comunes para las requests
export const getApiHeaders = () => ({
    'Content-Type': 'application/json',
    // Agregar headers de autenticación si es necesario
    // 'Authorization': `Bearer ${token}`,
});

// Ejemplo de uso:
// const videosUrl = buildApiUrl('videos', { deviceId: 'device-123' });
// const videoUrl = buildCdnUrl('videos/video-123.mp4');
