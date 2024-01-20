/* function used to get the current time */
const ctime = () => {
	const date = new Date();
	const ftime = date.toLocaleDateString('en-GB', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: true
	});
	return ftime;
};

/* sort by key & order, default sorting order is asc */
const funcCompare = (key, order) => (a, b) => {
	let comparison = 0;
    if (a[key] < b[key]) {
        comparison = -1;
    } else if (a[key] > b[key]) {
        comparison = 1;
    }
    return order === 'desc' ? comparison * -1 : comparison;
};

module.exports = { ctime, funcCompare };
