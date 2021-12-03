<template>
  <div id="app">
        <div class="col-12" style="background: linear-gradient(#01700C, #FFFFFF); height: 100px;">
          <div class="head-title">
            <router-link to="/" style="color:#ffffff; text-decoration:none"><span>QMS</span></router-link>
            <div class="head-avatar">
              <div :class="{logined: !isLogin}" style="align-items: center;"> 
                <b-avatar :src="avatar"></b-avatar>
              <span class="username"> {{ fullName }} </span>
              </div>

              <div :class="{none_login: isLogin}"> 
                <router-link to="/login" class="login">
                  Đăng nhập
                </router-link>
              </div>
              
            </div>
            
          </div>        
      </div>
    <router-view></router-view>    
  </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
export default {
   components: {

    },
    data() {
      return {
      }
    },
    computed: {
    ...mapGetters(["fullName", "isLogin", "token", "avatar"])
    },
    methods: {
      ...mapActions(['updateLogined'])
    },
    created() {
      console.log(localStorage.getItem('isLogin'))
      this.updateLogined();
    }
}
</script>

<style scoped>

.head-title {
    color: rgb(255, 255, 255);
    font-weight: 700;
    font-size: 50px;
    padding-left: 10px;
    /* width: auto;
    display: flex;
    align-items: center */
}

.head-avatar {
    width: auto;
    float: right;
    padding-right: 23px;
    height: 100px;
    display: flex;
}

.username {
  font-size: 15px;
  font-weight: 400;
}

.logined {
  display: none;
}

.none_login {
  display: none;
}

.login {
  text-decoration: none;
  border: solid 0.5px #FFFF;
  border-radius: 5px;
  font-size: 15px;
  color: #FFFF;
  padding: 5px 5px;
}

.login:hover {
  background-color: green;
}

</style>
