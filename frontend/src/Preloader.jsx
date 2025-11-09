import React, { useEffect, useState } from 'react';

const Preloader = () => {
    const [showPreloader, setShowPreloader] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPreloader(false);
        }, 800); // Quick 800ms total

        return () => clearTimeout(timer);
    }, []);

    if (!showPreloader) return null;

    return (
        <div className="simple-loader-overlay">
            <div className="simple-spinner"></div>
        </div>
    );
};

export default Preloader;


