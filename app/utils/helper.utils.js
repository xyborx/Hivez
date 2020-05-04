export const padArray = (array, length, fill) => {
	return length > array.length ? array.concat(Array(length - array.length).fill(fill)) : array;
};

export const leftPadArray = (array, length, fill) => {
	return Array(length).fill(fill).concat(array).slice(array.length);
};

export const rupiahFormatting = (value, withRp = true) => {
	// https://www.malasngoding.com/membuat-format-rupiah-dengan-javascript/
	
	var number_string = value.toString().replace(/[^,\d]/g, '').toString(),
	split = number_string.split(','),
	sisa = split[0].length % 3,
	rupiah = split[0].substr(0, sisa),
	ribuan = split[0].substr(sisa).match(/\d{3}/gi);

	if(ribuan){
		separator = sisa ? '.' : '';
		rupiah += separator + ribuan.join('.');
	}

	rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
	return rupiah ? (withRp ? `Rp ${rupiah}` : rupiah) : '';
};