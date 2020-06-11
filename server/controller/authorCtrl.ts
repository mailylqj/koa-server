import fetch from 'node-fetch';
export default {
	async userinfo(ctx: any){
		ctx.body = ctx.session.userinfo;
	}
};