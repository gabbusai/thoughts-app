import { useState } from "react";
import {motion} from 'framer-motion';

function CategoryCard({category}) {

    return(
        <motion.a href={`/thoughts/category/${category.category}`} className="rounded-xl bg-orange-400 mx-2 mt-3 h-8 w-auto p-1 text-lg text-white px-2 " key={category.id}
        whileHover={{
            scale: 1.1,
            rotate: "5deg",
            transition: {duration: .2,},
            backgroundColor: "#F3B95F",
            boxShadow: "0px 0px 2px 2px orange",
            color: "#2c2c2c",
        }}
        >
        {category.category}
    </motion.a>
    )
}

export default CategoryCard