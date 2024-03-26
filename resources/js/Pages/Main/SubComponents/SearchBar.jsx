import react, { useState, useContext, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import { FaSearch } from "react-icons/fa";
import {motion, useMotionValue, useMotionValueEvent, useScroll} from 'framer-motion'
import SearchContext from '@/Pages/Main/Index';
function SearchBar(){

    const [searched, setSearched] = useState(useContext(SearchContext));
    const [values, setValues] = useState({
        search: ''
    })

    const [hidden, setHidden] = useState(false);
    const {scrollY} = useScroll();


    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if(latest > previous && latest > 150) {
            setHidden(true);
        }else{
            setHidden(false);
        }
    })
    const searchHandler = (e) =>{
        e.preventDefault();
        setSearched(true);
        router.post(`/thoughts/search/%${values.search}%`, values)
    }
    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }
    return(
        <motion.div className="drop-shadow-lg placeholder:searchbar sticky top-2 z-[999] overflow-x-hidden h-[62px] w-full grid justify-items-center"
        variants={{ 
            visible: { y: 0 },
            hidden: { y: "-150%"},
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{  
            duration: 0.3,
            ease: 'easeInOut',

        }}
        >
            <input type="text" id="search" value={values.search} placeholder="Search thoughts..." onChange={handleChange}
            className={`p-3 border-2 border-slate-500 rounded-[30px] w-[400px] bg-neutral-900 text-[22px]
            text-slate-100`}/>
            <div className="absolute top-3 translate-x-[160px]">
                    <motion.button onClick={searchHandler}
                    whileHover={{
                        scale: 1.3,
                    }}
                    >
                    <FaSearch color='#F3B95F' size={35}/>
                    </motion.button>
            </div>
        </motion.div>)
}

export default SearchBar;