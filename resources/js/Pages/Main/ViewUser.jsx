import react, {useState, useEffect} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Tcard from './SubComponents/Tcard';
import UserCard from './SubComponents/UserCard';
function ViewUser(){
    const {currentUser} = usePage().props;
    const {user} = usePage().props;
    const {thoughts} = usePage().props;
    useEffect(() => {
        
    })

    const ThoughtsList = thoughts.map((thought, i) => (
        <motion.div key={thought.id} className=""
        initial={{ 
            opacity: 0, 
            x : -200,
            scale: 0.5
        }}
        animate={{ 
            opacity:1,
            x: 0,
            scale: 1,
        }}
        transition={{ 
            duration: .5,
            ease: 'easeInOut',
        }}
        >   
        <div >
        <Tcard thought={thought}/>
        </div>
            
        </motion.div>
    ));


    return(
        <MainLayout  currentUser={currentUser}>
        <div className="grid grid-cols-1 place-items-center">
        <UserCard user={user} currentUser={currentUser}/>
        {ThoughtsList}
        </div>
        </MainLayout>
    )
}

export default ViewUser;