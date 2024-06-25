import moment from "moment";
import DOMPurify from 'isomorphic-dompurify'
import {
    getItemsLength,
    highlightItems,
    isFloat,
    isLAbelSelected,
    makeTolltipItems,
} from "./helpers";



const $q: any = (window as any).jQuery;

export default function UseTooltip(this: void, plot: any) {
    let previousPoint: any = null;
    $q("#tooltip").remove();
    previousPoint = null;
    // let isLogsVolume:any = this.isLogsVolume
    $q(this).on("plothover", function (event: any, pos: any, item: any) {

        plot.unhighlight();
        if (item) {
            let plotData = plot.getData();
              // eslint-disable-next-line
            const [plotTime, _] = item.datapoint;
            const selectedPlots = JSON.parse(
                localStorage.getItem("labelsSelected") || "null"
            );
            const getDataPointValue = (datapoint: any[]) => {
                if (datapoint?.length === 2) {
                    return datapoint[1];
                } else return datapoint[1] - datapoint[2];
            };
            const itemValue = isFloat(parseFloat(item.datapoint[1]))
                ? parseFloat(getDataPointValue(item.datapoint)).toFixed(3)
                : getDataPointValue(item.datapoint);

            const isSelectedPlots = selectedPlots.length > 0;
            const labelsList:any = [];
            for (let i = 0; i < plotData.length; i++) {
                const plotIsVisible = isSelectedPlots
                    ? isLAbelSelected(plotData[i])
                    : true;
                const plotTimes = plotData[i].data
                    .map((d: any) => d)
                    .map((e: any) => e[0]);
                const plotPoints = plotData[i].data.map((d: any) => d);

                if (plotTimes.includes(plotTime) && plotIsVisible) {
                    const plotIndex = plotTimes.indexOf(plotTime);
                      // eslint-disable-next-line
                    const [_, value] = plotPoints.find( 
                        //eslint-disable-next-line
                        ([time, _]: [time: any, _: any]) => time === plotTime
                    );
                    labelsList.push({
                        color: plotData[i].color,
                        label: plotData[i].label,
                        value:value,
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
                let p_ToltipTemplate = DOMPurify.sanitize(`<div style="${"display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #666;padding:6px;flex:1"}">
                <p>${moment(item.datapoint[0]).format(
                    "YYYY-MM-DDTHH:mm:ss.SSSZ"
                )}</p>
      
                <p style="margin-left:10px">
              Value: ${itemValue}</p>
                </div>
               <div style="padding:3px">
                ${labelsFormatted}
                </div>`)
                $q("#tooltip").remove();
                const tooltipTemplate = p_ToltipTemplate
                if (labelsList?.length > 0) {
                    const labelLength = getItemsLength(labelsList);
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

function showTooltip(x: any, y: any, contents: any, length: any) {
    // calculate the xpos with mouse position

    let wWidth = window.innerWidth;
    let halfScreen = wWidth / 2;

    let posX;
    const clientX: any = (window as any).event.clientX;
    posX = clientX;
    if (clientX > halfScreen) {
        posX -= length < 125 ? length * 6 + 15 : 505;
    }

    $q(DOMPurify.sanitize(`<div id="tooltip">${contents}</div>`))
        .css({
            position: "absolute",
            display: "none",
            top: y,
            left: posX,
            padding: "6px",
            "font-size": "12px",
            "flex-direction": "column",
            "max-width": "500px",
            "border-radius": "6px 6px 6px 6px",
            "background-color": "#333",
            color: "#aaa",
        })
        .appendTo("body")
        .fadeIn(125);
}


