<template>
    <div class="max-w-screen-sm mx-auto px-4 py-10">
        <!-- Error Handling -->
        <!-- Error div will be conditionally rendered -->
        <div v-if="errorMsg" class="mb-10 p-4 rounded md bg-lightStone shadow-lg">
            <p class="text-red-500">
                {{ errorMsg }}
            </p>
        </div>

        <!-- Login Form -->
        <form 
            @submit.prevent="login" 
            class="mb-84 p-8 flex flex-col bg-stone-100 rounded-md shadow-lg"
        >
            <h1 class="text-3xl text-darkSky mb-4">Login</h1>
            <!-- Email input -->
            <div class="flex flex-col mb-2">
                <label for="email" class="mb-1 text-sm text-darkSky">Email</label>
                <input 
                    type="text" 
                    required 
                    class="p-2 focus:outline-none" id="email" 
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

            <router-link 
                class="text-sm mt-6 text-center" 
                :to="{ name: 'Register' }"
            >
                Don't have an account? <span class="text-darkSky hover:text-lightSky">Register</span>
            </router-link>

        </form>
    </div>
</template>

<script setup>
// Imports
import { ref } from 'vue';
import { supabase } from '../supabase/supabaseClient';
import { useRouter } from 'vue-router';
 
// Data and variables
const router = useRouter();
const email = ref(null);
const password = ref(null);
const errorMsg = ref(null);

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
        // If no error received, push the user to the 'Home' view
        router.push({ name: "Home" });
    }
    catch (error) {
        // Interpolate error into error div 
        errorMsg.value = `Error: ${error.message}`;
        // Clear and remove the rendered error after 5 seconds
        setTimeout(() => {
            errorMsg.value = null;
        }, 5000);
    }
};

</script>