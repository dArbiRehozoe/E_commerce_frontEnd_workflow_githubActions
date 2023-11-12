import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { animated, useSpring } from "@react-spring/web";
import { InView } from "react-intersection-observer";

const MysteriousChar = ({ char, delay }) => {
  const animation = useSpring({ opacity: 1, from: { opacity: 0 }, delay });

  return (
    <animated.span style={animation}>
      {char}
    </animated.span>
  );
};

const MysteriousText = ({ children, ...props }) => {
  const [animateText, setAnimateText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateText(true);
    }, 3000); // Delay the animation by 2 seconds (2000 milliseconds)
    
    return () => {
      clearTimeout(timer); // Clear the timer on unmount to prevent memory leaks
    };
  }, []);

  return (
    <InView>
      {({ inView, ref }) => (
        <div ref={ref}>
          {inView && animateText ? (
            children.split("").map((char, index) => (
              <MysteriousChar key={index} char={char} delay={Math.random() * 350} {...props} />
            ))
          ) : null}
        </div>
      )}
    </InView>
  );
};

export default function Text(props) {
  return (
    <MysteriousText>
      {props.value}
    </MysteriousText>
  );
}
