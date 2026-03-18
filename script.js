// Estado global de la aplicación
let currentUser = { role: null, view: 'login' };
let selectedRoute = "UNI";

function renderApp() {
    const app = document.getElementById('app');
    
    // PANTALLA 1: LOGIN
    if (currentUser.view === 'login') {
        app.innerHTML = `
            <div class="login-container">
                <div class="login-blue">
                    <h1>Somos Cantuta</h1>
                    <p>Transporte UNE en tiempo real</p>
                </div>
                <div class="login-form">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/ea/Logo_UNE.png" width="80">
                    <h3>Iniciar Sesión</h3>
                    <select id="roleSelect">
                        <option value="Estudiante">Estudiante</option>
                        <option value="Conductor">Conductor</option>
                        <option value="Administrativo">Administrativo</option>
                    </select>
                    <input type="text" placeholder="Usuario / DNI">
                    <button onclick="login()">INGRESAR</button>
                </div>
            </div>
        `;
    } 
    // PANTALLA 2: SELECCIÓN DE RUTA
    else if (currentUser.view === 'routes') {
        app.innerHTML = `
            <div class="container">
                <header><h2>Selecciona tu Ruta</h2></header>
                <div class="route-grid">
                    <button onclick="selectRoute('Bolognesi')">Ruta Bolognesi</button>
                    <button onclick="selectRoute('UNI')">Ruta UNI</button>
                    <button onclick="selectRoute('Puente Santa Anita')">Ruta Santa Anita</button>
                    <button onclick="selectRoute('Puente Nuevo')">Ruta Puente Nuevo</button>
                </div>
            </div>
        `;
    }
    // PANTALLA 3: PANEL SEGÚN ROL
    else if (currentUser.view === 'panel') {
        renderPanel(app);
    }
}

function renderPanel(app) {
    let panelHTML = `
        <div class="panel-layout">
            <header class="panel-header">
                <span>🚍 <b>${selectedRoute}</b> | ${currentUser.role}</span>
                <button onclick="logout()">Salir</button>
            </header>
            <div class="panel-content">
                <div class="controls-card">
                    ${getRoleControls()}
                </div>
                <div id="map"></div>
            </div>
        </div>
    `;
    app.innerHTML = panelHTML;
    setTimeout(initMap, 100); // Carga el mapa después de renderizar
}

function getRoleControls() {
    if (currentUser.role === 'Estudiante') {
        return `
            <h4>Mi Panel</h4>
            <button class="btn-blue">📍 Estoy en Paradero</button>
            <button class="btn-red">⚠️ Reporte: No subí</button>
            <hr>
            <a href="#" class="link-wa">WhatsApp Grupo Ruta</a>
            <a href="#" class="link-wa">Canal General</a>
        `;
    } else if (currentUser.role === 'Conductor') {
        return `
            <h4>Panel Control</h4>
            <button class="btn-green">🟢 Compartir Ubicación</button>
            <div class="notif">🔔 Estudiante en Paradero: 5</div>
        `;
    } else {
        return `
            <h4>Reportes Admin</h4>
            <p>Ver todas las rutas en vivo</p>
            <button onclick="copyReport()">Copiar Reporte Automático</button>
        `;
    }
}

// Funciones de navegación
function login() {
    currentUser.role = document.getElementById('roleSelect').value;
    currentUser.view = 'routes';
    renderApp();
}

function selectRoute(route) {
    selectedRoute = route;
    currentUser.view = 'panel';
    renderApp();
}

function logout() {
    currentUser.view = 'login';
    renderApp();
}

// Inicializar la app
window.onload = renderApp;

function initMap() {
    // Aquí irá tu lógica de Google Maps cuando conectes la API
    const mapDiv = document.getElementById('map');
    if(mapDiv) mapDiv.innerHTML = "<center style='padding:50px'>Mapa Cargando...</center>";
}
