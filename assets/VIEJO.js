var win           = $(window),
    body          = $('body'),
    btnMenu       = $(".navbar-toggler"),
    contentFP     = $('#content-fullpage'),
    navbar        = $('.navbar'),
    navbarToggler = $('.navbar-toggler span'),
    logoHeader    = $('#logo-header1'),
    sideMenu      = $("#sidenav-menu"),
    linkSideMenu  = $('#sidenav-menu li'),
    sectionInicio = $('#inicio'),
    trabajo       = $('.trabajo'),
    modal         = $('#modal'),
    modalSection  = $('#modal .section'),
    btnCloseModal = $('#btn-close'),
    btnMas        = $("#btn-mas"),
    btnEnviar     = $('#btn-enviar'),
    datos         = {};
/*
FIXME: 

- trabajo.inactivo lo hace una vez, luego no lo quita

*/

function moverSomos() {
    let somos = $('#section-somos');
    somos.find('.fp-slidesNav.fp-bottom').appendTo('#section-somos .w-60');
    somos.find('.fp-controlArrow').appendTo('#section-somos .fp-slides');
}

// function fondoGradiente(origen, destino) {
//     if ((destino == 0) || (destino == 2 && origen == 0)) {
//         body.removeClass().addClass('bg-gradient-0');
//     }
//     if ((origen == 2 && destino == 3) || (origen == 3 && destino == 2)) {
//         body.removeClass().addClass('bg-gradient-2');
//     }
//     if ((origen == 3 && destino == 4) || (origen == 4 && destino == 3)) {
//         body.removeClass().addClass('bg-gradient-3');
//     }
//     if ((origen == 4 && destino == 5) || (origen == 5 && destino == 4)) {
//         body.removeClass().addClass('bg-gradient-4');
//     }
// }

// function fondoHeader(origen, destino) {
//     if ((origen == 0 && destino == 2) || (origen == 2 && destino == 0)) {
//         navbar.removeClass().addClass('navbar bg-0 shadow-0')
//     }
//     if ((origen == 2 && destino == 3) || (origen == 3 && destino == 2)) {
//         navbar.removeClass().addClass('navbar bg-2 shadow-2')
//     }
//     if ((origen == 3 & destino == 4) || (origen == 4 && destino == 3)) {
//         navbar.removeClass().addClass('navbar bg-3 shadow-3')
//     }
//     if ((origen == 4 && destino == 5) || (origen == 5 && destino == 4)) {
//         navbar.removeClass().addClass('navbar bg-4 shadow-4')
//     }
// }

function bgBodyNavbar(origen, destino) {
    if ((origen == 0 && destino == 2) || (origen == 2 && destino == 0)) {
        body.removeClass().addClass('bg-gradient-0')
        navbar.removeClass().addClass('navbar bg-0 shadow-0')
    }
    if ((origen == 2 && destino == 3) || (origen == 3 && destino == 2)) {
        body.removeClass().addClass('bg-gradient-2')
        navbar.removeClass().addClass('navbar bg-2 shadow-2')
    }
    if ((origen == 3 & destino == 4) || (origen == 4 && destino == 3)) {
        body.removeClass().addClass('bg-gradient-3')
        navbar.removeClass().addClass('navbar bg-3 shadow-3')
    }
    if ((origen == 4 && destino == 5) || (origen == 5 && destino == 4)) {
        body.removeClass().addClass('bg-gradient-4');
        navbar.removeClass().addClass('navbar bg-4 shadow-4')
    }
}

function trabajosMovil() {
    let tmov = $('#t-movil');
    tmov.toggleClass('d-none mas d-flex');
    let ct = $('#container-trabajos');
    ct.append('<div id="div-temp"></div>');
    let aux      = ct.find('.trabajo.movil'),
        divMovil = $('#div-temp');
    divMovil.append(aux);
    aux = divMovil.find('.movil');
    for (let item = 1; item <= (aux.length / 3); item++) {
        tmov.after('<div id="' + item + '" class="mas d-none"></div>');
        for (let i = 1; i <= 3; i++) {
            $('#container-trabajos #' + item).append(divMovil.find('.movil:first-child'));
        }
    }
    divMovil.remove();
    let inactivos = $('.trabajo.inactivo').length
    if (inactivos > 1) {
        ct.find('.mas:last-child').remove()
    }
    if (inactivos % 2) {
        ct.find('.trabajo').addClass('w-50');
    }
}

function crearFullpage() {
    contentFP.fullpage({
        // menu: '#sidenav-menu ul',
        // anchors: ['', '', '', '', ''],
        slidesNavigation: true,
        // scrollHorizontally: true,
        // loopBottom: true, // va al inicio luego de dar scroll en el final
        scrollOverflow: true,
        // Muestra o oculta el logo header de Ogilvy
        onLeave: function (origin, destination, direction) {
            var leavingSection = this;
            if (destination.index == 0) {
                logoHeader.addClass('hidden');
                navbarToggler.toggleClass('bg-0');
            }
            if (origin.index == 3 || destination.index == 3) {
                $('#section-servicios .slide').removeClass('active');
                $('#section-servicios .slide:first-of-type').addClass('active');
            }
            // fondoGradiente(origin.index, destination.index);
            // fondoHeader(origin.index, destination.index);
            bgBodyNavbar(origin.index, destination.index);
        },
        afterLoad: function (origin, destination, direction) {
            var loadedSection = this;
            if (destination.index != 0) {
                logoHeader.removeClass('hidden');
                navbarToggler.addClass('bg-0');
            }
            if (destination.index != 1) {
                let aux = 'bg-' + destination.index;
                body.removeClass().addClass(aux);
                navbar.removeClass().addClass('navbar')
            }
            if (modal.hasClass('show') == true) {
                navbar.addClass('z-index-0');
            }
        },
        // Para auto mover los slides
        // afterRender: function () {
        //     setInterval(function () {
        //         $.fn.fullpage.moveSlideRight();
        //     }, 3000);
        // }
    });
    moverSomos();
}

