import { useEffect, useState } from "react";
import { Progress } from "./ui/progress";

export const Loader = () => {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timer = setTimeout(
      () =>
        setProgress(
          (prevProgress) => prevProgress + Math.floor(Math.random() * 10)
        ),
      500
    );
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-md">
      <div className="flex flex-col w-1/3 items-center gap-3">
        <h1 className="text-3xl">Loading...</h1>
        <Progress value={progress} className="w-[60%]" />
      </div>
    </div>
  );
};
