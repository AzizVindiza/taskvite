import React from 'react';
import { Spin } from 'antd';

const LoadingIndicator: React.FC = () => (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Spin size="large" />
        <p style={{ marginTop: '10px' }}>Загрузка...</p>
    </div>
);

export default LoadingIndicator;