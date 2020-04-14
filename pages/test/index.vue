<template>
	<view class="test">
		测试页
		<view @click="wxpay">支付</view>
	</view>
</template>

<script>
	import md5old from 'js-md5'
	import {md5} from '@/static/js/md5.js'
	export default {
		data(){
			return{
				appid:"wx7bee4956d31fa5cb",//appid
				secret:"fea8f1ac92e40bd63b52b92da1a527af",//appid秘钥
				mch_id:"1445103202",//商户号
				key:"e3397ccc937698590f1d4a6a29f85557", //商户秘钥
				openid:"",
				session_key:"",
				sign:"",//生成签名
				nonceStr:md5(Math.ceil(Math.random()*1000).toString()).toUpperCase(),
				body:"mutual",//商品名必填,没有编码不能用中文,
				notify_url:"http://tb.jytat.net", //通知地址必填
				out_trade_no : '2020'+(Date.now().toString()),//订单号
				spbill_create_ip : "14.23.150.211", //终端ip
				prepay_id:"",//统一下单
			}
		},
		methods:{
			// 获取统一订单的xml格式
			 getXMLNodeValue:function (node_name, xml) {
			    var tmp = xml.split("<" + node_name + ">")
			    var _tmp = tmp[1].split("</" + node_name + ">")
			    return _tmp[0]
			},
			// 微信支付
			wxpay(){
				console.log(Date.now().toString())
				let that = this
				console.log("签名" + that.sign)
				console.log("统一订单" + that.prepay_id)
				console.log("随机字符" + that.nonceStr)
				console.log("appid" + that.appid)
				wx.requestPayment({
					appId:that.appid,
				    timeStamp: Date.now().toString(),
				    nonceStr: that.nonceStr,
				    package: 'prepay_id='+that.prepay_id,
					paySign: that.sign,
				    signType: 'MD5',
				    success: function (res) {
				        console.log('success:' + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log('fail:' + JSON.stringify(err));
				    }
				});
			}
		},
	    onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			var that = this;
			// 获取openid
			wx.login({
				// login获取code
				success:function(res){
					console.log("获取code")
					console.log(res.code)
					uni.request({
						 url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + that.appid + '&secret=' + that.secret + '&js_code=' + res.code + '&grant_type=authorization_code',
						 method: 'GET',
						 success: function(resopen) {
							that.openid = resopen.data.openid
							that.session_key = resopen.data.session_key
							//统一支付签名
							var appid = that.appid;//appid必填
							var body = that.body;//商品名必填,没有编码不能用中文
							var mch_id = that.mch_id;//商户号必填
							var openid = that.openid;
							var nonce_str = that.nonceStr;//随机字符串，不长于32位。
							var key = that.key; //商户key必填，在商户后台获得API秘钥
							var notify_url = that.notify_url;//通知地址必填
							var out_trade_no = that.out_trade_no; //订单号
							var spbill_create_ip = that.spbill_create_ip;
							var total_fee = parseInt(0.01 * 100); //价格，这是一分钱
							var trade_type = "JSAPI";
							var sign_type = "MD5"
							var unifiedPayment = `appid=${appid}&body=${body}&mch_id=${mch_id}&nonce_str=${nonce_str}&notify_url=${notify_url}&openid=${openid}&out_trade_no=${out_trade_no}&sign_type=${sign_type}&spbill_create_ip=${spbill_create_ip}&total_fee=${total_fee}&trade_type=${trade_type}&key=${key}`
							var sign = md5(unifiedPayment).toUpperCase();
							that.sign = sign
							var formData = "<xml>";
									formData += "<appid>" + appid + "</appid>";
									formData += "<body>" + body + "</body>";
									formData += "<mch_id>" + mch_id + "</mch_id>";
									formData += "<nonce_str>" + nonce_str + "</nonce_str>";
									formData += "<notify_url>" + notify_url + "</notify_url>";
									formData += "<openid>" + openid + "</openid>";
									formData += "<out_trade_no>" + out_trade_no + "</out_trade_no>";
									formData += "<spbill_create_ip>14.23.150.211</spbill_create_ip>";
									formData += "<total_fee>" + total_fee + "</total_fee>";
									formData += "<trade_type>" + trade_type + "</trade_type>";
									formData += "<sign_type>" + sign_type + "</sign_type>"; 
									formData += "<sign>" + sign + "</sign>";
							    formData += "</xml>"; 
							// 统一下单 prepay_id
							uni.request({
							    url: 'https://api.mch.weixin.qq.com/pay/unifiedorder', //仅为示例，并非真实接口地址。
							    data: formData,
							    header: {
							        'content-type': 'application/json' //自定义请求头信息
							    },
								method:"POST",
							    success: (res) => {
									if(that.getXMLNodeValue('result_code', res.data.toString("utf-8"))){
										if(that.getXMLNodeValue('result_code', res.data.toString("utf-8")) == "<![CDATA[SUCCESS]]>"){
											
											that.prepay_id = that.getXMLNodeValue('prepay_id', res.data.toString("utf-8")).substring(9).split("]")[0]
										}
									}
									
							    }
							});
						}
					})
				}
			})
	    }
	}
</script>

<style>
</style>
