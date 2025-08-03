
import React, { useEffect, useState } from 'react';
import './toaster.css';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

const Toaster = ({
    title = '',
    message,
    isVisible,
    onClose,
    duration = 1000,
    type = 'success'
}) => {
    const [showFillAnimation, setShowFillAnimation] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setShowFillAnimation(false); // reset animation
            const fillTimer = setTimeout(() => {
                setShowFillAnimation(true);
            }, 100);

            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => {
                clearTimeout(timer);
                clearTimeout(fillTimer);
            };
        }
    }, [isVisible, duration, onClose]);

    if (!isVisible) return null;

    return (
        <div className={`toaster ${type} toaster-show`}>
            <div className="toaster-content">
                <div className="toaster-icon">
                    <CheckIcon sx={{ color: 'white', fontSize: 20 }} />
                </div>
                <div className="toaster-message">
                    <div className="toaster-title">{title}</div>
                    <div className="toaster-subtitle">{message}</div>
                </div>
                <IconButton onClick={onClose} className="toaster-close" size="small">
                    <CloseIcon
                        sx={{
                            color: showFillAnimation ? '#666' : 'white',
                            fontSize: 18,
                            transition: 'color 0.5s ease-in-out',
                        }}
                    />
                </IconButton>
            </div>
        </div>
    );
};

export default Toaster;
