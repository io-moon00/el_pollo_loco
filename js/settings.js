function loadSettings() {
    const soundSetting = localStorage.getItem("sound");
    const soundCheckbox = document.getElementById("sound");
    soundCheckbox.checked = (soundSetting === "true");
}


function saveSettings() {
    const soundCheckbox = document.getElementById("sound");
    localStorage.setItem("sound", soundCheckbox.checked);
}