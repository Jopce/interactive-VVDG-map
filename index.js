const fillcolor = "rgb(64, 43, 122)"; //vvdgpurple

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

    document.querySelector("#close").addEventListener("click", () => close())

    //change color and window pop up
    document.querySelectorAll(".st0").forEach(function(room) {
        //room.addEventListener("click", () => info(this.dataset.name)) neveikia
        room.onclick = function(event) {
            //clear all color
            document.querySelectorAll(`polygon[style="fill: ${fillcolor};"], path[style="fill: ${fillcolor};"]`).forEach(function(element) {
                element.removeAttribute("style");
            });

            const data = event.target.dataset;
            //create a window on the left with collected data from the dataset
            info(data.name, data.num, data.desc, data.path);
            event.target.style.fill = fillcolor;
        }
    })

});

// change floor, input is floor div id
function change_floor(floor) {
    console.log("yay");
    document.querySelector("#floor1").style.display = "none";
    document.querySelector("#floor2").style.display = "none";
    document.querySelector("#floor3").style.display = "none";

    document.querySelector(`#${floor}`).style.display = "block";
}

//create window on the left
function info(name, num, desc, path) {
    let infowindow = document.querySelector("#window")
    infowindow.style.display = "inline"

    let imgtag = infowindow.firstElementChild.firstElementChild

    if (name !== undefined) imgtag.nextSibling.nextSibling.textContent = name;

    if (num !== undefined) imgtag.nextSibling.nextSibling.nextSibling.textContent = `Nr. - ${num}`;

    if (desc !== undefined) infowindow.firstElementChild.lastElementChild.textContent = desc;

    if (path === undefined) {imgtag.style.display = "none"} else {imgtag.src = path}
}

function close() {
    //hide window
    document.querySelector("#window").removeAttribute("style")
    //clear all color
    document.querySelectorAll(`polygon[style="fill: ${fillcolor};"], path[style="fill: ${fillcolor};"]`).forEach(function(element) {
        element.removeAttribute("style");
    });
}
