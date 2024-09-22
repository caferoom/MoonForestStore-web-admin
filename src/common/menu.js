export const workspaceMenuTree = [{
  title: "后台主页",
    path: "/home",
    icon: "el-icon-location",
  }, {
    title: "订单列表",
    path: "/order",
    icon: "el-icon-location",
  }, {
    title: "商品管理",
    icon: "el-icon-location",
    path: "goodsMgr",
    children: [
      {
        title: "商品列表",
        path: "/goods"
      }, {
        title: "商品设置",
        path: "/nature",
        children: [{
            hide: true,
            title: "添加型号",
            path: "/specification/detail",
          }, {
            hide: true,
            title: "添加分类",
            path: "/category/add",
          }
        ],
      }]
  }, {
    title: "购物车",
    path: "/shopcart",
    icon: "el-icon-location",
  }, {
    title: "用户列表",
    path: "/user",
    icon: "el-icon-location",
  }, {
    title: "店铺设置",
    icon: "el-icon-location",
    path: "settings",
    children: [
      {
        title: "显示设置",
        path: "/settings/showset",
      }, {
        title: "广告列表",
        path: "/ad",
        children: [{
          hide: true,
          title: "编辑广告",
          path: "/ad/add"
        }]  
      }, {
        title: "公告设置",
        path: "/notice",
      }, {
        title: "运费模板",
        path: "/freight",
        children: [
          {
            hide: true,
            title: "新增快递模板",
            path: "/freight/add",
          }, {
            hide: true,
            title: "新增偏远地区",
            path: "/except_area/add",
          }, {
            hide: true,
            title: "偏远地区列表",
            path: "/except_area",
          }
        ],
      }, {
        title: "快递设置",
        path: "/shipper",
        children: [
          {
            hide: true,
            title: "快递列表",
            path: "/shipper/list",
          }, {
            hide: true,
            title: "新增快递",
            path: "/shipper/add",
          }, {
            hide: true,
            title: "编辑快递公司信息",
            path: "/shipper/edit",
          }
        ],
      }, {
        title: "管理员设置",
        path: "/admin",
        children: [
          {
            hide: true,
            title: "新增管理员",
            path: "/admin/add",
          }, {
            hide: true,
            title: "编辑管理员",
            path: "/admin/edit",
          }
        ],
      }
    ],
  }];
