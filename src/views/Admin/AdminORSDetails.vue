<template>
    <div class="q-pa-md">
        <q-card class="card-container" flat>
            <q-card-section class="col orsdetails-card">
                <q-card class="ors-card" flat bordered>
                    <q-card flat>
                        <div class="row items-center justify-between">
                            <span class="card-text text-title"
                                >ORS Details</span
                            >
                            <q-btn
                                class="card-text"
                                to="/administrator"
                                :color="$q.dark.isActive ? 'pink-7' : 'red'"
                                >Close</q-btn
                            >
                        </div>
                        <br />
                        <div class="q-pa-x-md row items-center q-gutter-x-sm">
                            <div>
                                <vue-qrcode
                                    class="qrcode"
                                    :value="qrData"
                                    :options="{
                                        width: 80,
                                        color: {
                                            dark: '#000',
                                            light: '#fff',
                                        },
                                    }"
                                ></vue-qrcode>
                            </div>
                            <!--  -->
                            <div class="column docdetails-text">
                                <span class="card-text">Document ID</span>
                                <br />
                                <p
                                    class="q-ma-none card-text"
                                    :style="{
                                        fontSize: '16px',
                                        color: $q.dark.isActive
                                            ? '#c5d9f1'
                                            : '#31a6e0',
                                    }"
                                >
                                    {{ docID }}
                                </p>
                            </div>
                        </div>

                        <div>
                            <q-markup-table
                                class="my-table table-text"
                                flat
                                bordered
                                wrap-cells
                            >
                                <tbody>
                                    <tr>
                                        <td class="table-label">Payee Name:</td>
                                        <td class="table-label-value">
                                            {{ displayname }}
                                        </td>
                                        <td class="table-label">
                                            Account Number:
                                        </td>
                                        <td class="table-label-value">
                                            {{ displayacct }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="table-label">Bank:</td>
                                        <td class="table-label-value">
                                            {{ displaybank }}
                                        </td>
                                        <td class="table-label">TIN:</td>
                                        <td class="table-label-value">
                                            {{ displaytin }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="table-label">
                                            Address / Office:
                                        </td>
                                        <td
                                            class="table-label-value"
                                            colspan="3"
                                        >
                                            {{ displayoffice }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="table-label">
                                            Particulars:
                                        </td>
                                        <td
                                            class="table-label-value"
                                            colspan="3"
                                        >
                                            {{ displayorsparticulars }}
                                        </td>
                                    </tr>
                                </tbody>
                            </q-markup-table>

                            <div class="row">
                                <div class="col-4">
                                    <q-markup-table
                                        class="my-table table-text"
                                        flat
                                        bordered
                                    >
                                        <tbody>
                                            <tr>
                                                <td class="table2-label">
                                                    ORS:
                                                </td>
                                                <td class="table2-label-value">
                                                    {{ displayorsnum }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="table2-label">
                                                    DV:
                                                </td>
                                                <td
                                                    class="table2-label-value"
                                                ></td>
                                            </tr>

                                            <tr>
                                                <td class="table2-label">
                                                    BUR:
                                                </td>
                                                <td class="table2-label-value">
                                                    {{}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="table2-label">
                                                    LDDAP:
                                                </td>
                                                <td class="table2-label-value">
                                                    {{}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="table2-label">
                                                    Check:
                                                </td>
                                                <td class="table2-label-value">
                                                    {{}}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </q-markup-table>
                                </div>

                                <div class="col-8">
                                    <q-markup-table
                                        class="my-table table-text table3"
                                        flat
                                        bordered
                                    >
                                        <tbody>
                                            <!-- Table Header Row -->
                                            <tr
                                                :class="[
                                                    'table-header',
                                                    {
                                                        'dark-mode':
                                                            $q.dark.isActive,
                                                    },
                                                ]"
                                            >
                                                <td class="table-empty"></td>
                                                <td class="table-header-text">
                                                    UACS
                                                </td>
                                                <td class="table-header-text">
                                                    MFO/PAP
                                                </td>
                                                <td class="table-header-text">
                                                    Amount
                                                </td>
                                                <td class="table-empty"></td>
                                            </tr>
                                            <tr
                                                v-for="item in modalorspayee"
                                                :key="item.id"
                                            >
                                                <td class="table-empty"></td>
                                                <td class="table-cell">
                                                    {{ item.uacs }}
                                                </td>
                                                <td class="table-cell">
                                                    {{ item.mfopap }}
                                                </td>
                                                <td class="table-cell">
                                                    {{
                                                        Number(
                                                            item.amount
                                                        ).toLocaleString(
                                                            undefined,
                                                            {
                                                                minimumFractionDigits: 2,
                                                            }
                                                        )
                                                    }}
                                                </td>
                                                <td class="table-empty"></td>
                                            </tr>
                                        </tbody>
                                    </q-markup-table>
                                </div>
                            </div>

                            <div class="row btn-group-cont">
                                <div class="btn-group">
                                    <q-btn
                                        class="print-btn"
                                        :color="
                                            $q.dark.isActive
                                                ? 'blue-4'
                                                : 'primary'
                                        "
                                    >
                                        Print ORS
                                    </q-btn>
                                    <q-btn
                                        class="print-btn"
                                        :color="
                                            $q.dark.isActive
                                                ? 'teal-6'
                                                : 'teal-8'
                                        "
                                    >
                                        Print BURS</q-btn
                                    >
                                    <q-btn
                                        class="print-btn"
                                        :color="
                                            $q.dark.isActive
                                                ? 'purple-6'
                                                : 'purple-9'
                                        "
                                    >
                                        Print DV</q-btn
                                    >
                                </div>
                            </div>
                        </div>
                    </q-card>
                </q-card>
            </q-card-section>
        </q-card>
    </div>
</template>
<!--  -->
<script setup>
    import { ref, onMounted } from "vue";
    import { useRoute } from "vue-router";
    const route = useRoute();
    import { useQuasar } from "quasar";
    import VueQrcode from "@chenfengyuan/vue-qrcode";
    import axios from "axios";

    const $q = useQuasar();

    const docID = ref();
    onMounted(() => {
        docID.value = route.params.ors_random;
        viewORSdetails();
        viewORSdetails_particulars();
    });

    // generate QR
    const qrData = ref(`/administrator/orsdetails/${docID}`);

    const modalorspayee = ref([]);
    const displayname = ref("");
    const displaybank = ref("");
    const displayoffice = ref("");
    const displayacct = ref("");
    const displaytin = ref("");
    const displayorsnum = ref("");
    const displaystatus = ref("");
    const displaydetails = ref("");
    const displayparticulars = ref("");
    const displayorsparticulars = ref("");

    const viewORSdetails = () => {
        var formData = new FormData();
        formData.append("refnum", docID.value);
        // console.log(docID.value);
        axios
            .post(
                "http://localhost/budsys2025_backend/select.php?readORSpayee",
                formData
            )
            .then(function (response) {
                modalorspayee.value = response.data;
                modalorspayee.value.forEach((item) => {
                    displayname.value = item.payeename;
                    displaybank.value = item.payeeaddr;
                    displayoffice.value = item.payeeoffice;
                    displaytin.value = item.payeetin;
                    displayacct.value = item.payeeacctnum;
                    displaydetails.value = item.details;
                    displayparticulars.value = item.particulars;
                    displaystatus.value = item.isapproved;
                    displayorsnum.value = item.ors_number;
                });
            });
    };

    const viewORSdetails_particulars = () => {
        var formData = new FormData();
        formData.append("refnum", docID.value);
        axios
            .post(
                "http://localhost/budsys2025_backend/select.php?readORSpayee_particulars",
                formData
            )
            .then(function (response) {
                displayorsparticulars.value = response.data[0].particulars;
            });
    };
</script>

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
    .docdetails-text {
        line-height: 0.75;
    }
    .card-text {
        font-family: "Poppins", sans-serif;
    }
    .qrcode {
        margin-left: 15px;
    }
    .my-table {
        margin: 15px;
    }
    .table-label {
        width: 12%;
        font-weight: 600;
    }
    .table-label-value {
        font-weight: 500;
    }
    .table2-label {
        width: 30%;
        font-weight: 600;
    }
    .table2-label-value {
        font-weight: 500;
    }
    .table3 {
        float: right;
        width: 95%;
    }
    .table-header {
        background-color: #1976d3; /* Light mode default */
        color: #fff;
    }
    .dark-mode {
        background-color: #64b5f6; /* Dark mode background */
    }
    .table-header-text {
        width: 30%;
        font-weight: 500;
        text-align: center;
    }
    .table-empty {
        width: 10%;
    }
    .table-cell {
        width: 30%;
        text-align: center;
    }
    .table-text tr td {
        font-family: "Poppins", sans-serif;
        font-size: 14px;
    }
    .btn-group-cont {
        margin: 30px;
    }
    .btn-group {
        margin: auto;
    }
    .print-btn {
        width: 250px;
        margin: 5px;
        border-radius: 10px;
    }
    @media (max-width: 1200px) {
        .print-btn {
            width: 150px;
            padding: 8px;
        }
    }
</style>
