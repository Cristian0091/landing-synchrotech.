/* ============================================================
   HOTEL ADMIN — Sistema completo con localStorage
   Estados: disponible, ocupada, limpieza, mantenimiento, reservada
   ============================================================ */

// ============================================================
// BASE DE DATOS
// ============================================================
const DB_KEY = 'hotel_db_v1';

const datosIniciales = {
  usuarios: [
    { id: 1, nombre: 'Administrador', usuario: 'admin', rol: 'admin', activo: 1 },
    { id: 2, nombre: 'Recepcionista', usuario: 'recepcion', rol: 'recepcionista', activo: 1 }
  ],
  habitaciones: [
    { id: 1,  numero: '01', capacidad: 2, camas: 1, estado: 'disponible' },
    { id: 2,  numero: '02', capacidad: 2, camas: 1, estado: 'disponible' },
    { id: 3,  numero: '03', capacidad: 2, camas: 1, estado: 'disponible' },
    { id: 4,  numero: '04', capacidad: 4, camas: 2, estado: 'disponible' },
    { id: 5,  numero: '05', capacidad: 2, camas: 1, estado: 'disponible' },
    { id: 6,  numero: '06', capacidad: 2, camas: 1, estado: 'disponible' },
    { id: 7,  numero: '07', capacidad: 2, camas: 2, estado: 'disponible' },
    { id: 8,  numero: '08', capacidad: 2, camas: 1, estado: 'disponible' },
    { id: 9,  numero: '09', capacidad: 2, camas: 1, estado: 'disponible' },
    { id: 10, numero: '10', capacidad: 2, camas: 1, estado: 'disponible' },
    { id: 11, numero: '11', capacidad: 2, camas: 1, estado: 'disponible' }
  ],
  tarifas: [
    { id: 1, habitacion_id: 1, descripcion: 'Ventilador', personas: 1, precio: 50000 },
    { id: 2, habitacion_id: 1, descripcion: 'Aire', personas: 1, precio: 60000 },
    { id: 3, habitacion_id: 2, descripcion: '1 persona', personas: 1, precio: 40000 },
    { id: 4, habitacion_id: 2, descripcion: '2 personas', personas: 2, precio: 45000 },
    { id: 5, habitacion_id: 3, descripcion: '1 persona', personas: 1, precio: 35000 },
    { id: 6, habitacion_id: 3, descripcion: '2 personas', personas: 2, precio: 40000 },
    { id: 7, habitacion_id: 4, descripcion: '2 personas por cama', personas: 2, precio: 70000 },
    { id: 8, habitacion_id: 4, descripcion: '1 sola cama', personas: 1, precio: 60000 },
    { id: 9, habitacion_id: 4, descripcion: '2 camas', personas: 2, precio: 60000 },
    { id: 10, habitacion_id: 5, descripcion: 'Solo', personas: 1, precio: 35000 },
    { id: 11, habitacion_id: 5, descripcion: 'Pareja', personas: 2, precio: 40000 },
    { id: 12, habitacion_id: 6, descripcion: 'Solo', personas: 1, precio: 35000 },
    { id: 13, habitacion_id: 6, descripcion: 'Pareja', personas: 2, precio: 40000 },
    { id: 14, habitacion_id: 7, descripcion: 'Solo', personas: 1, precio: 35000 },
    { id: 15, habitacion_id: 7, descripcion: 'Pareja', personas: 2, precio: 40000 },
    { id: 16, habitacion_id: 8, descripcion: 'Solo', personas: 1, precio: 35000 },
    { id: 17, habitacion_id: 8, descripcion: 'Pareja', personas: 2, precio: 40000 },
    { id: 18, habitacion_id: 9, descripcion: 'Solo', personas: 1, precio: 35000 },
    { id: 19, habitacion_id: 9, descripcion: 'Pareja', personas: 2, precio: 40000 },
    { id: 20, habitacion_id: 10, descripcion: 'Solo', personas: 1, precio: 35000 },
    { id: 21, habitacion_id: 10, descripcion: 'Pareja', personas: 2, precio: 40000 },
    { id: 22, habitacion_id: 11, descripcion: 'Aire', personas: 1, precio: 60000 },
    { id: 23, habitacion_id: 11, descripcion: 'Ventilador', personas: 1, precio: 40000 }
  ],
  productos: [
    { id: 1, nombre: 'Cocacola', categoria: 'bebida', costo: 3400, precio: 4000, stock: 4 },
    { id: 2, nombre: 'Aguila', categoria: 'bebida', costo: 3500, precio: 4500, stock: 6 },
    { id: 3, nombre: 'Agua', categoria: 'bebida', costo: 1000, precio: 2500, stock: 12 },
    { id: 4, nombre: 'Coronita', categoria: 'bebida', costo: 3100, precio: 4000, stock: 12 },
    { id: 5, nombre: 'Jugo Hit', categoria: 'bebida', costo: 3100, precio: 4000, stock: 16 },
    { id: 6, nombre: 'Speed', categoria: 'bebida', costo: 0, precio: 3500, stock: 10 },
    { id: 7, nombre: 'Pony', categoria: 'bebida', costo: 0, precio: 4000, stock: 5 },
    { id: 8, nombre: 'Postobón Manzana', categoria: 'bebida', costo: 0, precio: 4000, stock: 4 },
    { id: 9, nombre: 'Sabiloe', categoria: 'bebida', costo: 0, precio: 4000, stock: 2 },
    { id: 10, nombre: 'Bombombum', categoria: 'mecato', costo: 400, precio: 800, stock: 24 },
    { id: 11, nombre: 'Chocorramo', categoria: 'mecato', costo: 2700, precio: 3500, stock: 5 },
    { id: 12, nombre: 'De Todito', categoria: 'mecato', costo: 2700, precio: 4000, stock: 12 },
    { id: 13, nombre: 'Margarita', categoria: 'mecato', costo: 2200, precio: 3000, stock: 6 },
    { id: 14, nombre: 'Doritos', categoria: 'mecato', costo: 2400, precio: 3500, stock: 4 },
    { id: 15, nombre: 'Briky', categoria: 'mecato', costo: 0, precio: 2000, stock: 0 },
    { id: 16, nombre: 'Zenu', categoria: 'mecato', costo: 6000, precio: 7000, stock: 4 }
  ],
  hospedajes: [],
  ventas: [],
  caja: [],
  reservas: []
};

// ============================================================
// DB
// ============================================================
let db = cargarDB();

function cargarDB() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) {
      const datos = JSON.parse(raw);
      // Migración: agregar campo camas si falta
      datos.habitaciones.forEach(h => {
        if (h.camas === undefined) h.camas = (h.numero === '04' || h.numero === '07') ? 2 : 1;
      });
      // Migración: agregar array reservas si falta
      if (!datos.reservas) datos.reservas = [];
      return datos;
    }
  } catch {}
  localStorage.setItem(DB_KEY, JSON.stringify(datosIniciales));
  return JSON.parse(JSON.stringify(datosIniciales));
}

