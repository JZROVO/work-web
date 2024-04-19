<script setup>
    import { onMounted,ref } from 'vue';
   
    let choosecard =ref (null);
    let card = ref(null);
    let totalcardnumber = ref([]);
    let totalcardnumbercounter = 0;
    let cardimg = ref(null);
    let showimgcounter=ref(false);
    let hovercardcounter=ref();
    let cardval= ref(1);
    let drawornot = ref(false);
    let treasurecounter = ref(false);
    let showchoosecounter = ref(false);
    let betstate = ref("")
   
    let draw  =async function(){
        const response  = await fetch("http://localhost:3000/api/draw");
        const data = await response.json();         
        console.log(cardimg) 
        //card.value = data;
        //console.log(card);
       
        drawornot.value = true;
        setTimeout(function(){
            drawornot.value = false;
        },1000);

        showchoosecounter.value = true;
        
        
        totalcardnumbercounter = totalcardnumbercounter + 1;
        totalcardnumber.value.push(data.name);
        console.log(totalcardnumber.value)
    }
    let showimg = function(){
        showimgcounter.value = true;
        hovercardcounter.value = event.target.innerHTML;    
    }
    let hiding = function(){
        showimgcounter.value = false;
    }
    let save = async function(){
        const params = new URLSearchParams();
        params.append('cardname', choosecard.value )
        let url = "http://localhost:3000/api/saverecord?" + params.toString();
        const response = await fetch(url,{credentials:'include'}); 
    }
    
    let pick =function(){
        //let luckynumber = Math.floor(Math.random()*3);
        let luckynumber = 2;
        var owncardcounter = document.getElementById(choosecard.value);
        var owncarddeleted = document.getElementById(choosecard.value+"place");
        let havenumber = owncardcounter.innerHTML.split(" ");
        
        //console.log(havenumber)
        //console.log(owncardcounter)
        //console.log("幸運數字"+luckynumber);
        if(choosecard.value == null){
            alert("請選擇卡片");            
        }
        else{
            if (owncardcounter.innerHTML==''){  
                console.log(cardval.value);
                if(cardval.value === 1){                          
                    if (luckynumber == 2){            
                        owncardcounter.innerHTML = cardval.value*2 + " 張" ;
                        //console.log("2");
                        betstate.value = "Success X2";
                    }
                    else if(luckynumber ==1){            
                        owncardcounter.innerHTML = cardval.value*1 + " 張" ;
                        //console.log("1");     
                        betstate.value = "Not badX2";         
                    }
                    else{                
                        owncardcounter.remove();
                        owncarddeleted.remove();
                        betstate.value = "ON NO! X0";
                        //console.log("s")
                    }
                }
                else{
                    alert("您沒有那麼多卡片  請輸入正確的數目");
                }
            }else{
                
                if(havenumber[0]-cardval.value >= 0){
                    if(luckynumber ==2){
                        owncardcounter.innerHTML = (parseInt(havenumber[0]) + parseInt(cardval.value*2)) + " 張" ;                   
                        //console.log("4")
                        betstate.value = "Success X2";  
                        if(parseInt(havenumber[0]) + parseInt(cardval.value*2) >= 8){  
                            treasurecounter.value = true;
                            save();
                            showchoosecounter.value = false;
                            //console.log("aaa")
                            //console.log(havenumber[0])
                        }                      
                    }else if(luckynumber ==1){            
                        owncardcounter.innerHTML = havenumber[0]  + " 張" ;
                        //console.log("5");  
                        betstate.value = "Not bad X1";                                
                    }
                    else{         
                        if (havenumber[0]-cardval.value <=0){
                            owncardcounter.remove();
                            owncarddeleted.remove();
                        }       
                        else{
                            owncardcounter.innerHTML = havenumber[0]-cardval.value  + " 張" ;
                            //console.log("6"); 
                        }
                    betstate.value = "ON NO! X0";  
                    }
                }
                else{
                    alert("您沒有那麼多卡片  請輸入正確的數目");
                }           
            }   
        }
          
    }

    function wronginput(){
        alert("請輸入有效的數字")
    }

    let reset = function(){
        window.location.reload("/");
    }




