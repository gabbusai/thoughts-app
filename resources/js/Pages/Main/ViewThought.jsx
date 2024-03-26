import React, { useEffect, useState } from 'react';
import { usePage, Head, router } from "@inertiajs/react";
import { motion } from 'framer-motion';
import Like from './Like';
import Sidebar from './Sidebar';
import Comment from './SubComponents/Comment';
import MainLayout from '@/Layouts/MainLayout';
import CategoryCard from "./SubComponents/CategoryCard";
import { BsChatSquareQuoteFill } from "react-icons/bs";
import { FaThumbsUp, FaRegCalendarDays } from "react-icons/fa6";
import moment from "moment"
function ViewThought() {
    const { thought } = usePage().props;
    const {currentUser} = usePage().props;
    const {hasLiked} = usePage().props;
    const comments = thought.comments;
    const [tComments, setTComments] = useState([]);
    useEffect(()=> {
      setTComments(comments);
    },[comments])
    const DisplayComments = ({ comments }) => {
      return (
        <div className="comments-container">
          {comments.map((comment) => (
            <div key={comment.id} className="my-6 flex flex-row rounded-[35px] bg-slate-50 h-[230px] w-[660px] p-2 border-b-8 border-b-slate-600">
              <div className="w-32 grid place-items-center">
                <img
                  className="rounded-full h-24 w-24 bg-slate-800 ring-4 ring-gray-700"
                  src={`https://robohash.org/${comment.user.email}.png`}
                  alt=""
                />
                <h1 className='text-center font-bold relative bottom-5 text-[17px] text-slate-800'
                onClick={() => {
                  router.get(`/thoughts/users/${comment.user.id}`);
                  }}
                  >
                @{comment.user.name}
                </h1>
              </div>

              <div className="flex-1 ">
                <p className="text-center my-3 font-light text-[21px]">"{comment.content}"</p>
                <p className="text-center text-gray-400">{ moment(comment.created_at).format('MM-DD-YYYY')}</p>
              </div>
            </div>
          ))}
        </div>
      );
    };
    

    return (
      
      <MainLayout currentUser={currentUser}>
          <Head title={thought.title} />
              <div className="w-full grid place-items-center">
              <div className="shadow-xl px-4 py-5 bg-white space-y-6 h-[50rem] w-[1250px] grid place-items-center mt-10 rounded-xl border-b-slate-600 border-b-8 border-l-8 border-l-slate-500">
                { thought ? (
                  <>
                  <div className="user-stuff text-center mt-4 grid place-items-center">
                  <BsChatSquareQuoteFill color={"rgb(17 24 39)"} size={45}/>
                  <h1 className="text-3xl text-[44px] font-medium text-gray-900 mb-[80px]">
                      {thought.title}
                    </h1>
                    <div className="text-xl text-gray-500 h-[200px] mb-4 w-[800px] text-center">
                      {thought.content}
                    </div>
                      <div className="text-xl text-gray-500 mb-10 flex flex-row gap-x-4">
                      <FaRegCalendarDays size={30}/>
                      {moment(thought.created_at).format('MM-DD-YYYY')}
                      </div>
                    <div className="w-64 flex flex-row gap-x-3">
                    <img src={`https://robohash.org/${thought.user.email}.png`} alt="" className="h-[70px] rounded-full bg-gradient-to-tr from-slate-600 to-indigo-500 ring-4"/>
                    
                    
                    <motion.p className="text-[22px] text-gray-900  font-light relative bottom-[-20px]"
                    onClick={() => {
                      router.get(`/thoughts/users/${thought.user.id}`);
                    }}
                    whileHover={{  
                        scale: 1.1,
                    }}
                    >By {thought.user.name}</motion.p>
                    
                    </div>

                  </div>


                  <div className="categories grid place-items-center">
                  <span className='scale-[1.3]'>
                      {thought.categories.map((category) => (
                        <CategoryCard category={category} key={category.id} />
                      ))}
                    </span>
                  </div>

                

                  <div className="flex flex-row gap-x-3">
                    <Like thought={thought} currentUser={currentUser} hasLiked={hasLiked}/>
                    <p className='text-3xl top'>{thought.likes.length}</p>
                    </div>


                  {currentUser.id === thought.user.id && (
                      <div className="flex gap-x-2">
                      <button onClick={() => {
                        router.get(`/thoughts/${thought.id}/edit`);
                      }}
                      className="rounded-md h-[44px] w-[82px] bg-orange-300"
                      >EDIT</button>
                      <button onClick={() => {
                        router.get(`/thoughts/${thought.id}/delete`);
                      }}
                      className="rounded-md h-[44px] w-[82px] bg-red-600 text-white"
                      >DELETE</button>
                      </div>
                      )}
                    
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
              </div>

              <div className="grid place-items-center mt-16">
                        <div className="text-3xl text-gray-500">ADD COMMENT</div>
                        <Comment user={currentUser} thought={thought}/>
                        <div className="my-5"></div>
                        <DisplayComments comments={tComments}/>
                        <div className="my-5 mb-16"></div>
              </div>
      </MainLayout>

        
      );
}

export default ViewThought;


/*
                  
                    


                      comments
                      

                      */
