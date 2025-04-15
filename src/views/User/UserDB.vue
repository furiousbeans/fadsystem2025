<template>
    {{ userdiv }}
    <!-- ORS Table -->
    <div class="q-pa-md" v-show="showTable" id="orsTable">
        <q-card class="orstbl-card" flat>
            <q-card-section horizontal>
                <q-card-section class="orstbl-card-section col">
                    <q-card class="orstbl-card-container" flat bordered>
                        <q-btn
                            @click="toggleORSTable"
                            :color="$q.dark.isActive ? 'green-5' : 'primary'"
                            >Add ORS</q-btn
                        >
                    </q-card>
                </q-card-section>
            </q-card-section>
        </q-card>
    </div>

    <!-- ORS Form -->
    <div class="q-pa-md" v-if="!showTable" id="orsForm">
        <q-card class="orstbl-card" flat>
            <q-card-section horizontal>
                <q-card-section class="orstbl-card-section col">
                    <q-card class="orstbl-card-container" flat bordered>
                        <q-card flat bordered class="orstbl-card-cont2">
                            <q-card flat>
                                <div class="row items-center justify-between">
                                    <span style="font-size: 20px">Add ORS</span>
                                    <q-btn
                                        @click="toggleORSTable"
                                        :color="
                                            $q.dark.isActive ? 'pink-7' : 'red'
                                        "
                                        >Cancel</q-btn
                                    >
                                </div>
                                <div class="q-pa-x-md row">
                                    <div class="q-pa-sm col-6">
                                        <q-select
                                            autofocus
                                            use-input
                                            fill-input
                                            hide-selected
                                            input-debounce="0"
                                            @filter="filterFnPayee"
                                            v-model="selectPayeeDropdown"
                                            :options="itemoptionsPayee"
                                            label="Payee Name "
                                            map-options
                                            add
                                            required
                                        >
                                            <template v-slot:label>
                                                Payee Name
                                                <span style="font-size: 12px"
                                                    >(*)</span
                                                >
                                            </template>
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section
                                                        class="text-grey"
                                                    >
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    <div class="q-pa-sm col-6">
                                        <q-input
                                            label="Account Number"
                                            v-model:model-value="
                                                selectPayeeDropdown.payeeacctnum
                                            "
                                            required
                                            readonly
                                            disabled
                                        >
                                        </q-input>
                                    </div>
                                </div>
                                <div class="q-pa-x-md row">
                                    <div class="q-pa-sm col-6">
                                        <q-input
                                            label="Bank Branch"
                                            required
                                            v-model:model-value="
                                                selectPayeeDropdown.payeeaddr
                                            "
                                            readonly
                                            disabled
                                        >
                                        </q-input>
                                    </div>
                                    <div class="q-pa-sm col-6">
                                        <q-input
                                            label="TIN"
                                            v-model="formInput.orstin"
                                        >
                                        </q-input>
                                    </div>
                                </div>

                                <div class="q-pa-x-md row">
                                    <div class="q-pa-sm col-12">
                                        <q-input
                                            label="Address"
                                            v-model="formInput.address"
                                        >
                                        </q-input>
                                    </div>
                                </div>
                                <br />
                                <hr />
                                <br />
                                <div
                                    class="row"
                                    style="
                                        border: 1px solid #8ec8ed;
                                        border-radius: 10px;
                                        padding: 15px;
                                        margin-bottom: 10px;
                                    "
                                    v-for="(row, index) in appendRow"
                                    :key="index"
                                >
                                    <div class="q-pa-sm col-1">
                                        <q-input
                                            :name="`data[${index}]respcen`"
                                            id="respctxt"
                                            label="Division"
                                            v-model="row.respcentxt"
                                        ></q-input>
                                    </div>
                                    <div class="q-pa-sm col-4">
                                        <q-select
                                            use-input
                                            fill-input
                                            hide-selected
                                            input-debounce="0"
                                            @filter="filterFnProject"
                                            v-model="row.projectselect"
                                            :options="itemoptionsProject"
                                            :name="`data[${index}]projectselect`"
                                            label="MFO/PAP"
                                            map-options
                                            required
                                        >
                                            <template v-slot:label>
                                                Project
                                                <span style="font-size: 12px"
                                                    >(*)</span
                                                >
                                            </template>
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section
                                                        class="text-grey"
                                                    >
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>

                                    <div class="q-pa-sm col-2">
                                        <q-input
                                            label="MFO/PAP"
                                            v-model:model-value="
                                                row.projectselect.prjfund
                                            "
                                            required
                                        >
                                        </q-input>
                                    </div>

                                    <div class="q-pa-sm col-2">
                                        <q-select
                                            use-input
                                            fill-input
                                            hide-selected
                                            input-debounce="0"
                                            @filter="filterFnUACS"
                                            v-model="row.uacsselect"
                                            :options="itemoptionsUACS"
                                            :name="`data[${index}]uacsselect`"
                                            label="UACS"
                                            map-options
                                            required
                                            hide-dropown-icon="true"
                                            behavior="menu"
                                            menu-anchor="bottom start"
                                            menu-self="top start"
                                        >
                                            <template v-slot:label>
                                                UACS
                                                <span style="font-size: 12px"
                                                    >(*)</span
                                                >
                                            </template>
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section
                                                        class="text-grey"
                                                    >
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>

                                    <div class="q-pa-sm col-2">
                                        <q-input
                                            :name="`data[${index}]amount`"
                                            label="Amount"
                                            required
                                            v-model="row.amounttxt"
                                            type="number"
                                            step="0.01"
                                        >
                                            <template v-slot:label>
                                                Amount
                                                <span style="font-size: 12px"
                                                    >(*)</span
                                                >
                                            </template>
                                        </q-input>
                                    </div>
