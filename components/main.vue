<template>
  	  <section class="zmiti-main-ui lt-full"  ref='zmiti-main-ui'>
  	  		<div :style="{height:(viewH*list.length-27*viewW/10)+'px',WebkitTransform:
          'translate3d(0,'+(index-1)*(viewH-3*viewW/10)+'px,0)'}">
             <div v-for='(item,i) in list' class="zmiti-q-item " :style="{height:viewH+'px',background:'url(../assets/images/bg'+(i%4+1)+'.png) no-repeat center 110%',backgroundSize:'cover',top:(-i)*3+'rem',WebkitTransform:'translate3d(0,'+-(viewH*list.length-27*viewW/10 - viewH)+'px,0)'}">
                
                <header class="zmiti-main-q-header" :class="{'hide':i>iNow}">
                  <img :src='imgs.topSnow'/>
                  <div class="zmiti-num">第{{numberList[questionLen-i-1]}}题</div>
                  {{item.title}}
                </header>
                <ul class="zmiti-a-list" :class="{'show':iNow===i}">
                   <li @click='chooseAnswer(j,i)' :class='{"left":j%2===0,"right":j%2===1}' v-for='(an,j) in item.answers' :style="answerStyle">
                      <img :src='imgs.snow' class="zmiti-snow-img"  />
                      <img :src='imgs.dong'/>
                      <span>{{answerItem[i]}}</span>
                      <span>{{an}}</span>
                      <div v-if='iNow === i && clickIndex === j' class="zmiti-snow" v-for='(s,k) in snowArr' :style='{left:(k+2)*.13+"rem",WebkitTransform:"translate3d("+s.transX+"px,"+s.transY+"px,0)",opacity:s.opacity}'>
                          
                      </div>
                   </li>
                </ul>

              </div>   
          </div>
          <div v-for='snow in snows' v-html='snow.html'>
            
          </div>

          <div class="zmiti-score">
              <img :src='imgs.score' />
              <span class="zmiti-score-num">
                <span v-for='(sc,sindex) in scoreNum' :style="{WebkitTransform:'translate3d(0,-'+(.75*score)+'rem,0)'}" class="zmiti-score-item">
                  {{sindex}}
                </span>
              </span>
              <span class="zmiti-time">{{time}}</span>
          </div>

          <div class="zmiti-tigger" :style="{WebkitTransform:'translate3d('+triggerTransX+'rem,'+triggerTransY+'rem,0)'}">
            <img :src='imgs.tigger'/>
          </div>

          <div v-if='gameover' class="zmiti-over-C">
              <div class="zmiti-over" :class='rightAnswer.key'>
                  <div>
                    <img :src="imgs[rightAnswer.key]" alt="" />
                    <div class="zmiti-result-score" >
                      <span :style="{WebkitTransform:'translate3d(0,'+-(rightAnswer.count*.6)+'rem,0)'}">
                          <label v-for='(label,i) in new Array(11)'>
                            {{i}}
                          </label>
                      </span>
                     
                    </div>
                    <span class="zmiti-unit">题</span>
                  </div>
                  <div class="zmiti-over-btns">
                     <span><img :src="imgs.restart" alt=""></span>
                     <span><img :src="imgs.share" alt=""></span>
                  </div>
              </div>
          </div>
  	  </section>
</template>

<script>
import './css/main.css';
import QList from './data.js';
import imgs  from './assets.js';
import $ from 'jquery';
import ZmitiSnow from './snow.js';
var list = [];

var questionLen = 10;
for(var i =0;i<questionLen;i++){
	var len = QList.length
	var index = (Math.random()*len)|0;
	//index = 19;
	list.push(QList.splice(index,1)[0]);
}

var snowCount = 50;//雪粒子的个数

var snowArr = [];
for(var i=0;i<snowCount;i++){
  snowArr.push({
    transX:0,
    transY:0,
    opacity:Math.random()+.2
  })
}


