import { Home } from "lucide-react";

export const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <Home size={128} />
      <h1 className="text-3xl">Home Page</h1>
    </div>
  );
};
