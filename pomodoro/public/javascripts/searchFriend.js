
function onSearch(button) {
    window.location.href = "/friendSearch/" + button.previousElementSibling.value;
    console.log("onSearch");
    console.log(query);
    // document.getElementById("search-results").innerHTML = '<h1>'+query+'</h1>';
}

function addFriend() {
    console.log("addFriend");
    document.getElementById("btnText").innerHTML = '交友邀請已送出';
    var query = this.query;
    console.log(query);
}