import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  // 包含边框菜单
  {  
    path: '/workspace',
    component: () => import("@/components/Layout"),
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/pages/Home"),
      },
      {
        path: "order",
        name: "order",
        component: () => import("@/pages/Order/OrderPage.vue"),
      },
      {
        path: "detail",
        name: "order_detail",
        component: () => import("@/pages/Order/OrderDetailPage"),
      },
      {
        path: "goods",
        name: "goods",
        component: () => import("@/pages/Goods/GoodsPage"),
      },
      {
        path: "goods/add",
        name: "goods_add",
        component: () => import("@/pages/Goods/GoodsAddPage"),
      },
      {
        path: "nature",
        name: "nature",
        component: () => import("@/pages/Nature/NaturePage"),
      },
      {
        path: "specification/detail",
        name: "specification_detail",
        component: () =>
          import("@/pages/Specification/SpecificationAddPage"),
      },
      {
        path: "category",
        name: "category",
        component: () => import("@/pages/Category/CategoryPage"),
      },
      {
        path: "category/add",
        name: "category_add",
        component: () => import("@/pages/Category/CategoryAddPage"),
      },
      {
        path: "user",
        name: "user",
        component: () => import("@/pages/User/UserPage"),
      },
      {
        path: "user/add",
        name: "user_add",
        component: () => import("@/pages/User/UserAddPage"),
      },
      {
        path: "shipper",
        name: "shipper",
        component: () => import("@/pages/Shipper/ShipperPage"),
      },
      {
        path: "shipper/list",
        name: "shipper_list",
        component: () => import("@/pages/Shipper/ShipperListPage"),
      },
      {
        path: "shipper/add",
        name: "shipper_add",
        component: () => import("@/pages/Shipper/ShipperAddPage"),
      },
      {
        path: "shipper/edit",
        name: "shipper_edit",
        component: () => import("@/pages/Shipper/ShipperAddPage"),
      },
      {
        path: "freight",
        name: "freight",
        component: () => import("@/pages/Freight/FreightPage"),
      },
      {
        path: "except_area",
        name: "except_area",
        component: () => import("@/pages/Freight/ExceptAreaPage"),
      },
      {
        path: "except_area/add",
        name: "except_area_add",
        component: () => import("@/pages/Freight/ExceptAreaAddPage"),
      },
      {
        path: "freight/add",
        name: "freight_add",
        component: () => import("@/pages/Freight/FreightAddPage"),
      },
      {
        path: "notice",
        name: "notice",
        component: () => import("@/pages/Settings/NoticePage"),
      },
      {
        path: "ad",
        name: "ad",
        component: () => import("@/pages/Ad/AdPage"),
      },
      {
        path: "ad/add",
        name: "ad_add",
        component: () => import("@/pages/Ad/AdAddPage"),
      },
      {
        path: "shopcart",
        name: "shopcart",
        component: () => import("@/pages/ShopCart/ShopCartPage"),
      },
      {
        path: "keywords",
        name: "keywords",
        component: () => import("@/pages/Keywords/KeywordsPage"),
      },
      {
        path: "keywords/add",
        name: "keywords_add",
        component: () => import("@/pages/Keywords/KeywordsAddPage"),
      },
      // 看上去没有转跳进入的地方
      {
        path: "goodsgalleryedit",
        name: "goodsgalleryedit",
        component: () =>
          import("@/pages/GoodsGallery/GoodsGalleryEditPage"),
      },
      {
        path: "admin",
        name: "admin",
        component: () => import("@/pages/Admin/AdminPage"),
      },
      {
        path: "admin/add",
        name: "admin_add",
        component: () => import("@/pages/Admin/AdminAddPage"),
      },
      {
        path: "admin/edit",
        name: "admin_edit",
        component: () => import("@/pages/Admin/AdminAddPage"),
      },
      {
        path: "settings/showset",
        name: "showset",
        component: () => import("@/pages/Showset/ShowSetPage"),
      },
      {
        path: ':pathMatch([.* ])*',
        redirect: to => ({ ...to, params: {}, name: 'home' })
      },
    ]
  },
  // 无边框菜单
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/LoginPage"),
  },
  {
    path: '/:pathMatch([.* ])*',
    redirect: "/workspace",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
