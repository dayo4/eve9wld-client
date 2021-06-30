import users from "./users";
import pages from "./pages";
import posts from "./posts";
// import message from "./message"
import settings from "./account";
// import notifications from "./notifications"

/* OTHER FEATURES */
import gallery from "./gallery";
import shopping from "./shopping";

const NotFound = () =>
  import("@/views/pages/ERRORS/404.vue").then(m => m.default || m);

export default [
  // ...auth,
  ...users,
  ...pages,
  ...posts,
  ...settings,
  ...gallery,
  ...shopping,
  { path: "/:pathMatch(.*)*", component: NotFound }
];
