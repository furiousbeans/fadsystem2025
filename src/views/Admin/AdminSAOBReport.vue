<template>
    <div class="q-pa-md">
        <q-card class="card-container" flat>
            <q-card-section class="col orsdetails-card">
                <q-card class="ors-card" flat bordered>
                    <q-card flat>
                        <div class="row items-center justify-between">
                            <span class="card-text text-title">SAOB</span>
                            <form @submit.prevent="submitForm">
                                <div
                                    style="
                                        display: flex;
                                        justify-content: flex-end;
                                        align-items: center;
                                    "
                                >
                                    <q-select
                                        v-model="selectmonth"
                                        :options="monthoption"
                                        dense
                                        label="Select Month"
                                        required
                                        style="
                                            width: 180px;
                                            padding-right: 20px;
                                        "
                                    />
                                    <q-select
                                        v-model="selectyear"
                                        :options="yearoption"
                                        dense
                                        label="Year"
                                        required
                                        style="
                                            width: 100px;
                                            padding-right: 20px;
                                        "
                                    />
                                    <!--  -->
                                    <q-btn
                                        type="submit"
                                        color="teal"
                                        label="Generate"
                                    />
                                    <q-btn
                                        color="primary"
                                        icon-right="print"
                                        disable
                                        style="
                                            width: 60px;
                                            float: right;
                                            margin-left: 10px;
                                        "
                                    />
                                </div>
                            </form>
                        </div>
                        <div
                            class="q-pa-x-md row items-center q-gutter-x-sm"
                            style="margin-top: 30px"
                        >
                            <q-card flat style="width: 100%">
                                <q-tabs
                                    v-model="tab"
                                    align="justify"
                                    indicator
                                    mobile-arrows
                                    outside-arrows
                                    :breakpoint="600"
                                >
                                    <q-tab
                                        name="tab1"
                                        class="text-white tab1 tabs"
                                        :class="{
                                            'active-tab': tab === 'tab1',
                                        }"
                                        label="1A1"
                                    />
                                    <q-tab
                                        name="tab2"
                                        class="text-white tabs"
                                        :class="{
                                            'active-tab': tab === 'tab2',
                                        }"
                                        label="2A1-1"
                                    />
                                    <q-tab
                                        name="tab3"
                                        class="text-white tabs"
                                        :class="{
                                            'active-tab': tab === 'tab3',
                                        }"
                                        label="2A1-2"
                                    />
                                    <q-tab
                                        name="tab4"
                                        class="text-white tabs"
                                        :class="{
                                            'active-tab': tab === 'tab4',
                                        }"
                                        label="2A2 / 3A1"
                                    />
                                    <q-tab
                                        name="tab5"
                                        class="text-white tabs"
                                        :class="{
                                            'active-tab': tab === 'tab5',
                                        }"
                                        label="RLIP"
                                    />
                                </q-tabs>
                                <q-tab-panels v-model="tab" animated>
                                    <!-- =============== Tab1 =============== -->
                                    <q-tab-panel name="tab1" class="tabpanel">
                                        <q-linear-progress
                                            v-if="loading"
                                            color="primary"
                                            indeterminate
                                            class="q-mt-md"
                                        />
                                        <div v-else>
                                            <q-markup-table flat bordered>
                                                <thead>
                                                    <tr separator="cell">
                                                        <th
                                                            class="text-center"
                                                            rowspan="2"
                                                        >
                                                            Object of
                                                            Expenditure
                                                        </th>
                                                        <th
                                                            class="text-center"
                                                            rowspan="2"
                                                        >
                                                            UACS Code
                                                        </th>
                                                        <th
                                                            class="text-center"
                                                            rowspan="2"
                                                        >
                                                            Allotment Received
                                                        </th>
                                                        <th
                                                            class="text-center"
                                                            colspan="2"
                                                        >
                                                            Obligation
                                                        </th>
                                                        <th
                                                            class="text-center"
                                                            rowspan="2"
                                                        >
                                                            Unobligated Balance
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th class="text-center">
                                                            This Month
                                                        </th>
                                                        <th class="text-center">
                                                            Total
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td
                                                            class="text-left"
                                                            style="
                                                                font-weight: bold;
                                                            "
                                                            colspan="6"
                                                        >
                                                            PERSONNEL SERVICES
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left">
                                                            Salaries and Wages
                                                        </td>
                                                        <td class="text-center">
                                                            50101010-01
                                                        </td>
                                                        <td class="text-right">
                                                            <span
                                                                v-if="
                                                                    sal1a1_allotment
                                                                "
                                                            >
                                                                {{
                                                                    formatNumber(
                                                                        sal1a1_allotment
                                                                    )
                                                                }}
                                                            </span>
                                                        </td>
                                                        <td class="text-right">
                                                            <span
                                                                v-if="
                                                                    sal1a1_month
                                                                "
                                                            >
                                                                {{
                                                                    formatNumber(
                                                                        sal1a1_month
                                                                    )
                                                                }}
                                                            </span>
                                                        </td>
                                                        <td class="text-right">
                                                            <span
                                                                v-if="
                                                                    sal1a1_total
                                                                "
                                                            >
                                                                {{
                                                                    formatNumber(
                                                                        sal1a1_total
                                                                    )
                                                                }}
                                                            </span>
                                                        </td>
                                                        <td class="text-right">
                                                            <span
                                                                v-if="
                                                                    sal1a1_allotment
                                                                "
                                                            >
                                                                {{
                                                                    formatNumber(
                                                                        sal1a1_allotment -
                                                                            sal1a1_total
                                                                    )
                                                                }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left">
                                                            Personnel Econ.
                                                            Relief Allowance
                                                            (PERA)
                                                        </td>
                                                        <td class="text-center">
                                                            50102010-01
                                                        </td>
                                                        <td class="text-right">
                                                            <span
                                                                v-if="
                                                                    pera1a1_allotment
                                                                "
                                                            >
                                                                {{
                                                                    formatNumber(
                                                                        pera1a1_allotment
                                                                    )
                                                                }}
                                                            </span>
                                                        </td>
                                                        <td class="text-right">
                                                            <span
                                                                v-if="
                                                                    pera1a1_month
                                                                "
                                                            >
                                                                {{
                                                                    formatNumber(
                                                                        pera1a1_month
                                                                    )
                                                                }}
                                                            </span>
                                                        </td>
                                                        <td class="text-right">
                                                            <span
                                                                v-if="
                                                                    pera1a1_total
                                                                "
                                                            >
                                                                {{
                                                                    formatNumber(
                                                                        pera1a1_total
                                                                    )
                                                                }}
                                                            </span>
                                                        </td>
                                                        <td class="text-right">
                                                            <span
                                                                v-if="
                                                                    pera1a1_allotment
                                                                "
                                                            >
                                                                {{
                                                                    formatNumber(
                                                                        pera1a1_allotment -
                                                                            pera1a1_total
                                                                    )
                                                                }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left">
                                                            Representation
                                                            Allowance (RA)
                                                        </td>
                                                        <td class="text-center">
                                                            50102020-00
                                                        </td>
                                                        <td
                                                            class="text-right"
                                                        ></td>
                                                        <td class="text-right">
                                                            <span
                                                                v-if="
                                                                    ra1a1_month
                                                                "
                                                            >
                                                                {{
                                                                    formatNumber(
                                                                        ra1a1_month
                                                                    )
                                                                }}
                                                            </span>
                                                        </td>
                                                        <td
                                                            class="text-right"
                                                        ></td>
                                                        <td
                                                            class="text-right"
                                                        ></td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            class="text-left"
                                                            style="
                                                                font-weight: bold;
                                                            "
                                                            colspan="6"
                                                        >
                                                            MAINTENANCE AND
                                                            OTHER OPERATING
                                                            EXPENSES
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            class="text-left"
                                                            style="
                                                                font-weight: bold;
                                                            "
                                                            colspan="6"
                                                        >
                                                            CAPITAL OUTLAY
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </q-markup-table>
                                        </div>
                                    </q-tab-panel>
                                </q-tab-panels>
                            </q-card>
                        </div>
                    </q-card>
                </q-card>
            </q-card-section>
        </q-card>
    </div>
</template>

<script setup>
    import { useQuasar, Notify } from "quasar";
    import { ref, onMounted } from "vue";
    import axios from "axios";

    const $q = useQuasar();

    onMounted(() => {
        document.title = "FAD System | SAOB";
    });

    const tab = ref("tab1");

    const loading = ref(false);

    const selectmonth = ref("");
    const monthoption = ref([
        { label: "January", value: "01" },
        { label: "February", value: "02" },
        { label: "March", value: "03" },
        { label: "April", value: "04" },
        { label: "May", value: "05" },
        { label: "June", value: "06" },
        { label: "July", value: "07" },
        { label: "August", value: "08" },
        { label: "September", value: "09" },
        { label: "October", value: "10" },
        { label: "November", value: "11" },
        { label: "December", value: "12" },
    ]);
    const selectyear = ref("");
    const yearoption = ref([
        { label: "2025", value: "2025" },
        { label: "2024", value: "2024" },
    ]);

    const formatNumber = (num) => {
        return Number(num).toLocaleString(undefined, {
            minimumFractionDigits: 2,
        });
    };

    const sal1a1_allotment = ref("");
    const pera1a1_allotment = ref("");

    const sal1a1_month = ref("");
    const pera1a1_month = ref("");
    const ra1a1_month = ref("");

    const sal1a1_total = ref("");
    const pera1a1_total = ref("");

    function showNotif() {
        Notify.create({
            message: "Please select month and year to generate!",
            color: "positive",
            timeout: 1000,
        });
    }

    const submitForm = async () => {
        try {
            if (!selectmonth.value || !selectyear.value) {
                showNotif();
                return;
            }
            //
            loading.value = true;

            var formData = new FormData();
            formData.append("month", selectmonth.value.value);
            formData.append("year", selectyear.value.value);

            const response = await axios.post(
                "http://localhost/budsys2025_backend/saobtest.php",
                formData
            );

            setTimeout(() => {
                sal1a1_allotment.value = response.data.sal1a1_allot;
                pera1a1_allotment.value = response.data.pera1a1_allot;

                sal1a1_month.value = response.data.sal1a1;
                pera1a1_month.value = response.data.pera1a1;
                ra1a1_month.value = response.data.ra1a1;

                sal1a1_total.value = response.data.sal1a1_total;
                pera1a1_total.value = response.data.pera1a1_total;
                loading.value = false;
            }, 750);
        } catch (error) {
            console.error("Error:", error);
            showNotif();
        }
    };
</script>

<!--  -->

<style scoped>
    .card-container {
        border-radius: 20px;
    }
    .orsdetails-card {
        padding: 45px;
    }
    .ors-card {
        border-color: #e5e5e5;
        padding: 15px;
    }
    .text-title {
        font-size: 20px;
    }

    .card-text {
        font-family: "Poppins", sans-serif;
    }

    /* =============== Tabs CSS =============== */
    .tab1 {
        margin-left: 0px !important;
    }
    .tabs {
        border-top-left-radius: 25px;
        border-top-right-radius: 8px;
        margin-left: 1px;
        background-color: #289ad8;
        color: #fff;
    }

    .active-tab {
        background-color: #4eaab1 !important;
        font-weight: bold;
        border: 1px solid #4eaab1;
    }

    .tabpanel {
        border: 1px solid #cacaca;
    }

    .body--dark .active-tab {
        background-color: #4eaab1 !important;
        font-weight: bold;
        border: 1px solid #4eaab1;
    }
    .body--dark .tabs {
        background-color: #447f9e;
        color: #fff;
    }
    /* =============== Tabs CSS =============== */

    /* =============== Table CSS =============== */
    tbody > tr:nth-of-type(odd) {
        background-color: #fdfdfd;
    }

    .body--dark tbody > tr:nth-of-type(odd) {
        background-color: #384750 !important;
    }
    /* =============== Table CSS =============== */
</style>