</script>
<template>
    <div id="drawbutton">
        <button id ="draw" :disabled="drawornot" @click="draw">抽卡</button> 
    </div>
    <div>
        <label v-for="(cardnumber,index) in totalcardnumber" :key="index" :id="cardnumber+'place'" >
            <span  @mouseover="showimg" @mouseout="hiding" class="cardword" > {{ cardnumber }}</span>
            <span :id="cardnumber" class="cardnumberz" ></span>
            <input type="radio"  :value="cardnumber" v-model="choosecard"   ></input><br/>
            <div>
                <img class="cardimgs":src="'http://localhost:3000/static/'+ cardnumber +'.png'" v-if="showimgcounter === true && hovercardcounter === cardnumber "></img>
            </div>
        </label>
    </div>
    <div>{{ choosecard }}</div><br/>
    <input  id="gamblenumber"type="number" v-model="cardval" oninvalid = "wronginput()" v-if=" showchoosecounter === true"></input>
    <button id="picked"  @click="pick" v-if="showchoosecounter === true">選擇</button>
    <img id="treasure" src ="http://localhost:3000/static/treasure.gif" v-if="treasurecounter === true"/>
    <div>{{ betstate }}</div>
    <button id="resetbutton" @click="reset">重置</button>



    
</template>
<style scoped>
    #drawbutton{
        display: flex;
        justify-content: center; /*水平置中 */
        align-items: center;  /*垂直置中 */
    }
    #draw{   
           
        color: purple;
        background-color: #f1c40f;
        width: 200px;
        height: 50px;
        border:none;
        border-radius: 5px;
        font-size: 35px;
        text-shadow:-3px 3px 3px rgb(209 132 0),
                    -3px 3px 3px rgb(209 132 0),
                    -3px 3px 3px rgb(209 132 0),
                    -3px 3px 3px rgb(209 132 0),
                    -3px 3px 3px rgb(209 132 0),
                    -3px 3px 3px rgb(209 132 0);
        box-shadow: 0px 15px 0px 0px #f39c12;
        transition: all.5s; 
        
                     
    }           
    #draw:hover{
        background-color: #fcdc5e;
    }
    #draw:active{
        transform: translate(0,4px);
        box-shadow: 0px 1px 0px 0px #f39c12;               
    }
    #picked,picked:focus{        
        position: relative;
        min-width: 100px;
        background: transparent;
        color: #5903fa;
        font-size: 1rem;               
        text-align: center;
        text-transform: uppercase;
        text-decoration: none;
        box-sizing: inherit;
        padding: 10px 20px;
        border: 1px solid#E1332D;
        border-radius: 6px;
        box-shadow: inset 0 0 20px rgba(225, 51, 45, 0);
        outline: 1px solid !important;
        outline-color: rgba(225, 51, 45, 0.5);
        outline-offset: 0px;
        text-shadow: none;
        transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
    }  
    #picked:hover{
        color: #5903fa;
        border: 1px solid #E1332D;
        box-shadow: inset 0 0 20px rgba(225, 51, 45, 0.5), 0 0 20px rgba(225, 51, 45, 0.2);
        outline: 1px solid !important;
        outline-color: rgba(225, 51, 45, 0) !important;
        outline-offset: 15px;
        text-shadow: 1px 1px 2px #427388;
    }
    button:disabled{
        color: rgb(0, 32, 81) !important;
        background:  rgb(0, 32, 81) !important;
        box-shadow: none !important;
        text-shadow: none !important;
        background: transparent;
        
        
    }  
    .cardword{
        
        flex-direction: row;
        justify-content:flex-end;
        font-size: 30px;
        color:#0affb5;
    }          
    .cardnumberz{
        color: yellow;
        width:50px;
        font-size:50px;
        padding-left: 20px;       
    }
    .cardimgs{
       position: absolute;
       top:30%;
       left:30%;
       max-width:50%;
       max-height: 90vh;
       width:auto;
       height:auto;
    }
    #treasure{
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
    }
    #resetbutton{
        position: absolute;
        bottom: 10%;
        right:20px;
        width:150px;
        height:10%;
        border: #E1332D;
        border-radius: 2px;
        font-size:150%;
        padding: 10px 20px;
        outline:4px solid;
        outline-color: #4d02fd;
        transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
        background-color: transparent;
        color: yellowgreen;
        overflow:hidden;
    }
    #resetbutton:hover{
        color:rgb(255, 94, 0);
        text-shadow:rgb(230, 93, 8) ;
        outline:5px solid;
        outline-color: #ff0404;
        outline-offset: -10px;
        font-size: 180%;
        background-color: transparent;
        box-shadow: 0 0 5px #03e9f4,
                    0 0 25px #03e9f4,
                    0 0 50px #03e9f4,
                    0 0 200px #03e9f4;
    }
    #gamblenumber{
        caret-color: #0affb5;
        width:50px;
    }   

</style>