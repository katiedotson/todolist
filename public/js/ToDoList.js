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
        deleteItem(event.target);
        var itemClicked = event.target.parentElement;
        $(itemClicked).fadeOut("slow");
        });

    //add item button
    $("#inputItem").on("click", function(event, ui){
        var textInput = $("#itemToAdd").val();
            location.reload("true").setSizes().registerUI();
    });
}

function deleteItem(item){
    var confirmation = confirm('Are you sure?');
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
