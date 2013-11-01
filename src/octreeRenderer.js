(function() {
    var OctreeRenderer = {};
    /**
     * geometry = (x, y, z) -> Boolean
     * viewport = {origin: [x, y, z], width: width}
     * depth = 0,1,..
     */
    OctreeRenderer.render = function(tree, viewport, draw) {
        renderTree(tree, viewport, draw);
    }
    
    var orderedOctal = [];
    
    
    /*
                   3
                     4
                   1
                7    2
                  8
                5
                  6
                  
            [1, 1, 0] - > [1, 0, 0] -> [1, 1, 1] -> [1, 1, 0] ->
                [0, 1, 0] -> [0, 0, 0] -> [0, 1, 1] -> [0, 0, 1]
               
                k        
            j   |    i
             \     /    
            
            */
    for (k = 0; k < 2; k++) {
        for (j = 0; j < 2; j++) {
            for (i = 0; i < 2; i++) {
                orderedOctal.push([i, j, k]);
            }
        }
    }

    function renderTree(tree, viewport, draw) {
        if (tree instanceof Array) {
            var width = viewport.width / 2,
                origin = viewport.origin,
                i, j, k, n, index, childViewport, coords;
            for(index = 0; n < 8; n++) {
                coords = orderedOctal[n];
                i = coords[0];
                j = coords[1];
                k = coords[2];
                childViewport = {
                    origin: [origin[0] + i * width, origin[1] +j * width, origin[2] + k * width],
                    width: width
                }
                renderTree(tree[index], childViewport, draw);
            }
        } else if (tree) {
            draw(viewport);
        }
    }


    if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
        module.exports = OctreeRenderer;
    }
    else if (typeof window !== "undefined" && window !== null) {
        window.OctreeRenderer = OctreeRenderer;
    }
    else {
        throw new Error('This library only supports node.js and modern browsers.');
    }

}).call(this);