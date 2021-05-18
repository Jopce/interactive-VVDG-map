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

    // pasimeginau padaryt viena mygtuka, kuri paspaudus nusispalvina tas kambarys ir mygtukas tampa active
    // zinoma cia galima (ir reiks) nemazai pakeist, bet pasiziurejau ar esme sueina
    document.querySelector("#chemija").addEventListener("click", () => {
        console.log("a");
        document.querySelectorAll(".st0").forEach(function(room) {
            // cia ziuriu pagal kabo nr, bet reiks ziuret kaip darysim loope
            if (room.dataset.num == "127") {
                if (room.style.fill != fillcolor) {
                    room.style.fill = fillcolor;
                    document.querySelector("#chemija").classList.add("active")
                } else {
                    // nesu tikras ar null tinkamas naudot cia, bet veikia tai gal px lol
                    room.style.fill = null;
                    document.querySelector("#chemija").classList.remove("active")
                }
            }
        })
    })

    // by default load 2nd floor
    change_floor("floor2");

    document.querySelector("#close").addEventListener("click", () => close())

    //change color and window pop up
    document.querySelectorAll(".st0").forEach(function(room) {
        //room.addEventListener("click", () => info(this.dataset.name)) neveikia
        room.onclick = function(event) {
            clear_color();

            const data = event.target.dataset;
            //create a window on the left with collected data from the dataset
            info(data.name, data.num, data.desc, data.path);
            event.target.style.fill = fillcolor;
        }
    })

});

function clear_color() {
    document.querySelectorAll(`polygon[style="fill: ${fillcolor};"], path[style="fill: ${fillcolor};"]`).forEach(function(element) {
        element.removeAttribute("style"); // 
    });
}

// change floor, input is floor div id
function change_floor(floor) {
    // change which floor is visible
    document.querySelector("#floor1").style.display = "none";
    document.querySelector("#floor2").style.display = "none";
    document.querySelector("#floor3").style.display = "none";

    document.querySelector(`#${floor}`).style.display = "grid";

    // make that floor's button active
    document.querySelector(`#floor1button`).classList.remove("active");
    document.querySelector(`#floor2button`).classList.remove("active");
    document.querySelector(`#floor3button`).classList.remove("active");

    document.querySelector(`#${floor}button`).classList.add("active");
}

//create window on the left
function info(name, num, desc, path) {
    let infowindow = document.querySelector("#window")
    infowindow.style.display = "inline"

    let imgtag = infowindow.firstElementChild.firstElementChild
    let nametag = imgtag.nextSibling.nextSibling.nextSibling.nextSibling
    let numtag = imgtag.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling
    let desctag = infowindow.firstElementChild.lastElementChild

    if (name !== undefined) {nametag.textContent = name;} else {nametag.textContent = "Pavadinimo nėra";}
    if (num !== undefined) {numtag.textContent = `Nr. - ${num}`;} else {numtag.textContent = "";}
    if (desc !== undefined) {desctag.textContent = desc;} else {desctag.textContent = "Aprašymo nėra"}
    if (path === undefined) {imgtag.style.display = "none"} else {imgtag.src = path; imgtag.style.display = "inline"}

    infowindow.style.animationPlayState = "running"
}

function close() {
    infowindow = document.querySelector("#window");
    //https://morioh.com/p/b7a04514a637
    infowindow.removeAttribute("style")

    clear_color();
}