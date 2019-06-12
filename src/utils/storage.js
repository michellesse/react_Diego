function store(key,data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function retrieve(key) {
    return JSON.parse(localStorage.getItem(key));
}

export default {
    store,
    retrieve,
}