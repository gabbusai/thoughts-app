    import React, { useState, useEffect } from 'react';
    import Pusher from 'pusher-js'; // Assuming you're using react-pusher
    import { usePage } from '@inertiajs/react';
    import { motion, AnimatePresence } from 'framer-motion';
    // Likely your main component
    function TestNotification() {

        const [message, setMessage] = useState();
        const [user, setUser] = useState();// State to store received message
            useEffect(() => {
                Pusher.logToConsole = true;
                var pusher = new Pusher('bd9728afd977289d5352', {
                cluster: 'ap1'
                });
                var channel = pusher.subscribe('notification');
                channel.bind('MessageNotification', function(data) {
                setMessage(data.message);
                setUser(data.user); 
                const timeoutId = setTimeout(() =>{
                setMessage('');
                }, 3000);
                return () => clearTimeout(timeoutId);
                });
                
            }, []); // No dependency array needed for manual setup
        

    return (

        <div className="absolute">
        <AnimatePresence mode='popLayout'>
        {message && (
        <motion.div className="z-[50] h-24 w-32 bg-blue-500 grid place-items-center overflow-hidden"
        style={{  
            position:"relative",
            left: "70px",
            top: "230px",
        }}
        initial={{  
            scale:0.2,
            opacity: 0.1,
            x: -200,
        }}
        animate={{
            scale:1.1,
            opacity: 1,
            x: 0,
        }}
        exit={{  
            scale:0.2,
            opacity: 0.1,
            x: -200,
        }}
        transition={{
            duration: 2,
            type:"spring",
        }}
        >
                <h1>BRUH {message}</h1>
                <p>by: {user.name} </p>
        </motion.div>
        
        )}
        </AnimatePresence>
        </div>
);
    }

    export default TestNotification;
