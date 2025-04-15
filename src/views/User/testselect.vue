<template>
    <div class="q-pa-md" v-if="showTable" id="orsForm">
        <q-card class="my-card" flat style="border-radius: 20px">
            <q-card-section horizontal>
                <q-card-section class="col" style="padding: 45px">
                    <q-card flat>
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

                            <!-- Project dropdown -->
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
                                    @update:model-value="updateParticulars"
                                    label="MFO/PAP"
                                    map-options
                                    required
                                >
                                    <!-- @update:model-value="updateParticulars" -->
                                    <template v-slot:label>
                                        Project
                                        <span style="font-size: 12px">(*)</span>
                                    </template>
                                    <template v-slot:no-option>
                                        <q-item>
                                            <q-item-section class="text-grey">
                                                No results
                                            </q-item-section>
                                        </q-item>
                                    </template>
                                </q-select>
                            </div>

                            <!-- MFOPAP -->
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
                                        <span style="font-size: 12px">(*)</span>
                                    </template>
                                    <template v-slot:no-option>
                                        <q-item>
                                            <q-item-section class="text-grey">
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
                                        <span style="font-size: 12px">(*)</span>
                                    </template>
                                </q-input>
                            </div>

                            <!-- <q-input
                                :name="`data[${index}]uacs`"
                                id="uacstxtxtxt"
                                label="UACS"
                                required
                                v-model="row.uacstxt"
                            ></q-input>
                            <q-input
                                :name="`data[${index}]mfo`"
                                id="mfotxtxtxt"
                                label="MFO"
                                required
                                v-model="row.mfotxt"
                            ></q-input> -->

                            <div class="q-pa-sm col-1">
                                <q-btn
                                    v-if="index === 0"
                                    @click="addNewItem()"
                                    padding="5px 5px"
                                    :color="
                                        $q.dark.isActive ? 'blue-4' : 'primary'
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
                                        $q.dark.isActive ? 'pink-7' : 'negative'
                                    "
                                    icon="delete"
                                    style="float: right"
                                >
                                    <q-tooltip> Delete Row </q-tooltip>
                                </q-btn>
                            </div>

                            <!-- 2nd input row -->

                            <div class="row full-width">
                                <div class="q-pa-sm col-4">
                                    <q-select
                                        abel="Particulars"
                                        v-model="row.particularselect"
                                        :name="`data[${index}]particularselect`"
                                        :options="itemoptionsParticulars"
                                        :disable="!row.projectselect"
                                    >
                                    </q-select>
                                </div>
                                <div class="q-pa-sm col-8">
                                    <q-input
                                        :name="`data[${index}]prj`"
                                        label="Additional Info"
                                        v-model="row.extraField2"
                                    ></q-input>
                                </div>
                            </div>
                        </div>
                    </q-card>
                </q-card-section>
            </q-card-section>
        </q-card>
    </div>

    <div class="game-container">
        <h1>Tic-Tac-Toe</h1>
        <div class="board">
            <button
                v-for="(cell, index) in board"
                :key="index"
                @click="makeMove(index)"
                :disabled="cell !== ''"
            >
                {{ cell }}
            </button>
        </div>
        <p v-if="winner" class="winner">{{ winner }} wins!</p>
        <p v-if="!winner && board.every((cell) => cell !== '')" class="draw">
            It's a draw!
        </p>
        <button @click="resetGame" class="reset">Restart</button>
    </div>
</template>

<!--  -->

<script setup>
    import { ref, onMounted, reactive } from "vue";
    import { useQuasar } from "quasar";
    import axios from "axios";
    const $q = useQuasar();

    onMounted(() => {
        document.title = "FAD System | Dashboard";
        viewProject();
        viewUACS();
        // viewMFOPAP();
    });

    const userdiv = localStorage.getItem("userdiv");

    // Show Database
    const showTable = ref("true");

    // ==================== BACKEND QUERIES ==================== //

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

    // view MFOPAP
    // const viewMFOPAP = () => {
    //     axios
    //         .get("http://localhost/budsys2025_backend/select.php?readMFOPAP")
    //         .then(function (response) {
    //             stringOptionsMFOPAP = response.data;
    //         });
    // };

    var stringOptionsProject = ref([]);
    var stringOptionsUACS = ref([]);
    var stringOptionsMFOPAP = ref([]);
    var stringOptionsParticulars = ref([]);
    const itemoptionsUACS = ref([stringOptionsUACS]);
    const itemoptionsMFOPAP = ref([stringOptionsMFOPAP]);
    const itemoptionsProject = ref([stringOptionsProject]);
    const itemoptionsParticulars = ref([stringOptionsParticulars]);

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

    const filterFnMFOPAP = (val, update) => {
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

    const updateParticulars = async (selectedProject) => {
        appendRow.value.particularselect = null; // Reset particulars when project changes

        if (!selectedProject) {
            itemoptionsParticulars.value = [];
            return;
        }

        try {
            const response = await axios.get(
                `http://localhost/budsys2025_backend/select.php?readParticulars&project=${selectedProject}`
            );
            itemoptionsParticulars.value = response.data;
        } catch (error) {
            console.error("Error fetching particulars:", error);
            itemoptionsParticulars.value = [];
        }
    };

    // ==================== ADD DELETE ROWS ==================== //
    // Add row
    const appendRow = ref([
        {
            particstxt: "",
            uacstxt: "",
            uacsselect: "",
            mfopapselect: "",
            projectselect: "",
            particularselect: "",
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
                mfopapselect: "",
                particularselect: "",
                projectselect: "",
                mfotxt: "",
                amounttxt: "",
                respcentxt: userdiv,
            });
        }
    };
    // Delete row
    const canDelete = (index) => index > 0;
    const deleteItem = (index) => {
        if (index !== 0) {
            appendRow.value.splice(index, 1);
        }
    };

    const board = ref(Array(9).fill(""));
    const currentPlayer = ref("X");
    const winner = ref(null);

    const checkWinner = () => {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const [a, b, c] of winningCombos) {
            if (
                board.value[a] &&
                board.value[a] === board.value[b] &&
                board.value[a] === board.value[c]
            ) {
                winner.value = board.value[a];
                return;
            }
        }
    };

    const makeMove = (index) => {
        if (!board.value[index] && !winner.value) {
            board.value[index] = currentPlayer.value;
            checkWinner();
            if (!winner.value) {
                currentPlayer.value = currentPlayer.value === "X" ? "O" : "X";
            }
        }
    };

    const resetGame = () => {
        board.value = Array(9).fill("");
        currentPlayer.value = "X";
        winner.value = null;
    };
</script>

<style scoped>
    .game-container {
        text-align: center;
        font-family: Arial, sans-serif;
    }

    .board {
        display: grid;
        grid-template-columns: repeat(3, 100px);
        gap: 5px;
        justify-content: center;
    }

    button {
        width: 100px;
        height: 100px;
        font-size: 2rem;
        border: 2px solid #000;
        background: #fff;
        cursor: pointer;
    }

    button:disabled {
        cursor: not-allowed;
    }

    .winner,
    .draw {
        font-size: 1.5rem;
        margin-top: 10px;
    }

    .reset {
        margin-top: 10px;
        padding: 10px 20px;
        font-size: 1rem;
    }
</style>
