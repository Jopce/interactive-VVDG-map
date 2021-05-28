const fillcolor = "rgb(64, 43, 122)"; //vvdg purple

document.addEventListener("DOMContentLoaded", function () {
    // make buttons call function that changes the visible floor
    document
        .querySelector("#floor1button")
        .addEventListener("click", () => change_floor("floor1"));

    document
        .querySelector("#floor2button")
        .addEventListener("click", () => change_floor("floor2"));

    document
        .querySelector("#floor3button")
        .addEventListener("click", () => change_floor("floor3"));

    // by default load 2nd floor
    change_floor("floor2");


    //user clicked on list item
    document.querySelector("#rooms").querySelectorAll("li").forEach(function(btn) {
        btn.addEventListener("click", function() {
            const data = this.dataset;
            const ID = data.id;
            if (this.firstElementChild.classList.contains("active")) {
                this.classList.remove("active")
                close()
            } else {
                close()
                this.firstElementChild.classList.add("active")
                document.querySelectorAll(`polygon[data-id="${ID}"], path[data-id="${ID}"]`).forEach(function(room) {
                    room.style.fill = fillcolor;
                });
                info(data.name, data.num, data.desc, data.path);
            }
        });
    })

    document.querySelector("#close").addEventListener("click", () => close())
    //user cliked on map
    document.querySelectorAll(".st0").forEach(function(room) {
        // if this room doesn't have an id it means that it does not need to be displayed
        if (!room.dataset.id) {
            room.style.display = "none";
        }

        room.addEventListener("click", function() {
            clear_color();
            const data = this.dataset;

            console.log(data.id);

            //listas denej
            let listitem = document.querySelector(`li[data-id="${data.id}"]`)
            if (listitem !== null) {
                listitem.firstElementChild.classList.add("active");
            }
            //create a window on the left with collected data from the dataset
            info(data.name, data.num, data.desc, data.path);

            this.style.fill = fillcolor;
        });
    })
});

function clear_color() {
    //map color
    document.querySelectorAll(`polygon[style="fill: ${fillcolor};"], path[style="fill: ${fillcolor};"]`).forEach(function(element) {
        element.removeAttribute("style");
    });
    //list item color
    document.querySelectorAll('li > button.active').forEach(function(element) {
        element.classList.remove("active");
    });
}

// change floor, input is floor div id
function change_floor(floor) {
    // change which floor's map is visible
    document.querySelector("#floor1map").style.display = "none";
    document.querySelector("#floor2map").style.display = "none";
    document.querySelector("#floor3map").style.display = "none";

    document.querySelector(`#${floor}map`).style.display = "block";

    // change which floor's rooms are visible
    document.querySelector("#floor1rooms").style.display = "none";
    document.querySelector("#floor2rooms").style.display = "none";
    document.querySelector("#floor3rooms").style.display = "none";

    document.querySelector(`#${floor}rooms`).style.display = "block";

    // make that floor's button active
    document.querySelector(`#floor1button`).classList.remove("active");
    document.querySelector(`#floor2button`).classList.remove("active");
    document.querySelector(`#floor3button`).classList.remove("active");

    document.querySelector(`#${floor}button`).classList.add("active");
}

//create window on the left
function info(name, num, desc, path) {
    let infowindow = document.querySelector("#window")

    infowindow.style.position = "sticky";
    // infowindow.style.display = "block"

    let imgtag = infowindow.firstElementChild.firstElementChild
    let nametag = imgtag.nextSibling.nextSibling.nextSibling.nextSibling
    let numtag = imgtag.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling
    let desctag = infowindow.firstElementChild.lastElementChild

    if (name !== undefined) {nametag.textContent = name;} else {nametag.textContent = "Pavadinimo nėra";}
    if (num !== undefined) {numtag.textContent = `Nr. - ${num}`;} else {numtag.textContent = "";}
    if (desc !== undefined) {desctag.textContent = desc;} else {desctag.textContent = "Aprašymo nėra"}
    if (path === undefined) {imgtag.style.display = "none"} else {imgtag.src = path; imgtag.style.display = "inline"}

    // same as close()
    const info_children = [...infowindow.children[0].children];
    
    console.log(info_children);

    // shows clear button
    info_children.forEach((element) => {
        console.log(element, element.tagName);

        if (element.tagName === 'BUTTON') {
            element.style.display = "block";
        } else if (element.tagName === 'H3') {
            element.style.marginTop = "30px";
        }
    })

    // infowindow.style.animationPlayState = "running"
}

function close() {
    infowindow = document.querySelector("#window");
    //https://morioh.com/p/b7a04514a637
    infowindow.removeAttribute("style");

    console.log(infowindow.children[0].children);

    // turn htmlcollection into an iteratable array
    const info_children = [...infowindow.children[0].children];
    
    console.log(info_children);

    // empties the info card
    info_children.forEach((element) => {
        console.log(element, element.tagName);

        if (element.tagName === 'H3') {
            element.innerHTML = "Pasirinkite kabinetą";
            element.style.marginTop = "15px"
        } else if (element.tagName === 'BUTTON') {
            element.style.display = "none";
        } else {
            element.innerHTML = "";
        }
    })

    clear_color();
}