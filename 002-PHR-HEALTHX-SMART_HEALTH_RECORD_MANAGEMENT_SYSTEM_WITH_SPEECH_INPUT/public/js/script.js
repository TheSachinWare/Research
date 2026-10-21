(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()

// For Web Speech API.
function startVoiceInput(entity, fieldId) {
    // Check if the browser supports SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Sorry, your browser doesn't support voice recognition.");
        return;
    }

    // Create a new speech recognition instance
    const recognition = new SpeechRecognition();
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    // Start speech recognition
    recognition.start();

    recognition.onresult = (event) => {
        // Get the transcript of the spoken words
        const transcript = event.results[0][0].transcript;

        // Find the input or textarea field dynamically based on entity and field
        const field = document.querySelector(`input[name="${entity}[${fieldId}]"], textarea[name="${entity}[${fieldId}]"]`);
        
        if (field) {
            field.value = transcript;
        }
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error detected: " + event.error);
        alert("Error occurred in recognition: " + event.error);
    };

    recognition.onend = () => {
        console.log("Speech recognition service disconnected");
    };
}
