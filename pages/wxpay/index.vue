<template>
	<view class="wxpay">
		<view class="fontposition">
			<text>支付金额</text>
			<text class="font-right">{{money}}元</text>
		</view>
		<view class="wxpayclick" @click="wxpay">立即支付</view>
	</view>
</template>

<script>
	import { md5 } from '@/static/js/md5.js' 
	// 获取 统一下单的方法
	import { getPrepay } from '@/static/js/login/wxlogin/index.js'
	// wx支付方法
	import { paymodewx } from '@/static/js/pay/wxpay/index.js'
	import { tubanglogin,wxPayCarResult } from '@/static/js/api.js'
	export default {
		data(){
			return{
				// 支付金额
				money:0.01, 
				nonceStr:md5(Math.ceil(Math.random()*1000).toString()).toUpperCase(),
				prepay_id:"",//统一下单
			}
		},
		onShow(){
			if(uni.getStorageSync('amtCompensation')<1000){
				this.money = 29
				console.log(this.money)
			}else{
				this.money = 99
				console.log(this.money)
			}
			getPrepay({
				moneny:parseInt( this.money * 100)
			}).then(res=>{
				this.prepay_id = res
			})
		},
		methods:{
			// 微信支付
			wxpay(){
				wxPayCarResult().then((res)=>{
					console.log(res)
				})
				paymodewx({
					nonce_str:this.nonceStr,
					prepay_id:this.prepay_id
				}).then(res=>{
					if(res === "200"){
						uni.setStorageSync('status',2)
						uni.showToast({
							icon:"none",
						    title: "支付成功",
						    duration: 2000
						});
						setTimeout(()=>{
							uni.redirectTo({
							    url: '/pages/wxpay/upload/index'
							});
						},1000)
					}else{
						uni.showToast({
							icon:"none",
						    title: "支付失败",
						    duration: 2000
						});
					}
				})
			}
		},
	}
</script>

<style>
	@import url("./css/index.css");
</style>
