<template>
    <div>
        <div class="container" style="display: flex; ">
            <div class="col-6 active-main" >
                <div style="padding: 50px; ">
                    <h1 style="text-align: center;">Vui lòng kích hoạt tài khoản bằng mã gồm 6 chữ số</h1>
                </div>
                <div style="width: 50%; margin-top:3%">
                    <b-form-input v-model="code" placeholder="Nhập mã code"></b-form-input>
                </div>
                <button class="button" @click="avtiveAccount()">Xác Nhận</button>
                
            </div>
        </div>

        <div class="container justify-content-center service-list">
                <div class="align-items-center service" v-for="(service, index) in services" :key="index">
                    <div @click="showMsgBoxTwo(service.serviceCode, service.serviceName)">
                        <img style="width: 200px; height: 200px; margin-left: 35px;" :src="service.image" alt="">
                        <div style="margin-top: 35px; text-align: center;">{{ service.serviceName }}</div>
                    </div>
                    
        
                </div>
               
            </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            username : this.$route.params.username,
            code: ''
        }
    },
    methods: {
        showMsgBoxTwo() {
            this.$bvModal.msgBoxConfirm('Bạn đã kích hoạt tài khoản thành công', {
                title: 'Xác nhận lấy số',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'success',
                okTitle: 'Xác Nhận',
                //cancelTitle: 'Hủy',
                footerClass: 'p-2',
                hideHeaderClose: false,
                centered: true
            })
            .then(value => {
                if(value == true) {
                    this.$router.push('/login');
                }
            })
        },
        avtiveAccount: function() {
            
            if(this.code == '') return;

            var VerifyDTO = {
                "username": this.username,
                "verifyCode": this.code
            }

            axios.post('http://127.0.0.1:10000/api/v1/user/active-account',VerifyDTO).then(response => {
                console.log(response);
                if(response.data.statusCode == 200) {
                   this.showMsgBoxTwo() 
                }
                else {
                    this.$alert(response.data.message);
                }
                

            }).catch(error => {
                if (error.response.status == 400) {
                    this.$alert(error.response.data.message);
                }else {
                    this.$alert("Hệ thống đang được nâng cấp, Vui lòng thử lại sau!")
                }
                
                
            })
            
        }
    }
    
}
</script>

<style scoped>

.active-main {
    width: 700px;
    background: #fff;
    margin: 50px auto;
    height: 500px;
    box-shadow: 1px 10px 16.83px 1px rgb(0 0 0 / 20%);
    border-radius: 20px;
    align-items: center;
    display: flex;
    flex-direction: column;

}

.button {
    margin: inherit;
    width: 200px;
    height: 45px;
    border: none;
    background-color: #01700C;
    border-radius: 7px;
    color: #ffffff;
    -moz-box-shadow: 3px 3px 5px 0px #999;
    -webkit-box-shadow: 3px 3px 5px 0px #999;
    box-shadow: 3px 3px 5px 0px #999;
}

.button:hover {
  background-color: #024e0b;
}
</style>