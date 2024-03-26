import React, { useState, useEffect, useContext } from 'react';
import Pusher from 'pusher-js'; // Assuming you're using react-pusher
import { usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
//import { SelectedUserContext } from '../Index';
import Echo from 'laravel-echo';
import { FaBell } from "react-icons/fa";
// Likely your main component
function InviteNotification({currentUser}) {
    const [sender, setSender] = useState('');
    const [message, setmessage] = useState('');
    //const [selectedUser, setSelectedUser] = useContext(SelectedUserContext);
    //const selectedUser = usePage().props
    //const receiverId = selectedUser;
        useEffect(() => {
        const pusher = new Pusher('bd9728afd977289d5352', {
            cluster: 'ap1',
        });
        
        //subscribe to own channel so you can see your notifications
        const self = pusher.subscribe(`user.${currentUser.id}`);
        self.bind('InviteEvent', (data) => {
            setSender(data.sender.name);
            setmessage(data.message);
        const timeoutId = setTimeout(() => {
            setSender(null); // Clear sender information after a timeout
        }, 3000);
        });
        
    }, []);
    
return (
    <AnimatePresence mode='popLayout' layout>
    {sender  &&  (
    <motion.div className={`sticky top-5 h-[60px] p-2  w-[300px] bg-gradient-to-tr from-indigo-100 to-slate-50 shadow-xl grid place-items-center overflow-hidden rounded-xxl
    grid-cols-6 rounded-[32px]`}
    style={{  
        zIndex:"9999",
        translateX: 1200,
        translateY: 0
    }}
    initial={{  
        scale:0.2,
        opacity: 0.1,
        y: -200,
    }}
    animate={{
        scale:1.1,
        opacity: 1,
        y: 0,
    }}
    exit={{  
        scale:0.2,
        opacity: 0.1,
        y: -200,
    }}
    transition={{
        duration: 2,
        type:"spring",
    }}
    >
            {/*<h1>{message}</h1>
            <p>by: {sender} </p> */}
            <div className="w-[100%] col-span-1 grid place-items-end">
                <FaBell size={45} />
            </div>

            <div className="w-[100%]right col-span-5 grid place-items-center">
                <h1 className='font-light text-[16px]'>{message}</h1>
            </div>
    </motion.div>
    
    )}
    </AnimatePresence>
);
}

export default InviteNotification;
