var newText;
function loadCategories() {
  $.ajax({
    url: "http://localhost:2403/categories",
    type: "GET",
    success: function(data) {
      $("table tbody").html("");
      for (var i = 0; i < data.length; i++) {
        $("table tbody").append(
          "<tr data-id="+data[i].id +"><td>" + (i + 1) + "</td><td>" + data[i].name + '</td><td><button type="button" class="btn btn-danger">delete</button></td><td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">edit</button></td></tr>'
        );
      }
    }
  });
}

function setupCategoriesPage() {
  $("form").submit(function(e) {
    var text = $(".form-group input").val();
    e.preventDefault();
    e.target.children[0].children[1].value = " ";
    $.ajax({
      url: "http://localhost:2403/categories",
      data: { name: text },
      type: "POST",
      success: function() {
        loadCategories();
      }
    });
  });
}
function deleteCategory(a) {
      $.ajax({
        url: "http://localhost:2403/categories/"+a,
        type: "DELETE",
        success: function() {
          loadCategories();
        }
      });
};

function changeCategory(a, text) {
  $.ajax({
    url: "http://localhost:2403/categories/"+a,
    data: { name: text },
    type: "PUT",
    success: function() {
      loadCategories();
    }
  });
};

function init() {
  setupCategoriesPage();
  loadCategories();
}
$(document).ready(function() {
  init();



  $("table").on("click",".btn-danger", function(e){
    var c = $(e.target).parents('tr');
    deleteCategory(c.data('id'));
});
var c;
$("table").on("click",".btn-primary", function(event){
c = $(event.target).parents('tr');
console.log("blaaaaaa");
  $("main").one("click",".save", function(){
    newText = $(".modal-body input").val();
    changeCategory(c.data('id'),newText);
    });
});
});