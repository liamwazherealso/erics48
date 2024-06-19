<template>
    <footer class="bg-lightBrown text-white py-8">
        <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Company Info -->
            <div>
                <h5 class="text-xl font-semibold mb-4">Developed by Eric Henderson</h5>
                <p class="mb-2">&copy; 2024 Eric Henderson. All rights reserved.</p>
                <p>henderson.develop@gmail.com</p>
            </div>
            <!-- Quick Links -->
            <div>
                <h5 class="text-xl font-semibold mb-4">Quick Links</h5>
                <ul class="flex flex-col">
                    <router-link class="mb-2 hover:text-beige cursor-pointer" :to="{ name: 'Home' }">Home</router-link>
                    <router-link class="mb-2 hover:text-beige cursor-pointer" :to="{ name: 'About' }">About</router-link>
                    <li class="mb-2 hover:text-beige cursor-pointer">
                        <a href="https://www.amc4000footer.org/the-lists-we-recognize.html">AMC 4,000 Footer Club</a>
                    </li>
                </ul>
            </div>
            <!-- Social Media -->
            <div>
                <h5 class="text-xl font-semibold mb-6">Follow Me</h5>
                <div class="flex space-x-4">
                    <a href="https://www.facebook.com/eric.henderson.3958" class="hover:text-beige">
                        <i class="fab fa-facebook-f fa-2xl"></i>
                    </a>
                    <a href="https://x.com/EricRHenderson" class="hover:text-beige">
                        <i class="fab fa-twitter fa-2xl"></i>
                    </a>
                    <a href="https://www.instagram.com/ericrhenderson/" class="hover:text-beige">
                        <i class="fab fa-instagram fa-2xl"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/eric-henderson-dev" class="hover:text-beige">
                        <i class="fab fa-linkedin-in fa-2xl"></i>
                    </a>
                    <a href="https://github.com/ehenderson828" class="hover:text-beige">
                        <i class="fab fa-github fa-2xl"></i>
                    </a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
    // Imports
    import { computed } from 'vue';
    import { useRouter } from 'vue-router';
    import store from '../store/index';

    // Data
    const router = useRouter();
    const user = computed(() => store.state.user);


</script>