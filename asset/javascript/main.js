/*----------------------------------
#Home page
----------------------------------*/

document.addEventListener('DOMContentLoaded', () => {
    const homeImage = document.querySelectorAll('.home-bg');
    const circles = document.querySelectorAll('.circle');
    let currentIndex = 0;

    function showItem(index) {
        homeImage[currentIndex].style.display = 'none';
        circles[currentIndex].classList.remove('act');
        homeImage[index].style.display = 'block';
        circles[index].classList.add('act');
        currentIndex = index;
    }

    function showNextItem() {
        const nextIndex = (currentIndex + 1) % homeImage.length;
        showItem(nextIndex);
    }

    function showPreviousItem() {
        const prevIndex = (currentIndex - 1 + homeImage.length) % homeImage.length;
        showItem(prevIndex);
    }

    function goToItem(index) {
        showItem(index);
    }

    // Initial display setup
    homeImage.forEach((item, index) => {
        if (index !== currentIndex) {
            item.style.display = 'none';
        }
    });

    circles.forEach((circle, index) => {
        circle.addEventListener('click', () => {
            goToItem(index);
        });
    });

    // Auto-scroll functionality
    setInterval(showNextItem, 5000);
});

/*----------------------------------
#Menu
----------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
    const list = document.querySelector('.header-list ul');
    const exit = document.querySelector('.exit');
    const menuIcon = document.querySelector('.menu-icon');
    const overlay = document.querySelector('.overlay');
    const menuItems = document.querySelectorAll('.header-list ul li a');

    // if (!list) console.error('List element not found');
    // if (!exit) console.error('Exit element not found');
    // if (!menuIcon) console.error('Menu icon element not found');
    // if (!overlay) console.error('Overlay element not found');

    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            list.classList.add('active');
            overlay.classList.add('active');
            menuIcon.style.display = 'none';
            exit.style.display = 'flex';
        });
    }

    if (exit) {
        exit.addEventListener('click', () => {
            list.classList.remove('active');
            overlay.classList.remove('active');
            exit.style.display = 'none';
            menuIcon.style.display = 'block';
        });
    }

    menuItems.forEach((item) => {
        item.addEventListener('click', () => {
            list.classList.remove('active');
            overlay.classList.remove('active');
            exit.style.display = 'none';
            menuIcon.style.display = 'block';
        });
    });
});

/*------------------------------
#For the header
/-----------------------------*/
jQuery(function ($) {
    const $header = $('.header');
    $(window).scroll(function (event) {
        const $current = $(this).scrollTop();
        if ($current > 160) {
            $header.addClass('header-color');
        } else {
            $header.removeClass('header-color');
        }
    });
});


/*------------------------------
#Browser
/-----------------------------*/

const browserItem = document.querySelector('.browser-item');
const members = document.querySelectorAll('.browser-item .member');
const leftChevron = document.querySelector('.left-icon');
const rightChevron = document.querySelector('.right-icon');

let currentStartIndex = 0;
let visibleCount = getVisibleCount(); // Initialiser le nombre d'éléments visibles

// Fonction pour obtenir visibleCount selon la taille d'écran
function getVisibleCount() {
    if (window.innerWidth >= 1230) {
        return 4; // Ordinateur large
    } else if (window.innerWidth >= 970) {
        return 3; // Ordinateur moyen
    } else if (window.innerWidth >= 560) {
        return 2; // Tablette
    } else {
        return 1; // Mobile
    }
}

// Fonction pour mettre à jour la visibilité des membres
function updateVisibility() {
    members.forEach((member, index) => {
        // Affiche les membres selon currentStartIndex
        member.style.display = (index >= currentStartIndex && index < currentStartIndex + visibleCount) ? 'block' : 'none';
    });

    // Mettre à jour l'affichage des chevrons
    leftChevron.style.display = (currentStartIndex > 0) ? 'flex' : 'none';
    rightChevron.style.display = (currentStartIndex + visibleCount < members.length) ? 'flex' : 'none';
}

// Écouteur pour le bouton Next
rightChevron.addEventListener('click', () => {
    // Vérifier si on peut avancer
    if (currentStartIndex + 1 < members.length) { // Incrémenter l'index pour faire défiler un seul élément
        currentStartIndex++;
        updateVisibility();
    }
});

// Écouteur pour le bouton Prev
leftChevron.addEventListener('click', () => {
    // Vérifier si on peut reculer
    if (currentStartIndex > 0) {
        currentStartIndex--;
        updateVisibility();
    }
});

// Mise à jour du nombre d'éléments visibles au redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    visibleCount = getVisibleCount();
    currentStartIndex = 0; // Réinitialise pour revenir au début de la liste
    updateVisibility();
});

// Initialiser la visibilité au chargement de la page
updateVisibility();

/*------------------------------
#Faq
/-----------------------------*/

document.addEventListener('DOMContentLoaded', () => {
    const answers = document.querySelectorAll('.faq-answer');
    const rightIcons = document.querySelectorAll('.right');
    const downIcons = document.querySelectorAll('.down');

    answers.forEach((answer, i) => {
        const state = localStorage.getItem(`faq-answer-${i}`);
        if (state === 'open') {
            answer.style.display = 'block';
            rightIcons[i].style.display = 'none';
            downIcons[i].style.display = 'inline';
        } else {
            answer.style.display = 'none';
            rightIcons[i].style.display = 'inline';
            downIcons[i].style.display = 'none';
        }
    });
});

document.querySelectorAll('.faq-question').forEach((question, index) => {
    question.addEventListener('click', () => {
        const answers = document.querySelectorAll('.faq-answer');
        const rightIcons = document.querySelectorAll('.right');
        const downIcons = document.querySelectorAll('.down');

        answers.forEach((answer, i) => {
            if (i === index) {

                if (answer.style.display === 'none') {
                    answer.style.display = 'block';
                    rightIcons[i].style.display = 'none';
                    downIcons[i].style.display = 'inline';
                    localStorage.setItem(`faq-answer-${i}`, 'open');
                } else {
                    answer.style.display = 'none';
                    rightIcons[i].style.display = 'inline';
                    downIcons[i].style.display = 'none';
                    localStorage.setItem(`faq-answer-${i}`, 'closed');
                }
            } else {
                answer.style.display = 'none';
                rightIcons[i].style.display = 'inline';
                downIcons[i].style.display = 'none';
                localStorage.setItem(`faq-answer-${i}`, 'closed');
            }
        });
    });
});

document.querySelectorAll('.faq-answer').forEach(answer => {
    answer.style.display = 'none';
});

document.querySelectorAll('.down').forEach(downIcon => {
    downIcon.style.display = 'none';
});

document.querySelectorAll('.right').forEach(rightIcon => {
    rightIcon.style.display = 'inline';
});

// -----------------------------
function showDropdown() {
    document.getElementById("dropdown-content").style.display = "block";
}

function selectOption(value) {
    document.getElementById("dropdown-input").value = value;
    document.getElementById("dropdown-content").style.display = "none";
}

// Fermer la liste déroulante si l'utilisateur clique en dehors
document.addEventListener("click", function(event) {
    if (!event.target.closest(".dropdown")) {
        document.getElementById("dropdown-content").style.display = "none";
    }
});