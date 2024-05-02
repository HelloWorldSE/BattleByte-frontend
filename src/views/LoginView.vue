<template>
  <div class="login">
    <div class="blurBox">
      <div id="backBox">
      <h1 class="title">欢迎登录</h1>
      <!-- 表单宽度55% -->
      <Form style="width: 55%" :model="formState" ref="formRef">
        <FormItem :rules="[{validator: userNameCheck, trigger: 'blur'}]" name="userName">
          <Input
              placeholder="请输入用户名"
              v-model:value="formState.userName"
          ></Input>
        </FormItem>
        <FormItem name="passWord" :rules="[{validator: passWordCheck, trigger: 'blur'}]">
          <InputPassword placeholder="请输入密码" v-model:value="formState.passWord"></InputPassword>
          </FormItem>
        <FormItem>
          <!-- 提交按钮宽度100% -->
          <Button type="primary" html-type="submit" style="width: 100%" @click="Login_Submit">登录</Button>
          
        </FormItem>
        <FormItem>
          <Button type="primary" style="width: 100%" @click="Register_Submit">没有账号？去注册</Button>
        </FormItem>
      </Form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {FormInstance} from "ant-design-vue";
import {reactive, ref, defineComponent} from "vue";
import type {Rule} from "ant-design-vue/es/form";
import {useRouter} from 'vue-router';
import { Form, Button, Input, FormItem, InputPassword } from "ant-design-vue";
// import axios from 'axios';
// import { useCookies } from "vue3-cookies";
import {generatePost} from "@/utils/protocol";

import { getUserId, isLoggedIn } from "@/utils/auth";
import { useHallState } from "@/stores/hall";

const formItem = Form.Item;
const inputPassword = Input.Password;



// 定义路由器，负责路由跳转
const router = useRouter();

// 如果已经登录，跳转 home
if (isLoggedIn()) {
  router.push('/')
}


// 定义一个没用的玩意
const formRef = ref<FormInstance>()

// 定义表单域
const formState = reactive({
  userName: '',
  passWord: ''
})

// 用户名校验规则
const userNameCheck = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject('用户名不能为空')
  } else if (value.length <= 2) {
    return Promise.reject('用户名长度不能小于两个字符')
  } else {
    return Promise.resolve()
  }
}

// 密码校验规则
const passWordCheck = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject('密码不能为空')
  } else if (value.length < 5) {
    return Promise.reject('密码长度不能小于5个字符')
  } else {
    return Promise.resolve()
  }
}


const hall = useHallState()

const Login_Submit = async () => {
  const userName = formState.userName;
  const passWord = formState.passWord;

  generatePost('auth/login', {userName:userName, password:passWord}).then((res) => {
    console.log(res);
    if (res.data.status === 0) {
      // 登录成功
      // 保存token
      localStorage.setItem('token', res.data.data.token);
      
      hall.hall.login()
      
      // let userId = getUserId();
      router.push('/');
    } else {
      // 登录失败
      console.log('登录失败');
      alert('登录失败');
    }
  }).catch((err) => {
    console.log(err);
  // router.push('/');
});
}

// 登录按钮：路由跳转
// function Login_Submit() {
//   // console.log(userNameCheck);
//   const userName = formState.userName;
//   const passWord = formState.passWord;
//   // router.push('/');
// }

// 注册按钮：路由跳转
function Register_Submit() {
  // console.log(userNameCheck);
  router.push('/auth/register');
}

function jump() {
  router.push('/');
}


</script>

<style scoped>
.login {
  min-width: 100vw;
  min-height: 100vh;
  background-image: url("https://source.unsplash.com/featured/1600x900");
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* 这个属性可以使子元素的背景与当前背景重合 */
  display: flex;
  justify-content: center;
  align-items: center;
}

#backBox {
        background: rgba(255, 255, 255, 0.8);
        z-index: 999;
        width: 80%;
        height: 90%;
        background: white;
        position: absolute;
        z-index: 999;
        /* top: 50%;
        left: 50%; */
        border-radius: 10%;
        box-shadow: 10px 25px 50px -20px rgb(0 0 0 / 0.26);
        display: flex;

        flex-direction: column;
        justify-content: center;
        align-items: center;
        /* filter: none; */
    }
  
  /* 通过 .blurBox 和 .blurBox::before 实现透明效果 */
    .blurBox {
    width: 460px;
    height: 460px;
    background: inherit;
    position: relative;
    border-radius: .05rem;
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.26);
    /* z-index: -10; */
    /* filter: blur(10px); */

    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    }



    .blurBox::before {
    background: inherit;
    content: "";
    filter: blur(10px); 
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -10;
    } 

.title {
  font-weight: bold;
  color: #190d11;
}
</style>
