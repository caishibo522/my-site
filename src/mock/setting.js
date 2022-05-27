import Mock from "mockjs";
Mock.mock('/api/setting','get',{
  code: 0,
  msg: "",
  data: {
    avatar: "https://img0.baidu.com/it/u=2892421378,52470311&fm=253&fmt=auto&app=138&f=JPEG?w=700&h=418",
    siteTitle: "我的个人空间",
    qq: "2637040377",
    weixin: "csb011027",
    mail: "2637040377@qq.com",
    icp: "河北软件职业技术学院",
    githubName: "caishibo522",
  },
})