function guardarDB() {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

function resetDatos() {
  if (!confirm('⚠️ Se borrarán TODOS los datos. ¿Continuar?')) return;
  db = JSON.parse(JSON.stringify(datosIniciales));
  guardarDB();
  toast('Datos reseteados', 'success');
  render();
}

function nextId(arr) {
  return arr.length ? Math.max(...arr.map(x => x.id)) + 1 : 1;
}

// ============================================================
// HELPERS
// ============================================================
function money(v) {
  return '$' + Math.round(v).toLocaleString('es-CO');
}

function toast(msg, tipo = 'success') {
  const el = document.createElement('div');
  el.className = `toast align-items-center text-bg-${tipo} border-0 show`;
  el.innerHTML = `<div class="d-flex"><div class="toast-body">${msg}</div>
    <button class="btn-close btn-close-white me-2 m-auto" onclick="this.parentElement.parentElement.remove()"></button></div>`;
  document.getElementById('toasts').appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

function abrirModal(html) {
  document.getElementById('modal-content').innerHTML = html;
  new bootstrap.Modal(document.getElementById('modal')).show();
}

function cerrarModal() {
  bootstrap.Modal.getInstance(document.getElementById('modal'))?.hide();
}

/**
 * Genera el SVG de camas según la cantidad.
 */
function svgCamas(cantidad = 1, color = '#fff') {
  const cama = `
    <g>
      <rect x="2" y="4" width="26" height="18" rx="2" 
            fill="rgba(255,255,255,0.15)" stroke="${color}" stroke-width="1.5"/>
      <rect x="5" y="7" width="7" height="12" rx="1.5" 
            fill="rgba(255,255,255,0.35)" stroke="${color}" stroke-width="1"/>
      <line x1="15" y1="4" x2="15" y2="22" 
            stroke="${color}" stroke-width="1" opacity="0.5"/>
      <line x1="2" y1="13" x2="28" y2="13" 
            stroke="${color}" stroke-width="0.8" opacity="0.4"/>
    </g>
  `;

  if (cantidad === 2) {
    return `
      <svg width="64" height="26" viewBox="0 0 64 26" xmlns="http://www.w3.org/2000/svg">
        ${cama}
        <g transform="translate(32, 0)">${cama}</g>
      </svg>
    `;
  }

  return `
    <svg width="32" height="26" viewBox="0 0 32 26" xmlns="http://www.w3.org/2000/svg">
      ${cama}
    </svg>
  `;
}

function tipoHabitacion(camas) {
  return camas === 2 ? 'Doble' : 'Individual';
}

// ============================================================
// ESTADO DE LA APP
// ============================================================
let rolActual = 'recepcionista';
let vistaActual = 'recepcion-dashboard';
let carrito = [];

// ============================================================
// NAVEGACIÓN
// ============================================================
const menuPorRol = {
  admin: [
    { id: 'admin-dashboard',    icon: 'bi-speedometer2', label: 'Dashboard' },
    { id: 'admin-productos',    icon: 'bi-box-seam',     label: 'Productos' },
    { id: 'admin-habitaciones', icon: 'bi-door-open',    label: 'Habitaciones' },
    { id: 'admin-usuarios',     icon: 'bi-people',       label: 'Usuarios' }
  ],
  recepcionista: [
    { id: 'recepcion-dashboard', icon: 'bi-grid-3x3-gap', label: 'Habitaciones' },
    { id: 'recepcion-ventas',    icon: 'bi-cart',         label: 'Ventas vitrina' }
  ]
};

function renderSidebar() {
  const items = menuPorRol[rolActual];
  document.getElementById('sidebar').innerHTML = items.map(i => `
    <a class="nav-link ${vistaActual === i.id ? 'active' : ''}" onclick="cambiarVista('${i.id}')">
      <i class="bi ${i.icon}"></i> ${i.label}
    </a>
  `).join('');
}

function cambiarVista(vista) {
  vistaActual = vista;
  carrito = [];
  render();
}

// ============================================================
// RENDER PRINCIPAL
// ============================================================
function render() {
  renderSidebar();
  const rutas = {
    'recepcion-dashboard': vistaRecepcionDashboard,
    'recepcion-ventas':    vistaRecepcionVentas,
    'admin-dashboard':     vistaAdminDashboard,
    'admin-productos':     vistaAdminProductos,
    'admin-habitaciones':  vistaAdminHabitaciones,
    'admin-usuarios':      vistaAdminUsuarios
  };
  document.getElementById('content').innerHTML = (rutas[vistaActual] || (() => '<p>Vista no encontrada</p>'))();
}

// ============================================================
// VISTA: RECEPCIÓN - MAPA HABITACIONES
// ============================================================
function vistaRecepcionDashboard() {
  const colores = {
    disponible: 'success',
    ocupada: 'danger',
    limpieza: 'warning',
    mantenimiento: 'secondary',
    reservada: 'info'
  };

  const habitaciones = db.habitaciones.map(h => {
    const hosp = db.hospedajes.find(x => x.habitacion_id === h.id && x.estado === 'activo');
    const camas = h.camas || 1;

    let nombreMostrar = '';
    if (hosp) {
      nombreMostrar = hosp.cliente_nombre.split(' ')[0];
    } else if (h.estado === 'reservada' && db.reservas) {
      const res = db.reservas.find(r => r.habitacion_id === h.id && r.estado === 'pendiente');
      if (res) nombreMostrar = res.cliente_nombre.split(' ')[0];
    }

    return `
      <div class="col-md-3 col-6">
        <a onclick="abrirHabitacion(${h.id})" class="hab-card bg-${colores[h.estado] || 'secondary'}">
          <div class="camas-badge">🛏️ ${camas}</div>
          <div class="hab-numero">${h.numero}</div>
          <div class="hab-camas">${svgCamas(camas)}</div>
          <div class="hab-tipo">${tipoHabitacion(camas)}</div>
          <div class="estado mt-1">${h.estado}</div>
          ${nombreMostrar ? `<small class="d-block mt-1">👤 ${nombreMostrar}</small>` : ''}
        </a>
      </div>
    `;
  }).join('');

  return `
    <h2>Mapa de habitaciones</h2>
    <p class="text-muted small">Clic en una habitación para gestionarla según su estado.</p>
    <div class="row g-3 mt-2">${habitaciones}</div>
  `;
}

// ============================================================
// ENRUTADOR DE ACCIÓN SEGÚN ESTADO
// ============================================================
function abrirHabitacion(idHab) {
  const hab = db.habitaciones.find(h => h.id === idHab);
  if (!hab) return;

  switch (hab.estado) {
    case 'ocupada':
      abrirGestionHabitacion(idHab);
      break;
    case 'disponible':
      abrirOpcionesDisponible(idHab);
      break;
    case 'limpieza':
      abrirOpcionesLimpieza(idHab);
      break;
    case 'reservada':
      abrirOpcionesReservada(idHab);
      break;
    case 'mantenimiento':
      toast('Habitación en mantenimiento. Cambia el estado desde Administración.', 'warning');
      break;
    default:
      toast(`Estado "${hab.estado}" no reconocido`, 'warning');
  }
}

// ============================================================
// HABITACIÓN DISPONIBLE → Check-in o Reservar
// ============================================================
function abrirOpcionesDisponible(idHab) {
  const hab = db.habitaciones.find(h => h.id === idHab);
  const camas = hab.camas || 1;

  abrirModal(`
    <div class="modal-header">
      <h5 class="modal-title">
        Hab. ${hab.numero}
        <span class="badge bg-success ms-2">Disponible</span>
      </h5>
      <button class="btn-close" onclick="cerrarModal()"></button>
    </div>
    <div class="modal-body text-center">
      <div style="display:inline-block;padding:16px 24px;background:#f1f3f6;border-radius:12px;margin-bottom:16px">
        ${svgCamas(camas, '#0d6efd')}
      </div>
      <p class="text-muted small mb-4">
        <b>${tipoHabitacion(camas)}</b> · Capacidad para ${hab.capacidad} personas
      </p>
      <div class="d-grid gap-2">
        <button class="btn btn-success btn-lg" onclick="cerrarModal(); abrirCheckIn(${idHab})">
          <i class="bi bi-box-arrow-in-right"></i> Hacer Check-in
        </button>
        <button class="btn btn-warning btn-lg" onclick="cerrarModal(); abrirReserva(${idHab})">
          <i class="bi bi-calendar-check"></i> Reservar
        </button>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary w-100" onclick="cerrarModal()">Cancelar</button>
    </div>
  `);
}

// ============================================================
// HABITACIÓN EN LIMPIEZA → Marcar disponible
// ============================================================
function abrirOpcionesLimpieza(idHab) {
  const hab = db.habitaciones.find(h => h.id === idHab);
  const camas = hab.camas || 1;

  let tiempoRestante = '';
  if (hab.limpieza_hasta) {
    const diff = Math.max(0, new Date(hab.limpieza_hasta) - new Date());
    const min = Math.floor(diff / 60000);
    const seg = Math.floor((diff % 60000) / 1000);
    tiempoRestante = `${min}:${String(seg).padStart(2, '0')}`;
  }

  abrirModal(`
    <div class="modal-header">
      <h5 class="modal-title">
        Hab. ${hab.numero}
        <span class="badge bg-warning text-dark ms-2">En limpieza</span>
      </h5>
      <button class="btn-close" onclick="cerrarModal()"></button>
    </div>
    <div class="modal-body text-center">
      <div style="font-size:64px;margin-bottom:8px">🧹</div>
      <p class="text-muted small mb-1">Habitación pendiente de aseo</p>
      ${tiempoRestante ? `<p class="badge bg-warning text-dark fs-6 mb-3">⏱️ ${tiempoRestante} restantes</p>` : ''}
      <div style="display:inline-block;padding:12px 20px;background:#f1f3f6;border-radius:12px;margin-bottom:16px">
        ${svgCamas(camas, '#0d6efd')}
      </div>
      <p class="text-muted small mb-4">
        <b>${tipoHabitacion(camas)}</b> · Capacidad para ${hab.capacidad} personas
      </p>
      <button class="btn btn-success btn-lg w-100" onclick="marcarDisponible(${idHab})">
        <i class="bi bi-check-circle"></i> Marcar como limpia y disponible
      </button>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary w-100" onclick="cerrarModal()">Cancelar</button>
    </div>
  `);
}

// ============================================================
// HABITACIÓN RESERVADA → Convertir o cancelar
// ============================================================
function abrirOpcionesReservada(idHab) {
  const hab = db.habitaciones.find(h => h.id === idHab);
  const camas = hab.camas || 1;
  const reserva = db.reservas?.find(r => r.habitacion_id === idHab && r.estado === 'pendiente');

  abrirModal(`
    <div class="modal-header">
      <h5 class="modal-title">
        Hab. ${hab.numero}
        <span class="badge bg-info ms-2">Reservada</span>
      </h5>
      <button class="btn-close" onclick="cerrarModal()"></button>
    </div>
    <div class="modal-body">
      <div class="text-center mb-3">
        <div style="display:inline-block;padding:12px 20px;background:#f1f3f6;border-radius:12px">
          ${svgCamas(camas, '#0d6efd')}
        </div>
      </div>
      ${reserva ? `
        <div class="alert alert-info py-2 small">
          <b>👤 Cliente:</b> ${reserva.cliente_nombre}<br>
          ${reserva.cliente_doc ? `<b>📄 Documento:</b> ${reserva.cliente_doc}<br>` : ''}
          ${reserva.cliente_tel ? `<b>📞 Teléfono:</b> ${reserva.cliente_tel}<br>` : ''}
          <b>💰 Precio/noche:</b> ${money(reserva.precio_noche)}<br>
          ${reserva.anticipo ? `<b>💵 Anticipo:</b> ${money(reserva.anticipo)}<br>` : ''}
          ${reserva.notas ? `<b>📝 Notas:</b> ${reserva.notas}` : ''}
        </div>
      ` : '<p class="text-muted small">No hay datos de reserva.</p>'}
      <div class="d-grid gap-2">
        <button class="btn btn-success btn-lg" onclick="convertirReservaACheckIn(${idHab})">
          <i class="bi bi-box-arrow-in-right"></i> Convertir a Check-in
        </button>
        <button class="btn btn-danger" onclick="cancelarReserva(${idHab})">
          <i class="bi bi-x-circle"></i> Cancelar reserva
        </button>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary w-100" onclick="cerrarModal()">Cerrar</button>
    </div>
  `);
}

// ============================================================
// ACCIÓN: Marcar como disponible
// ============================================================
function marcarDisponible(idHab) {
  const hab = db.habitaciones.find(h => h.id === idHab);
  if (!hab) return;
  hab.estado = 'disponible';
  hab.limpieza_hasta = null;
  guardarDB();
  cerrarModal();
  toast(`Hab. ${hab.numero} marcada como disponible`, 'success');
  render();
}

// ============================================================
// ACCIÓN: Abrir formulario de reserva
// ============================================================
function abrirReserva(idHab) {
  const hab = db.habitaciones.find(h => h.id === idHab);
  const tarifas = db.tarifas.filter(t => t.habitacion_id === idHab);
  const camas = hab.camas || 1;

  abrirModal(`
    <div class="modal-header">
      <h5 class="modal-title">
        <i class="bi bi-calendar-check"></i> Reservar Hab. ${hab.numero}
        <span class="badge bg-primary ms-2">${tipoHabitacion(camas)}</span>
      </h5>
      <button class="btn-close" onclick="cerrarModal()"></button>
    </div>
    <div class="modal-body">
      <div class="mb-2">
        <label class="form-label">Tarifa</label>
        <select id="rs-tarifa" class="form-select">
          ${tarifas.map(t => `<option value="${t.id}">${t.descripcion} — ${money(t.precio)} (${t.personas} pers.)</option>`).join('')}
        </select>
      </div>
      <div class="mb-2"><label class="form-label">Nombre del cliente</label>
        <input id="rs-nombre" class="form-control" required></div>
      <div class="row g-2 mb-2">
        <div class="col-6"><label class="form-label">Documento</label>
          <input id="rs-doc" class="form-control"></div>
        <div class="col-6"><label class="form-label">Teléfono</label>
          <input id="rs-tel" class="form-control"></div>
      </div>
      <div class="row g-2 mb-2">
        <div class="col-6"><label class="form-label">Fecha entrada</label>
          <input id="rs-entrada" type="date" class="form-control" value="${new Date().toISOString().split('T')[0]}"></div>
        <div class="col-6"><label class="form-label">Fecha salida</label>
          <input id="rs-salida" type="date" class="form-control" value="${new Date(Date.now() + 86400000).toISOString().split('T')[0]}"></div>
      </div>
      <div class="mb-2"><label class="form-label">Anticipo (opcional)</label>
        <input id="rs-anticipo" type="number" class="form-control" value="0" min="0"></div>
      <div class="mb-2"><label class="form-label">Notas (opcional)</label>
        <input id="rs-notas" class="form-control" placeholder="Ej: Llega a las 3pm"></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="cerrarModal()">Cancelar</button>
      <button class="btn btn-warning" onclick="confirmarReserva(${idHab})">
        <i class="bi bi-calendar-check"></i> Guardar reserva
      </button>
    </div>
  `);
}

// ============================================================
// ACCIÓN: Confirmar reserva
// ============================================================
function confirmarReserva(idHab) {
  const tarifaId = +document.getElementById('rs-tarifa').value;
  const nombre = document.getElementById('rs-nombre').value.trim();
  const doc = document.getElementById('rs-doc').value.trim();
  const tel = document.getElementById('rs-tel').value.trim();
  const entrada = document.getElementById('rs-entrada').value;
  const salida = document.getElementById('rs-salida').value;
  const anticipo = +document.getElementById('rs-anticipo').value || 0;
  const notas = document.getElementById('rs-notas').value.trim();

  if (!nombre) return toast('Falta el nombre del cliente', 'danger');
  if (!entrada || !salida) return toast('Faltan las fechas', 'danger');
  if (new Date(salida) <= new Date(entrada)) return toast('La salida debe ser posterior a la entrada', 'danger');

  const tarifa = db.tarifas.find(t => t.id === tarifaId);

  if (!db.reservas) db.reservas = [];

  db.reservas.push({
    id: nextId(db.reservas),
    habitacion_id: idHab,
    tarifa_id: tarifaId,
    cliente_nombre: nombre,
    cliente_doc: doc,
    cliente_tel: tel,
    personas: tarifa.personas,
    precio_noche: tarifa.precio,
    fecha_entrada: entrada,
    fecha_salida_estimada: salida,
    anticipo,
    notas,
    estado: 'pendiente',
    creado_en: new Date().toISOString()
  });

  const hab = db.habitaciones.find(h => h.id === idHab);
  hab.estado = 'reservada';
  guardarDB();
  cerrarModal();
  toast(`Hab. ${hab.numero} reservada para ${nombre}`, 'success');
  render();
}

// ============================================================
// ACCIÓN: Convertir reserva a check-in
// ============================================================
function convertirReservaACheckIn(idHab) {
  if (!db.reservas) db.reservas = [];
  const reserva = db.reservas.find(r => r.habitacion_id === idHab && r.estado === 'pendiente');
  if (!reserva) return toast('No hay reserva activa', 'danger');

  db.hospedajes.push({
    id: nextId(db.hospedajes),
    habitacion_id: idHab,
    tarifa_id: reserva.tarifa_id,
    cliente_nombre: reserva.cliente_nombre,
    cliente_doc: reserva.cliente_doc,
    cliente_tel: reserva.cliente_tel,
    personas: reserva.personas,
    precio_noche: reserva.precio_noche,
    fecha_entrada: new Date().toISOString(),
    fecha_salida: null,
    noches: 1,
    total: 0,
    estado: 'activo'
  });

  reserva.estado = 'convertida';
  const hab = db.habitaciones.find(h => h.id === idHab);
  hab.estado = 'ocupada';

  guardarDB();
  cerrarModal();
  toast(`Check-in registrado para ${reserva.cliente_nombre}`, 'success');
  render();
}

// ============================================================
// ACCIÓN: Cancelar reserva
// ============================================================
function cancelarReserva(idHab) {
  if (!confirm('¿Cancelar esta reserva? La habitación volverá a estar disponible.')) return;

  if (!db.reservas) db.reservas = [];
  const reserva = db.reservas.find(r => r.habitacion_id === idHab && r.estado === 'pendiente');
  if (reserva) reserva.estado = 'cancelada';

  const hab = db.habitaciones.find(h => h.id === idHab);
  hab.estado = 'disponible';

  guardarDB();
  cerrarModal();
  toast('Reserva cancelada', 'success');
  render();
}

// ============================================================
// CHECK-IN
// ============================================================
function abrirCheckIn(idHab) {
  const hab = db.habitaciones.find(h => h.id === idHab);
  const tarifas = db.tarifas.filter(t => t.habitacion_id === idHab);
  const camas = hab.camas || 1;

  abrirModal(`
    <div class="modal-header">
      <h5 class="modal-title">
        Check-in Hab. ${hab.numero} 
        <span class="badge bg-primary ms-2">${tipoHabitacion(camas)}</span>
      </h5>
      <button class="btn-close" onclick="cerrarModal()"></button>
    </div>
    <div class="modal-body">
      <div class="text-center mb-3">
        <div style="display:inline-block;padding:12px 20px;background:#f1f3f6;border-radius:10px">
          ${svgCamas(camas, '#0d6efd')}
        </div>
      </div>
      <div class="mb-2">
        <label class="form-label">Tarifa</label>
        <select id="ci-tarifa" class="form-select">
          ${tarifas.map(t => `<option value="${t.id}">${t.descripcion} — ${money(t.precio)} (${t.personas} pers.)</option>`).join('')}
        </select>
      </div>
      <div class="mb-2"><label class="form-label">Nombre del cliente</label>
        <input id="ci-nombre" class="form-control" required></div>
      <div class="mb-2"><label class="form-label">Documento</label>
        <input id="ci-doc" class="form-control"></div>
      <div class="mb-2"><label class="form-label">Teléfono</label>
        <input id="ci-tel" class="form-control"></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="cerrarModal()">Cancelar</button>
      <button class="btn btn-success" onclick="confirmarCheckIn(${idHab})">Registrar entrada</button>
    </div>
  `);
}

function confirmarCheckIn(idHab) {
  const tarifaId = +document.getElementById('ci-tarifa').value;
  const nombre = document.getElementById('ci-nombre').value.trim();
  const doc = document.getElementById('ci-doc').value.trim();
  const tel = document.getElementById('ci-tel').value.trim();

  if (!nombre) return toast('Falta el nombre del cliente', 'danger');

  const tarifa = db.tarifas.find(t => t.id === tarifaId);

  db.hospedajes.push({
    id: nextId(db.hospedajes),
    habitacion_id: idHab,
    tarifa_id: tarifaId,
    cliente_nombre: nombre,
    cliente_doc: doc,
    cliente_tel: tel,
    personas: tarifa.personas,
    precio_noche: tarifa.precio,
    fecha_entrada: new Date().toISOString(),
    fecha_salida: null,
    noches: 1,
    total: 0,
    estado: 'activo'
  });

  const hab = db.habitaciones.find(h => h.id === idHab);
  hab.estado = 'ocupada';
  guardarDB();
  cerrarModal();
  toast('Check-in registrado', 'success');
  render();
}

// ============================================================
// GESTIÓN HABITACIÓN OCUPADA (consumos + checkout)
// ============================================================
function abrirGestionHabitacion(idHab) {
  const hab = db.habitaciones.find(h => h.id === idHab);
  const hosp = db.hospedajes.find(x => x.habitacion_id === idHab && x.estado === 'activo');
  if (!hosp) return toast('No hay hospedaje activo', 'danger');

  const consumos = db.ventas.filter(v => v.hospedaje_id === hosp.id);
  const totalConsumos = consumos.reduce((s, c) => s + c.total, 0);
  const productos = db.productos.filter(p => p.stock > 0);

  abrirModal(`
    <div class="modal-header">
      <h5 class="modal-title">Hab. ${hab.numero} — ${hosp.cliente_nombre}</h5>
      <button class="btn-close" onclick="cerrarModal()"></button>
    </div>
    <div class="modal-body">
      <div class="alert alert-info py-2 small">
        <b>Entrada:</b> ${new Date(hosp.fecha_entrada).toLocaleString('es-CO')}<br>
        <b>Precio/noche:</b> ${money(hosp.precio_noche)}
      </div>
      <h6 class="mt-3">Agregar consumo</h6>
      <div class="input-group mb-3">
        <select id="gestion-producto" class="form-select">
          ${productos.map(p => `<option value="${p.id}">${p.nombre} — ${money(p.precio)} (stock: ${p.stock})</option>`).join('')}
        </select>
        <input id="gestion-cantidad" type="number" value="1" min="1" class="form-control" style="max-width:80px">
        <button class="btn btn-success" onclick="agregarConsumo(${hosp.id}, ${idHab})">+</button>
      </div>
      <h6 class="mt-3">Consumos actuales</h6>
      ${consumos.length === 0 ? '<p class="text-muted small">Sin consumos.</p>' : `
        <table class="table table-sm mb-0">
          <thead><tr><th>Producto</th><th class="text-center">Cant.</th><th class="text-end">Subtotal</th><th></th></tr></thead>
          <tbody>
            ${consumos.map(c => `
              <tr>
                <td>${c.nombre}</td>
                <td class="text-center">${c.cantidad}</td>
                <td class="text-end">${money(c.total)}</td>
                <td class="text-end"><button class="btn btn-sm btn-outline-danger" onclick="quitarConsumo(${c.id}, ${idHab})">×</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="d-flex justify-content-between border-top pt-2 mt-2">
          <b>Total consumos</b><b>${money(totalConsumos)}</b>
        </div>
      `}
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="cerrarModal()">Cerrar</button>
      <button class="btn btn-danger" onclick="hacerCheckout(${hosp.id}, ${idHab})">
        <i class="bi bi-receipt"></i> Check-out + Factura
      </button>
    </div>
  `);
}

function agregarConsumo(hospId, idHab) {
  const prodId = +document.getElementById('gestion-producto').value;
  const cant = Math.max(1, +document.getElementById('gestion-cantidad').value);
  const prod = db.productos.find(p => p.id === prodId);

  if (!prod || prod.stock < cant) return toast('Stock insuficiente', 'danger');

  const total = cant * prod.precio;
  const ganancia = cant * (prod.precio - prod.costo);

  db.ventas.push({
    id: nextId(db.ventas),
    producto_id: prodId,
    nombre: prod.nombre,
    cantidad: cant,
    precio_unitario: prod.precio,
    costo_unitario: prod.costo,
    total,
    ganancia,
    hospedaje_id: hospId,
    fecha: new Date().toISOString()
  });

  prod.stock -= cant;
  guardarDB();
  cerrarModal();
  toast('Consumo agregado', 'success');
  abrirGestionHabitacion(idHab);
}

function quitarConsumo(ventaId, idHab) {
  const venta = db.ventas.find(v => v.id === ventaId);
  if (!venta) return;

  const prod = db.productos.find(p => p.id === venta.producto_id);
  if (prod) prod.stock += venta.cantidad;

  db.ventas = db.ventas.filter(v => v.id !== ventaId);
  guardarDB();
  cerrarModal();
  toast('Consumo eliminado', 'success');
  abrirGestionHabitacion(idHab);
}

// ============================================================
// CHECK-OUT + FACTURA
// ============================================================
function hacerCheckout(hospId, idHab) {
  if (!confirm('¿Finalizar hospedaje y generar factura?')) return;

  const hosp = db.hospedajes.find(h => h.id === hospId);
  const hab = db.habitaciones.find(h => h.id === idHab);
  const consumos = db.ventas.filter(v => v.hospedaje_id === hospId);
  const totalConsumos = consumos.reduce((s, c) => s + c.total, 0);

  const entrada = new Date(hosp.fecha_entrada);
  const salida = new Date();
  const noches = Math.max(1, Math.ceil((salida - entrada) / (1000 * 60 * 60 * 24)));
  const totalHospedaje = noches * hosp.precio_noche;
  const totalGeneral = totalHospedaje + totalConsumos;

  hosp.fecha_salida = salida.toISOString();
  hosp.noches = noches;
  hosp.total = totalGeneral;
  hosp.estado = 'finalizado';

  hab.estado = 'limpieza';
  hab.limpieza_hasta = new Date(Date.now() + 20 * 60 * 1000).toISOString();

  db.caja.push({
    id: nextId(db.caja),
    tipo: 'ingreso',
    concepto: `Hospedaje Hab ${hab.numero}`,
    monto: totalHospedaje,
    fecha: new Date().toISOString()
  });
  if (totalConsumos > 0) {
    db.caja.push({
      id: nextId(db.caja),
      tipo: 'ingreso',
      concepto: `Consumos Hab ${hab.numero}`,
      monto: totalConsumos,
      fecha: new Date().toISOString()
    });
  }

  guardarDB();
  cerrarModal();

  generarFactura(hosp, hab, consumos, noches, totalHospedaje, totalConsumos, totalGeneral);
  render();
}

function generarFactura(hosp, hab, consumos, noches, totalHosp, totalCons, totalGen) {
  const facturaHtml = `
    <div class="modal-header">
      <h5 class="modal-title">🧾 Factura #${String(hosp.id).padStart(6, '0')}</h5>
      <button class="btn-close" onclick="cerrarModal()"></button>
    </div>
    <div class="modal-body" id="factura-contenido">
      <h4 class="text-center mb-3">🏨 HOTEL ADMIN</h4>
      <p class="text-center small text-muted">Factura N° ${String(hosp.id).padStart(6, '0')} — ${new Date().toLocaleString('es-CO')}</p>
      <hr>
      <h6>Datos del huésped</h6>
      <p class="mb-1"><b>Nombre:</b> ${hosp.cliente_nombre}</p>
      <p class="mb-1"><b>Documento:</b> ${hosp.cliente_doc || '—'}</p>
      <p class="mb-1"><b>Teléfono:</b> ${hosp.cliente_tel || '—'}</p>
      <p class="mb-1"><b>Habitación:</b> ${hab.numero}</p>
      <p class="mb-1"><b>Entrada:</b> ${new Date(hosp.fecha_entrada).toLocaleString('es-CO')}</p>
      <p class="mb-1"><b>Salida:</b> ${new Date(hosp.fecha_salida).toLocaleString('es-CO')}</p>
      <p class="mb-1"><b>Noches:</b> ${noches}</p>
      <hr>
      <h6>Alojamiento</h6>
      <table class="table table-sm">
        <tr><td>Hab. ${hab.numero} × ${noches} noches</td><td class="text-end">${money(totalHosp)}</td></tr>
      </table>
      ${consumos.length > 0 ? `
        <h6>Consumos</h6>
        <table class="table table-sm">
          ${consumos.map(c => `<tr><td>${c.nombre} × ${c.cantidad}</td><td class="text-end">${money(c.total)}</td></tr>`).join('')}
        </table>
      ` : ''}
      <hr>
      <h5 class="d-flex justify-content-between"><span>TOTAL:</span><span>${money(totalGen)}</span></h5>
      <p class="text-center small text-muted mt-3">¡Gracias por su estadía!</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="cerrarModal()">Cerrar</button>
      <button class="btn btn-primary" onclick="window.print()">
        <i class="bi bi-printer"></i> Imprimir
      </button>
    </div>
  `;
  abrirModal(facturaHtml);
}

// ============================================================
// VISTA: RECEPCIÓN - VENTAS VITRINA
// ============================================================
function vistaRecepcionVentas() {
  const bebidas = db.productos.filter(p => p.categoria === 'bebida');
  const mecato  = db.productos.filter(p => p.categoria === 'mecato');

  const totalCarrito = carrito.reduce((s, c) => {
    const p = db.productos.find(x => x.id === c.producto_id);
    return s + (p ? p.precio * c.cantidad : 0);
  }, 0);

  const renderProd = (p) => {
    const enCart = carrito.find(c => c.producto_id === p.id)?.cantidad || 0;
    const disp = p.stock - enCart;
    return `
      <div>
        <button class="pos-item" ${disp <= 0 ? 'disabled' : ''} onclick="agregarAlCarrito(${p.id})">
          ${enCart > 0 ? `<span class="pos-badge">${enCart}</span>` : ''}
          <div class="pos-name">${p.nombre}</div>
          <div class="pos-price">${money(p.precio)}</div>
          <div class="pos-stock">Stock: ${disp}</div>
        </button>
      </div>
    `;
  };

  return `
    <h2>Punto de venta — Vitrina</h2>
    <div class="row g-3">
      <div class="col-lg-7">
        <div class="card p-3">
          <h5>Bebidas</h5>
          <div class="pos-grid mb-3">${bebidas.map(renderProd).join('')}</div>
          <h5>Mecato</h5>
          <div class="pos-grid">${mecato.map(renderProd).join('')}</div>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="card p-3">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h5 class="mb-0">🛒 Carrito</h5>
            ${carrito.length > 0 ? '<button class="btn btn-sm btn-outline-danger" onclick="vaciarCarrito()">Vaciar</button>' : ''}
          </div>
          ${carrito.length === 0
            ? '<p class="text-muted small mb-0">Haz clic en productos para agregar.</p>'
            : `<table class="table table-sm mb-2">
                <thead><tr><th>Producto</th><th class="text-center">Cant.</th><th class="text-end">Subtotal</th><th></th></tr></thead>
                <tbody>
                  ${carrito.map((c, i) => {
                    const p = db.productos.find(x => x.id === c.producto_id);
                    return `<tr>
                      <td>${p.nombre}<br><small class="text-muted">${money(p.precio)} c/u</small></td>
                      <td class="text-center">
                        <div class="btn-group btn-group-sm">
                          <button class="btn btn-outline-secondary" onclick="restarCarrito(${i})">−</button>
                          <button class="btn btn-light disabled">${c.cantidad}</button>
                          <button class="btn btn-outline-success" onclick="agregarAlCarrito(${p.id})">+</button>
                        </div>
                      </td>
                      <td class="text-end">${money(p.precio * c.cantidad)}</td>
                      <td><button class="btn btn-sm btn-outline-danger" onclick="quitarDelCarrito(${i})">×</button></td>
                    </tr>`;
                  }).join('')}
                </tbody>
              </table>
              <div class="d-flex justify-content-between border-top pt-2 mb-3">
                <b>Total</b><b>${money(totalCarrito)}</b>
              </div>
              <button class="btn btn-primary w-100" onclick="finalizarVenta()">
                <i class="bi bi-check-circle"></i> Finalizar venta
              </button>`
          }
        </div>
      </div>
    </div>
  `;
}

function agregarAlCarrito(prodId) {
  const prod = db.productos.find(p => p.id === prodId);
  if (!prod) return;
  const enCart = carrito.find(c => c.producto_id === prodId);
  const cantActual = enCart?.cantidad || 0;
  if (cantActual >= prod.stock) return toast('Stock insuficiente', 'warning');

  if (enCart) enCart.cantidad++;
  else carrito.push({ producto_id: prodId, cantidad: 1 });
  render();
}

function restarCarrito(idx) {
  if (carrito[idx].cantidad > 1) carrito[idx].cantidad--;
  else carrito.splice(idx, 1);
  render();
}

function quitarDelCarrito(idx) {
  carrito.splice(idx, 1);
  render();
}

function vaciarCarrito() {
  carrito = [];
  render();
}

function finalizarVenta() {
  if (carrito.length === 0) return;
  let total = 0, ganancia = 0;
  const grupoId = Date.now().toString();

  carrito.forEach(item => {
    const p = db.productos.find(x => x.id === item.producto_id);
    const sub = p.precio * item.cantidad;
    const gan = (p.precio - p.costo) * item.cantidad;

    db.ventas.push({
      id: nextId(db.ventas),
      grupo_id: grupoId,
      producto_id: p.id,
      nombre: p.nombre,
      cantidad: item.cantidad,
      precio_unitario: p.precio,
      costo_unitario: p.costo,
      total: sub,
      ganancia: gan,
      hospedaje_id: null,
      fecha: new Date().toISOString()
    });

    p.stock -= item.cantidad;
    total += sub;
    ganancia += gan;
  });

  db.caja.push({
    id: nextId(db.caja),
    tipo: 'ingreso',
    concepto: `Venta vitrina (${carrito.length} ítems)`,
    monto: total,
    fecha: new Date().toISOString()
  });

  guardarDB();
  carrito = [];
  toast(`Venta registrada: ${money(total)} (ganancia ${money(ganancia)})`, 'success');
  render();
}

// ============================================================
// VISTA: ADMIN - DASHBOARD
// ============================================================
function vistaAdminDashboard() {
  const hoy = new Date().toDateString();
  const ventasHoy = db.ventas.filter(v => new Date(v.fecha).toDateString() === hoy);
  const ingHosp = ventasHoy.filter(v => v.hospedaje_id).reduce((s, v) => s + v.total, 0);
  const ingVit = ventasHoy.filter(v => !v.hospedaje_id && v.grupo_id).reduce((s, v) => s + v.total, 0);
  const ganHoy = ventasHoy.reduce((s, v) => s + v.ganancia, 0);
  const ocupadas = db.habitaciones.filter(h => h.estado === 'ocupada').length;
  const totalHab = db.habitaciones.length;

  const dias = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const ds = d.toDateString();
    const total = db.ventas.filter(v => new Date(v.fecha).toDateString() === ds).reduce((s, v) => s + v.total, 0);
    dias.push({ fecha: d.toLocaleDateString('es-CO', { day: '2-digit', month: 'short' }), total });
  }
  const maxDia = Math.max(...dias.map(d => d.total), 1);

  const topMap = {};
  db.ventas.forEach(v => {
    topMap[v.nombre] = (topMap[v.nombre] || 0) + v.cantidad;
  });
  const top = Object.entries(topMap).map(([n, c]) => ({ nombre: n, cant: c }))
    .sort((a, b) => b.cant - a.cant).slice(0, 6);
  const maxTop = Math.max(...top.map(t => t.cant), 1);

  return `
    <h2>Panel de administración</h2>
    <div class="row g-3 mb-3">
      <div class="col-6 col-md-3"><div class="kpi bg-primary"><small>Hospedaje hoy</small><h3>${money(ingHosp)}</h3></div></div>
      <div class="col-6 col-md-3"><div class="kpi bg-success"><small>Vitrina hoy</small><h3>${money(ingVit)}</h3></div></div>
      <div class="col-6 col-md-3"><div class="kpi bg-warning text-dark"><small>Ganancia hoy</small><h3>${money(ganHoy)}</h3></div></div>
      <div class="col-6 col-md-3"><div class="kpi bg-info text-dark"><small>Ocupación</small><h3>${ocupadas}/${totalHab}</h3></div></div>
    </div>
    <div class="row g-3">
      <div class="col-md-7">
        <div class="card p-3">
          <h5>Ventas últimos 7 días</h5>
          <div class="d-flex align-items-end gap-2" style="height:200px;padding:12px 0 24px">
            ${dias.map(d => `
              <div class="flex-fill d-flex flex-column align-items-center" style="height:100%">
                <div style="flex:1;display:flex;align-items:flex-end;width:100%">
                  <div style="width:100%;background:linear-gradient(180deg,#0d6efd,#6366f1);border-radius:6px 6px 0 0;height:${Math.max((d.total/maxDia)*100, 3)}%;position:relative;min-height:4px">
                    <small style="position:absolute;top:-20px;left:50%;transform:translateX(-50%);font-size:10px;white-space:nowrap">${d.total > 0 ? money(d.total) : ''}</small>
                  </div>
                </div>
                <small class="text-muted mt-1" style="font-size:10px">${d.fecha}</small>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="col-md-5">
        <div class="card p-3">
          <h5>Productos más vendidos</h5>
          ${top.length === 0 ? '<p class="text-muted small">Sin ventas registradas.</p>' : top.map(t => `
            <div class="mb-2">
              <div class="d-flex justify-content-between small mb-1">
                <span>${t.nombre}</span><b>${t.cant}</b>
              </div>
              <div style="background:#eee;border-radius:4px;height:8px;overflow:hidden">
                <div style="background:linear-gradient(90deg,#198754,#20c997);height:100%;width:${(t.cant/maxTop)*100}%"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// VISTA: ADMIN - PRODUCTOS
// ============================================================
function vistaAdminProductos() {
  const productos = db.productos;
  return `
    <h2>Productos</h2>
    <div class="row g-3">
      <div class="col-md-4">
        <div class="card p-3">
          <h5 id="form-prod-titulo">Nuevo producto</h5>
          <form onsubmit="guardarProducto(event)" id="form-producto">
            <input type="hidden" id="prod-id">
            <div class="mb-2"><label class="form-label">Nombre</label>
              <input id="prod-nombre" class="form-control form-control-sm" required></div>
            <div class="mb-2"><label class="form-label">Categoría</label>
              <select id="prod-categoria" class="form-select form-select-sm">
                <option value="bebida">Bebida</option>
                <option value="mecato">Mecato</option>
                <option value="otro">Otro</option>
              </select></div>
            <div class="row g-2 mb-2">
              <div class="col-6"><label class="form-label">Costo</label>
                <input id="prod-costo" type="number" class="form-control form-control-sm" value="0"></div>
              <div class="col-6"><label class="form-label">Precio venta</label>
                <input id="prod-precio" type="number" class="form-control form-control-sm" required></div>
            </div>
            <div class="mb-3"><label class="form-label">Stock</label>
              <input id="prod-stock" type="number" class="form-control form-control-sm" value="0"></div>
            <button class="btn btn-primary btn-sm w-100">Guardar</button>
            <button type="button" class="btn btn-link btn-sm w-100 d-none" id="btn-cancelar-prod" onclick="cancelarEdicionProducto()">Cancelar</button>
          </form>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card p-3">
          <h5>Inventario (${productos.length})</h5>
          <div class="table-responsive">
            <table class="table table-sm table-hover">
              <thead><tr>
                <th>Producto</th><th>Cat.</th>
                <th class="text-end">Costo</th><th class="text-end">Venta</th>
                <th class="text-end">Ganancia</th><th class="text-center">Stock</th><th></th>
              </tr></thead>
              <tbody>
                ${productos.map(p => `
                  <tr>
                    <td>${p.nombre}</td>
                    <td><span class="badge bg-light text-dark">${p.categoria}</span></td>
                    <td class="text-end">${money(p.costo)}</td>
                    <td class="text-end">${money(p.precio)}</td>
                    <td class="text-end text-success">${money(p.precio - p.costo)}</td>
                    <td class="text-center">
                      <span class="badge bg-${p.stock <= 3 ? 'danger' : p.stock <= 8 ? 'warning text-dark' : 'secondary'}">${p.stock}</span>
                    </td>
                    <td class="text-end">
                      <button class="btn btn-sm btn-warning" onclick="editarProducto(${p.id})">✏️</button>
                      <button class="btn btn-sm btn-danger" onclick="eliminarProducto(${p.id})">×</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
}

function guardarProducto(e) {
  e.preventDefault();
  const id = +document.getElementById('prod-id').value || 0;
  const data = {
    nombre: document.getElementById('prod-nombre').value.trim(),
    categoria: document.getElementById('prod-categoria').value,
    costo: +document.getElementById('prod-costo').value,
    precio: +document.getElementById('prod-precio').value,
    stock: +document.getElementById('prod-stock').value
  };

  if (id) {
    Object.assign(db.productos.find(p => p.id === id), data);
    toast('Producto actualizado', 'success');
  } else {
    db.productos.push({ id: nextId(db.productos), ...data });
    toast('Producto creado', 'success');
  }
  guardarDB();
  cancelarEdicionProducto();
  render();
}

function editarProducto(id) {
  const p = db.productos.find(x => x.id === id);
  if (!p) return;
  document.getElementById('prod-id').value = p.id;
  document.getElementById('prod-nombre').value = p.nombre;
  document.getElementById('prod-categoria').value = p.categoria;
  document.getElementById('prod-costo').value = p.costo;
  document.getElementById('prod-precio').value = p.precio;
  document.getElementById('prod-stock').value = p.stock;
  document.getElementById('form-prod-titulo').textContent = 'Editar producto';
  document.getElementById('btn-cancelar-prod').classList.remove('d-none');
}

function cancelarEdicionProducto() {
  document.getElementById('form-producto').reset();
  document.getElementById('prod-id').value = '';
  document.getElementById('form-prod-titulo').textContent = 'Nuevo producto';
  document.getElementById('btn-cancelar-prod').classList.add('d-none');
}

function eliminarProducto(id) {
  if (!confirm('¿Eliminar producto?')) return;
  db.productos = db.productos.filter(p => p.id !== id);
  guardarDB();
  toast('Producto eliminado', 'success');
  render();
}

// ============================================================
// VISTA: ADMIN - HABITACIONES
// ============================================================
function vistaAdminHabitaciones() {
  return `
    <h2>Habitaciones y tarifas</h2>
    <p class="text-muted small mb-3">
      Configura el número de camas de cada habitación. La vista de recepción se actualiza automáticamente.
    </p>
    <div class="accordion" id="accHabs">
      ${db.habitaciones.map(h => {
        const tarifas = db.tarifas.filter(t => t.habitacion_id === h.id);
        const camas = h.camas || 1;

        return `
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#h${h.id}">
                <span style="font-weight:800;font-size:16px">Hab. ${h.numero}</span>
                <span class="badge bg-${camas === 2 ? 'primary' : 'secondary'} ms-2">
                  ${camas} ${camas === 2 ? 'camas' : 'cama'}
                </span>
                <span class="badge bg-secondary ms-2">${h.estado}</span>
              </button>
            </h2>
            <div id="h${h.id}" class="accordion-collapse collapse" data-bs-parent="#accHabs">
              <div class="accordion-body">
                <h6 class="text-uppercase small text-muted mb-2" style="letter-spacing:1px">
                  🛏️ Configuración de camas
                </h6>
                <div class="card p-3 mb-3 bg-light border-0">
                  <div class="selector-camas" id="selector-camas-${h.id}">
                    <button 
                      class="${camas === 1 ? 'active' : ''}" 
                      onclick="cambiarCamas(${h.id}, 1)">
                      ${svgCamas(1, '#0d6efd')}
                      <span>1 cama · Individual</span>
                    </button>
                    <button 
                      class="${camas === 2 ? 'active' : ''}" 
                      onclick="cambiarCamas(${h.id}, 2)">
                      ${svgCamas(2, '#0d6efd')}
                      <span>2 camas · Doble</span>
                    </button>
                  </div>
                </div>

                <h6 class="text-uppercase small text-muted mb-2 mt-4" style="letter-spacing:1px">
                  🚦 Estado
                </h6>
                <form onsubmit="cambiarEstadoHab(event, ${h.id})" class="row g-2 mb-3">
                  <div class="col-auto">
                    <select class="form-select form-select-sm" id="estado-hab-${h.id}">
                      ${['disponible','ocupada','limpieza','mantenimiento','reservada'].map(e => 
                        `<option ${h.estado === e ? 'selected' : ''}>${e}</option>`
                      ).join('')}
                    </select>
                  </div>
                  <div class="col-auto">
                    <button class="btn btn-primary btn-sm">Actualizar estado</button>
                  </div>
                </form>

                <h6 class="text-uppercase small text-muted mb-2" style="letter-spacing:1px">
                  💰 Tarifas
                </h6>
                <table class="table table-sm">
                  <thead><tr><th>Descripción</th><th>Personas</th><th>Precio</th><th></th></tr></thead>
                  <tbody>
                    ${tarifas.map(t => `
                      <tr>
                        <td><input class="form-control form-control-sm" value="${t.descripcion}" 
                          onblur="editarTarifa(${t.id}, 'descripcion', this.value)"></td>
                        <td><input type="number" class="form-control form-control-sm" value="${t.personas}" 
                          onblur="editarTarifa(${t.id}, 'personas', +this.value)"></td>
                        <td><input type="number" class="form-control form-control-sm" value="${t.precio}" 
                          onblur="editarTarifa(${t.id}, 'precio', +this.value)"></td>
                        <td><button class="btn btn-sm btn-danger" onclick="eliminarTarifa(${t.id})">×</button></td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>

                <form onsubmit="agregarTarifa(event, ${h.id})" class="row g-2">
                  <div class="col-md-4"><input name="desc" class="form-control form-control-sm" placeholder="Descripción" required></div>
                  <div class="col-md-2"><input name="pers" type="number" class="form-control form-control-sm" value="1" required></div>
                  <div class="col-md-3"><input name="precio" type="number" class="form-control form-control-sm" placeholder="Precio" required></div>
                  <div class="col-md-2"><button class="btn btn-primary btn-sm">+ Añadir</button></div>
                </form>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function cambiarEstadoHab(e, id) {
  e.preventDefault();
  const estado = document.getElementById(`estado-hab-${id}`).value;
  const hab = db.habitaciones.find(h => h.id === id);
  hab.estado = estado;
  if (estado !== 'limpieza') hab.limpieza_hasta = null;
  guardarDB();
  toast('Estado actualizado', 'success');
  render();
}

function cambiarCamas(idHab, numCamas) {
  const hab = db.habitaciones.find(h => h.id === idHab);
  if (!hab) return;

  const hospActivo = db.hospedajes.find(x => x.habitacion_id === idHab && x.estado === 'activo');
  if (hospActivo) {
    toast('⚠️ Hay un huésped activo. El cambio se aplicará al próximo check-in.', 'warning');
  }

  hab.camas = numCamas;
  hab.capacidad = numCamas === 2 ? Math.max(hab.capacidad, 2) : hab.capacidad;

  guardarDB();
  toast(`Habitación ${hab.numero} configurada como ${tipoHabitacion(numCamas)}`, 'success');
  render();
}

function editarTarifa(id, campo, valor) {
  const t = db.tarifas.find(x => x.id === id);
  if (t) {
    t[campo] = valor;
    guardarDB();
  }
}

function eliminarTarifa(id) {
  if (!confirm('¿Eliminar tarifa?')) return;
  db.tarifas = db.tarifas.filter(t => t.id !== id);
  guardarDB();
  toast('Tarifa eliminada', 'success');
  render();
}

function agregarTarifa(e, habId) {
  e.preventDefault();
  const form = e.target;
  db.tarifas.push({
    id: nextId(db.tarifas),
    habitacion_id: habId,
    descripcion: form.desc.value,
    personas: +form.pers.value,
    precio: +form.precio.value
  });
  guardarDB();
  toast('Tarifa agregada', 'success');
  render();
}

// ============================================================
// VISTA: ADMIN - USUARIOS
// ============================================================
function vistaAdminUsuarios() {
  return `
    <h2>Usuarios</h2>
    <div class="row g-3">
      <div class="col-md-4">
        <div class="card p-3">
          <h5 id="form-user-titulo">Nuevo usuario</h5>
          <form onsubmit="guardarUsuario(event)" id="form-user">
            <input type="hidden" id="user-id">
            <div class="mb-2"><label class="form-label">Nombre</label>
              <input id="user-nombre" class="form-control form-control-sm" required></div>
            <div class="mb-2"><label class="form-label">Usuario</label>
              <input id="user-usuario" class="form-control form-control-sm" required></div>
            <div class="mb-3"><label class="form-label">Rol</label>
              <select id="user-rol" class="form-select form-select-sm">
                <option value="admin">Admin</option>
                <option value="recepcionista">Recepcionista</option>
              </select></div>
            <button class="btn btn-primary btn-sm w-100">Guardar</button>
            <button type="button" class="btn btn-link btn-sm w-100 d-none" id="btn-cancelar-user" onclick="cancelarEdicionUsuario()">Cancelar</button>
          </form>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card p-3">
          <h5>Lista de usuarios (${db.usuarios.length})</h5>
          <table class="table table-sm">
            <thead><tr><th>Nombre</th><th>Usuario</th><th>Rol</th><th>Activo</th><th></th></tr></thead>
            <tbody>
              ${db.usuarios.map(u => `
                <tr>
                  <td>
                    <div class="d-flex align-items-center gap-2">
                      <div class="avatar">${u.nombre.charAt(0)}</div>
                      ${u.nombre}
                    </div>
                  </td>
                  <td>${u.usuario}</td>
                  <td><span class="badge bg-${u.rol === 'admin' ? 'danger' : 'info'}">${u.rol}</span></td>
                  <td>${u.activo ? '✅' : '❌'}</td>
                  <td class="text-end">
                    <button class="btn btn-sm btn-warning" onclick="editarUsuario(${u.id})">✏️</button>
                    <button class="btn btn-sm btn-secondary" onclick="toggleUsuario(${u.id})">🔄</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function guardarUsuario(e) {
  e.preventDefault();
  const id = +document.getElementById('user-id').value || 0;
  const usuario = document.getElementById('user-usuario').value.trim();

  if (db.usuarios.some(u => u.usuario === usuario && u.id !== id)) {
    return toast('Ese usuario ya existe', 'danger');
  }

  const data = {
    nombre: document.getElementById('user-nombre').value.trim(),
    usuario,
    rol: document.getElementById('user-rol').value,
    activo: 1
  };

  if (id) {
    Object.assign(db.usuarios.find(u => u.id === id), data);
    toast('Usuario actualizado', 'success');
  } else {
    db.usuarios.push({ id: nextId(db.usuarios), ...data });
    toast('Usuario creado', 'success');
  }
  guardarDB();
  cancelarEdicionUsuario();
  render();
}

function editarUsuario(id) {
  const u = db.usuarios.find(x => x.id === id);
  if (!u) return;
  document.getElementById('user-id').value = u.id;
  document.getElementById('user-nombre').value = u.nombre;
  document.getElementById('user-usuario').value = u.usuario;
  document.getElementById('user-rol').value = u.rol;
  document.getElementById('form-user-titulo').textContent = 'Editar usuario';
  document.getElementById('btn-cancelar-user').classList.remove('d-none');
}

function cancelarEdicionUsuario() {
  document.getElementById('form-user').reset();
  document.getElementById('user-id').value = '';
  document.getElementById('form-user-titulo').textContent = 'Nuevo usuario';
  document.getElementById('btn-cancelar-user').classList.add('d-none');
}

function toggleUsuario(id) {
  const u = db.usuarios.find(x => x.id === id);
  if (u) {
    u.activo = u.activo ? 0 : 1;
    guardarDB();
    toast(u.activo ? 'Usuario activado' : 'Usuario desactivado', 'success');
    render();
  }
}

// ============================================================
// LIMPIEZA AUTOMÁTICA (cada 30s)
// ============================================================
setInterval(() => {
  let cambio = false;
  db.habitaciones.forEach(h => {
    if (h.estado === 'limpieza' && h.limpieza_hasta) {
      if (new Date(h.limpieza_hasta) <= new Date()) {
        h.estado = 'disponible';
        h.limpieza_hasta = null;
        cambio = true;
      }
    }
  });
  if (cambio) {
    guardarDB();
    if (vistaActual === 'recepcion-dashboard') render();
  }
}, 30000);

// ============================================================
// ARRANQUE
// ============================================================
document.getElementById('rol-select').addEventListener('change', e => {
  rolActual = e.target.value;
  vistaActual = rolActual === 'admin' ? 'admin-dashboard' : 'recepcion-dashboard';
  render();
});

render();