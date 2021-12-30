<template>
  <div id="app">
    <div class="col-12" style="background: linear-gradient(#01700C, #FFFFFF); height: 100px;">
      <div class="head-title">
        <router-link to="/" style="color:#ffffff; text-decoration:none"><span>QMS</span></router-link>
        <div class="head-avatar">
          <div :class="{logined: !isLogin}" style="align-items: center;"> 
            <el-dropdown>
              <span class="el-dropdown-link">
                <b-avatar :src="avatar"></b-avatar><i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item style="text-align:center; font-weight:700">{{fullName}}</el-dropdown-item>
                <el-dropdown-item icon="el-icon-tickets">
                  <span type="text" @click="myNumber">Số đã lấy</span>
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-edit-outline">
                  <span type="text" @click="showUpdateInfo" >Cập nhật thông tin</span>
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-key">
                  <span type="text" @click="outerVisible_pass = true">Đổi mật khẩu</span>
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-user-solid">
                  <span type="text" @click="logout">Đăng xuất</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

          <div :class="{none_login: isLogin}"> 
            <router-link to="/login" class="login">
              Đăng nhập
            </router-link>
          </div>
          
        </div>
        
      </div>        
    </div>
    <el-dialog title="Cập nhật thông tin" :visible.sync="outerVisible">
      <div>
        <el-form :model="user" ref="user" label-width="100px" class="demo-ruleForm">
          <el-upload
            class="avatar-uploader"
            :action="upImage"
            :headers="headerObj"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            style="display:flex; justify-content:center">
            <img v-if="user.avatar" :src="user.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon">Đổi avatar</i>
          </el-upload>
          
          <br>
          <el-form-item label="Họ" prop="firstName" :rules="[{ required: true, message: 'Vui lòng điền Họ'}]">
            <el-input v-model="user.firstName"></el-input>
          </el-form-item>

          <el-form-item label="Tên" prop="lastName" :rules="[{ required: true, message: 'Vui lòng điền Tên'}]">
            <el-input v-model="user.lastName" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="Ngày sinh" :rules="[{ required: true, message: 'Vui lòng nhập ngày sinh'}]">
            <el-input type="date" v-model="user.birthday" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="Địa chỉ" prop="address" :rules="[{ required: true, message: 'Vui lòng điền địa chỉ'}]">
            <el-input v-model="user.address" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="Điện thoại" prop="phone" :rules="[{ required: true, message: 'Vui lòng nhập số điện thoại'}]">
            <el-input  v-model="user.phone" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        
        
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">Hủy bỏ</el-button>
        <el-button type="primary" @click="updateInfo">Cập nhật</el-button>
      </div>
    </el-dialog>

    <el-dialog title="Thay đổi mật khẩu" :visible.sync="outerVisible_pass"  width="40%">
      <div>
        <el-form :model="user" ref="user" label-width="180px" class="demo-ruleForm">
          <el-form-item label="Nhập mật khẩu"  prop="password" :rules="[{ required: true, message: 'Nhập mật khẩu cũ'}]" >
            <el-input v-model="user.password" type="password"></el-input>
          </el-form-item>

          <el-form-item label="Nhập mật khẩu mới" prop="newPass" :rules="[{ required: true, message: 'Nhập mật khẩu mới'}]" >
            <el-input v-model="user.newPass" autocomplete="off" type="password" ></el-input>
          </el-form-item>

          <el-form-item label="Nhập lại mật khẩu mới" prop="rePass" :rules="[{ required: true, message: 'Nhập lại mật khẩu mới'}]">
            <el-input v-model="user.rePass" autocomplete="off" ></el-input>
          </el-form-item>
        </el-form>      
        
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible_pass = false">Hủy bỏ</el-button>
        <el-button type="primary" @click="updatePass()">Cập nhật</el-button>
      </div>
    </el-dialog>

    <router-view></router-view>    
  </div>
</template>

<script>
import axios from 'axios';
import urlHostAPI from '/src/url.js'

