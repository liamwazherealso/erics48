<template>
    <div class="max-w-screen-sm mx-auto mb-36 px-4 py-20">
        <!-- Login Form -->
        <form 
            @submit.prevent="login" 
            class="mb-2 p-8 flex flex-col bg-stone-100 w-96 rounded-md shadow-lg"
        >
            <h1 class="text-3xl text-darkSky mb-4">Login</h1>
            <!-- Email input -->
            <div class="flex flex-col mb-2">
                <label for="email" class="mb-1 text-sm text-darkSky">Email</label>
                <input 
                    type="text" 
                    required 
                    class="p-2 focus:outline-none"
                    name="email"
                    autocomplete="email"
                    id="email"
                    v-model="email"
                >
            </div>
            <!-- Password Input -->
            <div class="flex flex-col mb-2">
                <label for="password" class="mb-1 text-sm text-darkSky">Password</label>
                <input 
                    type="password" 
                    required 
                    class="p-2 focus:outline-none"
                    id="password"
                    v-model="password"
                >
            </div>
            
            <!-- Login Submit Button -->
            <button type="submit" class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-lightStone bg-sky-400 duration-200 border-solid border-2 border-transparent hover:bg-lightStone hover:text-darkSky hover:border-darkSky">
                Login
            </button>

            <!-- Router link for registration -->
            <router-link 
                class="text-sm mt-6 text-center" 
                :to="{ name: 'Register' }"
            >
                Don't have an account? <span class="text-darkSky hover:text-lightSky">Register</span>
            </router-link>

            <!-- Text to open password recovery input -->
            <p @click="openPassDiv" class="text-sm mt-2 text-center hover:cursor-pointer">
                Having trouble signing in? <span class="text-darkSky hover:text-lightSky">Click here</span>
            </p>
        </form>
    </div>

    <!-- Password Recovery  -->
    <div v-if="passDiv" class="max-w-screen-sm mx-auto px-4 py-10">

        <!-- Password recovery form -->
        <form 
            @submit.prevent="recover"
            class="mb-84 p-8 flex flex-col bg-stone-100 rounded-md shadow-lg"
        >

        <h1 class="text-2xl text-darkSky mb-4">Password Recovery</h1>

        <!-- Recovery email input -->
        <label for="email" class="mb-1 text-sm text-darkSky">Email</label>
        <input 
                type="text" 
                required 
                class="p-2 focus:outline-none" id="email" 
                v-model="recoveryEmail"
        >

        <!-- Submit email button -->
        <button type="submit" class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-lightStone bg-sky-400 duration-200 border-solid border-2 border-transparent hover:bg-lightStone hover:text-darkSky hover:border-darkSky">
            Send Recovery Email
        </button>
        </form>
    </div>
</template>

<script setup>
// Imports
import { ref } from 'vue';
import { supabase } from '../supabase/supabaseClient';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
 
// Data and variables
const router = useRouter();
const email = ref(null);
const password = ref(null);
const passDiv = ref(false);
const recoveryEmail = ref(null);
const toast = useToast();

// Login function
const login = async () => {
    // Try to sign in the user
    try {
        const { error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value,
        });

        // If an error is detected, this condition will throw the user into the catch block
        if (error) throw error;

        console.log('User is logged in');

        // Alert user to succesful login
        toast.info('You have successfully logged in');

        // If no error received, push the user to the 'Home' view
        router.push({ name: "Home" });        
    }
    catch (error) {
        // Interpolate error into Vue toast
        toast.error(`Error: ${error.message}`);
    }
};

// Open password recovery function
const openPassDiv = () => {
    passDiv.value = true;
};

// Send password recovery email function
const recover = async () => {
    try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(recoveryEmail.value, {
            redirectTo: 'https://erics48.vercel.app/reset',
        });
        // If an error is detected, this condition will throw the user into the catch block
        if (error) throw error;
        // Alert user of success
        toast.info('Check your email for the password recovery link');
    }
    catch (error) {
        // Alert user of Supabase error
        toast.error(`Error: ${error,message}`);
    }
};
</script>

<style scoped>

</style>  