// Este archivo actúa como nuestro mini-servidor en Vercel.
export default async function handler(request, response) {
    // Solo permitimos que nos envíen datos por el método POST.
    if (request.method !== 'POST') {
        return response.status(405).json({ message: 'Método no permitido' });
    }

    const { nombre, email } = request.body;

    // Validación simple para asegurar que recibimos los datos.
    if (!nombre || !email) {
        return response.status(400).json({ message: 'Nombre y email son requeridos.' });
    }

    // --- CONEXIÓN CON ZAPIER (OPCIONAL POR AHORA) ---
    // En el futuro, aquí pondrás tu link de Zapier para enviar los datos a tu CRM.
    // const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/xxxxxxx/xxxxxxx/';
    // await fetch(ZAPIER_WEBHOOK_URL, {
    //     method: 'POST',
    //     body: JSON.stringify(request.body)
    // });
    
    // Si todo sale bien, le respondemos al frontend con un "OK".
    return response.status(200).json({ message: 'Prospecto registrado con éxito.' });
}