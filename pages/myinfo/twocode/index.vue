<template>
	<div class="twocode">
		<image :src="img"></image>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				access_token:"",
				img	:""
			}
		},
		onShow(){
			this.getcode()
		},
		methods:{
			getcode(){
				let that = this
				return new Promise((resolve,reject)=>{
					wx.request({
					//注意：下面的access_token值可以不可以直接复制使用，需要自己请求获取
						url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx7bee4956d31fa5cb&secret=fea8f1ac92e40bd63b52b92da1a527af',
						method: "GET",
						success(res) {
							that.access_token = res.data.access_token
						},
					})
				}).then((res)=>{
					wx.request({
					//注意：下面的access_token值可以不可以直接复制使用，需要自己请求获取
						url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token='+res,
						data: {
							scene: '000',
							page: ""  //这里按照需求设置值和参数   
						},
						method: "POST",
						responseType: 'arraybuffer',  //设置响应类型
						success(res) {
							var src2 = wx.arrayBufferToBase64(res.data);  //对数据进行转换操作
							that.img = "data:image/png;base64,"+src2
						},
						fail(e) {
							console.log(e)
						}
					})
				})
				
				
			}
		}
	}
</script>

<style scoped>
	@import url("./css/index.css");
</style>
