console.log('vue start1 ...')
import Vue from "vue";
import Main from './components/main.vue'
//Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	template: '<Main></Main>',
	components: {
		Main
	}
})