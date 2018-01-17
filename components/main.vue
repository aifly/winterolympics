<template>
  	  <section class="zmiti-main-ui" :style="{height:viewH*list.length+'px'}">
  	  		<div v-for='(item,i) in list' class="zmiti-q-item " :style="{height:viewH+'px',background:'url(../assets/images/bg'+(i%4+1)+'.png) no-repeat center 110%',backgroundSize:'cover'}">
  	  			
  	  			<header class="zmiti-main-q-header">
  	  				<img :src='imgs.topSnow'/>
  	  				{{item.title}}
  	  			</header>

  	  		</div>
  	  </section>
</template>

<script>
import './css/main.css';
import QList from './data.js';

var list = [];

for(var i =0;i<10;i++){
	var len = QList.length
	var index = (Math.random()*len)|0;
	//index = 19;
	list.push(QList.splice(index,1)[0]);
}
export default {
  name: 'index',
  data(){
  	return {
  		list,
  		viewH:document.documentElement.clientHeight,
  		imgs:{
			topSnow:'../assets/images/top-snow.png',
			
  		}
  	}
  },
  components: {
  	 
  }
}
</script>

