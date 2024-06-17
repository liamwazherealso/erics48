<template>
    <div class="max-w-screen-lg md:w-1/2 lg:w-1/3 mx-auto px-4 py-20">
        <!-- Log Form Container -->
        <div class="w-full p-8 flex items-start bg-lightStone rounded-mb shadow-lg">
            <!-- Log Form -->
            <form @submit.prevent="createHike" class="flex flex-col gap-y-5 w-full">

                <h1 class="text-2xl text-darkSky">Log Hike</h1>

                <!-- Mountain Name Input for Searching -->
                <div>
                    <label for="mountain-name" class="mb-1 text-sm text-darkSky">Mountain Name</label>

                    <Autocomplete :source="peaks" v-model="mountainName" />
                </div>

                <!-- Trail Name Input -->
                <div class="flex flex-col">
                    <label for="trail-name" class="text-sm mb-1 text-darkSky">Trail Name(s)</label>
                    <input 
                        type="text"
                        required
                        class="p-2 focus:outline-none"
                        id="trail-name"
                        placeholder="Enter trail name here"
                        v-model="trailName"
                    />
                </div>

                <!-- Hike Date Input -->
                <div class="flex flex-col">
                    <label for="hike-date" class="text-sm mb-1 text-darkSky">Date of Hike</label>
                    <input 
                        type="date"
                        required
                        class="p-2 focus:outline-none"
                        id="hike-date"
                        value=""
                        v-model="hikeDate"
                    />
                </div>

                <!-- Hike Duration Input -->
                <div class="flex flex-col">
                    <label for="hike-duration" class="text-sm mb-1 text-darkSky">How long did this hike last?</label>
                    <input 
                        type="text"
                        required
                        class="p-2 focus:outline-none"
                        id="hike-duration"
                        pattern="^[0-9]{1,2}:[0-5][0-9]$"
                        value="00:00"
                        v-model="hikeDuration"
                    />
                </div>

                <!-- Trail Condition Select -->
                <div class="flex flex-col">
                    <label for="trail-conditions" class="text-sm mb-1 text-darkSky">Trail Condition</label>
                    <select
                        name="trail-conditions"
                        class="p-2 focus:outline-none" 
                        id="trail-conditions"
                        required
                        v-model="trailConditions"
                    >
                        <option value="" disabled selected>select-condition</option>
                        <option value="snow">Snow Covered Trail</option>
                        <option value="ice">Ice Covered Trail</option>
                        <option value="mud">Mud Covered Trail</option>
                        <option value="leaves">Leaf Covered Trail</option>
                        <option value="wet">Wet Trail</option>
                        <option value="dry">Dry Trail</option>
                        <option value="water">Running or Standing Water</option>
                    </select>
                </div>

                <!-- Hike Difficulty Select -->
                <div class="flex flex-col">
                    <label for="hike-difficulty" class="text-sm mb-1 text-darkSky">Hike Difficulty</label>
                    <select
                        name="hike-difficulty"
                        class="p-2 focus:outline-none text-2xl" 
                        id="hike-difficulty"
                        required
                        v-model="hikeDifficulty"
                    >
                        <option value="" disabled selected>select-difficulty</option>
                        <option value="🤗">🤗</option>
                        <option value="😃">😃</option>
                        <option value="😐">😐</option>
                        <option value="😖">😖</option>
                        <option value="🤬">🤬</option>
                    </select>
                </div>

                <!-- Hike Review Textfield-->
                <div class="flex flex-col">
                    <label for="hike-review" class="text-sm mb-1 text-darkSky">Notes</label>
                    <textarea 
                        type="text"
                        required
                        class="p-2 focus:outline-none"
                        id="hike-review"
                        placeholder="Please include any further thoughts on the hike here"
                        v-model="hikeReview"
                    />
                </div>

                <!-- Submit Button -->
                <button 
                    type="submit" 
                    class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-lightStone bg-sky-400 duration-200 border-solid border-2 border-transparent hover:bg-lightStone hover:text-darkSky hover:border-darkSky"
                >
                Submit Hike Log
                </button>

            </form>
        </div>
    </div>
</template>

<script setup>
// Imports
import { ref } from 'vue';
import { supabase } from '@/supabase/supabaseClient';
import { useToast } from 'vue-toastification';
import peaks from '@/peaks.json';
import Autocomplete from '@/components/Autocomplete.vue';

// Create data
const mountainName = ref(null);
const trailName = ref(null);
const hikeDate = ref(getCurrentDate());
const hikeDuration = ref('00:00');
const trailConditions = ref('select-condition');
const hikeDifficulty = ref(null);
const hikeReview = ref(null);
const username = ref(null);
const uuid = ref(null);
const toast = useToast();

// Status variables
const statusMsg = ref(null);
const errorMsg = ref(null);


// getCurrentDate function
function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${month}/${day}/${year}`;
};

// Create hike function
const createHike =  async () => {
    try {
        // Retrieve username from user metadata
        const { data: { user } } = await supabase.auth.getUser();
            const metadata = user.user_metadata;
            username.value = metadata.username;
            uuid.value = metadata.sub;

        // Insert data into the 'hikes' table in Supabase
        const { error } = await supabase.from('hikes').insert([
            {
                mountainName: mountainName.value,
                trailName: trailName.value,
                hikeDate: hikeDate.value,
                hikeDuration: hikeDuration.value,
                trailConditions: trailConditions.value,
                hikeDifficulty: hikeDifficulty.value,
                hikeReview: hikeReview.value,
                username: username.value,
                uuid: uuid.value
            },
        ]);

        // If error is present, send to the catch block
        if (error) throw error;

        // Alert user of success
        toast.success('Hike logged!');

        // Reset all variables that sent data to Supabase
        mountainName.value = 'select-mountain';
        trailName.value = null;
        hikeDate.value = getCurrentDate();
        hikeDuration.value = '00:00';
        trailConditions.value = 'select-condition';
        hikeDifficulty.value = null;
        hikeReview.value = null;
        username.value = null;

    }
    catch (error) {
        // Render error message
        toast.error(`Error: ${error.message}`);
    }
};

</script>