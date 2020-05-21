const {Router} = require('express');

const router = new Router();

router.get('/', (req, res) => {
    res.send(req.context.models.users[req.context.me.id]);
});

module.exports = router;