# nc-site

Using react with webpack:

git clone git@git.yonyou.com:cloudcrm_pc_web/nc_fit.git

cd nc_fit/

#window操作系统设计一下大小写敏感
git config core.ignorecase false

#安装启动
npm install

如果npm安装比较慢，用淘宝镜像。
$ npm install -g cnpm --registry=https://registry.npm.taobao.org

然后安装
cnpm install

启动项目

npm run dev
node server

打开localhost:8081/crmweb


# 目录描述

1， 目录：routes，定义一个路由，路由引用一个components目录下业务组件container文件夹
2   目录：components，定义业务目录 目录包括 container, action, reducer（自定义公共UI组件在common）
3， 目录：reducers，根reducer引用components目录各业务reducer文件夹
4， 目录：assets， 存放自定义静态资源，图片images, 额外css，
5， 目录：utils, 存放自定义方法，如包装ajax方法，获取cookie登录状态和个人信息等。
6， 目录：store, 总状态生成目录。
7， 目录：api,   接口统一管理目录。

# 开发流程
1，routes目录下建一个路由
2，components目录下建业务组件（注意一级目录二级目录层级）
3，根reducers目录下引用components业务组件下的reducer
4，业务组件引入action，与对应的reducer状态

# 开发规范

组件命名大写开始

组件目录与组件命名联系（目录不用大选开头）

actionType 全部大写并且全局唯一 例如 “GET_USERLIST_INFO”

reduser 根据actionType修改状态

contaniner 绑定state用两个$$   例如$$stateHome: state.home