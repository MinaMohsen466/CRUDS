
let title = document.getElementById("title");
let count = document.getElementById("count");
let price = document.getElementById("price");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let creat_prod = document.getElementById("creat_prod");
let tbody = document.getElementById("tbody");
let search = document.getElementById("search");

let mood = "creat";
let tem;

let arr_data;
if(localStorage.product != null){
    arr_data = JSON.parse(localStorage.product);
}else{
    arr_data = [];
}

//total_data function
function total_data(){
    if(price.value !== "" && price.value >= 0 && discount.value >= 0){
        result = price.value - discount.value;
        if(result > -1){
            total.innerHTML ="totla:" + result;
            total.style.backgroundColor = "green"; 
        }else{
            total.innerHTML ="";
            total.style.backgroundColor = "transparent";
            alert("less than 0");
        }
    }     
}


// remove function
function claer_data(){
    title.value = "";
    count.value = "";
    price.value = "";
    discount.value = "";
    total.innerHTML = "";
    total.style.backgroundColor = "transparent";
}


//add_data_function
creat_prod.onclick = function(){    
    let newProduct = {
        title:title.value.toLowerCase(),
        price:price.value,
        discount:discount.value,
        total: result,
    };
    if(mood === "creat"){
        for(let y=0; y<count.value; y++){
            arr_data.push(newProduct);
            localStorage.setItem("product", JSON.stringify(arr_data));
            tbody.innerHTML = "";
            showData();
        }
        claer_data();
        }else{
            arr_data[tem].title = title.value; 
            arr_data[tem].price = price.value; 
            arr_data[tem].discount = discount.value;
            arr_data[tem].total = result;
            count.style.display ="block";
            creat_prod.innerHTML ="creat";
            localStorage.product = JSON.stringify(arr_data);
            tbody.innerHTML = "";
            showData()
            claer_data();
            mood = "creat";
        }
}

//show_data_function
function showData(){
    for(let i= 0; i<arr_data.length; i++){
        tableData = 
        `
        <tr>
        <td>${i}</td>
        <td>${arr_data[i].title}</td>
        <td>${arr_data[i].price}</td>
        <td>${arr_data[i].discount}</td>
        <td>${arr_data[i].total}</td>
        <td><button id="update" onclick="update(${i})">Update</button></td>
        <td><button onclick="deletItem(${i})" id="delet">delet</button></td>
        <tr>
        `
        tbody.innerHTML += tableData;
    }
}
showData()

//deletItem_function
function deletItem(i){
    arr_data.splice(i,1);
    localStorage.product = JSON.stringify(arr_data);
    tbody.innerHTML = "";
    showData();
}

//update_finction
function update(i){
    tem = i;
    mood = "update";
    title.value = arr_data[i].title; 
    price.value = arr_data[i].price; 
    discount.value = arr_data[i].discount; 
    count.style.display = "none";
    creat_prod.innerHTML ="update";
    total_data()
}

//search_function
function searchData(value){
    tbody.innerHTML = "";
    for(let i=0; i<arr_data.length; i++){
        if(arr_data[i].title.includes(value.toLowerCase())){
            tableData = 
            `
            <tr>
            <td>${i}</td>
            <td>${arr_data[i].title}</td>
            <td>${arr_data[i].price}</td>
            <td>${arr_data[i].discount}</td>
            <td>${arr_data[i].total}</td>
            <td><button id="update" onclick="update(${i})">Update</button></td>
            <td><button onclick="deletItem(${i})" id="delet">delet</button></td>
            <tr>
            `
            tbody.innerHTML += tableData;
            }
    }
}