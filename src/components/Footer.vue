<template>
    <footer class="bg-lightBrown text-white bottom-0 w-full ">
        <div class="container py-5 px-4 flex justify-end text-right sm:flex-row">
            <p>
                Images by 
                <a class="hover:text-beige" href="https://www.freepik.com/free-vector/gradient-mountain-landscape_19852071.htm#query=mountain%20background&position=25&from_view=keyword&track=ais&uuid=85e8b518-477c-4774-9497-fe27b40e3f21"
                >Freepik</a>
            </p>
        </div>
    </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const footerRef = ref(null);
const showFooter = ref(false);

// Function to check if the footer is in the viewport
const checkFooterVisibility = () => {
  if (footerRef.value) {
    const footerTop = footerRef.value.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // If the top of the footer is within the viewport, show it
    showFooter.value = footerTop < windowHeight;
  }
};

// Add scroll event listener to check footer visibility
onMounted(() => {
  window.addEventListener('scroll', checkFooterVisibility);
});

// Remove scroll event listener on component unmount
onUnmounted(() => {
  window.removeEventListener('scroll', checkFooterVisibility);
});
</script>