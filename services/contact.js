const express = require('express');
const router = express.Router();
const fs = require('fs');
const savedContacts = require('../data/contacts.json');

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
}

/* sort by key & order, default sorting order is asc */
const funcCompare = (key, order) => (a, b) => {
	let comparison = 0;
    if (a[key] < b[key]) {
        comparison = -1;
    } else if (a[key] > b[key]) {
        comparison = 1;
    }
    return order === 'desc' ? comparison * -1 : comparison;
}

/* [GET] fetch all saved contacts */
router.get('/', (req, res, next) => {
	try {
		const queryParams = req.query;
		const sortBy = queryParams['sortBy'] ? queryParams['sortBy'].split(',').map((item) => item.trim()) : [];
		const orderBy = queryParams['orderBy'] ? queryParams['orderBy'].toLowerCase().trim() : 'asc';
		/* sorting data by key & order */
		let sortedContacts = savedContacts;
		sortBy.map((item) => {
			sortedContacts.sort(funcCompare(item, orderBy));
		});
		res.status(200).json({ success: true, message: 'All saved contacts retrieved successfully!', data: sortedContacts });
	} catch (error) {
		console.log(error);
		res.status(400).json({ success: false, message: 'Something went wrong! Please try after sometime!', data: [] });
	}
});

/* [POST] add new contacts */
router.post('/', (req, res, next) => {
	try {
		const newContacts = req.body;
		let maxId = savedContacts.length;
		newContacts.map((item) => {
			item['id'] = maxId;
			item['cdate'] = ctime();
			savedContacts.push(item);
			maxId += 1;
		});
		fs.writeFileSync('data/contacts.json', JSON.stringify(savedContacts, null, 4));
		res.status(200).json({ success: true, message: 'Contacts saved successfully!', data: newContacts });
	} catch (error) {
		console.log(error);
		res.status(400).json({ success: false, message: 'Something went wrong! Please try after sometime!', data: [] });
	}
});

/* [GET] search contacts */
router.get('/search', (req, res, next) => {
	try {
		const queryParams = req.query;
		let searchResult = savedContacts;
		/* search by fname */
		if (queryParams?.fname) searchResult = searchResult.filter((item) => item.fname.toLowerCase() == queryParams.fname.toLowerCase() );
		/* search by lname */
		if (queryParams?.lname) searchResult = searchResult.filter((item) => item.lname.toLowerCase() == queryParams.lname.toLowerCase() );
		/* search by category */
		if (queryParams?.category) searchResult = searchResult.filter((item) => item.category.toLowerCase() == queryParams.category.toLowerCase() );
		/* search by phno */
		if (queryParams?.phno) searchResult = searchResult.filter((item) => item.phno.toLowerCase() == queryParams.phno.toLowerCase() );
		res.status(200).json({ success: true, message: 'Searched in saved contacts successfully!', data: searchResult });
	} catch (error) {
		console.log(error);
		res.status(400).json({ success: false, message: 'Something went wrong! Please try after sometime!', data: [] });
	}
});

module.exports = router;
