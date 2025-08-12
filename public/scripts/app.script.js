const mobileMenuElement = document.getElementById('mobile-menu-btn');
const mobileMenuList = document.getElementById('mobile-menu');


function toggleMobileMenu(){
    mobileMenuList.classList.toggle('display');
}

mobileMenuElement.addEventListener('click',toggleMobileMenu);