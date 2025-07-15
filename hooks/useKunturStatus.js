import { useState, useEffect } from 'react';

export const useKunturStatus = (initialStatus = 'off') => {
    const [status, setStatus] = useState(initialStatus);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchStatus = async () => {
        setLoading(true);
        setError(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            const mockResponse = {
                status: 'off', 
                timestamp: new Date().toISOString(),
                location: 'Centro Comercial "El Tejar"'
            };

            setStatus(mockResponse.status);
        } catch (err) {
            setError('Error al obtener el estado de Kuntur');
        } finally {
            setLoading(false);
        }
    };

    const activateKuntur = async () => {
        setLoading(true);
        setError(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            setStatus('on');
        } catch (err) {
            setError('Error al activar Kuntur');
        } finally {
            setLoading(false);
        }
    };

    const deactivateKuntur = async () => {
        setLoading(true);
        setError(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            setStatus('off');
        } catch (err) {
            setError('Error al desactivar Kuntur');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatus();
    }, []);

    return {
        status,
        loading,
        error,
        activateKuntur,
        deactivateKuntur,
        refetchStatus: fetchStatus
    };
};
