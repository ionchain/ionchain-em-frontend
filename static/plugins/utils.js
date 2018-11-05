define(function() {
    return {
        getSearch: function (name) {
            var search = window.location.search;
            search = search.substr(1);
            if (typeof name === 'undefined') return search;
            var searchArr = search.split('&');
            for (var i = 0; i < searchArr.length; i++) {
            var searchStr = searchArr[i];
            searchArr[i] = searchStr.split('=');
            if (searchArr[i][0] == name) {
                return searchStr.replace(name + '=', '');
            }
            }
            return '';
        }
    }
})
