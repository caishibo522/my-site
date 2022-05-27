import Mock from "mockjs";
Mock.mock('/api/banner','get',{
  code: 0,
  msg: '',
  data:[
    {
      id:1,
      bgImg: 'https://img1.baidu.com/it/u=2460683175,226667847&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800',
      title: "血火同源",
      description: "如果我回头，一切都完了",

    },
    {
      id:2,
      bgImg:'https://img0.baidu.com/it/u=2256967773,499203472&fm=253&fmt=auto?w=1422&h=800',
      title: "凛冬将至",
      description: "人唯有恐惧的时候方能勇敢",
    },
    {
      id:3,
      bgImg: 'https://img0.baidu.com/it/u=1999390786,888570397&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800',
      title: "听我怒吼",
      description: "兰尼斯特有债必偿",
    }
  ]
})