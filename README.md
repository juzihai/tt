##配置方法
##假设支持分包的小程序目录结构如下：

├── app.js
├── app.json
├── app.wxss
├── packageA
│   └── pages
│       ├── cat
│       └── dog
├── packageB
│   └── pages
│       ├── apple
│       └── banana
├── pages
│   ├── index
│   └── logs
└── utils
开发者通过在 app.json subpackages 字段声明项目分包结构：

写成 subPackages 也支持。

{
  "pages": ["pages/index", "pages/logs"],
  "subpackages": [
    {
      "root": "packageA",
      "pages": ["pages/cat", "pages/dog"]
    },
    {
      "root": "packageB",
      "name": "pack2",
      "pages": ["pages/apple", "pages/banana"]
    }
  ]
}
##小程序页面路径配置
├── app.js
├── app.json
├── app.wxss
├── model
│   ├── index
│   └── logs
├── pages
│   └── pages
│       ├── cat
│       └── dog
│       └── logs//个人中心
├── packageA
│   └── pages
│       ├── cat
│       └── dog
├── packageB
│   └── pages
│       ├── apple
│       └── banana
├── packagec
│   └── pages
│       ├── apple
│       └── banana
└── utils