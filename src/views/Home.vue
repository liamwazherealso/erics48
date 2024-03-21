<template>
    <div v-if="dataLoaded" id="home" class="container mt-10 px-4">
        <!-- No data div -->
        <div v-if="data.length === 0" class="w-full flex flex-col items-center">
            <h1 class="text-2xl">Looks empty here...</h1>
            <router-link
                class="mt-6 py-2 px-6 rounded-sm text-sm text-lightStone bg-sky-400 duration-200 border-solid border-2 border-transparent hover:bg-lightStone hover:text-darkSky hover:border-darkSky"
                :to="{ name: 'LogHike' }"
            >
                Log Hike
            </router-link>
        </div>

        <!-- Data Card -->
        <div v-else class="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <router-link 
                class="flex flex-col items-center bg-lightStone p-8 shadow-md cursor-pointer"
                :to="{ name: 'View-Hike', params: { hikeId: hike.id }  }"
                v-for="(hike, index) in data"
                :key="index"
            >
            <!-- Hike Image -->
            <img 
                src="@/assets/images/mountain-icon.png" 
                alt="mountain-icon"
                class="h-24 w-auto"
            />

            <p 
                class="mt-6 py-1 px-3 text-xs text-white bg-darkSky shadow-md rounded-lg"
            >
                {{ hike.mountainName }}
            </p>

            <h1 class="mt-8 mb-2 text-center text-xl text-darkSky">
                {{ hike.hikeDate }}
            </h1>

            </router-link>
        </div>

    </div>
</template>

<script setup>
    // Imports
    import { ref } from 'vue';
    import { supabase } from '@/supabase/supabaseClient';

    // Create data
    const data = ref([]);
    const dataLoaded = ref(null);

    // Get data
    const getData = async () => {
        // Try to contact supabase for hikes data
        try {
            const { data: hikes, error } = await supabase.from('hikes').select('*');

            // If an error is received from supabase, throw it:
            if (error) throw error;

            // Assign the value of 'data' to the data response received
            data.value = hikes;

            // Update the value of 'dataLoaded' to true
            dataLoaded.value = true; 

        }

        // If an error is received, warn the user
        catch (error) {
            console.warn(error.message);
        }
    };

    // Run data function
    getData();

</script>

<style scoped>

</style>