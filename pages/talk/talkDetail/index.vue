<template>
	<view class="talkdetail">
			<!-- 车辆信息 -->
			<view class="car-info">
				<view class="left">
					<image :src="resdetail.accidentImg" alt="" class="talk-head-image">
				</view>
				<view class="right">
					<p>
						<text class="name">{{resdetail.fromName!=='undefined'?resdetail.fromName:"未留下姓名"}}</text>
						<text class="txt-yellow">{{resdetail.licensePlateNumber}}</text>
					</p>
					<p>
						<text class="icon ic1"></text>加入互助：{{resdetail.joinDay}}天
					</p>
					<p>
						<text class="icon ic2"></text>维修价格：{{resdetail.amtAssert}}元
					</p>
					<p>
						<text class="icon ic3"></text>全员预计分摊：{{resdetail.amtShare}}元
					</p>
				</view>
			</view>
			<!-- 车辆事故照片 -->
			<view>
				<view class="de-title">车辆事故照片</view>
				<p class="displayflex time-p">
					<text class="icon ic-location"></text>
				</p>
				<view class="car-item">
					<p class="time-line"></p>
					<view class="item-cont">
						<p class="txt-yellow">平台审核说明：审核通过，予以救助。会员特权升级活动火热进行中！请前往"我的会员卡—马上邀请"</p>
						<p class="txt-describe">车主事故描述：{{resdetail.accidentDescription}}</p>
						<ul class="image-ul clear">
							<!-- <li v-for="(item,index) in Swiperimage" :key="index" @click="windShow">
								{{item.url}}
								<view><image :src="item.url" ></view>
							</li> -->
							<li v-for="(item,index) in 1" :key="index" @click="windShow">
								<view>
									<image :src="resdetail.accidentImg" ></image>
								</view>
							</li>
						</ul>
					</view>
				</view>
			</view>
			<!-- 车辆定损 -->
			<view v-if="resdetail.statusEvent == 31 || resdetail.statusEvent == 41 || resdetail.statusEvent == 51 || resdetail.statusEvent == 52 || resdetail.statusEvent == 61 || resdetail.statusEvent == 71 || resdetail.statusEvent == 81 || resdetail.statusEvent == 100 ">
				<view class="de-title">车辆定损</view>
				<p class="displayflex time-p">
					<text class="icon ic-location"></text>{{time1}}
				</p>
				<view class="car-item">
					<p class="time-line"></p>
					<view class="item-cont">
						<view class="head displayflex">
							<image src="../../../static/image/indexbanner.png" />
						    <text>理赔管家 {{resdetail.maintenanceshopEmployeename1}}</text>
						</view>
						<ul class="txt-ul">
							<li>
								<text class="point"></text>
								<p class="situation">定损方</p>
								<p class="txt-detail">{{resdetail.maintenanceshopName1}}</p>
							</li>
							<li>
								<text class="point p1"></text>
								<p class="situation">订单号</p>
								<p class="txt-detail">{{resdetail.eventNo}}</p>
							</li>
							<li>
								<text class="point p2"></text>
								<p class="situation">定损价格</p>
								<p class="txt-detail">{{resdetail.amtAssert}}元</p>
							</li>
							<li>
								<text class="point p3"></text>
								<p class="situation">受损程度</p>
								<p class="txt-detail">{{resdetail.damageExtent}}</p>
							</li>
							<li>
								<text class="point"></text>
								<p class="situation">受损部位</p>
								<p class="txt-detail">{{resdetail.damagePosition}}</p>
							</li>
							<li>
								<text class="point p1"></text>
								<p class="situation">受损描述</p>
								<p class="txt-detail">{{resdetail.description}}</p>
							</li>
						</ul>
						<ul class="image-ul clear">
							<li v-for="(item,index) in 1" :key="index" @click="windShow">
								<view><image :src="resdetail.assertImg" ></view>
							</li>
						</ul>
					</view>
				</view>
			</view>
			<!-- 维修报告 -->
			<view v-if="resdetail.statusEvent == 61 || resdetail.statusEvent == 71 || resdetail.statusEvent == 81 || resdetail.statusEvent == 100 ">
				<view class="de-title">维修报告</view>
				<p class="displayflex time-p">
					<text class="icon ic-location"></text>{{time2}}
				</p>
				<view class="car-item">
					<p class="time-line"></p>
					<view class="item-cont">
						<p class="txt-describe">修复打磨</p>
						<ul class="image-ul clear">
							<li v-for="(item,index) in 1" :key="index" @click="windShow">
								<view><image :src="resdetail.repairImg" /></view>
							</li>
						</ul>
					</view>
				</view>
			</view>
			<!-- 车主评价 -->
			<view v-if="resdetail.statusEvent == 71">
				<view class="de-title">车主评价</view>
				<p class="displayflex time-p">
					<text class="icon ic-location"></text>{{time3}}
				</p>
				<view class="car-item">
					<p class="time-line"></p>
					<view class="item-cont">
						<view class="head displayflex">
							<image src="../../../static/image/indexbanner.png" />
						    <text class="font16">{{resdetail.maintenanceshopName2}}</text>
							<image src="http://tb.jytat.net/hfive/image/icon_vip2.png" class="icon-V" />
						</view>
						<view class="displayflex star-box">
							<p>服务评分：</p>
							<text class="star" v-for="item in resdetail.commentScore" :key="item" ></text>
							
							<p>{{resdetail.commentScore}}星</p>
						</view>
						<p class="txt-describe evaluate-txt">车主评价：</p>
						<view class="evaluate" v-for="item in resdetail.commentLabelContent" :key="item">
							<text>{{item}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 图片放大 -->
			<view class="windbg" v-if="isshow" @click="windShow">
				<view class="uni-margin-wrap">
					<swiper
						class="card-swiper"
						:indicator-dots="true"
						:circular="true"
						duration="500"
						indicator-color="#ffffff"
						indicator-active-color="#0081ff"
					>
						<swiper-item v-for="(item, index) in SwiperImg" :key="index">
							<view class="swiper-item">
								<image :src="item.url" mode="aspectFill"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
</template>

<script>
	import { publicitydetail } from '@/static/js/api.js';
	import { formatDate } from '@/static/js/date.js'
	export default {
		data(){
		    return{
				eventNo:"",
				resdetail:{
					assertEndTime:{
						time:0
					},
					repairEndTime:{
						time:0
					},
					commentTime:{
						time:0
					},
					joinDay:0,
					amtAssert:0,
					amtShare:0,
					accidentDescription:"暂无信息",
					maintenanceshopEmployeename1:"暂无信息",
					maintenanceshopName1:"暂无信息",
					eventNo:"暂无信息",
					amtAssert:"0",
					damageExtent:"暂无信息",
					damagePosition:"暂无信息",
					description:"暂无信息",
					commentLabelContent:['暂无信息'],
					commentScore:0
				},
				isshow:false,
				index:"",
				starList:[0,1,2,3,4],
		        SwiperImg:[
					{
						type:"image",
						url:"../../../static/image/indexbanner.png"
					},
					{
						type:"image",
						url:"../../../static/image/indexbanner.png"
					},
					{
						type:"image",
						url:"../../../static/image/indexbanner.png"
					},
					{
						type:"image",
						url:"../../../static/image/indexbanner.png"
					},
					{
						type:"image",
						url:"../../../static/image/indexbanner.png"
					}
				]
		    }
		},
		onLoad:function(option){
			this.eventNo = option.eventNo
		},
		onShow(){
			this.api()
		},
		computed:{
			// 车辆定损
			time1:function(){
				if(this.resdetail.assertEndTime.time){
					return formatDate(new Date(Number(this.resdetail.assertEndTime.time)),'yyyy年MM月dd日')
				}
			},
			// 维修报告
			time2:function(){
				if(this.resdetail.repairEndTime.time){
					return formatDate(new Date(Number(this.resdetail.repairEndTime.time)),'yyyy年MM月dd日')
					
				}
			},
			// 车主评价
			time3:function(){
				if(this.resdetail.commentTime.time){
					return formatDate(new Date(Number(this.resdetail.commentTime.time)),'yyyy年MM月dd日')
				}
			}
		},
		methods: {
			
			api(){
				publicitydetail({
					eventNo:this.eventNo
				}).then((res)=>{
					this.resdetail = res.data
					if(this.resdetail.commentLabelContent){
						this.resdetail.commentLabelContent = this.resdetail.commentLabelContent.split('_')
					}
					
				})
			},
			back() {
				this.$router.go(-1);
			},
			windShow(){
				this.isshow=!this.isshow
			}
		},
	}
</script>

<style>
	@import url("./css/index.css");
	.uni-margin-wrap {
		height:100%;
	 	margin:0 0upx;
	 }
	 .card-swiper{
		height: 75%;
		width: 100%;
		margin-top: 300upx;
	 }
	 .swiper-item {
	 	display: block;
	    line-height: 300upx;
	 	text-align: center;
	 }
	 .swiper-item image{
		width: 100% !important;
	 }
	 /*图片宽度设置100% ，高度300upx（设为auto图片无法显示）*/
	 .swiper-image{  
	     width:100%;  
	     height:100%; 
	 } 
</style>
