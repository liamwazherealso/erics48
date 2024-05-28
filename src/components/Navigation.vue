<template>
    <!-- Navbar copntainer -->
    <header class="bg-lightBrown text-white fixed top-0 left-0 w-full z-10">
        <!-- Navbar -->
        <nav class="container py-5 px-4 flex flex-col gap-4 justify-between items-center sm:flex-row">
            <!-- Site name and image -->
            <div class="flex items-center gap-x-4">
                <!-- Router link to Home page -->
                <router-link class="hover:bg-reallyLightBrown cursor-pointer rounded-full border-2 border-white hover:border-transparent" :to="{ name: 'Home' }">
                    <img src="../assets/images/hiker.png" alt="Hiker Image" class="w-14 hover:border-white">
                </router-link>
                <h1 class="text-2xl font-ProtestRiot">Eric's 48</h1>
            </div>
            <!-- Navbar Links -->
            <ul class="flex flex-1 justify-end gap-x-10">
                <!-- Router link to LogHike page  if user is logged in-->
                <router-link v-if="user" class="hover:text-beige cursor-pointer" :to="{ name: 'LogHike' }">
                    Log Hike
                </router-link>
                <!-- Router link to About page -->
                <router-link class="hover:text-beige cursor-pointer" :to="{ name: 'About' }">
                    About
                </router-link>
                <!-- Router link to log in if user is not logged in -->
                <router-link v-if="!user" class="hover:text-beige cursor-pointer" :to="{ name: 'Login' }">
                    Login
                </router-link>
                <!-- User icon and username if user is logged in -->
                <li v-if="user" class="flex items-center gap-x-2">
                    <i class="fa-regular fa-user fa-lg" style="color: #ffffff;"></i>
                    {{ userName }}
                </li>
                <!-- Logout button if user is logged in -->
                <li v-if="user" @click="logout" class="hover:text-beige cursor-pointer">
                    Logout
                </li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
    // Imports
    import { ref, computed } from 'vue';
    import { supabase } from "@/supabase/supabaseClient";
    import { useRouter } from 'vue-router';
    import store from '../store/index';

    // Variables
    const userName = ref(null);

    // Get user from store
    const user = computed(() => store.state.user);

    // Get username function
    const getUsername = async () => {
        try {
            // Check to see if user is logged in
            if (user.value) {
                // Access the user object metdata from supabase to gain username
                const { data: { user, error } } = await supabase.auth.getUser();
                // If Supabase returns an error, throw to the catch block
                if (error) throw error; 

                const metadata = user.user_metadata;
                // Assign value of username to userName
                userName.value = metadata.username;
            }
        }
        catch (error) {
            // Alert user of error
            console.warn(error.message);
        }
    };

    // When the user session changes, get the username
    supabase.auth.onAuthStateChange((_, session) => {
        getUsername();
    });


    // Setup ref to router
    const router = useRouter();

    // Logout function
    const logout = async () => {
        // Inform supabase that the user has logged out
        await supabase.auth.signOut();
        console.log('User is logged out');

        // Alert the user of a successful logout
        alert('You account has been logged out');

        // Set the value of userName back to null
        userName.value = null;

        // Push the user back to the home page
        router.push({ name: "Home" });
    };
</script>