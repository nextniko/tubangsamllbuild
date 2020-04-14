import { md5 } from '@/static/js/md5.js'
import { appid , secret , mch_id , key} from "@/static/js/login/wxlogin/index.js"


export function paymodewx(data){
	// 时间戳
	let timeStamp = Date.now().toString()
	// 二次签名
	let paySign = `appId=${appid}&nonceStr=${data.nonce_str}&package=prepay_id=${data.prepay_id}&signType=MD5&timeStamp=${timeStamp}&key=${key}`
	// 二次签名加密
	paySign = md5(paySign).toUpperCase()
	return new Promise((resolve,reject)=>{
		wx.requestPayment({
			appId:appid,
			timeStamp: timeStamp,
			nonceStr: data.nonce_str,
			package: 'prepay_id='+data.prepay_id,
			signType: 'MD5',
			paySign: paySign,
			success: function (res) {
				if(res.errMsg === "requestPayment:ok"){
					resolve("200")
				}
				
			},
			fail: function (err) {
				resolve(err)
			}
		});
	})
}
