<template>
    <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- App error and status Msg -->
    <div
      v-if="statusMsg || errorMsg"
      class="mb-10 p-4 rounded-md shadow-md bg-lightStone"
    >
      <p class="text-successGreen">
        {{ statusMsg }}
      </p>
      <p class="text-errorRed">
        {{ errorMsg }}
      </p>
    </div>

    <div v-if="dataLoaded">
      <!-- General Hike Info Card -->
      <div
        class="flex flex-col items-center p-8 rounded-md shadow-md 
      bg-lightStone relative"
      >
        <!-- We're only rendering the following icon if the user is logged in and uuid matchest uuid for hike-->
        <div v-if="user" class="flex absolute left-2 top-2 gap-x-2">
          <!-- Edit Hike Button -->
          <div
            v-if="match"
            class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer
        bg-darkSky shadow-lg"
            @click="editMode"
          >
            <i class="fa-solid fa-pencil fa-sm" style="color: #ffffff;"></i>
          </div>

          <!-- Delete hike button  -->
          <div
            v-if="match"
            @click="deleteHike"
            class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer
            bg-darkSky shadow-lg"
          >
            <i class="fa-solid fa-trash-can fa-sm" style="color: #ffffff;"></i>
          </div>
        </div>

        <!-- Mountain image -->
        <img
          class="h-24 w-auto"
          src="@/assets/images/icons/mountain-icon.png"
          alt="mountain"
        />

        <!-- Mountain name and edit mode input -->
        <div class="w-full mt-6">
          <label for="mountain-name" class="mb-1 text-sm text-darkSky" v-if="edit">
            Edit Mountain Name
          </label>

          <Autocomplete v-if="edit" :source="peaks" v-model="data.mountainName" />

          <!-- If edit mode has not been clicked -->
          <h1 v-else class="text-darkSky text-2xl text-center">
            {{ data.mountainName }}
          </h1>
        </div>
      </div>

      <!-- Additional Hike Info -->
      <div class="mt-10 p-8 rounded-md flex flex-col flex-wrap item-center
      bg-lightStone shadow-md"
      >

            <!-- Trail name container and label -->
            <div class="flex flex-1 flex-col">
              <label for="trail-name" class="mb-1 text-sm text-darkSky">
                Trail Name
              </label>

              <!-- Trail name input if edit mode is toggled -->
              <input 
                v-if="edit"
                type="text"
                required
                class="p-2 w-full focus:outline-none"
                id="trail-name"
                placeholder="Enter trail name here"
                v-model="data.trailName"
                />

                <!-- Trail name data if edit mode is not toggled -->
              <p v-else>{{ data.trailName }}</p>

            </div>

            <!-- Hike date container and label -->
            <div class="flex flex-1 flex-col">
              <label for="hike-date" class="mb-1 text-sm text-darkSky">
                Date of Hike
              </label>

              <!-- Hike date input if edit mode is toggled -->
              <input 
                v-if="edit"
                type="date"
                required
                class="p-2 focus:outline-none"
                id="hike-date"
                value=""
                v-model="data.hikeDate"
                />

              <!-- Hike date data if edit mode is not toggled -->
              <p v-else>{{ data.hikeDate }}</p>

            </div>
            
            <!-- Hike duration container and label -->
            <div class="flex flex-1 flex-col">
              <label for="hike-duration-edit" class="mb-1 text-sm text-darkSky">
                Hike Duration
              </label>

              <!-- Hike duration input if edit mode is toggled -->
              <input
                v-if="edit"
                type="text"
                required
                id="hike-duration"
                pattern="^[0-9]{1,2}:[0-5][0-9]$"
                value="00:00"
                class="p-2 w-full focus:outline-none"
                v-model="data.hikeDuration"
              />

              <!-- Hike duration data if edit mode not toggled -->
              <p v-else>{{ data.hikeDuration }}</p>

            </div>

            <!-- Trail condition container and label -->
            <div class="flex flex1 flex-col">
                <label for="trail-conditions-edit" class="mb-1 text-sm text-darkSky">
                 Trail Conditions
                </label>

                <!-- Trail conditions select if edit mode is toggled -->
                <select
                    v-if="edit"
                    name="trail-conditions"
                    class="p-2 w-full focus:outline-none" 
                    id="trail-conditions"
                    required
                    v-model="data.trailConditions"
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

                <!-- Trail conditions if edit mode not toggled -->
                <p v-else>{{ data.trailConditions }}</p>

            </div>

            <!-- Hike difficulty container and label -->
            <div class="flex flex1 flex-col">
                <label for="hike-difficulty-edit" class="mb-1 text-sm text-darkSky">
                    Hike Difficulty 
                </label>

                <!-- Hike Difficulty select if edit mode is toggled -->
                <select
                    v-if="edit"
                    name="hike-difficulty"
                    class="p-2 w-full focus:outline-none" 
                    id="hike-difficulty"
                    required
                    v-model="data.hikeDifficulty"
                >
                    <option value="great">🤗</option>
                    <option value="good">😃</option>
                    <option value="okay">😐</option>
                    <option value="bad">😖</option>
                    <option value="awful">🤬</option>
                </select>

                <!-- Hike difficulty data if edit mode not toggled -->
                <p v-else>{{ data.hikeDifficulty }}</p>

            </div>

            <!-- Hike review container and label -->
            <div class="flex flex-1 flex-col">
              <label for="hike-review-edit" class="mb-1 text-sm text-darkSky">
                Hike Review
              </label>

              <!-- Hike review text area if edit mode is toggled -->
              <textarea 
                    v-if="edit"
                    type="text"
                    required
                    class="p-2 w-full focus:outline-none"
                    id="hike-review"
                    placeholder="Please include any further thoughts on the hike here"
                    v-model="data.hikeReview"
              />

              <!-- Hike review data if edit mode not toggled -->
              <p v-else>{{ data.hikeReview }}</p>

            </div>

        <!-- Update button -->
        <button
          v-if="edit"
          @click="update"
          type="button"
          class="mt-10 py-2 px-6 rounded-sm self-start text-sm        text-white
          bg-darkSky duration-200 border-solid border-2 border-transparent
          hover:border-darkSky hover:bg-white hover:text-darkSky"
        >
          Update Hike
        </button>

      </div>

    </div>
  </div>
