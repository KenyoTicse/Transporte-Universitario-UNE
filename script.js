const { useState } = React;

function App() {
  const [rol, setRol] = useState(null);
  const [pantalla, setPantalla] = useState("login");
  const [ruta, setRuta] = useState("");

  // Usuarios de prueba
  const db = {
    "20223691": { pass: "2022", tipo: "Estudiante" },
    "12345678": { pass: "1234", tipo: "Conductor" },
    "Admin": { pass: "AdminSC", tipo: "Administrativo" }
  };

  const login = (e) => {
    e.preventDefault();
    const u = e.target.user.value;
    const p = e.target.pass.value;
    const t = e.target.tipo.value;

    if (db[u] && db[u].pass === p && db[u].tipo === t) {
      setRol(t);
      setPantalla(t === "Administrativo" ? "panel" : "rutas");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  if (pantalla === "login") {
    return (
      <div className="login-container">
        <div className="login-blue">
          <h1>Somos Cantuta</h1>
          <p>Transporte UNE</p>
        </div>
        <div className="login-white">
          <form onSubmit={login} className="login-form">
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/ea/Logo_UNE.png" width="80" />
            <select name="tipo" className="input-field" required>
              <option value="">Seleccionar Rol</option>
              <option value="Estudiante">Estudiante</option>
              <option value="Conductor">Conductor</option>
              <option value="Administrativo">Administrativo</option>
            </select>
            <input name="user" placeholder="Usuario" className="input-field" required />
            <input name="pass" type="password" placeholder="Contraseña" className="input-field" required />
            <button type="submit" className="btn-main">INGRESAR</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="header">
        <span>🚍 {rol} | {ruta || "Principal"}</span>
        <button onClick={() => location.reload()} className="btn-exit">Salir</button>
      </header>
      <div className="main-content">
        <div className="card">
          <h2>Panel de Control</h2>
          <p>Bienvenido al sistema de movilidad Somos Cantuta.</p>
          {rol === "Estudiante" && <button className="btn-blue">📍 Estoy en Paradero</button>}
          {rol === "Conductor" && <button className="btn-green">🟢 Compartir GPS</button>}
          {rol === "Administrativo" && <button className="btn-blue">📋 Ver Reportes</button>}
        </div>
      </div>
    </div>
  );
}

// Esta es la línea que "despierta" a React
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
