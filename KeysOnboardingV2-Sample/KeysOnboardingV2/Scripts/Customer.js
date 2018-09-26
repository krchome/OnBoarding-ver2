
//Load Data in Table
$(document).ready(function () {
    loadData();
});

//Load Data
function loadData() {
    $.ajax({
        url: "/Customers/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.CustomerName + '</td>';
                html += '<td>' + item.Age + '</td>';
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
    var cusObj = {
        Id: $('#Id').val(),
        CustomerName: $('#CustomerName').val(),
        Age: $('#Age').val(),
        Address: $('#Address').val()       
    };
    $.ajax({
        url: "/Customers/Add",
        data: JSON.stringify(cusObj),
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

//Get the Data Based upon Customer Id
function getbyID(CusId) {
    $('#CustomerName').css('border-color', 'lightgrey');
    $('#Age').css('border-color', 'lightgrey');
    $('#Address').css('border-color', 'lightgrey');
    
    $.ajax({
        url: "/Customers/getbyID/" + CusId,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            $('#CustomerName').val(result.CustomerName);
            $('#Age').val(result.Age);
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

//Update Customer's record
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var cusObj = {
        Id: $('#Id').val(),
        CustomerName: $('#CustomerName').val(),
        Age: $('#Age').val(),
        Address: $('#Address').val(),
        
    };
    $.ajax({
        url: "/Customers/Update",
        data: JSON.stringify(cusObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#Id').val("");
            $('#CustomerName').val("");
            $('#Age').val("");
            $('#Address').val("");
            
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Delete Customer's record
function Delete(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Customers/RemoveCustomer/" + ID,
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
    if ($('#CustomerName').val().trim() == "") {
        $('#CustomerName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#CustomerName').css('border-color', 'lightgrey');
    }
    if ($('#Age').val().trim() == "") {
        $('#Age').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Age').css('border-color', 'lightgrey');
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