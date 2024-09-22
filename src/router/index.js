import { createRouter, createWebHistory } from 'vue-router';


export const workspaceBaseRoute = '/workspace';
export const workSpaceRouteUrl = {
  Dashboard: workspaceBaseRoute + "/dashboard", // 数据看板
  Order: workspaceBaseRoute + "/order", // 订单
  OrderDetail: workspaceBaseRoute + "/order/detail", // 订单详情
  Goods: workspaceBaseRoute + "/goods", // 商品列表
  GoodsAdd: workspaceBaseRoute + "/goods/add", // 商品
  Nature: workspaceBaseRoute + "/nature", // ??
  SpecificationDetail: workspaceBaseRoute + "/specification/detail", 
  Category: workspaceBaseRoute + "/category",
  CategoryAdd: workspaceBaseRoute + "/category/add",
  User: workspaceBaseRoute + "/user",
  UserAdd: workspaceBaseRoute + "/user/add",
  Shipper: workspaceBaseRoute + "/shipper",
  ShipperList: workspaceBaseRoute + "/shipper/list",
  ShipperAdd: workspaceBaseRoute + "/shipper/add",
  ShipperEdit: workspaceBaseRoute + "/shipper/edit",
  Freight: workspaceBaseRoute + "/freight",
  Except_area: workspaceBaseRoute + "/except_area",
  Except_areaAdd: workspaceBaseRoute + "/except_area/add",
  FreightAdd: workspaceBaseRoute + "/freight/add",
  Notice: workspaceBaseRoute + "/notice",
  Ad: workspaceBaseRoute + "/ad",
  AdAdd: workspaceBaseRoute + "/ad/add",
  Shopcart: workspaceBaseRoute + "/shopcart",
  Keywords: workspaceBaseRoute + "/keywords",
  KeywordsAdd: workspaceBaseRoute + "/keywords/add",
  Goodsgalleryedit: workspaceBaseRoute + "/goodsgalleryedit",
  Admin: workspaceBaseRoute + "/admin",
  AdminAdd: workspaceBaseRoute + "/admin/add",
  AdminEdit: workspaceBaseRoute + "/admin/edit",
  SettingsShowSet: workspaceBaseRoute + "/settings/showset",
};

const routes = [
  // 包含边框菜单
  {  
    path: workspaceBaseRoute,
    component: () => import("@/components/Layout"),
    children: [
      {
        path: workSpaceRouteUrl.Dashboard,
        name: "dashboard",
        component: () => import("@/pages/Home"),
      },
      {
        path: workSpaceRouteUrl.Order,
        name: "order",
        component: () => import("@/pages/Order/OrderPage.vue"),
      },
      {
        path: workSpaceRouteUrl.OrderDetail,
        name: "order_detail",
        component: () => import("@/pages/Order/OrderDetailPage"),
      },
      {
        path: "goods",
        name: workSpaceRouteUrl.Goods,
        component: () => import("@/pages/Goods/GoodsPage"),
      },
      {
        path: workSpaceRouteUrl.GoodsAdd,
        name: "goods_add",
        component: () => import("@/pages/Goods/GoodsAddPage"),
      },
      {
        path: workSpaceRouteUrl.Nature,
        name: "nature",
        component: () => import("@/pages/Nature/NaturePage"),
      },
      {
        path: workSpaceRouteUrl.SpecificationDetail,
        name: "specification_detail",
        component: () =>
          import("@/pages/Specification/SpecificationAddPage"),
      },
      {
        path: workSpaceRouteUrl.Category,
        name: "category",
        component: () => import("@/pages/Category/CategoryPage"),
      },
      {
        path: workSpaceRouteUrl.CategoryAdd,
        name: "category_add",
        component: () => import("@/pages/Category/CategoryAddPage"),
      },
      {
        path: workSpaceRouteUrl.User,
        name: "user",
        component: () => import("@/pages/User/UserPage"),
      },
      {
        path: workSpaceRouteUrl.UserAdd,
        name: "user_add",
        component: () => import("@/pages/User/UserAddPage"),
      },
      {
        path: workSpaceRouteUrl.Shipper,
        name: "shipper",
        component: () => import("@/pages/Shipper/ShipperPage"),
      },
      {
        path: workSpaceRouteUrl.ShipperList,
        name: "shipper_list",
        component: () => import("@/pages/Shipper/ShipperListPage"),
      },
      {
        path: workSpaceRouteUrl.ShipperAdd,
        name: "shipper_add",
        component: () => import("@/pages/Shipper/ShipperAddPage"),
      },
      {
        path: workSpaceRouteUrl.ShipperEdit,
        name: "shipper_edit",
        component: () => import("@/pages/Shipper/ShipperAddPage"),
      },
      {
        path: workSpaceRouteUrl.Freight,
        name: "freight",
        component: () => import("@/pages/Freight/FreightPage"),
      },
      {
        path: workSpaceRouteUrl.Except_area,
        name: "except_area",
        component: () => import("@/pages/Freight/ExceptAreaPage"),
      },
      {
        path: workSpaceRouteUrl.Except_areaAdd,
        name: "except_area_add",
        component: () => import("@/pages/Freight/ExceptAreaAddPage"),
      },
      {
        path: workSpaceRouteUrl.FreightAdd,
        name: "freight_add",
        component: () => import("@/pages/Freight/FreightAddPage"),
      },
      {
        path: workSpaceRouteUrl.Notice,
        name: "notice",
        component: () => import("@/pages/Settings/NoticePage"),
      },
      {
        path: workSpaceRouteUrl.Ad,
        name: "ad",
        component: () => import("@/pages/Ad/AdPage"),
      },
      {
        path: workSpaceRouteUrl.AdAdd,
        name: "ad_add",
        component: () => import("@/pages/Ad/AdAddPage"),
      },
      {
        path: workSpaceRouteUrl.Shopcart,
        name: "shopcart",
        component: () => import("@/pages/ShopCart/ShopCartPage"),
      },
      {
        path: workSpaceRouteUrl.Keywords,
        name: "keywords",
        component: () => import("@/pages/Keywords/KeywordsPage"),
      },
      {
        path: workSpaceRouteUrl.KeywordsAdd,
        name: "keywords_add",
        component: () => import("@/pages/Keywords/KeywordsAddPage"),
      },
      // 看上去没有转跳进入的地方
      {
        path: workSpaceRouteUrl.Goodsgalleryedit,
        name: "goodsgalleryedit",
        component: () =>
          import("@/pages/GoodsGallery/GoodsGalleryEditPage"),
      },
      {
        path: workSpaceRouteUrl.Admin,
        name: "admin",
        component: () => import("@/pages/Admin/AdminPage"),
      },
      {
        path: workSpaceRouteUrl.AdminAdd,
        name: "admin_add",
        component: () => import("@/pages/Admin/AdminAddPage"),
      },
      {
        path: workSpaceRouteUrl.AdminEdit,
        name: "admin_edit",
        component: () => import("@/pages/Admin/AdminAddPage"),
      },
      {
        path: workSpaceRouteUrl.SettingsShowSet,
        name: "showset",
        component: () => import("@/pages/Showset/ShowSetPage"),
      },
      {
        path: ':pathMatch([.  ]*)*',
        redirect: workSpaceRouteUrl.Dashboard,
      },
    ]
  },
  // 无边框菜单
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/LoginPage"),
  },
  // 兜底路由
  {
    path: '/:pathMatch(.*)*',
    redirect: workspaceBaseRoute,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
