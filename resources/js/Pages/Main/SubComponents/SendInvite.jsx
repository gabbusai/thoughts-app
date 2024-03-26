import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { router } from '@inertiajs/react';

function SendInvite({user}){
    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(`/invite/${user.id}`); // Replace with your actual route path
};

    return(
    <>
    <form onSubmit={handleSubmit}>
        <input
        type="hidden"
        name="selectedUser"
        value={user}
        />
    <button type="submit" className={`bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-xl
    h-12 w-32
    `}>Send Invite</button>
    </form>
    </>
    )
}


export default SendInvite;