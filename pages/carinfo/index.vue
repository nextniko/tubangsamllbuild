<template>
	<view class="carinfo">
		<view class="guaranteebox">
			<view class="LicensePlate">
				<text>{{resdetail.list[0].licensePlateNumber}}</text>
				<text class="GcolorBlue">{{status.textstatus}}</text>
			</view>
			<view class="GuaranteeCity">
				行驶城市：<text>{{resdetail.list[0].drvingCity}}</text>
			</view>
			<view class="GuaranteeCity">
				{{status.value===20?'已成功获得救助金：':'加入成功可获得救助额度：'}}<text>1000元</text>
			</view>
			<button v-if="status.value === 1" class="GbtnBox paybutton" @click="gourl('pay')">支付</button>
			<button v-if="status.value === 1 || status.value === 2 || status.value === 12" class="GbtnBox" @click="gourl(status.value)">{{status.buttonstatus}}</button> 
		</view>
	</view>
</template>

<script>
	import { carList,goUserDetail } from '@/static/js/api.js'
	export default {
		data(){
			return{
				status:{
					textstatus:"",
					value:null,
					buttonstatus:""
				},
				resdetail:{
					
				}
			}
		},
		onShow(){
			this.getstatus()
			this.bindCar()
		},
		methods:{
			bindCar(){
				uni.showLoading({
				    title: '加载中'
				});
				goUserDetail({
					token:uni.getStorageSync("token")
				}).then((res)=>{
					if(res.code ==="200"){
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
						carList({
							token:uni.getStorageSync('token'),
							status:uni.getStorageSync('status'),
							pageNo:"1"
						}).then((res)=>{
							uni.hideLoading();
							this.resdetail = res.data
						
						})
					}else{
						uni.showModal({
							title: '提示',
						    title: "尚未登录，请登录",
						    success: function (res) {
								if (res.confirm) {
									uni.navigateTo({
										url:"/pages/login/index"
									})
								} else if (res.cancel) {
									
								}
							}
						});
					}
				})
			},
			getstatus(){
				let serverstatus = parseInt(uni.getStorageSync('status'))
				// 数据状态 1.添加行驶证完成，待支付 2支付完成，待添加照片  10.为审核中 11.审核通过 12.审核不通过 13观察期 20.为保障中 30.已退出  31.不可用',
				switch(serverstatus){
					case 1:
						this.status.textstatus = "待支付"
						this.status.value = serverstatus
						this.status.buttonstatus = "修改车辆信息"
						break;
					case 2:
						this.status.textstatus = "待传车辆图片"
						this.status.value = serverstatus
						this.status.buttonstatus = "上传车辆图片"
						break;
					case 10:
						this.status.textstatus = "待审核"
						this.status.value = serverstatus
						break;
					case 11:
						this.status.textstatus = "非保障中"
						this.status.value = serverstatus
						break;
					case 12:
						this.status.textstatus = "未通过"
						this.status.value = serverstatus
						this.status.buttonstatus = "重新上传车辆图片"
						break;
					case 13:
						this.status.textstatus = "非保障中"
						this.status.value = serverstatus
						break;
					case 20:
						this.status.textstatus = "保障中"
						this.status.value = serverstatus
						break;
					default:
						console.log(this.status.buttonstatus)
						break;
				}
			},
			gourl(url){
				let urlnavi = ""
				switch(url){
					case "pay":
					// 支付
						urlnavi = "/pages/wxpay/index"
						break;
					case 1:
					// 修改车辆
						urlnavi = "/pages/addcar/index?mode=update"
						break
					case 2:
					// 上传图片
						urlnavi = "/pages/wxpay/upload/index"
						break
					case 12:
					// 未通过审核上传图片
						urlnavi = "/pages/wxpay/upload/index"
						break
					default:
						break;
				}
				uni.navigateTo({
					url:urlnavi
				})
			}
		}
	}
</script>

<style scoped>
	@import url("./css/index.css");
</style>
