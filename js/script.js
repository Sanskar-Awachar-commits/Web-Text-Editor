// Focuses on the textarea element when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const editorLine = document.querySelector("#editor");
    editorLine.focus();
});

// Popup
// To add more functionality later
function popup(n) {
    const popupList = document.querySelector(`#popup-${n}`);
    if (!popupList.classList.contains("popupShow")) {
        popupList.classList.add("popupShow");
    }
    else {
        popupList.classList.remove("popupShow");
    }
}

// Save Function
function save() {
    const editorData = document.getElementById("editor");
    const downloadLink = document.createElement("a");
    const downloadBlob = new Blob([editorData.value], { type: "text/plain" });
    downloadLink.href = URL.createObjectURL(downloadBlob);
    downloadLink.download = "Web-Text-Editor-by-Sanskar.txt";
    downloadLink.click();
    URL.revokeObjectURL(downloadLink.href);
}
// Capturing Ctrl + S
document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        save();
    }
});

// Open Function
const inputFile = document.getElementById("fileInput");
inputFile.addEventListener("change", readSingleFile, false);
function readSingleFile(e) {
    const editorData = document.getElementById("editor");
    var file = e.target.files[0];
    if (!file) {
            return;
    }
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
        editorData.value = evt.target.result;
    }
    reader.onerror = function (evt) {
        editorData.value = "Error Opening this file!";
    }
    inputFile.value = '';
}
// Capturing Ctrl + O
document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "o") {
        e.preventDefault();
        inputFile.click();
    }
});
function findInFile() {

}
// Capturing Ctrl + F
document.addEventListener("keydown", () => {
    if (e.ctrlKey && e.key === "f") {
        e.preventDefault();
        findInFile();
    }
});
// Capturing Ctrl + H
document.addEventListener("keydown", () => {
    if (e.ctrlKey && e.key === "h") {
        e.preventDefault();
        replaceInFile();
    }
});



// Gutter Updater
const gutter = document.querySelector(".gutter");
const editor = document.querySelector("#editor");
function updateGutter() {
    let totalNewLineChar = 1;
    editor.value.split("").forEach((char) => {
        if (char === "\n") {
            totalNewLineChar++;
        }
    });
    gutter.innerHTML = "";
    for (let i = 1; i <= totalNewLineChar; i++) {
        const gutterEle = document.createElement("div");
        gutterEle.setAttribute("data-gutter", i);
        gutterEle.innerText = i;
        gutter.append(gutterEle);
    }
    if (totalNewLineChar >= 30) {
        editor.style.padding = "5px";
    }
    else {
        editor.style.padding = "5px 5px 75vh 5px";
    }
}
setInterval(updateGutter, 1);


// Theme Change from dark to light to dark
function themeChange(e, n) {
    const styleRoot = document.querySelector(":root");
    switch (n) {
        case 0:
            styleRoot.style.setProperty("--theme-color-1", "rgb(255, 255, 255)");
            styleRoot.style.setProperty("--theme-color-2", "rgb(240, 240, 240)");
            styleRoot.style.setProperty("--theme-color-3", "rgb(224, 224, 224)");
            styleRoot.style.setProperty("--theme-color-4", "rgb(221, 221, 221)");
            styleRoot.style.setProperty("--theme-color-5", "rgb(200, 200, 200)");
            styleRoot.style.setProperty("--theme-font-color", "rgb(0, 0, 0)");
            e.setAttribute("onclick", "themeChange(this,1)");
            break;
        case 1:
            styleRoot.style.setProperty("--theme-color-1", "rgb(0, 0, 0)");
            styleRoot.style.setProperty("--theme-color-2", "rgb(15, 15, 15)");
            styleRoot.style.setProperty("--theme-color-3", "rgb(31, 31, 31)");
            styleRoot.style.setProperty("--theme-color-4", "rgb(34, 34, 34)");
            styleRoot.style.setProperty("--theme-color-5", "rgb(55, 55, 55)");
            styleRoot.style.setProperty("--theme-font-color", "rgb(255, 255, 255)");
            e.setAttribute("onclick", "themeChange(this,0)");
            break;
        default:
            styleRoot.style.setProperty("--theme-color-1", "rgb(255, 255, 255)");
            styleRoot.style.setProperty("--theme-color-2", "rgb(240, 240, 240)");
            styleRoot.style.setProperty("--theme-color-3", "rgb(224, 224, 224)");
            styleRoot.style.setProperty("--theme-color-4", "rgb(221, 221, 221)");
            styleRoot.style.setProperty("--theme-color-5", "rgb(200, 200, 200)");
            break;
    }
}