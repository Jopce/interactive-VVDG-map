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

    // by default load 2nd floor (entrance)
    change_floor("floor2");

    document.querySelector("#close").addEventListener("click", () => close())

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

    document.querySelectorAll(".st0").forEach(function(room) {
        // if this room doesn't have an id it means that it does not need to be displayed
        if (!room.dataset.id) {
            room.style.display = "none";
        }

        room.addEventListener("click", function() {
            // user clicks on map
            clear_color();
            const data = this.dataset;

            //list on the right
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

    close();
}

//create window on the left
function info(name, num, desc, path) {
    let infowindow = document.querySelector("#window")

    infowindow.style.position = "sticky";

    let close = infowindow.firstElementChild.firstElementChild;
    let imgtag = close.nextElementSibling;
    let nametag = imgtag.nextElementSibling;
    let numtag = nametag.nextElementSibling;
    let desctag = numtag.nextElementSibling;

    if (name !== undefined) {nametag.textContent = name;} else {nametag.textContent = "Pavadinimo n??ra";}
    if (num !== undefined) {numtag.textContent = `Nr. ${num}`;} else {numtag.textContent = "";}
    if (desc !== undefined) {desctag.textContent = desc;} else {desctag.textContent = "Apra??ymo n??ra"}
    if (path === undefined) {imgtag.src = "static/images/vvdg-logotipas.png"; imgtag.style.display = "block"} else {imgtag.src = path; imgtag.style.display = "block"}

    // same as close()
    const info_children = [...infowindow.children[0].children];
    
    // shows clear button
    info_children.forEach((element) => {
        if (element.tagName === 'BUTTON') {
            element.style.display = "block";
        } else if (element.tagName === 'H3') {
            element.style.marginTop = "30px";
        }
    })
}

function close() {
    infowindow = document.querySelector("#window");
    //https://morioh.com/p/b7a04514a637
    infowindow.removeAttribute("style");

    // turn htmlcollection into an iteratable array
    const info_children = [...infowindow.children[0].children];
    
    // empties the info card
    info_children.forEach((element) => {
        if (element.tagName === 'H3') {
            element.innerHTML = "Pasirinkite kabinet??";
            element.style.marginTop = "15px"
        } else if (element.tagName === 'BUTTON') {
            element.style.display = "none";
        } else if (element.tagName === 'IMG') {
            element.style.display = "none";
            element.src = '';
        } else {
            element.innerHTML = "";
        }
    })

    clear_color();
}