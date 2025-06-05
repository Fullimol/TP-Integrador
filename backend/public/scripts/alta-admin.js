    const form = document.getElementById('formAlta');
    const errorFront = document.getElementById('errorFront');

    form.addEventListener('submit', e => {
      //quito espacios vacios de los campos solicitados
      const email = form.email.value.trim();
      const password = form.password.value.trim();
      const confirmPassword = form.confirmPassword.value.trim();

      //limpio mensaje de error previo
      errorFront.style.display = 'none';
      errorFront.textContent = '';
      errorBack.style.display = 'none';
      errorBack.textContent = '';

      //validaciones del lado del front
      //campos vacios
      if (!email || !password || !confirmPassword) {
        e.preventDefault();
        mostrarError('Complete todos los campos solicitados'); //esta validacion tambien se hace desde el back para mas seguridad
        return;
      }

      //contraseñas no coinciden
      if (password !== confirmPassword) {
        e.preventDefault();
        mostrarError('Las contraseñas no coinciden');
      }
    });

    //funcion para mostrar mensaje de error (pueden ser los dos anteriores)
    function mostrarError(mensaje) {
      errorFront.textContent = mensaje;
      errorFront.style.display = 'block';
    }

    document.getElementById('btnCancelar').addEventListener('click', () => {
        window.location.href = '/juegos/dashboard';
      });