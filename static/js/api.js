
const url = "https://tbsmall.jiayibao.net"
// const url = "http://192.168.0.22:8080"
//登录前的微信验证

export function getopenid(data){
	return new Promise((resolve,reject)=>{
		
		uni.request({
			 url: url + '/authorize/weixinAuth', //接口地址 
			 data: {
				
			 },
			 method:"POST",
			 header: {
				'content-type': 'application/x-www-form-urlencoded' //默认值
			},
			success: function (res) {
				uni.request({
					url: url + '/baseRequest', 
					data:{code:data.code},
					method:"GET",
					success: res => {
						resolve(res.data)
					}
				});
			 }
		})
	})
}
// 获取验证码

export function getcode(data){
	return new Promise((resolve,reject)=>{
		uni.request({
		    url: url+'/msm/verificationCode',
		    data: data,
		    method:"GET",
		    success: (res) => {
				resolve(res.data)
		    }
		});
	})
}

// 登录

export function tubanglogin(data){
	return new Promise((resolve,reject)=>{
		uni.request({ 
		    url: url+'/login', 
		    data: data,
		    header: {
		    	'content-type': 'application/x-www-form-urlencoded' 
		    },
		    method:"POST",
		    success: (res) => {
				resolve(res.data)
		    }
		});
	})
}
// 获取省市区
export function servicecity(data){
	return new Promise((resolve,reject)=>{
		uni.request({
		    url: url+'/city/serviceCity', //仅为示例，并非真实接口地址。
			method:"get",
		    success: (res) => {
				resolve(res.data)
		    }
		});
	})
}
// 首页数据
export function indexinfo(data){
	return new Promise((resolve,reject)=>{
		uni.request({
		    url: url+'/index', //仅为示例，并非真实接口地址。
		    data: data,
		    header: {
		        'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
		    },
			method:"POST",
		    success: (res) => {
				// this.$set()
				resolve(res.data)
		    }
		});
	})
	
}

// 公示列表(1)
export function publicityList(data){
	return new Promise((resolve,reject)=>{
		uni.request({
		    url: url+'/publicityList',
		    data: data,
		    header: {
		    	'content-type': 'application/x-www-form-urlencoded' 
		    },
		    method:"POST",
		    success: (res) => {
				// this.$set()
				resolve(res.data)
		    }
		});
	})
	
}


// 公示列表(2)
export function publicity(data){
	return new Promise((resolve,reject)=>{
		uni.request({
		    url: url+'/publicity',
		    data: data,
		    header: {
		    	'content-type': 'application/x-www-form-urlencoded' 
		    },
		    method:"POST",
		    success: (res) => {
				// this.$set()
				resolve(res.data)
		    }
		});
	})
}
// 公示详情
export function publicitydetail(data){
	return new Promise((resolve,reject)=>{
		uni.request({
		    url: url+'/publicityDetail',
		    data: data,
		    header: {
		    	'content-type': 'application/x-www-form-urlencoded' 
		    },
		    method:"POST",
		    success: (res) => {
				// this.$set()
				resolve(res.data)
		    }
		});
	})
}

// 我的

export function goUserDetail(data){
	
	return new Promise((resolve,reject)=>{
		
		uni.request({
		    url: url+'/goUserDetail',
		    data: data,
		    header: {
		    	'content-type': 'application/x-www-form-urlencoded' 
		    },
		    method:"POST",
		    success: (res) => {
				// this.$set()
				resolve(res.data)
				
		    }
		});
	})
}
// 汽车列表
export function carList(data){
	return new Promise((resolve,reject)=>{
		uni.request({
		    url: url+'/carList',
		    data: data,
		    header: {
		    	'content-type': 'application/x-www-form-urlencoded' 
		    },
		    method:"POST",
		    success: (res) => {
				// this.$set()
				resolve(res.data)
		    }
		});
	})
}
// 绑定车辆
export function bindcar(data){
	return new Promise((resolve,reject)=>{
		uni.request({
		    url: url+'/register1_limit',
		    data: data,
		    header: {
		    	'content-type': 'application/x-www-form-urlencoded' 
		    },
		    method:"POST",
		    success: (res) => {
				// this.$set()
				resolve(res.data)
		    }
		});
	})
}
// 添加车辆
export function addcar(data){
	return new Promise((resolve,reject)=>{
		uni.request({
		    url: url+'/register1_limit',
		    data: data,
		    header: {
		    	'content-type': 'application/x-www-form-urlencoded' 
		    },
		    method:"POST",
		    success: (res) => {
				// this.$set()
				resolve(res.data)
		    }
		});
	})
}
// 上传审核照片

export function uploadimg(data){
	return new Promise((resolve,reject)=>{
		uni.request({
		    url: url+'/register',
		    data: data,
		    header: {
		    	'content-type': 'application/x-www-form-urlencoded' 
		    },
		    method:"POST",
		    success: (res) => {
				// this.$set()
				resolve(res.data)
		    }
		});
	})
}