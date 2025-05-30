<template>
    <q-btn @click="editRowModal()" />

    <q-dialog v-model="editORSDetailsModal">
        <q-card-section>
            <q-select v-model="LIBItemsSelect" :options="itemoptionsLIB" label="LIB" />
            <q-select v-model="mfopapSelect" :options="itemoptionsPrj" label="MFO/PAP" />
        </q-card-section>
    </q-dialog>

</template>


<script setup>

    async function editRowModal(item) {
        editORSDetailsModal.value = true
        
        selectedOrsId.value = item.ors_id;
        selectedPrjID.value = item.mfopap;

        try {
            var formData = new FormData();
            formData.append("prjID", selectedPrjID.value);
            const response = await axios.post(
                "http://172.16.10.5/budsys2025_backend/select.php?readLIBItemList", formData
            )
            console.log("Sending prjID:", selectedPrjID.value)
            console.log("LIB response:", response.data)

            console.log("response.data type:", typeof response.data);
            console.log("response.data isArray:", Array.isArray(response.data));

            if (Array.isArray(response.data)) {
                itemoptionsLIB.value = response.data 
            } 
            else {
                console.error("Unexpected response format:", response.data)
                itemoptionsLIB.value = []
            }
        } catch (error) {
            console.error('Failed to fetch LIB items:', error)
        }
    }

</script>