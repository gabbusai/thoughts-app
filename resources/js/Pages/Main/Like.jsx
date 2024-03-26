import { useState, react } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import { FaThumbsUp } from "react-icons/fa6";
import {motion} from "framer-motion"
function Like({thought, currentUser, hasLiked}) {
    const like = (e) => {
        e.preventDefault();
        router.post(`/thoughts/${thought.id}/like`, thought);
    };
    const unlike = (e) => {
        e.preventDefault();
        router.post(`/thoughts/${thought.id}/unlike`, thought);
    }

    const likedVariant = {
        opacity: 1,
        scale: 1.1,
        transition: { duration: 0.3 }, // Optional transition settings
    };

    const unlikedVariant = {
        opacity: 0.5,
        scale: 1.1,
        transition: { duration: 0.3 }, // Optional transition settings
    };
    

    return(
        <>
        <motion.button className="rounded-md h-[44px] w-[82px]"
        onClick={hasLiked ? unlike:  like}
        whileHover={{scale: [1.2, 0.9]
        }}
        whileTap={{  
            scale: [0.9, 1.5, 1.1],
        }}
        animate={   
            hasLiked ? likedVariant : unlikedVariant
        }
        trainsition={{ 
            duration:"infinte",
            ease:"easeInOut"
        }}
        >
            {hasLiked ? <FaThumbsUp size={40} color="green"/> : <FaThumbsUp size={40} color="black"/>} 
        </motion.button>
        </>
    )
}

export default Like;
