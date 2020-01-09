import * as Router from 'koa-router';
const router = new Router();

import Author from '../controller/authorCtrl'

// router.post('/send', Author.all());

router.get('/userinfo', Author.userinfo);

export default router;