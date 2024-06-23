<template>
    <!-- Mountain Name Search Input -->
    <div class="dropdown flex flex-col">
        <!-- ':value="modelValue"' will bind the value entered into the input into a prop -->
        <input 
            type="text"
            required
            class="p-2 focus:outline-none"
            id="mountain-name"
            placeholder="Search..."
            :value="modelValue"     
            @input="handleInput"
        >

        <!-- Dropdown List -->
        <div class="mt-4 p-2 bg-white" v-show="searchResults.length && isOpen">
            <ul class="dropdown-list focus:outline:none">
                <!-- Show filtered options -->
                <li
                    class="hover:bg-gray-100 transition-colors cursor-pointer border-gray-500"
                    v-for="result in searchResults"
                    :key="result.mountain"
                    @click="setSelected(result.mountain)"
                >
                    {{ result.mountain }} - {{ result.elevation }}
                </li>
            </ul>
        </div>
        
    </div>
</template>


<script setup>
    // Imports:
    import { computed, ref, } from 'vue';

    // Props & data:

    // Prop definition (peaks array imported on 'Loghike and Viewhike')
    const props = defineProps({
        source: {
            type: Array,
            required: true,
            default: () => []
        },
        
        modelValue: String // Prop defined for value of input
    });

    // Method defined to emit modelValue update event
    const emit = defineEmits(['update:modelValue']);


    // Reactive variables defined
    const search = ref(''); // Variable to store search query
    const isOpen = ref(false); // Variable to track whether dropdown will render

    // Methods:

    // Computed property to filter search results based on input value
    const searchResults = computed(() => {
        if (search.value === '') {
            return [];
        }

        
        return props.source.filter((item) => {
            // Items are filtered based on whether mountain name includes search query
            if (item.mountain.toLowerCase().includes(search.value.toLowerCase())) {
                return item;
            }
        })
    });

    
    // Method to set selected item and emit event
    const setSelected = (item) => {
        isOpen.value = false; // Close the dropdown

        search.value = item; // Set the search query to the selected item

        emit('update:modelValue', search.value); // Emit selected search item to parent components
    };

    // Method to handle input changes
    const handleInput = (event) => {
        isOpen.value = true; // Open the dropdown

        search.value = event.target.value; // Update search query with input value
        emit('update:modelValue', search.value); // Emit event to update parent components
    };

</script>