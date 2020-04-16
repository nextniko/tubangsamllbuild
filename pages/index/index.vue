<template>
	<view class="index">
		<view class="addheader">
			<img src="/static/image/indexbanner.png" alt="">
			<ul>
				<li>
					<p>{{resdetail.amtPaid}}</p>
					<p>注册会员</p>
				</li>
				<li>
					<p>{{resdetail.carCount}}</p>
					<p>保障车辆</p>
				</li>
				<li @click="gohelp">
					<p>{{resdetail.finishCount}}</p> 
					<p>已互助</p>
				</li>
			</ul>
		</view>
		<view class="adddouble">
			<view @click="gotoadd">
				<image src="../../static/image/indexadd.png"></image>
				<text>加入互助</text>
			</view>
			<view @click="download">
				<image src="../../static/image/indexhelp.png"></image>
				<text>擦挂救助</text>
			</view>
		</view>
		<view class="addfn">
		  <p class="addcommontitle addtitletext">
			<text class="addtitlemargin">加入规则</text>
			<image src="../../static/image/indexsee.png" mode=""></image>
		  </p>
		  <view class="addfncol">
			<view class="addfncolitem">
			  <uni-collapse >
			      <uni-collapse-item title="加入条件 : 首充99元立享1000元维修金" showAnimation="true">
			          <view style="padding: 30upx;line-height: 2;font-size: 24upx;"> 加入条件：7座及以下的轿车、越野车、商务车、面包车均可加入（货车、公交车、特种车不能加入）； </view>
			      </uni-collapse-item>
				  <uni-collapse-item title="互助范围 : 车门 保险杠 翼子板 后视镜 车顶等" showAnimation="true">
					  <view style="padding: 30upx;line-height: 2;font-size: 24upx;"> 通过30天观察期，进入保障中的新伤可救助，车门、保险杠、翼子板、后视镜、车顶的损坏可救助；旧伤车可加入，但旧伤不在救助范围；根据保险法财产损失不获利原则的规定，互助与保险不可同时享受。 </view>
					
				  </uni-collapse-item>
				  <uni-collapse-item title="分摊金额 : 每次分摊不超过1毛钱" showAnimation="true">
					  <view style="padding: 30upx;line-height: 2;font-size: 24upx;"> 互助分摊金=定损价÷保障车辆数，如果分摊金额超过0.1元，超出部分由车主自己承担。（如：小鹿发生了一起小擦挂事故，定损价为600元，保障车辆数为5000，每人分摊金额为：600÷5000>0.1元，则会员分摊金额为0.1元，小鹿自己承担100元） </view>
					 
				  </uni-collapse-item>
			  </uni-collapse>
			</view>
		  </view>
		</view>
		<view class="addhave">
			<p class="addcommontitle addtitletext">
			  <text class="addtitlemargin">互助优势</text>
			  <image src="../../static/image/indexsee.png" mode=""></image>
			</p>
			<view class="addhaveimg">
			  <image src="../../static/image/indexnice_1.png" mode=""></image>
			  <image src="../../static/image/indexnice_2.png" mode=""></image>
			</view>
		</view>
		<view class="addque">
		  <p class="addcommontitle addtitletext">
			<text class="addtitlemargin">常见问题</text>
			<image src="../../static/image/indexsee.png" mode=""></image>
		  </p>
		  <view class="addfncol">
			<view class="addfncolitem">
				 <uni-collapse @change="change">
					 <uni-collapse-item title="Q1 途邦互助是干什么的" showAnimation="true">
						 <view style="padding: 30rpx;line-height: 2;font-size: 24upx;"> 途邦互助是专门解决车辆小擦挂的维修互助平台，维修范围包括会员车辆车门、保险杠、翼子板、后视镜、车顶的损坏。 </view>
					 </uni-collapse-item>
					 <uni-collapse-item title="Q2 多少钱加入？" showAnimation="true">
						 <view style="padding: 30rpx;line-height: 2;font-size: 24upx;"> 现在新用户体验价99元，立享1000元维修补贴。 </view>
					 </uni-collapse-item>
					 <uni-collapse-item title="Q3 一年最多充多少钱？" showAnimation="true">
						 <view style="padding: 30rpx;line-height: 2;font-size: 24upx;"> 首充99元即可享受互助维修，费用不足时及时充值。 </view>
					 </uni-collapse-item>
					 <uni-collapse-item v-if="indexstatus.more" title="Q4 你们这个怎么分摊的？？" showAnimation="true">
					 	<view style="padding: 30rpx;line-height: 2;font-size: 24upx;"> 我们是“一人维修，全员分摊”，每次分摊金额不超过1毛钱，会员量越大分摊越少，最少1分钱。 </view>
					 </uni-collapse-item>
					 <uni-collapse-item v-if="indexstatus.more" title="Q5 车子有旧伤可以加入吗？" showAnimation="true">
					 	<view style="padding: 30rpx;line-height: 2;font-size: 24upx;"> 可以加入，但是旧伤不在保障范围内，加入后的新伤可正常享受互助维修，30天观察期后造成的新伤可正常享受互助维修。 </view>
					 </uni-collapse-item>
					 <uni-collapse-item v-if="indexstatus.more" title="Q6 成为会员后可以立刻维修吗？" showAnimation="true">
					 	<view style="padding: 30rpx;line-height: 2;font-size: 24upx;"> 成功加入后有30天观察期，过观察期后如果出现事故，就可立即申请维修。 </view>
					 </uni-collapse-item>
					 <uni-collapse-item v-if="indexstatus.more" title="Q7 会不会定损价很高？" showAnimation="true">
					 	<view style="padding: 30rpx;line-height: 2;font-size: 24upx;"> 不会，我们跟认证维修厂签订了保价协议，承诺不高于市场价，每起事故均有公示，会员共同监督。 </view>
					 </uni-collapse-item>
					 <uni-collapse-item v-if="indexstatus.more" title="Q8 我又没有出险，我为什么要跟别人一起分摊？" showAnimation="true">
					 	<view style="padding: 30rpx;line-height: 2;font-size: 24upx;"> 互助的理念就是“人人帮我，我帮人人”，权利和义务是对等的，每个人既享受他人帮助你的权利；同时也应尽到帮助他人的义务，跟买保险一个道理。 </view>
					 </uni-collapse-item>
					 <uni-collapse-item v-if="indexstatus.more" title="Q9 99元能用多久？" showAnimation="true">
					 	<view style="padding: 30rpx;line-height: 2;font-size: 24upx;"> 99元是平台推出的低门槛体验，以目前保障车辆预计分摊1年，余额为0之前请及时续充，如余额不足即视为主动退出互助计划，将不再享受互助，待续充后可继续享受。 </view>
					 </uni-collapse-item>
					 <uni-collapse-item v-if="indexstatus.more" title="Q10 申请理赔的时候需要有事故现场吗？" showAnimation="true">
					 	<view style="padding: 30rpx;line-height: 2;font-size: 24upx;"> 是的，需要用户打开途邦互助→发起理赔→描述事故经过和受损部位→按照模板拍摄事故现场，上传照片，提交互助申请。（需要现场拍照上传，不能调用相册。） </view>
					 </uni-collapse-item>
					 <uni-collapse-item v-if="indexstatus.more" title="Q11 平台提供免费接送车服务吗？" showAnimation="true">
					 	<view style="padding: 30rpx;line-height: 2;font-size: 24upx;"> 提供，10公里范围内免费接送车；超过10公里，费用由用户承担。虽全国范围内我们已覆盖近700+家维修厂，但难免有接车地点太远情况出现，自费金额由平台与维修厂协商。 </view>
					 </uni-collapse-item>
					 <uni-collapse-item v-if="indexstatus.more" title="Q12 不予救助的常见情况有哪些？" showAnimation="true">
					 	<view style="padding: 30rpx;line-height: 2;font-size: 24upx;"> 不予救助的范围包括：加入之前的旧伤和旧伤面产生的新伤、非碰撞和擦挂导致的单独划痕、车灯、轮胎、轮毂、玻璃、底盘、新增设备和车内零部件。</view>
					 </uni-collapse-item>
					 <uni-collapse-item v-if="indexstatus.more" title="Q13 缴纳互助金后，实际到账多少？" showAnimation="true">
					 	<view style="padding: 30rpx;line-height: 2;font-size: 24upx;"> 到账90%。缴纳互助金后，车辆在进入保障时，平台扣除10%的管理费，剩余的90%到账互助金余额。 </view>
					 </uni-collapse-item>
				 </uni-collapse>
			</view>
			<view class="more" @click="clickmore">
				<image :src="indexstatus.img" mode=""></image>
			</view>
		  </view>
		</view>
		<view class="indexDownBox" @click="gotoadd">
			<image src="../../static/image/download.png"></image>
		</view>
	</view>
