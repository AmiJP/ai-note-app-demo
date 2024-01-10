import { Bot } from "lucide-react";

export const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <Bot size={128} />
      <h1 className="text-xl">Oops!</h1>
      <p>404 - Page Not Found</p>
    </div>
  );
};
