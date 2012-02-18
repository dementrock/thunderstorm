var normalize = function(v) {
  var x = v[0], y = v[1];
  var norm = Math.sqrt(x * x + y * y);
  return [x / norm, y / norm];
}

var isEqual = function(a, b) {
  return Math.abs(a - b) < 0.0000001;
}

var isSame = function(o1, o2) {
  return isEqual(o1[0], o2[0]) && isEqual(o1[1], o2[1]);
}

var isSameOrientation = function(o1, o2) {
  return isSame(normalize(o1), normalize(o2));
}

var distance = function(p1, p2) {
  return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
}

var norm = function(p1) {
  return Math.sqrt(p1[0] * p1[0] + p1[1] * p1[1]);
}

var fixPosition = function(p) {
    return [Math.min(WIDTH, Math.max(0, p[0])), Math.min(HEIGHT, Math.max(0, p[1]))];
}

exports.normalize = normalize;
exports.isSameOrientation = isSameOrientation;
exports.isSame = isSame;
exports.distance = distance;
exports.isEqual = isEqual;
exports.norm = norm;
exports.fixPosition = fixPosition;
