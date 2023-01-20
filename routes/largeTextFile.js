const router = require('express').Router();
const fs = require('fs');
const { finished } = require('stream');
router.get('/', (req, res, next) => {
    const largeFileStream = fs.createReadStream('./public/ultraLargeFile.txt');
    // explicitly specify not to end the destination stream when the source stream ends.
    largeFileStream.pipe(res, {end: false});

    // now check if the source stream is ended/errored and handle respectively.
    finished(largeFileStream, (err) => {
        if(err){
            next(err)
            return
        }
        res.end();
    })
})

module.exports = router;