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
                                id="sticky-card"
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
                                                    
                                                    <tr>
                                                        <td class="text-left" style="padding-left:2em;"><b>Salaries and Wages</b></td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="sal1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Salaries and Wages</td>
                                                        <td class="text-center">50101010-01</td>
                                                        <td class="text-right">{{ formatNumber(sal1a1_allotment) }}</td>
                                                        <td class="text-right">{{ formatNumber(sal1a1_month) }}</td>
                                                        <td class="text-right">{{ formatNumber(sal1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(sal1a1_allotment - sal1a1_total) }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left" style="padding-left:2em;"><b>Other Compensations</b></td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="pera1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Personnel Econ. Relief Allowance (PERA)</td>
                                                        <td class="text-center">50102010-01</td>
                                                        <td class="text-right">{{ formatNumber(pera1a1_allotment) }}</td>
                                                        <td class="text-right">{{ formatNumber(pera1a1_month) }}</td>
                                                        <td class="text-right">{{ formatNumber(pera1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(pera1a1_allotment - pera1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="ra1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Representation Allowance (RA)</td>
                                                        <td class="text-center">50102020-00</td>
                                                        <td class="text-right">{{ formatNumber(ra1a1_allotment) }}</td>
                                                        <td class="text-right">{{ formatNumber(ra1a1_month) || ''}}</td>
                                                        <td class="text-right">{{ formatNumber(ra1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(ra1a1_allotment - ra1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="ta1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Transportation Allowance (TA)</td>
                                                        <td class="text-center">50102030-01	</td>
                                                        <td class="text-right">{{ formatNumber(ta1a1_allotment) }}</td>
                                                        <td class="text-right">{{ formatNumber(ta1a1_month) }}</td>
                                                        <td class="text-right">{{ formatNumber(ta1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(ta1a1_allotment - ta1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="cloth1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Clothing Allowance</td>
                                                        <td class="text-center">50102040-01</td>
                                                        <td class="text-right">{{ formatNumber(cloth1a1_allotment) }}</td>
                                                        <td class="text-right">{{ formatNumber(cloth1a1_month) }}</td>
                                                        <td class="text-right">{{ formatNumber(cloth1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(cloth1a1_allotment - cloth1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="prod1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Productivity Enhancement Incentives</td>
                                                        <td class="text-center">50102990-12</td>
                                                        <td class="text-right">{{ formatNumber(prod1a1_allotment) }}</td>
                                                        <td class="text-right">{{ formatNumber(prod1a1_month) }}</td>
                                                        <td class="text-right">{{ formatNumber(prod1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(prod1a1_allotment - prod1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="yearend1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Year-End Bonus</td>
                                                        <td class="text-center">50102140-01</td>
                                                        <td class="text-right">{{ formatNumber(yearend1a1_allotment) }}</td>
                                                        <td class="text-right">{{ formatNumber(yearend1a1_month) }}</td>
                                                        <td class="text-right">{{ formatNumber(yearend1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(yearend1a1_allotment - yearend1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="cashgift1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Cash Gift</td>
                                                        <td class="text-center">50102150-01</td>
                                                        <td class="text-right">{{ formatNumber(cashgift1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(cashgift1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(cashgift1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(cashgift1a1_allotment - cashgift1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="midyear1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Mid-Year Bonus</td>
                                                        <td class="text-center">50102160-01</td>
                                                        <td class="text-right">{{ formatNumber(midyear1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(midyear1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(midyear1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(midyear1a1_allotment - midyear1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="pagibig1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Pag-IBIG Contributions</td>
                                                        <td class="text-center">50103020-01</td>
                                                        <td class="text-right">{{ formatNumber(pagibig1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(pagibig1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(pagibig1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(pagibig1a1_allotment - pagibig1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="philhealth1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">PhilHealth Contributions</td>
                                                        <td class="text-center">50103030-01</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(philhealth1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(philhealth1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(philhealth1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(philhealth1a1_allotment - philhealth1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="ecip1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Emp. Comp. Insurance Prem.</td>
                                                        <td class="text-center">50103040-01</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(ecip1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(ecip1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(ecip1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(ecip1a1_allotment - ecip1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="ecip1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Step Increment</td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="ecip1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Personnel Services (Unprogrammed Appro)</td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="ecip1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Other Personnel Benefits - Anniversary Bonus</td>
                                                        <td class="text-center">50102990-38</td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="ecip1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Other Personnel Benefits - SRI</td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="ecip1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Collective Negotiation Agreement (C.N.A.)</td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="ecip1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Loyalty</td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="ecip1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Terminal Leave Benefits</td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left" style="padding-left:2em;"><b>Magna Carta Benefits</b></td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="subsis1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Subsistence Allowance</td>
                                                        <td class="text-center">50102050-02</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(subsis1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(subsis1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(subsis1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(subsis1a1_allotment - subsis1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="laundry1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Laundry Allowance</td>
                                                        <td class="text-center">50102060-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(laundry1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(laundry1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(laundry1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(laundry1a1_allotment - laundry1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="hazard1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Hazard Pay</td>
                                                        <td class="text-center">50102110-04</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(hazard1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(hazard1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(hazard1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(hazard1a1_allotment - hazard1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="longetivity1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Longetivity Pay</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(longetivity1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(longetivity1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(longetivity1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(longetivity1a1_allotment - longetivity1a1_total) }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left" style="font-weight: bold;" colspan="6">MAINTENANCE AND OTHER OPERATING EXPENSES</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left" style="padding-left:2em;"><b>Travelling Expenses</b></td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="localtravel1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Local Travel</td>
                                                        <td class="text-center">50201010-00</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(localtravel1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(localtravel1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(localtravel1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(localtravel1a1_allotment - localtravel1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="foreigntravel1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Foreign Travel</td>
                                                        <td class="text-center">50201020-00</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(foreigntravel1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(foreigntravel1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(foreigntravel1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(foreigntravel1a1_allotment - foreigntravel1a1_total) }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left" style="padding-left:2em;"><b>Training and Scholarship Expenses</b></td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="icttraining1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">ICT Training Expenses</td>
                                                        <td class="text-center">50202010-01</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(icttraining1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(icttraining1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(icttraining1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(icttraining1a1_allotment - icttraining1a1_total) }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left" style="padding-left:2em;"><b>Supplies and Material Expenses</b></td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="officesupplies1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Office Supplies Expenses</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(officesupplies1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(officesupplies1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(officesupplies1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(officesupplies1a1_allotment - officesupplies1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="officeict1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Office Supplies Expenses - ICT Supplies</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(officeict1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(officeict1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(officeict1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(officeict1a1_allotment - officeict1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="fuel1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Fuel, Oil and Lubricants Expenses</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(fuel1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(fuel1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(fuel1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(fuel1a1_allotment - fuel1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="othersupplies1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Other Supplies and Materials Expenses</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(othersupplies1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(othersupplies1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(othersupplies1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(othersupplies1a1_allotment - othersupplies1a1_total) }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left" style="padding-left:2em;"><b>Utility Expenses</b></td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="water1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Water Expenses</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(water1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(water1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(water1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(water1a1_allotment - water1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="electricity1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Electricity Expenses</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(electricity1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(electricity1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(electricity1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(electricity1a1_allotment - electricity1a1_total) }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left" style="padding-left:2em;"><b>Communication Expenses</b></td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="postage1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Postage and Courier Expenses</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(postage1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(postage1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(postage1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(postage1a1_allotment - postage1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="mobile1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Telephone (Mobile)</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(mobile1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(mobile1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(mobile1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(mobile1a1_allotment - mobile1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="landline1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Telephone(Landline)</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(landline1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(landline1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(landline1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(landline1a1_allotment - landline1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="internet1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Internet Subscription Expenses</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(internet1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(internet1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(internet1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(internet1a1_allotment - internet1a1_total) }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left" style="padding-left:2em;"><b>Repair and Maintenance</b></td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="building1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Buildings and Other Structures</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(building1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(building1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(building1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(building1a1_allotment - building1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="vehicle1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Motor Vehicles</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(vehicle1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(vehicle1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(vehicle1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(vehicle1a1_allotment - vehicle1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="officeequip1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Office Equipment, Furnitures and Fixtures</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(officeequip1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(officeequip1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(officeequip1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(officeequip1a1_allotment - officeequip1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="extraordinary1a1_allotment">
                                                        <td class="text-left" style="padding-left:2em;"><b>Extraordinary and Miscellaneous Expenses</b></td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(extraordinary1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(extraordinary1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(extraordinary1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(extraordinary1a1_allotment - extraordinary1a1_total) }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left" style="padding-left:2em;"><b>Professional Services</b></td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="professional1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Other Professional Services</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(professional1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(professional1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(professional1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(professional1a1_allotment - professional1a1_total) }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left" style="padding-left:2em;"><b>General Services</b></td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="janitorial1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Janitorial Services</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(janitorial1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(janitorial1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(janitorial1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(janitorial1a1_allotment - janitorial1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="security1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Security Services</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(security1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(security1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(security1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(security1a1_allotment - security1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="general1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Other General Services</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(general1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(general1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(general1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(general1a1_allotment - general1a1_total) }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left" style="padding-left:2em;"><b>Taxes, Insurance Premium and Other Fees</b></td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="fidelity1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Fidelity Bond</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(fidelity1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(fidelity1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(fidelity1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(fidelity1a1_allotment - fidelity1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="insurance1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Insurance Expenses</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(insurance1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(insurance1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(insurance1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(insurance1a1_allotment - insurance1a1_total) }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left" style="padding-left:2em;"><b>Other Maintenance and Operating Expenses</b></td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="ictsoftware1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">ICT Software Subscription</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(ictsoftware1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(ictsoftware1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(ictsoftware1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(ictsoftware1a1_allotment - ictsoftware1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="othersub1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Other Subscription Expenses</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(othersub1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(othersub1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(othersub1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(othersub1a1_allotment - othersub1a1_total) }}</td>
                                                    </tr>

                                                    <tr>
                                                        <td class="text-left" style="font-weight: bold;" colspan="6">CAPITAL OUTLAY</td>
                                                    </tr>
                                                </tbody>
                                            </q-markup-table>
                                        </div>
                                    </q-tab-panel>
                                    <q-tab-panel name="tab2" class="tabpanel">
                                        <q-linear-progress
                                            v-if="loading"
                                            color="primary"
                                            indeterminate
                                            class="q-mt-md"
                                        />
                                        <div v-else>
                                            <q-markup-table flat bordered>         
                                                <!-- prettier-ignore -->
                                                <thead>
                                                    <tr separator="cell">
                                                        <th class="text-center" rowspan="2">Object of Expenditure</th>
                                                        <th class="text-center" rowspan="2">UACS Code</th>
                                                        <th class="text-center" rowspan="2">Allotment Received</th>
                                                        <th class="text-center" colspan="2">Obligation</th>
                                                        <th class="text-center" rowspan="2">Unobligated</th>
                                                    </tr>
                                                    <tr>
                                                        <th class="text-center">This Month</th>
                                                        <th class="text-center">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <!-- prettier-ignore -->
                                                    <tr>
                                                        <td class="text-left"style="font-weight: bold;" colspan="6">PERSONNEL SERVICES</td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <td class="text-left" style="padding-left:2em;"><b>Salaries and Wages</b></td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="sal2a11_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Salaries and Wages</td>
                                                        <td class="text-center">50101010-01</td>
                                                        <td class="text-right">{{ formatNumber(sal2a11_allotment) }}</td>
                                                        <td class="text-right">{{ formatNumber(sal2a11_month) }}</td>
                                                        <td class="text-right">{{ formatNumber(sal2a11_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(sal2a11_allotment - sal2a11_total) }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left" style="padding-left:2em;"><b>Other Compensations</b></td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="pera1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Personnel Econ. Relief Allowance (PERA)</td>
                                                        <td class="text-center">50102010-01</td>
                                                        <td class="text-right">{{ formatNumber(pera1a1_allotment) }}</td>
                                                        <td class="text-right">{{ formatNumber(pera1a1_month) }}</td>
                                                        <td class="text-right">{{ formatNumber(pera1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(pera1a1_allotment - pera1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="cloth1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Clothing Allowance</td>
                                                        <td class="text-center">50102040-01</td>
                                                        <td class="text-right">{{ formatNumber(cloth1a1_allotment) }}</td>
                                                        <td class="text-right">{{ formatNumber(cloth1a1_month) }}</td>
                                                        <td class="text-right">{{ formatNumber(cloth1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(cloth1a1_allotment - cloth1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="prod1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Productivity Enhancement Incentives</td>
                                                        <td class="text-center">50102990-12</td>
                                                        <td class="text-right">{{ formatNumber(prod1a1_allotment) }}</td>
                                                        <td class="text-right">{{ formatNumber(prod1a1_month) }}</td>
                                                        <td class="text-right">{{ formatNumber(prod1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(prod1a1_allotment - prod1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="yearend1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Year-End Bonus</td>
                                                        <td class="text-center">50102140-01</td>
                                                        <td class="text-right">{{ formatNumber(yearend1a1_allotment) }}</td>
                                                        <td class="text-right">{{ formatNumber(yearend1a1_month) }}</td>
                                                        <td class="text-right">{{ formatNumber(yearend1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(yearend1a1_allotment - yearend1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="cashgift1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Cash Gift</td>
                                                        <td class="text-center">50102150-01</td>
                                                        <td class="text-right">{{ formatNumber(cashgift1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(cashgift1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(cashgift1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(cashgift1a1_allotment - cashgift1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="midyear1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Mid-Year Bonus</td>
                                                        <td class="text-center">50102160-01</td>
                                                        <td class="text-right">{{ formatNumber(midyear1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(midyear1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(midyear1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(midyear1a1_allotment - midyear1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="pagibig1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Pag-IBIG Contributions</td>
                                                        <td class="text-center">50103020-01</td>
                                                        <td class="text-right">{{ formatNumber(pagibig1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(pagibig1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(pagibig1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(pagibig1a1_allotment - pagibig1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="philhealth1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">PhilHealth Contributions</td>
                                                        <td class="text-center">50103030-01</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(philhealth1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(philhealth1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(philhealth1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(philhealth1a1_allotment - philhealth1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="ecip1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Emp. Comp. Insurance Prem.</td>
                                                        <td class="text-center">50103040-01</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(ecip1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(ecip1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(ecip1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(ecip1a1_allotment - ecip1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="ecip1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Step Increment</td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="ecip1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Personnel Services (Unprogrammed Appro)</td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="ecip1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Other Personnel Benefits - Anniversary Bonus</td>
                                                        <td class="text-center">50102990-38</td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="ecip1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Other Personnel Benefits - SRI</td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="ecip1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Collective Negotiation Agreement (C.N.A.)</td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="ecip1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Loyalty</td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="ecip1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Terminal Leave Benefits</td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left" style="padding-left:2em;"><b>Magna Carta Benefits</b></td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="subsis1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Subsistence Allowance</td>
                                                        <td class="text-center">50102050-02</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(subsis1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(subsis1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(subsis1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(subsis1a1_allotment - subsis1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="laundry1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Laundry Allowance</td>
                                                        <td class="text-center">50102060-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(laundry1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(laundry1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(laundry1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(laundry1a1_allotment - laundry1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="hazard1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Hazard Pay</td>
                                                        <td class="text-center">50102110-04</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(hazard1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(hazard1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(hazard1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(hazard1a1_allotment - hazard1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="longetivity1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Longetivity Pay</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(longetivity1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(longetivity1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(longetivity1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(longetivity1a1_allotment - longetivity1a1_total) }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left" style="font-weight: bold;" colspan="6">MAINTENANCE AND OTHER OPERATING EXPENSES</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left" style="padding-left:2em;"><b>Travelling Expenses</b></td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="localtravel1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Local Travel</td>
                                                        <td class="text-center">50201010-00</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(localtravel1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(localtravel1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(localtravel1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(localtravel1a1_allotment - localtravel1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="foreigntravel1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Foreign Travel</td>
                                                        <td class="text-center">50201020-00</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(foreigntravel1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(foreigntravel1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(foreigntravel1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(foreigntravel1a1_allotment - foreigntravel1a1_total) }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left" style="padding-left:2em;"><b>Training and Scholarship Expenses</b></td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="icttraining1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">ICT Training Expenses</td>
                                                        <td class="text-center">50202010-01</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(icttraining1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(icttraining1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(icttraining1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(icttraining1a1_allotment - icttraining1a1_total) }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left" style="padding-left:2em;"><b>Supplies and Material Expenses</b></td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="officesupplies1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Office Supplies Expenses</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(officesupplies1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(officesupplies1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(officesupplies1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(officesupplies1a1_allotment - officesupplies1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="officeict1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Office Supplies Expenses - ICT Supplies</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(officeict1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(officeict1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(officeict1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(officeict1a1_allotment - officeict1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="fuel1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Fuel, Oil and Lubricants Expenses</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(fuel1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(fuel1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(fuel1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(fuel1a1_allotment - fuel1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="othersupplies1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Other Supplies and Materials Expenses</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(othersupplies1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(othersupplies1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(othersupplies1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(othersupplies1a1_allotment - othersupplies1a1_total) }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left" style="padding-left:2em;"><b>Utility Expenses</b></td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="water1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Water Expenses</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(water1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(water1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(water1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(water1a1_allotment - water1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="electricity1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Electricity Expenses</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(electricity1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(electricity1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(electricity1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(electricity1a1_allotment - electricity1a1_total) }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left" style="padding-left:2em;"><b>Communication Expenses</b></td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="postage1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Postage and Courier Expenses</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(postage1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(postage1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(postage1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(postage1a1_allotment - postage1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="mobile1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Telephone (Mobile)</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(mobile1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(mobile1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(mobile1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(mobile1a1_allotment - mobile1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="landline1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Telephone(Landline)</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(landline1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(landline1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(landline1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(landline1a1_allotment - landline1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="internet1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Internet Subscription Expenses</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(internet1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(internet1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(internet1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(internet1a1_allotment - internet1a1_total) }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left" style="padding-left:2em;"><b>Repair and Maintenance</b></td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="building1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Buildings and Other Structures</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(building1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(building1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(building1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(building1a1_allotment - building1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="vehicle1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Motor Vehicles</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(vehicle1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(vehicle1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(vehicle1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(vehicle1a1_allotment - vehicle1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="officeequip1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Office Equipment, Furnitures and Fixtures</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(officeequip1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(officeequip1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(officeequip1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(officeequip1a1_allotment - officeequip1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="extraordinary1a1_allotment">
                                                        <td class="text-left" style="padding-left:2em;"><b>Extraordinary and Miscellaneous Expenses</b></td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(extraordinary1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(extraordinary1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(extraordinary1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(extraordinary1a1_allotment - extraordinary1a1_total) }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left" style="padding-left:2em;"><b>Professional Services</b></td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="professional1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Other Professional Services</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(professional1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(professional1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(professional1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(professional1a1_allotment - professional1a1_total) }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left" style="padding-left:2em;"><b>General Services</b></td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="janitorial1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Janitorial Services</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(janitorial1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(janitorial1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(janitorial1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(janitorial1a1_allotment - janitorial1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="security1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Security Services</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(security1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(security1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(security1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(security1a1_allotment - security1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="general1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Other General Services</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(general1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(general1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(general1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(general1a1_allotment - general1a1_total) }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left" style="padding-left:2em;"><b>Taxes, Insurance Premium and Other Fees</b></td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="fidelity1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Fidelity Bond</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(fidelity1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(fidelity1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(fidelity1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(fidelity1a1_allotment - fidelity1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="insurance1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Insurance Expenses</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(insurance1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(insurance1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(insurance1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(insurance1a1_allotment - insurance1a1_total) }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left" style="padding-left:2em;"><b>Other Maintenance and Operating Expenses</b></td>
                                                        <td class="text-center"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                        <td class="text-right"></td>
                                                    </tr>
                                                    <tr v-if="ictsoftware1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">ICT Software Subscription</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(ictsoftware1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(ictsoftware1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(ictsoftware1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(ictsoftware1a1_allotment - ictsoftware1a1_total) }}</td>
                                                    </tr>
                                                    <tr v-if="othersub1a1_allotment">
                                                        <td class="text-left" style="padding-left:3em;">Other Subscription Expenses</td>
                                                        <td class="text-center">50102120-03</td>
                                                        <td class="text-right">
                                                            {{ formatNumber(othersub1a1_allotment) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(othersub1a1_month) }}
                                                        </td>
                                                        <td class="text-right">{{ formatNumber(othersub1a1_total) }}</td>
                                                        <td class="text-right">{{ formatNumber(othersub1a1_allotment - othersub1a1_total) }}</td>
                                                    </tr>

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
<!--  -->
<script setup>
    import { useQuasar, Notify } from "quasar";
    import { ref, onMounted, onUnmounted } from "vue";
    import axios from "axios";

    const $q = useQuasar();

    const stickyCard = ref(null);

    const handleScroll = () => {
        if (stickyCard.value && stickyCard.value.getBoundingClientRect().top <= 0) {
            // Disable scroll when card is sticky
            document.body.style.overflow = 'hidden';
        } else {
            // Enable scroll when card is not sticky
            document.body.style.overflow = '';
        }
    };

    onMounted(() => {
        document.title = "FAD System | SAOB";
        window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
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

    // const formatNumber = (num) => {
    //     return Number(num).toLocaleString(undefined, {
    //         minimumFractionDigits: 2,
    //     });
    // };


    // 

    const formatNumber = (num) => {
        const number = Number(num);
        if (isNaN(number) || number === 0) return '-';
        return number.toLocaleString(undefined, {
            minimumFractionDigits: 2,
        });
    };

    // 

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
    const longetivity1a1_allotment = ref("");
    const localtravel1a1_allotment = ref("");
    const foreigntravel1a1_allotment = ref("");
    const icttraining1a1_allotment = ref("");
    const officesupplies1a1_allotment = ref("");
    const officeict1a1_allotment = ref("");
    const fuel1a1_allotment = ref("");
    const othersupplies1a1_allotment = ref("");
    const water1a1_allotment = ref("");
    const electricity1a1_allotment = ref("");
    const postage1a1_allotment = ref("");
    const mobile1a1_allotment = ref("");
    const landline1a1_allotment = ref("");
    const internet1a1_allotment = ref("");
    const building1a1_allotment = ref("");
    const vehicle1a1_allotment = ref("");
    const officeequip1a1_allotment = ref("");
    const extraordinary1a1_allotment = ref("");
    const professional1a1_allotment = ref("");
    const janitorial1a1_allotment = ref("");
    const security1a1_allotment = ref("");
    const general1a1_allotment = ref("");
    const fidelity1a1_allotment = ref("");
    const insurance1a1_allotment = ref("");
    const ictsoftware1a1_allotment = ref("");
    const othersub1a1_allotment = ref("");
    const sal2a11_allotment = ref("");
    const pera2a11_allotment = ref("");
    const cloth2a11_allotment = ref("");
    const prod2a11_allotment = ref("");
    const yearend2a11_allotment = ref("");
    const cashgift2a11_allotment = ref("");
    const midyear2a11_allotment = ref("");
    const pagibig2a11_allotment = ref("");
    const philhealth2a11_allotment = ref("");
    const ecip2a11_allotment = ref("");
    const loyalty2a11_allotment = ref("");
    const subsis2a11_allotment = ref("");
    const laundry2a11_allotment = ref("");
    const hazard2a11_allotment = ref("");
    const longetivity2a11_allotment = ref("");
    const localtravel2a11_allotment = ref("");
    const foreigntravel2a11_allotment = ref("");
    const officesupplies2a11_allotment = ref("");
    const fuel2a11_allotment = ref("");
    const othersupplies2a11_allotment = ref("");
    const electricity2a11_allotment = ref("");
    const postage2a11_allotment = ref("");
    const mobile2a11_allotment = ref("");
    const landline2a11_allotment = ref("");

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
    const longetivity1a1_month = ref("");
    const localtravel1a1_month = ref("");
    const foreigntravel1a1_month = ref("");
    const icttraining1a1_month = ref("");
    const officesupplies1a1_month = ref("");
    const officeict1a1_month = ref("");
    const fuel1a1_month = ref("");
    const othersupplies1a1_month = ref("");
    const water1a1_month = ref("");
    const electricity1a1_month = ref("");
    const postage1a1_month = ref("");
    const mobile1a1_month = ref("");
    const landline1a1_month = ref("");
    const internet1a1_month = ref("");
    const building1a1_month = ref("");
    const vehicle1a1_month = ref("");
    const officeequip1a1_month = ref("");
    const extraordinary1a1_month = ref("");
    const professional1a1_month = ref("");
    const janitorial1a1_month = ref("");
    const security1a1_month = ref("");
    const general1a1_month = ref("");
    const fidelity1a1_month = ref("");
    const insurance1a1_month = ref("");
    const ictsoftware1a1_month = ref("");
    const othersub1a1_month = ref("");
    const sal2a11_month = ref("");
    const pera2a11_month = ref("");
    const cloth2a11_month = ref("");
    const prod2a11_month = ref("");
    const yearend2a11_month = ref("");
    const cashgift2a11_month = ref("");
    const midyear2a11_month = ref("");
    const pagibig2a11_month = ref("");
    const philhealth2a11_month = ref("");
    const ecip2a11_month = ref("");
    const loyalty2a11_month = ref("");
    const subsis2a11_month = ref("");
    const laundry2a11_month = ref("");
    const hazard2a11_month = ref("");
    const longetivity2a11_month = ref("");
    const localtravel2a11_month = ref("");
    const foreigntravel2a11_month = ref("");
    const officesupplies2a11_month = ref("");
    const fuel2a11_month = ref("");
    const othersupplies2a11_month = ref("");
    const electricity2a11_month = ref("");
    const postage2a11_month = ref("");
    const mobile2a11_month = ref("");
    const landline2a11_month = ref("");

// 

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
    const longetivity1a1_total = ref("");
    const localtravel1a1_total = ref("");
    const foreigntravel1a1_total = ref("");
    const icttraining1a1_total = ref("");
    const officesupplies1a1_total = ref("");
    const officeict1a1_total = ref("");
    const fuel1a1_total = ref("");
    const othersupplies1a1_total = ref("");
    const water1a1_total = ref("");
    const electricity1a1_total = ref("");
    const postage1a1_total = ref("");
    const mobile1a1_total = ref("");
    const landline1a1_total = ref("");
    const internet1a1_total = ref("");
    const building1a1_total = ref("");
    const vehicle1a1_total = ref("");
    const officeequip1a1_total = ref("");
    const extraordinary1a1_total = ref("");
    const professional1a1_total = ref("");
    const janitorial1a1_total = ref("");
    const security1a1_total = ref("");
    const general1a1_total = ref("");
    const fidelity1a1_total = ref("");
    const insurance1a1_total = ref("");
    const ictsoftware1a1_total = ref("");
    const othersub1a1_total = ref("");
    const sal2a11_total = ref("");
    const pera2a11_total = ref("");
    const cloth2a11_total = ref("");
    const prod2a11_total = ref("");
    const yearend2a11_total = ref("");
    const cashgift2a11_total = ref("");
    const midyear2a11_total = ref("");
    const pagibig2a11_total = ref("");
    const philhealth2a11_total = ref("");
    const ecip2a11_total = ref("");
    const loyalty2a11_total = ref("");
    const subsis2a11_total = ref("");
    const laundry2a11_total = ref("");
    const hazard2a11_total = ref("");
    const longetivity2a11_total = ref("");
    const localtravel2a11_total = ref("");
    const foreigntravel2a11_total = ref("");
    const officesupplies2a11_total = ref("");
    const fuel2a11_total = ref("");
    const othersupplies2a11_total = ref("");
    const electricity2a11_total = ref("");
    const postage2a11_total = ref("");
    const mobile2a11_total = ref("");
    const landline2a11_total = ref("");

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
                "http://172.16.10.5/budsys2025_backend/saobtest.php",
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
                philhealth1a1_allotment.value = response.data.philhealth1a1_allot;
                ecip1a1_allotment.value = response.data.ecip1a1_allot;
                subsis1a1_allotment.value = response.data.subsis1a1_allot;
                laundry1a1_allotment.value = response.data.laundry1a1_allot;
                hazard1a1_allotment.value = response.data.hazard1a1_allot;
                longetivity1a1_allotment.value = response.data.longetivity1a1_allot;
                localtravel1a1_allotment.value = response.data.localtravel1a1_allot;
                foreigntravel1a1_allotment.value = response.data.foreigntravel1a1_allot;
                icttraining1a1_allotment.value = response.data.icttraining1a1_allot;
                officesupplies1a1_allotment.value = response.data.officesupplies1a1_allot;
                officeict1a1_allotment.value = response.data.officeict1a1_allot;
                fuel1a1_allotment.value = response.data.fuel1a1_allot;
                othersupplies1a1_allotment.value = response.data.othersupplies1a1_allot;
                water1a1_allotment.value = response.data.water1a1_allot;
                electricity1a1_allotment.value = response.data.electricity1a1_allot;
                postage1a1_allotment.value = response.data.postage1a1_allot;
                mobile1a1_allotment.value = response.data.mobile1a1_allot;
                landline1a1_allotment.value = response.data.landline1a1_allot;
                internet1a1_allotment.value = response.data.internet1a1_allot;
                building1a1_allotment.value = response.data.building1a1_allot;
                vehicle1a1_allotment.value = response.data.vehicle1a1_allot;
                officeequip1a1_allotment.value = response.data.officeequip1a1_allot;
                extraordinary1a1_allotment.value = response.data.extraordinary1a1_allot;
                professional1a1_allotment.value = response.data.professional1a1_allot;
                janitorial1a1_allotment.value = response.data.janitorial1a1_allot;
                security1a1_allotment.value = response.data.security1a1_allot;
                general1a1_allotment.value = response.data.general1a1_allot;
                fidelity1a1_allotment.value = response.data.fidelity1a1_allot;
                insurance1a1_allotment.value = response.data.insurance1a1_allot;
                ictsoftware1a1_allotment.value = response.data.ictsoftware1a1_allot;
                othersub1a1_allotment.value = response.data.othersub1a1_allot;
                
                sal2a11_allotment.value = response.data.sal2a11_allot;


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
                longetivity1a1_month.value = response.data.longetivity1a1;
                localtravel1a1_month.value = response.data.localtravel1a1;
                foreigntravel1a1_month.value = response.data.foreigntravel1a1;
                icttraining1a1_month.value = response.data.icttraining1a1;
                officesupplies1a1_month.value = response.data.officesupplies1a1;
                officeict1a1_month.value = response.data.officeict1a1;
                fuel1a1_month.value = response.data.fuel1a1;
                othersupplies1a1_month.value = response.data.othersupplies1a1;
                water1a1_month.value = response.data.water1a1;
                electricity1a1_month.value = response.data.electricity1a1;
                postage1a1_month.value = response.data.postage1a1;
                mobile1a1_month.value = response.data.mobile1a1;
                landline1a1_month.value = response.data.landline1a1;
                internet1a1_month.value = response.data.internet1a1;
                building1a1_month.value = response.data.building1a1;
                vehicle1a1_month.value = response.data.vehicle1a1;
                officeequip1a1_month.value = response.data.officeequip1a1;
                extraordinary1a1_month.value = response.data.extraordinary1a1;
                professional1a1_month.value = response.data.professional1a1;
                janitorial1a1_month.value = response.data.janitorial1a1;
                security1a1_month.value = response.data.security1a1;
                general1a1_month.value = response.data.general1a1;
                fidelity1a1_month.value = response.data.fidelity1a1;
                insurance1a1_month.value = response.data.insurance1a1;
                ictsoftware1a1_month.value = response.data.ictsoftware1a1;
                othersub1a1_month.value = response.data.othersub1a1;

                sal2a11_month.value = response.data.sal2a11;

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
                longetivity1a1_total.value = response.data.longetivity1a1_total;
                localtravel1a1_total.value = response.data.localtravel1a1_total;
                foreigntravel1a1_total.value = response.data.foreigntravel1a1_total;
                icttraining1a1_total.value = response.data.icttraining1a1_total;
                officesupplies1a1_total.value = response.data.officesupplies1a1_total;
                officeict1a1_total.value = response.data.officeict1a1_total;
                fuel1a1_total.value = response.data.fuel1a1_total;
                othersupplies1a1_total.value = response.data.othersupplies1a1_total;
                water1a1_total.value = response.data.water1a1_total;
                electricity1a1_total.value = response.data.electricity1a1_total;
                postage1a1_total.value = response.data.postage1a1_total;
                mobile1a1_total.value = response.data.mobile1a1_total;
                landline1a1_total.value = response.data.landline1a1_total;
                internet1a1_total.value = response.data.internet1a1_total;
                building1a1_total.value = response.data.building1a1_total;
                vehicle1a1_total.value = response.data.vehicle1a1_total;
                officeequip1a1_total.value = response.data.officeequip1a1_total;
                extraordinary1a1_total.value = response.data.extraordinary1a1_total;
                professional1a1_total.value = response.data.professional1a1_total;
                janitorial1a1_total.value = response.data.janitorial1a1_total;
                security1a1_total.value = response.data.security1a1_total;
                general1a1_total.value = response.data.general1a1_total;
                fidelity1a1_total.value = response.data.fidelity1a1_total;
                insurance1a1_total.value = response.data.insurance1a1_total;
                ictsoftware1a1_total.value = response.data.ictsoftware1a1_total;
                othersub1a1_total.value = response.data.othersub1a1_total;

                sal2a11_total.value = response.data.sal2a11_total;




                // loading screen
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
    body.no-scroll {
        overflow: hidden;
    }

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
