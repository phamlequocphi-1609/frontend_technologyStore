import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Scrollup() {
  const [showScroll, setShowScroll] = useState(false);
  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 500) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 500) {
      setShowScroll(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [showScroll]);
  const handlescrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      {showScroll && (
        <button
          id="scrollUp"
          to=""
          className="fixed z-[2147483647] block"
          onClick={handlescrollTop}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="16"
            viewBox="0 0 512 512"
            className="fill-[#fff]"
          >
            <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
          </svg>
        </button>
      )}
    </>
  );
}
export default Scrollup;
