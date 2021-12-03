import Login from '../components/Login'
import SignUp from '../components/SignUp'
import Errors from '../components/Error/Error'
import ServiceList from '../components/ServiceList'
import Counters from '../components/Counters'
import ActiveAccount from '../components/account/ActiveAccount.vue'
import CounterDetailMember from '../components/counter/CounterDetailMember.vue'
import CounterDetail from '../components/counter/CounterDetail.vue'
import MyNumber from '../components/orderNumber/MyNumber.vue'
import ServerDie from '../components/Error/ServerDie.vue'
import CounterListMember from '../components/counter/CounterListMember.vue'
import LoginMember from '../components/member/LoginMember.vue'

export const routes = [
    {path: '/', name: 'CounterList', component: Counters},
    {path: '/login', name: 'Login', component: Login},
    {path: '/register', name: 'Register', component: SignUp},
    {path: '/counter-list', name: 'CounterList', component: Counters},
    {path: '/service-list', name: 'ServiceList', component: ServiceList},
    {path: '/register/active-account/:username', name: 'activeAccount', component: ActiveAccount},
    {path: '/order-number/my-number', name: 'myNumber', component:MyNumber},
    {path: '/member/counter/counter-detail/:counterId', name: 'CounterDetailMember', component: CounterDetailMember},
    {path: '/counter/counter-detail/:counterId', name: 'CounterDetail', component: CounterDetail},
    {path: '/member/counter-list', namme : 'CountersMember', component:CounterListMember},
    {path: '/member', namme: 'LoginMember', component: LoginMember},
    {path: '/server-updating', name: 'serverUpdating' , component: ServerDie },
    {path: '/:pathMatch(.*)*', name: 'Error', component: Errors},
    
]

// export default routers;