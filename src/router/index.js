import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";

import AdminLayout from "../layouts/AdminLayout.vue";
import AdminDashboard from "../views/Admin/AdminDashboard.vue";
import AdminORSDetails from "../views/Admin/AdminORSDetails.vue";
import AdminSAOB from "../views/Admin/AdminSAOBReport.vue";

import UserLayout from "../layouts/UserLayout.vue";
import UserDashboard from "../views/User/UserDashboard.vue";
import UserORSDetails from "../views/User/UserORSDetails.vue";
import LIBMaker from "../views/User/LIBMaker.vue";

import testselect from "../views/User/testselect.vue";

const routes = [
    { path: "/", component: Login },
    {
        path: "/administrator",
        component: AdminLayout,
        children: [
            { path: "", component: AdminDashboard },
            {
                path: "/administrator/orsdetails/:ors_random",
                name: "AdminOrsDetails",
                component: AdminORSDetails,
            },
            {
                path: "/administrator/reports/saob",
                name: "AdminSAOB",
                component: AdminSAOB,
            },
        ],
    },
    {
        path: "/user",
        component: UserLayout,
        children: [
            { path: "", component: UserDashboard },
            {
                path: "/user/orsdetails/:ors_random",
                name: "UserOrsDetails",
                component: UserORSDetails,
            },
            {
                path: "/user/libmaker",
                name: "LIBMaker",
                component: LIBMaker,
            },
        ],
    },
    {
        path: "/testselect",
        component: testselect,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (
        (to.path === "/administrator" && role !== "admin") ||
        (to.path === "/user" && role !== "user")
    ) {
        next("/");
    } else if (
        !isAuthenticated &&
        (to.path === "/administrator" || to.path === "/user")
    ) {
        next("/");
    } else {
        next();
    }
});

export default router;
