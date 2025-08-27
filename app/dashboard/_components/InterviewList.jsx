"use client";  
import { useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'
import { db } from '../../../utils/db';
import { AiInterview } from '../../../utils/schema';
import { desc, eq } from 'drizzle-orm';
import { useState } from "react";
import InterviewItemCard from "./InterviewItemCard";


function InterviewList ()
 {
    const {user}=useUser();
    const [interviewList,setInterviewList]=useState([]);

    useEffect(() => {
        user&&GetInterviewList();
    }, [user])

    const GetInterviewList=async()=>{
        const result=await db.select().from(AiInterview).where(eq(AiInterview.createdBy,user?.primaryEmailAddress?.emailAddress)).orderBy(desc(AiInterview.id));
        // console.log(result);
        setInterviewList(result);
    }
  return (
    <div className='mb-20'>
      <p className="text-4xl md:text-3xl font-bold sm:text-lg text-white/100 mt-5 max-w-2xl text-left">Previous Interview(s) : </p>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  mt-10 gap-5 my-5 max-h-96 overflow-y-auto'>
        {interviewList && interviewList.map((interview, index) => (
          <InterviewItemCard 
            interview={interview}
            key={index}
          />
        ))}
      </div>
    </div>
  )
}

export default InterviewList
