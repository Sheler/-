import ErrorPage from './routes/ErrorPage'
import Login from './routes/Login'
import Index from './routes/Index'

const Routes = [
    {
        path:'/404',
        component:ErrorPage,
        requiresAuth:true,

    },
    {
        path:'/Index',
        component:Index,
        requiresAuth:true,
    },
    {
        path:'/',
        component:Login,
        requiresAuth:true,
    },
];

export default Routes