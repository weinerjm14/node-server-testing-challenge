const express = require('express');
const hobbits = require('./hobbitsModel');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const hobbitlist = await hobbits.find();

    if (!hobbitlist) {
      return res.status(404).json({
        message: 'Hobbit not found',
      });
    }

    res.status(200).json(hobbitlist);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const hobbit = await hobbits.findById(req.params.id);
    if (!hobbit) {
      return res.status(404).json({
        message: 'Hobbit not found',
      });
    }

    res.status(200).json(hobbit);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const hobbit = await hobbits.create(req.body);

    res.status(201).json(hobbit);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const hobbit = await hobbits.update(req.params.id, req.body);
    if (!hobbit) {
      return res.status(404).json({
        message: 'Hobbit not found',
      });
    }
    res.status(200).json(hobbit);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const hobbit = await hobbits.remove(req.params.id);
    if (!hobbit) {
      return res.status(404).json({
        message: 'Hobbit not found',
      });
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
