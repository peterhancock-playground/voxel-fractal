(function() {
    var Octree = {};
    /**
     * geometry = (x, y, z) -> Boolean
     * viewport = {origin: [x, y, z], width: width}
     * depth = 0,1,..
     */
    Octree.octree = function(geometry, viewport, depth) {
        return octree(geometry, viewport, depth);
    }
    
    function octree(geometry, viewport, depth) {
        if (depth === 0) {
            return geometry.apply(this, viewport.origin);
        } else {
            var children = [];
            var width = viewport.width / 2;
            var parentOrigin = viewport.origin;
            for(var k = 0; k < 2; k++) {
                for (var j = 0; j < 2; j ++) {
                    for(var i = 0 ; i < 2; i++) {
                        //var index = i + 2 * j + 4 * k;
                        var origin  = [];
                        origin[0] = parentOrigin[0] + i * width;
                        origin[1] = parentOrigin[1] + j * width;
                        origin[2] = parentOrigin[2] + k * width;
                        children.push(octree(geometry, {origin: origin, width: width}, depth - 1));
                    }
                }
            }
            // Can we collapse?
            var commonVal = children[0];
            for(var i = 0; i < 8; i ++) {
                var child = children[i];
                if (child instanceof Array || child !== commonVal) {
                    return children;
                }
            }
            return commonVal;
        }
    }


    if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
        module.exports = Octree;
    }
    else if (typeof window !== "undefined" && window !== null) {
        window.Octree = Octree;
    }
    else {
        throw new Error('This library only supports node.js and modern browsers.');
    }

}).call(this);
