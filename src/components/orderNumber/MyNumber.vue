<template>
    <div>
        <div class="container" style="display: flex; ">
            <div class="col-6 active-main" >
                <div style="padding: 50px; ">
                    <h1 style="text-align: center;">Số của bạn là</h1>
                    <h1 style="text-align: center; color:#01700C">{{ number }}</h1>
                </div>
                <div style="width: 70%">
                    <p class="label">Tên dịch vụ: <span style="color:#01700C; font-weight: 700;">{{ serviceName }}</span></p>
                    <p class="label">Tên quầy: <span style="color:#01700C; font-weight: 700; text-align:center">{{ counterName }}</span> </p>
                    <p class="label">Tên khách hàng: <span style="color:#01700C; font-weight: 700;">{{ fullNameCustomer }}</span></p>
                </div>
                <button class="button" @click="xacnhan()">Xác Nhận</button>
                
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            number: '',
            serviceName: '',
            counterName: '',
            fullNameCustomer: ''

        }
    }, 
    created() {
        let token = 'Bearer ' +localStorage.getItem('token');
        axios.get('http://127.0.0.1:10000/api/v1/my-number', {
            headers:{
                Authorization: token
            }
        }).then(response => {
            let data = response.data.data;
            this.number = data.number;
            this.serviceName = data.serviceName;
            this.counterName = data.counterName;
            this.fullNameCustomer = data.fullNameCustomer;

        }).catch(error=> {
            if(error.response.status == 401) {
                this.$router.push('/login');
            }
            this.$router.push('/server-updating')
        })
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
    margin-top: 20px;
    color: #ffffff;
    -moz-box-shadow: 3px 3px 5px 0px #999;
    -webkit-box-shadow: 3px 3px 5px 0px #999;
    box-shadow: 3px 3px 5px 0px #999;
}

.button:hover {
  background-color: #024e0b;
}

.label {
    font-size: 27px;
}
</style>