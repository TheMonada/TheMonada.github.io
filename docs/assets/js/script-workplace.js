async function fetchTools() {
    let response = await fetch('assets/data/tools.json');
    const tools = await response.json();
    response = await fetch('assets/data/pocs.json');
    const pocs = await response.json();
    response = await fetch('assets/data/misc.json');
    const misc = await response.json();
    return { tools, pocs, misc };
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
    const { tools, enumPoCs, enumMisc } = await fetchTools();

    const allTools = Object.assign({}, tools, enumPoCs, enumMisc);

    const iframe = document.getElementById('tool-content');  

    const buttonToolbox = document.getElementById('toolbox-button');
    const arrowToolbox = document.getElementById('toolbox-arrow');
    const dropdownToolbox = document.getElementById('toolbox-dropdown');

    const buttonPoC = document.getElementById('pocs-button');
    const arrowPoC = document.getElementById('pocs-arrow');
    const dropdownPoC = document.getElementById('pocs-dropdown');

    const buttonMisc = document.getElementById('misc-button');
    const arrowMisc = document.getElementById('misc-arrow');
    const dropdownMisc = document.getElementById('misc-dropdown');

    buttonToolbox.addEventListener('click', function () {
        if (!document.getElementById('sidebar').classList.contains('collapsed')) {
            dropdownToolbox.style.display = (dropdownToolbox.style.display === 'none') ? 'block' : 'none';
            dropdownPoC.style.display = 'none';
            dropdownMisc.style.display = 'none';
            arrowToolbox.className = (arrowToolbox.className === 'fa-solid fa-chevron-right') ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-right';
        } else {
            document.getElementById('sidebar').classList.toggle('collapsed');
        }        
    });

    buttonPoC.addEventListener('click', function () {
        if (!document.getElementById('sidebar').classList.contains('collapsed')) {
            dropdownPoC.style.display = (dropdownPoC.style.display === 'none') ? 'block' : 'none';
            dropdownToolbox.style.display = 'none';
            dropdownMisc.style.display = 'none';
            arrowPoC.className = (arrowPoC.className === 'fa-solid fa-chevron-right') ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-right';
        } else {
            document.getElementById('sidebar').classList.toggle('collapsed');
        }
    });

    buttonMisc.addEventListener('click', function () {
        if (!document.getElementById('sidebar').classList.contains('collapsed')) {
            dropdownMisc.style.display = (dropdownMisc.style.display === 'none') ? 'block' : 'none';
            dropdownToolbox.style.display = 'none';
            dropdownPoC.style.display = 'none';
            arrowMisc.className = (arrowMisc.className === 'fa-solid fa-chevron-right') ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-right';
        } else {
            document.getElementById('sidebar').classList.toggle('collapsed');
        }
    });

    for (let tool in allTools) {
        let link = document.createElement('a');
        link.id = tools[tool].id;
        link.textContent = ` • ${tools[tool].name}`;
        link.addEventListener('click', function() {
            if (document.getElementById(tools[tool].frame)) {
                createHandler(tool, allTools)();
            } else {
                let tab = document.createElement('div');
                let tabLink = document.createElement('a');
                tabLink.textContent = tools[tool].name;
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
                iframe.id = tools[tool].frame;
                iframe.src = tools[tool].link;
                iframe.frameBorder = '0';
                iframe.className = 'iframe';
                document.getElementById('tab-content').appendChild(iframe);
                closeButton.addEventListener('click', createCloseHandler(tab, iframe));
                createHandler(tool, allTools)();
            }
        });
        if (tool in tools) {
            dropdownToolbox.appendChild(link);
        } else if (tool in enumPoCs) {
            dropdownPoC.appendChild(link);
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
        dropdownMisc.style.display = 'none';
        arrowToolbox.className = 'fa-solid fa-chevron-right';
        arrowPoC.className = 'fa-solid fa-chevron-right';
        arrowMisc.className = 'fa-solid fa-chevron-right';
        document.getElementById('sidebar').classList.toggle('collapsed');
    });
})();