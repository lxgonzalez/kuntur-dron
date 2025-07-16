import { useState } from 'react';
import { useUserData } from './useUserData';



export const useDroneLocation = () => {
    const { latitude, longitude, displayAddress } = useUserData();
    const address = displayAddress || 'Universidad Central del Ecuador';

    const baseLocation = {
        latitude: latitude,
        longitude: longitude,
    };

    const [droneLocation, setDroneLocation] = useState(baseLocation);
    const [droneData, setDroneData] = useState({
        status: 'Patrullando'
    });


    return {
        address,
        droneLocation,
        droneData,
    };
};
