const tools = {
    'cyberchef': {
        'name': 'CyberChef',
        'id': 'cyberchef-link',
        'frame': 'cyberchef-frame',
        'link': 'https://gchq.github.io/CyberChef/#theme=dark'
    },
    'webcheck': {
        'name': 'Webcheck',
        'id': 'webcheck-link',
        'frame': 'webcheck-frame',
        'link': 'https://web-check.xyz/'
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

const content = document.getElementById('tab-content');

const allTools = Object.assign({}, tools, enumPoCs, enumMisc);

function createHandler(tool) {
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

for (let tool in allTools) {
    let link = document.createElement('a');
    link.id = tools[tool].id;
    link.textContent = ` > ${tools[tool].name}`;
    link.addEventListener('click', function() {
        if (document.getElementById(tools[tool].frame)) {
            createHandler(tool)();
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
            tabLink.addEventListener('click', createHandler(tool));
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
            createHandler(tool)();
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