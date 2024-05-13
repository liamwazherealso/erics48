import { ref } from 'vue';
import { supabase } from '@/supabase/supabaseClient';

// Set the session timeout duration (in milliseconds)
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export const sessionTimeoutMixin = {
  data() {
    return {
      userIsActive: false,
    };
  },
  mounted() {
    this.initSessionTimeout();
  },
  methods: {
    initSessionTimeout() {
      let timeoutId;

      // Function to reset the timeout timer if activity is detected
      const resetSessionTimeout = () => {
        // Clear any existing timeout
        clearTimeout(timeoutId);
        // Set a new timeout
        timeoutId = setTimeout(() => {
            // Log out the user on timeout
          this.logout();
        }, SESSION_TIMEOUT);
      };

      // Function to handle user activity
      const handleUserActivity = () => {
        // Set useIsActive to true
        this.userIsActive = true;
        // Reset the user session timeout
        resetSessionTimeout();
      };

      // Window event listeners
      window.addEventListener('mousemove', handleUserActivity);
      window.addEventListener('keydown', handleUserActivity);

      resetSessionTimeout();
    },
    // Function to log out the user
    logout() {
      // Perform logout action
      supabase.auth.signOut();
      // Redirect the user to the login page
      router.push({ name: 'Login' });
    },
  },
};
