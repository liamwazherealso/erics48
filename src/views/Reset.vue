<template>
  <!-- Password Reset Section -->
  <section id="resetSection" class="max-w-screen-lg md:w-1/2 lg:w-1/3 mx-auto px-4 py-20">
        <!-- Reset Form -->
        <form @submit.prevent="reset" class="p-8 flex flex-col bg-lightStone rounded-md shadow-lg">
            <h1 class="text-3xl text-darkSky mb-4">Reset account password</h1>
            <!-- Password Input -->
            <div class="flex flex-col mb-2">
                <label for="password" class="mb-1 text-sm text-darkSky">New password</label>
                <input 
                    type="password" 
                    required 
                    class="p-2 focus:outline-none" 
                    id="password" 
                    v-model="newPassword"
                >
            </div>

            <!-- Confirm Password Input -->
            <div class="flex flex-col mb-2">
                <label for="confirmPassword" class="mb-1 text-sm text-darkSky">Confirm Password</label>
                <input 
                    type="password" 
                    required 
                    class="p-2 focus:outline-none" 
                    id="confirmPassword" 
                    v-model="confirmPassword"
                >
            </div>
            
            <!-- Reset Submit Button -->
            <button type="submit" class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-lightStone bg-darkSky duration-200 border-solid border-2 border-transparent hover:bg-lightStone hover:text-darkSky hover:border-darkSky">
                Reset password
            </button>

            <router-link 
                class="text-sm mt-6 text-center" 
                :to="{ name: 'Login' }"
            >
                Already have an account? <span class="text-sky-400 hover:text-lightSky">Login</span>
            </router-link>

        </form>
    </section>
</template>

<script setup>
    // Imports:
    import { ref } from 'vue';
    import { supabase } from '../supabase/supabaseClient.js';
    import { useRouter } from 'vue-router';
    import { useToast } from 'vue-toastification';

    // Data:
    const newPassword = ref(null);
    const confirmPassword = ref(null);
    const router = useRouter();
    const toast = useToast();

    // Methods:

    // Reset password function
    const reset = async () => {
        // If the new and confirmed passwords match
        if (newPassword.value === confirmPassword.value) {
            try {
                // Ask Supabase to update the user with their new password
                const { data, error } = await supabase.auth.updateUser({
                    password: newPassword.value
                });

                // Alert the user that their password has been changed successfully
                toast.success('Your password has successfully been changed');

                // Inform supabase that the user has logged out
                await supabase.auth.signOut();

                // Push the user to the login page
                router.push({ name: "Login" });

                // If error, throw to the catch block
                if (error) throw error;
            }
            catch (error) {
                // Alert the user of the Supabase error
                toast.error(`Error: ${error.message}`);
            }
            return;
        }
        // If the new and confirmed passwords do not match
        else {
            toast.warning('Error: passwords do not match');
        }
    };
</script>