function downloadVideo() {
    const url = document.getElementById("url").value;
    const format = document.getElementById("format").value;
    const status = document.getElementById("status");

    if (!url) {
        status.innerText = "Bitte eine URL eingeben.";
        return;
    }

    status.innerText =
        "GitHub Pages kann keine echten Downloads machen.";

    console.log("URL:", url);
    console.log("Format:", format);
}