import React, { useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Fab } from "@mui/material";

interface ScrollToBottomButtonProps {
  topRef: React.RefObject<HTMLDivElement>;
  bottomRef: React.RefObject<HTMLDivElement>;
}

const ScrollToBottomButton = ({
  topRef,
  bottomRef,
}: ScrollToBottomButtonProps) => {
  const [showButton, setShowButton] = useState(true);
  const [direction, setDirection] = useState<"up" | "down">("down");

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleScroll = () => {
    if (direction == "down") {
      console.log("direction is down");
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      setDirection("up");
    } else {
      console.log("direction is up");
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      setDirection("down");
    }
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
      onClick={handleScroll}
    >
      {direction == "down" ? (
        <KeyboardArrowDownIcon />
      ) : (
        <KeyboardArrowDownIcon style={{ transform: "rotate(180deg)" }} />
      )}
    </Fab>
  );
};

export default ScrollToBottomButton;
