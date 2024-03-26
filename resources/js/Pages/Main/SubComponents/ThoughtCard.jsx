import React, {useState, useRef, useEffect, useContext} from "react";
import {motion, AnimatePresence, useScroll, useTransform} from 'framer-motion'
import { FaThumbsUp } from "react-icons/fa6";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import HoverLink from "./HoverLink";
import CategoryCard from "./CategoryCard";
import TestHover from "./TestHover";

function ThoughtCard({thought}) {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "1.33 1"],
    });
    const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
    const  opacityProgress = useTransform(scrollYProgress, [0, 1], [.4, 1]);

    const test = `https://robohash.org/${thought.user.email}.png`
    return(
        <>
        <motion.div 
        ref={ref}
        style={{  
            scale: scaleProgress,
            opacity: opacityProgress,
        }}
        initial={{  
            scale: scaleProgress,
            opacity: opacityProgress,
        }}
        animate={{ 
            rotate: "0deg",
        }}

        transition={{ 
            type:"spring",
            duration: .5,
        }}
        className={`p-5 my-6 h-[350px] w-[850px]
        bg-slate-50 rounded-lg m-auto text-center 
        flex align-center shadow-xl
        border-slate-400 border-[1px]`}>
            <div className="img-container h-auto w-auto grid place-items-center">
                <img src={test} alt="" className="bg-gradient-to-tr from-orange-50 to-indigo-100 rounded-full overflow-hidden mt-[1rem] mx-3 ring-stone-300 ring-offset-[1px] ring-4 h-[200px] w-[200px]"/>
                <HoverLink user={thought.user} className={``}/>
            </div>
            <div className="other-deets flex-auto mx-3 grid place-items-center">
            <div className="flex">
                <FaQuoteLeft size={25}/>
                <p className="mx-3 text-[32px]">{thought.title}</p>
                <FaQuoteRight size={25}/>
            </div>

            <div className="categories grid grid-cols-4">
                {thought.categories.map((category) => (
                        <CategoryCard category={category} key={category.id}/>
                ))}
            </div>
            
            <div className="icons flex gap-4">
            <div className="like grid grid-cols-2 place-items-center">
                    <FaThumbsUp size={35} color="#2c2c2c"/>
                    <p className="ml-3 text-[22px] "> {thought.likes.length}</p>
            </div>
            <div className="like grid grid-cols-2 place-items-cente">
                    <IoChatbox size={35} color="#2c2c2c" className=""/>
                    <p className="ml-3 top-1 text-[22px]"> {thought.comments.length}</p>
            </div>
            </div>
            
                <motion.a href={`/thoughts/${thought.id}`}
                whileHover={{
                    scale: 1.2,
                    borderBottom: "3px solid black",
                    transition: { duration: 1 },
                }}
                >SEE MORE...</motion.a>
            </div>
            
        </motion.div>
        </>
    )
}


export default ThoughtCard