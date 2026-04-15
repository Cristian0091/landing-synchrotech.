// ==================== CONFIGURACIÓN ====================
// ✅ Tu API Key de ImgBB (proporcionada por ti)
const IMGBB_API_KEY = "e039d718267b77ee5adb2e4aa2ba0fbd";

// ✅ Tu número de WhatsApp con código de país (se asume Colombia +57)
const TELEFONO_SOPORTE = "573118842454";   // 57 + 3118842454
// ========================================================

// Elementos DOM
const areaSelect = document.getElementById('area');
const nombreInput = document.getElementById('nombre');
const problemaTextarea = document.getElementById('problema');
const fileInput = document.getElementById('file-input');
const previewWrapper = document.getElementById('previewWrapper');
const sendBtn = document.getElementById('sendTicketBtn');
const alertBox = document.getElementById('alertBox');

let selectedImageFile = null;
let previewImageUrl = null;
let isUploading = false;

// Funciones auxiliares
function showAlert(message, type = 'info') {
  let icon = '<i class="fas fa-info-circle"></i>';
  if (type === 'error') icon = '<i class="fas fa-exclamation-triangle"></i>';
  if (type === 'success') icon = '<i class="fas fa-check-circle"></i>';
  alertBox.innerHTML = `${icon} ${message}`;
  alertBox.className = 'alert-message';
  if (type === 'error') alertBox.classList.add('alert-error');
  if (type === 'success') alertBox.classList.add('alert-success');
  if (type === 'success') {
    setTimeout(() => {
      if (alertBox.classList.contains('alert-success')) {
        alertBox.innerHTML = `<i class="fas fa-info-circle"></i> Listo para nuevo ticket. Completa los campos.`;
        alertBox.className = 'alert-message';
      }
    }, 5000);
  }
}

function updatePreview(file) {
  if (previewImageUrl) URL.revokeObjectURL(previewImageUrl);
  previewWrapper.innerHTML = '';
  if (!file) {
    selectedImageFile = null;
    return;
  }
  const maxSizeMB = 5;
  if (file.size > maxSizeMB * 1024 * 1024) {
    showAlert(`La imagen supera los ${maxSizeMB} MB.`, 'error');
    fileInput.value = '';
    selectedImageFile = null;
    return;
  }
  if (!file.type.startsWith('image/')) {
    showAlert('Formato no válido. Solo imágenes.', 'error');
    fileInput.value = '';
    selectedImageFile = null;
    return;
  }
  selectedImageFile = file;
  const objectUrl = URL.createObjectURL(file);
  previewImageUrl = objectUrl;
  const img = document.createElement('img');
  img.src = objectUrl;
  img.classList.add('img-preview');
  const removeBtn = document.createElement('button');
  removeBtn.innerHTML = '<i class="fas fa-trash-alt"></i> Eliminar';
  removeBtn.classList.add('remove-img-btn');
  removeBtn.type = 'button';
  removeBtn.onclick = () => {
    fileInput.value = '';
    selectedImageFile = null;
    if (previewImageUrl) URL.revokeObjectURL(previewImageUrl);
    previewWrapper.innerHTML = '';
    showAlert('Imagen removida.', 'info');
  };
  previewWrapper.appendChild(img);
  previewWrapper.appendChild(removeBtn);
}

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) updatePreview(file);
  else if (selectedImageFile) {
    if (previewImageUrl) URL.revokeObjectURL(previewImageUrl);
    previewWrapper.innerHTML = '';
    selectedImageFile = null;
  }
});

async function uploadImageToImgBB(file) {
  const formData = new FormData();
  formData.append('image', file);
  const url = `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`;
  const response = await fetch(url, { method: 'POST', body: formData });
  const data = await response.json();
  if (data && data.status === 200 && data.data && data.data.url) {
    return data.data.url;
  } else {
    throw new Error(data.error?.message || "Error al subir la imagen");
  }
}

function validateForm() {
  const area = areaSelect.value;
  const nombre = nombreInput.value.trim();
  const problema = problemaTextarea.value.trim();
  if (!area) { showAlert('Selecciona un área.', 'error'); areaSelect.focus(); return false; }
  if (!nombre) { showAlert('Escribe tu nombre completo.', 'error'); nombreInput.focus(); return false; }
  if (!problema) { showAlert('Describe el problema.', 'error'); problemaTextarea.focus(); return false; }
  return true;
}

function buildWhatsAppMessage(area, nombre, problema, imageUrl = null) {
  const fecha = new Date().toLocaleString('es-ES', { dateStyle: 'full', timeStyle: 'short' });
  let msg = `📢 *NUEVO TICKET DE SOPORTE* 📢\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `🗂 *Área:* ${area}\n`;
  msg += `👤 *Solicitante:* ${nombre}\n`;
  msg += `🕒 *Fecha/Hora:* ${fecha}\n`;
  msg += `💻 *Problema:*\n${problema}\n`;
  if (imageUrl) msg += `📸 *Evidencia:* ${imageUrl}\n`;
  else msg += `🖼 *Imagen:* No se adjuntó.\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━━\n🔧 Por favor atender a la brevedad.`;
  return msg;
}

async function handleSendTicket() {
  if (!validateForm()) return;
  if (isUploading) { showAlert('Espera, procesando...', 'info'); return; }

  const area = areaSelect.value;
  const nombre = nombreInput.value.trim();
  const problema = problemaTextarea.value.trim();
  let uploadedImageUrl = null;

  try {
    if (selectedImageFile) {
      isUploading = true;
      sendBtn.disabled = true;
      sendBtn.innerHTML = '<i class="fas fa-spinner spinner"></i> Subiendo imagen...';
      showAlert('Subiendo imagen a ImgBB...', 'info');
      uploadedImageUrl = await uploadImageToImgBB(selectedImageFile);
      showAlert('✅ Imagen subida correctamente.', 'success');
    }

    const mensajeFinal = buildWhatsAppMessage(area, nombre, problema, uploadedImageUrl);
    const textoCodificado = encodeURIComponent(mensajeFinal);
    const whatsappUrl = `https://wa.me/${TELEFONO_SOPORTE}?text=${textoCodificado}`;
    window.open(whatsappUrl, '_blank');
    showAlert('Ticket enviado. Se abrirá WhatsApp para confirmar.', 'success');

    // Limpiar solo la imagen después del envío
    if (selectedImageFile) {
      fileInput.value = '';
      if (previewImageUrl) URL.revokeObjectURL(previewImageUrl);
      previewWrapper.innerHTML = '';
      selectedImageFile = null;
    }
  } catch (error) {
    console.error(error);
    showAlert(`❌ ${error.message}`, 'error');
  } finally {
    isUploading = false;
    sendBtn.disabled = false;
    sendBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Enviar ticket a WhatsApp';
  }
}

sendBtn.addEventListener('click', handleSendTicket);

// Limpiar alertas de error al escribir
const clearErrorAlert = () => {
  if (alertBox.classList.contains('alert-error')) {
    alertBox.innerHTML = `<i class="fas fa-info-circle"></i> Completa todos los campos obligatorios.`;
    alertBox.classList.remove('alert-error');
  }
};
nombreInput.addEventListener('input', clearErrorAlert);
problemaTextarea.addEventListener('input', clearErrorAlert);
areaSelect.addEventListener('change', clearErrorAlert);