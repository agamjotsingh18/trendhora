import { useEffect, useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchContext } from '../../Context/SearchContext';
import ItemCard from '../Card/ItemCard/ItemCard';
import './index.css';

const Search = () => {
    const search = useContext(SearchContext);
    const [searchParam, setSearchParam] = useSearchParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (search.searchQuery) {
            setSearchParam({ q: search.searchQuery }, { replace: true });
            setLoading(true);
            setError(null);

            fetch(`/api/items/search?q=${encodeURIComponent(search.searchQuery)}`)
                .then(res => {
                    if (!res.ok) throw new Error('No items found');
                    return res.json();
                })
                .then(data => {
                    setResults(data);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.message);
                    setResults([]);
                    setLoading(false);
                });
        } else {
            setSearchParam({}, { replace: true });
            setResults([]);
        }
    }, [search.searchQuery]);

    return (
        <div className="search__container">
            <div className="search__container__content">
                {loading && (
                    <div className="search__loading">
                        <h2>Searching for "{search.searchQuery}"...</h2>
                    </div>
                )}

                {!loading && error && (
                    <div className="search__error">
                        <h2>No results found for "{search.searchQuery}"</h2>
                        <p>Try searching for something else</p>
                    </div>
                )}

                {!loading && !error && results.length === 0 && search.searchQuery && (
                    <div className="search__no-results">
                        <h2>No results found for "{search.searchQuery}"</h2>
                        <p>Try searching for something else</p>
                    </div>
                )}

                {!loading && !error && results.length > 0 && (
                    <div className="search__results">
                        <div className="search__results__header">
                            <h2>Search Results for "{search.searchQuery}"</h2>
                            <p>{results.length} item{results.length !== 1 ? 's' : ''} found</p>
                        </div>
                        <div className="search__results__grid">
                            {results.map(item => (
                                <ItemCard key={item._id} item={item} />
                            ))}
                        </div>
                    </div>
                )}

                {!loading && !error && !search.searchQuery && (
                    <div className="search__empty">
                        <h2>Search for products</h2>
                        <p>Enter a search term to find products</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
