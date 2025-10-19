/**
 * Loads the sound and music settings from localStorage and updates the UI checkboxes.
 * It retrieves the 'sound' and 'music' values and sets the 'checked' property
 * of the corresponding input elements based on the stored values.
 */
function loadSettings() {
    const soundSetting = localStorage.getItem("sound");
    const soundCheckbox = document.getElementById("sound");
    soundCheckbox.checked = (soundSetting === "true");

    const musicSetting = localStorage.getItem("music");
    const musicCheckbox = document.getElementById("music");
    musicCheckbox.checked = (musicSetting === "true");
}


/**
 * Checks if the music setting is activated in localStorage.
 * It retrieves the 'music' value from localStorage and determines if it is set to "true".
 * @returns {boolean} Returns `true` if the music setting is "true", otherwise `false`.
 */
function isMusicActivated() {
    const musicSetting = localStorage.getItem("music");
    return musicSetting === "true" ? true : false;
}

/**
 * Checks if the sound setting is activated in localStorage.
 * It retrieves the 'sound' value from localStorage and determines if it is set to "true".
 * @returns {boolean} Returns `true` if the sound setting is "true", otherwise `false`.
 */
function isSoundActivated() {
    const soundSetting = localStorage.getItem("sound");
    return soundSetting === "true" ? true : false;
}


/**
 * Saves the current sound and music settings to localStorage.
 * It retrieves the 'checked' state of the sound and music checkboxes
 * and stores these boolean values in localStorage under the keys 'sound' and 'music'.
 */
function saveSettings() {
    const soundCheckbox = document.getElementById("sound");
    localStorage.setItem("sound", soundCheckbox.checked);

    const musicCheckbox = document.getElementById("music");
    localStorage.setItem("music", musicCheckbox.checked);
}


document.addEventListener('DOMContentLoaded', () => {
    const muteBtn = document.getElementById('mute-btn');
    if (muteBtn) {
        muteBtn.addEventListener('click', toggleMute);
    }

});

function isMuted() {
    const soundSetting = localStorage.getItem("sound");
    const musicSetting = localStorage.getItem("music");
    return (soundSetting === "false" && musicSetting === "false");
}

function toggleMute() {
    let muted = isMuted();
    muted = !muted;
    const soundOnIcon = document.querySelector('.sound-on');
    const soundOffIcon = document.querySelector('.sound-off');
    
    if (muted) {
        soundOnIcon.classList.add('d-none');
        soundOffIcon.classList.remove('d-none');
        // Mute all current playing sounds
        localStorage.setItem('sound', 'false');
        localStorage.setItem('music', 'false');
    } else {
        soundOnIcon.classList.remove('d-none');
        soundOffIcon.classList.add('d-none');

        localStorage.setItem('sound', 'true');
        localStorage.setItem('music', 'true');
    }
    
}

function setMuted() {
    const muted = isMuted();
    const soundOnIcon = document.querySelector('.sound-on');
    const soundOffIcon = document.querySelector('.sound-off');

    if (muted) {
        soundOnIcon.classList.add('d-none');
        soundOffIcon.classList.remove('d-none');
    } else {
        soundOnIcon.classList.remove('d-none');
        soundOffIcon.classList.add('d-none');
    }
}
