async function downloadVideo() {
    const url = document.getElementById('url').value;
    const format = document.getElementById('format').value;
    const status = document.getElementById('status');
    
    status.innerText = 'Download läuft...';
    
    try {
        const response = await fetch('http://127.0.0.1:5000/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url, format })
        });
        
        const data = await response.json();
        
        if (data.success) {
            status.innerHTML = `
                Fertig!<br>
                <a href="http://127.0.0.1:5000/file/${data.filename}">
                    Datei herunterladen
                </a>
            `;
        } else {
            status.innerText = data.error;
        }
    } catch (error) {
        status.innerText = 'Fehler beim Download';
    }
}
