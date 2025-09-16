<template>
  <div v-if="!currentUser" class="container">
    <div class="login-card">
      <div class="logo">
        <img src="../assets/Ganaroganar.jpg" class="logo-image" alt="Logo" />
        <h1>CLARO R5</h1>
        <h2>PRODUCTIVIDAD 2025</h2>
        <p>Sistema de visualización de datos</p>
      </div>

      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Usuario</label>
          <input v-model="username" type="text" id="username" required placeholder="Ingresa tu usuario" />
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <input v-model="password" type="password" id="password" required placeholder="Ingresa tu contraseña" />
        </div>

        <button type="submit" class="login-btn">Acceder al Dashboard</button>

        <div v-if="errorMessage" class="error-message">
          Usuario o contraseña incorrectos
        </div>
      </form>
    </div>
  </div>

  <!-- Pantalla del Dashboard -->
  <div v-else class="dashboardScreen">
    <div class="dashboard-container">
      <div class="dashboard-header">
        <div>
          <h2 class="dashboard-title">PRODUCTIVIDAD R5 2025</h2>
          <div class="dashboard-subtitle">Dashboard basado en Power BI Desktop</div>
        </div>
        <div class="user-info">
          <div class="user-avatar">{{ currentUser.charAt(0).toUpperCase() }}</div>
          <span> {{ currentUser }} ({{ usuarios[currentUser].role }})</span>
          <button class="logout-btn" @click="logout">Salir</button>
        </div>
      </div>

      <div class="dashboard-content">
        <div class="dashboard-section">
          <h3 class="section-title">📊 Panel Principal de Productividad</h3>

          <div class="instructions">
            <h4>Cómo subir tu Power BI (Gratis):</h4>
            <div class="step">Exporta tu dashboard como imagen desde Power BI Desktop</div>
            <div class="step">Ve a Archivo → Exportar → Exportar como imagen</div>
            <div class="step">Guarda como PNG o JPG en alta resolución</div>
            <div class="step">Arrastra y suelta la imagen aquí abajo</div>
          </div>

          <div
            v-if="!dashboardImage"
            class="upload-zone"
            @click="fileInput.click()"
            @drop.prevent="handleDrop"
            @dragover.prevent="dragOver = true"
            @dragleave="dragOver = false"
            :class="{ dragover: dragOver }"
          >
            <div class="upload-icon">🖼</div>
            <div class="upload-text">Arrastra tu imagen del dashboard aquí</div>
            <div class="upload-subtext">o haz clic para seleccionar archivo</div>
            <input
              ref="fileInput"
              type="file"
              class="file-input"
              accept="image/*"
              @change="handleFileSelect"
            />
          </div>

          <div v-else id="imageContainer" class="image-container">
            <button class="zoom-btn" @click="openModal">🔍</button>
            <img :src="dashboardImage" class="dashboard-image" @click="openModal" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";

// Usuarios configurados
const usuarios = reactive({
  admin: { password: "ProductividadR5!", role: "Administrador" },
  usuario: { password: "usuario2025", role: "Usuario" },
  supervisor: { password: "super2025", role: "Supervisor" },
});

const username = ref("");
const password = ref("");
const currentUser = ref(null);
const errorMessage = ref(false);

const dashboardImage = ref(null);
const dragOver = ref(false);
const showModal = ref(false);
const fileInput = ref(null);

// Login
function login() {
  if (usuarios[username.value] && usuarios[username.value].password === password.value) {
    currentUser.value = username.value;
    errorMessage.value = false;
    password.value = "";
  } else {
    errorMessage.value = true;
    password.value = "";
  }
}

// Logout
function logout() {
  currentUser.value = null;
  username.value = "";
  password.value = "";
  errorMessage.value = false;
  dashboardImage.value = null;
}

// Subida de archivos
function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    displayImage(file);
  }
}

function handleDrop(event) {
  dragOver.value = false;
  const files = event.dataTransfer.files;
  if (files.length > 0 && files[0].type.startsWith("image/")) {
    displayImage(files[0]);
  }
}

function displayImage(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    dashboardImage.value = e.target.result;
  };
  reader.readAsDataURL(file);
}

// Modal
function openModal() {
  showModal.value = true;
}
function closeModal() {
  showModal.value = false;
}

// Atajo teclado (Escape cierra modal)
onMounted(() => {
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });
});
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    /* Gradiente principal de Claro */
    background: linear-gradient(135deg, #ffffff 0%, #dd3019 50%, #ff0000 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.logo-image{
    width: 100px;
    height: auto;
    margin-bottom: 15px;
    border-radius: 30%;
}

.container {
    width: 100%;
    max-width: 600px;
    padding: 20px;
}

