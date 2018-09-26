//Load Data in Table
$(document).ready(function () {
    loadData();
});

//Load Data
function loadData() {
    $.ajax({
        url: "/Product/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.ProductName + '</td>';
                html += '<td>' + item.Price + '</td>';                              
                html += '<td><a href="#" onclick="return getbyID(' + item.Id + ')"<button type="button" class="btn btn-warning" ><span class = "glyphicon glyphicon-edit"></span></td>';
                html += '<td><a href="#" onclick="Delete(' + item.Id + ')"<button type="button" class="btn btn-danger" ><span class = "glyphicon glyphicon-trash"></span></td>';
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
    var productObj = {
        Id: $('#Id').val(),
        ProductName: $('#ProductName').val(),
        Price: $('#Price').val()
    };
    $.ajax({
        url: "/Product/Add",
        data: JSON.stringify(productObj),
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

//Get the Data Based Product Id
function getbyID(productId) {
    $('#StoreName').css('border-color', 'lightgrey');
    $('#Address').css('border-color', 'lightgrey');

    $.ajax({
        url: "/product/getbyID/" + productId,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            $('#ProductName').val(result.ProductName);
            $('#Price').val(result.Price);

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

//Update Product's record
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var productObj = {
        Id: $('#Id').val(),
        ProductName: $('#ProductName').val(),
        Price: $('#Price').val(),

    };
    $.ajax({
        url: "/Product/Update",
        data: JSON.stringify(productObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#Id').val("");
            $('#ProductName').val("");
            $('#Price').val("");

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Delete Product's record
function Delete(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Product/RemoveProduct/" + ID,
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
    if ($('#ProductName').val().trim() == "") {
        $('#ProductName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ProductName').css('border-color', 'lightgrey');
    }

    if ($('#Price').val().trim() == "") {
        $('#Price').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Price').css('border-color', 'lightgrey');
    }
    return isValid;
}