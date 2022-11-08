const fillObjectToSend = require('./fillObjectToSend');

function fillObjectFromArray(array, object) {
	array.forEach((test) => {
		fillObjectToSend(test, object);
	});
}


module.exports = fillObjectFromArray;
