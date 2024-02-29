const tools = {
    'cyberchef': {
        'name': 'CyberChef',
        'id': 'cyberchef-link',
        'link': 'https://gchq.github.io/CyberChef/#theme=dark'
    },
    'webhook': {
        'name': 'Webhook',
        'id': 'webhook-link',
        'link': 'https://webhook.site/'
    }
}

const enumPoCs = { }

const enumMisc = { 
    'regex101': {
        'name': 'Regex101',
        'id': 'regex101-link',
        'link': 'https://regex101.com/'
    }
}

function addListeners() {
    const iframe = document.getElementById('tool-content');

    const buttonToolbox = document.getElementById('toolbox-button');
    const dropdownToolbox = document.getElementById('toolbox-dropdown');
    
    const buttonPoC = document.getElementById('pocs-button');
    const dropdownPoC = document.getElementById('pocs-dropdown');

    const buttonMisc = document.getElementById('misc-button');
    const dropdownMisc = document.getElementById('misc-dropdown');
   
    buttonToolbox.addEventListener('click', function () {
        dropdownToolbox.style.display = (dropdownToolbox.style.display === 'none') ? 'block' : 'none';
        dropdownPoC.style.display = 'none';
        dropdownMisc.style.display = 'none';
    });

    buttonPoC.addEventListener('click', function () {
        dropdownPoC.style.display = (dropdownPoC.style.display === 'none') ? 'block' : 'none';
        dropdownToolbox.style.display = 'none';
        dropdownMisc.style.display = 'none';
    });

    buttonMisc.addEventListener('click', function () {
        dropdownMisc.style.display = (dropdownMisc.style.display === 'none') ? 'block' : 'none';
        dropdownToolbox.style.display = 'none';
        dropdownPoC.style.display = 'none';
    });

    for (const tool in tools) {
        dropdownToolbox.innerHTML += `<a id="${tools[tool].id}">${tools[tool].name}</a>`;
        const link = document.getElementById(tools[tool].id);
        link.addEventListener('click', function (e) {
            e.preventDefault();
            iframe.src = tools[tool].link;
        });
    }

    for (const poc in enumPoCs) {
        dropdownPoC.innerHTML += `<a id="${enumPoCs[poc].id}">${enumPoCs[poc].name}</a>`;
        const link = document.getElementById(enumPoCs[poc].id);
        link.addEventListener('click', function (e) {
            e.preventDefault();
            iframe.src = enumPoCs[poc].link;
        });
    }

    for (const misc in enumMisc) {
        dropdownMisc.innerHTML += `<a id="${enumMisc[misc].id}">${enumMisc[misc].name}</a>`;
        const link = document.getElementById(enumMisc[misc].id);
        link.addEventListener('click', function (e) {
            e.preventDefault();
            iframe.src = enumMisc[misc].link;
        });
    }
};

addListeners();