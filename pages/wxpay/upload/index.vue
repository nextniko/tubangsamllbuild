<template>
	<view class="upload">
		<view>
			<view class="text_head">温馨提示：</view>
			<view class="text_red">A 爱车照片拍的越标准越清晰，更有助于后期理赔；</view>
			<view class="text_red">B 旧伤车可加入互助，旧伤部位不在保障范围内；</view>
			<view class="text_red">C 为保护会员权益，补充资料后需平台审核，请留意短信消息推送~谢谢您</view>
		</view>
		<view v-for="(item,index) in image" @click="chooseImage(index)" :key="index">
			<image class="imageblock" :src="item.url" mode=""></image>
		</view>
		<view class="buttonsubmit" @click="submit">提交</view>
		
	</view>
</template>

<script>
	import { uploadimg,tubanglogin } from '@/static/js/api.js'
	export default{
		data(){
			return{
				image:[
					{
						name:"",
						url:'http://tb.jytat.net/hfive/img/default_car_qd.jpg'
					},
					{
						name:"",
						url:'http://tb.jytat.net/hfive/img/default_car_yq.jpg'
					},
					{
						name:"",
						url:'http://tb.jytat.net/hfive/img/default_car_yc.jpg'
					},
					{
						name:"",
						url:'http://tb.jytat.net/hfive/img/default_car_yh.jpg'
					},
					{
						
						name:"",
						url:'http://tb.jytat.net/hfive/img/default_car_zh.jpg'
					},
					{
						name:"",
						url:'http://tb.jytat.net/hfive/img/default_car_zc.jpg'
					},
					{
						name:"",
						url:'http://tb.jytat.net/hfive/img/default_car_zq.jpg'
					},
					{
						name:"",
						url:'http://tb.jytat.net/hfive/img/license_sample.jpg'
					}
				],
			}
		},
		onShow(){
			console.log('上传图片')
		},
		methods:{
			chooseImage(index) {
				let that = this
				uni.showLoading({
					title:"加载中"
				})
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'], //从相册选择
					success:  res => {
						that.image[index].url = res.tempFilePaths[0];
						uni.getFileSystemManager().readFile({
							filePath: res.tempFilePaths[0], //选择图片返回的相对路径
							encoding: 'base64', //编码格式
							success: res => { //成功的回调
								let base64 = 'data:image/jpeg;base64,' + res.data //不加上这串字符，在页面无法显示的哦
								let bas64up = res.data
								that.image[index].name = bas64up;
								console.log(that.image[index].name)
								uni.hideLoading();
							}
						});
						
					}
				});
			},
			// 转换base64
			urlTobase64(url,index) {
				let that = this
				
			},
			// 提交照片
			submit(){
				
				// if(status){
				// 	uni.showToast({
				// 		icon:"none",
				// 	    title: "请上传所需要的所有照片",
				// 	    duration: 2000
				// 	});
				// }else{
					let img= []
					this.image.map(item=>{
						img.push(item.name)
					})
					uni.showLoading({
					    title: '上传中'
					});
					uploadimg({
						//base:JSON.stringify(img),
						base:JSON.stringify(img),
						flag:"1",
						id:uni.getStorageSync('id'),
						token:uni.getStorageSync('token'),
					}).then(res=>{
						uni.hideLoading();
						if(res.code === "200"){
							if(res.data ==="SUCCESS"){
								uni.showToast({
									icon:"none",
								    title: "上传成功",
								    duration: 2000
								});
								uni.setStorageSync('status',10)
								setTimeout(function(){
									uni.switchTab({
										url:"/pages/index/index"
									})
								},2000)
							}else{
								uni.showToast({
									icon:"none",
								    title: res.message,
								    duration: 2000
								});
							}
						}
					})
				// }
			}
		}
	}
</script>

<style>
	@import url("./css/index.css");
</style>
