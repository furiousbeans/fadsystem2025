<template>
    <div class="q-pa-md">
        <q-card class="card-container" flat>
            <q-card-section class="col orsdetails-card">
                <q-card class="ors-card" flat bordered>
                    <q-card flat>
                        <div class="row items-center justify-between">
                            <span class="card-text text-title">LIB Database</span>
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
                                        label="FAD AC"
                                    />
                                    <q-tab
                                        name="tab2"
                                        class="text-white tab2 tabs"
                                        :class="{
                                            'active-tab': tab === 'tab2',
                                        }"
                                        label="OD/ODD AC"
                                    />
                                    <q-tab
                                        name="tab3"
                                        class="text-white tabs"
                                        :class="{
                                            'active-tab': tab === 'tab3',
                                        }"
                                        label="2A1-STSD"
                                    />
                                    <q-tab
                                        name="tab4"
                                        class="text-white tabs"
                                        :class="{
                                            'active-tab': tab === 'tab4',
                                        }"
                                        label="2A2A-STHERPD"
                                    />
                                    <q-tab
                                        name="tab5"
                                        class="text-white tabs"
                                        :class="{
                                            'active-tab': tab === 'tab5',
                                        }"
                                        label="2A2B-SEID"
                                    />
                                    <q-tab
                                        name="tab6"
                                        class="text-white tabs"
                                        :class="{
                                            'active-tab': tab === 'tab6',
                                        }"
                                        label="3A1"
                                    />
                                </q-tabs>
                                <q-tab-panels v-model="tab" animated>
                                    <q-tab-panel name="tab1" class="tabpanel">
                                        <q-table
                                            ref="tableFAD"
                                            :rows="rowsFAD"
                                            :columns="columnsFAD"
                                            :pagination="{rowsPerPage: 0}"
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
                                    </q-tab-panel>
                                    <q-tab-panel name="tab2" class="tabpanel">
                                        <q-table
                                            ref="tableODAC"
                                            :rows="rowsODAC"
                                            :columns="columnsODAC"
                                            :pagination="{rowsPerPage: 0}"
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
                                    </q-tab-panel>
                                    <q-tab-panel name="tab3" class="tabpanel">
                                        <q-table
                                            ref="tableSTSD"
                                            :rows="rowsSTSD"
                                            :columns="columnsSTSD"
                                            :pagination="{rowsPerPage: 0}"
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
                                    </q-tab-panel>
                                </q-tab-panels>
                            </q-card>
                        </div>
                    </q-card>
                </q-card>
            </q-card-section>
        </q-card>

        <!-- <q-card class="card-container" flat>
            <q-card class="my-card" flat style="border-radius: 20px">
                <q-card-section horizontal>
                    <q-card-section class="col" style="padding: 45px">
                        <q-card flat bordered style="border-color: #e5e5e5">
                            <q-table
                                ref="tableRef"
                                :rows="rows"
                                :columns="columns"
                                :pagination="{rowsPerPage: 0}"
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
        </q-card> -->

        <!--  -->

        <q-dialog v-model="LIBDialog">
            <q-card style="min-width: 1500px;">
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

    
    const tab = ref("tab1");

    onMounted(() => {
        document.title = "FAD System | LIB Database";
        viewProjectFAD();
        viewProjectSTSD();
        viewProjectSTHERPD();
        viewProjectSEID();
        viewProjectOD();
        viewProjectODAC();
    });

    const tableFAD = ref();
    const rowsFAD = ref([]);
    const columnsFAD = [
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
            name: "total_allotment",
            label: "Total Allotment",
            field: "total_allotment",
            align: "right",
            format: Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format,
        },
        {
            name: "total_obli",
            label: "Accumulated Obligation",
            field: "total_obli",
            align: "right",
            format: Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format,
        },
        {
            label: "Unexpended Allotment",
            name: "balance",
            field: "balance",
            align: "right",
            format: Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format,
        },
        {
            label: "%",
            name: "balance_percentage",
            field: "balance_percentage",
            align: "right",
            format: val => Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(val) + "%",
            style: (row) => row.balance_percentage > 90 ? "color: red;" : ""
        },
    ];

    // 

    const tableSTSD = ref();
    const rowsSTSD = ref([]);
    const columnsSTSD = [
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
            field: "total_obli",
            label: "Accumulated Obligation",
            field: "total_obli",
            align: "right",
            format: Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format,
        },
        {
            label: "Unexpended Allotment",
            field: "balance",
            field: "balance",
            align: "right",
            format: Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format,
        },
    ];

    const tableSTHERPD = ref();
    const rowsSTHERPD = ref([]);
    const columnsSTHERPD = [
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
            field: "total_obli",
            label: "Accumulated Obligation",
            field: "total_obli",
            align: "right",
            format: Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format,
        },
        {
            label: "Unexpended Allotment",
            field: "balance",
            field: "balance",
            align: "right",
            format: Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format,
        },
    ];

    const tableSEID = ref();
    const rowsSEID = ref([]);
    const columnsSEID = [
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
            field: "total_obli",
            label: "Accumulated Obligation",
            field: "total_obli",
            align: "right",
            format: Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format,
        },
        {
            label: "Unexpended Allotment",
            field: "balance",
            field: "balance",
            align: "right",
            format: Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format,
        },
    ];

    const tableOD = ref();
    const rowsOD = ref([]);
    const columnsOD = [
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
            field: "total_obli",
            label: "Accumulated Obligation",
            field: "total_obli",
            align: "right",
            format: Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format,
        },
        {
            label: "Unexpended Allotment",
            field: "balance",
            field: "balance",
            align: "right",
            format: Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format,
        },
    ];

    const tableODAC = ref();
    const rowsODAC = ref([]);
    const columnsODAC = [
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
            field: "total_obli",
            label: "Accumulated Obligation",
            field: "total_obli",
            align: "right",
            format: Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format,
        },
        {
            label: "Unexpended Allotment",
            field: "balance",
            field: "balance",
            align: "right",
            format: Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format,
        },
    ];

