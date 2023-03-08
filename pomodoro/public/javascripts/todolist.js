let todolist = [];
let id = 1;

//建立事件
function addList() {
    let title = $("#title").val();
    let msg = $('#msg').val();
    if (title == "" || msg == "") {
        alert("請輸入標題和內容!");
    } else {
        var api = "/api/addList";
        var data = { "title": title, "msg": msg };
        $.post(api, data, function(res) {
            // newList(res.data);
            $('#title').val('');
            $('#msg').val('');
        });
        let newTodo = {
            'id': id,
            'title': title,
            'msg': msg,
            'status': false
        };
        todolist.push(newTodo);
         newList(newTodo);
        id++;
        $('#title').val('');
        $('#msg').val('');
    }
}

function newList(data) {
    let status = (data.status) ? "checked" : " ";
    //if else 檢查有沒有打勾 x=delete
    let a = "1";
    let content =
        `<div class="input-group mb-2 bg-light rounded-1" id="${data.id}">
            <div class="input-group-prepend">
                <div class="input-group-text">
                    <input type="checkbox" class="myCheck" onclick="checkStatus('${data.id}',this)">
                </div>
            </div>
            <input type="text" class="form-control col-sm-3 " id="title${data.id}" value="${data.title}" readonly>
            <div class="input-group-append" id="button-addon4">
                <button class="btn btn-outline-secondary" type="button" id="btnEdit${data.id}"onclick="editList('${data.id}')">修改</button>
                <button class="btn btn-outline-secondary" type="button" id="btnUpdate${data.id}"onclick="updateList('${data.id}')">更新</button>
                <button class="btn btn-outline-secondary" type="button" id="btnRemove${data.id}" onclick="removeList('${data.id}')">刪除</button>
            </div>
        </div>`
    $('.maincontent').append(content);
}
$().ready(function() {
    $("#addbtn").click(function() {
        addList();
        // $('.container').append(
        //     `
        //     <div class="input-group mb-3" id="${data.id}">
        //     <div class="input-group-prepend">
        //     <div class="input-group-text">
        //     <input type="checkbox" class="myCheck" onclick="checkStatus('${data.id},this)">
        //     </div>
        //     </div>
        //     <input type="text" class="form-control col-sm-3" id="title${data.id}" value="${data.title}"readonly>
        //     <input type="text" class="form-control col-sm-9" id="msg${data.id}"value="${data.msg}"readonly>
        //     <div class="input-group-append" id="button-addon4">
        //     <button class="btn btn-outline-secondary" type="button" id="btnEdit${data.id}"onclick="editList('${data.id}')">修改</button>
        //     <button class="btn btn-outline-secondary" type="button" id="btnUpdate${data.id}"onclick="updateList('${data.id}')">更新</button>
        //     <button class="btn btn-outline-secondary" type="button" id="btnRemove${data.id}" onclick="removeList('${data.id}')">刪除</button>
        //     </div>
        //     </div>`
        // )
        // 
    });

});

getList()

function getList() {
    var api = "/api/getList";
    $.get(api, function(data, status) {
        for (var i = 0; i < data.length; i++) {
            newList(data[i]);
        }
    })
}

function editList(id) {
    $('#btnEdit' + id).addClass("d-none");
    $('#btnRemove' + id).addClass("d-none");
    $('#btnUpdate' + id).removeClass("d-none");
    $('#title' + id).attr("readonly", false);
    $('#msg' + id).attr("readonly", false);
}

function updateList(id) {
    var title = $("#title" + id).val();
    var msg = $("#msg" + id).val();
    var API = "/api/updateList";
    var data = { "id": id, "title": title, "msg": msg };
    $.post(API, data, function(res) {
        if (res.status == 0) {
            $('#btnEdit' + id).removeClass("d-none");
            $('#btnRemove' + id).removeClass("d-none");
            $('#btnUpdate' + id).addClass("d-none");
            $('#title' + id).attr("readonly", true);
            $('#msg' + id).attr("readonly", true);
        }
    });

}

function removeList(id) {
    var API = "/api/removeList";
    var data = { "id": id };
    $.post(API, data, function(res) {
            if (res.status == 0) {
                $('#' + id).remove();
                alert("刪除成功");
            }
        })
        // let index = todolist.findIndex(element => element.id == id);
        // todolist.splice(index, 1);
        // $('#' + id).remove();
}

function checkStatus(id, checkStatus) {
    var API = "/api/checkStatus";
    var data = { "id": id, "status": checkStatus.checked };
    $.post(API, data, function(res) {
        if (res.status == 0) {
            if (checkStatus.checked) {
                $('#title' + id).addClass("text-decoration-line-through");
                $('#msg' + id).addClass("text-decoration-line-through");
                $('#btnEdit' + id).addClass("d-none");
            } else {
                $('#title' + id).removeClass("text-decoration-line-through");
                $('#msg' + id).removeClass("text-decoration-line-through");
                $('#btnEdit' + id).removeClass("d-none");
            }
        }
    });

}