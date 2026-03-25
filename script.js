import React from 'react';

function renderAdminDashboard() {
  const rutas = [
    { id: 'bolo', name: 'BOLOGNESI', coords: '-12.043, -77.028', paradero: 'Santa Anita', eta: 'Llegó', status: 'DENEGADO', color: '#ef4444' },
    { id: 'santa', name: 'PUENTE SANTA ANITA', coords: '-12.040, -76.975', paradero: 'Covian', eta: '18 min', status: 'HABILITADO', color: '#22c55e' },
    { id: 'uni', name: 'UNI', coords: '-12.004, -77.049', paradero: 'Puerta 3', eta: '12 min', status: 'HABILITADO', color: '#22c55e' },
    { id: 'nuevo', name: 'PUENTE NUEVO', coords: '-12.030, -77.010', paradero: 'Tagore', eta: '5 min', status: 'HABILITADO', color: '#22c55e' }
  ];

  return (
    <div className="admin-wrapper" style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f8fafc', fontFamily: '"Inter", sans-serif' }}>
      
      {/* HEADER PROFESIONAL */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 32px', height: '64px', backgroundColor: '#1e3a8a', color: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>🚍</span>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600', letterSpacing: '0.5px' }}>SOMOS CANTUTA <span style={{ fontWeight: '300', opacity: 0.8 }}>| Panel de Control</span></h2>
        </div>
        <button 
          onClick={() => window.location.reload()} 
          style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s' }}
          onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
          onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
        >
          Cerrar Sesión
        </button>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* SIDEBAR MODERNO */}
        <aside style={{ width: '300px', backgroundColor: 'white', borderRight: '1px solid #e2e8f0', padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <section>
            <button style={{ width: '100%', padding: '14px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)' }}>
              GENERAR REPORTES PDF
            </button>
          </section>

          <section>
            <h4 style={{ color: '#64748b', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.05em' }}>Gestión de Acceso</h4>
            <div style={{ padding: '16px', backgroundColor: '#f1f5f9', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <p style={{ fontSize: '13px', margin: '0 0 8px 0', color: '#475569' }}>Nuevo Co-administrador:</p>
              <input type="text" placeholder="Usuario" style={{ width: '100%', padding: '8px', marginBottom: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              <button style={{ width: '100%', padding: '8px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Agregar</button>
            </div>
          </section>

          <section>
            <h4 style={{ color: '#64748b', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '12px' }}>Estado de Unidades</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {rutas.map(r => (
                <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '13px', fontWeight: '500', color: '#1e293b' }}>{r.name}</span>
                  <span style={{ padding: '4px 10px', backgroundColor: r.color + '15', color: r.color, border: `1px solid ${r.color}`, borderRadius: '20px', fontSize: '10px', fontWeight: 'bold' }}>{r.status}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>

        {/* ÁREA DE MAPAS (GRID DINÁMICO) */}
        <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
            {rutas.map(ruta => (
              <div key={ruta.id} style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0' }}>
                <div style={{ padding: '16px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, fontSize: '15px', color: '#1e293b', fontWeight: '600' }}>📍 {ruta.name}</h3>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Lat: {ruta.coords.split(',')[0]}</span>
                </div>
                <div style={{ height: '280px', backgroundColor: '#cbd5e1', position: 'relative' }}>
                  {/* Imagen del Mapa con API Key simulada */}
                  <img 
                    src={`https://maps.googleapis.com/maps/api/staticmap?center=${ruta.coords}&zoom=14&size=600x300&markers=color:blue|label:B|${ruta.coords}&key=TU_API_KEY`} 
                    alt={`Ruta ${ruta.name}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* FOOTER DE MONITOREO EN TIEMPO REAL */}
      <footer style={{ backgroundColor: '#1e293b', color: 'white', padding: '20px 32px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {rutas.map(ruta => (
          <div key={ruta.id} style={{ borderLeft: '3px solid #3b82f6', paddingLeft: '15px' }}>
            <h5 style={{ margin: '0 0 4px 0', color: '#93c5fd', fontSize: '11px', textTransform: 'uppercase' }}>{ruta.name}</h5>
            <div style={{ fontSize: '13px' }}>
              <div style={{ marginBottom: '2px' }}>📍 <span style={{ color: '#cbd5e1' }}>Prox:</span> <b>{ruta.paradero}</b></div>
              <div>⏱️ <span style={{ color: '#cbd5e1' }}>ETA:</span> <b style={{ color: ruta.eta === 'Llegó' ? '#4ade80' : 'white' }}>{ruta.eta}</b></div>
            </div>
          </div>
        ))}
      </footer>
    </div>
  );
}
