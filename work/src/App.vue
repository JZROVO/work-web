<script setup>
  import { onMounted,ref } from 'vue';
  import Draw from "./draw.vue" ;
  import Login from "./login.vue";

  let stardraw = ref(null);
  let loginstared = ref(null);
  let showpopup = ref (false);
  let usernickname = ref(null);
  let winrate = ref(null);
  let winratecounter = ref(false);
  async function setup(){
    const response = await fetch("http://localhost:3000/api/checkloginornot",{credentials:'include'});
    const data = await response.text();
    const [state,record] = data.split(" ");
    if(state==="0"){
      return;
    }
    else
      started() 
      logins(state)
      starteddraw()
      wincounter(record)

  }
  onMounted(setup)
  let started = function(){                   
    var startbutton = document.querySelector('#start');
    startbutton.style.display = "none";
    var rowbutton = document.querySelector("#intro");
    rowbutton.style.display="none";

    loginstared.value = true;
  }
  let showintro = function(){
    showpopup.value = true;
  }
  let showrecord = function(){
    winratecounter.value = true;    
  }
  let hiderecord = function(){
    winratecounter.value = false;    
  }
  let hideintro = function(){
    showpopup.value = false;
  }
  let starteddraw = function(){
    stardraw.value = true;
    loginstared = false;
  }
  
  let logins = function(data){
    usernickname.value = data;   
  }
  let wincounter = function(data){
    winrate.value = data;
    console.log(winrate.value)
  }




</script>

<template>
  <div v-if="usernickname!==null" id = "usernickname" @mouseover = "showrecord"  @mouseleave="hiderecord" >使用者名稱:{{ usernickname }}</div>
  <div v-if=" winratecounter === true" id= "winrate" >通關次數:{{ winrate }}</div>
  <div id="background"> 
    <h1 id="title" contenteditable data-heading="抽卡模擬器">抽卡模擬器</h1>
    <div id="block1">
          <button id="start" type="button" @click = "started" >點此開始</button>
          <button id = "intro" type="button"  @mouseover = "showintro"  @mouseleave="hideintro">遊戲規則</button><br/>
    </div>
    <Login @windata = "wincounter" @visitor="starteddraw" v-if="loginstared === true"  @checkuserid="logins"></Login>
    <Draw v-if="stardraw === true "></Draw>
  </div>
  
  <div class="popup" v-if="showpopup===true">
    <ul>
      <li>1.點此開始後 可以選擇註冊 登入 或成為遊客</li>
      <li>2.成為遊客後 只能單次遊玩 不會記錄成功解鎖卡片及次數</li>
      <li>3.註冊 並登入 可以於下次在登入後 繼續姐所卡片及累積次數 但當次剩餘的卡片並不會記錄 請小心注意</li>
      <li>4.按下抽卡(有一秒冷卻)後 會隨機重卡池抽取一張卡，卡片於再次登入前並不會出現重複</li>
      <li>5.選擇要下賭的卡片以及數目</li>
      <li>6.當單張卡片累積張數到達8張，即完成單次破關</li>

    </ul>
  </div>
  <div  v-if="usernickname!==null" >
    <a href="http://localhost:3000/api/logout"><button id="logoutbutton">登出</button></a>
  </div>
</template>

<style scoped>
  #title{
        font-size: 150px;
        display: flex;
        justify-content: center;
        color:transparent;
        position: relative;
        background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/209981/6963bbf342d87b3a2150bd8f59682b89.jpg);
        -webkit-background-clip:text;
        background-clip:text;
        background-size: contain;
        &::before {
            content: attr(data-heading);
            position: absolute;
            display: flex;
            justify-content: center;                   
            left: 0;
            top: 0;
            width: 100%;
            background: linear-gradient(45deg, rgba(255,255,255,0) 45%,rgba(255,255,255,0.8) 50%,rgba(255,255,255,0) 55%,rgba(255,255,255,0) 100%);
            -webkit-background-clip: text;
            background-clip:text;
            color: transparent;
            mix-blend-mode: screen;
            animation:shine 1s infinite;
            background-size: 200%;
            text-shadow: 
                2px 2px 10px rgba(#000, 0.2),
                -2px 2px 10px rgba(#000, 0.2),
                -2px -2px 10px rgba(#000, 0.2);
            }
  }
  @keyframes shine{
  0% {background-position: -100%;}
  100% {background-position: 100%;}
  }
  #intro{
    visibility:visible;
    color: rgba(4, 148, 35, 0.822);
    background: transparent;
    border: 2px solid purple;
    border-radius: 6px;
    width: 150px;
    padding: 16px 32px;
    text-decoration: none;
    margin: 4px 2px;
    font-size: 16px;
  }
  #intro:hover{
    background-color:#008cba;
    color: yellow;
  }
  #start{
    visibility:visible;
    color: rgba(4, 148, 35, 0.822);
    background: transparent;
    border: 2px solid purple;
    border-radius: 6px;
    width: 150px;
    padding: 16px 32px;
    text-decoration: none;
    margin: 4px 2px;
    font-size: 16px;
  }
  #start:hover{
    background-color:#008cba;
    color: yellow;
  }
  #block1{
  display: flex;
  flex-direction:row;
  justify-content: center;               
  }
  .popup {
    color:blue;
    position: fixed;
    top: 65%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border: 1px solid black;
    z-index: 9999; /* 确保弹出窗口在最顶层 */
  }
  #usernickname{
    font-size:50px;
    color: yellow;
    display: flex;
    justify-content: center;
  }

  #logoutbutton{
    position:absolute;
    bottom: 9.5%;
    left: 20px;
    color: rgba(14, 236, 62, 0.822);
    background: transparent;
    border: 2px solid rgb(230, 4, 230);
    border-radius: 6px;
    width:150px;
    height:10%;
    padding: 10px 20px;
    text-decoration: none;
    margin: 4px 2px;
    font-size: 30px;
    outline:4px solid;
    outline-color: #4d02fd;
    overflow:hidden;
    transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
  }
  #logoutbutton:hover{
    outline-offset: -10px;
    outline-color: #ff0404;
    font-size: 180%;
    background-color: transparent;
    box-shadow: 0 0 5px #03e9f4,
                0 0 25px #03e9f4,
                0 0 50px #03e9f4,
                0 0 200px #03e9f4;

  }
  #winrate{
    background-color: rgb(241, 2, 2);
    font-size: 30px;
    position: fixed;
    left:40%;   
    color: rgb(89, 4, 247);
    z-index: 9999;
  }



  @media screen and (max-width :600px) {
    #title{
      font-size:50px;
      }
    #usernickname{
      font-size:30px;
    }  
  }

  



  
  
</style>
