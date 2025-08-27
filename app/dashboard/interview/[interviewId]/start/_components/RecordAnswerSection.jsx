"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Webcam from "react-webcam";
import { Button } from "../../../../../../components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { LoaderIcon, Mic } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { chatSession } from "../../../../../../utils/GeminiAImodel";
import { db } from "../../../../../../utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { UserAnswer } from "../../../../../../utils/schema";

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData, answer = "", onAnswerChange }) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.forEach((result) => {
      onAnswerChange(answer + (result?.transcript || ""));
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording && answer.length > 10) {
      UpdateUserAnswer();
    }
  }, [answer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    // console.log(answer);
    setLoading(true);
    const feedbackPrompt = "Question : " + mockInterviewQuestion[activeQuestionIndex]?.question + ", User Answer : " + answer + ", Depends on Question and User Answer for given Interview Question " + " please give us rating (out of 10 ) for answer answer and feedback as area of improvement if any " + "in just 3 to 5 lines to improve it in JSON format with rating field and feedback answer. It should be in the JSON format only.";

    const result = await chatSession.sendMessage(feedbackPrompt);

    const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
    // console.log(mockJsonResp);
    const JsonFeedbackResp = JSON.parse(mockJsonResp);

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData.mockId,
      question: mockInterviewQuestion[activeQuestionIndex]?.question,
      correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
      userAns: answer,
      feedback: JsonFeedbackResp?.feedback,
      rating: JsonFeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format('YYYY-MM-DD'),
    });

    if (resp) {
      toast.success("Your answer has been saved successfully");
      // setResults([]);
    } else {
      toast.error("Error, while saving your answer. Please try again");
    }
    onAnswerChange(''); // Clear the answer
    // setResults([]); 
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col mt-20 justify-center items-center bg-gray-800 rounded-lg p-10">
        <Image
          src={"/Webcam.png"}
          width={200}
          height={200}
          className="absolute"
        />
        <Webcam
          className="rounded-full"
          mirrored={true}
          style={{
            height: "100%",
            width: "100%",
            zIndex: 10,
            objectFit: "cover",
          }}
        />
      </div>

      {error ? (
        <div className="my-10">
          <p>{error}</p>
        </div>
      ) : (
        <>
          <Button
            disable={loading}
            variant="outline"
            className="my-10"
            onClick={StartStopRecording}
          >
            {isRecording ? (
              <div className="flex flex-row justify-between items-center gap-2 text-red-500">
                <Mic />
                <LoaderIcon className="animate-spin" />
                <h2>Stop Recording</h2>
              </div>
            ) : (
              <div className="flex flex-row justify-between items-center gap-2 text-blue-500">
                <Mic />
                <h2>Record Answer</h2>
              </div>
            )}
          </Button>
        </>
      )}
      <ToastContainer />
    </div>
  );
}

export default RecordAnswerSection;