export default {
	props: {
		body: {
			type: String,
			default: "本人同意并授权查询服务机构及被授权人指定的第三方可留存、整理及加工获取的本人信息用于查询服务机构及被授权人指定的第三方为本人提供其他服务;本人同意并授权其合法获取的本人的信息经过整合、加工、转化为信息评分或信息报告回传给被授权人",
		},
		//是否开启动画
		animation: {
			type: Boolean,
			default: true,
		},
		backLabel: {
			type: String,
			default: "不同意",
		},
		title: {
			type: String,
			default: "服务协议和隐私政策",
		},
		// 协议路径
		protocolPath: {
			type: String,
		},
		// 政策路径
		policyPath: {
			type: String,
		},
		policyStorageKey: {
			type: String,
			default: "has_read_privacy",
		},
		//是否自动显示tarbar
		tarBar: {
			type: Boolean,
			default: false,
		},
		//开放能力
		openType: {
			type: String,
			default: 'getPhoneNumber'
		}
	}
}