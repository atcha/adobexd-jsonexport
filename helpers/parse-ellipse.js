const { getColorName } = require('./colors');

const getStylesForEllipse = ellipseNode => {
    const result = {};

    result['width'] = ellipseNode.radiusX * 2  + 'px';
    result['height'] = ellipseNode.radiusY * 2  + 'px';

    if (ellipseNode.strokeEnabled) {
        result['border'] = ellipseNode.strokeWidth + 'px solid ' + getColorName(ellipseNode.stroke);
    }

    // TODO : add border for non circle ellipse
    if (ellipseNode.isCircle ) {
            result['border-radius'] = '50%';
    }

    if (ellipseNode.fillEnabled) {
        result['background'] = getColorName(ellipseNode.fill);
    }

    return result;
};

exports.getStylesForEllipse = getStylesForEllipse;
