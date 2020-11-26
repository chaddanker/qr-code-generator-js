if(window.location.search.length > 0) {
    window.location.href = `user.html${window.location.search}`;
}

function next() {
    sessionStorage.setItem("username", document.querySelector('#username').value);
    sessionStorage.setItem("name", document.querySelector('#name').value + ' ' + document.querySelector('#name-l').value);
    sessionStorage.setItem("cell", document.querySelector('#cell').value);

    window.location.href = 'map.html';
}
