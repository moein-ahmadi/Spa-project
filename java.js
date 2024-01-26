import HomePage from "./pages/HomePage.js";
import LastVideos from "./pages/LastVideos.js";
import LastPost from "./pages/LastPost.js";

const navTo = (url) => {
  history.pushState(null, null, url);
  routes();
};
const routes = () => {
  const route = [
    { path: "/", view: HomePage },
    { path: "/last-videos", view: LastVideos },
    { path: "/last-posts", view: LastPost },
  ];

  const res = route.map((item) => {
    return {
      route: item,
      isMatch: location.pathname === item.path,
    };
  });

  let match = res.find((item) => {
    return item.isMatch;
  });

  if (!match) {
    match = {
      route: route[0],
      isMatch: true,
    };
  }

  document.getElementById("app").innerHTML = match.route.view();
};

window.addEventListener("popstate", routes);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navTo(e.target.href);
    }
  });

  routes();
});
