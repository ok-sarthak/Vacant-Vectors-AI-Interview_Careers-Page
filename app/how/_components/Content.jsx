"use client";
import starsBg from '../../../public/images/assets/stars.png';
import gridLines from '../../../public/images/assets/grid-lines.png';
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const useRelativeMousePosition = (to) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const updateMousePosition = (event) => {
    if (!to.current) return;
    const { top, left } = to.current.getBoundingClientRect();
    mouseX.set(event.x - left);
    mouseY.set(event.y - top);
  };
  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  return [mouseX, mouseY];
};

function CallToAction ()  {
  const sectionRef = useRef(null);
  const borderDivRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  const [mouseX, mouseY] = useRelativeMousePosition(borderDivRef);

  const imageMask = useMotionTemplate`radial-gradient(50% 50% at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <section className="flex items-center justify-center min-h-screen py-20 md:py-24" ref={sectionRef}>
      <div className="container">
        <motion.div
          ref={borderDivRef}
          className="border border-white/15 py-24 rounded-xl overflow-hidden relative group"
          animate={{
            backgroundPositionX: starsBg.width,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundPositionY,
            backgroundImage: `url(${starsBg.src})`,
          }}
        >
          <div
            className="absolute inset-0 bg-[rgb(74_32_138)] bg-blend-overlay [mask-image:radial-gradient(50%_50%_at_50%_35%,black,transparent)] group-hover:opacity-0 transition duration-700"
            style={{ backgroundImage: `url(${gridLines.src})` }}
          ></div>
          <motion.div
            className="absolute inset-0 bg-[rgb(74_32_138)] bg-blend-overlay opacity-0 group-hover:opacity-100 transition duration-700"
            style={{
              maskImage: imageMask,
              backgroundImage: `url(${gridLines.src})`,
            }}
          ></motion.div>
          <div className="relative">
            <motion.h2
              className="text-5xl md:text-6xl max-w-full mx-auto tracking-tighter text-center font-medium"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              We believe in Thala (7)
            </motion.h2>
            <div className="max-h-96 overflow-y-auto px-10 mt-5">
              <ul className="list-disc text-left flex flex-col gap-5 text-lg md:text-xl max-w-full mx-auto text-white/70 tracking-tight">
                <li>Step 1: Sign up for an account, please <a href="mailto:vacantvectors@gmail.com" className="text-white underline">contact</a> us  with your Resume /CV.</li>
                <li>Step 2: You will be notified via email if you are selected for an interview, with the further process.</li>
                <li>Step 3: You will be given a date and time for the interview.</li>
                <li>Step 4: You will be given a task to complete within a given time.</li>
                <li>Step 5: If you pass the task / interview, you will be notified via email.</li>
                <li>Step 6: Finally, you can join our team through a verification process and start working with us.</li>
                <li>Step 7: If you are not selected, don't worry, you can try again after 2 months by following the same process.</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;