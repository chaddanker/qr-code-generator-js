var qrcode = new QRCode(document.getElementById("qrcode"), {
    width : 100,
    height : 100,
    useSVG: true
});

function makeCode () {		
    var elText = document.getElementById("text");
    qrcode.makeCode(elText.value);
}

makeCode();
$("#text").
    on("blur", function () {
        makeCode();
    }).
    on("keydown", function (e) {
        if (e.key.length < 2) {
          console.log(e);
            makeCode();
        }
    });

function svgDataURL(svg) {
  var svgAsXML = (new XMLSerializer).serializeToString(svg);
  return "data:image/svg+xml," + encodeURIComponent(svgAsXML);
}

function download(){
    var dataURL = svgDataURL(document.querySelector('#qrsvg'));
    var dl = document.createElement("a");
    document.body.appendChild(dl); // This line makes it work in Firefox.
    dl.setAttribute("href", dataURL);
    dl.setAttribute("download", "test.svg");
    dl.click();
}
