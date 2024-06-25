<template>
    <div v-if="dataLoaded" id="home" class="container mx-auto px-4 py-20 max-w-screen-lg md:w-1/2 lg:w-1/3">
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
        <!-- Hike Cards -->
        <div v-else class="flex flex-col items-center">
            <!-- Logged Hikes Static Title -->
            <div class="fixed top-16 w-full md:w-1/2 bg-lightStone py-8 rounded-md border-b-4 border-darkSky z-10">
                <h1 class="mt-8 mb-2 text-center text-4xl text-darkSky">Logged Hikes:</h1>
            </div>
            <div class="mt-24 w-full space-y-20 overflow-y-auto">
                <!-- Individual Hike Cards -->
                <router-link 
                    class="flex flex-col items-center bg-lightStone py-10 px-20 my-10 shadow-md rounded-md cursor-pointer border-b-4 border-darkSky transition transform hover:scale-95 duration-300"
                    :to="{ name: 'View-Hike', params: { hikeId: hike.id } }"
                    v-for="(hike, index) in data"
                    :key="index"
                >
                    <!-- Mountain Image -->
                    <img 
                        src="@/assets/images/icons/mountain-icon.png" 
                        alt="mountain-icon"
                        class="h-24 w-auto"
                    />
                    <!-- Mountain name -->
                    <p 
                        class="mt-6 py-1 px-3 text-white bg-darkSky shadow-md rounded-lg"
                    >
                        {{ hike.mountainName }}
                    </p>
                    <!-- Date hiked -->
                    <h1 class="mt-8 mb-2 text-center text-xl text-darkSky">
                        {{ hike.hikeDate }}
                    </h1>
                    <!-- Hike creator -->
                    <h1 class="flex items-center gap-x-2 mt-8 mb-2 text-xl text-yellow-400">
                        <i class="fa-regular fa-user fa-lg" style="color: #FFD43B;"></i>
                        {{ hike.username }}
                    </h1>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
    // Imports:
    import { ref, onMounted } from 'vue';
    import { supabase } from '@/supabase/supabaseClient';
    import { useToast } from 'vue-toastification';

    // Data:
    const data = ref([]);
    const dataLoaded = ref(false);
    const toast = useToast();
    const page = ref(1);
    const limit = 10; // Number of hikes to fetch per page

    // Methods:
    // Get data function
    const getData = async () => {
        // Try to contact supabase for hikes data
        try {
            // Await hikes data
            const { data: hikes, error } = await supabase
                .from('hikes')
                .select('*')
                .range((page.value - 1) * limit, page.value * limit - 1);
            // If an error is received from supabase, throw to the catch block:
            if (error) throw error;
            // Append the selected data to existing hikes data
            data.value = [...data.value, ...hikes];
            // Update the value of 'dataLoaded' to true
            dataLoaded.value = true;
        }
        // If an error is received, warn the user
        catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    // Run data function
    getData();

    // Infinite scroll handler
    const handleScroll = () => {
        const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
            page.value++;
            getData();
        }
    };

    // Listen for the scroll event as soon as the component is mounted
    onMounted(() => {
        window.addEventListener('scroll', handleScroll);
    });
</script>