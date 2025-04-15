<template>
    <div class="q-pa-md">
        <q-layout view="hHh Lpr lff">
            <!-- Sidenav -->
            <q-drawer
                v-model="drawer"
                :mini="!drawer || miniState"
                @click.capture="drawerClick"
                show-if-above
                :width="300"
                :mini-width="60"
                :breakpoint="800"
                :style="drawerStyle"
            >
                <div style="padding: 15px; display: flex; align-items: center">
                    <img
                        src="../assets/images/seilogopng.png"
                        style="height: 30px"
                    />
                    <h6
                        v-if="!miniState"
                        style="margin-left: 8px"
                        class="text-weight-bold"
                    >
                        FAD System
                    </h6>
                </div>
                <div
                    :class="{
                        'bg-bluecustom': !miniState,
                        'bg-active': miniState,
                    }"
                    style="
                        margin-top: 25px;
                        margin-left: 10px;
                        margin-right: 10px;
                        display: flex;
                        align-items: center;
                        border-radius: 10px;
                        margin-bottom: 25px;
                    "
                >
                    <div
                        :class="{
                            'flex justify-center': miniState,
                            'flex justify-start': !miniState,
                        }"
                        :style="
                            miniState
                                ? {}
                                : {
                                      marginTop: '30px',
                                      marginBottom: '30px',
                                      marginLeft: '10px',
                                      marginRight: '10px',
                                  }
                        "
                    >
                        <q-avatar
                            :size="miniState ? '40px' : '60px'"
                            class="q-mb-sm"
                            :style="miniState ? {} : { marginLeft: '10px' }"
                        >
                            <img src="../assets/images/usericon.png" />
                        </q-avatar>
                    </div>
                    <div
                        v-if="!miniState"
                        style="margin-left: 10px; margin-right: 10px"
                    >
                        <div class="labelname text-weight-bold text-black">
                            {{ fname }}
                        </div>
                        <div class="labelpost text-black">{{ userpost }}</div>
                    </div>
                </div>
                <q-list class="q-gutter-y-xs">
                    <q-item
                        clickable
                        :to="{ path: '/testlayout' }"
                        active-class="listActive"
                        class="listItem"
                        exact
                    >
                        <q-item-section avatar>
                            <q-icon name="space_dashboard" />
                        </q-item-section>

                        <q-item-section> ORS Database </q-item-section>
                    </q-item>
                    <q-item
                        clickable
                        :to="{ path: '/testlayout/testdb' }"
                        active-class="listActive"
                        class="listItem"
                    >
                        <q-item-section avatar>
                            <q-icon name="person_add" />
                        </q-item-section>

                        <q-item-section> Add Payee </q-item-section>
                    </q-item>
                </q-list>
            </q-drawer>

            <!-- Page Container -->
            <q-page-container>
                <div
                    class="top-navbar"
                    style="
                        background-color: #f9f9f9;
                        padding: 15px 20px 15px 20px;
                        margin: 8px 15px 0 15px;
                        border-radius: 20px;
                    "
                >
                    <q-btn
                        flat
                        dense
                        @click="miniState = !miniState"
                        size="lg"
                        color="primary"
                        class="menubtn no-hover-highlight"
                    >
                        <q-icon name="menu" size="md" />
                    </q-btn>
                    <q-btn
                        flat
                        dense
                        @click="logoutConfirm()"
                        color="red-10"
                        class="no-hover-highlight logout-btn"
                        style="float: right"
                    >
                        <q-icon name="logout" size="md" />
                        <q-tooltip anchor="center left" self="center right"
                            >Logout</q-tooltip
                        >
                    </q-btn>
                    <q-btn
                        flat
                        dense
                        color="primary"
                        class="no-hover-highlight darktoggle"
                        style="float: right"
                        @click="toggleDarkMode"
                    >
                        <q-icon
                            :name="darkMode ? 'light_mode' : 'dark_mode'"
                            size="md"
                        />
                        <q-tooltip anchor="center left" self="center right">
                            {{ darkMode ? "Light Mode" : "Dark Mode" }}
                        </q-tooltip>
                    </q-btn>
                </div>

                <router-view />
            </q-page-container>
        </q-layout>
    </div>
</template>

