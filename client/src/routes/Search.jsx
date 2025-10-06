import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Search from "../components/Search";

const SearchView = () => {
    const param = useParams()
    
    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, []);
    
    console.log(param.query)
    return ( 
        <Search />
     );
}
 
export default SearchView;