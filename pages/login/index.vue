<template>
	<view class="login">
		<ul class="login">
			<li>
				<view class="loginicon">
					<image src="../../static/image/tel.png"></image>
				</view>
				<input class="logininput" v-model="user.phone" type="tel" maxlength="11" placeholder="请输入手机号" />
				<view v-if="!user.codestatus" class="VerificationCode" @click="getphonecode">获取验证码</view>
				<view v-if="user.codestatus" class="VerificationCodeto">重新获取({{user.codetime}}s)</view> 
			</li>
			<li>
				<view class="loginicon">
					<image src="../../static/image/password.png"></image>
				</view>
				<input class="logininput" v-model="user.code" type="password" maxlength="4" placeholder="请输入短信中的验证码" />
			</li>
		</ul>
		<view class="Agreement">
			<checkbox value="" :checked="checkbox" color="#2D8AFE" class="checkboxinp" @click="checkboxsel"></checkbox>
			我已阅读并同意<text class="colorBule" @click="Licenseplate('Agreement')">《途邦互助用户协议》</text><text class="colorBule" @click="Licenseplate('Privacy')">《途邦互助隐私协议》</text>
		</view>
		<button v-if="user.status" class="loginbtnque"  @click="login">登录 / 注册</button> 
		<button v-if="!user.status" class="loginbtn">登录 / 注册</button>  
	</view>
</template>

<script>
	import { getcode,tubanglogin,getopenid } from '@/static/js/api.js';
	export default {
		data(){
			return{
				user:{
					phone:"",
					code:"",
					codestatus:false,
					codetime:60,
					status:false,
					fromid:null,
				},
				openid:"",
				checkbox:true
			}
		},
		onLoad:function(option){
			if(option.scene){
				this.user.fromid = decodeURIComponent(option.scene)
				console.log(this.user.fromid)
			}
		},
		onShow(){
			uni.removeStorageSync('token');
			uni.removeStorageSync('userId');
			uni.removeStorageSync('id');
			uni.removeStorageSync('customerPN');
			uni.removeStorageSync('status');
			uni.removeStorageSync('openid');
			let that = this 
			wx.login({
				// login获取code
				success:function(res){
					getopenid({
						code:res.code
					}).then((res)=>{
						that.openid = res.data
					})
					
				}
			})

		},
		methods:{
			getphonecode:function(){
				let that = this
				if(that.user.phone!==""){
					getcode({
						mobileNumber:that.user.phone +"_1"
					}).then((res)=>{
						if(res.code==="200"){
							uni.showToast({
								icon:"none",
							    title: '验证码已发送，请查收',
							    duration: 2000
							});
						}
					})
					that.user.codestatus = true
					if(that.user.codestatus){
						let timer = setInterval(()=>{
							if(that.user.codetime>0){
								that.user.codetime --
							}else{
								that.user.codestatus = false
								that.user.codetime = 60
								clearInterval(timer)
							}
						},1000)
					}
				}else{
					uni.showToast({
						icon:"none",
					    title: '请输入正确的手机号',
					    duration: 2000
					});
				}
			},
			login:function(){ 
				let that = this
				if(this.checkbox){
					tubanglogin({
						phoneAndCode:that.user.phone+"_"+that.user.code,
						fromUserName:that.openid
					}).then((res)=>{
						if(res.code==="200"){
							uni.setStorageSync('token', res.data.token);
							if(res.data.carList.length>0){
								uni.setStorageSync('id', Number(res.data.carList[0].id));
								uni.setStorageSync('userId', Number(res.data.carList[0].userId));
								uni.setStorageSync('customerPN', Number(res.data.carList[0].customerPN));
								uni.setStorageSync('amtCompensation', Number(res.data.carList[0].amtCompensation));
								uni.setStorageSync('status', Number(res.data.carList[0].status));
							}else{
								uni.setStorageSync('id', "");
								uni.setStorageSync('userId', "");
								uni.setStorageSync('customerPN', res.data.customerPN);
								uni.setStorageSync('amtCompensation',"");
								uni.setStorageSync('status', "");
							}
							uni.switchTab({
								url:"/pages/index/index"
							})
						}else{
							uni.showToast({
								icon:"none",
							    title: res.message,
							    duration: 2000
							});
						}
					})
				}else{
					uni.showToast({
						icon:"none",
					    title: "请阅读并同意协议",
					    duration: 2000
					});
				}
			},
			checkboxsel:function(){
				this.checkbox = !this.checkbox
			},
			//用户协议和隐私协议弹框显示
			Licenseplate:function (type){
				if(type=="Agreement"){
					uni.navigateTo({
						url:"/pages/login/user/index"
					})
				}
				if(type=="Privacy"){
					uni.navigateTo({
						url:"/pages/login/privacy/index"
					})
				}
			},
			// 关闭弹窗
			onAddrCancel:function(type){
				this.user.isAgreement=false
				this.user.Privacy=false
			}
		},
		watch:{
			user:{
				deep:true,
				handler:function(newval,oldval){
					if(newval.code!==""){
						newval.status = true
					}else {
						newval.status = false
					}
				}
			}
		}
	}
</script>

<style scoped>
  @import './css/index.css';
</style>
