<template>
    <div class="q-pa-md">
        <q-card class="card-container" flat>
            <q-card-section class="col orsdetails-card">
                <q-card class="ors-card" flat bordered>
                    <q-card flat>
                        <div class="row items-center justify-between">
                            <span class="card-text text-title"
                                >LIB Database</span
                            >
                        </div>
                        <br>
                        <div>
                            <q-markup-table flat bordered>
                                <thead>
                                    <tr separator="cell">
                                        <th class="text-center" style="width:55%">Project Title</th>
                                        <th class="text-center" style="width:15%">Allotment</th>
                                        <th class="text-center" style="width:15%">Obligated</th>
                                        <th class="text-center" style="width:15%">Remaining Allotment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Human Resource Development Program (HRDP)</td>
                                        <td>Human Resource Development Program (HRDP)</td>
                                        <td>Human Resource Development Program (HRDP)</td>
                                        <td>Human Resource Development Program (HRDP)</td>
                                    </tr>
                                </tbody>
                            </q-markup-table>
                        </div>
                    </q-card>
                </q-card>
            </q-card-section>
        </q-card>
    </div>
</template>


<script setup>
    import { ref, onMounted, reactive, inject } from "vue";
    import { useQuasar } from "quasar";
    import axios from "axios";
    import Swal from "sweetalert2";
    const $q = useQuasar();

    const darkMode = inject("darkMode");</script>


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