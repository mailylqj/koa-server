function Promise(executor) {
    let that = this;
	this.status = "pendding";
    this.queue = [];
	this.reject = function(result) {
		that.result = result;
        that.status = "reject";
        that.queue.forEach(item => {
            item.onfulled(result);
        });
	};
	this.resolve = function(result) {
		that.result = result;
        that.status = "resolve";
        that.queue.forEach(item => {
            item.onreject(result);
        });
	};
	executor(this.resolve, this.reject);

	setTimeout(function() {
		that.resolve();
	}, 0);
	setTimeout(function() {
		that.reject();
	}, 0);
}

Promise.prototype.then = function(onfulled, onreject) {
	if (this.status === "resolve") {
		onfulled.call(this, this.result);
	}else if (this.status === "reject") {
		onreject.call(this, this.result);
	}else{
        this.queue.push({ onfulled, onreject });
    }
};

function Promise2(fn) {
	const _this = this;
	this._queue = [];
	this._succ_res = null;
	this._err_res = null;
	this.status = "";
	fn(
		function(...arg) {
			//resolve
			if (_this.status != "error") {
				_this.status = "success";
				_this._succ_res = arg;
				_this._queue.forEach(json => {
					json.fn1(...arg);
				});
			}
		},
		function(...arg) {
			//reject
			if (_this.status != "success") {
				_this.status = "error";
				_this._err_res = arg;
				_this._queue.forEach(json => {
					json.fn2(...arg);
				});
			}
		}
	);
}
Promise2.prototype = {
	then: function(fn1, fn2) {
		let _this = this;
		if (_this.status == "success") {
			fn1(..._this._succ_res);
		} else if (_this.status == "error") {
			fn2(..._this._succ_res);
		} else {
			_this._queue.push({ fn1, fn2 });
		}
	}
};
