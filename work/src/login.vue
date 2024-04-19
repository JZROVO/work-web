<script setup>
    import { onMounted,ref } from 'vue';
    
    let emit = defineEmits(['visitor','checkuserid','windata']);
    let visitor = function(){emit('visitor')};
    let checkuserid = function(data){emit('checkuserid',data)};
    let windata = function(data){emit('windata',data)};
    
    let id= ref("");  
    let password = ref("");
    let nickname = ref('');
    let usernickname=ref(null)
    let signcounter = ref(null);
    let logincounter = ref(null);
    let signsuccesscounter1 = ref(null);
    let signsuccesscounter2 = ref(null);

    
    let login = async function(){
        signsuccesscounter1 = null;
        const formData = new FormData();
        formData.append('ID',id.value);
        formData.append('password', password.value);
        formData.append('nickname', nickname.value);
        let response = await fetch("http://localhost:3000/api/login",{method:'POST',body:formData,credentials:"include"});
        const result= await response.text();
        const [nickname1,record1] = result.split(' ')
        usernickname.value = nickname1;
        console.log(record1)
        windata(record1);
        if (usernickname.value ==""){
            
            alert("帳號密碼錯誤");
        }
        else{
            //console.log(usernickname.value);
            visitor();
            checkuserid(usernickname.value);
        }
    }
    let signup = async function(){
        logincounter.value =null;
        const formData = new FormData();
        formData.append('ID',id.value);
        formData.append('password', password.value);
        formData.append('nickname', nickname.value);
        if(id ===null || password===null || nickname === null ){
            signsuccesscounter2.value = false
        }
        let response = await fetch("http://localhost:3000/api/gg",{method:'POST',body:formData,credentials:"include"});
        signcounter.value = await response.text();
        if (signcounter.value === "a"){
            signsuccesscounter1.value = true;           
        }    
        else{
            signsuccesscounter1.value = false;
        }           
    }
    
  

</script>

<template>
    <div id="block1">
        <div>
            帳號:<input type="text" v-model="id"></input><br/>
            密碼:<input type="password" v-model ="password"></input><br/>
            暱稱:<input type="text" v-model="nickname"></input>
            <button @click = "login">登入</button>
            <button @click = "signup">註冊</button>
            <button @click = "$emit('visitor')">我是訪客</button>
        </div>
        
        <div class="singsuccess" v-if="signsuccesscounter1===true">註冊成功</div>
        <div class="singfailed1" v-if="signsuccesscounter1===false">帳號已被使用，請重新輸入</div>
        <div class="singfailed1" v-if="signsuccesscounter2===false">請完整輸入資訊</div>

    </div>
    
</template>

<style scoped>
    .singsuccess{
        color:yellow;
    }
    .singfailed{
        color:red;
    }
    #block1{
        display: flex;
        flex-direction:row;
        justify-content: center;               
    }


</style>