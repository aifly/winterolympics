console.log('vue start1 ...')
import Vue from "vue";
import Main from './components/main.vue'
import Index from './components/index.vue';
import Obserable from './components/obserable.js';

var obserable = new Obserable();

//Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	data: {
		obserable
	},
	el: '#app',
	template: `<div>
		<Main :obserable='obserable'></Main>
		<Index :obserable='obserable'></Index>
	</div>`,
	components: {
		Main,
		Index
	}
})