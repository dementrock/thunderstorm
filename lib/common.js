var normalize = function(v) {
    var x = v[0], y = v[1];
    var norm = Math.sqrt(x*x + y*y);
    return [x / norm, y / norm];
};

var isEqual = function(a, b) {
    return Math.abs(a - b) < 0.0000001;
}

var isSameOrientation = function(o1, o2) {
    o1 = normalize(o1);
    o2 = normalize(o2);
    return isEqual(o1[0], o2[0]) && isEqual(o1[1], o2[1]);
};

exports.normalize = normalize;
exports.isSameOrientation = isSameOrientation;
