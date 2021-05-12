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
});

// change floor, input is floor div id
function change_floor(floor) {
    console.log("yay");
    document.querySelector("#floor1").style.display = "none";
    document.querySelector("#floor2").style.display = "none";
    document.querySelector("#floor3").style.display = "none";

    document.querySelector(`#${floor}`).style.display = "grid";
}
