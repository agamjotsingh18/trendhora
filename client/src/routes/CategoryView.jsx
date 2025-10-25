import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ReactLoading from 'react-loading';
import Category from '../components/Category/Category';
import './CategoryView.css';

const CategoryView = () => {
    const param = useParams()
    const [ menItems, setMenItems ] = useState()
    const [ womenItems, setWomenItems ] = useState()
    const [ kidsItems, setKidsItems ] = useState()
    const [ loading , setLoading ] = useState(true) 

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/items`)
            .then(res => {
                console.log("Fetched items from backend:", res.data); // Debug log
                setMenItems(res.data.filter((item) => item.category === "men"))
                setKidsItems(res.data.filter((item) => item.category === "kids" ))
                setWomenItems(res.data.filter((item) => item.category === "women")) 
                setLoading(false)
            })
            .catch(err => {
                console.error("Error fetching items:", err); // Debug log
            })

        window.scrollTo(0, 0)
    }, [param.id])
    
    return ( 
        <div className='category-view-wrapper'>
            {loading && <ReactLoading type="balls" color='#FFE26E' height={100} width={100} className='m-auto'/>}
            { menItems && param.id === 'men' && <Category name="Men's Fashion" items={menItems} category="men"/>}
            { womenItems && param.id === 'women' && <Category name="Women's Fashion" items={womenItems} category="women"/>}
            { kidsItems && param.id === 'kids' && <Category name="Kids Fashion" items={kidsItems} category="kids"/>}
        </div>
     );
}
 
export default CategoryView;