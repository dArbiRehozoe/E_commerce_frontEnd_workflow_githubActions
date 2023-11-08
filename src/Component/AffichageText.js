import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const phrase = "Shoppez chez d'Ashop, l'excellence du e-commerce";
const words = phrase.split(" ");

const WordAnimation = () => {
  const animatedWords = words.map((word, index) => (
    <Word key={index} text={word} />
  ));

  return (
    <div>
      {animatedWords.reduce((acc, word, index) => {
        // Ajoutez un espace après chaque mot, sauf pour le dernier
        if (index < animatedWords.length - 1) {
          acc.push(word);
          acc.push(" ");
        } else {
          acc.push(word);
        }
        return acc;
      }, [])}
    </div>
  );
};

const Word = ({ text }) => {
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 500 * words.indexOf(text),
  });

  return <animated.span style={props}>{text}</animated.span>;
};

export default WordAnimation;
