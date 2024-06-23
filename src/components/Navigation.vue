<template>
  <header class="bg-lightBrown text-white fixed top-0 left-0 w-full z-10" :class="{ 'scrolled-nav': scrollNav }">
    <nav class="container py-5 px-4 flex flex-row">
      <!-- Site name and image -->
      <div class="branding gap-x-4">
        <!-- Router link to Home page -->
        <router-link
          class="hover:bg-reallyLightBrown cursor-pointer rounded-full border-2 border-white hover:border-transparent 
          transition ease-in-out duration-300"
          :to="{ name: 'Home' }"
        >
          <!-- Router link hiker image -->
          <img src="../assets/images/icons/hiker.png" alt="Hiker Image" class="w-14" />
        </router-link>
        <h1 class="text-2xl font-ProtestRiot">Eric's 48</h1>
      </div>
      <!-- Hamburger Menu Icon -->
      <div class="icon">
        <i  @click="toggleMobileNav" v-show="mobile" class="fa fa-bars fa-lg" style="color: #ffffff;" :class="{ 'icon-active': mobileNav }"></i>
      </div>
      <!-- Navbar Links -->
      <ul v-show="!mobile" class="navigation" :class="{ 'icon-active': mobileNav }">
        <!-- Router link to LogHike page  if user is logged in-->
        <li><router-link v-if="user" class="hover:text-beige cursor-pointer link" :to="{ name: 'LogHike' }">
          Log Hike
        </router-link></li>
        <!-- Router link to About page -->
        <li><router-link class="hover:text-beige cursor-pointer link" :to="{ name: 'About' }">
          About
        </router-link></li>
        <!-- Router link to log in if user is not logged in -->
        <li><router-link v-if="!user" class="hover:text-beige cursor-pointer link" :to="{ name: 'Login' }">
          Login
        </router-link></li>
        <!-- User icon and username if user is logged in -->
        <li id="profile-icon"><router-link v-if="user"  class="flex items-center gap-x-2 link cursor-default border-none" :to="{ name: '' }">
          <i class="fa-regular fa-user fa-lg" style="color: #ffffff;"></i>
          {{ userName }}
        </router-link></li>
        <!-- Logout button if user is logged in -->
        <li><router-link v-if="user" @click="logout" class="hover:text-beige cursor-pointer link" :to="{ name: '' }">
          Logout
        </router-link></li>
      </ul>
      <!-- Mobile nav -->
      <transition name="mobile-nav">
        <ul v-show="mobileNav" class="dropdown-nav">
          <!-- Router link to LogHike page  if user is logged in-->
          <li><router-link v-if="user" class="hover:text-beige cursor-pointer link" :to="{ name: 'LogHike' }">
            Log Hike
          </router-link></li>
          <!-- Router link to About page -->
          <li><router-link class="hover:text-beige cursor-pointer link" :to="{ name: 'About' }">
            About
          </router-link></li>
          <!-- Router link to log in if user is not logged in -->
          <li><router-link v-if="!user" class="hover:text-beige cursor-pointer link" :to="{ name: 'Login' }">
            Login
          </router-link></li>
          <!-- User icon and username if user is logged in -->
          <li><router-link v-if="user" class="flex flex-row items-center gap-x-2 username" :to="{ name: '' }">
          <i class="fa-regular fa-user fa-lg" style="color: #ffffff;"></i>
          {{ userName }}
        </router-link></li>
          <!-- Logout button if user is logged in -->
          <li><router-link v-if="user" @click="logout" class="hover:text-beige cursor-pointer link" :to="{ name: '' }">
          Logout
        </router-link></li>
        </ul>
      </transition>
    </nav>  
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { supabase } from '@/supabase/supabaseClient';
import { useRouter } from 'vue-router';
import store from '../store/index';
import { useToast } from 'vue-toastification';

// Data
const userName = ref(null);
const toast = useToast();
const scrollNav = ref(null);
const mobile = ref(false);
const mobileNav = ref(null);
const windowWidth = ref(window.innerWidth);

console.log(mobile.value);

// Get user from store
const user = computed(() => store.state.user);

