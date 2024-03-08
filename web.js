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


openProject = (project_id) => {
    document.getElementById("project_"+project_id).style.height = "1600px"
    document.getElementById("project_"+project_id).style.padding = "50px"
    document.getElementById("img_p"+project_id).style.height = "550px"
    document.getElementById("img_p"+project_id).style.left = "50%"
    document.getElementById("img_p"+project_id).style.transform = "translate(-50%,0)"
    document.getElementById("img_p"+project_id).style.background = "#FFE54B"
    document.getElementById("img_p"+project_id).style.borderRadius = "32px"
    document.getElementById("project_info_p"+project_id).style.position = "relative"
    document.getElementById("project_info_p"+project_id).style.left = "0"
    document.getElementById("project_info_p"+project_id).style.top = "600px"
    document.getElementById("project_info_p"+project_id).style.padding = "0"
    document.getElementById("project_info_p"+project_id).style.width = "100%"
    document.getElementById("project_info_p"+project_id).style.height = "60%"
    document.getElementById("plus_p"+project_id).style.display = "none"
    document.getElementById("minus_p"+project_id).style.display = "block"
    document.getElementById("wrapper_project_data_p"+project_id).style.animation = "fadeIn .3s .1s cubic-bezier(0, 0, 0.58, 1) forwards"
    document.getElementById("wrapper_dot_p"+project_id).style.animation = "fadeIn .3s .3s cubic-bezier(0, 0, 0.58, 1) forwards"
}

closeProject = (project_id) => {
    document.getElementById("project_"+project_id).style.height = ""
    document.getElementById("project_"+project_id).style.padding = ""
    document.getElementById("img_p"+project_id).style.height = ""
    document.getElementById("img_p"+project_id).style.left = ""
    document.getElementById("img_p"+project_id).style.transform = ""
    document.getElementById("img_p"+project_id).style.background = ""
    document.getElementById("img_p"+project_id).style.borderRadius = ""
    document.getElementById("project_info_p"+project_id).style.position = ""
    document.getElementById("project_info_p"+project_id).style.left = ""
    document.getElementById("project_info_p"+project_id).style.top = ""
    document.getElementById("project_info_p"+project_id).style.padding = ""
    document.getElementById("project_info_p"+project_id).style.width = ""
    document.getElementById("project_info_p"+project_id).style.height = ""
    document.getElementById("plus_p"+project_id).style.display = ""
    document.getElementById("minus_p"+project_id).style.display = ""
    document.getElementById("wrapper_project_data_p"+project_id).style.animation = "fadeOut .1s ease-in forwards"
    document.getElementById("wrapper_dot_p"+project_id).style.animation = "fadeOut .1s ease-in forwards"
}