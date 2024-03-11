import React from 'react';

interface PaginationControlsProps {
    onNextPage: () => void;
    onPrevPage: () => void;
    currentPage: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({onNextPage, onPrevPage, currentPage,}) => (
    <div>
        <button onClick={onPrevPage} disabled={currentPage === 1}>
            Предыдущая страница
        </button>
        <button onClick={onNextPage}>Следующая страница</button>
    </div>
);

export default PaginationControls;
