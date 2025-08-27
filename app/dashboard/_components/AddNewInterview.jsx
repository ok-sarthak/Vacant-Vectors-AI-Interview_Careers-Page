"use client";
import React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog.jsx";
import Button from "../../../components/ui/button1.jsx";
import { Input } from "../../../components/ui/input.jsx";
import { Textarea } from "../../../components/ui/textarea.jsx";
import { chatSession } from "../../../utils/GeminiAImodel";
import { LoaderCircle } from "lucide-react";
import { db } from "../../../utils/db";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { AiInterview } from "../../../utils/schema";
import { useRouter } from "next/navigation.js";

function AddNewInterview() {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [jobPosition, setJobPosition] = useState();
    const [jobDescription, setJobDescription] = useState();
    const [jobExperience, setJobExperience] = useState();
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const router=useRouter();
    const {user}=useUser();
    const onSubmit =async(e) => {
        setLoading(true);
        e.preventDefault();
        // console.log(jobPosition, jobDescription, jobExperience);

        const InputPrompt="Job Position : "+jobPosition+", Job Description : "+jobDescription+", Years of Experience (In Months) : "+jobExperience+", Depends on this Job Position, Job Description & Years of Experience (In Months) give us "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" Interview questions along with Answer in JSON Format, Give us question and answer as field in JSON. Give me it in JSON only no other format is accepted. For Example : ```json  ```";

        const result = await chatSession.sendMessage(InputPrompt);
        const MockJsonResp=result.response.text().replace('```json','').replace('```','');
        // console.log(JSON.parse(MockJsonResp));
        setJsonResponse(MockJsonResp);

        if(MockJsonResp)
        {const resp=await db.insert(AiInterview).values({
            mockId:uuidv4(),
            jsonMockResp:MockJsonResp,
            jobPostition:jobPosition,
            jobDescription:jobDescription,
            jobExperience:jobExperience,
            createdBy : user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('YYYY-MM-DD')
        }).returning({mockId:AiInterview.mockId});

        // console.log("Inserted ID : ",resp);
            if(resp)
            {
                setOpenDialog(false);
                router.push(`/dashboard/interview/`+resp[0]?.mockId);
            }
        }
        else
        {
            // console.log("Error in generating Mock Interview Questions");
        }
        
        setLoading(false);
    }
  return (
    <div>
      <div
        className="p-2 border rounded-lg font-bold bg-transparent hover:scale-105 hover:shadow-md cursor-pointer transition hover:bg-purple-100 hover:font-bold hover:text-pink-400"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">Give Interview</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl text-purple-500">
              Tell us more about your Job Interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}> 
                <div>
                  <h2  className="text-white">
                    Add Details about your Job position, Job Description and
                    years of experience
                  </h2>
                  <div className="mt-7 my-5">
                    <label className="font-bold text-violet-400">Job Role / Job Position</label>
                    <Input placeholder="Example : Full Stack Developer" required
                    onChange={(event)=>setJobPosition(event.target.value)}/>
                  </div>
                  <div className="my-5">
                    <label className="font-bold text-violet-400">Job Description / Tech Stack</label>
                    <Textarea placeholder="Example : Discuss about your experience, projects, etc., React, NodeJs, MongoDB." required 
                    onChange={(event)=>setJobDescription(event.target.value)}/>
                  </div>
                  <div className="my-5">
                    <label className="font-bold text-violet-400">Years of Experience (In Months)</label>
                    <Input placeholder="Example : 12" type="number" max="150" required 
                    onChange={(event)=>setJobExperience(event.target.value)}/>
                  </div>
                  <div className="flex mt-10 gap-5 justify-end">
                    <Button
                      variant="ghost"
                      onClick={() => setOpenDialog(false)}
                      type="button" 
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disable={loading}>
                        {loading ? <><LoaderCircle className="animate-spin"/> <span>Generating, please wait</span></> : "Start Interview"}</Button>
                  </div>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
