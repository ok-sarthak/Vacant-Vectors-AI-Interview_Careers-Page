import React from "react";
import Button from "../../../components/ui/button1";
import { useRouter } from "next/navigation";

function InterviewItemCard({ interview }) {
  const router = useRouter();
  const onStart = () => {
    router.push("/dashboard/interview/" + interview?.mockId);
  };
  const onFeedBack = () => {
    router.push("/dashboard/interview/" + interview?.mockId + "/feedback");
  };
  return (
    <div className="border shadow-sm rounded-lg p-3 transition-transform transform hover:scale-105 duration-300 ease-in-out">
      <h2 className="font-bold text-pink-400">{interview?.jobPostition}</h2>
      <h2 className="text=sm text-white">
        {interview?.jobExperience} Months Experience
      </h2>
      <h2 className="text-xs text-gray-300">
        Given on : {interview?.createdAt}
      </h2>
      <div className="flex justify-between mt-2 gap-5">
        <Button size="sm" onClick={onFeedBack}>
          View Interview
        </Button>
        <Button size="sm" onClick={onStart}>
          Try Again
        </Button>
      </div>
    </div>
  );
}

export default InterviewItemCard;
