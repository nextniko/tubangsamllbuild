import { md5 } from '@/static/js/md5.js'
export const appid="wx7bee4956d31fa5cb"//appid
export const secret="fea8f1ac92e40bd63b52b92da1a527af"//appid秘钥
export const mch_id="1445103202"//商户号
export const key="e3397ccc937698590f1d4a6a29f85557" //商户秘钥
let openid=""
let session_key=""
let body="mutual"//商品名必填,没有编码不能用中文
let notify_url="http://tb.jytat.net/wxPayCarResult"//通知地址必填
// let notify_url="http://192.168.0.29:8080/wxPayCarResult"//通知地址必填
let spbill_create_ip = "222.209.107.65"//终端ip
let prepay_id=""//统一下单

// 获取统一订单的xml格式
function getXMLNodeValue(node_name, xml) {
	var tmp = xml.split("<" + node_name + ">")
	var _tmp = tmp[1].split("</" + node_name + ">")
	return _tmp[0]
}
// 获取openid
export function getPrepay(data){
	let nonceStr=md5(Math.ceil(Math.random()*1000).toString()).toUpperCase() //随机字符串
	let out_trade_no = md5(Math.ceil(Math.random()*10000).toString()).toUpperCase()//订单号
	return new Promise((resolve,reject)=>{
		wx.login({
			// login获取code
			success:function(res){
				wx.request({
					 url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + res.code + '&grant_type=authorization_code',
					 method: 'GET',
					 success: function(resopen) {
						openid = resopen.data.openid
						session_key = resopen.data.session_key
						//统一支付签名
						var trade_type = "JSAPI";
						var sign_type = "MD5"
						var unifiedPayment = `appid=${appid}&body=${body}&mch_id=${mch_id}&nonce_str=${nonceStr}&notify_url=${notify_url}&openid=${openid}&out_trade_no=${out_trade_no}&sign_type=${sign_type}&spbill_create_ip=${spbill_create_ip}&total_fee=${data.moneny}&trade_type=${trade_type}&key=${key}`
						var sign = md5(unifiedPayment).toUpperCase();
						var formData = "<xml>";
								formData += "<appid>" + appid + "</appid>";
								formData += "<body>" + body + "</body>";
								formData += "<mch_id>" + mch_id + "</mch_id>";
								formData += "<nonce_str>" + nonceStr + "</nonce_str>";
								formData += "<notify_url>" + notify_url + "</notify_url>";
								formData += "<openid>" + openid + "</openid>";
								formData += "<out_trade_no>" + out_trade_no + "</out_trade_no>";
								formData += "<spbill_create_ip>"+ spbill_create_ip +"</spbill_create_ip>";
								formData += "<total_fee>" + data.moneny + "</total_fee>";
								formData += "<trade_type>" + trade_type + "</trade_type>";
								formData += "<sign_type>" + sign_type + "</sign_type>"; 
								formData += "<sign>" + sign + "</sign>";
							formData += "</xml>"; 
						// 统一下单 prepay_id
						wx.request({
							url: 'https://api.mch.weixin.qq.com/pay/unifiedorder', //仅为示例，并非真实接口地址。
							data: formData,
							header: {
								'content-type': 'application/json' //自定义请求头信息
							},
							method:"POST",
							success: (res) => {
								if(getXMLNodeValue('result_code', res.data.toString("utf-8"))){
									if(getXMLNodeValue('result_code', res.data.toString("utf-8")) == "<![CDATA[SUCCESS]]>"){
										resolve(getXMLNodeValue('prepay_id', res.data.toString("utf-8")).substring(9).split("]")[0])
									}else{
										resolve("参数传输错误")
									}
								}
							}
						});
					}
				})
			}
		})
	})
}
