"use client";
import { SignIn} from '@clerk/nextjs';
import { motion, useScroll, useTransform } from "framer-motion";
import starsBg from "../../../../public/images/assets/stars.png";
import { useRef } from "react";

const Page = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  return (
    <div className='bg-black text-white antialiased h-screen'>
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
        className="h-full flex items-center overflow-hidden relative [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
        style={{
          backgroundImage: `url(${starsBg.src})`,
          backgroundPositionY,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(75%_75%_at_center_center,rgb(140,69,255,.5)_15%,rgb(14,0,36,.5)_78%,transparent)]">
        </div>
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
          className="absolute h-64 w-64 md:h-96 md:w-96 bg-purple-500 rounded-full border border-white/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(50%_50%_at_16.8%_18.3%,white,rgb(184,148,255)_37.7%,rgb(24,0,66))] shadow-[-20px_-20px_50px_rgb(255,255,255,.5),-20px_-20px_80px_rgb(255,255,255,.1),0_0_50px_rgb(140,69,255)]">
        </motion.div>
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
          <div className="absolute h-2 w-2 left-0 bg-white rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2">
          </div>
          <div className="absolute h-2 w-2 left-1/2 bg-white rounded-full top-0 -translate-x-1/2 -translate-y-1/2">
          </div>
          <div className="absolute h-5 w-5 left-full border border-white rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center">
            <div className="h-2 w-2 bg-white rounded-full ">
            </div>
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
          className="absolute h-[444px] w-[444px] md:h-[780px] md:w-[780px] rounded-full border border-white/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed">
        </motion.div>
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
          className="absolute h-[544px] w-[544px] md:h-[980px] md:w-[980px] rounded-full border border-white opacity-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed">
          <div className="absolute h-2 w-2 left-0 bg-white rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2">
          </div>
          <div className="absolute h-2 w-2 left-full bg-white rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2">
          </div>
        </motion.div>
        <div className="container relative mt-16 flex flex-col lg:flex-row md:flex-row items-center justify-between  w-full px-4 lg:px-8">
          <div className="text-center  mb-8 lg:mb-0">
            <h1 className="text-4xl md:text-6xl lg:text-8xl xl:text-[168px] leading-tight md:leading-none font-semibold tracking-tighter bg-white bg-[radial-gradient(100%_100%_at_top_left,white,white,rgb(74,32,138,.5))] text-transparent bg-clip-text">
              Vacant Vectors
            </h1>
          </div>
          <div className="flex justify-center items-center w-full lg:w-auto opacity-80">
            <SignIn />
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Page;