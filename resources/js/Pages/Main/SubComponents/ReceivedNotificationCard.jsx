import { usePage, router, Head } from "@inertiajs/react";
import  {useState, useEffect} from "react";
import {motion} from "framer-motion"
import MainLayout from "@/Layouts/MainLayout";
import { IoIosAlert } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";

function ReceivedNotificationCard({notification}){

    useEffect(() => {
        //console.log(notification.inviter)
        ///thougts/profile/${notification.inviter.id}
    }, [notification])
    const acceptHandler = () => {
        let id = notification.id;
        router.post(`/invite/accept/${id}`);
        }

    const rejectHandler = () => {
        let id = notification.id;
        router.post(`/invite/reject/${id}`);
    }

    return(
        <div className={`comment-item h-[14rem] w-[42rem] bg-slate-50 grid place-items-center
        rounded-[25px] shadow-md p-3 border-b-8
        `}>
        <div className="flex w-full gap-x-8">
            <div className={`rounded-[50px] overflow-hidden
            ${notification.accepted == 'accepted' ? 'bg-green-400' :' bg-orange-400'}
            `}>
            <img src={`https://robohash.org/${notification.inviter.email}.png`}
            height={"100px"} width={"150px"}
            ></img>
            </div>
            <div className="sender-details flex-1">
                <motion.div className="font-bold text-[42px] text-slate-900 flex flex-column gap-x-2 hover:border-b-2"
                whileHover={{  
                    scale: 1.1,
                    
                }}
                onClick={() => router.get(`/thoughts/users/${notification.inviter.id}`)}
                >
                    <FaUserFriends  className="translate-y-[10px]"/>
                    {notification.inviter.name}
                </motion.div>
                <p className={`text-[24px] flex flex-column gap-x-2 text
                ${notification.accepted == 'accepted' ? 'text-green-400' :'text-orange-600'}
                `}>
                    <IoIosAlert  className="translate-y-[10px]"/>{notification.accepted.toUpperCase()} 
                </p>
            </div>
        </div>

        {(notification.accepted === 'pending' &&
        <div className="flex gap-x-8 ">
            <motion.button onClick={acceptHandler}
            className="bg-green-600 rounded-full px-4 py-2 text-white"
            whileHover={{
                scale: 1.2,
                boxShadow: "green 0px 0px 10px 3px",
                fontWeight: "bold"
            }}
            >Accept</motion.button>

            <motion.button onClick={rejectHandler}
            className="bg-red-600 rounded-full px-4 py-2 text-white"
            whileHover={{
                scale: 1.2,
                boxShadow: "red 0px 0px 10px 3px",
                fontWeight: "bold"
            }}
            >Reject</motion.button>
        </div>
        )
        }
    </div>
    )
}

export default ReceivedNotificationCard;