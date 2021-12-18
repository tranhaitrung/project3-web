<template>
    <div>
        <div style="color:green; text-align:center; margin:10px" ><h1>DANH SÁCH DỊCH VỤ ĐÃ SỬ DỤNG</h1></div>
        <div>
            <el-row style="margin-left:3%; margin-top:1%">
                <el-input icon="el-icon-search" placeholder="Tìm Kiếm" style="width:400px" v-model="search">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <el-button  icon="el-icon-s-operation" plain style="margin-left:2%" @click="filter = true">Lọc</el-button>
            </el-row>
        </div>
        <div style="margin:auto; width:95%">
            <el-table
                ref="filterTable"
                :data="tableData"
                style="width: 100%; height: 460px;">

                <el-table-column prop="number" label="Số" width="180">
                </el-table-column>

                <el-table-column prop="serviceCode" label="Mã dịch vụ" width="180">
                </el-table-column>

                <el-table-column prop="serviceName" label="Tên dịch vụ" width="200">
                </el-table-column>

                <el-table-column prop="counterName" label="Quầy phục vụ" width="180">
                </el-table-column>
                
                <el-table-column prop="createdAt" label="Ngày lấy số" sortable width="180" column-key="date">
                </el-table-column>

                <el-table-column prop="fullNameMember" label="Nhân viên phục vụ"  >
                </el-table-column>

                <el-table-column prop="status" label="Trạng thái" width="120">
                <template slot-scope="scope">
                    <el-tag
                    :type="scope.row.status === 'DONE' ? 'success' : scope.row.status === 'WAITING' ? 'warning' : scope.row.status === 'ACTIVE' ? 'primary' : 'danger'"
                    disable-transitions>{{scope.row.status}}</el-tag>
                </template>
                </el-table-column>

                <el-table-column prop="score" label="Đánh giá" width="180">              

                    <template slot-scope="scope">
                        <el-rate
                        v-model="scope.row.score"
                        v-if="scope.row.score"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template= "">
                    </el-rate>
                    <el-button v-else-if="scope.row.status === 'DONE'" type="primary" @click="createFeedBackPopup(scope.row.id)">Đánh giá</el-button>
                    </template> 
                </el-table-column>
            </el-table>
            
            <div style="display: flex; justify-content: center; margin-top:10px">
                <el-pagination
                background
                layout="prev, pager, next"
                :page-count="totalPage"
                @current-change="handleCurrentChange"
                >
                </el-pagination>
            </div>
        </div>

        <el-dialog
            title="Bộ lọc"
            :visible.sync="filter"
            width="40%">
            <div>
                <div class="block">
                    <span class="demonstration" style="margin-right:5%">Dịch vụ</span>
                   <el-select v-model="valueCode" multiple placeholder="Chọn dịch vụ" style="width:84%">
                    <el-option
                    v-for="item in serviceCodeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select> 
                </div>

                <div class="block" style="margin-top:5%">
                    <span class="demonstration" style="margin-right:2%">Trạng thái</span>
                    <el-select v-model="valueStatus" multiple placeholder="Chọn trạng thái" style="width:84%">
                        <el-option
                        v-for="item in statusOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select> 
                </div>
                

                <div class="block" style="margin-top:5%">
                    <span class="demonstration" style="margin-right:4%">Từ ngày</span>
                    <el-input
                        placeholder="Pick a date"
                        v-model="fromDate"
                        type="date" style="width:38%">
                    </el-input>

                    <span class="demonstration" style="margin-right:2%; margin-left:2.5%">Tới</span>
                    <el-input
                        placeholder="Pick a date"
                        v-model="toDate"
                        type="date" style="width:38%">
                    </el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="filter = false">Hủy</el-button>
                <el-button type="primary" @click="filterSearch">Lọc</el-button>
            </span>
        </el-dialog>


        <el-dialog
            title="Đánh giá dịch vụ"
            :visible.sync="feedback"
            width="30%">
            <div>
                <div>
                    <el-rate
                    v-model="feedbackScore" style="height:40px; font-size: 30px;"
                    :colors="['#DD0000', '#009900', '#FF9900', '#F7BA2A',]"
                    :texts="['Tồi tệ', 'Thất vọng', 'Bình thường', 'Tốt', 'Rất tốt']"
                    show-text>
                    </el-rate>
                </div>
                <div>
                    <span>Nhận xét</span>
                    <el-input v-model="comment"></el-input>
                </div>
                
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="feedback = false">Hủy</el-button>
                <el-button type="primary" @click="feedbackService()">Đánh giá</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash';
