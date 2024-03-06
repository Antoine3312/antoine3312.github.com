const animationDuration = 300
const burgerMenu = document.getElementById('burger_menu');

showMenu = () => {
    burgerMenu.style.animation = " slideIn ."+animationDuration+"s 0s cubic-bezier(0.9, -0.01, 0.17, 1)";
    burgerMenu.style.display = "flex";

}

closeMenu = () => {
    
    burgerMenu.style.animation = " slideOut ."+animationDuration+"s 0s cubic-bezier(0.9, 0, 0.22, 1)";
    setTimeout(() => {
        burgerMenu.style.display = "none";
    }, animationDuration)
}