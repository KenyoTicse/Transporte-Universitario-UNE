// Esta función se debe llamar cuando el rol es 'Administrativo'
function renderAdminDashboard() {
  return (
    <div className="admin-wrapper" style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      
      {/* HEADER: Título y Cerrar Sesión */}
      <header className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', backgroundColor: '#0047AB', color: 'white', borderBottom: '1px solid #ddd' }}>
        <h2 style={{ margin: 0, fontSize: '20px' }}>🚍 Somos Cantuta - Panel General</h2>
        <button onClick={() => location.reload()} style={{ background: 'none', border: '1px solid white', color: 'white', padding: '5px 15px', borderRadius: '5px', cursor: 'pointer' }}>
          Cerrar Sesión
        </button>
      </header>

      {/* CUERPO PRINCIPAL: Sidebar + Grid de Mapas */}
      <div className="admin-body" style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* SIDEBAR: Opciones, Gestión de Coadmins, Estado de Rutas */}
        <aside className="admin-sidebar" style={{ width: '280px', backgroundColor: 'white', borderRight: '1px solid #ddd', padding: '20px', overflowY: 'auto' }}>
          <h4 style={{ color: '#666', marginBottom: '15px' }}>OPCIONES</h4>
          <button className="btn-blue-rect" style={{ width: '100%', padding: '12px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginBottom: '20px' }}>
            VER REPORTES
          </button>

          <h4 style={{ color: '#666', marginBottom: '10px' }}>AGREGAR ADMINISTRADOR</h4>
          <p style={{ fontSize: '12px', color: '#888' }}>Usuario:<br/>Contraseña:</p>

          <h4 style={{ color: '#666', marginTop: '20px', marginBottom: '10px' }}>COADMINISTRADOR 1</h4>
          <div className="coadmin-controls" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px' }}>RUTA BOLOGNESI</span>
              <button className="btn-status red" style={{ padding: '4px 10px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '15px', fontSize: '11px' }}>DENEGADO</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px' }}>RUTA P. SANTA ANITA</span>
              <button className="btn-status green" style={{ padding: '4px 10px', backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '15px', fontSize: '11px' }}>HABILITADO</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px' }}>RUTA UNI</span>
              <button className="btn-status green" style={{ padding: '4px 10px', backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '15px', fontSize: '11px' }}>HABILITADO</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px' }}>RUTA P. NUEVO</span>
              <button className="btn-status green" style={{ padding: '4px 10px', backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '15px', fontSize: '11px' }}>HABILITADO</button>
            </div>
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL: Grid de 4 Mapas */}
        <main className="admin-main" style={{ flex: 1, padding: '20px', backgroundColor: '#f4f7f6' }}>
          <div className="maps-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', height: '100%' }}>
            
            {[
              { id: 'bolo', name: 'BOLOGNESI', coords: '-11.940, -76.700' },
              { id: 'santa', name: 'PUENTE SANTA ANITA', coords: '-11.938, -76.705' },
              { id: 'uni', name: 'UNI', coords: '-11.936, -76.702' },
              { id: 'nuevo', name: 'PUENTE NUEVO', coords: '-11.934, -76.708' }
            ].map(ruta => (
              <div key={ruta.id} className="map-card" style={{ background: 'white', borderRadius: '15px', border: '1px solid #eee', padding: '15px', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#333' }}>{ruta.name}</h3>
                <div className="mini-map" id={`map-${ruta.id}`} style={{ flex: 1, backgroundColor: '#e2e8f0', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #aaa' }}>
                  <img 
                    src={`https://maps.googleapis.com/maps/api/staticmap?center=${ruta.coords}&zoom=14&size=400x250&markers=color:blue|label:U|${ruta.coords}&key=TU_API_KEY`} 
                    alt={`Mapa ${ruta.name}`} 
                    style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* FOOTER: Resumen de Paraderos (Sección Inferior de imagen_4.png) */}
      <footer className="admin-footer" style={{ backgroundColor: 'white', borderTop: '1px solid #ddd', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {[
          { name: 'UNI', paradero: 'Puerta 3', eta: '12 min' },
          { name: 'PUENTE NUEVO', paradero: 'Tagore', eta: '5 min' },
          { name: 'BOLOGNESI', paradero: 'Santa Anita', eta: 'Llegó' },
          { name: 'PUENTE SANTA ANITA', paradero: ' Covian', eta: '18 min' }
        ].map(ruta => (
          <div key={ruta.name} className="ruta-resumen" style={{ flex: '0 0 22%', padding: '10px', fontSize: '13px' }}>
            <h5 style={{ margin: '0 0 5px 0', color: '#0047AB' }}>RUTA {ruta.name}</h5>
            <p style={{ margin: 0, color: '#666' }}>PARADERO A LLEGAR: <b>{ruta.paradero}</b></p>
            <p style={{ margin: 0, color: '#666' }}>TIEMPO DE LLEGADA: <b>{ruta.eta}</b></p>
          </div>
        ))}
      </footer>
    </div>
  );
}
