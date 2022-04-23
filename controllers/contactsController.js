const db = require('../db/connect');
const { ObjectID } = require('mongodb');

const returnContacts = async (db, collectionName, contract = {}) => {
  return await db.db().collection(collectionName).find(contract);
};

const getAll = async (req, res, next) => {
  const allContacts = await returnContacts(db.getDb(), 'contacts');
  allContacts.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getOne = async (req, res, next) => {
  let objectId = new ObjectID(req.params.id);
  const contact = await returnContacts(db.getDb(), 'contacts', objectId);
  contact.toArray().then((list) => {
    console.log(list);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(list);
  });
};

module.exports = { getAll, getOne };
