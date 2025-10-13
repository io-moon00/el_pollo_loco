function loadSettings() {
    const soundSetting = localStorage.getItem("sound");
    const soundCheckbox = document.getElementById("sound");
    soundCheckbox.checked = (soundSetting === "true");

    const musicSetting = localStorage.getItem("music");
    const musicCheckbox = document.getElementById("music");
    musicCheckbox.checked = (musicSetting === "true");
}

function isMusicActivated() {
    const musicSetting = localStorage.getItem("music");
    return musicSetting;
}

function isSoundActivated() {
    const soundSetting = localStorage.getItem("sound");
    if (soundSetting == "true") {
        return true;
    } else {
        return false;
    }
}


function saveSettings() {
    const soundCheckbox = document.getElementById("sound");
    localStorage.setItem("sound", soundCheckbox.checked);

    const musicCheckbox = document.getElementById("music");
    localStorage.setItem("music", musicCheckbox.checked);
}