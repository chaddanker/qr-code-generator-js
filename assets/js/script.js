if(window.location.search.length > 0) {
    window.location.href = `user.html${window.location.search}`;
}

var qrcode = new QRCode(document.getElementById("qrcode"), {
    width : 100,
    height : 100,
    useSVG: true
});

function makeCode () {		
    var elText = document.getElementById("username");
    qrcode.makeCode(`https://find-me-lime.vercel.app?${elText.value}`);
}

makeCode();

$("#username").
    on("blur", function () {
        makeCode();
    }).
    on("keydown", function (e) {
        if (e.key.length < 2) {
            makeCode();
        }
});

function next() {
    sessionStorage.setItem("username", document.querySelector('#username').value);
    sessionStorage.setItem("name", document.querySelector('#name').value + ' ' + document.querySelector('#name-l').value);
    sessionStorage.setItem("cell", document.querySelector('#cell').value);
    sessionStorage.setItem("qrcode", svgDataURL(document.querySelector('#qrsvg')));

    window.location.href = 'map.html';
}

function svgDataURL(svg) {
    var svgAsXML = (new XMLSerializer).serializeToString(svg);
    return "data:image/svg+xml," + encodeURIComponent(svgAsXML);
}
