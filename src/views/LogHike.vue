<template>
    <!-- Status & Error Container -->
    <div class="max-w-screen-md mx-auto px4 py-10">
        <!-- Status Message -->
        <div v-if="statusMsg || errorMsg" class="mb-10 p-4 bg-lightStone rounded-mb shadow-lg">
            <p class="text-darkSky">
                {{ statusMsg }}
            </p>
            <p class="text-red-500">{{ errorMsg }}</p>
        </div>

        <!-- Log Form Container -->
        <div class="p-8 flex items-start bg-lightStone rounded-mb shadow-lg">
            <!-- Log Form -->
            <form @submit.prevent="createHike" class="flex flex-col gap-y-5 w-full">

                <h1 class="text-2xl text-darkSky">Log Hike</h1>

                <!-- Mountain Name Input -->
                <div class="flex flex-col">
                    <label for="mountain-name" class="mb-1 text-sm text-darkSky">Mountain Name</label>
                    <!-- Mountain Name Select -->
                    <select 
                        name="mountain-name"
                        class="p-2 focus:outline-none" 
                        id="mountain-name"
                        required
                        v-model="mountainName"
                    >
                        <!-- Mountain Name Options (ordered by elevation) -->
                        <option value="select-mountain">select-mountain</option>
                        <option value="Washington">Mount Washington - 6,288 ft</option>
                        <option value="Adams">Mount Adams - 5,774 ft</option>
                        <option value="Jefferson">Mount Jefferson - 5,712 ft</option>
                        <option value="Monroe">Mount Monroe - 5,384 ft</option>
                        <option value="Madison">Mount Madison - 5,367 ft</option>
                        <option value="Lafayette">Mount Lafayette - 5,260 ft</option>
                        <option value="Lincoln">Mount Lincoln - 5,089 ft</option>
                        <option value="South Twin">South Twin Mountain - 4,902 ft</option>
                        <option value="Carter Dome">Carter Dome - 4,832 ft</option>
                        <option value="Moosilauke">Mount Moosilauke - 4,802 ft</option>
                        <option value="Eisenhower">Mount Eisenhower - 4,780 ft</option>
                        <option value="North Twin">North Twin Mountain - 4,761 ft</option>
                        <option value="Carrigain">Mount Carrigain - 4,700 ft</option>
                        <option value="Bond">Mount Bond - 4,698 ft</option>
                        <option value="Middle Carter">Middle Carter Mountain - 4,610 ft</option>
                        <option value="West Bond">West Bond - 4,540 ft</option>
                        <option value="Garfield">Mount Garfield - 4,500 ft</option>
                        <option value="Liberty">Mount Liberty - 4,459 ft</option>
                        <option value="South Carter">South Carter Mountain - 4,430 ft</option>
                        <option value="Wildcat (A Peak)">Wildcat Mountain (A Peak) - 4,422 ft</option>
                        <option value="Hancock">Mount Hancock - 4,420 ft</option>
                        <option value="South Kinsman">South Kinsman Mountain - 4,358 ft</option>
                        <option value="Field">Mount Field - 4,340 ft</option>
                        <option value="Osceola">Mount Osceola - 4,340 ft</option>
                        <option value="Flume">Mount Flume - 4,328 ft</option>
                        <option value="South Hancock">South Hancock Mountain - 4,319 ft</option>
                        <option value="Pierce">Mount Pierce - 4,310 ft</option>
                        <option value="North Kinsman">North Kinsman Mountain - 4,293 ft</option>
                        <option value="Willey">Mount Willey - 4,285 ft</option>
                        <option value="Bondcliff">Bondcliff - 4,265 ft</option>
                        <option value="Zealand">Mount Zealand - 4,260 ft</option>
                        <option value="North Tripyramid">North Tripyramid - 4,180 ft</option>
                        <option value="Cabot">Mount Cabot - 4,170 ft</option>
                        <option value="East Osceola">East Osceola - 4,156 ft</option>
                        <option value="Middle Tripyramid">Middle Tripyramid - 4,140 ft</option>
                        <option value="Cannon">Cannon Mountain - 4,100 ft</option>
                        <option value="Hale">Mount Hale - 4,054 ft</option>
                        <option value="Jackson">Mount Jackson - 4,4,052 ft</option>
                        <option value="Tom">Mount Tom - 4,051 ft</option>
                        <option value="Wildcat (D Peak)">Wildcat Mountain (D Peak) - 4,050 ft</option>
                        <option value="Moriah">Mount Moriah - 4,049 ft</option>
                        <option value="Passaconaway">Mount Passaconaway - 4,043 ft</option>
                        <option value="Owl's Head">Owl's Head - 4,025 ft</option>
                        <option value="Galehead">Mount Galehead - 4,024 ft</option>
                        <option value="Whiteface">Mount Whiteface - 4,020 ft</option>
                        <option value="Waumbek">Mount Waumbek - 4,006 ft</option>
                        <option value="Isolation">Mount Isolation - 4,004 ft</option>
                        <option value="Tecumseh">Mount Tecumseh - 4,003 ft</option>
                        <!-- End of Mountain Names Options -->
                    </select>
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
                        <option value="select-condition">select-condition</option>
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
                        class="p-2 focus:outline-none text-xl" 
                        id="hike-difficulty"
                        required
                        v-model="hikeDifficulty"
                    >
                        <option value="great">🤗</option>
                        <option value="good">😃</option>
                        <option value="okay">😐</option>
                        <option value="bad">😖</option>
                        <option value="awful">🤬</option>
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
import { uid } from 'uid';
import { supabase } from '@/supabase/supabaseClient';

