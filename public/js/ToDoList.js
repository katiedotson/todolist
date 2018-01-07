$(document).ready(function(){
    setSizes();
    registerUI();
});

function setSizes(){
    var width = document.documentElement.clientWidth;
    var height = document.documentElement.clientHeight;

    $("#wrapper").css("width", width);
    $("#wrapper").css("height", height);

    $("#list").css("width", width* .8);
    $("#inputForm").css("width", width*.8);
    $("form").css("width", width*.8);
}

function registerUI(){
    //list item
    $("#list").on("click", ":checkbox", function(event, ui){
        var itemClicked = event.target.parentElement;
        var confirmation = confirm('Are you sure?');
        if(confirmation){
            $(itemClicked).fadeOut("slow");
        }
        deleteItem(event.target, confirmation);
        });

    //add item button
    $("#inputItem").on("click", function(event, ui){
        var textInput = $("#itemToAdd").val();
            location.reload("true").setSizes().registerUI();
    });
}

function deleteItem(item, confirmation){
    if(confirmation){
        $.ajax({
            type: 'delete',
            url: '/list/delete/' + $(item).data('id')
        })
        .done(function(response){
            window.location.replace('/list');
        });
    }
    else{
        return false;
    }
}
