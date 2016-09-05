module.exports = {
    "cacheDirectory": true,
    "cacheIdentifier": "v5",
    "presets": ["es2015-loose", "stage-0"],
    "plugins": [
        "transform-decorators-legacy",
        ["babel-plugin-transform-react-jsx", {"pragma": "VDOM.createElement"}],
        "babel-plugin-cx"
    ]
};

