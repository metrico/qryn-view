export default function svg () {
    let svgModule:any = {}
    /* global */
    svgModule.svg = null
    svgModule.root = null
    svgModule.width = null
    svgModule.timeWindow = null
    svgModule.radar = null
    svgModule.tooltip = document.createElement('div')
    /**
     * Attaches the svg to the given container
     * @param {object} options Object containing 
     */
    svgModule.init = function (options:any) {
        svgModule.root = options?.root
        svgModule.width = options?.width || 1200
        svgModule.timeWindow = options?.timeWindow || 60
        svgModule.height = options?.height || 601
        var svg:any = {}
        if (!svgModule.svg) {
            svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
            svg.setAttributeNS(null, 'id', 'graph')
            svg.setAttributeNS(null, 'width', svgModule.width)
            svg.setAttributeNS(null, 'height', svgModule.height)
            let content = document.createElementNS('http://www.w3.org/2000/svg', 'g')
            content.setAttributeNS(null, 'id', 'content')
            svg.appendChild(content)
            svgModule.svg = svg
        } else {
            svg = svgModule.svg
        }
        /* wipe current content and render */
        svgModule.root.innerHTML = ''        
        svgModule.root.appendChild(svg)
        /* Setup tooltip object */
        svgModule.tooltip.setAttribute('class', 'tooltip')
        svgModule.tooltip.setAttribute('id', 'tooltip')
        svgModule.root.appendChild(svgModule.tooltip)
        /* draw frame, default height 600 px*/
        svg.appendChild(drawFrame(600))
        /* draw divisions, default division 1 second */
        svg.appendChild(drawTimeDivision(60, 600))
    }

    svgModule.clean = function () {
        let content:any = document.querySelector('#content')
        content.innerHTML = ''
    }
    /* Radar settings */
    svgModule.radarWidth = svgModule.width / svgModule.timeWindow
    svgModule.radarPosition = svgModule.width - (svgModule.radarWidth)
    
    svgModule.start = function () {
        svgModule.radarWidth = svgModule.width / svgModule.timeWindow
        svgModule.radarPosition = svgModule.width - (svgModule.radarWidth)
        let radar
        svgModule.radar = radar = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        radar.setAttributeNS(null, 'id', 'radar')
        radar.setAttributeNS(null, 'x', svgModule.radarPosition)
        radar.setAttributeNS(null, 'y', String(5))
        radar.setAttributeNS(null, 'width', svgModule.radarWidth)
        radar.setAttributeNS(null, 'height', String(parseInt(svgModule.height) - 10))
        radar.setAttributeNS(null, 'fill', '#054d18')
        let content:any = document.querySelector('#content')
        content.appendChild(radar)
        return true
    }

    svgModule.next = function (slice:any, data:any) {
        let content = document.querySelector('#content')
        let columnX = svgModule.radarPosition
        let columnY = 5
        svgModule.radar.setAttributeNS(null, 'x', svgModule.radarPosition -= svgModule.radarWidth)
        console.log(data)
        let logs = drawTiles(data.logs, '#4c7391', columnY, columnX, 20)
        if (logs.currentY > 600) {
            svgModule.height = logs.currentY 
            svgModule.svg.setAttributeNS(null, 'height', svgModule.height)
        }
        let metrics = drawTiles(data.metrics, '#914c57', logs.currentY, columnX, 10)
        if (metrics.currentY > 600) {
            svgModule.height = metrics.currentY 
            svgModule.svg.setAttributeNS(null, 'height', svgModule.height)
        }
        content?.appendChild(logs.fragment)
        content?.appendChild(metrics.fragment)
        return true
    }

    svgModule.done = function () {
        let content:any = document.querySelector('#content')
        content?.removeChild(svgModule.radar)
    }

    return svgModule
}

/* Style Controls */
const backElementColor = 'rgba(0,0,0,0.1)'

/**
 * Draws the frame rectangle into provided parent
 * @param {integer} height in pixels
 * @returns {object} frame object
 */
export function drawFrame (height:any) {
    let frame = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    frame.setAttributeNS(null, 'id', 'frame')
    frame.setAttributeNS(null, 'width', '1200')
    frame.setAttributeNS(null, 'height', height)
    frame.setAttributeNS(null, 'stroke', backElementColor)
    frame.setAttributeNS(null, 'stroke-width', '2')
    frame.setAttributeNS(null, 'fill', 'none')
    return frame
}

/**
 * Draws the vertical time lines into provided parent 
 * @param {integer} timeWindow in seconds
 * @param {integer} height in pixels
 * @returns {object} documentFragment of lines
 */
export function drawTimeDivision (timeWindow:any, height:any) {
    let divSize = 1200 / (timeWindow || 60)
    console.log('time Division in pixels', divSize)
    let fragment = document.createDocumentFragment()
    let lines = []
    let x = 0 + divSize
    while(x < 1200) {
        let line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        line.setAttributeNS(null, 'id', 'div' + x)
        line.setAttributeNS(null, 'x1', String(x))
        line.setAttributeNS(null, 'x2', String(x))
        line.setAttributeNS(null, 'y1', String(5))
        line.setAttributeNS(null, 'y2', String(parseInt(height) - 5))
        line.setAttributeNS(null, 'stroke', backElementColor)
        line.setAttributeNS(null, 'stroke-width', String(1))
        lines.push(line)
        fragment.appendChild(line)
        x += divSize 
    }
    return fragment
}

