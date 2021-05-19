
export default {
    formatDate(date) {
        date = new Date(date)
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var mm = date.getMinutes();
        mm = mm < 10 ? ('0' + mm) : mm;
        var ss = date.getMinutes();
        ss = ss < 10 ? ('0' + ss) : ss;
        return y + '-' + m + '-' + d + '  ' + h + ':' + mm + ':' + ss;
    },
}