<template>
  <div v-if="!currentUser" class="container">
    <div class="login-card">
      <div class="logo">
        <h1>Dashboard R5</h1>
        <h2>PRODUCTIVIDAD 2025</h2>
        <p>Sistema de visualización de datos</p>
        <div class="version-badge">📊 POWER BI FREE</div>
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

<style scoped>
/* Pego los estilos de tu HTML original (puedes extraerlos en un .css aparte si quieres) */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
/* ... (todo tu CSS original aquí sin cambios) ... */
</style>