import React, { useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Fab } from "@mui/material";

interface ScrollToBottomButtonProps {
  targetRef: React.RefObject<HTMLDivElement>;
}

const ScrollToBottomButton = ({ targetRef }: ScrollToBottomButtonProps) => {
  const [showButton, setShowButton] = useState(true);

  const buttonRef = useRef<HTMLButtonElement>(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     console.log("scroll");
  //     // const isScrolledToBottom =
  //     //   window.innerHeight + window.scrollY >= document.body.offsetHeight;
  //     //
  //     // setShowButton(!isScrolledToBottom);
  //   };
  //   console.log("mounted");
  //   window.addEventListener("scroll", handleScroll);
  //
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const handleScrollToBottom = () => {
    console.log("ho");
    targetRef.current?.scrollIntoView({ behavior: "instant" });
    setShowButton(false);
  };

  return (
    <Fab
      ref={buttonRef}
      // color="primary"
      size={"medium"}
      style={{
        position: "fixed",
        bottom: "3rem",
        right: "3rem",
        display: showButton ? "flex" : "none",
        alignItems: "center",
        backgroundColor: "rgba(84, 110, 122, 1)",
        color: "white",
        // visibility: 0.5,
      }}
      aria-label="scroll"
      onClick={handleScrollToBottom}
    >
      <KeyboardArrowDownIcon />
    </Fab>
  );
};

export default ScrollToBottomButton;
