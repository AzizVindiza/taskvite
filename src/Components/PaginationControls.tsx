import React from 'react';
import { Button } from 'antd';

interface PaginationControlsProps {
    onNextPage: () => void;
    onPrevPage: () => void;
    currentPage: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ onNextPage, onPrevPage, currentPage }) => (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <Button onClick={onPrevPage} disabled={currentPage === 1} type="primary" style={{ marginRight: '10px' }}>
            Предыдущая страница
        </Button>

        <span style={{ marginRight: '10px', fontSize: '16px', fontWeight: 'bold', lineHeight: '32px' }}>
            Страница {currentPage}
        </span>

        <Button onClick={onNextPage} type="primary">
            Следующая страница
        </Button>
    </div>
);

export default PaginationControls;