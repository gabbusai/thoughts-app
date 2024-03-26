import { useContext, useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import Sidebar from "@/Pages/Main/Sidebar";
import InviteNotification from "@/Pages/Main/SubComponents/InviteNotification";
import { SelectedUserContext } from "@/Pages/Main/Index";
import {motion, AnimatePresence} from  'framer-motion';
import SearchBar from "@/Pages/Main/SubComponents/SearchBar";
function MainLayout({children, currentUser}){
    
    //const [selectedUser, setSelectedUser] = useContext(SelectedUserContext);
    return(
        <div className="bg-stone-800">
        <motion.section className='flex min-h-screen'
        initial={{
            scale: 0.1,
            opacity: 1,
            x: "-100%",
            rotate: "90",
            y:-180,
            //filter: "blur(4px)"
        }}
        animate={{ 
            scale:[0.1, 0.3, 1],
            opacity: [0.5, 1],
            x: 0,
            rotate:[90, 360, 0],
            y:0
            //filter: "blur(0px)"
        }}
        transition={{ 
            duration: .7,
            ease: "easeInOut",
            //ztype:"spring"
        }}
        >
        
        <Sidebar currentUser={currentUser}/>
        

        <motion.div className="flex-1 bg-gradient-to-r from-blue-50 to-slate-300 min-h-screen " layout>
        <InviteNotification currentUser={currentUser}/>
            {children}
        </motion.div>
        </motion.section>
        </div>
    )
}

export default MainLayout