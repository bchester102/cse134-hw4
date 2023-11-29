let currentState = true;

document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('header').prepend(document.createElement('button'));
    let toggleButton = document.querySelector('header button');

    currentState = localStorage.getItem('darkMode');
    if (currentState == null){
        localStorage.setItem('darkMode', 'true');
    }
    else if (currentState == 'true'){
        setDarkMode();
    }
    else{
        setLightMode();
    }

    toggleButton.addEventListener('click', () => {
        if (currentState == false){
            setDarkMode();
        }else{
            setLightMode();
        }
    })




})

function setLightMode(){
    currentState = false;
    localStorage.setItem('darkMode', 'false');
    document.querySelector('header > button').textContent = '☀️';
    document.querySelector('body').style.backgroundColor = 'var(--light_mode_background_color)';
    document.querySelector(':root').style.setProperty('--text-color', 'black');
}

function setDarkMode(){
    currentState = true;
    localStorage.setItem('darkMode', 'true');
    document.querySelector('header > button').textContent = '🌙';
    document.querySelector('body').style.backgroundColor = 'var(--main_background_color)';
    document.querySelector(':root').style.setProperty('--text-color', 'whitesmoke');
}