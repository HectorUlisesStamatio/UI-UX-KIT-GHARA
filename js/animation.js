/*=============== SHOW PROFILE OPTIONS ===============*/
const showSocial = (toggleCard, socialCard) => {
    try {
        const toggle = document.getElementById(toggleCard),
            social = document.getElementById(socialCard)

        toggle.addEventListener('click', () => {
            // If the animation class exists, we add the down-animation class
            if (social.classList.contains('animation')) {
                social.classList.add('down-animation')

                // We remove the down-animation class
                setTimeout(() => {
                    social.classList.remove('down-animation')
                }, 1000)
            }

            // We add the animation class to the div tag with the card__social class
            social.classList.toggle('animation')
        })
    }catch(e){}
    
}
showSocial('card-toggle', 'card-social')

/* SHOW PROFILE MODAL */
function profile() {
    let modal = document.getElementById("profile__container");
    if (modal.classList.contains('show-modal')) {
        modal.classList.remove('show-modal');
    } else {
        modal.classList.add('show-modal');
    }

}