export default {
  name: 'index',
  props:['obserable'],
  beforeCreate(){

  },
  data(){
  	return {
      rightAnswer:{
        count:2,
        key:'over3'

        /*
         0-3 over3
         4-6 over2
         7-9 over1
         10  over
        */
      },//回答正确的个数 
  		list,
      questionLen,
      triggerTransX:0,
      triggerTransY:0,
      clickIndex:-1,//点击的索引。
      iNow:-1, 
      gameover:true,
      scoreNum:new Array(11),
      index:0,
      snowArr,
      numberList:['一','二','三','四','五','六','七','八','九','十'],
      answerItem:["A","B","C"],
      viewH:document.documentElement.clientHeight,
  		viewW:document.documentElement.clientWidth,
      snows:[],
      answerStyle:{
        background:'url('+imgs.answers+') no-repeat center top',
        backgroundSize:'contain'
      },
  		imgs,
      score:10,
      seconds:0,
      time:'00:00'
  	}
  },
  methods:{
    chooseAnswer(i,index){


      if(index === this.lastIndex){
        return;
      }
      this.imgs.tigger = this.imgs.jump;
      this.choosed = true;
      this.triggerTransX = i%2===0?-3:3;
      this.triggerTransY = ((2-i) * 3 + 3.82)*-1;

      this.lastIndex = index;
      setTimeout(()=>{
        this.computedINow();
      },3000)

      setTimeout(()=>{
        this.clickIndex = i;//
      },1000)
      setTimeout(()=>{
          this.triggerTransX = this.triggerTransY = 0;
        },1500);
      if(this.list[this.iNow].right === i){
        this.score +=1;//回答正确
         setTimeout(()=>{
          this.imgs.tigger = this.imgs.tiggerSuccess;          
        },2000)
      }else{//回答错误

        setTimeout(()=>{
          this.imgs.tigger = this.imgs.tiggerError;
        },1000)

        setTimeout(()=>{
          this.imgs.tigger = this.imgs.tiggerSuccess;          
        },2000)

      }
    },
    snowAnimate(i){
      this.snowsProticles = $('.zmiti-a-list:eq('+this.iNow+') li').eq(i).find('.zmiti-snow');
      var k=0;
      this.snowsProticles.each((i,item)=>{
          item.spX = item.spX === undefined ? (Math.random()*3+3) *(Math.random()-.5>0?1:-1) : item.spX;
          item.spY = item.spY === undefined ? -(Math.random()*10+3):item.spY;
          item.spY++;

          this.snowArr[i].transX +=item.spX;
          this.snowArr[i].transY += item.spY;
          if(this.snowArr[i].transY>this.viewH){
            k++;
            if(k>=snowCount){
              this.clickIndex = -1;
              this.snowArr.forEach((h,sn)=>{
                h.transX = 0;
                h.transY = 0;
              })

            }
            
          }
          
      })
      

    },
    computedINow(){
      setTimeout(()=>{
        this.index+=1;
        if(this.index > this.questionLen){
          this.index = this.questionLen;
          return;
        }
        this.iNow = this.questionLen - this.index;
      },10)
    }
  },
  mounted(){
    var i =0 ;
    var t = setInterval(()=>{
      i++;
      if(i>100){
        clearInterval(t);
      }
     this.snows.push(new ZmitiSnow()); 
    },100)


    var zmitiRequestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
    var render = ()=>{
       this.snows.forEach((item,i)=>{
        item.animate();
      })
       if(this.clickIndex >-1){
           this.snowAnimate(this.clickIndex);
       }
      zmitiRequestAnimationFrame(render);
    }


    render();

    var {obserable} = this;
    obserable.on('mainStart',()=>{
      render();
    })
    var timer = setInterval(()=>{
        this.seconds++;
        var sec = this.seconds % 60;
        var min = this.seconds / 60 | 0;
        this.time = (min<10?'0'+min:min)+':'+(sec<10?'0'+sec:sec);
    },1000);

    this.computedINow()

  },
  components: {
  	 
  }
}
</script>

