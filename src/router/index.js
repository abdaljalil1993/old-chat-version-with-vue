import { createRouter, createWebHistory } from "vue-router";
import VerfiyComponent from "../components/VerfiyComponent.vue";
import ComplateSignUp from "../components/ComplateSignUp.vue";
import passwordConfirmation from "../components/passwordConfirmation.vue";
import HomeComponent from "../components/HomeComponent.vue";
import LoginComponent from "../components/LoginComponent.vue";
import auth from "../middleware/authntictate";

const routes = [
  {
    path: "/",
    name: "verify",
    component: VerfiyComponent,
  },
  {
    path: "/home",
    name: "home",
    meta: {
      middleware: auth,
    },
    component: HomeComponent,
  },
  {
    path: "/personal-information",
    name: "personal-information",
    component: ComplateSignUp,
  },
  {
    path: "/login",
    name: "login",
    component: LoginComponent,
  },
  {
    path: "/set-password",
    name: "passwordConfirmation",
    component: passwordConfirmation,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});






// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});







export default router;