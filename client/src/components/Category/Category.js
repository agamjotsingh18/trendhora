import './Category.css';
import ItemCard from '../Card/ItemCard/ItemCard';
import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TabTitle } from '../../utils/General';
import { Button } from '@mui/material';

const Category = (props) => {
    TabTitle(props.name)

    const [show, setShow] = useState('All');
    const [filter, setFilter] = useState('Latest');

    const handleShowChange = (event) => {
        setShow(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    // Filter and sort items based on selected options
    const filteredAndSortedItems = useMemo(() => {
        if (!props.items) return [];
        
        let items = [...props.items];
        
        // Apply filtering based on 'show' dropdown
        if (show !== 'All') {
            // Filter by type (you can expand this based on your item properties)
            items = items.filter(item => {
                switch (show) {
                    case 'Clothing':
                        return ['shirt', 'dress', 'pants', 'jacket', 'hoodie', 'sweater', 'top'].includes(item.type?.toLowerCase());
                    case 'Accessories':
                        return ['bag', 'watch', 'jewelry', 'belt', 'hat', 'scarf'].includes(item.type?.toLowerCase());
                    case 'Shoes':
                        return ['shoes', 'sneakers', 'boots', 'sandals'].includes(item.type?.toLowerCase());
                    case 'Sale':
                        return item.price < 100; // Assuming sale items are under $100
                    default:
                        return true;
                }
            });
        }
        
        // Apply sorting based on 'filter' dropdown
        switch (filter) {
            case 'Price: Low to High':
                items.sort((a, b) => a.price - b.price);
                break;
            case 'Price: High to Low':
                items.sort((a, b) => b.price - a.price);
                break;
            case 'Name: A to Z':
                items.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'Name: Z to A':
                items.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'Popularity':
                // Sort by price as a proxy for popularity (higher price = more popular)
                items.sort((a, b) => b.price - a.price);
                break;
            case 'Latest':
            default:
                // Keep original order for 'Latest' (assuming the original order represents latest items)
                break;
        }
        
        return items;
    }, [props.items, show, filter]);

    // Dark mode styles for Material-UI components
    const darkModeStyles = {
        '& .MuiInputLabel-root': {
            color: 'var(--text-primary)',
        },
        '& .MuiSelect-select': {
            color: 'var(--text-primary)',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'var(--border-color)',
            },
            '&:hover fieldset': {
                borderColor: 'var(--accent-color)',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'var(--accent-color)',
            },
        },
        '& .MuiSvgIcon-root': {
            color: 'var(--text-primary)',
        },
    };

    return ( 
        <div className="category__container">
            <div className="category">
                <div className="category__header__container">
                    <div className="category__header__big">
                        <div className="category__header">
                            <h2>{props.name}</h2>
                        </div> 
                        <div className="category__header__line"></div>
                    </div>
                    <div className="category__sort">
                        <div className="show__filter">
                            <Box sx={{ minWidth: 100} }>
                                <FormControl fullWidth size="small" sx={darkModeStyles}>
                                    <InputLabel>Show</InputLabel>
                                    <Select
                                    value={show}
                                    label="Show"
                                    onChange={handleShowChange}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                backgroundColor: 'var(--bg-secondary)',
                                                '& .MuiMenuItem-root': {
                                                    color: 'var(--text-primary)',
                                                    '&:hover': {
                                                        backgroundColor: 'var(--bg-tertiary)',
                                                    },
                                                },
                                            },
                                        },
                                    }}
                                    >
                                        <MenuItem value={'All'}>All</MenuItem>
                                        <MenuItem value={'Clothing'}>Clothing</MenuItem>
                                        <MenuItem value={'Accessories'}>Accessories</MenuItem>
                                        <MenuItem value={'Shoes'}>Shoes</MenuItem>
                                        <MenuItem value={'Sale'}>Sale Items</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                       </div>
                       <div className="filter__by">
                       <div className="show__filter">
                            <Box sx={{ width: 120} }>
                                <FormControl fullWidth size="small" sx={darkModeStyles}>
                                    <InputLabel>Filter by</InputLabel>
                                    <Select
                                    value={filter}
                                    label="Filter"
                                    onChange={handleFilterChange}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                backgroundColor: 'var(--bg-secondary)',
                                                '& .MuiMenuItem-root': {
                                                    color: 'var(--text-primary)',
                                                    '&:hover': {
                                                        backgroundColor: 'var(--bg-tertiary)',
                                                    },
                                                },
                                            },
                                        },
                                    }}
                                    >
                                        <MenuItem value={'Latest'}>Latest</MenuItem>
                                        <MenuItem value={'Price: Low to High'}>Price: Low to High</MenuItem>
                                        <MenuItem value={'Price: High to Low'}>Price: High to Low</MenuItem>
                                        <MenuItem value={'Name: A to Z'}>Name: A to Z</MenuItem>
                                        <MenuItem value={'Name: Z to A'}>Name: Z to A</MenuItem>
                                        <MenuItem value={'Popularity'}>Popularity</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            </div>
                       </div>
                    </div>
                </div>
                <div className="category__card__container">
                    <div className="category__product__card">
                        {filteredAndSortedItems.map((data, index) => <ItemCard key={data._id || index} item={data} category={props.category}/>)}
                        <div className="show__more__action">
                            {/* <Button variant='outlined' sx={[ {width: '200px', height: '50px', borderRadius: '20px' , fontWeight: '700', backgroundColor: '#FFE26E', borderColor: '#FFE26E', color: 'black' }, {'&:hover': { borderColor: '#FFE26E', backgroundColor: "none" }}]}>Show more</Button> */}
                            <Button
                                variant="outlined"
                                sx={{
                                width: '200px',
                                height: '50px',
                                borderRadius: '20px',
                                fontWeight: '700',
                                backgroundColor: '#FFE26E',
                                borderColor: '#FFE26E',
                                color: 'black',
                                '&:hover': {
                                    backgroundColor: '#FFD633',
                                    borderColor: '#FFD633',
                                    },
                                '&:active': {
                                    backgroundColor: '#FFCC00',
                                    borderColor: '#FFCC00',
                                },
                                '&:focus': {
                                    backgroundColor: '#FFE26E',
                                    borderColor: '#FFE26E',
                                    outline: 'none',
                                },
                            }}
                    >Show more
                </Button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Category;