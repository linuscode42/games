area = document.getElementById('resultArea')


function fillNumber(value){
    area.innerHTML += value
}

function removelastNum() {
    let container = document.getElementById('resultArea')
    container.innerHTML = container.innerHTML.slice(0, -1);
}

function calculate () {
    let container = document.getElementById('resultArea')
    let result = eval(container.innerHTML)
    container.innerHTML = result
}

function removeAll() {
    let container = document.getElementById('resultArea');
    container.innerHTML = null;
}