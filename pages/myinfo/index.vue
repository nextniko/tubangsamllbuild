<template>
	<div class="myinfo">
		<view :class="status.token ==''?'myinfoheadA':'myinfohead'">
			<!-- 默认图标 -->
			<img  @click="gologin" v-if="status.token ==='' || status.code!=='200'" src="@/static/image/heade.png" class="myheadimg">
			<!-- 用户头像 -->
			<img v-if="status.token !=='' && status.code==='200'" :src="resdetail.myinfo.portrait" class="myheadimg">
			<p v-if="status.token==='' || status.code!=='200'" class="myheadtxt" @click="gologin">登录 | 注册</p>
			<div v-if="status.token!=='' && status.code==='200'" class="myheadboxtxt" @click="gotoaddcar">
				<p class="mymoney">
					<label>{{resdetail.myinfo.customerPN}}</label>
					<text v-if="resdetail.myinfo.carList[0].status!==20&&resdetail.myinfo.carList.length!=0" class="myheadrigght" :class="resdetail.myinfo.carList[0].status!==20?'coloryellow':''">未保障中</text>
					<text v-if="resdetail.myinfo.carList[0].status==20&&resdetail.myinfo.carList.length!=0" class="myheadrigght" :class="resdetail.myinfo.carList[0].status==20?'coloryellow':''">保障中</text>
				</p>
				<p class="coloryellow">{{resdetail.myinfo.carList[0].licensePlateNumber}}</p> 
				<p class="mymoney" v-if="resdetail.myinfo.carList.length>0">
					<label>
						救助剩余额度：<span class="coloryellow">{{resdetail.myinfo.carList[0].amtCompensation}}</span>元
					</label>
					<text v-if="resdetail.myinfo.carList[0].status===20"  class="myguaranteetime">已加入互助{{resdetail.myinfo.joinDay}}天</text>
				</p>
				<p class="mymoney">
					<text v-if="resdetail.myinfo.carList.length==0" class="coloryellow">未绑定车辆</text>
					<text v-if="resdetail.myinfo.carList.length==0&&status.token!==''" class="myguaranteetime coloryellow" @click="gotoadd">立即绑定 》</text>
				</p>
			</div>
		<!-- <p  class="myheadtime coloryellow">立即绑定》</p> -->
		<!-- <p v-if="status.havecar&&status.token!==''" class="myheadtime coloryellow">立即绑定》</p> -->
		</view >
		<ul class="myul">
			<li v-if="status.token!=='' && status.code==='200'">
				<div class="myuldiv">
					<i class="myicon">
						<img src="@/static/image/account.png"></img>
					</i>
					<span>我的账户</span>
				</div>
				<span>￥{{resdetail.myinfo.totalCooperation?resdetail.myinfo.totalCooperation:"0"}}元</span>
			</li>
			<!-- <li v-if="status.token!=='' && status.code==='200'">
				<div class="myuldiv">
					<i class="myicon">
						<img src="@/static/image/code.png"></img>
					</i>
					<span>邀请码</span>
				</div>
				<span class="nologinarrorright"></span>
			</li> -->
			<li @click="tel">
				<div class="myuldiv">
					<i class="myicon">
						<img src="@/static/image/tel1.png"></img>
					</i>
					<span>客服电话</span>
				</div>
				<span>400-806-1777</span>
			</li>
		</ul>
		<button v-if="status.token!=='' && status.code==='200'" class="mybtn" @click="gologin">退出登录</button>
	</div>
</template>
<script>
	import { goUserDetail,carList } from '@/static/js/api.js'
	export default {
		data(){
			return{
				status:{
					token:"",
					code:"",
					addstatus:true
				},
				resdetail:{
					myinfo:{}, 
					carList:{}
				},
				
			}
		},
		onShow(){
			this.status.token = uni.getStorageSync('token');
			this.api()
		},
		methods:{
			api(){
				uni.showLoading({
				    title: '加载中'
				});
				goUserDetail({
					token:this.status.token
				}).then((res)=>{
					uni.hideLoading();
					this.status.code = res.code 
					if(res.code ==="200"){
						this.resdetail.myinfo = res.data
					}else{
						uni.removeStorageSync('token')
						uni.removeStorageSync('userId');
						uni.removeStorageSync('id');
						uni.removeStorageSync('customerPN');
						uni.removeStorageSync('status');
						uni.removeStorageSync('openid');
						this.status.token = ""
						this.status.code = ""
					}
				})
			},
			gologin(){
				uni.navigateTo({
					url:"/pages/login/index"
				})
			},
			//拨打电话
			tel() {
				uni.makePhoneCall({
					phoneNumber: '400-806-1777' //仅为示例
				});
			},
			gotoadd(){
				if(this.status.addstatus){
					this.status.addstatus = false
					uni.navigateTo({
						url:"/pages/addcar/index"
					})
					this.status.addstatus = true
				}
			},
			gotoaddcar(){
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
						    title: "登录超时，请登录",
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
			}
		}
	}
</script>
<style scoped>
	@import url("./css/index.css");
</style>