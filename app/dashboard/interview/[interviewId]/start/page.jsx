"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../../../../../utils/db';
import { eq } from 'drizzle-orm';
import { AiInterview } from '../../../../../utils/schema';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import  Button  from '../../../../../components/ui/button1';
import Loader from '../../../../../components/ui/loader';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import NotFound from '../../../../not-found.jsx';

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const handlePageLoad = () => {
      setLoading(false);
    };

    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      window.addEventListener("load", handlePageLoad);
      return () => window.removeEventListener("load", handlePageLoad);
    }
  }, []);

  useEffect(() => {
    if (user) {
      getCurrentUserEmail();
    }
  }, [user]);

  useEffect(() => {
    if (currentUserEmail) {
      GetInterviewDetails();
    }
  }, [currentUserEmail]);

  const getCurrentUserEmail = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    // console.log("Current User Email:", email); // Debugging log
    setCurrentUserEmail(email);
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        router.replace('/');
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    };
  }, [router]);

  const GetInterviewDetails = async () => {
    try {
      const result = await db.select().from(AiInterview).where(eq(AiInterview.mockId, params.interviewId));
      if (result.length === 0 || !result[0].jsonMockResp) {
        alert("Interview data not found or invalid. Redirecting to the home page.");
        router.replace('/');
        return;
      }
      const jsonMockResp = JSON.parse(result[0].jsonMockResp);
      if (jsonMockResp.length === 0) {
        alert("No interview questions found. Redirecting to the home page.");
        router.replace('/');
        return;
      }
      const createdBy1 = result[0].createdBy;
      setMockInterviewQuestion(jsonMockResp);
      setInterviewData(result[0]);
      setAnswers(new Array(jsonMockResp.length).fill('')); // Initialize answers array
      if (createdBy1 === currentUserEmail) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
      alert("An error occurred while fetching interview details. Redirecting to the home page.");
      router.replace('/');
    }
  };

  if (isAuthorized === null) {
    return <div>{loading && <Loader />}</div>; // Loading state
  }

  if (!isAuthorized) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }

  const handleAnswerChange = (answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[activeQuestionIndex] = answer;
    setAnswers(updatedAnswers);
  };

  const startInterview = () => {
    document.documentElement.requestFullscreen().then(() => {
      setStarted(true);
    }).catch((err) => {
      console.error("Fullscreen request denied", err);
      router.replace('/');
    });
  };

  if (!started) {
    return (
      <div className="flex items-center justify-center h-screen p-4">
  <Button 
    onClick={startInterview} 
    className="w-full max-w-md text-center"
  >
    Click here to enter fullscreen mode and start the interview. Do not exit the fullscreen mode before ending the interview because the interview will be cancelled.
  </Button>
</div>
    );
  }

  return (
    <div>
      {loading && <Loader />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
          answer={answers[activeQuestionIndex]} // Pass the current answer
          onAnswerChange={handleAnswerChange} // Pass the handler to update the answer
        />
      </div>
      <div className="flex justify-between items-center flex-wrap gap-4 mt-4">
        {activeQuestionIndex > 0 && (
          <div className="flex-1 md:flex-none">
            <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>Previous Question</Button>
          </div>
        )}
        {activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
          <div className="flex-1 md:flex-none text-center">
            <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>Next Question</Button>
          </div>
        )}
        {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
          <div className="flex-1 md:flex-none text-right">
            <Button onClick={() => router.replace('/dashboard/interview/' + interviewData?.mockId + '/feedback')}>End Interview</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StartInterview;