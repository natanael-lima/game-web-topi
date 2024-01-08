function main() {

(function () {
   'use strict';
   
  	$('a.page-scroll').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top - 40
            }, 900);
            return false;
          }
        }
      });

	// affix the navbar after scroll below header
$('#nav').affix({
      offset: {
        top: $('header').height()
      }
});	

	
  	// Portfolio isotope filter
    $(window).load(function() {
        var $container = $('.portfolio-items');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        $('.cat a').click(function() {
            $('.cat .active').removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });

    });
	

    // Nivo Lightbox 
    $('.portfolio-item a').nivoLightbox({
            effect: 'slideDown',  
            keyboardNav: true,                            
        });
 

}());


}
main();

// Muestra el spinner
var spinnerContainer = document.querySelector('.spinner-container');
spinnerContainer.style.display = 'flex';

// Oculta el spinner después de 3 segundos
setTimeout(function () {
    spinnerContainer.style.display = 'none';
    // Agrega aquí el código para mostrar el contenido después de ocultar el spinner
    // Puedes cambiar el contenido según tu estructura y necesidades
    var contentContainer = document.querySelector('#nav');
    // Cambia el z-index del menú a 1
    contentContainer.style.zIndex = '9999';
}, 1300); // 3000 milisegundos = 3 segundos

/* 
// para el navegador
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("nav");

  // Evento para cambiar la clase al desplazar la página
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled"); // Agrega la clase "scrolled" al desplazar
    } else {
      navbar.classList.remove("scrolled"); // Quita la clase "scrolled" cuando está en la parte superior
    }
  });
});
#nav.scrolled {
	background-color: white;
	color: #0D411C;
  }
  
#nav.scrolled .navbar-custom a {
	color: #0D411C;  
  }*/
  