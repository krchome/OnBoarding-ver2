
//Load Data in Table
$(document).ready(function () {
    loadData();
});

//Load Data
function loadData(){
    $.ajax({
        url: "/Store/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.StoreName + '</td>';
                html += '<td>' + item.Address + '</td>';                
                html += '<td><a href="#" onclick="return getbyID(' + item.Id + ')"<button type="button" class="btn btn-warning" > <span class = "glyphicon glyphicon-edit"></span></td>';
                html += '<td><a href="#" onclick="Delete(' + item.Id + ')"<button type="button" class="btn btn-danger" > <span class = "glyphicon glyphicon-trash"></span></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Add Data
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var storeObj = {
        Id: $('#Id').val(),
        StoreName: $('#StoreName').val(),
        Address: $('#Address').val()       
    };
    $.ajax({
        url: "/Store/Add",
        data: JSON.stringify(storeObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Get the Data Based on Store Id
function getbyID(storeId) {
    $('#StoreName').css('border-color', 'lightgrey');
    $('#Address').css('border-color', 'lightgrey');
    
    $.ajax({
        url: "/Store/getbyID/" + storeId,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            $('#StoreName').val(result.StoreName);
            $('#Address').val(result.Address);
            

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//Update Stores's record
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var storeObj = {
        Id: $('#Id').val(),
        StoreName: $('#StoreName').val(),
        Address: $('#Address').val(),
        
    };
    $.ajax({
        url: "/Store/Update",
        data: JSON.stringify(storeObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#Id').val("");
            $('#StoreName').val("");
            $('#Address').val("");
            
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//delete Stores's record
function Delete(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Store/RemoveStore/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}
    

//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#StoreName').val().trim() == "") {
        $('#StoreName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#StoreName').css('border-color', 'lightgrey');
    }
    
    if ($('#Address').val().trim() == "") {
        $('#Address').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Address').css('border-color', 'lightgrey');
    }
     return isValid;
}