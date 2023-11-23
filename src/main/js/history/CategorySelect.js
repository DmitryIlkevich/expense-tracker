import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {FormControl, InputLabel} from "@mui/material";
import Box from "@mui/material/Box";

/**
 * Retrieves categories from backend and handles user category select
 *
 * @param notifyCategorySelect Notifies subscribers after category selection action
 */
const CategorySelect = ({notifyCategorySelect}) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    /**
     * Make a GET request to fetch categories when the component mounts
     */
    useEffect(() => {
        axios.get('/category')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    /**
     * Handles category change
     */
    const handleCategoryChange = (event) => {
        notifyCategorySelect(event.target.value);
        setSelectedCategory(event.target.value);
    };

    return (
        <Box sx={{minWidth: 120}}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    sx={{minWidth: 120}}
                    id="categorySelect"
                    value={selectedCategory}
                    onChange={handleCategoryChange}>

                    {categories.map(category => (
                        <MenuItem variant="filled" id="filled-basic" key={category.id}
                                  value={category.id}>{category.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default CategorySelect;