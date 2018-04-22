var newText;
// Список всех категорий
function loadCategories() {
  $.ajax({
    url: "http://localhost:2403/categories",
    type: "GET",
    success: function(data) {
      $("#all-main table tbody").html("");
      for (var i = 0; i < data.length; i++) {
        $("#all-main table tbody").append(
          "<tr data-id="+data[i].id +"><td>" + (i + 1) + "</td><td>" + data[i].name + '</td><td><button type="button" class="close cl1" aria-label="Close"><span aria-hidden="true">&times;</span></button><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">edit</button></td></tr>'
        );
      }
    }
  });
}
//Список всех продуктов
function loadProducts() {
  $.ajax({
    url: "http://localhost:2403/products",
    type: "GET",
    success: function(data) {
      $("#all-main table tbody").html("");
      for (var i = 0; i < data.length; i++) {
        $("#all-main table tbody").append(
          "<tr data-id="+data[i].id +"><td>" + (i + 1) + "</td><td>" + data[i].name + '</td><td><button type="button" class="close cl2" aria-label="Close"><span aria-hidden="true">&times;</span></button><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">edit</button></td></tr>'
        );
      }
    }
  });
}
//Добавление категории
function setupCategoriesPage() {
  $("#all-main #formCategory").submit(function(e) {
    var text1 = $("#formCategory .form-group input").val();
    console.log(text1);
    e.preventDefault();
    e.target.children[0].children[1].value = " ";
    $.ajax({
      url: "http://localhost:2403/categories",
      data: { name: text1 },
      type: "POST",
      success: function() {
        loadCategories();
      }
    });
  });
}
//Добавление продукта
function setupProductsPage() {
  $("#all-main #formProduct").submit(function(e) {
    var text2 = $("#formProduct .form-group input").val();
    e.preventDefault();
    e.target.children[0].children[1].value = " ";
    $.ajax({
      url: "http://localhost:2403/products",
      data: { name: text2, price: 20, description: text2},
      type: "POST",
      success: function() {
        loadProducts();
      }
    });
  });
}
//Запрос на удаление категории
function deleteCategory(a) {
      $.ajax({
        url: "http://localhost:2403/categories/"+a,
        type: "DELETE",
        success: function() {
          loadCategories();
        }
      });
};
//Запрос на удаление продукта
function deleteProduct(a) {
  $.ajax({
    url: "http://localhost:2403/products/"+a,
    type: "DELETE",
    success: function() {
      loadProducts();
    }
  });
};
//Обработка кнопки удаление категории
 function clickDeleteCategory(){
  $("table").on("click",".cl1", function(e){
    var c = $(e.target).parents('tr');
    deleteCategory(c.data('id'));
});
 }
 //Обработка кнопки удаление продукта
 function clickDeleteProduct(){
  $("table").on("click",".cl2", function(e){
    var c = $(e.target).parents('tr');
    deleteProduct(c.data('id'));
});
 }
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

function init1() {
  setupCategoriesPage();
  loadCategories();
}
function init2() {
  setupProductsPage();
  loadProducts();
}
function showCategories(){
  $("#categories").click(function(){
  $(".all-main").hide();
  $("#all-main").show();
  $("#formCategory").show();
  $("#formProduct").hide();
  init1();
});
}
function showProducts(){
  $("#products").click(function(){
  $(".all-main").hide();
  $("#all-main").show();
  $("#formCategory").hide();
  $("#formProduct").show();
  init2();
});
}

$(document).ready(function() {
  showCategories();
  showProducts();
  clickDeleteCategory();
  clickDeleteProduct();


var c;
$("table").on("click",".btn-primary", function(event){
c = $(event.target).parents('tr');
  $("main").one("click",".save", function(){
    newText = $(".modal-body input").val();
    changeCategory(c.data('id'),newText);
    });
});
});