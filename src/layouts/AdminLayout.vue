<template>
    <div class="bodycont q-pa-sm bg-grey-1">
        <q-layout view="hHh Lpr lff">
            <q-drawer
                v-model="drawer"
                show-if-above
                :mini="!drawer || miniState"
                @click.capture="drawerClick"
                :width="300"
                :mini-width="60"
                :breakpoint="1000"
                bordered
                class="custom-drawer"
            >
            
            <!-- :mini="!drawer || miniState" -->
                <!--  -->
                <!-- @click.capture="drawerClick" -->
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
                        :to="{ path: '/administrator' }"
                        exact
                        exact-active-class="listActive"
                        class="listItem"
                    >
                        <q-item-section avatar>
                            <q-icon name="space_dashboard" />
                        </q-item-section>

                        <q-item-section class="nav-list-item">
                            ORS Database
                        </q-item-section>
                    </q-item>
                    <q-item
                        clickable
                        :to="{ path: '/administrator/lib' }"
                        exact
                        exact-active-class="listActive"
                        class="listItem"
                    >
                        <q-item-section avatar>
                            <q-icon name="list_alt" />
                        </q-item-section>

                        <q-item-section class="nav-list-item">
                            LIB Database
                        </q-item-section>
                    </q-item>
                    <q-expansion-item icon="receipt_long" label="Reports">
                        <q-item
                            clickable
                            :to="{ path: '/administrator/reports/saob' }"
                            exact-active-class="listActive"
                            class="listItem"
                            style="padding-left: 70px; font-size: 12px"
                        >
                            <q-item-section
                                class="nav-list-item"
                                style="font-size: 14px"
                            >
                                SAOB
                            </q-item-section>
                        </q-item>
                        <q-item
                            clickable
                            exact-active-class="listActive"
                            class="listItem"
                            style="padding-left: 70px; font-size: 12px"
                        >
                            <q-item-section
                                class="nav-list-item"
                                style="font-size: 14px"
                            >
                                Summary of MOOE
                            </q-item-section>
                        </q-item>
                    </q-expansion-item>
                    <q-item
                        clickable
                        @click="addPayee()"
                        active-class="listActive"
                        class="listItem"
                    >
                        <q-item-section avatar>
                            <q-icon name="person_add" />
                        </q-item-section>

                        <q-item-section class="nav-list-item">
                            Add Payee
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-drawer>
            <q-page-container>
                <div
                    class="top-navbar"
                    style="
                        background-color: white;
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
            <form id="payeedetails" @submit.prevent="addnewPayee">
                <q-dialog v-model="payeemodal" persistent>
                    <q-card
                        style="
                            min-width: 800px;
                            border-radius: 20px;
                            padding: 20px;
                        "
                    >
                        <q-card-section>
                            <div class="text-h6">Add payee</div>
                        </q-card-section>

                        <q-card-section class="q-pt-none">
                            <div style="margin-left: 10px; margin-right: 10px">
                                <div class="q-pa-x-md row">
                                    <div class="q-pa-sm col-8">
                                        <q-input
                                            label="Payee Name (*)"
                                            v-model="state.inputPayeeName"
                                            dense
                                            required
                                        >
                                        </q-input>
                                    </div>
                                    <div class="q-pa-sm col-4">
                                        <q-input
                                            label="Account Number"
                                            v-model="state.inputPayeeAcct"
                                            dense
                                        >
                                        </q-input>
                                    </div>
                                </div>
                                <div class="q-pa-x-md row">
                                    <div class="q-pa-sm col-7">
                                        <q-input
                                            label="Bank Name / Branch"
                                            v-model="state.inputPayeeBank"
                                            dense
                                        >
                                        </q-input>
                                    </div>
                                    <div class="q-pa-sm col-5">
                                        <q-input
                                            label="TIN"
                                            v-model="state.inputPayeeTIN"
                                            dense
                                        >
                                        </q-input>
                                    </div>
                                </div>
                                <div class="q-pa-x-md row">
                                    <div class="q-pa-sm col-12">
                                        <q-input
                                            label="Address"
                                            v-model="state.inputPayeeAddr"
                                            dense
                                        >
                                        </q-input>
                                    </div>
                                </div>
                            </div>
                        </q-card-section>

                        <q-card-actions align="right">
                            <div
                                style="margin-right: 15px; margin-bottom: 10px"
                            >
                                <q-btn
                                    class="text-gray"
                                    flat
                                    label="Cancel"
                                    @click="closePayee()"
                                    v-close-popup
                                    style="margin-right: 10px"
                                />
                                <q-btn
                                    type="submit"
                                    :color="
                                        state.inputPayeeName
                                            ? 'light-blue-6'
                                            : 'grey-8'
                                    "
                                    label="Save Details"
                                    name="addnewPayee"
                                    :disable="!state.inputPayeeName"
                                    @click="addnewPayee()"
                                >
                                    <!-- @click="addnewPayee()" -->
                                    <q-icon
                                        name="person_add_alt_1"
                                        style="margin-left: 10px"
                                    />
                                </q-btn>
                            </div>
                        </q-card-actions>
                    </q-card>
                </q-dialog>
            </form>
        </q-layout>
    </div>
