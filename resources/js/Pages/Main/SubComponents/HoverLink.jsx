import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "./HoverFake"
import { FaRegLightbulb } from "react-icons/fa";
import SendInvite from "./SendInvite";
import { useState, useContext, useEffect } from "react";
import { SelectedUserContext } from "../Index";
import { FaBell } from "react-icons/fa";
import { MdNotificationAdd } from "react-icons/md";
import {motion} from 'framer-motion'
import {router} from "@inertiajs/react";
export default function HoverLink({user}) {
        //const [selectedUser, setSelectedUser] = useContext(SelectedUserContext);
        const handleHoverEnter = () => {
            //setSelectedUser(user.id);
        };
    
        const handleHoverLeave = () => {
            //setSelectedUser();
        }; 
    return(
    <div className="" onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}>
    <HoverCard className=" text-white top-0">
    <HoverCardTrigger className="text-[12px] font-bold  text-slate-900 hover:underline underline-offset-4">
        <div className={`text-[33px] font-bold bg-gradient-to-tr from-gray-900 to-slate-500 bg-clip-text text-transparent`} onClick={() => router.get(`/thoughts/users/${user.id}`)}
        >
            @ {user.name} 
        </div>
    
    </HoverCardTrigger>
        {<HoverCardContent className=" bg-slate-800 font-bold text-[15px] text-white h-[75px]">
        {user.email}
        {/*<SendInvite user={user}/>
        */}
        <div className="flex justify-center gap-x-3">
        <div className="flex gap-x-1"><FaRegLightbulb size={20}/>{user.thoughts.length}</div>
        <div className="flex gap-x-1"><FaBell size={20}/>{user.invitations_received_count}</div>
        <div className="flex gap-x-1"><MdNotificationAdd size={23}/>{user.invitations_sent_count}</div>
        </div>

    
        
        </HoverCardContent>
    }
    </HoverCard>
    </div>
    )
}
