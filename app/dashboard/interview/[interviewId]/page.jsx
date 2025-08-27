"use client";
import React, { useState, useEffect, useRef } from "react";
import { AiInterview } from "../../../../utils/schema";
import { db } from "../../../../utils/db";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { FileQuestionIcon, Lightbulb, WebcamIcon } from "lucide-react";
import Button from "../../../../components/ui/button1";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import NotFound from "../../../not-found.jsx";
import Loader from "../../../../components/ui/loader.jsx";
import { motion, useScroll, useTransform } from "framer-motion";
import starsBg from "../../../../public/images/assets/stars.png";
import { useRouter } from "next/navigation";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState({});
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(null);

  const { user } = useUser();

  const [loading, setLoading] = useState(true);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const router=useRouter();

  const backgroundPositionY = useTransform(
    scrollYProgress,
    [0, 1],
    [-300, 300]
  );

  useEffect(() => {
    const checkWebcamStatus = () => {
      const webcamElement = document.querySelector('video');
      if (webcamElement && webcamElement.srcObject) {
        setWebcamEnabled(true);
      } else {
        setWebcamEnabled(false);
      }
    };

    checkWebcamStatus();
  }, []);

  const handleButtonClick = () => {
    if (webcamEnabled) {
      router.replace('/dashboard/interview/' + params.interviewId + '/start');
    } else {
      alert('Webcam is not running, Enable Webcam to start the Interview');
    }
  };


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
    // console.log("Current User Email:", email); //Debug in the console
    setCurrentUserEmail(email);
  };

  const GetInterviewDetails = async () => {
    try{const result = await db
      .select()
      .from(AiInterview)
      .where(eq(AiInterview.mockId, params.interviewId));
    // console.log("Created By:", result[0].createdBy); // Debugging log
    if (result.length === 0) {
      alert("Interview data not found or invalid. Redirecting to the home page.");
        router.replace('/');
        return;
    }
    const createdBy1 = result[0].createdBy;
    setInterviewData(result[0]);

    // Check if the current user is authorized
    if (createdBy1 === currentUserEmail) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }}catch (error) {
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

  return (
    <div className="flex items-center justify-center h-screen overflow-y-auto antialiased text-white bg-black">
      <motion.section
        ref={sectionRef}
        animate={{
          backgroundPositionX: starsBg.width,
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 60,
        }}
        className="h-full w-full flex items-center justify-center overflow-hidden relative [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
        style={{
          backgroundImage: `url(${starsBg.src})`,
          backgroundPositionY,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(75%_75%_at_center_center,rgb(140,69,255,.5)_15%,rgb(14,0,36,.5)_78%,transparent)]"></div>
        <motion.div
          style={{
            translateY: "-50%",
            translateX: "-50%",
          }}
          animate={{
            rotate: "1turn",
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute h-64 w-64 md:h-96 md:w-96 bg-purple-500 rounded-full border border-white/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(50%_50%_at_16.8%_18.3%,white,rgb(184,148,255)_37.7%,rgb(24,0,66))] shadow-[-20px_-20px_50px_rgb(255,255,255,.5),-20px_-20px_80px_rgb(255,255,255,.1),0_0_50px_rgb(140,69,255)]"
        ></motion.div>
        <motion.div
          style={{
            translateY: "-50%",
            translateX: "-50%",
          }}
          animate={{
            rotate: "1turn",
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute h-[344px] w-[344px] md:h-[580px] md:w-[580px] border border-white opacity-20 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="absolute left-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full top-1/2"></div>
          <div className="absolute top-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full left-1/2"></div>
          <div className="absolute inline-flex items-center justify-center w-5 h-5 -translate-x-1/2 -translate-y-1/2 border border-white rounded-full left-full top-1/2">
            <div className="w-2 h-2 bg-white rounded-full "></div>
          </div>
        </motion.div>
        <motion.div
          animate={{
            rotate: "-1turn",
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            translateY: "-50%",
            translateX: "-50%",
          }}
          className="absolute h-[444px] w-[444px] md:h-[780px] md:w-[780px] rounded-full border border-white/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed"
        ></motion.div>
        <motion.div
          animate={{
            rotate: "1turn",
          }}
          transition={{
            duration: 90,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            translateY: "-50%",
            translateX: "-50%",
          }}
          className="absolute h-[544px] w-[544px] md:h-[980px] md:w-[980px] rounded-full border border-white opacity-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed"
        >
          <div className="absolute left-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full top-1/2"></div>
          <div className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full left-full top-1/2"></div>
        </motion.div>
        {loading && <Loader />}
        <div className="container absolute top-0 flex flex-col h-full p-5 mx-auto overflow-y-auto">
  <div className="container flex flex-col items-center gap-5 mx-auto text-center">
    <h2 className="max-w-2xl mt-5 text-5xl font-bold md:text-3xl sm:text-lg text-white/100">
      <strong>Welcome to the Interview</strong>
    </h2>
    <p className="max-w-2xl mt-5 text-4xl font-bold md:text-3xl sm:text-md text-white/100">
      Please make sure you are ready before starting the interview.
    </p>
    <p className="max-w-2xl mt-5 text-4xl font-bold md:text-3xl sm:text-lg text-white/100">
      Wishing you best of luck!
    </p>
    <div className="grid justify-center gap-10 grid-row-1 md:grid-cols-2 lg:grid-row">
      <div className="flex flex-col items-center gap-7">
        <div className="flex flex-col items-center gap-10">
          {webcamEnabled ? (
            <Webcam
              className="my-10 border-2 border-white rounded-full"
              onUserMedia={() => setWebcamEnabled(true)}
              onUserMediaError={() => setWebcamEnabled(false)}
              mirrored={true}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <>
              <WebcamIcon className="w-full p-5 border-2 border-black rounded-lg h-72 my-7 bg-secondary" />
              <div className="justify-center">
                <Button onClick={() => setWebcamEnabled(true)}>
                  Enable Webcam
                </Button>
              </div>
            </>
          )}
        </div>
        <div className="flex justify-center lg:flex-row gap-7">
          <div>
          <Button onClick={handleButtonClick}>Start Interview</Button>
          </div>
          <div>
            <Link href={"/dashboard/"}>
              <Button>Back, will give later</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="my-10 text-left">
        <div className="flex flex-col gap-2 px-5 py-5 text-2xl border rounded">
          <h1 className="text-4xl text-pink-400">
            <strong>Interview Details : </strong>
          </h1>
          <h2>
            <strong className="text-purple-300">Job Role / Job Position : </strong>
            {interviewData.jobPostition}
          </h2>
          <h2>
            <strong className="text-purple-300">Job Description / Tech Stack : </strong>
            {interviewData.jobDescription}
          </h2>
          <h2>
            <strong className="text-purple-300">Months of Experience : </strong>
            {interviewData.jobExperience}
          </h2>
        </div>
        <div className="px-5 py-5 my-5 border rounded">
          <h2 className="text-2xl font-bold text-pink-400">Instructions : </h2>
          <p className="text-red-500">1. Make sure you are alone in a well lit room.</p>
          <p className="text-red-500">2. Make sure your face is clearly visible.</p>
          <p className="text-red-500">3. Make sure your voice is clear.</p>
          <p className="text-red-500">4. Make sure you are in a quiet place.</p>
          <p className="text-red-500">
            5. If we notice any type of unfair activities, then your interview will be cancelled.
          </p>
        </div>
        <div>
          <h2>
            <Lightbulb className="text-yellow-500" />
            <strong className="text-yellow-300">Tip : </strong>Make sure you are well prepared
            before starting the interview regarding your Job Role.
          </h2>
          <h2>
            <FileQuestionIcon className="text-green-300" />
            <strong className="text-green-500">Total Number of Questions : </strong>
            {process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT}
          </h2>
        </div>
      </div>
    </div>
  </div>
</div>
      </motion.section>
    </div>
  );
}

export default Interview;