</template>

<script setup>
    // Imports
    import { ref, computed } from 'vue';
    import { supabase } from '@/supabase/supabaseClient';
    import { useRoute, useRouter } from 'vue-router';
    import store from '../store/index';
    import peaks from '@/peaks.json';
    import Autocomplete from '@/components/Autocomplete.vue';


    // Create data
    const data = ref(null);
    const dataLoaded = ref(null);
    const errorMsg = ref(null);
    const statusMsg = ref(null);
    const route = useRoute();
    const router = useRouter();
    const uuid = ref(null);
    const match = ref(false);

    // Get current id of route
    const currentId = route.params.hikeId; // This param was defined in our router

    // Check to see if user is logged in
    const user = store.state.user;

    // Get hike data
    const getData = async () => {
        // Try to contact supabase for hikes data
        try {
            const { data: hikes, error } = await supabase
                .from('hikes')
                .select('*')
                .eq('id', currentId);

            if (user) {
              // Retrieve username from user metadata
              const { data: { user } } = await supabase.auth.getUser();
              const metadata = user.user_metadata;
              uuid.value = metadata.sub;
            }
            

            // If an error is received from supabase, throw it:
            if (error) throw error;

            // Assign the value of 'data' to the data response received
            data.value = hikes[0]; // This valued is returned from the database as an array

            if (data.value.uuid == uuid.value) {
              match.value = true;
            }

            // Update the value of 'dataLoaded' to true
            dataLoaded.value = true; 

        }

        // If an error is received, handle the error
        catch (error) {
            // Assign the value of the error message to errorMsg.value
            errorMsg.value = error.message;

            // Remove the rendered error after 5 seconds
            setTimeout(() => {
                errorMsg.value = null;
            }, 5000);
        }
    };

    // Call the getData function
    getData();

    // Delete hike
    const deleteHike = async () => {
        // Indicate to supabase that we want to delete this workout that corresponds to this specific id
        try {
          // Display a confirmation dialog
          const confirmed = window.confirm('Are you sure you want to delete this hike?');

          if (confirmed) {
            // Destructure the response from supabase, and catch the error if there is one
            const { error } = await supabase
                .from('hikes')
                .delete()
                .eq('id', currentId);

            // If there's an error, throw the user to the catch block
            if (error) throw error;

            // Alert the user that their hike has been deleted
            alert('Your hike has been deleted');

            // Push the user back to the 'Home' route
            router.push({ name: "Home" });
          }
            
        }
        catch (error) {
            // Assign the value of error.msg to errorMsg
            errorMsg.value = `Error: ${error.msg}`;

            // Timeout the error message
            setTimeout(() => {
                errorMsg.value = null;
            }, 5000);
        }
    };

    // Edit mode
    const edit = ref(false);

    const editMode = () => {
        // This will alow the user to toggle edit mode
          edit.value = !edit.value;
    };
    
    // Update hike
    const update = async () => {
      // Indicate to supabase that you want to update the hike that matches the current id
      try {
        // Destructure the response from supabase. Catch the error if one is present
        const { error } = await supabase
          .from('hikes')
          .update({
            mountainName: data.value.mountainName,
            trailName: data.value.trailName,
            hikeDate: data.value.hikeDate,
            hikeDuration: data.value.hikeDuration,
            trailConditions: data.value.trailConditions,
            hikeDifficulty: data.value.hikeDifficulty,
            hikeReview: data.value.hikeReview,
          })
          .eq('id', currentId);

          // If there's an error, throw to the catch block
          if (error) throw error;

          // Detoggle edit mode
          edit.value = false;

          // Post a status message
          statusMsg.value = "Success: Hike Updated!";

          // Remove status message after 5 seconds
          setTimeout(() => {
            statusMsg.value = null;
          }, 5000);
      }

      // Error catching
      catch (error) {
        // Post the error message from supabase
        errorMsg.value = `Error: ${error.message}`;

        // Remove error message after 5 seconds
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
    };
</script>