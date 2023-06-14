import { useEffect } from "react";

const Timer = ({ message, setMessage }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [message, setMessage]);

  return null; // This component doesn't render anything
};

export default Timer;