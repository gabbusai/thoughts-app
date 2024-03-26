import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
const Category = ({ category, onSelect, categories }) => {

    const isSelected = categories.includes(category.id);
    const handleSelect = () => {
    onSelect(category);
    };

    return (
    <motion.button onClick={handleSelect} 
    className={`
    ${isSelected ? 'bg-green-500 hover:bg-green-700 ring-offset-1 ring-2' : 'bg-orange-300 hover:bg-orange-500 text-black '} }
    text-white font-bold py-2 px-4 rounded w-32 text-center
    `}
    initial={{ 
        scale: 1
    }}
    whileTap={{ 
        scale: [0.9]

    }}
    whileHover={{ 
        scale: 1.1,
    }}
    animate={{ 
        scale: [1, 0, 1],
        rotate: [0, 90, 0],
    }}
    transition={{ 
        type: "spring",
        duration: 0.23,
    }}
    >
        {category.category}
    </motion.button>
    );
    };

export default Category;