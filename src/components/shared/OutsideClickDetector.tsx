import React, { useEffect, useRef } from "react";

interface OutsideClickDetectorProps {
  onOutsideClick: () => void;
  children: React.ReactNode;
}

const OutsideClickDetector: React.FC<OutsideClickDetectorProps> = ({
  children,
  onOutsideClick,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        console.log("event click detected");
        onOutsideClick();
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onOutsideClick]);

  return <div ref={wrapperRef}>{children}</div>;
};

export default OutsideClickDetector;
