<template name="protocol-popup">
	<view class="jw-authorize" @touchmove.stop.prevent="clear">
		<view class="popup_mask" @touchmove.stop.prevent="clear" v-if="isShow"></view>
		<view :class="['popup_content', isShow ? 'scroll-open' : '', animation ? 'scroll-animation' : '']">
			<view class="hd">
				<text class="title">{{ title }}</text>
				<text @click="close" class="close-icon">X</text>
			</view>
			<view class="explain_text">
				<slot>
					{{ body }}
				</slot>
			</view>
			<view class="button-box">
				<button class="jw-button jw-button-cancel" @click="close">{{ backLabel }}</button>
				<slot name="button">
					<button v-if="openType === 'getPhoneNumber'" class="jw-button get-phone-number-button"
						open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
						同意
					</button>
					<button v-if="openType === 'getUserInfo'" class="jw-button get-phone-number-button"
						@click="getuserinfo">
						同意
					</button>
				</slot>
			</view>
		</view>
	</view>
</template>

<script>
	const silentLogin = function() {
		return new Promise((resolve, reject) => {
			uni.login({
				success(res) {
					resolve(res.code)
				},
				fail(err) {
					reject(err)
				}
			})
		})
	}
	const getUserProfile = function() {
		return new Promise((resolve, reject) => {
			uni.getUserProfile({
				lang: 'zh_CN',
				desc: '用户登录',
				success: (res) => {
					resolve(res)
				},
				// 失败回调
				fail: (err) => {
					reject(err)
				}
			})
		})
	};

	import props from './props.js';
	export default {
		name: "jw-authorize",
		mixins: [props],
		data() {
			return {
				isShow: false,
			};
		},
		methods: {
			open() {
				this.isShow = true;
			},
			close() {
				this.isShow = false;
			},
			//获取用户信息授权
			getuserinfo(e) {

				let loginFunc = silentLogin();
				let profile = getUserProfile();
				loginFunc.then(code => {
					return code
				}).then(code => {
					return new Promise((resolve, reject) => {
						profile.then(res => {
							resolve({
								code,
								iv: res.iv,
								encryptedData: res.encryptedData,
								signature: res.signature,
								rawData: res.rawData,
							})
						}).catch(err => {
							reject(err)
						})
					})
				}).then(meta => {
					this.$emit("success", {
						meta,
						scene: 'getuserinfo',
					});
				}).catch((err) => {
					console.log(err)
					uni.showToast({
						title: err.message || '登录异常',
						icon: 'success',
						mask: true
					})
				}).finally(() => {
					this.isShow = false;
				});

			},
			//获取手机号授权
			getPhoneNumber(e) {
				this.isShow = false;
				let {
					detail
				} = e;
				if (detail.errMsg == "getPhoneNumber:ok") {
					this.$emit("success", {
						meta: detail,
						scene: 'getPhoneNumber'
					});
				} else {
					uni.showModal({
						title: '提示',
						content: `无法获取手机号 ${detail.errMsg}`,
						showCancel: false,
						confirmText: '关闭'
					});
				}

			},
			// 禁止滚动
			clear() {
				return;
			},

		},
	};
</script>

<style lang="scss">
	.popup_mask {
		position: fixed;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.4);
		transition-property: opacity;
		transition-duration: 0.2s;
		opacity: 0;
		z-index: 98;
	}

	.popup_mask {
		opacity: 1;
	}

	.popup_content {
		&.scroll-open {
			bottom: 0px !important;
		}

		&.scroll-animation {
			transition: all 0.25s linear;
		}

		transition: all 0.25s linear;
		overflow: hidden;
		box-sizing: border-box;
		padding: 40upx 20upx 0 20upx;
		position: fixed;
		// bottom: 30%;
		bottom: -100%;
		// bottom: 0;
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
		// left: 50%;
		// margin-left: -40%;
		right: 0;
		min-height: 400upx;
		background: #ffffff;
		width: 100%;
		z-index: 99;

		.hd {
			text-align: left;
			font-size: 34upx;
			padding: 10upx 0upx 0 30upx;
			font-weight: bold;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.close-icon {
				color: #c1c1c1;
				margin-right: 20rpx;
			}
		}

		.explain_text {
			font-size: 13px;
			padding: 30upx 30upx 40upx 30upx;
			line-height: 38upx;

			.line {
				display: block;

				.path {
					color: #007aff;
					display: inline-block;
					text-align: center;
				}
			}
		}

		.button-box {
			display: flex;
			padding: 20upx;
			align-items: center;
			font-size: 34upx;
			justify-content: space-around;
			border-top: 1upx solid #f2f2f2;

			.jw-button {
				text-align: center;
				background: #87CE28;
				color: #fff;
				border: 1px solid #87CE28;
				width: 200rpx;
				height: 80rpx;
				line-height: 80rpx;
				font-size: 13px;

				.get-phone-number-button {
					font-size: 34upx;
				}

				&.jw-button-cancel {
					background: #fff;
					color: #87CE28;
				}
			}
		}
	}
</style>