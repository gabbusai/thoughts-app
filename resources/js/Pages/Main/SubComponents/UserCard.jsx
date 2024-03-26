import react, {useState, useEffect} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SendInvite from './SendInvite';
import { FaUser, FaLightbulb, FaBell  } from "react-icons/fa";

function UserCard({user, currentUser}){

    const invitations = user.invitations_received;
    const [invites, setInvites] = useState(0);
    const [hasInvited, setHasInvited] = useState(false);
    const [totalLikes, setTotalLikes] = useState(0);
    useEffect(() => {
        const acceptedInvitesCount = invitations.filter(
            (invite) => invite.accepted === 'accepted'
        ).length;
        setInvites(acceptedInvitesCount);

        const checkIfInvited = invitations.some(
            (invite) => {
            if (invite.inviter_id === currentUser.id) {
                console.log("has invited before")
                setHasInvited(true);
                return true; // Exit the loop once a match is found
            }
            return false;
            }
        );

        console.log(user)
    }, [invitations])

    return(<>
    <motion.div className={`h-[600px] w-[1000px] shadow-xl
        my-5 mt-[100px] p-2
        bg-slate-50 rounded-[25px] m-auto text-center 
        align-center border-b-[12px]
        border-slate-400 border-[1px] flex flex-col`}
    initial={{  
        opacity: 0, y:"-100px", scale: .1, rotate: "90deg",
    }}
    animate={{ 
        opacity: 1, y: 0, scale: 1, rotate: "0deg",
    }}
    transition={{  
        type: "spring",
        duration: 0.6,
    }}
    >
    <motion.div className="img grid place-items-center w-full h-[300px]"
    initial={{  
        opacity: 0, y:"-100px", scale: .1, rotate: "90deg",
    }}
    animate={{  
        opacity: 1, y: 0, scale: 1, rotate: ["180deg", 0],
    }}
    transition={{  
        type: "spring",
        duration: 1,
    }}
    >
                <img src={`https://robohash.org/${user.email}.png`} height="250px" width="250px" className={`rounded-full bg-gradient-to-br from-indigo-50 to-purple-300
            ring-offset-4 ring-4 ring-violet-400`}
            ></img>
    </motion.div>

    <div className={`text-[44px] font-bold bg-gradient-to-tr from-gray-900 to-slate-500 bg-clip-text text-transparent`}> {user.name}</div>
    <div className={`text-[28px] font-light bg-gradient-to-tr from-gray-900 to-slate-500 bg-clip-text text-transparent opacity-[.5]`}>{user.email} </div>
    
    <div className="special-items grid grid-cols-2 place-items-center h-24 w-96  self-center justify-self-center gap-x-3">
        <div className={`flex flex-row gap-x-2`} >
            <FaBell className='translate-y-[0px]' size={50} color="#fb932c" />
            <motion.p className='text-3xl bg-gradient-to-tr from-orange-400 to-yellow-400 bg-clip-text text-transparent'
            initial={{  
                x: -50,
                scale:1,
                rotate:"45deg"
            }}
            animate={{  
                x: [20, 0],
                scale: [2.5, 1],
                rotate:0
            }}
            transition={{  
                duration:2,
                type:"spring"
            }}
            >{invites} </motion.p>
        </div>

        <div className={`flex flex-row gap-x-2`}>
            <FaLightbulb className='translate-y-[0px] ' size={50} color="#fb932c" />
            <motion.p  className='text-3xl bg-gradient-to-tr from-orange-400 to-yellow-400 bg-clip-text text-transparent'
            initial={{  
                x: -50,
                scale:1
            }}
            animate={{  
                x: [20, 0],
                scale: [2.5, 1]
            }}
            transition={{  
                duration:2,
                type:"spring"
            }}
            >{user.thoughts.length} </motion.p>
            </div>
    </div>

    
    { currentUser.id != user.id  && !hasInvited &&
    <div className={`scale-[1.3] `}>
    <SendInvite user={user}/></div>}
    </motion.div>

    </>)
}


export default UserCard