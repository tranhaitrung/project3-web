<template>
    <div>
        <div class="container" >
        <div class="title-counter" >
                <div style="font-size: 65px; font-weight: 700; ">
                    <p style="text-align: center; ">{{ counterName }}</p>
                </div>
        </div>
            <div style="display: flex; justify-content: center;">
                <div class="col-7 main">
                    <div class = "border-div col-12" style="height:500px">
                        <div style="height:300px">
                        <div style="color: #01700C; font-size:80px; margin-top:5%; font-weight:700; height:120px">
                            <p style="text-align:center">{{ number }}</p>
                        </div>
                        <div style=" font-size:45px; margin-top:1%; font-weight:500; height:80px"> 
                            <p style="text-align:center">{{ customerName }}</p>
                        </div>
                        
                        <div style=" font-size:45px; margin-top:1%; font-weight:500">
                            <p style="text-align:center">Dịch vụ: {{ serviceName }}</p>
                        </div>
                        </div>
                        <div style="margin-top:10%;">
                                <b-button variant="success" class="button" @click="callNextNumber()">Số tiếp theo</b-button>
                                <b-button variant="danger" class="button" @click="makeMissNumber()">Đặt nhỡ</b-button>
                                <b-button variant="info"  class="button">Gọi lại</b-button>
                                <b-button variant="warning"  class="button">Chuyển quầy</b-button>
                        </div>
                    </div>
                </div>
                <div class="col-4 main">
                    <div class = "border-div col-12 " style="height:249px; margin-left: 10; margin-bottom: 2px">
                        <div style="padding-top:10px"><p style="text-align:center; font-size:28px; font-weight:600">Danh sách số chờ</p></div>
                        <div class="list-number">
                            <div v-for="(wait, index) in waittings" :key="w+index">
                                <h4>{{index+1}}. {{wait.number}} - {{wait.fullNameCustomer}}</h4>
                            </div>
                        </div>
                    </div>
                    <div class = "border-div col-12 " style="height:249px">
                        <div style="padding-top:10px">
                            <p style="text-align:center; font-size:28px; font-weight:600">Danh sách số nhỡ</p>
                        </div>
                        <div class="list-number">
                            <div v-for="(missed, index) in misseds" :key="m+index">
                                <h4>{{index+1}}. {{missed.number}} - {{missed.fullNameCustomer}}</h4>
                            </div>
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
            counterName: '',
            number: '000000',
            customerName: 'Chưa có thông tin',
            serviceName: 'Chưa có thông tin',
            counterId: this.$route.params.counterId,
            waittings: [],
            misseds: []
        }
    },
    created() {
        let url = 'http://127.0.0.1:10000/api/v1/counter/detail?counterId='+this.counterId;
        let token = 'Bearer ' +localStorage.getItem('token');  
        axios.get(url, {
            headers: {
                Authorization: token
            }
        }).then(response => {
            let data = response.data.data;
            this.counterName = data.name;
            if (response.data.message != 'INACTIVE') {
                this.customerName = data.fullNameCustomer;
                this.number = data.orderNumber;
                this.counterName = data.counterName;
                this.serviceName = data.serviceName;
                this.waittings = data.waitingCustomerList;
                this.misseds = data.missedCustomerList;
            }
        }).catch(error=> {
                if(error.response.status == 401) {
                this.$router.push('/login');
                }
        })

        
    },
    methods: {
        callNextNumber() {
            let token = 'Bearer ' +localStorage.getItem('token');
            let url = 'http://localhost:10000/api/v1/next-number?counterId='+this.counterId;
            axios.get(url, {
                headers: {
                    Authorization: token
                }
            }).then(response => {
                let data = response.data.data;
                this.customerName = data.fullNameCustomer;
                this.counterName = data.counterName;
                this.number = data.orderNumber;
                this.serviceName = data.serviceName;
                this.waittings = data.waitingCustomerList;
                this.misseds = data.missedCustomerList;
            })
        },
        
        makeMissNumber() {
            let token = 'Bearer ' +localStorage.getItem('token');
            let url = 'http://127.0.0.1:10000/api/v1/make-miss-number?counterId='+this.counterId;
            axios.get(url, {
                headers: {
                    Authorization: token
                }
            }).then(response => {
                let data = response.data.data;
                this.customerName = data.fullNameCustomer;
                this.counterName = data.name;
                this.number = data.orderNumber;
                this.serviceName = data.serviceName;
                this.waittings = data.waitingCustomerList;
                this.misseds = data.missedCustomerList;
                this.counterName = data.counterName;
            })
        }
    }
}
</script>

<style scoped>
.main {
    margin: 1px;
}

.title-counter {
    background: #fff;
    margin: 0px auto;
    height: 100px;
    color: #01700C;
    border-radius: 20px;
    align-items: center;
    display: flex;
    flex-direction: column;


}

.list-number {
    padding-top: 10px;
    padding-left: 50px;
    overflow: overlay;
    height: 160px;
    padding-bottom: 10px;
}

.button {
    width: 120px;
    height: 45px;
    margin-left:52px ;
    border: none;
    border-radius: 7px;
    color: #ffffff;
    -moz-box-shadow: 3px 3px 5px 0px #999;
    -webkit-box-shadow: 3px 3px 5px 0px #999;
    box-shadow: 3px 3px 5px 0px #999;
}

.label {
    font-size: 27px;
}

.border-div {
    border: 0.25px solid #c8c8c8;
}
</style>