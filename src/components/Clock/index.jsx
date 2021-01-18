import React from 'react';
import useClock from '../../hooks/useClock';

function Clock() {
    const { timeString } = useClock();

    return (
        <p style={{ fontSize: '40px' }}>{timeString}</p>
    );
}

export default Clock;