// Get username function
const getUsername = async () => {
  try {
    // Check to see if user is logged in
    if (user.value) {
      // Access the user object metadata from supabase to gain username
      const { data: { user, error } } = await supabase.auth.getUser();
      // If Supabase returns an error, throw to the catch block
      if (error) throw error;

      const metadata = user.user_metadata;
      // Assign value of username to userName
      userName.value = metadata.username;
    }
  } catch (error) {
    // Alert user of error
    console.warn(error.message);
  }
};

// When the user session changes, get the username
supabase.auth.onAuthStateChange((_, session) => {
  getUsername();
});

// Setup ref to router
const router = useRouter();

// Logout function
const logout = async () => {
  // Inform supabase that the user has logged out
  await supabase.auth.signOut();

  console.log('User is logged out');

  // Alert the user of a successful logout
  toast.info('Your account has been logged out');

  // Set the value of userName back to null
  userName.value = null;

  // Push the user back to the home page
  router.push({ name: 'Home' });
};

// Toggle mobile navigation function
const toggleMobileNav = () => {
  mobileNav.value = !mobileNav.value;
};

// Add event listeners when the componenet is mounted
onMounted(() => {
  window.addEventListener('resize', checkScreen);
  window.addEventListener('scroll', updateScroll);
});

// ... And remove them when componenet is unmounted
onUnmounted(() => {
  window.addEventListener('resize', checkScreen);
  window.addEventListener('scroll', updateScroll);
});

// Update scroll position to add 'scrolledNav' class to navbar
const updateScroll = () => {
  const scrollPosition = window.scrollY;
  if (scrollPosition > 50) {
    scrollNav.value = true;
    return;
  }
  else {
    scrollNav.value = false;
  }
};

// Check screen width to update windowWidth and mobile values
const checkScreen = () => {
  windowWidth.value = window.innerWidth;
  if (windowWidth.value <= 750) {
    mobile.value = true;
    return;
  }
  mobile.value = false;
  mobileNav.value = false;
};
</script>

<style lang="scss" scoped>
  header {
    z-index: 99;
    transition: 0.5s ease all;

    nav {
      position: relative;
      transition: 0.5s ease all;
      margin: 0 auto;
      width: 90%;
      @media (min-width: 1140px) {
        max-width: 1140px;
      }

      ul, .link, .username {
        font-weight: 500;
        list-style: none;
        text-decoration: none;
      }
      li {
          padding: 16px;
          margin-left: 16px;
      }
      .link {
        font-size: 14px;
        transition: 0.5s ease all;
        padding-bottom: 4px;
        border-bottom: 1px solid transparent;

        &:hover {
          border-color: beige;
        }
      }

      #profile-icon {
        height: 56px;
        margin-left: -32px;
        margin-bottom: -4px;
      }

      .username {
        font-size: 14px;
        transition: 0.5s ease all;
        padding-bottom: 4px;
        margin-bottom: 5px;
        margin-top: -20px;
        // border-bottom: 1px solid transparent;

        // &:hover {
        //   border-color: beige;
        // }
      }

      #logout {
        margin-bottom: 10px;
      }

      .branding {
        display: flex;
        align-items: center;

        img {
          width: 50px;
          transition: 0.5s ease all;
        }
      }

      .navigation {
        display: flex;
        align-items: center;
        flex: 1;
        justify-content: flex-end;
      }

      .icon {
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        right: 24px;
        height: 100%;
        
        i {
          cursor: pointer;
          font-size: 24px;
          transition: 0.8s ease all;
        }
      }

      .icon-active {
        transform: rotate(180deg);
      }

      .dropdown-nav {
        display: flex;
        flex-direction: column;
        position: fixed;
        width: 100%;
        max-width: 250px;
        height: 100%;
        background-color: #b45309;
        top: 0;
        left: 0;

        li {
          margin-left: 0;

          .link {
            color: white
          }

          #mobileUsername {
            margin-top: -20px;
          }

          .username {
            color: white;
          }
        }
      }

      .mobile-nav-enter-active,
      .mobile-nav-leave-active {
        transition: 1s ease all;
      }

      .mobile-nav-enter-from,
      .mobile-nav-leave-to {
        transform: translateX(-250px);
      }

      .mobile-nav-enter-to {
        transform: translateX(0);
      }
    }
  }
  
  .scrolled-nav {
    background-color: #78350f;
    box-shadow: 0 4px 5px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

    nav {
      padding: 8px 0;

      .branding {
        img {
          width: 40px;
          box-shadow: 0 4px 5px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
      }
    }
  }
</style>