<!--  -->
                                    <div class="q-pa-sm col-1">
                                        <input
                                            label="MFO/PAP"
                                            v-model="row.projectselect.idvalue"
                                            style="width: 10px;"
                                            disabled
                                        >
                                        </input>
                                        <q-btn
                                            v-if="index === 0"
                                            @click="addNewItem()"
                                            padding="5px 5px"
                                            :color="
                                                $q.dark.isActive
                                                    ? 'blue-4'
                                                    : 'primary'
                                            "
                                            icon="add"
                                            style="float: right"
                                        >
                                            <q-tooltip> Add row </q-tooltip>
                                        </q-btn>
                                        <q-btn
                                            v-if="canDelete(index)"
                                            @click="deleteItem(index)"
                                            padding="5px 5px"
                                            :color="
                                                $q.dark.isActive
                                                    ? 'pink-7'
                                                    : 'negative'
                                            "
                                            icon="delete"
                                            style="float: right"
                                        >
                                            <q-tooltip> Delete Row </q-tooltip>
                                        </q-btn>
                                    </div>
                                </div>
                                <!--  -->
                                <div class="q-pa-sm col-4">
                                        <q-select
                                            use-input
                                            fill-input
                                            hide-selected
                                            v-model="selectLIBdropdown"
                                            input-debounce="0"
                                            label="MFO/PAP"
                                            map-options
                                            required
                                        >
                                        
                                        <!-- :options="itemoptionsLIB" -->
                                        </q-select>
                                    </div>

                                <!-- ========== Hidden inputs ========== -->
                                <!-- Payee ID -->
                                <input
                                    type="text"
                                    v-model="selectPayeeDropdown.value"
                                    id="selpayee"
                                />
                                <!-- Project ID -->
                            </q-card>
                        </q-card>
                    </q-card>
                </q-card-section>
            </q-card-section>
        </q-card>
    </div>
</template>

