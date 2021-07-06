import users from "./users";
import pages from "./pages";
import posts from "./posts";
import settings from "./account";

/* OTHER FEATURES */
import gallery from "./gallery";
import shopping from "./shopping";

const NotFound = () =>
  import("@/views/pages/ERRORS/404.vue")
  
export default [
  ...users,
  ...pages,
  ...posts,
  ...settings,
  ...gallery,
  ...shopping,
  { path: "/:pathMatch(.*)*", component: NotFound }
];
