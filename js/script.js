document.addEventListener('DOMContentLoaded', function () {
    const shooter = document.getElementById('shooter');
    const rainContainer = document.getElementById('rain');
    const gameContainer = document.getElementById('game-container');
    const gameContainerWidth = gameContainer.offsetWidth;
    const windowWidth = window.innerWidth;
    
    let shooterPositionX = 0;
    let shooterDirection = 1;
    const shooterSpeed = 12;

    function moveShooter() {
        shooterPositionX += shooterDirection * shooterSpeed;
        if (shooterPositionX < 0) {
            shooterPositionX = 0;
            shooterDirection = 1;
        } else if (shooterPositionX > gameContainerWidth - shooter.offsetWidth) {
            shooterPositionX = gameContainerWidth - shooter.offsetWidth;
            shooterDirection = -1;
        }
        shooter.style.left = shooterPositionX + 'px';
    }

    setInterval(moveShooter, 50);

    // Función para detectar la colisión entre el corazón y la gota de lluvia
    function checkCollision(heart, raindrop) {
        const heartRect = heart.getBoundingClientRect();
        const raindropRect = raindrop.getBoundingClientRect();

        // Verifica si hay colisión en los ejes X e Y
        if (
            heartRect.left < raindropRect.right &&
            heartRect.right > raindropRect.left &&
            heartRect.top < raindropRect.bottom &&
            heartRect.bottom > raindropRect.top
        ) {
            return true; // Hay colisión
        } else {
            return false; // No hay colisión
        }
    }

   // Función para disparar el corazón desde una posición específica
    function shootHeart(mouseX, mouseY) {
        const heart = new Image();
        heart.src = 'img/heart.png'; // Ruta de la imagen del corazón
        heart.style.width = '50px'; // Establecer el ancho del corazón
        heart.style.height = '50px'; // Establecer la altura del corazón
        heart.classList.add('heart');

        // Obtener las dimensiones y posición del shooter
        const shooterRect = shooter.getBoundingClientRect();
        const shooterX = shooterRect.left + window.pageXOffset + shooter.offsetWidth / 2 - 25; // Centrar respecto al shooter
        const shooterY = shooterRect.top + window.pageYOffset; // Posición justo encima del shooter

        heart.style.left = shooterX + 'px'; // Establecer la posición en X del corazón
        heart.style.top = shooterY + 'px'; // Establecer la posición en Y del corazón

        gameContainer.appendChild(heart);

        // Animación de disparo del corazón hacia arriba
        const heartInterval = setInterval(function () {
            const currentTop = parseInt(heart.style.top);
            if (currentTop <= 0) {
                clearInterval(heartInterval);
                gameContainer.removeChild(heart);
            } else {
                heart.style.top = (currentTop - 5) + 'px'; // Velocidad de movimiento hacia arriba

                // Comprueba si hay colisión con alguna gota de lluvia
                const raindrops = document.querySelectorAll('.raindrop');
                raindrops.forEach(raindrop => {
                    if (checkCollision(heart, raindrop)) {
                        // Si hay colisión, elimina tanto el corazón como la gota de lluvia
                        gameContainer.removeChild(heart);
                        rainContainer.removeChild(raindrop);
                    }
                });
            }
        }, 20);


    }

    // Disparar corazones al hacer clic en el contenedor del juego
    gameContainer.addEventListener('click', shootHeart);

    // Crear gotas de lluvia cada cierto tiempo
    setInterval(createRaindrop, 500);
    
    // Función para crear una gota de lluvia
    function createRaindrop() {
        const raindrop = new Image();
        raindrop.src = 'img/raindrop.png'; // Ruta de la imagen de la gota de lluvia
        raindrop.classList.add('raindrop');
        raindrop.style.left = Math.random() * windowWidth + 'px'; // Posición horizontal aleatoria
        rainContainer.appendChild(raindrop);
    
        const animationDuration = Math.random() * 3 + 2; // Duración de la animación
        raindrop.style.animation = `fall ${animationDuration}s linear forwards`;
    
        raindrop.addEventListener('animationend', function () {
            rainContainer.removeChild(raindrop);
        });
    }
    

    setInterval(createRaindrop, 500); // Crear gotas de lluvia cada 0.5 segundos

    document.addEventListener('keydown', function (event) {
        if (event.key === ' ') {
            shootHeart();
        }
    });
});
