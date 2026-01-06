import { useEffect } from "react";

const ScrollIntoView = ({ children }: any) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return children || null;
};

export default ScrollIntoView;
