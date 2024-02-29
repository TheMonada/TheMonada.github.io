const tools = {
    'cyberchef': {
        'name': 'CyberChef',
        'id': 'cyberchef-link',
        'frame': 'cyberchef-frame',
        'link': 'https://gchq.github.io/CyberChef/#theme=dark'
    },
    'webhook': {
        'name': 'Webhook',
        'id': 'webhook-link',
        'frame': 'webhook-frame',
        'link': 'https://webhook.site/'
    }
}

const enumPoCs = { }

const enumMisc = { }

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

const content = document.getElementById('content');

function createHandler(tool) {
    return function() {
        let frames = document.getElementsByClassName('iframe');
        for (let frame of frames) {
            frame.style.display = 'none';
        }
        document.getElementById(tools[tool].frame).style.display = 'block';
    };
}

for (let tool in tools) {
    let link = document.createElement('a');
    link.id = tools[tool].id;
    link.textContent = ` > ${tools[tool].name}`;
    link.addEventListener('click', createHandler(tool));
    dropdownToolbox.appendChild(link);

    let iframe = document.createElement('iframe');
    iframe.id = tools[tool].frame;
    iframe.src = tools[tool].link;
    iframe.frameBorder = '0';
    iframe.className = 'iframe';
    content.appendChild(iframe);
}

for (let poc in enumPoCs) {
    let link = document.createElement('a');
    link.id = enumPoCs[poc].id;
    link.textContent = ` > ${enumPoCs[poc].name}`;
    link.addEventListener('click', createHandler(poc));
    dropdownPoC.appendChild(link);

    let iframe = document.createElement('iframe');
    iframe.id = enumPoCs[poc].frame;
    iframe.src = enumPoCs[poc].link;
    iframe.frameBorder = '0';
    iframe.className = 'iframe';
    content.appendChild(iframe);
}

for (let misc in enumMisc) {
    let link = document.createElement('a');
    link.id = enumMisc[misc].id;
    link.textContent = ` > ${enumMisc[misc].name}`;
    link.addEventListener('click', createHandler(misc));
    dropdownMisc.appendChild(link);

    let iframe = document.createElement('iframe');
    iframe.id = enumMisc[misc].frame;
    iframe.src = enumMisc[misc].link;
    iframe.frameBorder = '0';
    iframe.className = 'iframe';
    content.appendChild(iframe);
}