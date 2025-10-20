/**
 * Loads the sound and music settings from localStorage and updates the UI checkboxes.
 * It retrieves the 'sound' and 'music' values and sets the 'checked' property
 * of the corresponding input elements based on the stored values.
 * @returns {void}
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
 * @returns {void}
 */
function saveSettings() {
    const soundCheckbox = document.getElementById("sound");
    localStorage.setItem("sound", soundCheckbox.checked);

    const musicCheckbox = document.getElementById("music");
    localStorage.setItem("music", musicCheckbox.checked);
}

/**
 * Sets up an event listener that runs when the DOM is fully loaded.
 * It finds the mute button by its ID and attaches a click event listener
 * to it, which calls the `toggleMute` function.
 * @returns {void}
 */
document.addEventListener('DOMContentLoaded', () => {
    const muteBtn = document.getElementById('mute-btn');
    if (muteBtn) {
        muteBtn.addEventListener('click', toggleMute);
    }

});

/**
 * Checks if both sound and music are muted in localStorage.
 * It retrieves the 'sound' and 'music' settings and returns true only if both are set to "false".
 * @returns {boolean} Returns `true` if both sound and music are muted, otherwise `false`.
 */
function isMuted() {
    const soundSetting = localStorage.getItem("sound");
    const musicSetting = localStorage.getItem("music");
    return (soundSetting === "false" && musicSetting === "false");
}

function handleMute() {
    const soundOnIcon = document.querySelector('.sound-on');
    const soundOffIcon = document.querySelector('.sound-off');
    soundOnIcon.classList.add('d-none');
    soundOffIcon.classList.remove('d-none');
    localStorage.setItem('sound', 'false');
    localStorage.setItem('music', 'false');
}

function handleUnmute() {
    const soundOnIcon = document.querySelector('.sound-on');
    const soundOffIcon = document.querySelector('.sound-off');
    soundOnIcon.classList.remove('d-none');
    soundOffIcon.classList.add('d-none');
    localStorage.setItem('sound', 'true');
    localStorage.setItem('music', 'true');
}

/**
 * Toggles the global mute state for both sound and music.
 * It updates the UI to show the correct sound icon (on/off) and
 * saves the new state to localStorage. When muting, both 'sound' and 'music'
 * are set to 'false'. When unmuting, they are both set to 'true'.
 * @returns {void}
 */
function toggleMute() {
    let muted = isMuted();
    muted = !muted;
    
    if (muted) {
        handleMute();
    } else {
        handleUnmute();
    }
}

/**
 * Sets the visual state of the mute button based on the current sound settings.
 * It checks if the sound and music are muted and updates the UI to display
 * either the 'sound on' or 'sound off' icon accordingly.
 * @returns {void}
 */
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
