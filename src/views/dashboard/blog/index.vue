<script>
import Layout from "@/layouts/main.vue";
import PageHeader from "@/components/page-header";
import Visiters from "./visiters.vue";
// import Comments from "./comments.vue";

export default {
    components: {
        Layout,
        PageHeader,
        Visiters,
        // Comments
    }
}
</script>

<template>
    <Layout>
        <PageHeader title="Blog" pageTitle="Dashboards" />

        <BRow>
            <Visiters/>
            <!-- <Comments/> -->
        </BRow>

    </Layout>
</template>