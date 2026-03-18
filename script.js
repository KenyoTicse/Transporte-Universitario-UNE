const { useState, useEffect } = React;

function App() {
  const [rol, setRol] = useState(null);
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const [pantalla, setPantalla] = useState("login"); // login, rutas, panel
  const [rutaSeleccionada, setRutaSeleccionada] = useState("");
  const [tracking, setTracking] = useState(false);

  // BASE DE DATOS DE USUARIOS
  const db_usuarios = {
    "20223691": { pass: "2022", tipo: "Estudiante", nombre: "KENYO TICSE" },
    "12345678": { pass: "1234", tipo: "Conductor", nombre: "CONDUCTOR UNE" },
    "Admin": { pass: "AdminSC", tipo: "Administrativo", nombre: "ADMIN GENERAL" }
  };

  const login = (e) => {
    e.preventDefault();
    const u = e.target.user.value;
    const p = e.target.pass.value;
    const t = e.target.tipo.value;

    if (db_usuarios[u] && db_usuarios[u].pass === p && db_usuarios[u].tipo === t) {
      setRol(t);
      setUsuarioActivo(db_usuarios[u]);
      setPantalla(t === "Administrativo" ? "panel" : "rutas");
    } else {
      alert("Datos incorrectos. Verifica usuario, clave y tipo.");
    }
  };

  // --- PANTALLA 1: LOGIN ---
  if (pantalla === "login") {
    return (
      <div className="login-container">
        <div className="login-blue">
          <h1 className="logo-text">Somos Cantuta</h1>
          <p>Transporte UNE en tiempo real</p>
        </div>
        <div className="login-white">
          <form onSubmit={login} className="login-form">
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/ea/Logo_UNE.png" width="100" />
            <h2>Movilidad UNE</h2>
            <select name="tipo" className="input-field" required>
              <option value="">Selecciona Rol</option>
              <option value="Estudiante">Estudiante</option>
              <option value="Conductor">Conductor</option>
              <option value="Administrativo">Administrativo</option>
            </select>
            <input name="user" placeholder="Usuario / Código" className="input-field" required />
            <input name="pass" type="password" placeholder="Contraseña" className="input-field" required />
            <button type="submit" className="btn-main">INGRESAR</button>
          </form>
        </div>
      </div>
    );
  }

  // --- PANTALLA 2: SELECCIÓN DE RUTAS ---
  if (pantalla === "rutas") {
    return (
      <div className="container">
        <header className="header">
          <span>Hola, {usuarioActivo.nombre}</span>
          <button onClick={() => setPantalla("login")} className="btn-exit">Salir</button>
        </header>
        <div className="content">
          <h3>Selecciona tu Ruta</h3>
          <div className="route-grid">
            {["Bolognesi", "UNI", "Puente Santa Anita", "Puente Nuevo"].map(r => (
              <button key={r} onClick={() => {setRutaSeleccionada(r); setPantalla("panel");}} className="route-card">
                Ruta {r}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- PANTALLA 3: PANEL DE CONTROL ---
  return (
    <div className="container">
      <header className="header">
        <span>🚍 {rol}: {rutaSeleccionada || "General"}</span>
        <button onClick={() => setPantalla(rol === "Administrativo" ? "login" : "rutas")} className="btn-exit">Volver</button>
      </header>

      <div className="dashboard-layout">
        <aside className="sidebar">
          {rol === "Estudiante" && (
            <div className="menu">
              <button className="btn-blue">📍 Estoy en paradero</button>
              <button className="btn-red">⚠️ Reporte: No subí</button>
              <hr/>
              <a href="#" className="wa-link">WhatsApp Grupo {rutaSeleccionada}</a>
              <a href="#" className="wa-link">Canal Transporte General</a>
            </div>
          )}

          {rol === "Conductor" && (
            <div className="menu">
              <button onClick={() => setTracking(!tracking)} className={tracking ? "btn-red" : "btn-green"}>
                {tracking ? "Detener GPS" : "Compartir Ubicación"}
              </button>
              <div className="notif">🔔 Estudiantes en paradero: 8</div>
            </div>
          )}

          {rol === "Administrativo" && (
            <div className="menu">
              <button className="btn-blue">📋 Ver Reportes</button>
              <button className="btn-blue" onClick={() => alert("Reporte UNI\nParadero: Santa Anita\nETA: 12 min")}>📤 Generar Reporte TXT</button>
            </div>
          )}
        </aside>

        <main className="map-area">
          {rol === "Administrativo" ? (
            <div className="admin-grid">
              <div className="mini-map">Mapa UNI</div>
              <div className="mini-map">Mapa Bolognesi</div>
              <div className="mini-map">Mapa Santa Anita</div>
              <div className="mini-map">Mapa P. Nuevo</div>
            </div>
          ) : (
            <div className="main-map">
              {tracking || rol === "Estudiante" ? "Cargando Google Maps..." : "Activa el GPS para compartir"}
              <div className="fake-map-bg"></div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
