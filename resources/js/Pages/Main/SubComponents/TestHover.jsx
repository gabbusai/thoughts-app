import react from "react";
import { FaRegLightbulb } from "react-icons/fa";
import SendInvite from "./SendInvite";
import { useState, useContext, useEffect } from "react";
import { SelectedUserContext } from "../Index";
import {motion} from 'framer-motion'
import {router} from "@inertiajs/react";

export default function TestHover({user}) {
    const [selectedUser, setSelectedUser] = useContext(SelectedUserContext);
    const [hovered, setHovered] = useState(false);
    const handleHoverEnter = () => {
        setSelectedUser(user.id);
        setHovered(true);
    };

    const handleHoverLeave = () => {
        //setSelectedUser();
        setHovered(false);
    };

    return(
        <div className="relative" onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}>
            <h1>{user.name}</h1>
            {hovered && 
            <div className=" absolute h-64 w-64 bg-slate-500"></div>
            }
        </div>
        )

}