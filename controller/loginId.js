const fs = require("fs");
const model = require('../models/loginId');
const mongoose = require('mongoose');
const LoginId = model.loginId;

exports.createloginId =  async (req, res) => {
  try {
    
    // const loginIdData = req.body;
    // const newloginId = new LoginId(loginIdData);
    // await newloginId.save();
    // res.json({ success: true, message: 'LoginId created successfully' });

    const loginIds = await LoginId.findOne();
    res.json(loginIds);

  } catch (error) {
    console.error('Error creating loginId:', error);
    res.status(500).json({ success: false, error: 'Failed to create loginId' });
  }
};


exports.getAllloginIds = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await LoginId.findOne({email, password });
    if (!user) {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      })
    } else {
      res.status(200).json({
        message: "Login successful",
        user,
        isValid: true
      })
    }
     
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch loginIds' });
  }
};

exports.getloginId = async (req, res) => {
  const id = req.params.id;
  try {
    const loginId = await LoginId.findById(id);
    if (!loginId) {
      return res.status(404).json({ error: 'LoginId not found' });
    }
    res.json(loginId);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch loginId' });
  }
};

exports.replaceloginId = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await LoginId.findOneAndReplace({ _id: id }, req.body, { new: true });
    if (!doc) {
      return res.status(404).json({ error: 'LoginId not found' });
    }
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to replace loginId' });
  }
};

exports.updateloginId = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await LoginId.findOneAndUpdate({ _id: id }, req.body, { new: true });
    if (!doc) {
      return res.status(404).json({ error: 'LoginId not found' });
    }
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update loginId' });
  }
};

exports.deleteloginId = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await LoginId.findOneAndDelete({ _id: id });
    if (!doc) {
      return res.status(404).json({ error: 'LoginId not found' });
    }
    res.status(204).send(); // No content in response for successful deletion
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete loginId' });
  }
};
