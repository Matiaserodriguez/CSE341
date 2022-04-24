const db = require('../db/connect');
const { ObjectID } = require('mongodb');
const { isEqual } = require('lodash')
const { trueOrFalse } = require('../helpers')

const loadCollection = async () => {
  return await db.getDb().db().collection('contacts')
}

const returnContacts = async (contact = {}) => {
  const connection = await loadCollection()
  return connection.find(contact);
};

const createContact = async (contactObject) => {
  const connection = await loadCollection()
  return connection.insertOne(contactObject)
}

const updateContact = async (objectToUpdate) => {
  const connection = await loadCollection()
  return connection.findOneAndUpdate(...objectToUpdate)
}

const delContact = async (objectId) => {
  const connection = await loadCollection()
  return connection.deleteOne(objectId)
}

const getAll = async (req, res, next) => {
  const allContacts = await returnContacts();
  allContacts.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getOne = async (req, res, next) => {
  let objectId = new ObjectID(req.params.id);
  const contact = await returnContacts(objectId);
  contact.toArray().then((list) => {
    console.log(list);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(list);
  });
};

const postContact = async (req, res, next) => {
  const contactSchema = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'favoriteColor': '',
    'birthday': '',
  }

  let contact = req.body;

  // This statement verifies that all keys are being passed in the body
  if (!isEqual(Object.keys(contact), Object.keys(contactSchema))) {
    res.status(400).send(JSON.stringify({
      "status": "400",
      "msg": "Please provide fields: firstName, lastName, email, favoriteColor and birthday"
    }))
    return
  }

  try {
    const contactCreated = await createContact(contact)
    // Since mongo 4.x there the creation of objects doesn't return the object itself
    // that's why we call returnContacts and use the insertedId as parameter
    const contactObjectReturned = await returnContacts(contactCreated.insertedId)
    contactObjectReturned
      .toArray()
      .then(contact => res.status(201).send(JSON.stringify({ "Created": contact })))
  } catch (e) {
    console.log(e)
    res.status(400).send(JSON.stringify({
      "status": "400",
      "msg": "something failed, please try again in a couple minutes"
    }))
    return
  }

}

const putContact = async (req, res, next) => {

  if (!trueOrFalse(req, res)) return

  const objectToUpdate = [
    { '_id': new ObjectID(req.params.id) },
    {
      $set: req.body
    }
  ]

  try {
    await updateContact(objectToUpdate)
    res.status(201).json({ 'status': 201, 'msg': 'Updated or created' })
  }
  catch (e) {
    console.log(e)
    res.status(400).send(JSON.stringify({
      "status": "400",
      "msg": "something failed. Please provide at least one of the following fields: firstName, lastName, email, favoriteColor or birthday "
    }))
    return
  }
}

const deleteContact = async (req, res, next) => {
  try {
    delContact({ '_id': new ObjectID(req.params.id) })
    res.status(200).json({ 'status': 200, 'msg': 'Deleted Successfully' })
  } catch (e) {
    console.log(e)
    res.status(400).send(JSON.stringify({
      "status": "400",
      "msg": "Something failed. Unable to delete record"
    }))
    return
  }
}

module.exports = {
  getAll,
  getOne,
  postContact,
  putContact,
  deleteContact
};
