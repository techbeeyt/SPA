//Global Parts for Data Sharing
//
//
//#############################################################

//############### <- HOME #################
const home = document.createElement("div");
home.classList.add("page_container");

const newDiv = document.createElement("div");
newDiv.classList.add("page_header");
newDiv.innerHTML = `
<h2>All Users Data</h2>
`;

home.appendChild(newDiv);
let table = document.createElement("table");
table.setAttribute("cellpadding", "12");
table.setAttribute("cellspacing", "0");
table.classList.add("users_data");

const thead = document.createElement("thead");

thead.innerHTML = `
<tr>
<th>id</th>
<th>First name</th>
<th>Last name</th>
<th>Email</th>
<th>Point</th>
<th>Phone</th>
<th>Company</th>
<th>Options</th>
</tr>
`;

table.appendChild(thead);

const renderTable = () => {
    const tbody = document.createElement("tbody");

    let usersDataArray = Array.from(
        JSON.parse(localStorage.getItem("usersData"))
    );

    if (document.getElementById("newTbody")) {
        document.getElementById("newTbody").innerHTML = "";
        let newTbodyHTML = "";
        usersDataArray.forEach((item, index) => {
            newTbodyHTML += `<tr class="tr_${index % 2}">
            <td>${index + 1}</td>
<td>${item.firstName}</td>
<td>${item.lastName}</td>
<td>${item.email}</td>
<td>${item.point}</td>
<td>${item.phone}</td>
<td>${item.company}</td>
<td class="td_options"><button class="view_data" onclick="view(this)" data-view><i class="fa-solid fa-eye"></i></button>
    <button class="liquid_button" onclick="edit(this)" id="edit_data"><i class="fa-solid fa-pen-to-square"></i></button>
    <button class="liquid_button" onclick="Delete(this)" id="delete_data"><i class="fa-solid fa-trash"></i></button></td></tr>`;
        });
        document.getElementById("newTbody").innerHTML = newTbodyHTML;
    }

    tbody.setAttribute("id", "newTbody");
    usersDataArray.forEach((item, index) => {
        const tr = document.createElement("tr");

        tr.classList.add(`tr_${index % 2}`);

        tr.innerHTML = `
<td>${index + 1}</td>
<td>${item.firstName}</td>
<td>${item.lastName}</td>
<td>${item.email}</td>
<td>${item.point}</td>
<td>${item.phone}</td>
<td>${item.company}</td>
`;

        const newTd = document.createElement("td");
        newTd.classList.add("td_options");
        newTd.innerHTML = `
    <button class="view_data" onclick="view(this)" data-view><i class="fa-solid fa-eye"></i></button>
    <button class="liquid_button" onclick="edit(this)" id="edit_data"><i class="fa-solid fa-pen-to-square"></i></button>
    <button class="liquid_button" onclick="Delete(this)" id="delete_data"><i class="fa-solid fa-trash"></i></button>`;
        tr.appendChild(newTd);
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    home.appendChild(table);
};

renderTable();

//############### HOME -> #################

//############### <- VIEW #################
const promptDiv = document.getElementsByClassName("prompt")[0];
const view = (obj) => {
    let usersData = localStorage.getItem("usersData");
    let usersDataArray = [];
    usersDataArray = JSON.parse(usersData);
    promptDiv.style.display = "flex";
    id = obj.parentElement.parentElement.children[0].innerText;
    window.history.pushState({}, "", `/users/view/${id}`);
    viewUserData = usersDataArray[id - 1];
    promptDiv.innerHTML = `
    <div class="view">
    <div class="relative">
    <div class="mar_center">
    <h2 align="center">${viewUserData.firstName} ${viewUserData.lastName}</h2>
    <h3 align="center"><i class="fa-solid fa-star"></i> Point: ${viewUserData.point}</h3>
    </div>
    <p><i class="fa-solid fa-envelope"></i>  Email : ${viewUserData.email}</p>
    <p><i class="fa-solid fa-phone"></i>  Phone : ${viewUserData.phone}</p>
    <p><i class="fa-solid fa-building"></i>  Company : ${viewUserData.company}</p>
    <div  class="position-bottom-right">
    <button id="close_view" onclick="close_view()" class="liquid_button">Close</button>
    </div>
    </div>
    </div>
    `;
};

const close_view = () => {
    promptDiv.style.display = "none";
    window.history.pushState({}, "", "/");
};

//############### VIEW -> #################

//############### EDIT -> #################
const edit = (obj) => {
    let usersData = localStorage.getItem("usersData");
    let usersDataArray = [];
    usersDataArray = JSON.parse(usersData);
    promptDiv.style.display = "flex";
    id = obj.parentElement.parentElement.children[0].innerText;
    let tempUsersData = usersDataArray;
    window.history.pushState({}, "", `/users/edit/${id}`);
    viewUserData = usersDataArray[id - 1];
    promptDiv.innerHTML = `
    <div class="view">
    <div class="relative">
    <div class="edit_users_data">
    <h2 align="center">Edit User Data</h2>
    <div class="edit_form">
    <span>First Name:</span>
    <input type="text" name="firstName" value="${viewUserData.firstName}" />
    <span>Last Name:</span>
    <input type="text" name="lastName" value="${viewUserData.lastName}" />
    <span>Email:</span>
    <input type="text" name="email" value="${viewUserData.email}" />
    <span>Point:</span>
    <input type="text" name="point" value="${viewUserData.point}"/>
    <span>Phone:</span>
    <input type="text" name="phone" value="${viewUserData.phone}"/>
    <span>Company:</span>
    <input type="text" name="company" value="${viewUserData.company}"/>
    </div>
    <div>
    <button id="close_view" onclick="close_view()" class="btn_negative">Cancel</button>
    <button onclick="update(this, ${
      id - 1
    })" class="btn_positive">Update</button>
    </div>
    </div>
    </div>
    </div>
    `;
};

const update = (elem, id) => {
    let usersData = localStorage.getItem("usersData");
    let usersDataArray = [];
    usersDataArray = JSON.parse(usersData);
    const elements = Array.from(
        elem.parentElement.parentElement.children[1].children
    );
    editedObj = {};
    elements.forEach((item) => {
        if (item.name) {
            editedObj[item.name] = item.value;
        }
    });
    usersDataArray[id] = editedObj;
    localStorage.setItem("usersData", JSON.stringify(usersDataArray));
    renderTable();
    close_view();
};

//############### <- EDIT #################

//############### <- DELETE #################
const Delete = (obj) => {
    let usersData = localStorage.getItem("usersData");
    let usersDataArray = [];
    usersDataArray = JSON.parse(usersData);
    promptDiv.style.display = "flex";
    id = obj.parentElement.parentElement.children[0].innerText;
    let tempUsersData = usersDataArray;
    window.history.pushState({}, "", `/users/edit/${id}`);
    viewUserData = usersDataArray[id - 1];
    promptDiv.innerHTML = `
    <div class="view">
    <div class="relative">
    <h2>Do you really want to delete the user ?</h2>
    <h4><i class="fa-solid fa-user"></i> ${viewUserData.firstName} ${
    viewUserData.lastName
  }</h4>
    <div class="position-bottom-right">
    <button class="btn_negative" onclick="close_view()">Cancel</button>
    <button class="btn_positive" onclick="delete_confirm(this,${
      id - 1
    })">Delete</button>
    </div>
    </div>
    </div>
    `;
};

const delete_confirm = (elem, id) => {
    console.log("delete_confirm");
    let usersData = Array.from(JSON.parse(localStorage.getItem("usersData")));
    usersData.splice(id, 1);
    localStorage.setItem("usersData", JSON.stringify(usersData));
    renderTable();
    close_view();
};
//############### DELETE -> #################
//
//
//----------------------------------------------------------------------------------------------------------------------
//
//
//############### <- SEARCH #################
const sideNavSearch = document.getElementById("side_nav_search");

sideNavSearch.addEventListener("click", (e) => {
    if (location.pathname !== "/search") {
        window.history.pushState({}, "", "/search");
        handleLocation();
    }
});

let usersDataArray = Array.from(JSON.parse(localStorage.getItem("usersData")));
let searchResult = [];
const updateSearchResult = (arr) => {
    searchResult = arr;
};
const getSearchResult = () => {
    return searchResult;
};
sideNavSearch.addEventListener("keypress", (e) => {
    let _searchResult = [];
    searchQuery = e.target.value.toUpperCase();
    usersDataArray.forEach((item) => {
        if (
            (item.firstName.toUpperCase().indexOf(searchQuery) > -1 ||
                item.lastName.toUpperCase().indexOf(searchQuery) > -1) &&
            searchQuery.length > 0
        ) {
            _searchResult.push(item);
        }
    });
    updateSearchResult(_searchResult);
    renderSearchTable();
});

let searchQuery = "";
const searching_func = (elem) => {};

const search = document.createElement("div");

const search_div = document.createElement("div");
search_div.classList.add("page_header");
search_div.innerHTML = `
<h2>Search Users</h2>
`;

search.appendChild(search_div);

let search_table = document.createElement("table");
search_table.setAttribute("cellpadding", "12");
search_table.setAttribute("cellspacing", "0");
search_table.classList.add("users_data");

let search_thead = document.createElement("thead");
search_thead.setAttribute("id", "id_search_thead");
search_table.appendChild(search_thead);

const search_tbody = document.createElement("tbody");
search_tbody.setAttribute("id", "newSearchTbody");

const renderSearchTable = () => {
    let _searchResult = getSearchResult();
    if (_searchResult.length !== 0) {
        console.log(search_thead);
        document.getElementById("id_search_thead").innerHTML = `
<tr>
<th>id</th>
<th>First name</th>
<th>Last name</th>
<th>Email</th>
<th>Point</th>
<th>Phone</th>
<th>Company</th>
<th>Options</th>
</tr>
`;
    } else if (document.getElementById("id_search_thead")) {
        document.getElementById(
            "id_search_thead"
        ).innerHTML = `<h2>No match found !</h2>`;
    }

    if (document.getElementById("newSearchTbody")) {
        document.getElementById("newSearchTbody").innerHTML = "";
        let newTbodyHTML = "";
        _searchResult.forEach((item, index) => {
            newTbodyHTML += `<tr class="tr_${index % 2}">
            <td>${index + 1}</td>
<td>${item.firstName}</td>
<td>${item.lastName}</td>
<td>${item.email}</td>
<td>${item.point}</td>
<td>${item.phone}</td>
<td>${item.company}</td>
<td class="td_options"><button class="view_data" onclick="view(this)" data-view><i class="fa-solid fa-eye"></i></button>
    <button class="liquid_button" onclick="edit(this)" id="edit_data"><i class="fa-solid fa-pen-to-square"></i></button>
    <button class="liquid_button" onclick="Delete(this)" id="delete_data"><i class="fa-solid fa-trash"></i></button></td></tr>`;
        });
        document.getElementById("newSearchTbody").innerHTML = newTbodyHTML;
    }

    searchResult.forEach((item, index) => {
        const tr = document.createElement("tr");

        tr.classList.add(`tr_${index % 2}`);

        tr.innerHTML = `
<td>${index + 1}</td>
<td>${item.firstName}</td>
<td>${item.lastName}</td>
<td>${item.email}</td>
<td>${item.point}</td>
<td>${item.phone}</td>
<td>${item.company}</td>
`;

        const newTd = document.createElement("td");
        newTd.classList.add("td_options");
        newTd.innerHTML = `
    <button class="view_data" onclick="view(this)" data-view><i class="fa-solid fa-eye"></i></button>
    <button class="liquid_button" onclick="edit(this)" id="edit_data"><i class="fa-solid fa-pen-to-square"></i></button>
    <button class="liquid_button" onclick="Delete(this)" id="delete_data"><i class="fa-solid fa-trash"></i></button>`;
        tr.appendChild(newTd);
        search_tbody.appendChild(tr);
    });

    search_table.appendChild(search_tbody);
    search.appendChild(search_table);
};

renderSearchTable();

//############### SEARCH -> #################

const add = document.createElement("div");
add.innerHTML = "<h1>addPage</h1>";