import {mapGetters, mapActions} from 'vuex'
export default {
   components: {

    },
    data() {
      return {
        outerVisible: false,
        outerVisible_pass: false,
        innerVisible: false,
        user: {
          age: '',
          firstName:'',
          lastName:'',
          address:'',
          birthday:'',
          phone:'',
          avatar:'',
          password:'',
          newPass:'',
          rePass:'',
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        headerObj: {
          Authorization: ''
        },
        upImage: `${urlHostAPI}api/v1/up-file`
      }
    },
    computed: {
    ...mapGetters(["fullName", "isLogin", "token", "avatar"])
    },
    methods: {
      ...mapActions(['updateLogined']),
      updateInfo() {
        let token = 'Bearer ' +localStorage.getItem('token');

        var userDTO = {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          address: this.user.address,
          birthday: this.user.birthday,
          phone: this.user.phone,
          avatar: this.user.avatar                                 
        }
        console.log(userDTO);
        var isValidated = this.validateInfor();
        if (!isValidated){
          this.$message.error('Lỗi. Vui lòng nhập đủ thông tin.');
          return;
        }

        axios.post(`${urlHostAPI}api/v1/user/update-info`,
        userDTO, 
        {
          headers:{
                Authorization: token
            }
        }).then(response => {

          let data = response.data.data;
          this.user.firstName = data.firstName;
          this.user.lastName = data.lastName;
          this.user.address = data.address;
          this.user.phone = data.phone;
          this.user.birthday = data.birthday;
          this.user.avatar = data.avatar;
          this.$message({
          message: 'Cập nhật thông tin thành công!',
          type: 'success'})
          localStorage.setItem('avatar', data.avatar);
          this.updateLogined();
        })
        .catch(error=>{
          if(error.response.status == 401) {
            this.$message.error('Lượt đang nhập của bạn đã hết hạn. Vui lòng đăng nhập lại!');
            this.$router.push('/login');
          }
          else if(error.response.status == 400) {
            this.$message.error('Cập nhật thông tin không thành công!');
            
          }
          else {
            this.$message.error('Hệ thống đang gặp sự cố. Vui lòng thao tác sau ít phút!');
          }
        })
        
      },
      validateInfor() {
        if(this.user.firstName == '' || this.user.lastName == '' || this.user.phone == '' || this.user.address == '' || this.user.birthday == '') {
          return false;
        }
        return true;
      },
      updatePass() {
        var isValidatePass = this.validatePass();
        let token = 'Bearer ' +localStorage.getItem('token');
        if(!isValidatePass) return;

        var changePassDTO = {
          "password":this.user.password,
          "newPass":this.user.newPass
        }

        axios.post(`${urlHostAPI}api/v1/user/change-pass`,
        changePassDTO,
        {
          headers:{
                Authorization: token
            }
        })
        .then(response=>{
          if(response.status == 200) {
            this.$message({
            message: 'Cập nhật mật khẩu thành công!',
            type: 'success'})
          }
        })
        .catch(error=> {
          if(error.response.status == 401) {
            this.$message.error('Lượt đang nhập của bạn đã hết hạn. Vui lòng đăng nhập lại!');
            this.$router.push('/login');
          }
          else if(error.response.status == 400) {
            this.$message.error('Thay đổi mật khẩu thất bại!');
          }else{
            this.$message.error('Hệ thống đang gặp sự cố. Vui lòng thao tác sau ít phút!');
          }
        })
        
      },
      handleAvatarSuccess(res) {
        const data = res.data
        console.log(data.sourceUrl)
        this.user.avatar = data.sourceUrl
        this.$message.success("Tải ảnh lên thành công!")
      },

      beforeAvatarUpload() {
        this.headerObj.Authorization = 'Bearer ' + localStorage.getItem('token')
      },
      validatePass() {
        let newPass = this.user.newPass;
        let rePass = this.user.rePass;
        let pass = this.user.password;
        if (newPass == '' || rePass == '' || pass == '') {
          this.$message.error('Nhập đủ thông tin để đổi mật khẩu!');
          return false;
        }
        if (newPass.length < 6) {
          this.$message.error('Mật khẩu cần tối thiểu 6 kí tự!');
          return false;
        }
        if (newPass != rePass) {
          this.$message.error('Mật khẩu nhập lại không khớp!');
          return false;
        }
        if (newPass == pass) {
          this.$message.error('Mật khẩu chưa thay đổi!');
          return false;
        }
        return true;
      },
      showUpdateInfo() {
        this.outerVisible = true;
        let token = 'Bearer ' +localStorage.getItem('token');
        axios.get(`${urlHostAPI}api/v1/user/info-user-token`,
        {
          headers:{
                Authorization: token
            }
        })
        .then(response=>{
          let data = response.data.data;
          this.user.firstName = data.firstName;
          this.user.lastName = data.lastName;
          this.user.address = data.address;
          this.user.phone = data.phone;
          this.user.birthday = data.birthday;
          this.user.avatar = data.avatar;
        })
        .catch(error=> {
          if(error.response.status == 401) {
            this.$message.error('Lượt đang nhập của bạn đã hết hạn. Vui lòng đăng nhập lại!');
            this.$router.push('/login');
          }
          else if(error.response.status == 400) {
            this.$message.error('Không rõ nguyên nhân :)))!');
          }else{
            this.$message.error('Hệ thống đang gặp sự cố. Vui lòng thao tác sau ít phút!');
          }
        })
      },

      logout() {
        this.$router.push('/login')
      },
      myNumber() {
        this.$router.push('/order-number/my-list-number')
      }
    },
    created() {
      console.log(localStorage.getItem('isLogin'))
      this.updateLogined();
    },
    
    // upImage() {
    //   var action = `${urlHostAPI}api/v1/up-file`;
    //   return action
    // },

}
</script>

<style scoped>

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

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
