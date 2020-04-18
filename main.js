/*
 * Sample plugin scaffolding for Adobe XD.
 *
 * Visit http://adobexdplatform.com/ for API docs and more sample code.
 */

let assests = require('assets'),
        assetsColors = assests.colors.get(),
        characterStyles = assests.characterStyles.get();

const { SymbolInstance } = require('scenegraph');

const fs = require("uxp").storage.localFileSystem;

const { parseLayers } = require('./helpers/parse-layers');


function exportAssets(selection, documentRoot) {
    let json = {};
    json.colors = assetsColors.map(color => {
        color.color = color.color.toRgba();
        return color;
    });
    json.characterStyles = characterStyles.map(characterStyle => {
        characterStyle.style.fill = characterStyle.style.fill.toRgba();
        return characterStyle;
    });
    json.components = [];
    let components = findSymbolInstance([], documentRoot);

    components.map((component) => {
        parseLayers(component.component,  [], component.name, {})
                .then((result) => {
                    component.detail = result;
                    json.components.push(component);
                });
    });

    fs.getFolder().then(folder => {
        folder.createFile("export.json", { overwrite: true }).then(file => {
            file.write(JSON.stringify(json));
        });
    });
}

// parsing project
function findSymbolInstance(placeholderArray, rootNode) {
    rootNode.children.forEach(node => {
        if (node instanceof SymbolInstance) {
            const component = prepareComponent(node);
            if (component) {
                placeholderArray.push(component);
            }
        }

        if (node.children.length > 0) {
            findSymbolInstance(placeholderArray, node);
        }
    });

    return placeholderArray;
}

function prepareComponent(componentNode) {
    // check artboard name if exist
    let artboardName = 'Canvas';

    let tempNode = componentNode;
    while (tempNode) {
        if (tempNode.constructor.name === 'Artboard') {
            artboardName = tempNode.name;
        }
        tempNode = tempNode.parent;
    }

    return {
        guid: componentNode.guid,
        name: componentNode.name,
        artboardName,
        component: componentNode,
    };
}


module.exports = {
    assetsColors,
    characterStyles,
    commands: {
        exportAssets
    }
};
