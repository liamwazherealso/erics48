import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "../supabase/supabaseClient.js";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import LogHike from "../views/LogHike.vue";
import ViewHike from "../views/ViewHike.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        // Name of page in tab
        title: "Home",
        // 'auth' object to prevent user from visiting page if not logged in
        requiresAuth: false,
      },
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        title: "Login",
        requiresAuth: false,
      },
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      meta: {
        title: "Register",
        requiresAuth: false,
      },
    },
    {
      path: "/loghike",
      name: "LogHike",
      component: LogHike,
      meta: {
        title: "Log Hike",
        // This route is guarded, i.e: an unauthenticated user cannot just visit this url without logging in
        requiresAuth: true,
      },
    },
    {
      path: "/view-hike/:hikeId", // Dynamic route with a parameter
      name: "View-Hike",
      component: ViewHike,
      meta: {
        title: "View Hike",
        requiresAuth: false,
      },
    },
  ]
});

// Change document titles
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Eric's 48`; // Update document title to match the route name
  next();
});

let localUser;

// Function to get user session
async function getUser(next) {
	localUser = await supabase.auth.getSession();
	if (localUser.data.session == null) {
		next('/login') // Redirect to 'login' view if user session is null
	}
	else {
		next();
	}
};

// Check to see if authentication is required before each route navigation
router.beforeEach((to, from, next) => {
	if (to.meta.requiresAuth) {
		getUser(next); // Call 'getUser' function if authentication is needed
	}
	else {
		next(); // Else, proceed to desired route
	}
})

// Export the router instance
export default router;