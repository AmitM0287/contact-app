const express = require('express');
const router = express.Router();
const fs = require('fs');
const savedContacts = require('../data/contacts.json');

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
			savedContacts.push(item);
			maxId += 1;
		});
		fs.writeFileSync('data/contacts.json', JSON.stringify(savedContacts, null, 4));
		res.status(200).json({ success: true, message: 'Contacts saved successfully!', data: savedContacts });
	} catch (error) {
		console.log(error);
		res.status(400).json({ success: false, message: 'Something went wrong! Please try after sometime!', data: [] });
	}
});

module.exports = router;