/**
 * Draw log buckets
 * @param {array} logArray 
 * @param {integer} startY 
 * @param {integer} x 
 * @returns 
 */
export function drawLogs(logArray:any, startY:any, x:any) {
    const rowHeight = 20
    let fragment = document.createDocumentFragment()
    let currentY = startY
    for (let row of logArray) {
        console.log('ROW', row)
        let logBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        logBox.setAttributeNS(null, 'fill', '#4c7391')
        logBox.setAttributeNS(null, 'x', x)
        logBox.setAttributeNS(null, 'y', currentY)
        logBox.setAttributeNS(null, 'width', String(20))
        logBox.setAttributeNS(null, 'height', String(rowHeight))
        logBox.setAttributeNS(null, 'stroke', 'black')
        logBox.setAttributeNS(null, 'stroke-width', String(1))
        let text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
        text.setAttributeNS(null, 'id', 'log' + x)
        text.setAttributeNS(null, 'x', x)
        text.setAttributeNS(null, 'y', currentY + (rowHeight / 2))
        text.setAttributeNS(null, 'z', String(1000))
        text.setAttributeNS(null, 'class', 'rowText')
        text.textContent = JSON.stringify(row.stream)
        fragment.appendChild(logBox)
        fragment.appendChild(text)
        currentY += rowHeight
    }

    return {currentY:currentY, fragment:fragment}
}

/**
 * Draw metric buckets
 * @param {array} logArray 
 * @param {integer} startY 
 * @param {integer} x 
 * @returns {object} Object with currentY and fragment including all metric boxes
 */
export function drawMetrics(metricsArray:any, startY:any, x:any) {
    const rowHeight = 20
    let fragment = document.createDocumentFragment()
    let currentY = startY
    for (let row of metricsArray) {
        console.log('ROW', row)
        
        fragment.appendChild(row.text)
        currentY += rowHeight
    }

    return {currentY:currentY, fragment:fragment}
}

export function drawTiles (array:any, color:any, y:any, x:any, rowHeight:any) {
    let fragment = document.createDocumentFragment()
    let currentY = y
    for (let row of array) {
        console.log('Drawing Row', row)
        let tooltipMsg = ''
        if (row.stream) {
            tooltipMsg = JSON.stringify(row.stream)
        } else {
            tooltipMsg = row
        }
        fragment.appendChild(drawTile(x, currentY, 20, rowHeight, color, tooltipMsg))
        currentY += rowHeight
    }
    return {currentY, fragment}
}

export function drawTile (x:any, y:any, width:any, height:any, color:any, tooltipMsg:any) {
    let tile = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    tile.setAttributeNS(null, 'fill', color)
    tile.setAttributeNS(null, 'x', x)
    tile.setAttributeNS(null, 'y', y)
    tile.setAttributeNS(null, 'width', width)
    tile.setAttributeNS(null, 'height', height)
    tile.setAttributeNS(null, 'stroke', 'black')
    tile.setAttributeNS(null, 'stroke-width', String(1))
    tile.addEventListener('mouseover', function(ev) {
        console.log('mouseover',ev)
        let tooltip:any = document.querySelector('#tooltip')
        console.log(tooltip)
        tooltip.innerHTML = `<div>Title:</div></br><div>${tooltipMsg}</div>`
        tooltip.style.display = "block"
    })
    tile.addEventListener('mouseout', function(ev) {
        console.log(ev)
        let tooltip:any = document.querySelector('#tooltip')
        tooltip.innerHTML = ''
        tooltip.style.display = "none"
    })
    return tile
}


const graph = svg()

function main () {
    /* Initialize svg */
    let container = document.querySelector('#container')
    graph.init({
        root: container,
        width: 1200,
        timeWindow: 60,
    })
    /* Setup Tooltip Logic */
    document.addEventListener('mousemove', function (ev) {
        let tooltip:any = document.querySelector('#tooltip')
        tooltip.setAttribute('style', `left:${ev.pageX}px;top:${ev.pageY}px;`)
    })
    /* Setup Button Logic */
    let button:any = document.querySelector('#start')
    button.addEventListener('click', startScan)
}

document.addEventListener('DOMContentLoaded', function () {
    main()
})


async function startScan () {
    let startTime = Date.now()
    let endTime = startTime - (60 * 1000) // 1 minute
    /* default 1 second division */
    let division = 1000
    let slice = startTime
    /* Empty current graph */
    svg().clean()
    /* Set to 'Radar' to initial position */
    svg().start()
    /* fetch data and send to each slice */
    while(slice > endTime) {
        let data = await getSlice(slice)
        svg().next(slice, data)
        slice -= division
    }
    svg().done()
}

async function getSlice (slice:any) {
    let response = await fetch(window.location + "slice", {
        method: 'POST',
        body: slice
    })
    return response.json()
}