// Create data
const mountainName = ref('select-mountain');
const trailName = ref(null);
const hikeDate = ref(getCurrentDate());
const hikeDuration = ref('00:00');
const trailConditions = ref('select-condition');
const hikeDifficulty = ref(null);
const hikeReview = ref(null);

const statusMsg = ref(null);
const errorMsg = ref(null);

// getCurrentDate function
function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${month}/${day}/${year}`;
}

// Create hike function
const createHike =  async () => {
    try {
        // Insert data into the 'hikes' table in Supabase
        const { error } = await supabase.from('hikes').insert([
            {
                mountainName: mountainName.value,
                trailName: trailName.value,
                hikeDate: hikeDate.value,
                hikeDuration: hikeDuration.value,
                trailConditions: trailConditions.value,
                hikeDifficulty: hikeDifficulty.value,
                hikeReview: hikeReview.value
            },
        ]);

        // If error is present, send to the catch block
        if (error) throw error;

        // Alert user of success
        statusMsg.value = 'Success: Hike logged!';

        // Reset all variables that sent data to Supabase
        mountainName.value = 'select-mountain';
        trailName.value = null;
        hikeDate.value = getCurrentDate();
        hikeDuration.value = '00:00';
        trailConditions.value = 'select-condition';
        hikeDifficulty.value = null;
        hikeReview.value = null;

        // Timeout
        setTimeout(() => {
            statusMsg.value = null;
        }, 5000);
    }
    catch (error) {
        // Render error message
        errorMsg.value = `Error: ${error.message}`;

        // Timeout
        setTimeout(() => {
            errorMsg.value = null;
        }, 5000);
    }
};

// Reset fields function
// const reset = () => {
//     mountainName.value = 'select-mountain';
//     trailName.value = null;
//     hikeDate.value = new Date().toISOString().split('T')[0];
//     hikeDuration.value = '00:00';
//     trailConditions.value = 'select-condition';
//     hikeDifficulty.value = null;
//     hikeReview.value = null;

//     statusMsg.value = 'Fields reset';

//     setTimeout(() => {
//         statusMsg.value = false;
//     }, 5000);
// };


</script>