</template>

<script setup>
    import { ref, onMounted, watch, reactive, provide } from "vue";
    import { useRouter } from "vue-router";
    import axios from "axios";
    import Swal from "sweetalert2";
    import { useQuasar, Dark } from "quasar";

    const router = useRouter();

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

    const $q = useQuasar();
    const drawer = ref(false);
    const miniState = ref(true);
    const darkMode = ref(localStorage.getItem("darkMode") === "true");

    const drawerClick = (e) => {
        if (miniState.value) {
            miniState.value = false;
            e.stopPropagation();
        }
    };

    const toggleDrawer = () => {
        if ($q.screen.width < 1000) {
            drawer.value = !drawer.value; // Open/close drawer in mobile view
        } else {
            miniState.value = !miniState.value; // Toggle miniState for larger screens
        }
    };

    watch(
        () => $q.screen.width,
        (width) => {
            if (width < 1000) {
                miniState.value = false; // Ensure miniState is disabled in mobile view
            }
        },
        { immediate: true }
    );

    watch(darkMode, (newVal) => {
        Dark.set(newVal);
        localStorage.setItem("darkMode", newVal);
    });

    const toggleDarkMode = () => {
        darkMode.value = !darkMode.value;
        localStorage.setItem("darkMode", darkMode.value);
        Dark.set(darkMode.value);
    };

    // Provide darkMode and toggleDarkMode to children
    provide("darkMode", darkMode, ref(true));
    provide("toggleDarkMode", toggleDarkMode);

    const payeemodal = ref(false);
    const addPayee = (props) => {
        payeemodal.value = true;
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

            axios
                .post(
                    "http://localhost/budsys2025_backend/insert.php?newPayee",
                    formData
                )
                .then(function (response) {
                    if (response.data == true) {
                        payeemodal.value = false;
                        swalSuccess();
                        clearText();
                    } else {
                        payeemodal.value = false;
                        swalError();
                    }
                });

            // console.log(state.inputPayeeName);
            // console.log(state.inputPayeeAcct);
            // console.log(state.inputPayeeBank);
            // console.log(state.inputPayeeTIN);
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

    const swalSuccess = () => {
        Swal.fire({
            title: "Success!",
            text: "Payee has been added to database",
            icon: "success",
            confirmButtonText: "Close",
            background: darkMode.value ? "#465965" : "#fff", // Dark mode support
            color: darkMode.value ? "#fff" : "#000", // Text color for contrast
        });
    };

    const swalError = () => {
        Swal.fire({
            title: "Error!",
            text: "Something went wrong, please try again",
            icon: "error",
            confirmButtonText: "Close",
            background: darkMode.value ? "#465965" : "#fff", // Dark mode support
            color: darkMode.value ? "#fff" : "#000", // Text color for contrast
        });
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
    ::v-deep(.q-drawer) {
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;
        overflow: hidden;
    }
    * {
        font-family: "Poppins", sans-serif;
    }
    .bg-bluecustom {
        background-color: #c5d9f1;
    }
    .bg-active {
        background-color: #ffffff !important;
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

    .labelname {
        font-size: 16px;
    }
    .labelpost {
        font-size: 14px;
    }

    /* drawer options */
    .nav-list-item {
        font-size: 16px;
    }
    .q-list {
        padding: 3px;
        margin: 3px;
    }
    .listActive {
        background-color: #7188e6;
        color: white !important;
        border-radius: 15px;
        font-weight: bold;
    }
    .listItem:hover {
        border-radius: 15px;
    }
    .body--dark .listActive {
        background-color: #0a549a;
    }
</style>


