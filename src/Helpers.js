import $ from "jquery";

class Helpers {
	static mergeNonEmpty(...stringsOrArrays) {
		let retArr = [];
		// Go through stringsOrArrays, merge all non-empty
		for (let i = 0; i < stringsOrArrays.length; i++) {
			let item = stringsOrArrays[i];
			if (Array.isArray(item)) {
				retArr = retArr.concat(Helpers.mergeNonEmpty(...item));
			} else if (typeof item === 'string' && item.length > 0) {
				retArr.push(item);
			} else if (typeof item === 'number' && !isNaN(item)) {
				retArr.push(item);
			}
		}
		return retArr;
	}

	static getClasses(...stringsOrArrays) {
		let retArr = [];
		for (let i = 0; i < stringsOrArrays.length; i++) {
			let item = stringsOrArrays[i];
			if (Array.isArray(item)) {
				retArr = retArr.concat(Helpers.mergeNonEmpty(...item));
			} else if (typeof item === 'string' && item.length > 0) {
				retArr = retArr.concat(Helpers.mergeNonEmpty(item.split(' ')));
			}
		}
		return retArr.join(' ');
	}

	static ratioResize(element, wR = 16, hR = 9) {
		let $element = $(element);
		if (!$element) return;
		let height = $element.height();
		if(!height) {
			return;
		}
		// Get width for 16:9
		let ratio = wR / hR;
		// Set width
		$element.css("width", height * ratio);
	}
}

export default Helpers;