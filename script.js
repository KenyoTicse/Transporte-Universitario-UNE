// Base de datos local para pruebas rápidas
const usuariosValidos = {
    "20223691": { clave: "2022", rol: "Estudiante", nombre: "Estudiante UNE" },
    "12345678": { clave: "1234", rol: "Conductor", nombre: "Chofer Principal" },
    "Admin": { clave: "AdminSC", rol: "Administrativo", nombre: "Admin General" }
};

let usuarioActivo = null;

function login() {
    const userIn = document.getElementById('usuarioInput').value;
    const passIn = document.getElementById('claveInput').value;

    const datos = usuariosValidos[userIn];

    if (datos && datos.clave === passIn) {
        usuarioActivo = datos;
        // Si es admin, va directo a su panel especial
        if (datos.rol === "Administrativo") {
            irAPanelAdmin();
        } else {
            irASeleccionRuta();
        }
    } else {
        alert("Usuario o contraseña incorrectos. Verifica tus credenciales.");
    }
}

// Funciones de navegación
function irASeleccionRuta() {
    document.getElementById('pantalla-login').style.display = 'none';
    document.getElementById('pantalla-rutas').style.display = 'block';
}

function irAPanelAdmin() {
    document.getElementById('pantalla-login').style.display = 'none';
    document.getElementById('pantalla-admin').style.display = 'block';
}