export default {
    data() {
        return {
            tableData: [{
                number:'Trống',
                serviceCode:'Trống',
                serviceName:'Trống',
                counterName:'Trống',
                status:'Trống',
                createdAt:'00/00/00',
                score:''


            }],
            userId:'',
            search:'',
            serviceCode:'',
            fromDate:'',
            toDate:'',
            status:'',
            pageNo:'',
            pageSize:'7',
            totalPage: 1,
            filter:false,
            statusOptions: [{
                value: 'DONE',
                label: 'Đã xong'
                }, {
                value: 'ACTIVE',
                label: 'Đang xử lý'
                }, {
                value: 'WAITING',
                label: 'Đang đợi'
                }, {
                value: 'MISSED',
                label: 'Bị nhỡ'
                }],
            serviceCodeOptions: [],
            valueStatus: [],
            valueCode:[],
            feedbackScore:5,
            feedback:false,
            comment:'',
            feedbackTicketId:''
        }
    }, 
    created() {
        let token = 'Bearer ' +localStorage.getItem('token');
        axios.get(`http://127.0.0.1:10000/api/v1/my-list-number?search=${this.search}&userId=${this.userId}&serviceCode=${this.serviceCode}&fromDate=${this.fromDate}&toDate=${this.toDate}&status=${this.status}&pageNo=${this.pageNo}&pageSize=${this.pageSize}`, {
            headers:{
                Authorization: token
            }
        }).then(response => {
            let data = response.data.data;
            this.tableData = data.content;
            this.totalPage = data.totalPages;

        }).catch(error=> {
            if(error.response.status == 401) {
                this.$router.push('/login');
            }
            this.$router.push('/server-updating')
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

        
    },
    methods: {
        filterTag(value, row) {
            return row.tag === value;
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            let token = 'Bearer ' +localStorage.getItem('token');
            axios.get(`http://127.0.0.1:10000/api/v1/my-list-number?search=${this.search}&userId=${this.userId}&serviceCode=${this.serviceCode}&fromDate=${this.fromDate}&toDate=${this.toDate}&status=${this.status}&pageNo=${this.pageNo}&pageSize=${this.pageSize}`, {
                headers:{
                    Authorization: token
                }
            }).then(response => {
                let data = response.data.data;
                this.tableData = data.content;
                this.totalPage = data.totalPages;

            }).catch(error=> {
                if(error.response.status == 401) {
                    this.$router.push('/login');
                }
                this.$router.push('/server-updating')
            })
        },
        filterSearch(){
            this.filter = false;
            this.status = this.valueStatus.join();
            this.serviceCode = this.valueCode.join();
            this.pageNo = 1;
            // this.fromDate = this.fromDate != null ? new Date(this.fromDate).toJSON() : '';
            // this.toDate = this.toDate != null ? new Date(this.toDate).toJSON() : '';
            let token = 'Bearer ' +localStorage.getItem('token');
            axios.get(`http://127.0.0.1:10000/api/v1/my-list-number?search=${this.search}&userId=${this.userId}&serviceCode=${this.serviceCode}&fromDate=${this.fromDate}&toDate=${this.toDate}&status=${this.status}&pageNo=${this.pageNo}&pageSize=${this.pageSize}`, {
                headers:{
                    Authorization: token
                }
            }).then(response => {
                let data = response.data.data;
                this.tableData = data.content;
                this.totalPage = data.totalPages;

            }).catch(error=> {
                if(error.response.status == 401) {
                    this.$message.error("Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại để sử dụng dịch vụ!")
                    this.$router.push('/login');
                }
                if(error.response.status == 400) {
                    this.$message.error("Tìm kiếm không thành công")
                }
                //this.$router.push('/server-updating')
            })
        },

        feedbackService(){
            var feedbackDTO = {
                ticketId: this.feedbackTicketId,
                score: this.feedbackScore,
                comment: this.comment
            }

            let token = 'Bearer ' +localStorage.getItem('token');
            axios.post('http://127.0.0.1:10000/api/v1/feedback/customer',
            feedbackDTO,
            {
                headers:{
                    Authorization: token
                }
            }
            )
            .then(response=>{
                if (response.status == 200) {
                    this.$message({
                        message: 'Đánh giá dịch vụ thành công!',
                        type: 'success'})
                    }
                this.feedback = false;
                this.filterSearch();
            })
            .catch(error=>{
                if(error.response.status == 401) {
                    this.$message.error('Lượt đang nhập của bạn đã hết hạn. Vui lòng đăng nhập lại!');
                    this.$router.push('/login');
                }
                else if(error.response.status == 400) {
                    this.$message.error(error.response.data.message);
                }else{
                    this.$message.error('Hệ thống đang gặp sự cố. Vui lòng thao tác sau ít phút!');
                }
            })

        },

        createFeedBackPopup(ticketId) {
            this.feedback = true;
            this.feedbackTicketId = ticketId;
        }
    },
    watch: {
        search: _.debounce(function () {
            this.filterSearch();
        }, 1000) 
    }
}
</script>

<style scoped>


</style>