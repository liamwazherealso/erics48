<template>
    <!-- Mountain Name Input for Searching-->
    <div class="dropdown flex flex-col">
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

    const props = defineProps({
        source: {
            type: Array,
            required: true,
            default: () => []
        },
        
        modelValue: String
    });

    const emit = defineEmits(['update:modelValue']);

    const search = ref('');

    const searchResults = computed(() => {
        if (search.value === '') {
            return [];
        }

        return props.source.filter((item) => {
            if (item.mountain.toLowerCase().includes(search.value.toLowerCase())) {
                return item;
            }
        })
    });

    const isOpen = ref(false);

    const setSelected = (item) => {
        isOpen.value = false;

        search.value = item;

        emit('update:modelValue', search.value);
    };

    const handleInput = (event) => {
        isOpen.value = true;

        search.value = event.target.value;
        emit('update:modelValue', search.value);
    };

</script>