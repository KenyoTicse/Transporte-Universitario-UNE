const { useState, useEffect } = React;

function App() {
  const [rol, setRol] = useState(null);
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const [tracking, setTracking] = useState(false);

  const db_usuarios = {
    "20223691": { pass: "2022", tipo: "Estudiante", nombre: "KENYO TICSE" },
    "12345678": { pass: "1234", tipo: "Conductor", nombre: "CONDUCTOR UNE" },
    "Admin": { pass: "AdminSC", tipo: "Administrador", nombre: "ADMINISTRATIVO" }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const u = e.target.user.value;
    const p = e.target.pass.value;
    if (db_usuarios[u] && db_usuarios[u].pass === p) {
      setRol(db_usuarios[u].tipo);
      setUsuarioActivo(db_usuarios[u]);
    } else {
      alert("Usuario o clave incorrecta");
    }
  };

  if (!rol) {
    return (
      <div className="login-container">
        <div className="login-blue-panel">
          <h1>Somos Cantuta</h1>
          <p>Transporte UNE</p>
        </div>
        <div className="login-form-panel">
          <form onSubmit={handleLogin} className="form-box">
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/ea/Logo_UNE.png" width="80" />
            <h2>Movilidad UNE</h2>
            <input name="user" placeholder="Código / Usuario" required />
            <input name="pass" type="password" placeholder="Contraseña" required />
            <button type="submit">Iniciar Sesión</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header>
        <span>🚍 <b>{rol}:</b> {usuarioActivo.nombre}</span>
        <button onClick={() => setRol(null)}>Salir</button>
      </header>
      <div className="main-content">
        <aside>
          <h3>Opciones</h3>
          {rol === "Estudiante" && (
            <div className="menu-buttons">
              <button className="btn-b">📍 Estoy en Paradero</button>
              <button className="btn-r">⚠️ No subí</button>
              <a href="#" className="wa-link">WhatsApp Grupo</a>
            </div>
          )}
          {rol === "Conductor" && (
            <button onClick={() => setTracking(!tracking)} className={tracking ? "btn-r" : "btn-g"}>
              {tracking ? "Detener GPS" : "Compartir Ubicación"}
            </button>
          )}
          {rol === "Administrador" && (
             <div>
               <button className="btn-b">Ver 4 Mapas</button>
               <button className="btn-b">Reportes Hoy</button>
             </div>
          )}
        </aside>
        <main>
           <div className="map-placeholder">
             {tracking ? "🛰️ GPS ACTIVO - Transmitiendo..." : "Mapa de Ruta Bolognesi"}
             <div className="fake-map"></div>
           </div>
        </main>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
