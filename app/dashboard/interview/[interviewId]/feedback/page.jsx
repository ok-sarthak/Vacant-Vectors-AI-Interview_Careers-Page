"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { db } from "../../../../../utils/db";
import { AiInterview, UserAnswer } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../../../components/ui/collapsible.jsx";
import { ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import Loader from "../../../../../components/ui/loader";
import NotFound from "../../../../not-found.jsx";
import { useUser } from "@clerk/nextjs";
import { motion, useScroll, useTransform } from "framer-motion";
import starsBg from "../../../../../public/images/assets/stars.png";
import { useRef } from "react";
import Button from "../../../../../components/ui/button1.jsx";

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [loading, setLoading] = useState(true);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundPositionY = useTransform(
    scrollYProgress,
    [0, 1],
    [-300, 300]
  );

  const { user } = useUser();

  const router = useRouter();

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
      GetFeedback();
    }
  }, [currentUserEmail]);

  const getCurrentUserEmail = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    // console.log("Current User Email:", email); // Debugging log
    setCurrentUserEmail(email);
  };

  const GetFeedback = async () => {
    try{const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);
    const result1 = await db
      .select()
      .from(AiInterview)
      .where(eq(AiInterview.mockId, params.interviewId));
      if (result1.length === 0) {
        alert("Interview data not found or invalid. Redirecting to the home page.");
        router.replace('/');
        return;
      }
    const createdBy1 = result1[0].createdBy;
    // console.log(result);
    setFeedbackList(result);
    if (createdBy1 === currentUserEmail) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }} catch (error) {
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
    <div className="bg-black text-white antialiased h-screen flex items-center justify-center">
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
          <div className="absolute h-2 w-2 left-0 bg-white rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute h-2 w-2 left-1/2 bg-white rounded-full top-0 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute h-5 w-5 left-full border border-white rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center">
            <div className="h-2 w-2 bg-white rounded-full "></div>
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
          <div className="absolute h-2 w-2 left-0 bg-white rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute h-2 w-2 left-full bg-white rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        </motion.div>
        <div className="container relative">
          {feedbackList?.length == 0 ? (
            <div className="container relative flex flex-col  items-center text-center top-0">
              <h1 className="text-8xl md:text-[168px] md:leading-none font-semibold tracking-tighter bg-white bg-[radial-gradient(100%_100%_at_top_left,white,white,rgb(74,32,138,.5))] text-transparent bg-clip-text">
                Oops :- (
              </h1>
              <p className="text-4xl md:text-3xl font-bold sm:text-lg text-white/100 mt-5 max-w-2xl">
                You have not given the Interview Completely, Start Again to
                begin
              </p>
              <div className="mt-5 gap-10 flex lg:flex-row flex-col">
                <Button
                  onClick={() =>
                    router.replace("/dashboard/interview/" + params.interviewId)
                  }
                  className="my-10"
                >
                  Start Again
                </Button>
                <Button
                  onClick={() => router.replace("/dashboard")}
                  className="my-10"
                >
                  Dashboard
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col mx-auto">
                <div className="container flex flex-col gap-5 justify-between items-center text-center mx-auto">
                  <h2 className="text-5xl md:text-3xl font-bold sm:text-lg text-white/100 mt-5 max-w-2xl">
                    <strong>Congratulations !!</strong>
                  </h2>
                  <p className="text-4xl md:text-3xl font-bold sm:text-md text-white/100 mt-5 max-w-2xl">
                    We will review your answers and get back to you soon.
                  </p>
                </div>
                <div className="p-5 md-10 overflow-y-auto max-h-[calc(100vh-200px)]">
                  <h2 className="text-2xl justify-start md:text-xl font-bold sm:text-lg text-gray-100 mt-5 max-w-2xl">
                    {" "}
                    Find below Interview Question, with correct Answers, Your
                    Answer(s) and feedback for improvement.
                  </h2>
                  {feedbackList &&
                    feedbackList.map((item, index) => (
                      <Collapsible key={index} className="mt-7">
                        <CollapsibleTrigger
                          className="p-2 flex justify-between w-full gap-10 bg-transparent rounded-lg my-2 text-left"
                          style={{ backdropFilter: "blur(20px)" }}
                          s
                        >
                          {item.question}
                          <ChevronsUpDown className="h-5 w-5 float-right" />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="flex flex-col gap-5 ">
                            <h2
                              className="p-2 border rounded-lg bg-transparent text-sm"
                              style={{ backdropFilter: "blur(10px)" }}
                            >
                              <strong className="text-purple-500 ">
                                Rating :{" "}
                              </strong>
                              {item.rating}
                            </h2>
                            <h2
                              className="p-2 border rounded-lg bg-transparent text-sm"
                              style={{ backdropFilter: "blur(10px)" }}
                            >
                              <strong className="text-red-500">
                                Your Answer :{" "}
                              </strong>
                              {item.userAns}
                            </h2>
                            <h2
                              className="p-2 border rounded-lg bg-transparent text-sm"
                              style={{ backdropFilter: "blur(10px)" }}
                            >
                              <strong className="text-green-500">
                                Correct Answer :{" "}
                              </strong>
                              {item.correctAns}
                            </h2>
                            <h2
                              className="p-2 border rounded-lg bg-transparent text-sm"
                              style={{ backdropFilter: "blur(10px)" }}
                            >
                              <strong className="text-orange-500">
                                Feedback :{" "}
                              </strong>
                              {item.feedback}
                            </h2>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                </div>
              </div>
              <div className="flex flex-row gap-10 items-center justify-center">
                <Button onClick={() => router.replace("/")} className="my-10">
                  Home
                </Button>
                <Button
                  onClick={() => router.replace("/dashboard")}
                  className="my-10"
                >
                  Dashboard
                </Button>
              </div>
            </>
          )}
        </div>
      </motion.section>
    </div>
  );
}

export default Feedback;
