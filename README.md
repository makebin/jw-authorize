```html
<template>
<jw-authorize ref="authorize" />
</template>
export default {
		data() {
			return {
				
			}
		},
		components: {
			jwAuthorize
		},
		methods: {
			//打开地址选择器
			openAddress() {
				this.$refs.authorize.open()
			}		
    }
}
```