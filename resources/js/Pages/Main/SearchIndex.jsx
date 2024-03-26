import react, { useContext, useState, useEffect , createContext} from 'react';
import { usePage, Head } from "@inertiajs/react";
import {motion} from 'framer-motion';
import ThoughtCard from './SubComponents/ThoughtCard';
import MainLayout from '@/Layouts/MainLayout';
import SearchBar from './SubComponents/SearchBar';
export const SelectedUserContext = createContext();
export const SearchContext = createContext();


const ThoughtsList = ({ thoughts }) => {
    //const z = 999 - i;
    useEffect(() =>{
    
    }, [thoughts])
    const ThoughtList = thoughts.map((thought, i) => {
        return(
            <motion.div
            key={thought.id}
            className="mt-[50px]"
            initial={{ opacity: 0, x: -200, scale: 0.5 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{  
                position: 'relative'
            }}
            >
            <ThoughtCard thought={thought}/>
            </motion.div>)
    })

    return (ThoughtList);
}

function SearchIndex() {
    const data = usePage().props
    //const currentUser = data.currentUser;
    const {currentUser} = usePage().props
    const {thoughts} = usePage().props
    const {searchString} = usePage().props
    const [selectedUser, setSelectedUser] = useState([]);
    //const [searched, setSearched] = useState(false);
    const {hello} = "hello"
    useEffect(() => {
        //console.log(currentUser)
        setSelectedUser(currentUser.id);
    }, [selectedUser, data]);



    return (
            <MainLayout currentUser={currentUser}>
            <Head title="Thoughts" />
                    <SearchBar/>
            <h1 className='text-center text-[32px] text-slate-600'>Showing Results for "{searchString}"</h1>
            <div className="">
                <ThoughtsList thoughts={thoughts}/>
            </div>
            <div className="h-[200px] mt-[600px]">
                <p className='text-center text-[32px] text-slate-600'>End Of Thoughts</p>
            </div>
            </MainLayout>
    )
}
export default SearchIndex
