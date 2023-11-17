import { useRouter } from 'next/router';

function Pagination({ currentPage }) {
    const router = useRouter();

    const changePage = (newPage) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, page: newPage }
        });
    }

    return (
        <div>
            <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
            <button onClick={() => changePage(currentPage + 1)}>Next</button>
        </div>
    );
}

export default Pagination;
