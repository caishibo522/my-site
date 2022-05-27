import Home from "@/views/Home";
import About from "@/views/About";
import Message from "@/views/Message";
import Blog from "@/views/Blog";
import Detail from "@/views/Blog/Detail";
export default [
  {name:'Home',path:'/',component: Home},
  {name:'Blog',path:'/article',component: Blog},
  {name:'CategoryBlog',path:'/article/cate/:categoryid',component: Blog},
  {name:'BlogDetail',path:'/article/:id',component: Detail},
  {name:'Message',path:'/message',component: Message},
  {name:'About',path:'/about',component: About},

]