.login-card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 15px;
    padding: 50px;
    box-shadow: 0 20px 40px #ff4006;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.dashboard-container {
    background: white;
    border-radius: 15px;
    padding: 20px;
    /* Sombra con acento Claro */
    box-shadow: 0 20px 40px rgba(229, 0, 45, 0.15);
    width: 98vw;
    height: 95vh;
    max-width: 1600px;
    overflow: auto;
}

.logo {
    
    text-align: center;
    margin-bottom: 30px;
}

.logo h1 {
    /* Color primario de Claro */
    color: #f82b07;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 5px;
}

.logo h2 {
    /* Color secundario de Claro */
    color: #db3907;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 10px;
}

.logo p {
    color: #666666;
    font-size: 13px;
}

.version-badge {
    /* Gradiente Claro */
    background: linear-gradient(135deg, #f23f15, #f23f26);
    color: white;
    padding: 5px 10px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 600;
    display: inline-block;
    margin-top: 10px;
    /* Sombra con acento Claro */
    box-shadow: 0 2px 8px rgba(229, 0, 45, 0.3);
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 8px;
    /* Color primario de Claro */
    color: #f23f09;
    font-weight: 500;
    font-size: 14px;
}

input[type="text"],
input[type="password"] {
    width: 100%;
    padding: 15px;
    border: 2px solid #e1e5e9;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.3s ease;
    background-color: #f8f9fa;
}

input[type="text"]:focus,
input[type="password"]:focus {
    outline: none;
    /* Acento Claro en foco */
    border-color: #f23f09;
    background-color: white;
    /* Sombra sutil Claro */
    box-shadow: 0 0 0 3px rgba(229, 0, 45, 0.1);
}

.login-btn {
    width: 100%;
    padding: 15px;
    /* Gradiente principal de Claro */
    background: linear-gradient(135deg, #e64100 0%, #ff5917f6 50%, #d83504 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 10px;
    /* Sombra prominente Claro */
    box-shadow: 0 4px 15px rgba(229, 0, 45, 0.3);
}

.login-btn:hover {
    transform: translateY(-2px);
    /* Sombra más intensa al pasar el mouse */
    box-shadow: 0 8px 25px rgba(229, 0, 45, 0.4);
    /* Gradiente alterno Claro */
    background: linear-gradient(135deg, #f23f09 0%, #f23f10 50%, #f23f30 100%);
}

.login-btn:active {
    transform: translateY(0);
}

.error-message {
    /* Color de error de Claro */
    color: #f23f26;
    font-size: 14px;
    margin-top: 10px;
    text-align: center;
    display: none;
}

.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    padding-bottom: 15px;
    /* Borde inferior con acento Claro */
    border-bottom: 3px solid #f23f24;
}

.dashboard-title {
    /* Color primario de Claro */
    color: #f23f14;
    font-size: 28px;
    font-weight: 700;
}

.dashboard-subtitle {
    color: #666666;
    font-size: 14px;
    margin-top: 5px;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 15px;
}

.user-avatar {
    /* Gradiente Claro para avatar */
    background: linear-gradient(135deg, #f23f22 0%, #f23f17 100%);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 20px;
    width: 50px;
    height: 50px;
    /* Sombra con acento Claro */
    box-shadow: 0 4px 15px rgba(229, 0, 45, 0.3);
}

.logout-btn {
    padding: 10px 18px;
    background: #666666; /* Gris para botones secundarios */
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.3s ease;
}

.logout-btn:hover {
    background: #555555;
    transform: translateY(-1px);
}

.dashboard-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 25px;
    height: calc(100% - 100px);
}

.dashboard-section {
    background: #f8f9fa; /* Fondo claro y neutro */
    border-radius: 12px;
    padding: 25px;
    border: 2px solid #ecf0f1; /* Borde gris claro */
    position: relative;
    min-height: 400px;
    transition: border-color 0.3s ease;
}

.dashboard-section:hover {
    /* Acento Claro en borde al pasar el mouse */
    border-color: #f23f24;
}

.section-title {
    /* Color primario de Claro */
    color: #f23f18;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.upload-zone {
    border: 3px dashed #bdc3c7; /* Borde de carga gris */
    border-radius: 10px;
    padding: 40px 20px;
    text-align: center;
    background: white;
    transition: all 0.3s ease;
    cursor: pointer;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.upload-zone:hover {
    /* Acento Claro al pasar el mouse */
    border-color: #f23f17;
    background: #fff0f2;
}

.upload-zone.dragover {
    border-color: #f23f16;
    background: #ffe6ea;
}

.upload-icon {
    /* Color primario de Claro */
    font-size: 48px;
    color: #f23f30;
    margin-bottom: 15px;
}

.upload-text {
    color: #666666;
    font-size: 16px;
    margin-bottom: 10px;
}

.upload-subtext {
    color: #95a5a6;
    font-size: 12px;
}

.file-input {
    display: none;
}

.dashboard-image {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    /* Sombra sutil Claro */
    box-shadow: 0 5px 15px rgba(229, 0, 45, 0.1);
    cursor: pointer;
    transition: transform 0.3s ease;
    border: 2px solid transparent;
}

.dashboard-image:hover {
    transform: scale(1.02);
    /* Acento Claro en borde al pasar el mouse */
    border-color: #f23f19;
}

.image-container {
    position: relative;
    text-align: center;
}

.zoom-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    /* Fondo oscuro con acento Claro */
    background: rgba(229, 53, 0, 0.9);
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
    /* Sombra con acento Claro */
    box-shadow: 0 2px 10px rgba(179, 52, 2, 0.3);
}

.zoom-btn:hover {
    background: #f23f32;
    transform: scale(1.1);
}

.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
}

.modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 95%;
    max-height: 95%;
    /* Borde Claro */
    border: 3px solid #f23f07;
    border-radius: 10px;
}

