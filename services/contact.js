const express = require('express');
const router = express.Router();
const fs = require('fs');
const savedContacts = require('../data/contacts.json');

const ctime = () => {
	const date = new Date();
	const fdate = date.toLocaleDateString('en-GB', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: true
	});
	return fdate;
}

/* [GET] get contacts list */
router.get('/', (req, res, next) => {
	try {
		res.status(200).json({ success: true, message: 'All saved contacts retrieved successfully!', data: savedContacts });
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
		const searchKeyObj = req.query;
		let searchResult = savedContacts;
		/* search by fname */
		if (searchKeyObj?.fname) searchResult = searchResult.filter((item) => item.fname.toLowerCase() == searchKeyObj.fname.toLowerCase() );
		/* search by lname */
		if (searchKeyObj?.lname) searchResult = searchResult.filter((item) => item.lname.toLowerCase() == searchKeyObj.lname.toLowerCase() );
		/* search by category */
		if (searchKeyObj?.category) searchResult = searchResult.filter((item) => item.category.toLowerCase() == searchKeyObj.category.toLowerCase() );
		/* search by phno */
		if (searchKeyObj?.phno) searchResult = searchResult.filter((item) => item.phno.toLowerCase() == searchKeyObj.phno.toLowerCase() );
		res.status(200).json({ success: true, message: 'Searched in saved contacts successfully!', data: searchResult });
	} catch (error) {
		console.log(error);
		res.status(400).json({ success: false, message: 'Something went wrong! Please try after sometime!', data: [] });
	}
});

module.exports = router;
