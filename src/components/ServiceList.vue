<template>
    <div>
        <div class="body" >
        <div class="container">
            <div class="col-12"  style="color: #01700C; font-weight: 700; font-size: 45px; background-color: #FFFFFF; padding-top: 40px;">
                    <p class="text-center">Vui lòng chọn dịch vụ để lấy số</p>
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

    </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            services:[],
            code:''
        }
    },
    methods: {
        getNumber(code) {
            //console.log(code);
            var url = 'http://127.0.0.1:10000/api/v1/take-number?serviceCode='+code;
            let token = 'Bearer ' +localStorage.getItem('token'); 
            console.log(token)
            axios.get(url, {
                headers: {
                    Authorization: token
                }
            }).then(reponse => {
                // console.log(reponse);
                    //var list = reponse.data.data;
                    this.$alert(reponse.data.message).then(value =>{
                        if (value == true ) this.$router.push('/order-number/my-number');
                    })
                
            
            }).catch(error => {
                if (error.response.status == 401) {
                    this.showMsgBoxLogin();
                }
                else if (error.response.status == 500) {
                    this.$alert("Hệ thống đang được nâng cấp, Vui lòng thử lại sau!")
                }
                else {
                    this.$alert(error.response.data.message);
                }
            })  
            
        },

        showMsgBoxTwo(serviceCode, serviceName) {
        this.serviceCode = serviceCode;
        this.$bvModal.msgBoxConfirm('Bạn có muốn lấy số dịch vụ'+serviceName+"", {
          title: 'Xác nhận lấy số',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'success',
          okTitle: 'Xác Nhận',
          cancelTitle: 'Hủy',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
              
              if(value == true) {
                  this.getNumber(this.serviceCode)
              }
                
          })
        },

        showMsgBoxLogin() {
        this.$bvModal.msgBoxConfirm('Vui lòng đăng nhập để sử dụng dịch vụ!', {
          title: 'Xác nhận lấy số',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'success',
          okTitle: 'Xác Nhận',
          cancelTitle: 'Hủy',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
              if(value == true) {
                  this.$router.push('/login');
              }
                
          })
        }
    },
    created() {
        let token = 'Bearer ' +localStorage.getItem('token'); 
        axios.get('http://127.0.0.1:10000/api/v1/service/get-list', {
                headers: {
                    Authorization: token
                }
            }).then(reponse => {
                // console.log(reponse);
                if (reponse.status == 200) {
                    var list = reponse.data.data;
                    // console.log(list)
                    this.services = list;
                }
            })  

    }

    
}
</script>

<style scoped>

.service-list {
    display: flex; 
    flex-wrap: wrap; 
    margin-top: 100px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; 
    font-weight: 700; 
    font-size: 35px;
}

.service {
    margin: 20px; 
    width: 270px; 
    height: 400px; 
    border: solid #c4c4c4c4 0.25px;
    padding: 10px;
}

.service:hover {
    background-color: #c9c9c9c9;
}

.button {
    margin-left: 10px;
    margin-bottom: 20px;
    margin-top: 20px;
}

</style>