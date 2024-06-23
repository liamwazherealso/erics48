<template>
    <div  v-if="appReady" class="font-Poppins box-border"> 
        <body class="bg-lightSky min-h-screen mt-20 flex flex-col">
            <Navigation class="mb-24"/>
            <router-view />
            <Footer class="mt-auto" />
        </body>
    </div>
</template>

<script setup>
    // Imports:
    import Navigation from '@/components/Navigation.vue';
    import Footer from '@/components/Footer.vue';
    import { ref } from 'vue';
    import { supabase } from './supabase/supabaseClient';
    // Store updates our value, or change in state
    import store from './store/index';

    // Data:
    const appReady = ref(null);

    // Check to see if user is logged in:
    const user = supabase.auth.user;

    // Methods:

    // If user does not exist, need to make the app ready:
    if (!user) {
        appReady.value = true;
    }
    // If user is logged in, this will fire:
    supabase.auth.onAuthStateChange((_, session) => {
        // This will help the app to tailor the content to the specific, supabase confirmed user
        store.methods.setUser(session);
        appReady.value = true;
    });
</script>

<style lang="scss">
    // Google fonts imports
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap");
    @import url("https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap");

    html {
        height: 100%;
    }
</style>