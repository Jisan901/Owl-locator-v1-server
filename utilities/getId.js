module.exports = function () {
    let now = new Date();
    let timestamp = now.getFullYear().toString();
    timestamp += (now.getMonth < 9 ? '0' : '') + now.getMonth().toString();
    timestamp += (((now.getDate < 10) ? '0' : '') + now.getDate().toString())+'-'+Date.now().toString();
    return timestamp;
}