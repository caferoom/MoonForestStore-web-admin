export const menuTree = [{
    name: "后台主页",
    url: "/welcome",
    icon: "el-icon-location",
  }, {
    name: "订单列表",
    url: "/order",
    icon: "el-icon-location",
  }, {
    name: "商品管理",
    icon: "el-icon-location",
    url: "goodsMgr",
    children: [{
      name: "商品列表",
      url: "/goods"
    }, {
      name: "商品设置",
      url: "/nature"
    }]
  }, {
    name: "购物车",
    url: "/shopcart",
    icon: "el-icon-location",
  }, {
    name: "用户列表",
    url: "/user",
    icon: "el-icon-location",
  }, {
    name: "店铺设置",
    icon: "el-icon-location",
    url: "settings",
    children: [
      {
      name: "显示设置",
      url: "/settings/showset",
      }, {
      name: "广告列表",
      url: "/ad",
      }, {
        name: "公告设置",
        url: "/notice",
      }, {
        name: "运费模板",
        url: "/freight",

      }, {
        name: "快递设置",
        url: "/shipper",
      }, {
        name: "管理员设置",
        url: "/admin",
        children: [{
          hide: true,
          name: "新增管理员",
          url: "/admin/add",
        }, {
          hide: true,
          name: "编辑管理员",
          url: "/admin/edit",
        }],
      }
    ],
  }];


const flattenMenuTree = (routes) => {
  const flatRoutes = [];

  routes.forEach(route => {
    const { children, ...others } = route;
    flatRoutes.push({...others});

    if (children) {
      flatRoutes.push(...flattenMenuTree(children));
    }
  });

  return flatRoutes;
}

export const flatRoutes = flattenMenuTree(menuTree);