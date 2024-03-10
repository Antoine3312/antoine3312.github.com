const animationDuration = 300
const burgerMenu = document.getElementById('burger_menu');
showMenu = () => {
    burgerMenu.style.animation = " slideIn ." + animationDuration + "s 0s cubic-bezier(0.9, -0.01, 0.17, 1)";
    burgerMenu.style.display = "flex";
}
closeMenu = () => {
    burgerMenu.style.animation = " slideOut ." + animationDuration + "s 0s cubic-bezier(0.9, 0, 0.22, 1)";
    setTimeout(() => {
        burgerMenu.style.display = "none";
    }, animationDuration)
    document.body.style.height = ""
    document.body.style.overflow = ""
}


openProject = (project_id) => {
    document.getElementById("project_" + project_id).style.height = "1600px"
    document.getElementById("project_" + project_id).style.padding = "50px"
    document.getElementById("img_p" + project_id).style.height = "550px"
    document.getElementById("img_p" + project_id).style.width = "837px"
    document.getElementById("img_p" + project_id).style.left = "50%"
    document.getElementById("img_p" + project_id).style.transform = "translate(-50%,0)"
    // document.getElementById("img_p"+project_id).style.background = "#FFE54B"
    // document.getElementById("img_p"+project_id).style.borderRadius = "32px"
    document.getElementById("project_info_p" + project_id).style.position = "relative"
    document.getElementById("project_info_p" + project_id).style.left = "0"
    document.getElementById("project_info_p" + project_id).style.top = "600px"
    document.getElementById("project_info_p" + project_id).style.padding = "0"
    document.getElementById("project_info_p" + project_id).style.width = "100%"
    document.getElementById("project_info_p" + project_id).style.height = "60%"
    document.getElementById("plus_p" + project_id).style.display = "none"
    document.getElementById("minus_p" + project_id).style.display = "block"
    document.getElementById("wrapper_dot_p" + project_id).style.animation = "fadeIn .3s .3s cubic-bezier(0, 0, 0.58, 1) forwards"
    setTimeout(() => {
        document.getElementById("wrapper_project_data_p" + project_id).style.display = "grid"
        document.getElementById("img_p" + project_id).style.overflow = "visible"
        document.getElementById("img_p" + project_id).style.transition = "none"
        document.getElementById("navigation_caroussel_right_p" + project_id).style.display = "block"
    }, 200)
}

closeProject = (project_id) => {
    // changePannel(project_id, 1, 0)
    document.getElementById("project_" + project_id).style.height = ""
    document.getElementById("project_" + project_id).style.padding = ""
    document.getElementById("img_p" + project_id).style.height = ""
    document.getElementById("img_p" + project_id).style.left = ""
    document.getElementById("img_p" + project_id).style.transform = ""
    document.getElementById("img_p" + project_id).style.overflow = ""
    document.getElementById("img_p" + project_id).style.background = ""
    document.getElementById("img_p" + project_id).style.borderRadius = ""
    document.getElementById("project_info_p" + project_id).style.position = ""
    document.getElementById("project_info_p" + project_id).style.left = ""
    document.getElementById("project_info_p" + project_id).style.top = ""
    document.getElementById("project_info_p" + project_id).style.padding = ""
    document.getElementById("project_info_p" + project_id).style.width = ""
    document.getElementById("project_info_p" + project_id).style.height = ""
    document.getElementById("plus_p" + project_id).style.display = ""
    document.getElementById("minus_p" + project_id).style.display = ""
    document.getElementById("wrapper_project_data_p" + project_id).style.display = "none"
    document.getElementById("wrapper_dot_p" + project_id).style.animation = "fadeOut .1s ease-in forwards"
    document.getElementById("img_p" + project_id).style.transition = ""
    document.getElementById("navigation_caroussel_right_p" + project_id).style.display = ""
}


const positionOfCaroussels = [1, 1]



changePannel = (project_id, positionWanted, duration = 0.7) => {
    gsap.to(".caroussel_p" + project_id, {
        x: -1 * (positionWanted - 1) * (document.getElementById("caroussel_p" + project_id).offsetWidth / 3),
        duration: duration,
        ease: "power3.out",
    })
    positionOfCaroussels[project_id - 1] = positionWanted;
    updateDisplayNavigationArrow(project_id)
    updateCarousselDot(project_id)
}


changePannelRight = (project_id) => {
    changePannel(project_id, positionOfCaroussels[project_id - 1] + 1)
    updateDisplayNavigationArrow(project_id);
}
changePannelLeft = (project_id) => {
    changePannel(project_id, positionOfCaroussels[project_id - 1] - 1)
    updateDisplayNavigationArrow(project_id);
}

updateDisplayNavigationArrow = (project_id) => {
    const amoutImage = document.getElementsByClassName("caroussel_image_p"+project_id).length
    if (positionOfCaroussels[project_id - 1] === amoutImage) {
        document.getElementById("navigation_caroussel_right_p"+project_id).style.display = "none";
        document.getElementById("navigation_caroussel_left_p"+project_id).style.display = "block";
    } else if(positionOfCaroussels[project_id - 1] === 1){
        document.getElementById("navigation_caroussel_right_p"+project_id).style.display = "block";
        document.getElementById("navigation_caroussel_left_p"+project_id).style.display = "none";
    } else {
        document.getElementById("navigation_caroussel_right_p"+project_id).style.display = "block";
        document.getElementById("navigation_caroussel_left_p"+project_id).style.display = "block";
    }
}

updateCarousselDot = (project_id) => {
    const dotList = document.getElementsByClassName("dot_p"+project_id);
    for (let i = 0; i < dotList.length; i++) {
        if (i + 1 === positionOfCaroussels[project_id - 1]) {
            dotList[i].style.opacity = "100%";
        } else {
            dotList[i].style.opacity = "30%";
        }
    }
}