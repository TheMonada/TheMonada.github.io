async function fetchTools() {
    let response = await fetch('assets/data/tools.json');
    const tools = await response.json();
    response = await fetch('assets/data/pocs.json');
    const pocs = await response.json();
    response = await fetch('assets/data/wordlists.json');
    const wordlists = await response.json();
    response = await fetch('assets/data/misc.json');
    const misc = await response.json();
    return { tools, pocs, wordlists, misc };
}

function createHandler(tool, allTools) {
    return function() {
        let frames = document.getElementsByClassName('iframe');
        for (let frame of frames) {
            frame.style.display = 'none';
        }
        document.getElementById(allTools[tool].frame).style.display = 'block';
    };
}

function createCloseHandler(tab, iframe) {
    return function() {
        tab.remove();
        iframe.remove();
    };
}

(async function() {
    const fetchedTools = await fetchTools();

    const allTools = Object.assign({}, fetchedTools.tools, fetchedTools.pocs, fetchedTools.wordlists, fetchedTools.misc);

    const buttonToolbox = document.getElementById('toolbox-button');
    const arrowToolbox = document.getElementById('toolbox-arrow');
    const dropdownToolbox = document.getElementById('toolbox-dropdown');

    const buttonPoC = document.getElementById('pocs-button');
    const arrowPoC = document.getElementById('pocs-arrow');
    const dropdownPoC = document.getElementById('pocs-dropdown');

    const buttonWordlists = document.getElementById('wordlists-button');
    const arrowWordlists = document.getElementById('wordlists-arrow');
    const dropdownWordlists = document.getElementById('wordlists-dropdown');

    const buttonMisc = document.getElementById('misc-button');
    const arrowMisc = document.getElementById('misc-arrow');
    const dropdownMisc = document.getElementById('misc-dropdown');

    buttonToolbox.addEventListener('click', function () {
        if (!document.getElementById('sidebar').classList.contains('collapsed')) {
            dropdownToolbox.style.display = (dropdownToolbox.style.display === 'none') ? 'block' : 'none';
            dropdownPoC.style.display = 'none';
            dropdownWordlists.style.display = 'none';
            dropdownMisc.style.display = 'none';
            arrowToolbox.className = (arrowToolbox.className === 'fa-solid fa-chevron-right') ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-right';
            arrowPoC.className = 'fa-solid fa-chevron-right';
            arrowWordlists.className = 'fa-solid fa-chevron-right';
            arrowMisc.className = 'fa-solid fa-chevron-right';
        } else {
            document.getElementById('sidebar').classList.toggle('collapsed');
        }        
    });

    buttonPoC.addEventListener('click', function () {
        if (!document.getElementById('sidebar').classList.contains('collapsed')) {
            dropdownPoC.style.display = (dropdownPoC.style.display === 'none') ? 'block' : 'none';
            dropdownToolbox.style.display = 'none';
            dropdownWordlists.style.display = 'none';
            dropdownMisc.style.display = 'none';
            arrowPoC.className = (arrowPoC.className === 'fa-solid fa-chevron-right') ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-right';
            arrowToolbox.className = 'fa-solid fa-chevron-right';
            arrowWordlists.className = 'fa-solid fa-chevron-right';
            arrowMisc.className = 'fa-solid fa-chevron-right';
        } else {
            document.getElementById('sidebar').classList.toggle('collapsed');
        }
    });

    buttonWordlists.addEventListener('click', function () {
        if (!document.getElementById('sidebar').classList.contains('collapsed')) {
            dropdownWordlists.style.display = (dropdownWordlists.style.display === 'none') ? 'block' : 'none';
            dropdownToolbox.style.display = 'none';
            dropdownPoC.style.display = 'none';
            dropdownMisc.style.display = 'none';
            arrowWordlists.className = (arrowWordlists.className === 'fa-solid fa-chevron-right') ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-right';
            arrowToolbox.className = 'fa-solid fa-chevron-right';
            arrowPoC.className = 'fa-solid fa-chevron-right';
            arrowMisc.className = 'fa-solid fa-chevron-right';
        } else {
            document.getElementById('sidebar').classList.toggle('collapsed');
        }
    });

    buttonMisc.addEventListener('click', function () {
        if (!document.getElementById('sidebar').classList.contains('collapsed')) {
            dropdownMisc.style.display = (dropdownMisc.style.display === 'none') ? 'block' : 'none';
            dropdownToolbox.style.display = 'none';
            dropdownPoC.style.display = 'none';
            dropdownWordlists.style.display = 'none';
            arrowMisc.className = (arrowMisc.className === 'fa-solid fa-chevron-right') ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-right';
            arrowToolbox.className = 'fa-solid fa-chevron-right';
            arrowPoC.className = 'fa-solid fa-chevron-right';
            arrowWordlists.className = 'fa-solid fa-chevron-right';
        } else {
            document.getElementById('sidebar').classList.toggle('collapsed');
        }
    });

    for (let tool in allTools) {
        let link = document.createElement('a');
        link.id = allTools[tool].id;
        link.textContent = ` • ${allTools[tool].name}`;
        link.addEventListener('click', function() {
            if (document.getElementById(allTools[tool].frame)) {
                createHandler(tool, allTools)();
            } else {
                let tab = document.createElement('div');
                let tabLink = document.createElement('a');
                tabLink.textContent = allTools[tool].name;
                let closeButton = document.createElement('a');
                let closeIcon = document.createElement('i');
                closeIcon.className = 'fa-regular fa-circle-xmark';
                closeButton.appendChild(closeIcon);
                let separator = document.createElement('div');
                separator.className = 'separator';
                tabLink.addEventListener('click', createHandler(tool, allTools));
                tab.appendChild(tabLink);
                tab.appendChild(closeButton);
                tab.appendChild(separator);
                document.getElementById('tabs').appendChild(tab);

                let iframe = document.createElement('iframe');
                iframe.id = allTools[tool].frame;
                iframe.src = allTools[tool].link;
                iframe.frameBorder = '0';
                iframe.className = 'iframe';
                document.getElementById('tab-content').appendChild(iframe);
                closeButton.addEventListener('click', createCloseHandler(tab, iframe));
                createHandler(tool, allTools)();
            }
        });
        if (tool in fetchedTools.tools) {
            dropdownToolbox.appendChild(link);
        } else if (tool in fetchedTools.pocs) {
            dropdownPoC.appendChild(link);
        } else if (tool in fetchedTools.wordlists) {
            dropdownWordlists.appendChild(link);
        } else {
            dropdownMisc.appendChild(link);
        }
    }

    document.getElementById('scroll-left').addEventListener('click', function() {
        document.getElementById('tabs').scrollLeft -= 100;
    });
    document.getElementById('scroll-right').addEventListener('click', function() {
        document.getElementById('tabs').scrollLeft += 100;
    });

    document.getElementById('collapse-button').addEventListener('click', function() {
        dropdownToolbox.style.display = 'none';
        dropdownPoC.style.display = 'none';
        dropdownWordlists.style.display = 'none';
        dropdownMisc.style.display = 'none';
        arrowToolbox.className = 'fa-solid fa-chevron-right';
        arrowPoC.className = 'fa-solid fa-chevron-right';
        arrowWordlists.className = 'fa-solid fa-chevron-right';
        arrowMisc.className = 'fa-solid fa-chevron-right';
        document.getElementById('sidebar').classList.toggle('collapsed');
    });

    document.getElementById('capture-button').addEventListener('click', async function() {
        try {
            const mediaStream = await navigator.mediaDevices.getDisplayMedia({video: true});
            const track = mediaStream.getVideoTracks()[0];
            const imageCapture = new ImageCapture(track)
            const bitmap = await imageCapture.grabFrame();
            const canvas = document.createElement('canvas');
            canvas.width = bitmap.width;
            canvas.height = bitmap.height;
            const context = canvas.getContext('2d');
            context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);
            const imgData = canvas.toDataURL('image/png');
            
            const a = document.createElement('a');
            a.href = imgData;
            a.download = 'screenshot.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            track.stop();
        } catch(err) {
            console.error("Error: " + err);
        }
    });

    document.getElementById('toggle-spotify').addEventListener('click', function() {
        const iframe = document.getElementById('spotify-iframe');
        if (iframe.style.display === 'none') {
            iframe.style.display = 'block';
            iframe.style.transition = 'opacity 1s';
            iframe.style.opacity = 1;
        } else {
            iframe.style.transition = 'opacity 1s';
            iframe.style.opacity = 0;
            setTimeout(function() {
                iframe.style.display = 'none';
            }, 1000);
        }
    });
})();