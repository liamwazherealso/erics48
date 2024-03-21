<template>
    <!-- Navbar copntainer -->
    <header class="bg-lightBrown text-white fixed top-0 left-0 w-full z-10">
        <!-- Navbar -->
        <nav class="container py-5 px-4 flex flex-col gap-4 justify-between items-center sm:flex-row">
            <!-- Site name and image -->
            <div class="flex items-center gap-x-4">
                <img src="../assets/images/hiker.png" alt="Hiker Image" class="w-14">
                <h1 class="text-xl font-ProtestRiot">Eric's 48</h1>
            </div>
            <!-- Navbar Links -->
            <ul class="flex flex-1 justify-end gap-x-10">
                <router-link class="hover:text-beige cursor-pointer" :to="{ name: 'Home' }">
                    Home
                </router-link>
                <router-link v-if="user" class="hover:text-beige cursor-pointer" :to="{ name: 'LogHike' }">
                    Log Hike
                </router-link>
                <router-link v-if="!user" class="hover:text-beige cursor-pointer" :to="{ name: 'Login' }">
                    Login
                </router-link>
                <li v-if="user" @click="logout" class="hover:text-beige cursor-pointer">Logout</li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
    // Imports
    import { computed } from 'vue';
    import { supabase } from "@/supabase/supabaseClient";
    import { useRouter } from 'vue-router';
    import store from '../store/index';

    // Get user from store
    const user = computed(() => store.state.user);

    // Setup ref to router
    const router = useRouter();

    // Logout function
    const logout = async () => {
        // Inform supabase that the user has logged out
        await supabase.auth.signOut();
        console.log('User is logged out');
        // Push the user back to the home page
        router.push({ name: "Home" });
    };

</script>