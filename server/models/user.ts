/**
 * 登录用户
 */
class User {
    public userId = '';
    public personId = '';
    public orgId = '';

    public orgName = '';
    public hrmDeptId = '';

    public fullName = '';
    public email = '';
    public mobile = '';
    public username = ''; // erp 号

    constructor(data: any) {
        if (!!data) {
            !!data.userId && (this.userId = data.userId);
            !!data.personId && (this.personId = data.personId);
            !!data.orgId && (this.orgId = data.orgId);

            !!data.orgName && (this.orgName = data.orgName);
            !!data.hrmDeptId && (this.hrmDeptId = data.hrmDeptId);
            !!data.fullname && (this.fullName = data.fullname);

            !!data.email && (this.email = data.email);
            !!data.mobile && (this.mobile = data.mobile);
            !!data.username && (this.username = data.username);
        }
    }

    public toJson(): {} {
        return {
            userId: this.userId,
            personId: this.personId,
            orgId: this.orgId,
            orgName: this.orgName,
            hrmDeptId: this.hrmDeptId,
            fullName: this.fullName,
            email: this.email,
            mobile: this.mobile,
            username: this.username
        }
    }
}

export default User;
