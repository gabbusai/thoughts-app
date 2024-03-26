import { usePage, router, Head } from "@inertiajs/react";
import  {useState, useEffect} from "react";
import {motion} from "framer-motion"
import MainLayout from "@/Layouts/MainLayout";
import { IoIosAlert } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import HoverLink from "./SubComponents/HoverLink";
import ReceivedNotificationCard from "./SubComponents/ReceivedNotificationCard";
import SentInvitationCard from "./SubComponents/SentInvitationsCard";

function InvitationsReceived({currentUser, invites}){
    return(
        <div className={`min-h-full min-w-full grid-cols-1 grid place-items-center
        row-span-5 overflow-x-hidden`}>
            <h1 className={`text-[42px] font-light text-slate-700 font-sans`}>Received Invitations</h1>
        {invites.map((invites, index) => (
            <ReceivedNotificationCard key={index} notification={invites} />
        ))}
        </div>
    )
}

function InvitationsSent({currentUser, invites}){
    return(
        <div className={`min-h-full min-w-full grid-cols-1 grid place-items-center
        row-span-5 overflow-x-hidden`}>
            <h1 className={`text-[42px] font-light text-slate-700 font-sans`}>Sent Invitations</h1>
            
        {invites.map((invites, index) => (
            <SentInvitationCard key={index} notification={invites} />
        ))}


        </div>
    )
}

export default function ViewNotifications() {
    const {currentUser} = usePage().props;
    const {invites} = usePage().props;
    const {invitesSent} = usePage().props;
    const [notifications, setNotifications] = useState([]);
    const [sentNotifications, setSentNotifications] = useState([]);

    useEffect(() => {
        setSentNotifications(...invitesSent);
        setNotifications(invites);
        console.log(`invites: ${invites}`);
        console.log(`invitesSent: ${sentNotifications}`);

    }, [invites, invitesSent]);


    return(
        
        <MainLayout currentUser={currentUser}>
            <Head><title>Notifications</title></Head>
        <div className="min-h-screen max-w-screen flex overflow-x-hidden">
            <div className="flex-1">
                <InvitationsReceived currentUser={currentUser} invites={notifications}/> 
            </div>
            <div className="flex-1">
                <InvitationsSent currentUser={currentUser} invites={invitesSent}/>
            </div>
            
            
        </div>
        </MainLayout>
    )
}