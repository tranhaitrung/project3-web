<template>
    <div>
        <div class="body" >
        <div class="container" id="body-customer">
            <div class="col-12"  style="color: #01700C; font-weight: 700; font-size: 35px; background-color: #FFFFFF; padding-top: 50px;">
                    <p class="text-center">Quầy giao dịch</p>
            </div>
            <div class="container justify-content-center" style="display: flex; margin-top: 30px;">
                <button id="number" class="mybutton" style="height: 40px; width: 150px; font-size: 25px; font-weight: 500;" @click="getService()" >Lấy Số</button>
            </div>
            <div class="container justify-content-center" style="display: flex; flex-wrap: wrap; margin-top: 30px; font-weight: 700; font-size: 35px;">
                <div  class="counter" v-for="(counter, index) in counters" :key="index">
                    <div style="margin-top: 35px; text-align: center;">{{ counter.name }}</div>
                    <p style="text-align: center; font-size: 15px"> 
                        <el-tag
                            :type="counter.status === 'ACTIVE' ? 'success' : 'danger'"
                            disable-transitions>{{counter.status}}</el-tag>
                    </p>
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
                        <button @click="createPopupActiveCounter(counter.id, counter.name)" class="mybutton" style="padding: 2px 10px;" v-if="counter.status === 'INACTIVE'">Kích hoạt quầy</button>
                     
                        <el-button v-else-if="counter.status === 'ACTIVE'" type="primary" plain disabled>Quầy đã có nhân viên</el-button>
                    </div>
                </div>            
            </div>
        </div>

    </div>

    <el-dialog
            title="Mở quầy"
            :visible.sync="activePopup"
            width="30%">
            <div>
                <div class="block" style="height: 80px; text-align: center; font-size: 30px; font-weight: 500; color:#303133">
                    {{counterActiveName}}
                </div>
                <div class="block">
                    <span class="demonstration" style="margin-right:5%">Dịch vụ</span>
                   <el-select v-model="serviceCodeActive" placeholder="Chọn dịch vụ" style="width:84%">
                    <el-option
                    v-for="item in serviceCodeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select> 
                </div>
                
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="activePopup = false">Hủy</el-button>
                <el-button type="primary" @click="activeCounter()">Kích hoạt</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            counters: [],
            serviceCodeOptions:[],
            counterActiveId:'',
            counterActiveName:'',
            serviceCodeActive:'',
            activePopup:false
        }
    },
    methods: {
        getService() {
            this.$router.push('/service-list');
        },

        activeCounter() {
            let url = `http://127.0.0.1:10000/api/v1/active-counter`;
            let token = 'Bearer ' +localStorage.getItem('token');
            var counterDTO = {
                "counterId": this.counterActiveId,
                "serviceCode" : this.serviceCodeActive
            }
            axios.post(url, counterDTO, {
                headers: {
                    Authorization: token
                }
            }).then(reponse => {
                if (reponse.status == 200) {
                    this.$message({
                        message: `Kích hoạt ${this.counterActiveName} thành công!`,
                        type: 'success'})
                }
                this.$router.push(`/member/counter/counter-detail/${this.counterActiveId}`);
                
            }).catch(error => {
                if (error.response.status == 500) {
                    this.$message.error("Hệ thống đang được nâng cấp, Vui lòng thử lại sau!")
                }
                if (error.response.status == 403) {
                    this.$message.error("Bạn không đủ quyền để sử dụng chức năng này. Vui lòng liên hệ ADMIN hoặc MANAGER để được giải quyết!")
                }
               
                if(error.response.status == 401) {
                this.$router.push('/login');
                }
            })  
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
                        this.$$message.error("Hệ thống đang được nâng cấp, Vui lòng thử lại sau!")
                    }
                })  
            },30000)
        },
        createPopupActiveCounter(counterId, counterName) {
            this.counterActiveId = counterId;
            this.counterActiveName = counterName;
            this.activePopup = true;
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
            })
            
            axios.get(`http://127.0.0.1:10000/api/v1/service/get-list`)
            .then(response => {
                var data = response.data.data;
                console.log(data)
                for(let service of data) {
                    this.serviceCodeOptions.push({
                        value:service.serviceCode,
                        label:service.serviceName
                    })
                }

            }).catch(error=> {
                if (error.response.status == 500)
                    this.$message.error("Hệ thống đang gặp sự cố. Vui lòng thử lại sau ít phút!")
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