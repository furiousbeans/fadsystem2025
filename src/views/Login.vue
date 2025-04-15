<template>
    <q-layout view="hHh Lpr fFf">
        <q-page-container class="login bg-grey-1">
            <q-card
                class="my-card"
                :style="cardStyle"
                style="padding: 20px; border-radius: 30px"
            >
                <div>
                    <q-card-section>
                        <div class="text-h5 text-center">
                            FAD | Budget System
                        </div>
                    </q-card-section>

                    <q-card-section
                        class="q-pt-none"
                        style="width: 94%; margin: auto"
                    >
                        <!--  -->
                        <form @submit.prevent="handleLogin">
                            <div>
                                <q-input
                                    v-model="username"
                                    type="text"
                                    label="Username"
                                    required
                                >
                                    <template v-slot:before>
                                        <q-icon name="person_outline" />
                                    </template>
                                </q-input>
                            </div>
                            <div>
                                <q-input
                                    v-model="password"
                                    type="password"
                                    label="Password"
                                    required
                                >
                                    <template v-slot:before>
                                        <q-icon name="password" />
                                    </template>
                                </q-input>
                            </div>
                            <br />
                            <br />
                            <div class="row justify-center">
                                <q-btn
                                    type="submit"
                                    :disabled="loading"
                                    color="primary"
                                    style="width: 80%"
                                >
                                    {{ loading ? "Logging in..." : "Login" }}
                                </q-btn>
                            </div>
                        </form>
                    </q-card-section>
                </div>
            </q-card>
        </q-page-container>
    </q-layout>
</template>

<script setup>
    import { ref, onMounted, computed } from "vue";
    import { useRouter } from "vue-router";
    import { useQuasar } from "quasar";
    import axios from "axios";
    import Swal from "sweetalert2";

    const $q = useQuasar();

    onMounted(() => {
        $q.dark.set(false);
        document.title = "FAD System | Login";
    });

    const cardStyle = computed(() => {
        return {
            width: $q.screen.lt.sm ? "90%" : "35%", // 90% on small screens, 30% on larger screens
        };
    });

    const username = ref("");
    const password = ref("");
    const error = ref("");
    const router = useRouter();

    const loading = ref(false);

    const handleLogin = async () => {
        try {
            console.log("Username:", username.value);
            console.log("Password:", password.value);

            const response = await axios.post(
                "http://localhost/budsys2025_backend/login.php",
                {
                    username: username.value,
                    password: password.value,
                }
            );

            console.log("Response:", response.data);

            if (response.data.success) {
                swalSuccess();
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("username", response.data.username);
                localStorage.setItem("role", response.data.role);
                localStorage.setItem("fname", response.data.fname);
                localStorage.setItem("userpost", response.data.userpost);
                localStorage.setItem("userdiv", response.data.userdiv);

                if (response.data.role === "admin") {
                    router.push("/administrator");
                } else {
                    // router.push("/testuser");
                    router.push("/user");
                }
            } else {
                swalFail();
            }
        } catch (err) {
            console.error("Login Error:", err);
            swalError();
        }
    };

    const swalSuccess = () => {
        Swal.fire({
            title: "Logged In!",
            text: "Welcome!",
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
            footer: '<span style="color: #7cc3f2; font-size: .8rem">FAD | Budget System</span>',
        });
    };
    const swalFail = () => {
        Swal.fire({
            title: "Error!",
            text: "Invalid username or password, please try again",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
            footer: '<span style="color: #7cc3f2; font-size: .8rem">FAD | Budget System</span>',
        });
    };
    const swalError = () => {
        Swal.fire({
            title: "Error!",
            text: "Something went wrong, please try again",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
            footer: '<span style="color: #7cc3f2; font-size: .8rem">FAD | Budget System</span>',
        });
    };
</script>

<style scoped>
    .login {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
</style>
