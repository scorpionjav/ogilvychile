var win = $(window),
    body = $('body'),
    btnMenu = $('.navbar-toggler'),
    contentFP = $('#content-fullpage'),
    navbar = $('.navbar'),
    navbarToggler = $('.navbar-toggler span'),
    logoHeader = $('#logo-header1'),
    sideMenu = $('#sidenav-menu'),
    linkSideMenu = $('#sidenav-menu li'),
    sectionInicio = $('#inicio'),
    trabajo = $('.trabajo'),
    modal = $('#modal'),
    modalSection = $('#modal .section'),
    btnCloseModal = $('#btn-close'),
    btnMas = $('#btn-mas'),
    btnEnviar = $('#btn-enviar'),
    datos = {};

function moverSomos() {
    let a = $('#section-somos');
    a.find('.fp-slidesNav.fp-bottom').appendTo('#section-somos .w-60'), a.find('.fp-controlArrow').appendTo('#section-somos .fp-slides')
}

function bgBodyNavbar(a, b) {
    (0 == a && 2 == b || 2 == a && 0 == b) && (body.removeClass().addClass('bg-gradient-0'), navbar.removeClass().addClass('navbar bg-0 shadow-0')), (2 == a && 3 == b || 3 == a && 2 == b) && (body.removeClass().addClass('bg-gradient-2'), navbar.removeClass().addClass('navbar bg-2 shadow-2')), (3 == a & 4 == b || 4 == a && 3 == b) && (body.removeClass().addClass('bg-gradient-3'), navbar.removeClass().addClass('navbar bg-3 shadow-3')), (4 == a && 5 == b || 5 == a && 4 == b) && (body.removeClass().addClass('bg-gradient-4'), navbar.removeClass().addClass('navbar bg-4 shadow-4'))
}

function trabajosMovil() {
    let a = $('#t-movil');
    a.toggleClass('d-none mas d-flex');
    let b = $('#container-trabajos');
    b.append('<div id="div-temp"></div>');
    let c = b.find('.trabajo.movil'),
        d = $('#div-temp');
    d.append(c), c = d.find('.movil');
    for (let g = 1; g <= c.length / 3; g++) {
        a.after('<div id="' + g + '" class="mas d-none"></div>');
        for (let h = 1; 3 >= h; h++) $('#container-trabajos #' + g).append(d.find('.movil:first-child'))
    }
    d.remove();
    let f = $('.trabajo.inactivo').length;
    1 < f && b.find('.mas:last-child').remove(), f % 2 && b.find('.trabajo').addClass('w-50')
}

function crearFullpage() {
    contentFP.fullpage({
        slidesNavigation: !0,
        scrollOverflow: !0,
        onLeave: function (a, b) {
            this;
            0 == b.index && (logoHeader.addClass('hidden'), navbarToggler.toggleClass('bg-0')), (3 == a.index || 3 == b.index) && ($('#section-servicios .slide').removeClass('active'), $('#section-servicios .slide:first-of-type').addClass('active')), bgBodyNavbar(a.index, b.index)
        },
        afterLoad: function (a, b) {
            this;
            if (0 != b.index && (logoHeader.removeClass('hidden'), navbarToggler.addClass('bg-0')), 1 != b.index) {
                let f = 'bg-' + b.index;
                body.removeClass().addClass(f), navbar.removeClass().addClass('navbar')
            }!0 == modal.hasClass('show') && navbar.addClass('z-index-0')
        }
    }), moverSomos()
}

function clickTrabajo(a) {
    fullpage_api.destroy('all'), modalSection.find(a).toggleClass('slide d-none'), crearFullpage(), fullpage_api.setAllowScrolling(!1), fullpage_api.silentMoveTo(3), modal.show(), modal.addClass('show'), console.clear()
}

function clickMas(a) {
    console.log(a.hasClass('open')), a.toggleClass('open'), $('#container-trabajos .mas').toggleClass('d-none d-flex'), a.hasClass('open') && $('#section-trabajos .titulo').toggleClass('pt-5 pb-3'), fullpage_api.reBuild()
}

function validarCorreo(a) {
    const b = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return !!b.test(a)
}

function validarDatos() {
    let c, a = $('form'),
        b = a[0];
    for (const d of b) {
        c = !1, datos[d.id] = d.value, 'btn-enviar' != d.id && '' !== d.value && (c = !0, 'correo' == d.id && (c = validarCorreo(d.value)));
        let f = a.find('#' + d.id);
        !0 == c ? f.removeClass('is-invalid') : f.addClass('is-invalid')
    }
    return c
}
crearFullpage(), $(document).ready(function () {
    win.resize(function () {
        location.reload()
    }), 736 > win.width() && (trabajosMovil(), btnMas.removeAttr('onclick'), btnMas.on('click', function () {
        console.log($(this).hasClass('open')), $(this).toggleClass('open'), $('#container-trabajos .mas').toggleClass('d-none d-flex'), $(this).hasClass('open') && $('#section-trabajos .titulo').toggleClass('pt-5 pb-3'), fullpage_api.reBuild()
    })), btnMenu.click(function () {
        btnMenu.toggleClass('open'), sideMenu.toggleClass('show'), 736 > win.width() && logoHeader.toggleClass('d-none'), $(this).hasClass('open') ? (fullpage_api.setAllowScrolling(!1), $('#mapa').addClass('z-index-1')) : (fullpage_api.setAllowScrolling(!0), $('#mapa').removeClass('z-index-1'))
    }), linkSideMenu.click(function () {
        btnMenu.click(), fullpage_api.moveTo($(this).index())
    }), btnEnviar.click(function () {
        validarDatos() && ($.ajax({
            type: 'POST',
            url: 'app/enviar.php',
            data: datos,
            dataType: 'json',
            crossDomain: !0
        }), $('.alert').slideDown().delay(1e3).slideUp(), $('form')[0].reset())
    }), btnCloseModal.click(function () {
        modal.hide(), modal.removeClass('show'), modalSection.find('.slide').toggleClass('slide d-none'), fullpage_api.setAllowScrolling(!0), navbar.removeClass('z-index-0')
    })
});