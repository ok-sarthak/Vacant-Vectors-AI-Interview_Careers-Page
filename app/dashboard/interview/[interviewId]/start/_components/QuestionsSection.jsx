import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'
import { useState } from 'react'

function QuestionsSection ({mockInterviewQuestion,activeQuestionIndex})  {
    const textToSpeech=(text)=>{
        if('speechSynthesis' in window){
            const speech=new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        }
        else{
            alert('Your Browser does not support Text to Speech');
        }
    }
  return mockInterviewQuestion&&(
    <div className='p-5 border rounded-lg my-10'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {mockInterviewQuestion&&mockInterviewQuestion.map((question,index)=>(
                <h2 className={`p-2  text-white rounded-full text-xs md:text-sm text-center ${activeQuestionIndex === index ? 'bg-violet-400' : 'bg-pink-300' }`}>Question #{index+1}</h2>
            ))
            }
        </div>
        <h2 className='my-5 text-md md:text-lg'>
                {mockInterviewQuestion[activeQuestionIndex]?.question}
        </h2>
        <Volume2 className='w-10 h-10 cursor-pointer'onClick={()=>textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}/>
        
        <div className='border rounded-lg p-5 bg-secondary mt-20'>
            <h2 className='flex gap-2 items-center text-2xl text-primary'>
                <Lightbulb/> <strong>Note : </strong> 
            </h2>
            <h2 className='text-sm text-primary my-2 overflow-y-auto h-24'>
                <h2 className='font-bold text-sm'>Instructions : </h2>
                <p>1. Don't use any type of unfair means.</p>
                <p>2. Look straight into the camera. Don't look here and there.</p>
                <p>3. Make sure nobody is around you.</p>
                <p>4. Make sure you are in a quiet place with proper lighting.</p>
                <p>5. Don't switch tabs or windows during the interview.</p>
                <p>6. Use the Record Answer Button to record your answer & Stop Recording Button to stop recording.</p>
                <p>7. Don't click on the back button or refresh the page.</p>
                <p>8. Don't click on the Header Links or Footer Links Section.</p>
                <p>9. Only click on the Next Question or Previous Question Button.</p>
                <p>10. Don't click on the End Interview Button until you have answered all the questions.</p>
                <p>11. If our system detects any unfair means, your interview will be cancelled. </p>
            </h2>
        </div>
    </div>
  )
}

export default QuestionsSection
