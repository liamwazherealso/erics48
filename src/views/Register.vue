<template>
    <div class="max-w-screen-sm mx-auto px-4 py-10">
        <!-- Error Handling -->
        <!-- Error div will be conditionally rendered -->
        <div v-if="errorMsg" class="mb-10 p-4 rounded md bg-stone-100 shadow-lg">
            <p class="text-red-500">
                {{ errorMsg }}
            </p>
        </div>

        <!-- Register Form -->
        <form @submit.prevent="register" class="p-8 flex flex-col bg-lightStone rounded-md shadow-lg">
            <h1 class="text-3xl text-darkSky mb-4">Register</h1>
            <!-- Email input -->
            <div class="flex flex-col mb-2">
                <label for="email" class="mb-1 text-sm text-darkSky">Email</label>
                <input 
                    type="text" 
                    required 
                    class="p-2 focus:outline-none" 
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

            <!-- Confirm Password Input -->
            <div class="flex flex-col mb-2">
                <label for="confirmPassword" class="mb-1 text-sm text-darkSky">Confirm Password</label>
                <input 
                    type="password" 
                    required 
                    class="p-2 focus:outline-none" id="confirmPassword" 
                    v-model="confirmPassword"
                >
            </div>
            
            <!-- Registration Submit Button -->
            <button type="submit" class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-lightStone bg-darkSky duration-200 border-solid border-2 border-transparent hover:bg-lightStone hover:text-darkSky hover:border-darkSky">
                Register
            </button>

            <router-link 
                class="text-sm mt-6 text-center" 
                :to="{ name: 'Login' }"
            >
                Already have an account? <span class="text-sky-400 hover:text-lightSky">Login</span>
            </router-link>

        </form>
    </div>
</template>

<script setup>
// Imports
import { ref } from 'vue';
import { supabase } from '../supabase/supabaseClient.js';
import { useRouter } from 'vue-router';

// Data and variables
const router = useRouter();
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const errorMsg = ref(null);

// Register function
const register = async () => {
    // If the password matches the confirmed password
    if (password.value === confirmPassword.value) {
        // Try to sign up the user
        try {
            console.log('Email:', email.value);
            console.log('Password:', password.value);
            console.log('Confirm Password:', confirmPassword.value);

            const { error } = await supabase.auth.signUp({
                email: email.value,
                password: password.value,
            });
            // If supabase presents an error, throw it:
            if (error) throw error;
            // If everything checks out, push the user to the Login page
            router.push({ name: "Login" });
        }
        catch (error) {
            // Assign the value of the supabase error to 'errorMsg' so it can be rendered
            errorMsg.value = error.message;
            setTimeout(() => {
                // Set the error message back to null
                errorMsg.value = null;
            }, 5000);
        }
        return;
    }
    // If the passwords do not match:
    else {
        errorMsg.value = "Error: passwords do not match";
        setTimeout(() => {
            // Set the error message back to null
            errorMsg.value = null;
        }, 5000);
    }
};

</script>