<template>
	<view class="talk">
		<view class="talkTop">
			<!-- 账户公示 -->
			<view class="talk-box displayflex">
				<view>
					<p class="txt-yellow">￥{{resdetail.detailheader.amtTotal?resdetail.detailheader.amtTotal:"0"}}</p>
					<p class="txt-color58">互助金余额</p>
				</view>
				<view>
					<p class="txt-yellow">￥{{resdetail.detailheader.amtPaid?resdetail.detailheader.amtPaid:"0"}}</p>
					<p class="txt-color58">互助支出</p>
				</view>
				<view>
					<p class="txt-yellow">{{resdetail.detailheader.finishCount?resdetail.detailheader.finishCount:"0"}}件</p>
					<p class="txt-color58">已互助</p>
				</view>
			</view>
		</view>
		<p class="talklist">互助事件公示</p>
		<view class="zhedie">
			<ul>
			  <li class="talk-li" v-for="(item,index) in resdetail.detaillist.list" :key="index" @click="navigateto(item.eventNo)">
				<view class="talk-limg">
					<image :src="item.portrait" alt="" class="talk-head-img">
				</view>
				<view class="talk-text">
				  <p class="talk-tel">
					<text>{{item.nameCarOwner?item.nameCarOwner:"未留下姓名"}}</text>
					<text class="txt-yellow">· {{item.licensePlateNumber?item.licensePlateNumber:"0"}}</text>
				  </p>
				  <p class="talk-price">维修价格：<text class="txt-color58">{{item.amtAssert?item.amtAssert:"0"}}元</text></p>
				  <p class="talk-tel">
					  <label>全员预计分摊：<text class="txt-color58">{{item.amtShare?item.amtShare:"0"}}元</text></label>
					  <text class="talk-arrow"></text>
					</p>
				</view>
			  </li>
			</ul>
		</view>
		<view class="nomore" v-if="!pullstatus">已显示全部</view>
	</view>
</template>
<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import { publicityList,publicity } from '@/static/js/api.js'
	export default {
		components: {
			uniLoadMore
		},
		data(){
			return{
				resdetail:{
					pageNo:1,
					detailheader:{
						amtTotal:0,
						amtPaid:0,
						finishCount:0
					},
					detaillist:{
						list:[
							{
								amtAssert:"",
								amtShare:"",
								customerId:"",
								customerPN:"",
								eventNo:"",
								level:"",
								licensePlateNumber:"",
								model:"",
								nameCarOwner:"" 
							}
						]
					}
				},
				pullstatus:true

			}
		},
		onShow(){
			
			this.api()
		},
		onLoad: function (options) {
			
			uni.startPullDownRefresh();
		},
		methods:{
			api:function(){
				this.resdetail.pageNo = 1
				this.pullstatus = true
				publicityList({
					pageNo:this.resdetail.pageNo,
					flag:"2",
				}).then((res)=>{
					if(res.code==="200"){
						this.resdetail.detaillist = res.data
					}else{
						uni.showToast({
							icon:"none",
						    title: res.message,
						    duration: 2000
						});
					}
					
				})
				publicity({
					
				}).then((res)=>{
					if(res.code==="200"){
						this.resdetail.detailheader = res.data
					}else{
						uni.showToast({
							icon:"none",
						    title: res.message,
						    duration: 2000
						});
					}
				})
			},
			navigateto:function(eventNo){
				uni.navigateTo({
					url:"/pages/talk/talkDetail/index?eventNo="+eventNo 
				})
			},
		},
		onPullDownRefresh:function() {
			this.api()
		},
		onReachBottom: function() {
			if(this.pullstatus){
				uni.showLoading({
				    title: '加载中'
				});
				this.resdetail.pageNo++
				publicityList({
					pageNo:this.resdetail.pageNo,
					flag:"2",
				}).then((res)=>{
					uni.hideLoading();
					if(res.code==="200"){
						res.data.list.map(item=>{
							this.resdetail.detaillist.list.push(item)
						})
						if(res.data.list.length===0){
							uni.showToast({
								icon:"none",
								title: "没有更多了",
								duration: 2000
							});
							this.pullstatus = false
						}
					}
					
				})
			}else{
				return
			}
		}
	}
</script>
<style scoped>
	@import "./css/index.css";
</style>