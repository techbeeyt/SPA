const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const routes = {
    "/": home,
    "/index.html": home,
    "/add": add,
    "/edit": edit,
    "/search": search,
};

const handleLocation = async() => {
    const path = window.location.pathname;
    const partsOfPaths = path.split("/");
    let folder = `/${partsOfPaths[1]}`;
    let parameter = `${partsOfPaths[2]}`;
    const page = routes[folder] || routes[404];
    document.getElementById("root").innerHTML =
        new XMLSerializer().serializeToString(page);
    const titles = document.getElementsByTagName("title");
    if (titles.length > 1) {
        titles[0].outerText = titles[1].outerText;
    }
};

window.onpopstate = handleLocation;
window.route = route;
handleLocation();