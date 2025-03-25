(function() {
    // Create and insert an audio element for the provided MP3
    var audio = document.createElement('audio');
    audio.src = 'https://raw.githubusercontent.com/MachadoOtto/spinningmonkee/refs/heads/main/monkee.mp3';  // Raw MP3 URL
    audio.autoplay = true;
    audio.loop = true;
    document.body.appendChild(audio);

    // Create a full-screen neon green overlay under the GIFs but above the page content
    var overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = '#00FF00';  // Neon green
    overlay.style.zIndex = 9998;  // Below the cats (9999) but above everything else
    overlay.style.opacity = '0';  // Initially transparent
    overlay.style.transition = 'opacity 0.2s';  // Smooth fade in/out for flash
    document.body.appendChild(overlay);

    // Function to create your hosted GIF elements
    function spawnCatGif() {
        var gif = document.createElement('img');
        gif.src = 'https://raw.githubusercontent.com/MachadoOtto/spinningmonkee/refs/heads/main/monkee.gif';  // Your hosted GIF URL
        gif.style.position = 'fixed';
        gif.style.zIndex = 9999;  // Above the overlay
        gif.style.width = '150px';
        gif.style.animation = 'spin 2s linear infinite';
        gif.style.top = Math.random() * window.innerHeight + 'px';
        gif.style.left = Math.random() * window.innerWidth + 'px';
        document.body.appendChild(gif);

        // Remove GIF after 10 seconds to prevent overflow
        setTimeout(() => gif.remove(), 10000);
    }

    // Spawn your hosted GIFs immediately every 500ms
    setInterval(spawnCatGif, 500);

    // Create a function to handle the neon green flash
    function flashScreen() {
        overlay.style.opacity = '1';  // Show neon green overlay
        setTimeout(() => {
            overlay.style.opacity = '0';  // Hide neon green overlay
        }, 200);  // Duration of the flash
    }

    // Delay the spinning effect and other animations by 3-4 seconds
    setTimeout(() => {
        // Inject spinning CSS animation for all page elements
        var style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(`
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes spin-all {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            body * {
                animation: spin-all 5s linear infinite;
            }
        `));
        document.head.appendChild(style);

        // Trigger screen flash every 2 seconds
        setInterval(flashScreen, 2000);
    }, 3500);  // 3.5-second delay for spinning and green flash to start
})();