</template>
<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue';
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue';  
	import { indexinfo,goUserDetail,publicity } from '@/static/js/api.js'
	export default {
	    components: {uniCollapse,uniCollapseItem}, 
		data(){
			return{
				resdetail:{
					amtPaid: 0,
					carCount: 0,
					eventCount: 0,
					finishCount:0
				},
				indexstatus:{
					more:false,
					text:"",
					img:"../../static/image/pullmore.png",
					addstatus:true
				}
			}
		},
		onShow(){
			indexinfo({}).then((res)=>{
				if(res.code === "200"){
					this.resdetail.amtPaid = res.data.amtPaid
					this.resdetail.carCount = res.data.carCount
					this.resdetail.eventCount = res.data.eventCount
				}
				
			})
			publicity({
				
			}).then((res)=>{
				if(res.code==="200"){
					this.resdetail.finishCount = res.data.finishCount
				}
			})
		},
		methods:{
			gohelp(){
				uni.switchTab({
					url:"/pages/talk/index"
				})
			},
			download(){
				uni.navigateTo({
					url:"/pages/index/download/download"
				})
			},
			gotoadd(){
				uni.showLoading({
				    title: '搜索车辆信息'
				});
				goUserDetail({
					token:uni.getStorageSync("token")
				}).then((res)=>{
					uni.hideLoading();
					if(res.code ==="200"){
						if(res.data.carList.length>0){
							uni.setStorageSync('id', Number(res.data.carList[0].id));
							uni.setStorageSync('userId', Number(res.data.carList[0].userId));
							uni.setStorageSync('customerPN', Number(res.data.carList[0].customerPN));
							uni.setStorageSync('amtCompensation', Number(res.data.carList[0].amtCompensation));
							uni.setStorageSync('status', Number(res.data.carList[0].status));
							uni.navigateTo({
								url:"/pages/carinfo/index"
							})
						}else{
							uni.setStorageSync('id', "");
							uni.setStorageSync('userId', "");
							uni.setStorageSync('customerPN', res.data.customerPN);
							uni.setStorageSync('amtCompensation',"");
							uni.setStorageSync('status', "");
							uni.navigateTo({
								url:"/pages/addcar/index"
							})
						}
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
			clickmore(){
				this.indexstatus.more = !this.indexstatus.more
				this.indexstatus.more?this.indexstatus.img ="../../static/image/pullcallback.png":this.indexstatus.img ="../../static/image/pullmore.png"
			}
		}
	}
</script>
<style scoped>
	@import url("./css/index.css");
</style>