'use client'

import React from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

interface CustomScrollbarProps {
    children: React.ReactNode;
    className?: string;
}

const CustomScrollbar: React.FC<CustomScrollbarProps> = ({ children, className = '' }) => {
    return (
        <SimpleBar
            style={{ maxHeight: '100vh', height: '100%', width: '100%' }}
            className={`h-screen ${className}`}
            autoHide={false}
        >
            {children}
        </SimpleBar>
    );
};

export default CustomScrollbar;