function clickTrabajo(actual) {
    fullpage_api.destroy('all');
    modalSection.find(actual).toggleClass('slide d-none')
    crearFullpage();
    fullpage_api.setAllowScrolling(false);
    fullpage_api.silentMoveTo(3);
    modal.show();
    modal.addClass('show');
    console.clear();
}

function clickMas(btn) {
    console.log(btn.hasClass('open'))
    btn.toggleClass('open');
    $('#container-trabajos .mas').toggleClass('d-none d-flex');
    if (btn.hasClass('open')) {
        $('#section-trabajos .titulo').toggleClass('pt-5 pb-3')
    }
    fullpage_api.reBuild();
}

function validarCorreo(correo) {
    const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (!regex.test(correo))
        return false;
    return true;
}

function validarDatos() {
    let formulario = $('form'),
        form       = formulario[0],
        vd;
    for (const item of form) {
              vd       = false;
        datos[item.id] = item.value;
        if (item.id != "btn-enviar" && item.value !== "") {
            vd = true;
            if (item.id == "correo") {
                vd = validarCorreo(item.value);
            }
        }
        let aux = formulario.find('#' + item.id);
        if (vd == true) {
            aux.removeClass('is-invalid');
        } else {
            aux.addClass('is-invalid');
        }
    }
    return vd;
}

crearFullpage();

$(document).ready(function (e) {
    win.resize(function () {
        location.reload();
    });
    if (win.width() < 736) {
        trabajosMovil();
        btnMas.removeAttr('onclick');
        btnMas.on('click', function () {
            console.log($(this).hasClass('open'))
            $(this).toggleClass('open');
            $('#container-trabajos .mas').toggleClass('d-none d-flex');
            if ($(this).hasClass('open')) {
                $('#section-trabajos .titulo').toggleClass('pt-5 pb-3')
            }
            fullpage_api.reBuild();
        });
    }
    // crearFullpage();
    // if (win.width() < 736) {
    //     btnMas.removeAttr('onclick');
    //     btnMas.on('click', function () {
    //         console.log($(this).hasClass('open'))
    //         $(this).toggleClass('open');
    //         $('#container-trabajos .mas').toggleClass('d-none d-flex');
    //         if ($(this).hasClass('open')) {
    //             $('#section-trabajos .titulo').toggleClass('pt-5 pb-3')
    //         }
    //         fullpage_api.reBuild();
    //     });
    // }
    // Boton de Menu del Navbar
    btnMenu.click(function () {
        btnMenu.toggleClass("open");
        sideMenu.toggleClass("show");
        // $('#bg-header').toggleClass("show");
        if (win.width() < 736) {
            logoHeader.toggleClass('d-none');
        }
        if ($(this).hasClass('open')) {
            fullpage_api.setAllowScrolling(false);
            $('#mapa').addClass('z-index-1');
        } else {
            fullpage_api.setAllowScrolling(true);
            $('#mapa').removeClass('z-index-1');
        }
    });

    linkSideMenu.click(function () {
        btnMenu.click();
        // fondoBody($(this).index());
        fullpage_api.moveTo($(this).index());
    });

    btnEnviar.click(function () {
        if (validarDatos()) {
            $.ajax({
                type       : "POST",
                url        : "app/enviar.php",
                data       : datos,
                dataType   : "json",
                crossDomain: true,
            })
            $('.alert').slideDown().delay(1000).slideUp();
            $('form')[0].reset();
        }
    });

    btnCloseModal.click(function () {
        modal.hide();
        modal.removeClass('show');
        modalSection.find('.slide').toggleClass('slide d-none')
        fullpage_api.setAllowScrolling(true);
        navbar.removeClass('z-index-0');
    });

    // $('#container-trabajos .trabajo.inactivo').hover(function () {
    //     $('#container-trabajos:hover .trabajo').css('opacity','1');
    //     }, function () {
    //         $('#container-trabajos:hover .trabajo').css('opacity', '.5');
    //     }
    // );
    
    
});


/*
function crearSlide(nombre, tipo, cantidad) {
    fullpage_api.destroy('all');
    let modalSection = $('#modal .section');
    modalSection.addClass(nombre);   
    modalSection.addClass(tipo);
    if (tipo == "video") {
    }
    if (tipo == "img") {
        for (let index = 0; index < cantidad; index++) {
            modalSection.append('<div class="slide bg-img"></div>');
      }
    }
    
    // fullpage_api.reBuild();
    crearFullpage();
}   
*/
/*
function validarDatos() {
    let vd           = false;
    let formContacto = $('.needs-validation');
    var validation   = Array.prototype.filter.call(formContacto, (form) => {
        form.addEventListener('submit', (e) => {
            if (form.checkValidity() === false) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
        vd = form.checkValidity()
    });
    return vd;  
}
*/