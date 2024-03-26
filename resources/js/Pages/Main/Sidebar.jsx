import react from 'react';
import { useState } from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import { FaLightbulb, FaUser, FaPenNib  } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { TiHome } from "react-icons/ti";
import { IoIosNotifications } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { usePage, router, Link } from '@inertiajs/react';
import TestNotification from './SubComponents/TestNotification';
import InviteNotification from './SubComponents/InviteNotification';
function Sidebar({currentUser}){
    const [open, setOpen] = useState(false);
    const clickhandler = () => { 
        setOpen(!open);
    }
    const menus =[
        {name: 'Home', link:'/thoughts/home', icon:<TiHome size={20}/> },
        {name: 'Post', link:'/thoughts/create', icon:<FaPenNib size={20}/> },
        {name: 'Profile', link:`/thoughts/users/${currentUser.id}}`, icon:<FaUser size={20}/> },
        {name: 'Notifications', link:"/thoughts/notifications", icon:<IoIosNotifications size={20}/> },
        {name: 'Settings', link:'/profile', icon:<IoIosSettings  size={20}/> },
    ]

    const NavLink =({menu, open})=>{

        const [hovered, setHovered] = useState(false);

        return(
            <>
            <motion.div 
            onMouseEnter={()=>setHovered(true)}
            onMouseLeave={()=>setHovered(false)}
            className="link flex items-center text-lg font-medium gap-3.5 p-2 hover:bg-gray-800 hover:w-10 rounded-md"

            whileHover={{  
                scale:1.1,
                width: open ? "250px" : "40px",
            }}
            transition={{ 
                duration: .1,
                type:"spring"
            }}
            >
            <div onClick={()=> {router.visit(menu.link)}} //href={route('logout')}
            >{menu.icon}

            <AnimatePresence>
            {hovered && !open && (
                <motion.div className="relative"
                initial={{  
                    scale:0.2
                }}
                animate={{  
                    scale:[0.5, 1.1, 1]
                }}
                exit={{  
                    scale:0
                }}
                transition={{  
                    type:"spring",
                    duration: 0.2,
                }}
                >
                <h1 className=' bg-gray-800 w-[120px] h-[80px] rounded-lg grid place-items-center'
                style={{  
                    position:"absolute",
                    left:"50px",
                    top:"-40px",
                    textAlign:"center"
                }}>{menu.name}</h1>
                </motion.div>
                
            )}
        </AnimatePresence>

            </div>
            <a href={menu.link} className={`whitespace-pre duration:300
            ${!open && 'opacity-0 translate-x-28 overflow-hidden duration:300'}
            `}>{menu.name}</a>
            </motion.div>
            </>
        )
    }

    const status = {
        'active': {
            width: "288px",
        },
        'inactive': {
            width: "64px",
        }
    }

    return(
            <motion.div className={`max-h-screen
            bg-[#0e0e0e] text-gray-100 px-4`}
            style={{  
                position:"sticky",
                top:"0"
            }}
            initial={{ 
                width: "64px"
            }}
            animate={open ? 'active' : 'inactive'}
            variants={status}
            transition={{ type: "spring", duration: .5 }}
            >
                <div className="py-3 flex justify-end">
                    <HiMenuAlt3 size={26} className="cursor-pointer" onClick={clickhandler}/>
                </div>
                <AnimatePresence mode='popLayout'>
                    {open &&
                        <motion.div className="logo grid place-items-center py-8"
                        initial={{ 
                            scale: 0,
                            opacity: 0,
                        }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            rotate: [0, 360]
                        }}
                        exit={{ 
                            rotate: [90, 0],
                            scale: 0,
                            opacity: 0,
                            x: 50,
                            y:-100
                        }}
                        transition={{  
                            duration: .3,
                            type: "spring"
                        }}>

                        <FaLightbulb size={106} className='rotate-45'/>
                        </motion.div>
                        }
                        </AnimatePresence>
                
                
                <div className="mt-4 flex flex-col gap-4 relative" >
                {menus && menus.map((menu, i) => (
                        <NavLink key={i} menu={menu} open={open} />
                ))} 
                </div>

            </motion.div>
    )
}

export default Sidebar;