.close-modal {
    position: absolute;
    top: 15px;
    right: 35px;
    /* Color primario de Claro */
    color: #f23f08;
    font-size: 40px;
    font-weight: bold;
    cursor: pointer;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    transition: color 0.3s ease;
}

.close-modal:hover {
    color: #f23f09
}

.instructions {
    /* Gradiente Claro */
    background: linear-gradient(135deg, #f23f04, #f23f06);
    color: white;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    /* Sombra con acento Claro */
    box-shadow: 0 5px 15px rgba(229, 84, 0, 0.3);
}

.instructions h4 {
    margin-bottom: 15px;
    font-size: 18px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.step {
    margin-bottom: 10px;
    padding-left: 20px;
    position: relative;
}

.step::before {
    content: "📋"; /* Emoji genérico, puedes cambiarlo si prefieres */
    position: absolute;
    left: 0;
}

.hidden {
    display: none !important;
}

/* Botones adicionales con estilo Claro */
.btn-claro {
    /* Gradiente Claro */
    background: linear-gradient(135deg, #f23f09 0%, #f23f20 100%);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px 20px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    /* Sombra con acento Claro */
    box-shadow: 0 4px 15px rgba(229, 0, 45, 0.3);
}

.btn-claro:hover {
    /* Gradiente alterno Claro */
    background: linear-gradient(135deg, #f23f04 0%, #f23f03 100%);
    transform: translateY(-2px);
    /* Sombra más intensa al pasar el mouse */
    box-shadow: 0 6px 20px rgba(158, 59, 2, 0.4);
}

.btn-secondary {
    background: #666666; /* Gris para botones secundarios */
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px 20px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-secondary:hover {
    background: #555555;
    transform: translateY(-1px);
}

/* Elementos con marca Claro */
.claro-accent {
    /* Color primario de Claro */
    color: #f23f10;
    font-weight: 600;
}

.claro-border {
    border-color: #f23f08;
}

.claro-bg {
    /* Gradiente Claro */
    background: linear-gradient(135deg, #f23f17 0%, #f23f17 100%);
}

/* Loading spinner con colores Claro */
.loading-spinner {
    border: 4px solid #f3f3f3;
    /* Borde superior con acento Claro */
    border-top: 4px solid #f23f09;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin: 20px auto;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Responsive design mejorado */
@media (max-width: 768px) {
    .dashboard-container {
        width: 100vw;
        height: 100vh;
        border-radius: 0;
        padding: 10px;
    }

    .dashboard-header {
        flex-direction: column;
        gap: 15px;
        text-align: center;
    }

    .dashboard-title {
        font-size: 22px;
    }

    .login-card {
        padding: 30px 20px;
    }

    .upload-zone {
        height: 250px;
        padding: 30px 15px;
    }

    .upload-icon {
        font-size: 36px;
    }
}

/* Animaciones adicionales */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.fade-in {
    animation: fadeIn 0.6s ease-out forwards;
}

/* Estilos para notificaciones */
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    /* Gradiente principal de Claro */
    background: linear-gradient(135deg, #f23f24 0%, #f23f26 100%);
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    /* Sombra con acento Claro */
    box-shadow: 0 5px 15px rgba(202, 66, 3, 0.3);
    z-index: 1001;
    animation: slideIn 0.3s ease-out forwards;
}

@keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
}

.notification.success {
    /* Gradiente verde para éxito */
    background: linear-gradient(135deg, #27ae60, #2ecc71);
}

.notification.error {
    /* Gradiente oscuro para error */
    background: linear-gradient(135deg, #f23f17, #f23f22);
}
</style>