import { useState, useEffect, useRef } from 'react';

export const useDroneLocation = () => {
    const baseLocation = {
        latitude: -0.1990152,
        longitude: -78.5038685,
    };

    const [droneLocation, setDroneLocation] = useState(baseLocation);
    const [droneData, setDroneData] = useState({
        status: 'Patrullando'
    });


    return {
        droneLocation,
        droneData,
    };
};
