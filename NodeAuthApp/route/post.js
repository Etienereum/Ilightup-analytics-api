const router = require('express').Router();
const verify = require('./verifyToken')

router.get('/', verify, (req, res) => {
    res.json({
        post: { Title: 'My first Post', Description: 'Random data you should not access without token' }
    });
});

module.exports = router;
