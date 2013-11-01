var Octree = require("../src/octree.js");
var OctreeRenderer = require("../src/octreeRenderer.js");
var geometry = function(x, y, z) {
    return x + y + z < 1;
};

var viewport = {
    origin: [0, 0, 0],
    width: 1
};


function draw(viewport) {
    console.log(viewport.origin)
}

//script 
var tree = Octree.octree(geometry, viewport, 4);
OctreeRenderer.render(tree, viewport, draw);