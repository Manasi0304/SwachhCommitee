import { useEffect, useState } from "react";

const useHeaderColor = () => {
  const [headerColor, setHeaderColor] = useState("transparent");
  const [contentColor, setContentColor] = useState("white"); // Initial content color

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 8) {
        setHeaderColor("white"); // Background color on scroll
        setContentColor("black");  // Change content color to black on scroll
      } else {
        setHeaderColor("transparent"); // Reset background color
        setContentColor("white");      // Reset content color
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { headerColor, contentColor }; // Return both colors
};

export default useHeaderColor;
