import * as moment from "moment";
import {
    getItemsLength,
    highlightItems,
    isFloat,
    isLAbelSelected,
    makeTolltipItems,
} from "./helpers";

const $q = window.jQuery;

export default function UseTooltip(plot) {
    let previousPoint = null;
    $q("#tooltip").remove();
    previousPoint = null;
    $q(this).bind("plothover", function (event, pos, item) {
    
        plot.unhighlight();
        if (item) {
            let plotData = plot.getData();
            const [plotTime, _] = item.datapoint;
            const selectedPlots = JSON.parse(
                localStorage.getItem("labelsSelected")
            );
            const itemValue = isFloat(parseFloat(item.datapoint[1]))
                ? parseFloat(item.datapoint[1]).toFixed(3)
                : item.datapoint[1];

            const isSelectedPlots = selectedPlots.length > 0;
            const labelsList = [];
            for (let i = 0; i < plotData.length; i++) {
                const plotIsVisible = isSelectedPlots
                    ? isLAbelSelected(plotData[i])
                    : true;
                const plotTimes = plotData[i].data
                    .map((d) => d)
                    .map((e) => e[0]);
                const plotPoints = plotData[i].data.map((d) => d);

                if (plotTimes.includes(plotTime) && plotIsVisible) {
                    const plotIndex = plotTimes.indexOf(plotTime);

                    const [_, value] = plotPoints.find(
                        ([time, _]) => time === plotTime
                    );
                    labelsList.push({
                        color: plotData[i].color,
                        label: plotData[i].label,
                        value: value,
                        plot,
                        plotIndex,
                        item,
                        i,
                    });
                }
            }

            highlightItems(labelsList);
            const labelsFormatted = makeTolltipItems(labelsList);
            if (previousPoint !== item.datapoint) {
                previousPoint = item.datapoint;
                $q("#tooltip").remove();
                const tooltipTemplate = `
                <div style="${"display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #666;padding:6px;flex:1"}">
                <p>${moment(item.datapoint[0]).format(
                    "YYYY-MM-DDTHH:mm:ss.SSSZ"
                )}</p>
      
                <p style="margin-left:10px">
              Value: ${itemValue}</p>
                </div>
               <div style="padding:3px">
                ${labelsFormatted}
                </div>
                `;
                if(labelsList?.length > 0) {
                    const labelLength =  getItemsLength(labelsList)
                    showTooltip(
                        item.pageX,
                        item.pageY,
                        tooltipTemplate,
                        labelLength
                    );
                }
              
            }
        } else {
            $q("#tooltip").remove();
            previousPoint = null;
        }
    });
}

function showTooltip(x, y, contents, length) {
    // calculate the xpos with mouse position

    let wWidth = window.innerWidth;
    let halfScreen = wWidth / 2

    let posX
    const clientX = window.event.clientX;
    posX = clientX
    if(clientX > halfScreen) {
        posX -= length < 125 ? (length *6) + 15 : 505;
    }

 $q(`<div id="tooltip">` + contents + `</div>`)
        .css({
            position: "absolute",
            display: "none",
            top: y,
            left: posX,
            padding: "6px",
            "font-size": "12px",
            "flex-direction":"column",
            "max-width":"500px",
            "border-radius": "6px 6px 6px 6px",
            "background-color": "#333",
            color: "#aaa",
        })
        .appendTo("body")
        .fadeIn(125);
}
