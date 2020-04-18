const { getColorName } = require('./colors');

const getStylesForPath = pathNode => {
    const result = {};
    let viewport;

    result['width'] = Math.round(pathNode.localBounds.width);
    result['height'] = Math.round(pathNode.localBounds.height);

    if(result['width'] > result['height']) {
        viewport = result['width'];
    } else {
        viewport = result['height'];
    }

    result['viewport'] = '0 0 ' + viewport + ' ' + viewport;
    result['content'] = pathNode.pathData;
    if(pathNode.strokeEnabled) {
        result['stroke'] = getColorName(pathNode.stroke);
    }
    if(pathNode.fillEnabled) {
        result['fill'] = getColorName(pathNode.fill);
    }


    return result;
}

exports.getStylesForPath = getStylesForPath;