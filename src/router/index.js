import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export const constantRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/LoginPage"),
  },
  {
    path: "/order",
    name: "order",
    component: () => import("@/pages/Order/OrderPage"),
  },
  {
    path: "detail",
    name: "order_detail",
    component: () => import("@/pages/Order/OrderDetailPage"),
  },
  {
    path: "/welcome",
    name: "welcome",
    component: () => import("@/pages/WelcomePage"),
  },
  {
    path: "/goods",
    name: "goods",
    component: () => import("@/pages/Goods/GoodsPage"),
  },
  {
    path: "/goods/add",
    name: "goods_add",
    component: () => import("@/pages/Goods/GoodsAddPage"),
  },
  {
    path: "/nature",
    name: "nature",
    component: () => import("@/pages/Nature/NaturePage"),
  },
  {
    path: "/specification/detail",
    name: "specification_detail",
    component: () =>
      import("@/pages/Specification/SpecificationAddPage"),
  },
  {
    path: "/category",
    name: "category",
    component: () => import("@/pages/Category/CategoryPage"),
  },
  {
    path: "/category/add",
    name: "category_add",
    component: () => import("@/pages/Category/CategoryAddPage"),
  },

  {
    path: "/user",
    name: "user",
    component: () => import("@/pages/User/UserPage"),
  },
  {
    path: "/user/add",
    name: "user_add",
    component: () => import("@/pages/User/UserAddPage"),
  },
  {
    path: "/shipper",
    name: "shipper",
    component: () => import("@/pages/Shipper/ShipperPage"),
  },
  {
    path: "/shipper/list",
    name: "shipper_list",
    component: () => import("@/pages/Shipper/ShipperListPage"),
  },
  {
    path: "/shipper/add",
    name: "shipper_add",
    component: () => import("@/pages/Shipper/ShipperAddPage"),
  },
  {
    path: "/freight",
    name: "freight",
    component: () => import("@/pages/Freight/FreightPage"),
  },
  {
    path: "/except_area",
    name: "except_area",
    component: () => import("@/pages/Freight/ExceptAreaPage"),
  },
  {
    path: "/except_area/add",
    name: "except_area_add",
    component: () => import("@/pages/Freight/ExceptAreaAddPage"),
  },
  {
    path: "/freight/add",
    name: "freight_add",
    component: () => import("@/pages/Freight/FreightAddPage"),
  },
  {
    path: "/notice",
    name: "notice",
    component: () => import("@/pages/Settings/NoticePage"),
  },
  {
    path: "/ad",
    name: "ad",
    component: () => import("@/pages/Ad/AdPage"),
  },
  {
    path: "/ad/add",
    name: "ad_add",
    component: () => import("@/pages/Ad/AdAddPage"),
  },
  {
    path: "/shopcart",
    name: "shopcart",
    component: () => import("@/pages/ShopCart/ShopCartPage"),
  },
  {
    path: "/keywords",
    name: "keywords",
    component: () => import("@/pages/Keywords/KeywordsPage"),
  },
  {
    path: "/keywords/add",
    name: "keywords_add",
    component: () => import("@/pages/Keywords/KeywordsAddPage"),
  },
  // 看上去没有转跳进入的地方
  {
    path: "/goodsgalleryedit",
    name: "goodsgalleryedit",
    component: () =>
      import("@/pages/GoodsGallery/GoodsGalleryEditPage"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/pages/Admin/AdminPage"),
  },
  {
    path: "/admin/add",
    name: "admin_add",
    component: () => import("@/pages/Admin/AdminAddPage"),
  },
  {
    path: "/admin/edit",
    name: "admin_edit",
    component: () => import("@/pages/Admin/AdminAddPage"),
  },
  {
    path: "/settings/showset",
    name: "showset",
    component: () => import("@/pages/Showset/ShowSetPage"),
  },
  {
    path: "*",
    redirect: "/welcome",
  },
];

const createRouter = () =>
  new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
