
/*=============== SideBar Show/Hide ===============*/

function sidebar(){
    let modal = document.getElementById("sidebarGmaill");
    if(modal.classList.contains('show-sidebar')){
        modal.classList.remove('show-sidebar');
        modal.classList.add('remove-sidebar');
    }else{
        modal.classList.remove('remove-sidebar');
        modal.classList.add('show-sidebar');
    }
    
}