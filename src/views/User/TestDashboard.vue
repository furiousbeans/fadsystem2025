<template>
    <div>
        <h5>Test Dashboard</h5>
    </div>
</template>

<script setup>
    import { onMounted } from "vue";
    import { useRouter } from "vue-router";

    const router = useRouter();

    onMounted(() => {
        document.title = "FAD System | Administrator ";
    });
</script>
