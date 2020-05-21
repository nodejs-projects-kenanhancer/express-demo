import {Router} from 'express';

const router = new Router();

router.get('/', (req, res) => {
    res.send(req.context.models.users[req.context.me.id]);
});

export default router;