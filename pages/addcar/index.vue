<template>
	<view class="addcar">
		<ul class="BindVehicle">
				<li @click="Licenseplate('city')">
					<text>行驶城市</text>
					<view class="BindVehicleCity">
						<text>{{Vehicle[0].txt}} <text v-if="Vehicle[1].txt!=''">></text> {{Vehicle[1].txt}}</text>
						<text class="BindVehiclearrow"></text>
					</view>
				</li>
				<li>
					<text>车牌号</text>
					<view class="CIchoosebox">
						<text class="CIregion" @click="Licenseplate('number')">{{text}}</text>
						<input v-model="Cityid.carnumber" type="text" maxlength="6" placeholder="请输入车牌号码" class="BindVehicleNumber" />
					</view>
				</li>
		</ul>
		<p class="BindVehicleTips">*请认证核对车牌，提交后无法修改</p>
		<view class="BindVehicleBox">
		<view class="Agreement">
			<checkbox value="" :checked="checkedbox" color="#2D8AFE" class="checkboxinp" @click="checkboxsel"></checkbox>
			我已阅读并同意<text class="colorBule" @click="Licenseplate('Agreement')">《途邦互助使用协议》</text> 
		</view>
		<button v-if="Cityid.provinceid ==='' ||Cityid.cityid ===''|| Cityid.carnumber ===''" class="loginbtn">确定</button>
		<button v-if="Cityid.provinceid!=='' && Cityid.cityid!==''&& Cityid.carnumber!==''" class="loginbtnselect" @click="addCar">确定</button>
		</view>
		<!-- 车牌号弹窗  -->
		<view class="CIwindow" v-show="isregion">
			<view class="CIwindbox">
				<p class="title">
					<text :class="list[0].status?'active':''" @click="checktext">{{list[0].name}}</text>
					<text :class="list[1].status?'active':''" v-if="list[1].status" @click="checktext">{{list[1].name}}</text>
					<i @click="onAddrCancel('number')">x</i>
				</p>
				<ul class="CItxtchoose" v-if="list[0].status">
					<li v-for="(item,index) in list[0].value" :key="index" @click="checkTxt(item,'number')">{{item}}</li>
				</ul>
				<ul class="CItxtchoose" v-if="list[1].status">
					<li v-for="(item,index) in list[1].value" :key="index" @click="checkEn(item,'number')">{{item}}</li>
				</ul>
			</view>
		</view>
		<!-- 行驶城市弹窗 -->
		<view class="VehicleNumberBox" v-show="isVehicle">
			<view class="Vehiclebox">
				<p class="Vehicletitle">
					<text class="Vehicleleftarrow">
						<i v-if="arrow" @click="backprovince"></i>
					</text>
					<text>{{Vehicletitle}}</text>
					<i @click="onAddrCancel('city')">x</i>
				</p>
				<ul class="Vehicleprovince" v-if="Vehicle[0].status">
					<li v-for="(item,index) in Vehicle[0].value" :key="index" :id=item.id @click="checkTxt(item,'city')">{{item.name}}</li>
				</ul>
				<ul class="Vehicleprovince" v-if="Vehicle[1].status">
					<li v-for="(item,index) in Vehicle[1].value" :key="index" :id=item.id @click="checkEn(item,'city')">{{item.name}}</li>
				</ul>
			</view>
		</view>
		<view class="AgreementBox" v-show="isAgreement">
			<view id="wrapper" class="AgreementBoxinfo">
				<view id="scroller">
					<p class="title">
						重要提示
						<text class="Agreementclose" @click="onAddrCancel('Agreement')">x</text>
					</p>
					<p class="small_title">A 加入条件</p>
					<p class="space">（1）面包车、营运车、公车、租赁车暂不能加入</p>
					<p class="small_title">B 救助范围</p>
					<p class="space">（1）通过30天观察期，进入保障中的新伤可救助</p>
					<p class="space">（2）车身、车门、保险杠、翼子板、车顶、外后视镜可救助</p>
					<p class="space">（3）划痕、车灯、灯罩、轮毂、底盘、玻璃、轮胎、车内零部件等均不可救助</p>
					<p class="space">（4）进入保障之前的旧伤，以及旧伤面上的新伤均不在救助范围</p>
					<p class="small_title">C 充值（用于分摊）</p>
					<p class="space">（1）每起事故分摊不超过0.1元</p>
					<p class="space">（2）您享受救助维修的前提是保持账户余额不低于0.1元</p>
					<p class="space">（3）余额不足则退出互助计划，再次充值重新进入观察期</p>
					<p class="small_title">D 救助车辆会在平台永久公示，请全员监督，保持互助的公平公正</p>
					<p class="small_title">E 杜绝一切作假舞弊行为，一经发现，立刻取消一切权益并追偿所有经济损失</p>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { servicecity,addcar,tubanglogin } from '@/static/js/api.js'
	export default{
		data(){
			return{
				checkedbox:true,
				isAgreement:false,//使用协议弹窗显示
				isregion:false,//车牌号弹框显示
				addstatus:true,
				list:[
					{
						status:false,
						name:"请选择",
						value:['川','京','津','沪','渝','冀','豫','云','辽','黑','湘','皖','鲁','新','苏','浙','赣','鄂','桂','甘','晋','蒙','陕','吉','闽','贵','粤','青','藏','宁','琼'],
					},
					{
						status:true,
						name:"请选择",
						value:['A','B','C','D','E','F','G','H','G','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
					},
				],
				isVehicle:false,//行驶城市弹窗显示
				arrow:false,
				Vehicletitle:"",
				Vehicle:[
						{
							status:false,
							name:"请选择省份",
							txt:"",
							value:[]
						},
						{
							status:true,
							name:"请选择市区",
							txt:"",
							value:[]
						}
				],
				Cityid:{
					provinceid:"",
					cityid:"",
					carnumber:"",
					id:""
				}
			}
		},
		onShow(){
			this.getData();
		},
		computed:{
			text(){
				if(this.list[1].name === "请选择" || this.list[0].name === "请选择"){
					return "请选择"
				}else{
					return this.list[0].name+this.list[1].name
				}
			}
		},
		onLoad:function(option){
			console.log(option)
			if(option.mode==="update"){
				this.Cityid.id = uni.getStorageSync('id')
			}
		},
		methods:{
			// 同意协议
			checkboxsel(){
				this.checkedbox = !this.checkedbox
			},
			getData(){
				servicecity().then((res)=>{
					this.Vehicle[0].value = []
					res.data.allCity.forEach((n,m)=>{
						if(m<34){
							this.Vehicle[0].value.push({"name":n.cityName,"id":n.id})
						}
				  })
				})
			},
			getDataCity(){
				servicecity().then((res)=>{
					this.Vehicle[1].value = []
					res.data.allCity.forEach((n,m)=>{
						if(n.provinceName===this.Vehicle[0].txt){
							this.Vehicle[1].value.push({"name":n.cityName,"id":n.id})
						}
				  })
				})
			},
			//车牌选择取消
			onAddrCancel(type){
				//车牌号弹框关闭
				if(type==="number"){
					this.isregion=false
					this.list.map(item=>{
						item.status = !item.status
					})
				}
				//行驶城市弹框关闭
				if(type==="city"){
					this.isVehicle=false
					this.Vehicle.map(item=>{
						item.status = !item.status
					})
				}
				//使用协议弹框关闭
				if(type==="Agreement"){
					this.isAgreement=false
				}
			},
			//车牌选择
			Licenseplate(type){
				//车牌号弹框打开
				if(type==="number"){
					this.isregion=true
					this.list.map(item=>{
						item.status = !item.status
					})
				}
				//行驶城市弹框打开
				if(type==="city"){
					this.isVehicle=true
					this.Vehicle.map(item=>{
						item.status = !item.status
					})
					this.Vehicletitle=this.Vehicle[0].name
					this.arrow=false
				}
				//用户协议弹框
				if(type==="Agreement"){
					this.isAgreement=true
				}
			},
			//第一个ul的选择
			checkTxt(item,type){
				//选择车牌地方(第一个文字)
				if(type==="number"){
					this.list[0].name=item
					this.list[0].status=false
					this.list[1].status=true
				}
				//行驶城市的省份
				if(type==="city"){
					this.Vehicle[0].txt=item.name
					this.Vehicle[0].status=false
					this.Vehicle[1].status=true
					this.Vehicle[1].txt=""
					this.getDataCity()
					this.Vehicletitle=this.Vehicle[1].name
					this.arrow=true
					this.Cityid.cityid=""
					this.Cityid.provinceid=item.id
					 
				}
			},
			//第二个ul的选择
			checkEn(item,type){
				//选择车牌的字母(第一个字母)
				if(type==="number"){
					this.list[1].name=item
					this.isregion=false
				}
				//行驶城市的市区
				if(type==="city"){
					this.Vehicle[1].txt=item.name
					this.isVehicle=false
					this.Cityid.cityid=""
					this.Cityid.cityid=item.id
				}
			},
			//弹框的tabs切换
			checkspan(){
				this.list[0].status=!this.list[0].status
				this.list[1].status=!this.list[1].status
			},
			//返回选择省
			backprovince(){
				this.Vehicle[0].txt=""
				this.isVehicle=true
				this.Vehicle.map(item=>{
					item.status = !item.status
				})
				this.Vehicletitle=this.Vehicle[0].name
				this.arrow=false
			},
			addCar(){
				// 数据状态 1.添加行驶证完成，待支付 2支付完成，待添加照片  10.为审核中 11.审核通过 12.审核不通过 13观察期 20.为保障中 30.已退出  31.不可用',
				uni.showLoading({
				    title: '加载中'
				});
				if(this.checkedbox){
					addcar({
						id:this.Cityid.id,
						token:uni.getStorageSync('token'),
						licensePlateNumber:this.text+this.Cityid.carnumber,
						drvingCity:this.Cityid.cityid,
						// mobileNumber:"18011596096"
					}).then((res)=>{
						if(res.code ==="200" && res.message === "SUCCESS"){
							if(this.addstatus){
								this.addstatus = false
								uni.setStorageSync('status',1)
								uni.setStorageSync('id',res.data.id)
								uni.showToast({
									icon:"none",
									title: "添加成功",
									duration: 2000
								});
								uni.hideLoading();
								uni.navigateTo({
									url:"/pages/wxpay/index"
								})
							}else{
								this.addstatus = true
							}
							
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
					    title: "请选择同意协议",
					    duration: 2000
					});
				}
				
			}
		},
		watch:{
			Cityid:{
				deep:true,
				handler:function(newval,oldval){
					newval.carnumber = newval.carnumber.toUpperCase()
				}
			}
		}
	}
</script>
	
<style scoped>
	@import url("./css/index.css");
</style>
