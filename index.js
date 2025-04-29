let scheme = document.getElementById("new-scheme")

scheme.addEventListener("submit", function(e) {
    e.preventDefault()

    let seedColor = document.getElementById("seed-color").value
    const colorSchemeMode = document.getElementById("color-scheme-mode").value.toLowerCase()

    // Remove "#" in seedColor for the API
    seedColor = seedColor.replace("#", "");

    console.log(seedColor)
    console.log(colorSchemeMode)

    // ATENTION! Fetch with backticks `
    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${colorSchemeMode}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("scheme-color").innerHTML = ""; // First we have to empty it
            data.colors.forEach(color => {
                document.getElementById("scheme-color").innerHTML += `
                    <div class="bar">
                        <div class="color-column" style="background-color:${color.hex.value};"></div>
                        <div class="hex-text" data-hex="${color.hex.value}">${color.hex.value}</div>
                    </div>
                `;
            });
            
             // Adaugăm evenimentul de copiere după ce elementele au fost adăugate în DOM
             const hexElements = document.querySelectorAll(".hex-text");
             hexElements.forEach(el => {
                 el.addEventListener("click", () => {
                     const hex = el.dataset.hex;
                     navigator.clipboard.writeText(hex).then(() => {
                         const originalText = el.textContent;
                         el.textContent = "Copied!";
                         setTimeout(() => {
                             el.textContent = originalText;
                         }, 1000);
                     });
                 });
             });
        });
});
