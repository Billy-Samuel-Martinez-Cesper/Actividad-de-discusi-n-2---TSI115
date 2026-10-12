// ==========================================================
// JAVASCRIPT ROBUSTO Y GARANTIZADO PARA LA PÁGINA WEB
// Universidad de El Salvador - Teoría de Sistemas
// Estudiantes:
// - Billy Samuel Martinez Cesper (MC19049)
// - Angelo Jeremias Barrientos Serrano (BS26003)
// Grupo de Trabajo: 01 | Grupo Teórico: 22
// ==========================================================

// 1. FUNCIÓN PARA CAMBIAR PESTAÑAS (TABS)
function cambiarPestana(idTab, boton) {
  const botonesTabs = document.querySelectorAll('.btn-tab');
  const contenidosTabs = document.querySelectorAll('.tab-contenido');

  botonesTabs.forEach(b => b.classList.remove('activo'));
  contenidosTabs.forEach(c => c.classList.remove('activo'));

  if (boton) {
    boton.classList.add('activo');
  } else {
    const btnActivo = document.querySelector(`.btn-tab[data-tab="${idTab}"]`);
    if (btnActivo) btnActivo.classList.add('activo');
  }

  const elementoObjetivo = document.getElementById(idTab);
  if (elementoObjetivo) {
    elementoObjetivo.classList.add('activo');
  }
}

// 2. FUNCIONES PARA EL MODAL DE LA IMAGEN
function abrirModal() {
  const modal = document.getElementById('modalImg');
  if (modal) {
    modal.classList.add('activo');
  }
}

function cerrarModal() {
  const modal = document.getElementById('modalImg');
  if (modal) {
    modal.classList.remove('activo');
  }
}

// 3. SIMULACIÓN PASO A PASO DEL FLUJO DEL SISTEMA
let simulando = false;
function iniciarSimulacion() {
  if (simulando) return;
  simulando = true;

  const btnSimular = document.getElementById('btnIniciarSimulacion');
  const mensajeEstado = document.getElementById('mensajeEstado');
  const pasos = [
    document.getElementById('paso1'),
    document.getElementById('paso2'),
    document.getElementById('paso3'),
    document.getElementById('paso4')
  ];

  if (btnSimular) btnSimular.disabled = true;

  // Limpiar resaltados previos
  pasos.forEach(p => { if (p) p.classList.remove('resaltado'); });

  const mensajes = [
    "Llamada entrante al Call Center...",
    "Cuadrilla técnica despachada...",
    "Conectividad restablecida en la zona...",
    "¡Encuesta enviada y sistema en equilibrio!"
  ];

  pasos.forEach((paso, index) => {
    setTimeout(() => {
      pasos.forEach(p => { if (p) p.classList.remove('resaltado'); });
      if (paso) paso.classList.add('resaltado');
      if (mensajeEstado) mensajeEstado.textContent = mensajes[index];

      // Al terminar el último paso
      if (index === pasos.length - 1) {
        setTimeout(() => {
          if (mensajeEstado) mensajeEstado.textContent = "✔ Ciclo completado con éxito";
          if (btnSimular) btnSimular.disabled = false;
          simulando = false;
        }, 1200);
      }
    }, index * 900);
  });
}

// Inicialización de Event Listeners cuando cargue el documento
document.addEventListener('DOMContentLoaded', () => {

  // Asignar clics a los botones de pestañas
  const botonesTabs = document.querySelectorAll('.btn-tab');
  botonesTabs.forEach(boton => {
    boton.addEventListener('click', function() {
      const idObjetivo = this.getAttribute('data-tab');
      cambiarPestana(idObjetivo, this);
    });
  });

  // Modal: imagen y botones
  const imgDiagrama = document.getElementById('imgDiagrama');
  const btnAmpliar = document.getElementById('btnAmpliar');
  const btnCerrarModal = document.getElementById('btnCerrarModal');
  const modal = document.getElementById('modalImg');

  if (imgDiagrama) imgDiagrama.addEventListener('click', abrirModal);
  if (btnAmpliar) btnAmpliar.addEventListener('click', abrirModal);
  if (btnCerrarModal) btnCerrarModal.addEventListener('click', cerrarModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) cerrarModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarModal();
  });

  // Botón simular
  const btnSimular = document.getElementById('btnIniciarSimulacion');
  if (btnSimular) {
    btnSimular.addEventListener('click', iniciarSimulacion);
  }

  // Scroll Spy en barra de navegación
  const navLinks = document.querySelectorAll('.nav-link');
  const secciones = document.querySelectorAll('main section[id]');

  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.forEach(l => l.classList.remove('activo'));
      this.classList.add('activo');
    });
  });

  window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + 120;
    secciones.forEach(sec => {
      let top = sec.offsetTop;
      let height = sec.offsetHeight;
      let id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('activo');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('activo');
          }
        });
      }
    });
  });

});
