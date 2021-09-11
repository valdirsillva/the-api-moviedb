window.addEventListener('DOMContentLoaded', function() {
    const dropdownMenu = document.getElementById('dropdown');

    dropdownMenu.addEventListener('mouseenter', showDropdownMenu);
    dropdownMenu.addEventListener('onblur', hideDropdownMenu);


    function showDropdownMenu() {
        let dropdown = document.querySelector('.dropdown-menu');
        dropdown.classList.toggle('activate');
    }

    function  hideDropdownMenu() {
        let dropdown = document.querySelector('.dropdown-menu');
        dropdown.classList.remove('activate');
    }
   
});


