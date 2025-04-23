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
                            <q-card
                                flat
                                style="
                                    width: 100%;
                                    overflow-y: auto;
                                    height: 67vh;
                                "
                            >
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
                                                            Unobligated
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
                                                    <!-- prettier-ignore -->
                                                    <tr>
                                                        <td class="text-left"style="font-weight: bold;" colspan="6">PERSONNEL SERVICES</td>
                                                    </tr>
                                                    <!-- prettier-ignore -->
                                                    <tr>
                                                        <td class="text-left">&emsp;&nbsp;Salaries and Wages</td>
                                                        <td class="text-center">50101010-01</td>
                                                        <td class="text-right">
                                                            <span v-if="sal1a1_allotment">{{ formatNumber(sal1a1_allotment) }}</span>
                                                        </td>
                                                        <td class="text-right"><span v-if="sal1a1_month">{{ formatNumber(sal1a1_month) }}</span>
                                                        </td>
                                                        <td class="text-right"><span v-if="sal1a1_total">{{ formatNumber(sal1a1_total) }}</span></td>
                                                        <td class="text-right"><span v-if="sal1a1_allotment">{{ formatNumber(sal1a1_allotment - sal1a1_total) }}</span></td>
                                                    </tr>
                                                    <!-- prettier-ignore -->
                                                    <tr>
                                                        <td class="text-left">&emsp;&nbsp;Personnel Econ. Relief Allowance (PERA)</td>
                                                        <td class="text-center">50102010-01</td>
                                                        <td class="text-right">
                                                            <span v-if="pera1a1_allotment">{{ formatNumber(pera1a1_allotment) }}</span>
                                                        </td>
                                                        <td class="text-right"><span v-if="pera1a1_month">{{ formatNumber(pera1a1_month) }}</span>
                                                        </td>
                                                        <td class="text-right"><span v-if="pera1a1_total">{{ formatNumber(pera1a1_total) }}</span></td>
                                                        <td class="text-right"><span v-if="pera1a1_allotment">{{ formatNumber(pera1a1_allotment - pera1a1_total) }}</span></td>
                                                    </tr>
                                                    <!-- prettier-ignore -->
                                                    <tr>
                                                        <td class="text-left">&emsp;&nbsp;Representation Allowance (RA)</td>
                                                        <td class="text-center">50102020-00</td>
                                                        <td class="text-right">
                                                            <span v-if="ra1a1_allotment">{{ formatNumber(ra1a1_allotment) }}</span>
                                                        </td>
                                                        <td class="text-right"><span v-if="ra1a1_month">{{ formatNumber(ra1a1_month) }}</span>
                                                        </td>
                                                        <td class="text-right"><span v-if="ra1a1_total">{{ formatNumber(ra1a1_total) }}</span></td>
                                                        <td class="text-right"><span v-if="ra1a1_allotment">{{ formatNumber(ra1a1_allotment - ra1a1_total) }}</span></td>
                                                    </tr>
                                                    <!-- prettier-ignore -->
                                                    <tr>
                                                        <td class="text-left">&emsp;&nbsp;Transportation Allowance (TA)</td>
                                                        <td class="text-center">50102030-01	</td>
                                                        <td class="text-right">
                                                            <span v-if="ta1a1_allotment">{{ formatNumber(ta1a1_allotment) }}</span>
                                                        </td>
                                                        <td class="text-right"><span v-if="ta1a1_month">{{ formatNumber(ta1a1_month) }}</span>
                                                        </td>
                                                        <td class="text-right"><span v-if="ta1a1_total">{{ formatNumber(ta1a1_total) }}</span></td>
                                                        <td class="text-right"><span v-if="ta1a1_allotment">{{ formatNumber(ta1a1_allotment - ta1a1_total) }}</span></td>
                                                    </tr>
                                                    <!-- prettier-ignore -->
                                                    <tr>
                                                        <td class="text-left">&emsp;&nbsp;Clothing Allowance</td>
                                                        <td class="text-center">50102040-01</td>
                                                        <td class="text-right">
                                                            <span v-if="cloth1a1_allotment">{{ formatNumber(cloth1a1_allotment) }}</span>
                                                        </td>
                                                        <td class="text-right"><span v-if="cloth1a1_month">{{ formatNumber(cloth1a1_month) }}</span>
                                                        </td>
                                                        <td class="text-right"><span v-if="cloth1a1_total">{{ formatNumber(cloth1a1_total) }}</span></td>
                                                        <td class="text-right"><span v-if="cloth1a1_allotment">{{ formatNumber(cloth1a1_allotment - cloth1a1_total) }}</span></td>
                                                    </tr>
                                                    <!-- prettier-ignore -->
                                                    <tr>
                                                        <td class="text-left">&emsp;&nbsp;Productivity Enhancement Incentives</td>
                                                        <td class="text-center">50102990-12</td>
                                                        <td class="text-right">
                                                            <span v-if="prod1a1_allotment">{{ formatNumber(prod1a1_allotment) }}</span>
                                                        </td>
                                                        <td class="text-right"><span v-if="prod1a1_month">{{ formatNumber(prod1a1_month) }}</span>
                                                        </td>
                                                        <td class="text-right"><span v-if="prod1a1_total">{{ formatNumber(prod1a1_total) }}</span></td>
                                                        <td class="text-right"><span v-if="prod1a1_allotment">{{ formatNumber(prod1a1_allotment - prod1a1_total) }}</span></td>
                                                    </tr>
                                                    <!-- prettier-ignore -->
                                                    <tr>
                                                        <td class="text-left">&emsp;&nbsp;Year-End Bonus</td>
                                                        <td class="text-center">50102140-01</td>
                                                        <td class="text-right">
                                                            <span v-if="yearend1a1_allotment">{{ formatNumber(yearend1a1_allotment) }}</span>
                                                        </td>
                                                        <td class="text-right"><span v-if="yearend1a1_month">{{ formatNumber(yearend1a1_month) }}</span>
                                                        </td>
                                                        <td class="text-right"><span v-if="yearend1a1_total">{{ formatNumber(yearend1a1_total) }}</span></td>
                                                        <td class="text-right"><span v-if="yearend1a1_allotment">{{ formatNumber(yearend1a1_allotment - yearend1a1_total) }}</span></td>
                                                    </tr>
                                                    <!-- prettier-ignore -->
                                                    <tr>
                                                        <td class="text-left">&emsp;&nbsp;Cash Gift</td>
                                                        <td class="text-center">50102150-01</td>
                                                        <td class="text-right">
                                                            <span v-if="cashgift1a1_allotment">{{ formatNumber(cashgift1a1_allotment) }}</span>
                                                        </td>
                                                        <td class="text-right"><span v-if="cashgift1a1_month">{{ formatNumber(cashgift1a1_month) }}</span>
                                                        </td>
                                                        <td class="text-right"><span v-if="cashgift1a1_total">{{ formatNumber(cashgift1a1_total) }}</span></td>
                                                        <td class="text-right"><span v-if="cashgift1a1_allotment">{{ formatNumber(cashgift1a1_allotment - cashgift1a1_total) }}</span></td>
                                                    </tr>
                                                    <!-- prettier-ignore -->
                                                    <tr>
                                                        <td class="text-left">&emsp;&nbsp;Mid-Year Bonus</td>
                                                        <td class="text-center">50102160-01</td>
                                                        <td class="text-right">
                                                            <span v-if="midyear1a1_allotment">{{ formatNumber(midyear1a1_allotment) }}</span>
                                                        </td>
                                                        <td class="text-right"><span v-if="midyear1a1_month">{{ formatNumber(midyear1a1_month) }}</span>
                                                        </td>
                                                        <td class="text-right"><span v-if="midyear1a1_total">{{ formatNumber(midyear1a1_total) }}</span></td>
                                                        <td class="text-right"><span v-if="midyear1a1_allotment">{{ formatNumber(midyear1a1_allotment - midyear1a1_total) }}</span></td>
                                                    </tr>
                                                    <!-- prettier-ignore -->
                                                    <tr>
                                                        <td class="text-left">&emsp;&nbsp;Pag-IBIG Contributions</td>
                                                        <td class="text-center">50103020-01</td>
                                                        <td class="text-right">
                                                            <span v-if="pagibig1a1_allotment">{{ formatNumber(pagibig1a1_allotment) }}</span>
                                                        </td>
                                                        <td class="text-right"><span v-if="pagibig1a1_month">{{ formatNumber(pagibig1a1_month) }}</span>
                                                        </td>
                                                        <td class="text-right"><span v-if="pagibig1a1_total">{{ formatNumber(pagibig1a1_total) }}</span></td>
                                                        <td class="text-right"><span v-if="pagibig1a1_allotment">{{ formatNumber(pagibig1a1_allotment - pagibig1a1_total) }}</span></td>
                                                    </tr>
                                                    <!-- prettier-ignore -->
                                                    <tr>
                                                        <td class="text-left">&emsp;&nbsp;PhilHealth Contributions</td>
                                                        <td class="text-center">50103030-01</td>
                                                        <td class="text-right">
                                                            <span v-if="philhealth1a1_allotment">{{ formatNumber(philhealth1a1_allotment) }}</span>
                                                        </td>
                                                        <td class="text-right"><span v-if="philhealth1a1_month">{{ formatNumber(philhealth1a1_month) }}</span>
                                                        </td>
                                                        <td class="text-right"><span v-if="philhealth1a1_total">{{ formatNumber(philhealth1a1_total) }}</span></td>
                                                        <td class="text-right"><span v-if="philhealth1a1_allotment">{{ formatNumber(philhealth1a1_allotment - philhealth1a1_total) }}</span></td>
                                                    </tr>
                                                    <!-- prettier-ignore -->
                                                    <tr>
                                                        <td class="text-left">&emsp;&nbsp;Emp. Comp. Insurance Prem.</td>
                                                        <td class="text-center">50103040-01</td>
                                                        <td class="text-right">
                                                            <span v-if="ecip1a1_allotment">{{ formatNumber(ecip1a1_allotment) }}</span>
                                                        </td>
                                                        <td class="text-right"><span v-if="ecip1a1_month">{{ formatNumber(ecip1a1_month) }}</span>
                                                        </td>
                                                        <td class="text-right"><span v-if="ecip1a1_total">{{ formatNumber(ecip1a1_total) }}</span></td>
                                                        <td class="text-right"><span v-if="ecip1a1_allotment">{{ formatNumber(ecip1a1_allotment - ecip1a1_total) }}</span></td>
                                                    </tr>
                                                    <!-- prettier-ignore -->
                                                    <tr>
                                                        <td class="text-left">&emsp;&nbsp;Step Increment</td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <!-- prettier-ignore -->
                                                    <tr>
                                                        <td class="text-left">&emsp;&nbsp;Personnel Services (Unprogrammed Appro)</td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <!-- prettier-ignore -->
                                                    <tr>
                                                        <td class="text-left">&emsp;&nbsp;Other Personnel Benefits - Anniversary Bonus</td>
                                                        <td class="text-center">50102990-38</td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <!-- prettier-ignore -->
                                                    <tr>
                                                        <td class="text-left">&emsp;&nbsp;Other Personnel Benefits - SRI</td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <!-- prettier-ignore -->
                                                    <tr>
                                                        <td class="text-left">&emsp;&nbsp;Collective Negotiation Agreement (C.N.A.)</td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <!-- prettier-ignore -->
                                                    <tr>
                                                        <td class="text-left">&emsp;&nbsp;Loyalty</td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <!-- prettier-ignore -->
                                                    <tr>
                                                        <td class="text-left">&emsp;&nbsp;Terminal Leave Benefits</td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <!-- prettier-ignore -->
                                                    <tr>
                                                        <td class="text-left">&emsp;&nbsp;<b>Magna Carta Benefits</b></td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <!-- prettier-ignore -->
                                                    <tr>
                                                        <td class="text-left">&emsp;&emsp;&nbsp;Subsistence Allowance</td>
                                                        <td class="text-center">50102050-02</td>
                                                        <td class="text-right">
                                                            <span v-if="subsis1a1_allotment">{{ formatNumber(subsis1a1_allotment) }}</span>
                                                        </td>
                                                        <td class="text-right"><span v-if="subsis1a1_month">{{ formatNumber(subsis1a1_month) }}</span>
                                                        </td>
                                                        <td class="text-right"><span v-if="subsis1a1_total">{{ formatNumber(subsis1a1_total) }}</span></td>
                                                        <td class="text-right"><span v-if="subsis1a1_allotment">{{ formatNumber(subsis1a1_allotment - subsis1a1_total) }}</span></td>
                                                    </tr>
                                                    <!-- prettier-ignore -->
                                                    <tr>
                                                        <td class="text-left">&emsp;&emsp;&nbsp;Laundry Allowance</td>
                                                        <td class="text-center">50102060-03</td>
                                                        <td class="text-right">
                                                            <span v-if="laundry1a1_allotment">{{ formatNumber(laundry1a1_allotment) }}</span>
                                                        </td>
                                                        <td class="text-right"><span v-if="laundry1a1_month">{{ formatNumber(laundry1a1_month) }}</span>
                                                        </td>
                                                        <td class="text-right"><span v-if="laundry1a1_total">{{ formatNumber(laundry1a1_total) }}</span></td>
                                                        <td class="text-right"><span v-if="laundry1a1_allotment">{{ formatNumber(laundry1a1_allotment - laundry1a1_total) }}</span></td>
                                                    </tr>
                                                    <!-- prettier-ignore -->
                                                    <tr>
                                                        <td class="text-left">&emsp;&emsp;&nbsp;Hazard Pay</td>
                                                        <td class="text-center">50102110-04</td>
                                                        <td class="text-right">
                                                            <span v-if="hazard1a1_allotment">{{ formatNumber(hazard1a1_allotment) }}</span>
                                                        </td>
                                                        <td class="text-right"><span v-if="hazard1a1_month">{{ formatNumber(hazard1a1_month) }}</span>
                                                        </td>
                                                        <td class="text-right"><span v-if="hazard1a1_total">{{ formatNumber(hazard1a1_total) }}</span></td>
                                                        <td class="text-right"><span v-if="hazard1a1_allotment">{{ formatNumber(hazard1a1_allotment - hazard1a1_total) }}</span></td>
                                                    </tr>
                                                    <!-- prettier-ignore -->
                                                    <tr>
                                                        <td class="text-left">&emsp;&emsp;&nbsp;Longetivity Pay</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            <span v-if="longitivity1a1_allotment">{{ formatNumber(longitivity1a1_allotment) }}</span>
                                                        </td>
                                                        <td class="text-right"><span v-if="longitivity1a1_month">{{ formatNumber(longitivity1a1_month) }}</span>
                                                        </td>
                                                        <td class="text-right"><span v-if="longitivity1a1_total">{{ formatNumber(longitivity1a1_total) }}</span></td>
                                                        <td class="text-right"><span v-if="longitivity1a1_allotment">{{ formatNumber(longitivity1a1_allotment - longitivity1a1_total) }}</span></td>
                                                    </tr>
                                                    <!-- prettier-ignore -->
                                                    <tr>
                                                        <td class="text-left" style="font-weight: bold;" colspan="6">MAINTENANCE AND OTHER OPERATING EXPENSES</td>
                                                    </tr>
                                                    <!-- prettier-ignore -->
                                                    <tr>
                                                        <td class="text-left" style="font-weight: bold;" colspan="6">CAPITAL OUTLAY</td>
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
    const ra1a1_allotment = ref("");
    const ta1a1_allotment = ref("");
    const cloth1a1_allotment = ref("");
    const prod1a1_allotment = ref("");
    const yearend1a1_allotment = ref("");
    const cashgift1a1_allotment = ref("");
    const midyear1a1_allotment = ref("");
    const pagibig1a1_allotment = ref("");
    const philhealth1a1_allotment = ref("");
    const ecip1a1_allotment = ref("");
    const step1a1_allotment = ref("");
    const unprog1a1_allotment = ref("");
    const anniv1a1_allotment = ref("");
    const sri1a1_allotment = ref("");
    const cna1a1_allotment = ref("");
    const loyalty1a1_allotment = ref("");
    const term1a1_allotment = ref("");
    const subsis1a1_allotment = ref("");
    const laundry1a1_allotment = ref("");
    const hazard1a1_allotment = ref("");
    const longitivity1a1_allotment = ref("");

    const sal1a1_month = ref("");
    const pera1a1_month = ref("");
    const ra1a1_month = ref("");
    const ta1a1_month = ref("");
    const cloth1a1_month = ref("");
    const prod1a1_month = ref("");
    const yearend1a1_month = ref("");
    const cashgift1a1_month = ref("");
    const midyear1a1_month = ref("");
    const pagibig1a1_month = ref("");
    const philhealth1a1_month = ref("");
    const ecip1a1_month = ref("");
    const step1a1_month = ref("");
    const unprog1a1_month = ref("");
    const anniv1a1_month = ref("");
    const sri1a1_month = ref("");
    const cna1a1_month = ref("");
    const loyalty1a1_month = ref("");
    const term1a1_month = ref("");
    const subsis1a1_month = ref("");
    const laundry1a1_month = ref("");
    const hazard1a1_month = ref("");
    const longitivity1a1_month = ref("");

    const sal1a1_total = ref("");
    const pera1a1_total = ref("");
    const ra1a1_total = ref("");
    const ta1a1_total = ref("");
    const cloth1a1_total = ref("");
    const prod1a1_total = ref("");
    const yearend1a1_total = ref("");
    const cashgift1a1_total = ref("");
    const midyear1a1_total = ref("");
    const pagibig1a1_total = ref("");
    const philhealth1a1_total = ref("");
    const ecip1a1_total = ref("");
    const step1a1_total = ref("");
    const unprog1a1_total = ref("");
    const anniv1a1_total = ref("");
    const sri1a1_total = ref("");
    const cna1a1_total = ref("");
    const loyalty1a1_total = ref("");
    const term1a1_total = ref("");
    const subsis1a1_total = ref("");
    const laundry1a1_total = ref("");
    const hazard1a1_total = ref("");
    const longitivity1a1_total = ref("");

    function showNotif() {
        Notify.create({
            message: "Please select month and year to generate!",
            color: "primary",
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
                ra1a1_allotment.value = response.data.ra1a1_allot;
                ta1a1_allotment.value = response.data.ta1a1_allot;
                cloth1a1_allotment.value = response.data.cloth1a1_allot;
                prod1a1_allotment.value = response.data.prod1a1_allot;
                yearend1a1_allotment.value = response.data.yearend1a1_allot;
                cashgift1a1_allotment.value = response.data.cashgift1a1_allot;
                midyear1a1_allotment.value = response.data.midyear1a1_allot;
                pagibig1a1_allotment.value = response.data.pagibig1a1_allot;
                philhealth1a1_allotment.value =
                    response.data.philhealth1a1_allot;
                ecip1a1_allotment.value = response.data.ecip1a1_allot;
                subsis1a1_allotment.value = response.data.subsis1a1_allot;
                laundry1a1_allotment.value = response.data.laundry1a1_allot;
                hazard1a1_allotment.value = response.data.hazard1a1_allot;
                longitivity1a1_allotment.value =
                    response.data.longitivity1a1_allot;

                sal1a1_month.value = response.data.sal1a1;
                pera1a1_month.value = response.data.pera1a1;
                ra1a1_month.value = response.data.ra1a1;
                ta1a1_month.value = response.data.ta1a1;
                cloth1a1_month.value = response.data.cloth1a1;
                prod1a1_month.value = response.data.prod1a1;
                yearend1a1_month.value = response.data.yearend1a1;
                cashgift1a1_month.value = response.data.cashgift1a1;
                midyear1a1_month.value = response.data.midyear1a1;
                pagibig1a1_month.value = response.data.pagibig1a1;
                philhealth1a1_month.value = response.data.philhealth1a1;
                ecip1a1_month.value = response.data.ecip1a1;
                subsis1a1_month.value = response.data.subsis1a1;
                laundry1a1_month.value = response.data.laundry1a1;
                hazard1a1_month.value = response.data.hazard1a1;
                longitivity1a1_month.value = response.data.longitivity1a1;

                sal1a1_total.value = response.data.sal1a1_total;
                pera1a1_total.value = response.data.pera1a1_total;
                ra1a1_total.value = response.data.ra1a1_total;
                ta1a1_total.value = response.data.ta1a1_total;
                cloth1a1_total.value = response.data.cloth1a1_total;
                prod1a1_total.value = response.data.prod1a1_total;
                yearend1a1_total.value = response.data.yearend1a1_total;
                cashgift1a1_total.value = response.data.cashgift1a1_total;
                midyear1a1_total.value = response.data.midyear1a1_total;
                pagibig1a1_total.value = response.data.pagibig1a1_total;
                philhealth1a1_total.value = response.data.philhealth1a1_total;
                ecip1a1_total.value = response.data.ecip1a1_total;
                subsis1a1_total.value = response.data.subsis1a1_total;
                laundry1a1_total.value = response.data.laundry1a1_total;
                hazard1a1_total.value = response.data.hazard1a1_total;
                longitivity1a1_total.value = response.data.longitivity1a1_total;

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
