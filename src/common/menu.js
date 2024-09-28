import { workspaceBaseRoute, workSpaceRouteUrl } from "../router";


export const workspaceMenuTree = [{
  title: "数据看板",
    path: workSpaceRouteUrl.Dashboard,
    icon: "el-icon-Aim",
  }, {
    title: "订单列表",
    path: workSpaceRouteUrl.Order,
    icon: "document",
  }, {
    title: "商品管理",
    icon: "el-icon-location",
    path: "goodsMgr",
    children: [
      {
        title: "商品列表",
        path: workSpaceRouteUrl.Goods,
      }, {
        title: "商品设置",
        path: workSpaceRouteUrl.Nature,
      }]
  }, {
    title: "购物车",
    path: workSpaceRouteUrl.Shopcart,
    icon: "el-icon-location",
  }, {
    title: "客户管理",
    path: "userManager",
    icon: "el-icon-location",
    children: [
      {
        title: "客户列表",
        path: workSpaceRouteUrl.User,
      }
    ],
  }, {
    title: "店铺设置",
    icon: "el-icon-location",
    path: "settings",
    children: [
      {
        title: "显示设置",
        path: workSpaceRouteUrl.SettingsShowSet,
      }, {
        title: "广告列表",
        path: workSpaceRouteUrl.Ad,
      }, {
        title: "公告设置",
        path: workSpaceRouteUrl.Notice,
      }, {
        title: "运费模板",
        path: workSpaceRouteUrl.Freight,
      }, {
        title: "快递设置",
        path: workSpaceRouteUrl.Shipper,
      }, {
        title: "管理员设置",
        path: workSpaceRouteUrl.Admin,
      }
    ],
  }];
