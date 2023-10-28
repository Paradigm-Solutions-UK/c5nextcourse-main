import { useState, useEffect } from 'react';

function usePaginationData(initialData, url, uid) {
    const [data, setData] = useState(initialData);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${url}?uid=${uid}&page=${page}`);
            const newData = await response.json();
            setData(newData);
        }

        if (initialData && page === 1) {
            setData(initialData);
        } else {
            fetchData();
        }
    }, [page]);

    return { data, page, setPage };
}

export default usePaginationData;