// 

    // const tableRef = ref();
    // const rows = ref([]);
    // const columns = [
    //     {
    //         name: "prj_div",
    //         label: "Division",
    //         field: "prj_div",
    //         align: "center",
    //     },
    //     {
    //         name: "prj_title",
    //         label: "Project Title",
    //         field: "prj_title",
    //         align: "left",
    //     },
    //     {
    //         name: "prj_fund",
    //         label: "Fund Source",
    //         field: "prj_fund",
    //         align: "center",
    //     },
    //     {   
    //         field: "total_allotment",
    //         label: "Total Allotment",
    //         field: "total_allotment",
    //         align: "right",
    //         format: Intl.NumberFormat("en-US", {
    //             minimumFractionDigits: 2,
    //             maximumFractionDigits: 2,
    //         }).format,
    //     },
    //     {
    //         field: "total_obli",
    //         label: "Accumulated Obligation",
    //         field: "total_obli",
    //         align: "right",
    //         format: Intl.NumberFormat("en-US", {
    //             minimumFractionDigits: 2,
    //             maximumFractionDigits: 2,
    //         }).format,
    //     },
    //     {
    //         label: "Unexpended Allotment",
    //         field: "balance",
    //         field: "balance",
    //         align: "right",
    //         format: Intl.NumberFormat("en-US", {
    //             minimumFractionDigits: 2,
    //             maximumFractionDigits: 2,
    //         }).format,
    //     },
    // ];

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

// 

    const viewProjectFAD = () => {
        axios
            .get("http://172.16.10.5/budsys2025_backend/select.php?readProjectFAD")
            .then(function (response) {
                // console.log(response.data);
                rowsFAD.value = response.data;
            });
    };

    const viewProjectSTSD = () => {
        axios
            .get("http://172.16.10.5/budsys2025_backend/select.php?readProjectSTSD")
            .then(function (response) {
                // console.log(response.data);
                rowsSTSD.value = response.data;
            });
    };

    const viewProjectSTHERPD = () => {
        axios
            .get("http://172.16.10.5/budsys2025_backend/select.php?readProjectSTHERPD")
            .then(function (response) {
                // console.log(response.data);
                rowsSTHERPD.value = response.data;
            });
    };

    // 

    const viewProjectSEID = () => {
        axios
            .get("http://172.16.10.5/budsys2025_backend/select.php?readProjectSEID")
            .then(function (response) {
                // console.log(response.data);
                rowsSEID.value = response.data;
            });
    };

    const viewProjectOD = () => {
        axios
            .get("http://172.16.10.5/budsys2025_backend/select.php?readProjectOD")
            .then(function (response) {
                // console.log(response.data);
                rowsOD.value = response.data;
            });
    };

    const viewProjectODAC = () => {
        axios
            .get("http://172.16.10.5/budsys2025_backend/select.php?readProjectODAC")
            .then(function (response) {
                // console.log(response.data);
                rowsODAC.value = response.data;
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
            .post("http://172.16.10.5/budsys2025_backend/select.php?getLibItems", formData)
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
        .post("http://172.16.10.5/budsys2025_backend/select.php?getLibItems")
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


 