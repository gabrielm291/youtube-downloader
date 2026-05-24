async function downloadVideo() {
    const url = document.getElementById('url').value;
    const format = document.getElementById('format').value;
    const status = document.getElementById('status');

    if (!url) {
        status.innerText = 'Bitte URL eingeben';
        return;
    }

    status.innerText = 'Download läuft...';

    try {
        const response = await fetch('https://DEIN-SERVER.onrender.com/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: url,
                format: format
            })
        });

        const data = await response.json();

        if (data.success) {
            status.innerHTML = `
                Download fertig.<br><br>
                <a href="${data.download_url}" target="_blank">
                    Datei herunterladen
                </a>
            `;
        } else {
            status.innerText = data.error;
        }

    } catch (err) {
        status.innerText = 'Server Fehler';
    }
}