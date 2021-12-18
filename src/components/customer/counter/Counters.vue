<template>
    <div>
        <div class="body" >
        <div class="container" id="body-customer">
            <div class="col-12"  style="color: #01700C; font-weight: 700; font-size: 35px; background-color: #FFFFFF; padding-top: 50px;">
                    <p class="text-center">Quầy giao dịch</p>
            </div>
            <div class="container justify-content-center" style="display: flex; margin-top: 30px;">
                <el-button id="number" @click="getService()" type="primary" style=" font-size: 25px;width:200px">Lấy Số</el-button>
            </div>
            <div class="container justify-content-center" style="display: flex; flex-wrap: wrap; margin-top: 30px; font-weight: 700; font-size: 35px;">
                <div  class="counter" v-for="(counter, index) in counters" :key="index">
                    <div style="margin-top: 35px; text-align: center;">{{ counter.name }}</div>
                    <p style="text-align: center; font-size: 18px; color: green"> {{ counter.serviceName }}</p>
                    <div style="font-weight: 200; font-size: 20px; padding: 10px; margin-top: 30px; height:90px">
                        <p style="font-weight: bold;">Nhân viên</p>
                        <p  style="color: #01700C; font-weight:bold; font-size: 25px; margin-top: -15px; text-align: center;"> {{ counter.fullNameMember }}</p>
                    </div>
                    <div style="font-weight: 200; font-size: 20px; padding: 10px; margin-top: 0px; height:80px">
                        <p style="font-weight: bold;">Số đang gọi</p> 
                        <p  style="color: #01700C; font-weight:bold; font-size: 25px; margin-top: -15px; text-align: center;"> {{ counter.orderNumber }} </p>
                        <p  style="color: #01700C; font-weight:bold; font-size: 25px; margin-top: -15px; text-align: center;"> {{ counter.fullNameCustome }}</p>
                    </div>
                    <div class="div-button">
                        <el-button @click="deatailCounter(counter.id)" style="padding: 8px 10px; font-size: 20px;" v-if="counter.status === 'ACTIVE'" type="success" plain>Chi tiết quầy</el-button>
                        <el-button v-else-if="counter.status === 'INACTIVE'" type="danger" plain disabled>Quầy chưa hoạt động</el-button>
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
            counters: []
        }
    },
    methods: {
        getService() {
            this.$router.push('/service-list');
        },

        deatailCounter(id) {
            this.$router.push('/counter/counter-detail/'+id);
        },

        refreshScreen() {
            setInterval(()=> {
                let token = 'Bearer ' +localStorage.getItem('token'); 
                axios.get('http://127.0.0.1:10000/api/v1/counter/get-all', {
                    headers: {
                        Authorization: token
                    }
                }).then(reponse => {
                
                    var list = reponse.data.data;
                    this.counters = list;
                    
                }).catch(error => {
                    if (error.response.status == 500) {
                        this.$alert("Hệ thống đang được nâng cấp, Vui lòng thử lại sau!")
                    }
                })  
            },30000)
        }
    },
    created() {
      
            let token = 'Bearer ' +localStorage.getItem('token'); 
            axios.get('http://127.0.0.1:10000/api/v1/counter/get-all', {
                headers: {
                    Authorization: token
                }
            }).then(reponse => {
               
                var list = reponse.data.data;
                this.counters = list;
                
            }).catch(error => {
                if (error.response.status == 500) {
                    this.$alert("Hệ thống đang được nâng cấp, Vui lòng thử lại sau!")
                }
                else {
                    this.$router.push('/server-updating');
                }
                
            })  
            
            //this.refreshScreen()
    }
}
</script>

<style scoped>
.div-button {
    font-size: 17px;
    justify-items: center;
    align-items: center;
    display: flex;
    justify-content: center;
    height: 78px;
}

.mybutton {
    background-color: #01700C;
    border-radius: 7px;
    color: #ffffff;
    -moz-box-shadow: 3px 3px 5px 0px #999;
    -webkit-box-shadow: 3px 3px 5px 0px #999;
    box-shadow: 3px 3px 5px 0px #999;
    border: none;
  }


.mybutton:hover {
  background-color: #024e0b;
}

.counter {
    margin: 20px; 
    width: 270px; 
    height: 400px; 
    border: solid #c4c4c4c4 0.25px; 
    justify-items: center;
}

.counter:hover {
    background-color: #c9c9c9c9;
}



</style>