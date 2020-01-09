import * as Router from 'koa-router';
const router = new Router();

router.get('/', async (ctx: any, next: any) => {
	await ctx.render('index', {
		title: '早会系统',
	});
});

export default router;