<script setup>
    import { ref, onMounted, reactive } from "vue";
    import { useQuasar } from "quasar";
    import axios from "axios";

    const $q = useQuasar();

    const userdiv = localStorage.getItem("userdiv");

    onMounted(() => {
        viewPayee();
        viewProject();
        viewUACS();
    });

    // ==================== Show Hide ORS table scripts ==================== //

    const showTable = ref(true);
    const toggleORSTable = () => {
        showTable.value = !showTable.value;
    };

    const formInput = reactive({
        orstin: "",
        address: "",
        respcentxt: userdiv,
    });

    // ==================== Show Hide ORS table scripts ==================== //

    const appendRow = ref([
        {
            orstin: "",
            address: "",
            respcentxt: userdiv,
            projectselect: {
                idvalue:""
            },
            amounttxt: "",
        },
    ]);

    // ==================== Add / Delete row scripts ==================== //

    const addNewItem = () => {
        if (appendRow.value.length < 20) {
            appendRow.value.push({
                orstin: "",
                address: "",
                respcentxt: userdiv,
                projectselect: "",
                amounttxt: "",
            });
        }
    };
    //
    const canDelete = (index) => index > 0;
    const deleteItem = (index) => {
        if (index !== 0) {
            appendRow.value.splice(index, 1);
        }
    };

    // ==================== Dropdown scripts ==================== //

    const selectPayeeDropdown = ref("");
    const selectLIBdropdown = ref("");

    var stringOptionsUACS = ref([]);
    var stringOptionsPayee = ref([]);
    var stringOptionsProject = ref([]);
    const itemoptionsPayee = ref([stringOptionsPayee]);
    const itemoptionsProject = ref([stringOptionsProject]);
    const itemoptionsUACS = ref([stringOptionsUACS]);

    const filterFnPayee = (val, update) => {
        if (val === "") {
            update(() => {
                itemoptionsPayee.value = stringOptionsPayee;
            });
            return;
        }

        update(() => {
            const needle = val.toLowerCase();
            itemoptionsPayee.value = stringOptionsPayee.filter(
                (v) => v.label.toLowerCase().indexOf(needle) > -1
            );
        });
    };

    const filterFnProject = (val, update) => {
        if (val === "") {
            update(() => {
                itemoptionsProject.value = stringOptionsProject;
            });
            return;
        }

        update(() => {
            const needle = val.toLowerCase();
            itemoptionsProject.value = stringOptionsProject.filter(
                (v) => v.label.toLowerCase().indexOf(needle) > -1
            );
        });
    };

    const filterFnUACS = (val, update) => {
        if (val === "") {
            update(() => {
                itemoptionsUACS.value = stringOptionsUACS;
            });
            return;
        }
        update(() => {
            const needle = val.toLowerCase();
            itemoptionsUACS.value = stringOptionsUACS.filter(
                (v) => v.label.toLowerCase().indexOf(needle) > -1
            );
        });
    };

    // ==================== Database scripts ==================== //
    // view payee list
    const viewPayee = () => {
        axios
            .get("http://localhost/budsys2025_backend/select.php?readPayee")
            .then(function (response) {
                stringOptionsPayee = response.data;
            });
    };
    // view Project Codes
    const viewProject = () => {
        axios
            .get("http://localhost/budsys2025_backend/select.php?readProject")
            .then(function (response) {
                stringOptionsProject = response.data;
            });
    };

    // view UACS Codes
    const viewUACS = () => {
        axios
            .get("http://localhost/budsys2025_backend/select.php?readUACS")
            .then(function (response) {
                stringOptionsUACS = response.data;
            });
    };

    // const toggleORSTable = () => {
    //     showTable.value = !showTable.value;
    //
    // };
</script>

<style scoped>
    * {
        font-family: "Poppins", sans-serif;
    }

    .orstbl-card {
        border-radius: 20px;
    }

    .orstbl-card-section {
        padding: 45px;
    }

    .orstbl-card-container {
        border-color: #e5e5e5;
    }

    .orstbl-card-cont2 {
        border-color: #e5e5e5;
        padding: 15px;
    }

    .orstbl thead tr:first-child th:first-child {
        background-color: white;
    }

    .orstbl td:first-child {
        background-color: white;
    }

    .body--dark .orstbl thead tr:first-child th:first-child {
        background-color: white;
    }
    .body--dark .orstbl td:first-child {
        background-color: #47758f;
    }

    .body--dark .orstbl td:first-child,
    .body--dark .orstbl th:first-child {
        color: white !important;
    }

    .orstbl th:first-child,
    .orstbl td:first-child {
        position: sticky;
        left: 0;
        z-index: 1;
    }

    .body--dark .orstbl {
        color: white !important;
    }

    .body--dark .orstbl .q-table__title,
    .body--dark .orstbl .q-table th,
    .body--dark .orstbl .q-table td {
        color: white !important;
    }

    .q-menu {
        max-height: 300px !important;
        overflow-y: auto !important;
    }
</style>
