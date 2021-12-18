import Login from '../components/customer/login/Login'
import SignUp from '../components/customer/login/SignUp'
import Errors from '../components/error/Error'
import ServiceList from '../components/customer/services_list/ServiceList.vue'
import Counters from '../components/customer/counter/Counters.vue'
import ActiveAccount from '../components/customer/account/ActiveAccount.vue'
import CounterDetailMember from '../components/member/counter/CounterDetailMember.vue'
import CounterDetail from '../components/customer/counter/CounterDetail.vue'
import MyNumber from '../components/customer/order_number/MyNumber.vue'
import MyListNumber from '../components/customer/order_number/MyListNumber.vue'
import ServerDie from '../components/error/ServerDie.vue'
import CounterListMember from '../components/member/counter/CounterListMember.vue'
import LoginMember from '../components/member/LoginMember.vue'

export const routes = [
    {path: '/', name: 'CounterList', component: Counters},
    {path: '/login', name: 'Login', component: Login},
    {path: '/register', name: 'Register', component: SignUp},
    {path: '/counter-list', name: 'CounterList', component: Counters},
    {path: '/service-list', name: 'ServiceList', component: ServiceList},
    {path: '/register/active-account/:username', name: 'activeAccount', component: ActiveAccount},
    {path: '/order-number/my-number', name: 'myNumber', component:MyNumber},
    {path: '/order-number/my-list-number', name: 'myListNumber', component:MyListNumber},
    {path: '/member/counter/counter-detail/:counterId', name: 'CounterDetailMember', component: CounterDetailMember},
    {path: '/counter/counter-detail/:counterId', name: 'CounterDetail', component: CounterDetail},
    {path: '/member/counter-list', namme : 'CountersMember', component:CounterListMember},
    {path: '/member', namme: 'LoginMember', component: LoginMember},
    {path: '/server-updating', name: 'serverUpdating' , component: ServerDie },
    {path: '/:pathMatch(.*)*', name: 'Error', component: Errors},
    
]

// export default routers;