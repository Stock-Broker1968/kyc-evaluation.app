document.addEventListener('DOMContentLoaded', () => {
    // Capturamos los elementos del HTML
    const gateSection = document.getElementById('gate-section');
    const exerciseSection = document.getElementById('exercise-section');
    const leadForm = document.getElementById('lead-form');
    const formStatus = document.getElementById('form-status');
    const optionButtons = document.querySelectorAll('.option-btn');
    const resultsSection = document.getElementById('results-section');
    const hotmartLink = document.getElementById('hotmart-link');

    // Configura tu link de Hotmart aquí
    hotmartLink.href = "https://link.hotmart.com/TU-CODIGO-DE-PRODUCTO";

    // Lógica del formulario de registro
    leadForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita que la página se recargue
        formStatus.textContent = 'Procesando...';
        
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;

        try {
            // ¡Esta es la parte nueva! Enviamos los datos a nuestra API.
            const response = await fetch('/api/registrar-prospecto', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, email, telefono })
            });

            // Si la API responde "OK" (status 200)
            if (response.ok) {
                formStatus.textContent = '¡Registro exitoso! Cargando ejercicio...';
                formStatus.style.color = 'green';
                
                // Ocultamos el formulario y mostramos el ejercicio
                setTimeout(() => {
                    gateSection.classList.add('hidden');
                    exerciseSection.classList.remove('hidden');
                }, 1000);
            } else {
                // Si la API da un error
                throw new Error('El servidor respondió con un error.');
            }
        } catch (error) {
            formStatus.textContent = 'Error en el registro. Inténtalo de nuevo.';
            formStatus.style.color = 'red';
        }
    });

    // La lógica del ejercicio (esta no cambia)
    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const userAnswer = button.dataset.answer;
            const correctAnswer = 'alto';
            optionButtons.forEach(btn => btn.disabled = true);
            
            if (userAnswer === correctAnswer) {
                button.style.backgroundColor = '#28a745';
                button.style.color = 'white';
            } else {
                button.style.backgroundColor = '#dc3545';
                button.style.color = 'white';
                document.querySelector(`[data-answer="${correctAnswer}"]`).style.backgroundColor = '#28a745';
            }
            
            setTimeout(() => {
                resultsSection.classList.remove('hidden');
            }, 800);
        });
    });
});