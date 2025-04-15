<template>
    <div class="q-pa-md" v-show="showTable" id="orsTable">
        <q-card class="my-card" flat style="border-radius: 20px">
            <q-card-section horizontal>
                <q-card-section class="col" style="padding: 45px">
                    <q-card flat bordered style="border-color: #e5e5e5">
                        <q-table
                            class="orstbl"
                            ref="tableRef"
                            :rows="rows"
                            :columns="columns"
                            :filter="filter"
                            title="List of ORS"
                            row-key="index"
                            virtual-scroll
                            v-model:pagination="pagination"
                        >
                            <template v-slot:top-right>
                                <q-input
                                    dense
                                    debounce="300"
                                    v-model="filter"
                                    style="margin-right: 12px"
                                >
                                    <template v-slot:append>
                                        <q-icon name="search" />
                                    </template>
                                </q-input>
                                <div class="row">
                                    <div class="col">
                                        <q-btn
                                            @click="toggleORSTable"
                                            :color="
                                                $q.dark.isActive
                                                    ? 'green-5'
                                                    : 'primary'
                                            "
                                            >Add ORS</q-btn
                                        >
                                        <q-tooltip> Add ORS </q-tooltip>
                                    </div>
                                </div>
                            </template>
                            <template v-slot:body-cell-ors_random="props">
                                <q-td :props="props">
                                    <router-link
                                        :to="
                                            '/administrator/orsdetails/' +
                                            props.row.ors_random
                                        "
                                    >
                                        <q-btn
                                            dense
                                            flat
                                            class="orsdetails-btn-link"
                                            :color="
                                                $q.dark.isActive
                                                    ? 'white'
                                                    : 'blue'
                                            "
                                        >
                                            {{ props.row.ors_random }}
                                            <q-tooltip> View record </q-tooltip>
                                        </q-btn>
                                    </router-link>
                                </q-td>
                            </template>
                            <template v-slot:body-cell-actionbutton="props">
                                <q-td :props="props">
                                    <q-btn-dropdown
                                        auto-close
                                        dense
                                        flat
                                        icon="print"
                                        :color="
                                            $q.dark.isActive
                                                ? 'cyan-5'
                                                : 'primary'
                                        "
                                    >
                                        <q-list>
                                            <q-item dense>
                                                <q-btn
                                                    dense
                                                    flat
                                                    icon="print"
                                                    color="primary"
                                                >
                                                    &nbsp;&nbsp;ORS
                                                </q-btn>
                                            </q-item>
                                            <q-item dense>
                                                <q-btn
                                                    dense
                                                    flat
                                                    icon="print"
                                                    color="green-8"
                                                >
                                                    &nbsp;&nbsp;BURS
                                                </q-btn>
                                            </q-item>
                                            <q-item dense>
                                                <q-btn
                                                    dense
                                                    flat
                                                    icon="print"
                                                    color="deep-orange-13"
                                                >
                                                    &nbsp;&nbsp;DV
                                                </q-btn>
                                            </q-item>
                                        </q-list>
                                    </q-btn-dropdown>
                                    <q-btn
                                        dense
                                        flat
                                        color="red"
                                        icon="delete"
                                        v-if="props.row.isapproved == 'Pending'"
                                    >
                                        <q-tooltip> Delete record </q-tooltip>
                                    </q-btn>
                                    <q-btn
                                        dense
                                        flat
                                        color="gray"
                                        icon="delete"
                                        disabled
                                        v-else
                                    >
                                        <q-tooltip>
                                            Approved ORS cannot be deleted!
                                        </q-tooltip>
                                    </q-btn>
                                </q-td>
                            </template>
                        </q-table>
                    </q-card>
                </q-card-section>
            </q-card-section>
        </q-card>
    </div>
    <div class="q-pa-md" v-if="!showTable" id="orsForm">
        <q-card class="my-card" flat style="border-radius: 20px">
            <q-card-section horizontal>
                <q-card-section class="col" style="padding: 45px">
                    <q-card
                        flat
                        bordered
                        style="border-color: #e5e5e5; padding: 15px"
                    >
                        <q-card flat>
                            <div class="row items-center justify-between">
                                <span style="font-size: 20px">Add ORS</span>
                                <q-btn
                                    @click="toggleORSTable"
                                    :color="$q.dark.isActive ? 'pink-7' : 'red'"
                                    >Cancel</q-btn
                                >
                            </div>
                            <form id="orsdetails" @submit.prevent="addnewORS">
                                <div class="q-pa-x-md row">
                                    <div class="q-pa-sm col-6">
                                        <q-select
                                            autofocus
                                            use-input
                                            fill-input
                                            hide-selected
                                            input-debounce="0"
                                            @filter="filterFnPayee"
                                            v-model="selectedPayee"
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
                                                selectedPayee.payeeacctnum
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
                                                selectedPayee.payeeaddr
                                            "
                                            readonly
                                            disabled
                                        >
                                        </q-input>
                                    </div>
                                    <div class="q-pa-sm col-6">
                                        <q-input
                                            label="TIN"
                                            v-model="state.orstin"
                                        >
                                        </q-input>
                                    </div>
                                </div>

                                <div class="q-pa-x-md row">
                                    <div class="q-pa-sm col-12">
                                        <q-input
                                            label="Address"
                                            v-model="state.address"
                                        >
                                        </q-input>
                                    </div>
                                </div>
                                <!-- Hidden input -->
                                <input
                                    type="text"
                                    v-model="selectedPayee.value"
                                    id="selpayee"
                                    hidden
                                />

                                <br /><br />
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
                                    <!-- Column Group -->
                                    <div class="q-pa-sm col-1">
                                        <q-input
                                            :name="`data[${index}]respcen`"
                                            id="respctxt"
                                            label="Division"
                                            v-model="row.respcentxt"
                                        ></q-input>
                                    </div>

                                    <div class="q-pa-sm col-4">
                                        <q-input
                                            v-model="row.particstxt"
                                            :name="`data[${index}]prj`"
                                            label="Particulars"
                                        ></q-input>
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
                                        <q-select
                                            use-input
                                            fill-input
                                            hide-selected
                                            input-debounce="0"
                                            @filter="filterFnPrj"
                                            v-model="row.prjselect"
                                            :options="itemoptionsMFOPAP"
                                            :name="`data[${index}]prjselect`"
                                            label="MFO/PAP"
                                            map-options
                                            required
                                        >
                                            <template v-slot:label>
                                                MFO/PAP
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
                                    <div class="q-pa-sm col-1">
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
                                <div class="btn-container">
                                    <q-btn
                                        label="Save ORS"
                                        padding="12px"
                                        name="addnewORS"
                                        type="submit"
                                        style="width: 40%; border-radius: 15px"
                                        :color="
                                            $q.dark.isActive
                                                ? 'blue-4'
                                                : 'primary'
                                        "
                                        icon="save"
                                    />
                                </div>
                            </form>
                        </q-card>
                    </q-card>
                </q-card-section>
            </q-card-section>

            <!-- <p>
                Dark mode:
                {{ darkMode ? "Enabled" : "Disabled" }}
            </p> -->
        </q-card>
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
        document.title = "FAD System | Dashboard";
        viewORS();
        viewPayee();
        viewUACS();
        viewMFOPAP();
    });

    const username = localStorage.getItem("username");
    const userdiv = localStorage.getItem("userdiv");

    // =============== Toggle database view =============== //
    const showTable = ref(true);

    const toggleORSTable = () => {
        showTable.value = !showTable.value;
        clearText();
    };
    // =============== Toggle database view =============== //

    // =============== Database table =============== //
    const tableRef = ref();
    const filter = ref("");
    const pagination = ref({
        rowsPerPage: 10,
    });
    const rows = ref([]);
    const columns = [
        {
            name: "ors_random",
            label: "Doc ID",
            field: "ors_random",
            align: "center",
            sortable: true,
            style: {
                borderRight: "1px solid #31a6e0",
            },
            headerStyle: {
                fontWeight: "bolder",
                color: "#fff",
                borderRight: "1px solid #31a6e0",
                backgroundColor: "#31a6e0",
                height: "50px",
            },
            headerClasses: "text-white",
        },
        {
            name: "ors_number",
            label: "ORS Number",
            field: "ors_number",
            align: "center",
            sortable: true,
            style: {
                color: "#484848",
            },
            headerStyle: {
                borderTop: "1px solid #c7c7c7",
                color: "#484848",
            },
        },
        {
            name: "payeeName",
            label: "Payee Name",
            field: "payeename",
            align: "left",
            style: {
                color: "#484848",
            },
            headerStyle: {
                borderTop: "1px solid #c7c7c7",
                color: "#484848",
            },
        },
        {
            name: "amount",
            label: "Net Amount",
            field: "amount",
            align: "right",
            format: Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format,
            style: {
                color: "#484848",
            },
            headerStyle: {
                borderTop: "1px solid #c7c7c7",
                color: "#484848",
            },
        },
        {
            name: "particulars",
            label: "Particulars",
            field: "particulars",
            align: "left",
            style: {
                color: "#484848",
            },
            headerStyle: {
                borderTop: "1px solid #c7c7c7",
                color: "#484848",
            },
        },
        {
            name: "uacs",
            label: "UACS Code",
            field: "uacs",
            align: "left",
            style: {
                color: "#484848",
            },
            headerStyle: {
                borderTop: "1px solid #c7c7c7",
                color: "#484848",
            },
        },
        {
            name: "uacs",
            label: "MFO / PAP",
            field: "mfopap",
            align: "left",
            style: {
                color: "#484848",
            },
            headerStyle: {
                borderTop: "1px solid #c7c7c7",
                color: "#484848",
            },
        },
        {
            name: "actionbutton",
            label: "Actions",
            field: "",
            align: "center",
            style: {
                color: "#484848",
            },
            headerStyle: {
                borderTop: "1px solid #c7c7c7",
                color: "#484848",
            },
        },
    ];
    // =============== Database table =============== //

    // =============== Query scripts =============== //
    // view all user ORS
    const viewORS = () => {
        var formData = new FormData();
        axios
            .post(
                "http://localhost/budsys2025_backend/select.php?readORSall",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            .then(function (response) {
                rows.value = response.data;
            })
            .catch((error) => {
                console.error("Error fetching ORS:", error);
            });
    };

    // view payee list
    const viewPayee = () => {
        axios
            .get("http://localhost/budsys2025_backend/select.php?readPayee")
            .then(function (response) {
                stringOptionsPayee = response.data;
            });
    };

    // view UACS Codes
    //
    const viewUACS = () => {
        axios
            .get("http://localhost/budsys2025_backend/select.php?readUACS")
            .then(function (response) {
                stringOptionsUACS = response.data;
            });
    };

    // view MFOPAP
    const viewMFOPAP = () => {
        axios
            .get("http://localhost/budsys2025_backend/select.php?readMFOPAP")
            .then(function (response) {
                stringOptionsMFOPAP = response.data;
            });
    };
    // =============== Query scripts =============== //

    var stringOptionsPayee = ref([]);
    var stringOptionsUACS = ref([]);
    var stringOptionsMFOPAP = ref([]);
    var stringOptionsSig = ref([]);
    const itemoptionsPayee = ref([stringOptionsPayee]);
    const itemoptionsUACS = ref([stringOptionsUACS]);
    const itemoptionsMFOPAP = ref([stringOptionsMFOPAP]);
    const itemoptionsSig = ref([stringOptionsSig]);

    const selectedPayee = ref("");
    const state = reactive({
        amount: "",
        orstin: "",
        address: "",
        // orsdetails: "",
        signame: "",
        sigposition: "",
    });

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

    const filterFnPrj = (val, update) => {
        if (val === "") {
            update(() => {
                itemoptionsMFOPAP.value = stringOptionsMFOPAP;
            });
            return;
        }

        update(() => {
            const needle = val.toLowerCase();
            itemoptionsMFOPAP.value = stringOptionsMFOPAP.filter(
                (v) => v.label.toLowerCase().indexOf(needle) > -1
            );
        });
    };

    const clearText = () => {
        selectedPayee.value = "";
        state.signame = "";
        state.sigposition = "";
        state.orstin = "";
        state.address = "";

        appendRow.value.forEach((row, index) => {
            row.particstxt = "";
            row.uacstxt = "";
            row.uacsselect = "";
            row.mfotxt = "";
            row.amounttxt = "";
            row.respcentxt = userdiv;
        });
        resetItem();
    };

    // Append row scripts
    const canDelete = (index) => index > 0;
    const canAdd = (index) => index < 19;
    const appendRow = ref([
        {
            particstxt: "",
            uacstxt: "",
            uacsselect: "",
            prjselect: "",
            mfotxt: "",
            amounttxt: "",
            respcentxt: userdiv,
        },
    ]);
    const addNewItem = () => {
        if (appendRow.value.length < 20) {
            appendRow.value.push({
                particstxt: "",
                uacstxt: "",
                uacsselect: "",
                prjselect: "",
                mfotxt: "",
                amounttxt: "",
                respcentxt: userdiv,
            });
        }
    };

    const deleteItem = (index) => {
        if (index !== 0) {
            appendRow.value.splice(index, 1);
        }
    };

    const resetItem = () => {
        appendRow.value = [
            {
                particstxt: "",
                uacstxt: "",
                uacsselect: "",
                prjselect: "",
                mfotxt: "",
                amounttxt: "",
                respcentxt: userdiv,
            },
        ];
    };

    // =============== ADD ORS =============== //
    const addnewORS = async () => {
        try {
            var formData = new FormData();
            formData.append("id", selectedPayee.value.payeeid);
            formData.append("user", username);
            formData.append("division", userdiv);
            formData.append("tin", state.orstin);
            formData.append("address", state.address);
            appendRow.value.forEach((row, index) => {
                formData.append(`partics[${index}]`, row.particstxt);
                formData.append(`uacs[${index}]`, row.uacstxt);
                formData.append(`mfo[${index}]`, row.mfotxt);
                formData.append(`amount[${index}]`, row.amounttxt);
                formData.append(`respcen[${index}]`, row.respcentxt);
            });
            // console.log("Dark Mode:", darkMode?.value);
            swalAddSuccess();
        } catch (error) {
            console.log("Error");
        }
    };
    // =============== ADD ORS =============== //

    // =============== SweetAlert =============== //
    const swalAddSuccess = () => {
        Swal.fire({
            title: "Success!",
            text: "ORS added to database",
            icon: "success",
            confirmButtonText: "Close",
            background: darkMode.value ? "#465965" : "#fff",
            color: darkMode.value ? "#fff" : "#000",
        });
    };
    // =============== SweetAlert =============== //
</script>

<style>
    * {
        font-family: "Poppins", sans-serif;
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
        max-height: 300px !important; /* Adjust to fit ~10 items */
        overflow-y: auto !important; /* Enable vertical scrolling */
    }

    .btn-container {
        display: flex;
        justify-content: center;
        padding-top: 15px;
        padding-bottom: 10px;
    }
</style>
