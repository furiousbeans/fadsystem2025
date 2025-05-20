<template>
    <div class="q-pa-md">
        <q-card class="card-container" flat>
            <q-card class="my-card" flat style="border-radius: 20px">
                <q-card-section horizontal>
                    <q-card-section class="col" style="padding: 45px">
                        <q-card flat bordered style="border-color: #e5e5e5">
                            <q-table
                                ref="tableRef"
                                :rows="rows"
                                :columns="columns"
                                title="LIB Database"
                            >
                                <template v-slot:body-cell-prj_title="props">
                                    <q-td :props="props">
                                        <q-btn
                                            flat
                                            @click="openProjectModal(props.row)"
                                        >
                                            {{ props.row.prj_title }}
                                            <q-tooltip> View Project </q-tooltip>
                                        </q-btn>
                                    </q-td>
                                </template>
                            </q-table>
                        </q-card>
                    </q-card-section>
                </q-card-section>
            </q-card>
        </q-card>
        <q-dialog v-model="LIBDialog">
            <q-card style="min-width: 1000px; min-height: 600px;">
                <q-card-section>
                    <div style="padding:15px">
                        <h5>{{ selectedProject?.prj_title }}</h5>
                        <q-card-section>
                            <q-table
                                ref="LIBtable"
                                :rows="LIBrows"
                                :columns="LIBcolumns"
                                :pagination="{rowsPerPage: 0}"
                                virtual-scroll
                            >

                            </q-table>
                        </q-card-section>
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>


<script setup>
    import { ref, onMounted, reactive, inject } from "vue";
    import { useQuasar } from "quasar";
    import axios from "axios";
    import Swal from "sweetalert2";
    const $q = useQuasar();

    const darkMode = inject("darkMode");

    onMounted(() => {
        document.title = "FAD System | LIB Database";
        viewProject();
    });

    const tableRef = ref();
    const rows = ref([]);
    const columns = [
        {
            name: "prj_div",
            label: "Division",
            field: "prj_div",
            align: "center",
        },
        {
            name: "prj_title",
            label: "Project Title",
            field: "prj_title",
            align: "left",
        },
        {
            name: "prj_fund",
            label: "Fund Source",
            field: "prj_fund",
            align: "center",
        },
        {   
            field: "total_allotment",
            label: "Total Allotment",
            field: "total_allotment",
            align: "right",
            format: Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format,
        },
        {
            label: "Accumulated Obligation",
            align: "center",
        },
        {
            label: "Unexpended Allotment",
            align: "center",
        },
    ];

    const libID = ref();
    const LIBtable = ref();
    const LIBrows = ref([]);
    const LIBcolumns = [
        {
            name: "lib_title",
            label: "LIB Item",
            field: "lib_title",
            align: "left",
        },
        {   
            field: "lib_allot",
            label: "Total Allotment",
            field: "lib_allot",
            align: "right",
            format: Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format,
        },
        {   
            field: "total_amount",
            label: "Total Obligation",
            field: "total_amount",
            align: "right",
            format: Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format,
        },
    ];



    const viewProject = () => {
        axios
            .get("http://localhost/budsys2025_backend/select.php?readProject")
            .then(function (response) {
                // console.log(response.data);
                rows.value = response.data;
            });
    };

    const LIBDialog = ref(false);
    const selectedProject = ref(null);

    const openProjectModal = (row) => {
        selectedProject.value = row;
        LIBDialog.value = true;
        libID.value = row.prj_id;
        console.log(libID.value);
        
        var formData = new FormData();
        formData.append("refnum", libID.value);
        axios
            .post("http://localhost/budsys2025_backend/select.php?getLibItems", formData)
            .then((response) => {
                LIBrows.value = response.data;
            })
            .catch((error) => {
                console.error("Error fetching lib items:", error);
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


<!--
const openProjectModal = (row) => {
    selectedProject.value = row;
    LIBDialog.value = true;
    libID.value = row.prj_id;
    console.log(libID.value);

    var formData = new FormData();
    formData.append("refnum", libID.value);
    axios
        .post("http://localhost/budsys2025_backend/select.php?getLibItems")
        .then((response) => {
            libItems.value = response.data;
        })
        .catch((error) => {
            console.error("Error fetching lib items:", error);
        });
};

const libID = ref();
const LIBtable = ref();
const LIBrows = ref([]);
const LIBcolumns = [
    {
        name: "lib_title",
        label: "LIB Item",
        field: "lib_title",
        align: "left",
    },
    {   
        field: "lib_allot",
        label: "Total Allotment",
        field: "lib_allot",
        align: "right",
        format: Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format,
    },
];
 -->