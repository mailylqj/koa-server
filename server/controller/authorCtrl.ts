export default {
	userinfo(ctx: any){
		ctx.body = ctx.session.userinfo;
	}
};