<script setup>
    import { ref, onMounted, watch, reactive, computed } from "vue";
    import { useRouter } from "vue-router";
    import Swal from "sweetalert2";
    import { Dark } from "quasar";

    const router = useRouter();
    const isActive = (path) => {
        return router.path === path;
    };

    const username = ref("");
    const role = ref("");
    const fname = ref("");
    const userpost = ref("");
    const userdiv = ref("");

    onMounted(() => {
        username.value = localStorage.getItem("username") || "Guest";
        role.value = localStorage.getItem("role") || "Unknown";
        fname.value = localStorage.getItem("fname") || "Unknown";
        userpost.value = localStorage.getItem("userpost") || "Unknown";
        userdiv.value = localStorage.getItem("userdiv") || "Unknown";
        // Apply stored dark mode preference
        Dark.set(darkMode.value);
    });

    const drawer = ref(false);
    const miniState = ref(false);
    const darkMode = ref(localStorage.getItem("darkMode") === "true");

    const drawerClick = (e) => {
        if (miniState.value) {
            miniState.value = false;
            e.stopPropagation();
        }
    };
    const drawerStyle = computed(() => {
        return {
            borderTopRightRadius: miniState.value ? "0px" : "30px",
            borderBottomRightRadius: miniState.value ? "0px" : "30px",
        };
    });

    watch(darkMode, (newVal) => {
        Dark.set(newVal);
        localStorage.setItem("darkMode", newVal);
    });

    const toggleDarkMode = () => {
        darkMode.value = !darkMode.value;
    };

    const dvmodal = ref(false);
    const addPayee = (props) => {
        dvmodal.value = true;
    };

    const state = reactive({
        inputPayeeName: "",
        inputPayeeAcct: "",
        inputPayeeBank: "",
        inputPayeeTIN: "",
        inputPayeeAddr: "",
    });
    const addnewPayee = async () => {
        try {
            var formData = new FormData();
            formData.append("payeename", state.inputPayeeName);
            formData.append("payeeacct", state.inputPayeeAcct);
            formData.append("payeebank", state.inputPayeeBank);
            formData.append("payeetin", state.inputPayeeTIN);

            console.log(state.inputPayeeName);
            console.log(state.inputPayeeAcct);
            console.log(state.inputPayeeBank);
            console.log(state.inputPayeeTIN);
        } catch (error) {
            console.error("Unexpected Error:", error);
        }
    };

    const closePayee = async () => {
        clearText();
    };
    //
    const clearText = () => {
        state.inputPayeeName = "";
        state.inputPayeeAcct = "";
        state.inputPayeeBank = "";
        state.inputPayeeTIN = "";
        state.inputPayeeAddr = "";
    };

    const logoutConfirm = () => {
        swalLogout();
    };

    const logoutFunc = () => {
        localStorage.clear();
        router.push("/");
    };

    //
    const swalLogout = () => {
        Swal.fire({
            text: "Exit program?",
            icon: "warning",
            showConfirmButton: true,
            confirmButtonText: "Logout",
            confirmButtonColor: "#ff5c5c",
            showCancelButton: true,
            background: darkMode.value ? "#465965" : "#fff", // Dark mode support
            color: darkMode.value ? "#fff" : "#000", // Text color for contrast
            footer: '<span style="color: #7cc3f2; font-size: .8rem">FAD | Budget System</span>',
        }).then((result) => {
            if (result.isConfirmed) {
                logoutFunc();
                this.$q.dark.set(false);
            }
        });
    };
</script>

<style scoped>
    .bg-bluecustom {
        background-color: #c5d9f1;
    }
    .bg-active {
        background-color: transparent !important;
    }
    .body--dark .bg-bluecustom {
        background-color: #141414;
    }
    .body--dark .bg-active {
        background-color: #2e3c45 !important;
    }

    .body--dark .q-list {
        color: white !important;
    }

    .body--dark .q-item {
        color: white !important;
    }

    .body--dark .q-item__label {
        color: white !important;
    }
    .body--dark .bodycont {
        background-color: #141414 !important;
    }
    .body--dark .top-navbar {
        background-color: #2e3c45 !important;
    }
    .body--dark .menubtn {
        color: white !important;
    }
    .body--dark .darktoggle {
        color: white !important;
    }
    .body--dark .logout-btn {
        color: red !important;
    }
    .body--dark .labelname {
        color: white !important;
    }
    .body--dark .labelpost {
        color: white !important;
    }

    /* drawer options */
    .q-list {
        padding: 3px;
        margin: 3px;
    }
    .listActive {
        background-color: rgba(123, 147, 255, 0.87); /* Light green highlight */
        color: white !important; /* Change text color */
        border-radius: 15px; /* Rounded corners */
        font-weight: bold;
    }
    .listItem:hover {
        border-radius: 15px;
    }
</style>
