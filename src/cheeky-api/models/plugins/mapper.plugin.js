
/**
 * Unflatten the materialized array
 * @param {Array} input - The flattened array of content
 * @param {String} delim - The content path delimiter
 */
function unflatten(input, delim) {
	var mapper = {},
		result = [];

	input.sort(function (a, b) {
		return a.path.length - b.path.length;
	});

	input.forEach(function (item) { 
		// map the path
		mapper[item.path] = item;
   
		// if the element has parent(s)
		if (item.path.indexOf(delim) !== -1) {
			var parentPaths = item.path.split(delim);
			parentPaths.pop();
			var parentPath = parentPaths.join(delim);

			// add to the parent object
			if (mapper[parentPath]) {
				mapper[parentPath].items = mapper[parentPath].items || [];
				mapper[parentPath].items.push(mapper[item.path]);
			}
		} else { // no parent, goes at the root of the array
			result.push(mapper[item.path]);
		}
	});
	return result;
}

module.exports.unflatten = unflatten;