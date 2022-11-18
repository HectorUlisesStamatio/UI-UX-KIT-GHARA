/*=============== ACTIVE LINK ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkColor(){
    navLink.forEach(link => link.classList.remove('active-link'))
    this.classList.add('active-link')
}
navLink.forEach(link => link.addEventListener('click', linkColor))


let bandera=false;

/* NOTIFICATION EXAMPLE */
function exam(){
    let modal = document.getElementById("example");
    /* If the show class exists, we remove it */
    if(modal.classList.contains('show-example')){
        modal.classList.remove('show-example');
    }else{
        /* Validation to remove the notification automatically after 3 seconds */
        if(bandera==false){
            modal.classList.add('show-example');
            setTimeout(() => {
                bandera=true;
                exam();
              }, 3000);
        }else{
            modal.classList.add('show-example');
        }
        
    }
    
}