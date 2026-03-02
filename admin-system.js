// ===============================
// OSWAL PUBLICATION ERP DEMO POLISH
// ===============================

if(localStorage.getItem("erp_logged_in") !== "true"){
  window.location.href="admin-login.html";
}

let role = localStorage.getItem("erp_user_role") || "Admin";
let email = localStorage.getItem("erp_user_email") || "admin@admin.com";

document.getElementById("roleBadge").innerText = role;
document.getElementById("userEmail").innerText = email;

// ===============================
// DEMO DATA AUTO GENERATE
// ===============================

let orders = JSON.parse(localStorage.getItem("erp_orders")) || [];
let inventory = JSON.parse(localStorage.getItem("erp_inventory")) || [];

if(orders.length === 0){
  let demoBooks = ["Math Book", "Science Guide", "English Grammar", "Physics Notes"];
  
  for(let i=0;i<5;i++){
    let qty = Math.floor(Math.random()*10)+1;
    let price = 200 + Math.floor(Math.random()*300);
    let total = qty*price;

    orders.push({
      id:Date.now()+i,
      book:demoBooks[i%demoBooks.length],
      qty,
      price,
      total,
      paidAmount:total,
      remaining:0,
      status:"Paid",
      date:new Date().toISOString()
    });

    inventory.push({
      book:demoBooks[i%demoBooks.length],
      stock:qty
    });
  }

  saveData();
}

// ===============================
// SIMPLE ROLE CONTROL
// ===============================

document.querySelectorAll("#sidebar a").forEach(link=>{
  let section = link.dataset.section;

  if(role==="Client"){
    if(section!=="dashboard" && section!=="orders"){
      link.style.display="none";
    }
  }

  if(role==="Employee"){
    if(section!=="dashboard"){
      link.style.display="none";
    }
  }

  if(role==="Publisher"){
    if(section!=="dashboard" && section!=="reports"){
      link.style.display="none";
    }
  }
});

// ===============================
// ADD ORDER
// ===============================

function saveData(){
  localStorage.setItem("erp_orders",JSON.stringify(orders));
  localStorage.setItem("erp_inventory",JSON.stringify(inventory));
}

function addOrder(){
  let book=document.getElementById("bookName").value;
  let qty=parseInt(document.getElementById("quantity").value);
  let price=parseFloat(document.getElementById("price").value);

  if(!book||!qty||!price)return;

  let total=qty*price;

  let order={
    id:Date.now(),
    book,qty,price,total,
    paidAmount:total,
    remaining:0,
    status:"Paid",
    date:new Date().toISOString()
  };

  orders.push(order);

  let found=inventory.find(i=>i.book===book);
  if(found){found.stock+=qty;}
  else{inventory.push({book:book,stock:qty});}

  saveData();
  renderAll();
}

// ===============================
// RENDER
// ===============================

function renderAll(){
  let table=document.getElementById("orderTable");
  table.innerHTML="";

  let totalSales=0;

  orders.forEach(o=>{
    totalSales+=o.total;

    table.innerHTML+=`
    <tr>
      <td>${o.id}</td>
      <td>${o.book}</td>
      <td>${o.qty}</td>
      <td>₹${o.total}</td>
      <td>₹${o.paidAmount}</td>
      <td>₹${o.remaining}</td>
      <td><span class="badge bg-success">${o.status}</span></td>
    </tr>`;
  });

  document.getElementById("totalSales").innerText="₹"+totalSales;
  document.getElementById("paidAmount").innerText="₹"+totalSales;
  document.getElementById("pendingAmount").innerText="₹0";
  document.getElementById("totalOrders").innerText=orders.length;

  renderInventory();
  renderChart();
}

function renderInventory(){
  let inv=document.getElementById("inventoryTable");
  inv.innerHTML="";
  let totalStock=0;

  inventory.forEach(i=>{
    totalStock+=i.stock;
    inv.innerHTML+=`
    <tr>
      <td>${i.book}</td>
      <td>${i.stock}</td>
    </tr>`;
  });

  document.getElementById("totalStock").innerText=totalStock;
}

// ===============================
// CHART
// ===============================

let chart;

function renderChart(){
  if(chart) chart.destroy();

  chart=new Chart(document.getElementById("salesChart"),{
    type:"bar",
    data:{
      labels:orders.map(o=>new Date(o.date).toLocaleDateString()),
      datasets:[{
        label:"Sales",
        data:orders.map(o=>o.total),
        backgroundColor:"#3b82f6"
      }]
    }
  });
}

// ===============================
// SIDEBAR SWITCH
// ===============================

document.querySelectorAll("#sidebar a[data-section]").forEach(link=>{
  link.onclick=function(){
    document.querySelectorAll("section").forEach(s=>s.style.display="none");
    document.getElementById(this.dataset.section+"-section").style.display="block";
  };
});

// ===============================
// LOGOUT
// ===============================

document.getElementById("logoutBtn").onclick=function(){
  localStorage.clear();
  window.location.href="admin-login.html";
};

renderAll();