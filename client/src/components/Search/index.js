import { useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';                                        
import { SearchContext } from '../../Context/SearchContext';
import ItemCard from '../Card/ItemCard/ItemCard';                
import ReactLoading from 'react-loading';                         
import './index.css';
const Search = () => {
    const search = useContext(SearchContext);
    const [searchParam, setSearchParam] = useSearchParams();

    // State to hold all items from the API and loading status
    // State to hold the search results from the API
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Function to fetch data from our new search endpoint
        const fetchSearchResults = async () => {
            if (!search.searchQuery || search.searchQuery.trim() === '') {
                setSearchResults([]); // Clear previous results
                return;
            }

            setLoading(true); 
            setSearchParam({ query: search.searchQuery }, { replace: true });

            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/items/search?q=${search.searchQuery}`);
                setSearchResults(response.data);
            } catch (error) {
                console.error("Failed to fetch search results:", error);
                setSearchResults([]); // Clear results on error
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchSearchResults();
    }, [search.searchQuery, setSearchParam]);

    return (
        <div className="search__container">
            {loading ? (
                <div className='d-flex min-vh-100 w-100 justify-content-center align-items-center m-auto'>
                    <ReactLoading type="balls" color='#FFE26E' height={100} width={100} />
                </div>
            ) : searchResults.length > 0 ? (
                <>
                    <div className="search__container__header">
                        <h1>Results for "{search.searchQuery}"</h1>
                        <p>{searchResults.length} items found</p>
                    </div>
                    <div className="search__results__grid">
                        {searchResults.map((item) => (
                            <ItemCard key={item._id} item={item} />
                        ))}
                    </div>
                </>
            ) : (
                <div className="search__container__header">
                    {search.searchQuery ? (
                        <>
                            <h1>No results found for "{search.searchQuery}"</h1>
                            <p>Please try a different search term.</p>
                        </>
                    ) : (
                        <h1>What are you looking for today? 🛍️</h1>
                    )}
                </div>
            )}
        </div>
    );
}
 
export default Search;