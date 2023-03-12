import React from "react";
import ReactWordcloud from "react-wordcloud";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

import words from "variables/words"; // Load data from words.js

const options = {
  colors: ["#359de6", "#fc9f4c", "#89c789", "#d98080", "#b584e0", "#d1a097"],
  enableTooltip: true,
  deterministic: false,
  fontFamily: "impact",
  fontSizes: [5, 60],
  fontStyle: "normal",
  fontWeight: "normal",
  padding: 1,
  rotations: 3,
  rotationAngles: [0, 90],
  scale: "sqrt",
  spiral: "archimedean",
  transitionDuration: 1000
};


class WordCloud extends React.Component {
    render() {
        return (
            <div>
                <div style={{ height: 400, width: 600 }}>
                <ReactWordcloud options={options} words={words[0]} />
                </div>
            </div>
        );
    }
}

export default WordCloud;
