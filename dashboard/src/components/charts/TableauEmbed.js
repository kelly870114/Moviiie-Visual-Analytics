import React, {useRef, useEffect} from "react";

const {tableau} = window

function TableauEmbed() {
    const ref = useRef(null);
    const url = "https://public.tableau.com/views/MoviesOverview_16784935676620/MoviesOverview";
    
    function initViz() {
        new tableau.Viz(ref.current, url);
    }

    useEffect(() => {
        initViz();
    }, [])

    return (
        <div>
            <p> This is my Tableau BubbleChart </p>
            <div ref={ref}></div>
        </div>
    )
}

export default TableauEmbed;