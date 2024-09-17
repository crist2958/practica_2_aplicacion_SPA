$(document).ready(function () {
    // Inicialmente mostramos el primer formulario y ocultamos el otro
    $('#form-rfc').show();
    $('#form-api').hide();

    // Manejo de navegación
    $('#btn-rfc').on('click', function () {
        $('#form-rfc').show();  // Mostrar el formulario RFC
        $('#form-api').hide();  // Ocultar el formulario API
    });

    $('#btn-api').on('click', function () {
        $('#form-api').show();  // Mostrar el formulario API
        $('#form-rfc').hide();  // Ocultar el formulario RFC
    });

    // Generador de RFC
    $('#rfc-form').on('submit', function (e) {
        e.preventDefault();
        let nombre = $('#nombre').val().toUpperCase();
        let apellidoP = $('#apellidoP').val().toUpperCase();
        let apellidoM = $('#apellidoM').val().toUpperCase();
        let fechaNac = $('#fechaNac').val(); // formato: YYYY-MM-DD

        let rfc = generarRFC(nombre, apellidoP, apellidoM, fechaNac);
        $('#rfc-output').text('Tu RFC generado es: ' + rfc);
    });

    // Función para generar RFC
    function generarRFC(nombre, apellidoP, apellidoM, fechaNac) {
        let rfc = apellidoP.substring(0, 2) + apellidoM.charAt(0) + nombre.charAt(0);
        let fecha = fechaNac.split('-');
        rfc += fecha[0].substring(2, 4) + fecha[1] + fecha[2];
        return rfc.toUpperCase();
    }

    // Consumir API
    $("#consultarUsuario").click(function() {
        var userId = $("#idusuario").val();

        if (!userId) {
            alert("Introduce un ID de usuario.");
            return;
        }

        var apiUrl = "https://jsonplaceholder.typicode.com/users/" + userId;

        $.ajax({
            url: apiUrl,
            method: "GET",
            success: function(data) {
                $("#nombreUsuario").val(data.name);
                $("#email").val(data.email);
            },
            error: function() {
                alert("Error al obtener los datos.");
            }
        });
    });
});
