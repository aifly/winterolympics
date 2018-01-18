<template>
  	  <section class="zmiti-main-ui" :style="{height:(viewH*list.length-30*viewW/10)+'px'}">
  	  		<div v-for='(item,i) in list' class="zmiti-q-item " :style="{height:viewH+'px',background:'url(../assets/images/bg'+(i%4+1)+'.png) no-repeat center 110%',backgroundSize:'cover',top:(10-i)*3+'rem'}">
  	  			
  	  			<header class="zmiti-main-q-header">
  	  				<img :src='imgs.topSnow'/>
              <div class="zmiti-num">第{{numberList[questionLen-i-1]}}题</div>
  	  				{{item.title}}
  	  			</header>

            <ul class="zmiti-a-list">
               <li :class='{"left":i%2===0,"right":i%2===1}' v-for='(an,i) in item.answers' :style="answerStyle">
                  <img :src='imgs.dong'/>
                  <span>{{answerItem[i]}}：</span>
                  <span>{{an}}</span>

               </li>
            </ul>

  	  		</div>
  	  </section>
</template>

<script>
import './css/main.css';
import QList from './data.js';

var list = [];

var questionLen = 10;
for(var i =0;i<questionLen;i++){
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
      questionLen,
      iNow:questionLen,
      numberList:['一','二','三','四','五','六','七','八','九','十'],
      answerItem:["A","B","C"],
      viewH:document.documentElement.clientHeight,
  		viewW:document.documentElement.clientWidth,
      answerStyle:{
        background:'url(../assets/images/answer.png) no-repeat center top',
        backgroundSize:'contain'
      },
  		imgs:{
       topSnow:'../assets/images/top-snow.png',
			 dong:'../assets/images/dong.png',
			 
  		}
  	}
  },
  components: {
  	 
  }
}
</script>

