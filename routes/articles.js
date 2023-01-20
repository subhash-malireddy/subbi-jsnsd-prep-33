const express = require('express');
const router = express.Router();
const hnLatestStream = require('hn-latest-stream')
const {finished} = require('stream')

router.get('/', function(req, res, next) {
  console.log(req.query.amount, '-___-', req.query.type);
  const { amount = 10, type = 'html' } = req.query

  if (type === 'html') res.type('text/html')
  if (type === 'json') res.type('application/json')

  const stream = hnLatestStream(amount, type)

  stream.pipe(res, {end: false})

  finished(stream, (err) => {
    if (err) {
      next(err)
      return
    }
    res.end()
  })

});

module.exports = router;