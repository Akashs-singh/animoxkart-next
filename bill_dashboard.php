<?php
include_once "./../auth/auth.config.php";
session_start();
// confirm_logged_in();
// $id = $_SESSION['id'];
?>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="author" content="Eaasee.com">
    <title>Goods</title>
    <link rel="icon" href="https://bakefactory.in/wp-content/uploads/2020/09/cropped-bf-logo.png" type="image/icon type">

    <!--Bootstrap CDN-->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

    <!--Font Awesome CDN-->
    <script src="https://kit.fontawesome.com/9b0177f45b.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!--slick slider-->
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" />
    <!--Custom Stylesheet-->
    <link rel="stylesheet" href="./../css/style.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.11.3/css/jquery.dataTables.css">

    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.11.3/js/jquery.dataTables.js"></script>
    <style>
        #gooods_list thead th {
    position: sticky;
    top: 0;
    background-color: #fff; /* Change to match your table's background */
    /* z-index: 2; */
}
    </style>
</head>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:var(--font-sans);background:var(--color-background-tertiary);font-size:18px}
.app{min-height:100vh;display:flex;flex-direction:column}
.topbar{background:var(--color-background-primary);border-bottom:0.5px solid var(--color-border-tertiary);padding:12px 20px;display:flex;align-items:center;justify-content:space-between}
.logo{display:flex;align-items:center;gap:10px}
.logo-icon{width:36px;height:36px;border-radius:8px;background:#1D9E75;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:500;color:#fff}
.logo-text{font-size:16px;font-weight:500;color:var(--color-text-primary)}
.logo-sub{font-size:11px;color:var(--color-text-secondary)}
.tabs{display:flex;gap:4px;background:var(--color-background-secondary);border-radius:8px;padding:4px}
.tab{padding:6px 16px;border-radius:6px;font-size:13px;cursor:pointer;border:none;background:transparent;color:var(--color-text-secondary);font-family:var(--font-sans)}
.tab.active{background:var(--color-background-primary);color:var(--color-text-primary);font-weight:500;border:0.5px solid var(--color-border-tertiary)}
.main{padding:20px;flex:1}
.section{display:none}.section.active{display:block}

/* Inventory */
.toolbar{display:flex;gap:10px;margin-bottom:16px;align-items:center;flex-wrap:wrap}
.toolbar input{flex:1;min-width:180px;padding:8px 12px;border:0.5px solid var(--color-border-tertiary);border-radius:8px;font-size:13px;background:var(--color-background-primary);color:var(--color-text-primary);font-family:var(--font-sans)}
.btn{padding:8px 14px;border-radius:8px;font-size:13px;cursor:pointer;border:0.5px solid var(--color-border-secondary);background:var(--color-background-primary);color:var(--color-text-primary);font-family:var(--font-sans);font-weight:500}
.btn:hover{background:var(--color-background-secondary)}
.btn-primary{background:#1D9E75;color:#fff;border-color:#1D9E75}
.btn-primary:hover{background:#0F6E56}
.btn-danger{background:#E24B4A;color:#fff;border-color:#E24B4A;padding:4px 8px;font-size:12px}
.btn-danger:hover{background:#A32D2D}
.btn-warn{background:#EF9F27;color:#fff;border-color:#EF9F27;padding:4px 8px;font-size:12px}
.btn-warn:hover{background:#BA7517}
.btn-info{background:#378ADD;color:#fff;border-color:#378ADD;padding:4px 8px;font-size:12px}
.btn-info:hover{background:#185FA5}
.card{background:var(--color-background-primary);border:0.5px solid var(--color-border-tertiary);border-radius:12px;padding:16px;margin-bottom:16px}
.card-title{font-size:14px;font-weight:500;margin-bottom:12px;color:var(--color-text-primary)}
.form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-bottom:12px}
.form-group{display:flex;flex-direction:column;gap:4px}
.form-group label{font-size:12px;color:var(--color-text-secondary)}
.form-group input,.form-group select{padding:7px 10px;border:0.5px solid var(--color-border-tertiary);border-radius:6px;font-size:13px;background:var(--color-background-primary);color:var(--color-text-primary);font-family:var(--font-sans)}
.tbl-wrap{overflow-x:auto;border-radius:8px;border:0.5px solid var(--color-border-tertiary)}
table{width:100%;border-collapse:collapse;font-size:13px}
thead tr{background:var(--color-background-secondary)}
th{padding:9px 10px;text-align:left;font-weight:500;color:var(--color-text-secondary);font-size:12px;border-bottom:0.5px solid var(--color-border-tertiary);white-space:nowrap}
td{padding:8px 10px;border-bottom:0.5px solid var(--color-border-tertiary);color:var(--color-text-primary)}
tr:last-child td{border-bottom:none}
tr:hover td{background:var(--color-background-secondary)}
.badge{display:inline-block;padding:2px 8px;border-radius:20px;font-size:11px;font-weight:500}
.badge-green{background:#EAF3DE;color:#3B6D11}
.badge-red{background:#FCEBEB;color:#A32D2D}

/* Billing */
.bill-layout{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media(max-width:700px){.bill-layout{grid-template-columns:1fr}}
.product-search-wrap{position:relative}
.product-dropdown{position:absolute;top:100%;left:0;right:0;background:#fff;border:1px solid #ddd;border-radius:8px;z-index:1000;max-height:200px;overflow-y:auto;display:none;box-shadow:0 4px 12px rgba(0,0,0,0.15);margin-top:4px}
.product-option{padding:8px 12px;cursor:pointer;font-size:13px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #f0f0f0}
.product-option:last-child{border-bottom:none}
.product-option:hover{background:#f5f5f5}
.bill-items-table{margin:12px 0}
.totals-box{background:var(--color-background-secondary);border-radius:8px;padding:12px;font-size:13px}
.totals-row{display:flex;justify-content:space-between;padding:4px 0;color:var(--color-text-secondary)}
.totals-row.total{font-weight:500;color:var(--color-text-primary);border-top:0.5px solid var(--color-border-tertiary);margin-top:6px;padding-top:8px;font-size:14px}
.gst-toggle{display:flex;gap:8px;margin-bottom:12px}
.gst-opt{padding:6px 14px;border-radius:6px;font-size:12px;cursor:pointer;border:0.5px solid var(--color-border-tertiary);background:var(--color-background-secondary);color:var(--color-text-secondary);font-family:var(--font-sans)}
.gst-opt.active{background:#E1F5EE;color:#0F6E56;border-color:#1D9E75;font-weight:500}
.empty-state{text-align:center;padding:32px;color:var(--color-text-secondary);font-size:13px}

/* Print invoice */
@media print{
  .no-print{display:none!important}
  .print-area{display:block!important}
  body{background:#fff;margin:0;padding:0}
  /* Fix modal wrapper for print */
  #invoice-modal,#quotation-modal{position:static!important;background:transparent!important;padding:0!important;overflow:visible!important}
  #invoice-modal>div,#quotation-modal>div{max-width:100%!important;margin:0!important;padding:0!important;background:transparent!important;border-radius:0!important}
  .invoice-page{box-shadow:none!important;border:none!important;margin:0!important;padding:10mm!important;width:100%!important;max-width:100%!important;height:auto!important;min-height:auto!important}
  @page{margin:10mm;size:A4}
  /* Hide browser-generated URL in print footer */
  @page{margin-header:0;margin-footer:0}
  a[href]:after{content:none!important}
  abbr[title]:after{content:none!important}
  /* Prevent page breaks inside table rows */
  .inv-table tr{page-break-inside:avoid;break-inside:avoid}
  .inv-hsn-table tr{page-break-inside:avoid;break-inside:avoid}
  /* Repeat table headers on each page */
  .inv-table thead{display:table-header-group}
  .inv-hsn-table thead{display:table-header-group}
  /* Keep table footer (totals) together - don't break before it */
  .inv-table tfoot{page-break-inside:avoid;break-inside:avoid;page-break-before:avoid}
  .inv-hsn-table tfoot{page-break-inside:avoid;break-inside:avoid;page-break-before:avoid}
  tfoot{
  display: table-row-group; /* or just remove tfoot styling completely */
}
  /* Keep summary sections together */
  .inv-words{page-break-inside:avoid;break-inside:avoid}
  .inv-totals{page-break-inside:avoid;break-inside:avoid}
  .inv-footer{page-break-inside:avoid;break-inside:avoid}
  .inv-hsn-table{page-break-inside:avoid;break-inside:avoid}
  /* Prevent orphaned content */
  .inv-party-box,.inv-meta-item{page-break-inside:avoid;break-inside:avoid}
}
.print-area{display:none}
.invoice-page{width:210mm;background:#fff;margin:0 auto;padding:10mm;box-shadow:0 2px 20px rgba(0,0,0,0.1);font-family:Arial,sans-serif;font-size:11px;color:#222;border-radius:0;height:auto;min-height:auto}
.inv-header{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:12px}
.inv-company-name{font-size:18px;font-weight:700;color:#1D9E75;letter-spacing:1px}
.inv-tagline{font-size:10px;color:#666;margin-top:2px}
.inv-title{text-align:right;font-size:20px;font-weight:700;letter-spacing:2px;color:#333;margin-bottom:4px}
.inv-badge{text-align:right;font-size:9px;color:#888}
.inv-divider{border:none;border-top:2px solid #1D9E75;margin:10px 0}
.inv-parties{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:10px}
.inv-party-box{background:#f9f9f9;padding:8px 10px;border-radius:4px;border:0.5px solid #e0e0e0}
.inv-party-label{font-size:9px;text-transform:uppercase;letter-spacing:1px;color:#888;margin-bottom:4px}
.inv-party-name{font-size:12px;font-weight:700;color:#222}
.inv-party-detail{font-size:10px;color:#555;line-height:1.6}
.inv-meta{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px}
.inv-meta-item{background:#f9f9f9;padding:6px 8px;border-radius:4px;border:0.5px solid #e0e0e0}
.inv-meta-label{font-size:9px;color:#888;text-transform:uppercase;letter-spacing:0.5px}
.inv-meta-val{font-size:11px;font-weight:700;color:#222;margin-top:2px}
.inv-table{width:100%;border-collapse:collapse;margin-bottom:10px}
.inv-table th{background:#1D9E75;color:#fff;padding:6px 8px;text-align:left;font-size:10px;letter-spacing:0.5px}
.inv-table td{padding:6px 8px;border-bottom:0.5px solid #eee;font-size:10px}
.inv-table tr:nth-child(even) td{background:#f9fdf7}
.inv-table .text-right{text-align:right}
.inv-table thead{display:table-header-group}
.inv-table tr{page-break-inside:avoid;break-inside:avoid}
.inv-totals{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:12px}
.inv-totals-left{font-size:10px;color:#555;line-height:2}
.inv-totals-right{background:#f9f9f9;padding:10px;border-radius:4px;border:0.5px solid #e0e0e0}
.inv-totals-row{display:flex;justify-content:space-between;font-size:10px;padding:3px 0;border-bottom:0.5px solid #eee;color:#555}
.inv-totals-row.grand{font-weight:700;font-size:12px;color:#1D9E75;border-top:1.5px solid #1D9E75;border-bottom:none;margin-top:4px;padding-top:6px}
.inv-footer{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:12px;padding-top:10px;border-top:0.5px solid #eee}
.inv-sign{text-align:right}
.inv-sign-line{border-top:0.5px solid #333;margin-top:40px;padding-top:4px;font-size:9px;color:#888}
.inv-words{background:#EAF3DE;padding:6px 10px;border-radius:4px;font-size:10px;color:#3B6D11;margin-bottom:12px;font-style:italic}
.inv-hsn-table{width:100%;border-collapse:collapse;margin-bottom:10px}
.inv-hsn-table th{background:#eee;color:#555;padding:5px 8px;font-size:9px;text-align:left;letter-spacing:0.5px}
.inv-hsn-table td{padding:5px 8px;font-size:10px;border-bottom:0.5px solid #f0f0f0}
.inv-hsn-table thead{display:table-header-group}
.inv-hsn-table tr{page-break-inside:avoid;break-inside:avoid}
</style>
<?php include_once "./../header.php"; ?>
<div class="app no-print">
<div class="topbar">
  <div class="logo">
    <div class="logo-icon">A</div>
    <div>
      <div class="logo-text">Animoxkart</div>
      <div class="logo-sub">Admin Dashboard</div>
    </div>
  </div>
  <div class="tabs">
    <button class="tab active" onclick="switchTab('inventory')">Inventory</button>
    <button class="tab" onclick="switchTab('billing')">Create Bill</button>
  </div>
</div>

<div class="main">
    
<!-- INVENTORY SECTION -->
<div class="section active" id="sec-inventory">
  <div class="toolbar">
    <input type="text" id="inv-search" placeholder="Search products..." oninput="renderInventory()">
  </div>

  <div class="card">
    <div class="card-title">Product Inventory</div>
    <div class="tbl-wrap">
      <table>
        <thead>
          <tr>
            <th>Product</th><th>SKU</th><th>Size</th><th>Selling Price</th><th>Stock</th>
          </tr>
        </thead>
        <tbody id="inv-tbody"></tbody>
      </table>
    </div>
  </div>
</div>

<!-- BILLING SECTION -->
<div class="section" id="sec-billing">
  <div class="bill-layout">
    <div>
      <div class="card">
        <div class="card-title">Customer Details</div>
        <div class="form-grid" style="grid-template-columns:1fr 1fr">
          <div class="form-group"><label>Customer Name</label><input id="b-cname" placeholder="Enter name"></div>
          <div class="form-group"><label>Phone</label><input id="b-phone" placeholder="10-digit number"></div>
          <div class="form-group" style="grid-column:1/-1"><label>Address</label><input id="b-addr" placeholder="Customer address"></div>
          <div class="form-group"><label>Customer GSTIN (optional)</label><input id="b-gstin" placeholder="If registered"></div>
          <div class="form-group"><label>State</label>
            <select id="b-state">
              <option value="JH">Jharkhand (same state)</option>
              <option value="OTHER">Other State (IGST)</option>
            </select>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">Add Products to Bill</div>
        <div class="product-search-wrap">
          <input type="text" id="b-product-search" placeholder="Search & add product..." oninput="showProductDropdown()" style="width:100%;padding:8px 12px;border:0.5px solid var(--color-border-tertiary);border-radius:8px;font-size:13px;background:var(--color-background-primary);color:var(--color-text-primary);font-family:var(--font-sans);margin-bottom:8px">
          <div class="product-dropdown" id="product-dropdown"></div>
        </div>
        <div id="bill-items-list">
          <div class="empty-state" id="bill-empty">No products added yet. Search above to add.</div>
        </div>
      </div>
    </div>

    <div>
      <div class="card">
        <div class="card-title">Bill Summary</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
          <div class="form-group" style="margin:0">
            <label style="font-size:12px;color:var(--color-text-secondary);margin-bottom:4px;display:block">Invoice No</label>
            <input id="invoice-no-input" type="text" placeholder="INV-001" style="width:100%;padding:6px 10px;border:0.5px solid var(--color-border-tertiary);border-radius:6px;font-size:13px;background:var(--color-background-primary);color:var(--color-text-primary);font-family:var(--font-sans)">
          </div>
          <div style="display:flex;flex-direction:column">
            <label style="font-size:12px;color:var(--color-text-secondary);margin-bottom:4px">Date</label>
            <strong style="color:var(--color-text-primary);font-size:13px;padding:6px 0" id="inv-date-display"></strong>
          </div>
        </div>
        <div class="totals-box" id="bill-totals">
          <div class="totals-row"><span>Subtotal</span><span id="t-subtotal">₹0.00</span></div>
          <div class="totals-row" id="t-cgst-row"><span>CGST</span><span id="t-cgst">₹0.00</span></div>
          <div class="totals-row" id="t-sgst-row"><span>SGST</span><span id="t-sgst">₹0.00</span></div>
          <div class="totals-row" id="t-igst-row" style="display:none"><span>IGST</span><span id="t-igst">₹0.00</span></div>
          <div class="totals-row total"><span>Grand Total</span><span id="t-grand">₹0.00</span></div>
        </div>
        <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
          <button class="btn btn-primary" onclick="generateInvoice()" style="flex:1">Generate Invoice</button>
          <button class="btn btn-info" onclick="generateQuotation()" style="flex:1">Generate Quotation</button>
        </div>
        <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">
          <button class="btn btn-warn" onclick="saveBillState()" style="flex:1">💾 Save Bill</button>
          <button class="btn btn-info" onclick="showLoadBillModal()" style="flex:1">📂 Load Bill</button>
          <button class="btn" onclick="clearBill()">🗑️ Clear</button>
        </div>
      </div>
    </div>
  </div>
</div>

</div>
</div>

<!-- PRINT AREA -->
<div class="print-area" id="print-area"></div>

<!-- LOAD BILL MODAL -->
<div id="load-bill-modal" style="display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);z-index:2000;overflow-y:auto;padding:20px">
  <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:12px;padding:24px;border:1px solid #ddd;box-shadow:0 4px 20px rgba(0,0,0,0.3)">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
      <h3 style="margin:0;font-size:18px;color:#222">📂 Load Saved Bill</h3>
      <button onclick="closeLoadBillModal()" style="background:none;border:none;font-size:24px;cursor:pointer;color:#666;line-height:1">&times;</button>
    </div>
    <div id="saved-bills-list" style="max-height:400px;overflow-y:auto"></div>
  </div>
</div>

<script src="./../js/script.js"></script>
<script>
let products = [];
let editingId = null;
let billItems = [];

// Fetch products from API
function loadProducts(callback) {
  $.ajax({
    url: "./../api/goods.php",
    type: "POST",
    data: {
      action: "get_items",
      search: ""
    },
    success: function(data) {
      try {
        const items = JSON.parse(data);
        // Map API response to match the expected product structure
        products = items.map(item => ({
          id: item.item_id,
          name: item.item_name,
          size: item.item_size || 'Free Size',
          cat: 'Pet Accessories', // Default category, can be enhanced
          hsn: '4201', // Default HSN code for pet accessories
          gst: 5, // Default GST rate
          cp: parseFloat(item.item_cp) || 0,
          wp: parseFloat(item.item_wp) || 0,
          op: parseFloat(item.item_op) || 0,
          sp: parseFloat(item.item_sp) || 0,
          mrp: parseFloat(item.item_mrp) || 0,
          stock: parseInt(item.stock) || 0
        }));
        if (callback) callback();
      } catch (e) {
        console.error('Error parsing products:', e);
        products = [];
        if (callback) callback();
      }
    },
    error: function(xhr, status, error) {
      console.error('Error loading products:', error);
      products = [];
      if (callback) callback();
    }
  });
}

function switchTab(t){
  document.querySelectorAll('.tab').forEach(el=>el.classList.remove('active'));
  document.querySelectorAll('.section').forEach(el=>el.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('sec-'+t).classList.add('active');
  if(t==='billing') updateBillSummary();
}

function renderInventory(){
  const q = document.getElementById('inv-search').value.toLowerCase();
  const tbody = document.getElementById('inv-tbody');
  const filtered = products.filter(p=>p.name.toLowerCase().includes(q)||p.id.toLowerCase().includes(q));
  if(!filtered.length){tbody.innerHTML='<tr><td colspan="5" style="text-align:center;padding:24px;color:var(--color-text-secondary)">No products found</td></tr>';return;}
  tbody.innerHTML = filtered.map(p=>`
    <tr>
      <td style="font-weight:500">${p.name}</td>
      <td style="font-family:var(--font-mono);font-size:11px">${p.id}</td>
      <td>${p.size||'-'}</td>
      <td>₹${p.sp}</td>
      <td><span class="badge ${p.stock>5?'badge-green':'badge-red'}">${p.stock}</span></td>
    </tr>`).join('');
}

// BILLING
function showProductDropdown(){
  const q=document.getElementById('b-product-search').value.toLowerCase();
  const dd=document.getElementById('product-dropdown');
  if(!q){dd.style.display='none';return;}
  const matches=products.filter(p=>p.name.toLowerCase().includes(q)||p.id.toLowerCase().includes(q));
  if(!matches.length){dd.style.display='none';return;}
  dd.innerHTML=matches.map(p=>`
    <div class="product-option" onclick="addToBill('${p.id}')">
      <span><strong style="font-family:var(--font-mono);font-size:12px">${p.id}</strong> - ${p.name} <span style="font-size:11px;color:var(--color-text-secondary)">(${p.size})</span></span>
      <span style="font-weight:500;color:#0F6E56">₹${p.sp}</span>
    </div>`).join('');
  dd.style.display='block';
}

function addToBill(id){
  const p=products.find(x=>x.id===id);
  if(!p)return;
  const existing=billItems.find(b=>b.id===id);
  if(existing){existing.qty++;} else {billItems.push({...p,qty:1});}
  document.getElementById('b-product-search').value='';
  document.getElementById('product-dropdown').style.display='none';
  renderBillItems();updateBillSummary();
}

function renderBillItems(){
  const container=document.getElementById('bill-items-list');
  document.getElementById('bill-empty').style.display=billItems.length?'none':'block';
  const rows=billItems.map((item,i)=>`
    <div style="display:grid;grid-template-columns:1fr auto auto auto;gap:8px;align-items:center;padding:8px 0;border-bottom:0.5px solid var(--color-border-tertiary)">
      <div>
        <div style="font-size:13px;font-weight:500">${item.name}</div>
        <div style="font-size:11px;color:var(--color-text-secondary)">${item.id} | Size: ${item.size} | GST: ${item.gst}%</div>
      </div>
      <div style="display:flex;align-items:center;gap:6px">
        <button class="btn" style="padding:2px 8px;font-size:13px" onclick="changeBillQty(${i},-1)">-</button>
        <input type="number" min="1" value="${item.qty}" onchange="updateBillQtyInput(${i},this.value)" style="width:50px;padding:4px 6px;border:0.5px solid var(--color-border-tertiary);border-radius:4px;font-size:13px;font-weight:500;text-align:center;background:var(--color-background-primary);color:var(--color-text-primary);font-family:var(--font-sans)">
        <button class="btn" style="padding:2px 8px;font-size:13px" onclick="changeBillQty(${i},1)">+</button>
      </div>
      <div style="font-size:13px;font-weight:500;color:#0F6E56">₹${(item.sp*item.qty).toFixed(2)}</div>
      <button class="btn btn-danger" onclick="removeFromBill(${i})">x</button>
    </div>`).join('');
  container.innerHTML='<div style="padding:0 4px">'+rows+'</div><div class="empty-state" id="bill-empty" style="'+(billItems.length?'display:none':'')+'">No products added yet. Search above to add.</div>';
}

function changeBillQty(i,d){
  billItems[i].qty+=d;
  if(billItems[i].qty<=0)billItems.splice(i,1);
  renderBillItems();updateBillSummary();
}

function updateBillQtyInput(i,val){
  const qty=parseInt(val)||1;
  if(qty<=0){removeFromBill(i);return;}
  billItems[i].qty=qty;
  renderBillItems();updateBillSummary();
}

function removeFromBill(i){billItems.splice(i,1);renderBillItems();updateBillSummary();}

function updateBillSummary(){
  const isIGST=document.getElementById('b-state').value==='OTHER';
  let subtotal=0,totalGST=0;
  billItems.forEach(item=>{
    const base=item.sp*item.qty;
    const gstAmt=base*(item.gst/100);
    subtotal+=base;totalGST+=gstAmt;
  });
  document.getElementById('t-subtotal').textContent='₹'+subtotal.toFixed(2);
  if(isIGST){
    document.getElementById('t-cgst-row').style.display='none';
    document.getElementById('t-sgst-row').style.display='none';
    document.getElementById('t-igst-row').style.display='flex';
    document.getElementById('t-igst').textContent='₹'+totalGST.toFixed(2);
  } else {
    document.getElementById('t-cgst-row').style.display='flex';
    document.getElementById('t-sgst-row').style.display='flex';
    document.getElementById('t-igst-row').style.display='none';
    document.getElementById('t-cgst').textContent='₹'+(totalGST/2).toFixed(2);
    document.getElementById('t-sgst').textContent='₹'+(totalGST/2).toFixed(2);
  }
  document.getElementById('t-grand').textContent='₹'+(subtotal+totalGST).toFixed(2);
  const today=new Date();
  document.getElementById('inv-date-display').textContent=today.toLocaleDateString('en-IN');
}

document.getElementById('b-state').addEventListener('change',updateBillSummary);


// Save, Load, and Clear Bill Functions
function clearBill(){
  if(billItems.length > 0) {
    if(!confirm('Are you sure you want to clear the current bill? Unsaved changes will be lost.')) return;
  }
  billItems=[];
  document.getElementById('b-cname').value='';
  document.getElementById('b-phone').value='';
  document.getElementById('b-addr').value='';
  document.getElementById('b-gstin').value='';
  document.getElementById('b-state').value='JH';
  document.getElementById('invoice-no-input').value='';
  renderBillItems();
  updateBillSummary();
}

// Save bill state to localStorage
function saveBillState(){
  const cname = document.getElementById('b-cname').value.trim();
  if(!cname){
    alert('Please enter customer name before saving the bill');
    document.getElementById('b-cname').focus();
    return;
  }
  if(billItems.length === 0){
    alert('Cannot save an empty bill. Please add at least one product.');
    return;
  }
  
  const billState = {
    customerName: cname,
    phone: document.getElementById('b-phone').value,
    address: document.getElementById('b-addr').value,
    gstin: document.getElementById('b-gstin').value,
    state: document.getElementById('b-state').value,
    invoiceNo: document.getElementById('invoice-no-input').value,
    items: billItems,
    savedAt: new Date().toISOString(),
    savedAtDisplay: new Date().toLocaleString('en-IN')
  };
  
  // Get existing saved bills
  let savedBills = JSON.parse(localStorage.getItem('animoxkart_saved_bills') || '[]');
  
  // Check if bill with same customer name exists
  const existingIndex = savedBills.findIndex(b => b.customerName.toLowerCase() === cname.toLowerCase());
  
  if(existingIndex !== -1){
    if(confirm(`A bill for "${cname}" already exists. Do you want to overwrite it?`)){
      savedBills[existingIndex] = billState;
    } else {
      return;
    }
  } else {
    savedBills.push(billState);
  }
  
  // Save to localStorage
  localStorage.setItem('animoxkart_saved_bills', JSON.stringify(savedBills));
  
  alert(`✅ Bill saved successfully for "${cname}"!\n\nYou can load it anytime from the "Load Bill" button.`);
}

// Show load bill modal
function showLoadBillModal(){
  const savedBills = JSON.parse(localStorage.getItem('animoxkart_saved_bills') || '[]');
  const modal = document.getElementById('load-bill-modal');
  const listContainer = document.getElementById('saved-bills-list');
  
  if(savedBills.length === 0){
    listContainer.innerHTML = '<div style="text-align:center;padding:40px;color:var(--color-text-secondary)"><div style="font-size:48px;margin-bottom:12px">📭</div><div style="font-size:14px">No saved bills found</div><div style="font-size:12px;margin-top:4px">Save a bill to see it here</div></div>';
  } else {
    listContainer.innerHTML = savedBills.map((bill, index) => `
      <div style="border:1px solid #ddd;border-radius:8px;padding:16px;margin-bottom:12px;background:#f9f9f9">
        <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:8px">
          <div>
            <div style="font-size:15px;font-weight:600;color:#222;margin-bottom:4px">${bill.customerName}</div>
            <div style="font-size:12px;color:#666">📞 ${bill.phone || 'N/A'}</div>
            <div style="font-size:11px;color:#888;margin-top:2px">💾 Saved: ${bill.savedAtDisplay}</div>
          </div>
          <div style="display:flex;gap:6px">
            <button class="btn btn-info" onclick="loadBillState(${index})" style="padding:6px 12px;font-size:12px">Load</button>
            <button class="btn btn-danger" onclick="deleteSavedBill(${index})" style="padding:6px 12px;font-size:12px">Delete</button>
          </div>
        </div>
        <div style="font-size:12px;color:#666;padding-top:8px;border-top:1px solid #ddd">
          <strong>${bill.items.length}</strong> item(s) • Invoice: <strong>${bill.invoiceNo || 'Not set'}</strong>
        </div>
      </div>
    `).join('');
  }
  
  modal.style.display = 'block';
}

// Close load bill modal
function closeLoadBillModal(){
  document.getElementById('load-bill-modal').style.display = 'none';
}

// Load bill state from localStorage
function loadBillState(index){
  const savedBills = JSON.parse(localStorage.getItem('animoxkart_saved_bills') || '[]');
  if(index < 0 || index >= savedBills.length) return;
  
  const bill = savedBills[index];
  
  // Check if current bill has unsaved changes
  if(billItems.length > 0){
    if(!confirm('Loading this bill will replace your current bill. Continue?')) return;
  }
  
  // Load customer details
  document.getElementById('b-cname').value = bill.customerName;
  document.getElementById('b-phone').value = bill.phone;
  document.getElementById('b-addr').value = bill.address;
  document.getElementById('b-gstin').value = bill.gstin;
  document.getElementById('b-state').value = bill.state;
  document.getElementById('invoice-no-input').value = bill.invoiceNo;
  
  // Load bill items
  billItems = bill.items;
  
  // Switch to billing tab if not already there
  const billingTab = document.querySelectorAll('.tab')[1];
  if(billingTab && !billingTab.classList.contains('active')){
    switchTab('billing');
  }
  
  // Update UI
  renderBillItems();
  updateBillSummary();
  closeLoadBillModal();
  
  alert(`✅ Bill loaded successfully for "${bill.customerName}"!`);
}

// Delete saved bill
function deleteSavedBill(index){
  const savedBills = JSON.parse(localStorage.getItem('animoxkart_saved_bills') || '[]');
  if(index < 0 || index >= savedBills.length) return;
  
  const bill = savedBills[index];
  if(!confirm(`Are you sure you want to delete the saved bill for "${bill.customerName}"?`)) return;
  
  savedBills.splice(index, 1);
  localStorage.setItem('animoxkart_saved_bills', JSON.stringify(savedBills));
  
  // Refresh the modal
  showLoadBillModal();
}

function numToWords(n){
  const a=['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'];
  const b=['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];
  if(n===0)return'Zero';
  const inWords=(n)=>{
    if(n<20)return a[n];
    if(n<100)return b[Math.floor(n/10)]+(n%10?' '+a[n%10]:'');
    if(n<1000)return a[Math.floor(n/100)]+' Hundred'+(n%100?' '+inWords(n%100):'');
    if(n<100000)return inWords(Math.floor(n/1000))+' Thousand'+(n%1000?' '+inWords(n%1000):'');
    if(n<10000000)return inWords(Math.floor(n/100000))+' Lakh'+(n%100000?' '+inWords(n%100000):'');
    return inWords(Math.floor(n/10000000))+' Crore'+(n%10000000?' '+inWords(n%10000000):'');
  };
  const parts=n.toFixed(2).split('.');
  let w=inWords(parseInt(parts[0]));
  if(parseInt(parts[1])>0)w+=' and '+inWords(parseInt(parts[1]))+' Paise';
  return'Indian Rupees: '+w+' Only';
}

function generateInvoice(){
  if(!billItems.length){alert('Add at least one product to the bill');return;}
  const invNo=document.getElementById('invoice-no-input').value.trim()||'INV-001';
  const cname=document.getElementById('b-cname').value||'Walk-in Customer';
  const cphone=document.getElementById('b-phone').value||'-';
  const caddr=document.getElementById('b-addr').value||'-';
  const cgstin=document.getElementById('b-gstin').value||'Unregistered';
  const isIGST=document.getElementById('b-state').value==='OTHER';
  const today=new Date();
  const dateStr=today.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'});

  let subtotal=0,totalGST=0;
  const itemRows=billItems.map((item,i)=>{
    const base=item.sp*item.qty;
    const gstAmt=base*(item.gst/100);
    const totalAmt=base+gstAmt;
    subtotal+=base;totalGST+=gstAmt;
    const half=gstAmt/2;
    return`<tr>
      <td>${i+1}</td>
      <td style="font-weight:500">${item.name}<br><span style="font-size:9px;color:#888">${item.id} | Size: ${item.size}</span></td>
      <td>${item.hsn||'4201'}</td>
      <td class="text-right">${item.qty}</td>
      <td class="text-right">₹${item.sp.toFixed(2)}</td>
      <td class="text-right">₹${base.toFixed(2)}</td>
      <td class="text-right">₹${base.toFixed(2)}</td>
      <td class="text-right">${item.gst}%</td>
      ${isIGST?`<td class="text-right">₹${gstAmt.toFixed(2)}</td><td></td><td></td>`:`<td></td><td class="text-right">${item.gst/2}% | ₹${half.toFixed(2)}</td><td class="text-right">${item.gst/2}% | ₹${half.toFixed(2)}</td>`}
      <td class="text-right" style="font-weight:600">₹${totalAmt.toFixed(2)}</td>
    </tr>`;
  }).join('');

  const grand=subtotal+totalGST;
  const hsnMap={};
  billItems.forEach(item=>{
    const h=item.hsn||'4201';
    if(!hsnMap[h])hsnMap[h]={taxable:0,gst:item.gst,cgst:0,sgst:0,igst:0};
    const base=item.sp*item.qty;
    const gstAmt=base*(item.gst/100);
    hsnMap[h].taxable+=base;
    if(isIGST)hsnMap[h].igst+=gstAmt; else{hsnMap[h].cgst+=gstAmt/2;hsnMap[h].sgst+=gstAmt/2;}
  });
  const hsnRows=Object.entries(hsnMap).map(([h,v])=>`<tr>
    <td>${h}</td><td>${v.gst}%</td>
    <td class="text-right">₹${v.taxable.toFixed(2)}</td>
    <td class="text-right">${isIGST?'-':'₹'+v.cgst.toFixed(2)}</td>
    <td class="text-right">${isIGST?'-':'₹'+v.sgst.toFixed(2)}</td>
    <td class="text-right">${isIGST?'₹'+v.igst.toFixed(2):'-'}</td>
    <td class="text-right">₹${(v.taxable+(isIGST?v.igst:v.cgst+v.sgst)).toFixed(2)}</td>
  </tr>`).join('');

  const html=`<div class="invoice-page" id="invoice-page">
    <div class="inv-header">
      <div>
        <div class="inv-company-name">ANIMOXKART</div>
        <div class="inv-tagline">Premium Dog & Cat Accessories</div>
        <div style="margin-top:6px;font-size:10px;color:#555;line-height:1.7">
          140, Anand Nagar, Near Tilta Chowk<br>Jhiri, Ratu, Ranchi, Jharkhand - 835222<br>
          GSTIN: 20HGSPS1796A1Z5 | State: Jharkhand, Code: 20
        </div>
      </div>
      <div>
        <div class="inv-title">TAX INVOICE</div>
        <div class="inv-badge">ORIGINAL FOR RECIPIENT</div>
      </div>
    </div>
    <hr class="inv-divider">
    <div class="inv-meta">
      <div class="inv-meta-item"><div class="inv-meta-label">Invoice No.</div><div class="inv-meta-val">${invNo}</div></div>
      <div class="inv-meta-item"><div class="inv-meta-label">Date</div><div class="inv-meta-val">${dateStr}</div></div>
      <div class="inv-meta-item"><div class="inv-meta-label">Payment Mode</div><div class="inv-meta-val">Cash / UPI</div></div>
    </div>
    <div class="inv-parties">
      <div class="inv-party-box">
        <div class="inv-party-label">Bill To / Buyer</div>
        <div class="inv-party-name">${cname}</div>
        <div class="inv-party-detail">
          ${caddr}<br>Phone: ${cphone}<br>GSTIN: ${cgstin}
        </div>
      </div>
      <div class="inv-party-box">
        <div class="inv-party-label">Ship To</div>
        <div class="inv-party-name">${cname}</div>
        <div class="inv-party-detail">${caddr}<br>Phone: ${cphone}</div>
      </div>
    </div>
    <table class="inv-table">
      <thead>
        <tr>
          <th>#</th><th>Description of Goods</th><th>HSN</th><th>Qty</th><th>Rate</th><th>Amount</th><th>Taxable Value</th><th>GST %</th>
          ${isIGST?'<th>IGST</th><th></th><th></th>':'<th></th><th>CGST</th><th>SGST</th>'}
          <th>Total</th>
        </tr>
      </thead>
      <tbody>${itemRows}</tbody>
      <tfoot>
        <tr style="background:#f9f9f9">
          <td colspan="3" style="font-weight:700">Total</td>
          <td class="text-right" style="font-weight:700">${billItems.reduce((a,b)=>a+b.qty,0)}</td>
          <td></td>
          <td class="text-right" style="font-weight:700">₹${(subtotal).toFixed(2)}</td>
          <td class="text-right" style="font-weight:700">₹${subtotal.toFixed(2)}</td>
          <td></td>
          ${isIGST?`<td class="text-right" style="font-weight:700">₹${totalGST.toFixed(2)}</td><td></td><td></td>`:`<td></td><td class="text-right" style="font-weight:700">₹${(totalGST/2).toFixed(2)}</td><td class="text-right" style="font-weight:700">₹${(totalGST/2).toFixed(2)}</td>`}
          <td class="text-right" style="font-weight:700;color:#1D9E75">₹${grand.toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>
    <div class="inv-words">${numToWords(grand)}</div>
    <div style="margin-bottom:10px">
      <div style="font-size:10px;font-weight:700;color:#555;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.5px">HSN / Tax Summary</div>
      <table class="inv-hsn-table">
        <thead><tr><th>HSN/SAC</th><th>GST Rate</th><th>Taxable Value</th><th>CGST</th><th>SGST</th><th>IGST</th><th>Total Tax</th></tr></thead>
        <tbody>${hsnRows}</tbody>
        <tfoot><tr style="background:#eee">
          <td colspan="2" style="font-weight:700;font-size:10px">Total</td>
          <td style="text-align:right;font-weight:700">₹${subtotal.toFixed(2)}</td>
          <td style="text-align:right;font-weight:700">${isIGST?'-':'₹'+(totalGST/2).toFixed(2)}</td>
          <td style="text-align:right;font-weight:700">${isIGST?'-':'₹'+(totalGST/2).toFixed(2)}</td>
          <td style="text-align:right;font-weight:700">${isIGST?'₹'+totalGST.toFixed(2):'-'}</td>
          <td style="text-align:right;font-weight:700">₹${totalGST.toFixed(2)}</td>
        </tfoot>
      </table>
    </div>
    <div class="inv-totals">
      <div class="inv-totals-left">
        <div><strong>Declaration:</strong></div>
        <div style="color:#777">We declare that this invoice shows the actual price<br>of the goods described and all particulars are<br>true and correct.</div>
      </div>
      <div class="inv-totals-right">
        <div class="inv-totals-row"><span>Subtotal (Taxable)</span><span>₹${subtotal.toFixed(2)}</span></div>
        ${isIGST?`<div class="inv-totals-row"><span>IGST</span><span>₹${totalGST.toFixed(2)}</span></div>`:`<div class="inv-totals-row"><span>CGST</span><span>₹${(totalGST/2).toFixed(2)}</span></div><div class="inv-totals-row"><span>SGST</span><span>₹${(totalGST/2).toFixed(2)}</span></div>`}
        <div class="inv-totals-row grand"><span>Grand Total</span><span>₹${grand.toFixed(2)}</span></div>
      </div>
    </div>
    <div class="inv-footer">
      <div style="font-size:10px;color:#777">
        <strong style="color:#333">Terms & Conditions:</strong><br>
        1. Goods once sold will not be taken back.<br>
        2. Interest @18% p.a. will be charged after due date.<br>
        3. Subject to Ranchi jurisdiction only.
      </div>
      <div class="inv-sign">
        <div style="font-size:10px;color:#777">For <strong style="color:#333">ANIMOXKART</strong></div>
        <div class="inv-sign-line">Authorised Signatory</div>
      </div>
    </div>
    <div style="text-align:center;margin-top:12px;font-size:9px;color:#aaa;border-top:0.5px solid #eee;padding-top:8px">This is a Computer Generated Invoice</div>
  </div>`;

  document.getElementById('print-area').innerHTML=`
    <div style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);z-index:1000;overflow-y:auto;padding:20px" id="invoice-modal">
      <div style="max-width:900px;margin:0 auto;background:#fff;padding:20px;border-radius:8px">
        <div style="display:flex;gap:10px;margin-bottom:16px" class="no-print">
          <button onclick="window.print()" style="padding:10px 24px;background:#1D9E75;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer">Print / Save PDF</button>
          <button onclick="closeInvoice()" style="padding:10px 24px;background:#fff;border:0.5px solid #ccc;border-radius:8px;font-size:14px;cursor:pointer">Close</button>
          <span style="color:#333;font-size:12px;align-self:center">Tip: In print dialog, select A4 paper size</span>
        </div>
        ${html}
      </div>
    </div>`;
  document.getElementById('print-area').style.display='block';
}

function generateQuotation(){
  if(!billItems.length){alert('Add at least one product to the bill');return;}
  const isIGST=document.getElementById('b-state').value==='OTHER';
  const today=new Date();
  const dateStr=today.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'});

  let subtotal=0,totalGST=0;
  const itemRows=billItems.map((item,i)=>{
    const base=item.sp*item.qty;
    const gstAmt=base*(item.gst/100);
    const totalAmt=base+gstAmt;
    subtotal+=base;totalGST+=gstAmt;
    const half=gstAmt/2;
    return`<tr>
      <td>${i+1}</td>
      <td style="font-weight:500">${item.name}<br><span style="font-size:9px;color:#888">${item.id} | Size: ${item.size}</span></td>
      <td class="text-right">${item.qty}</td>
      <td class="text-right">₹${item.sp.toFixed(2)}</td>
      <td class="text-right">₹${base.toFixed(2)}</td>
      <td class="text-right">₹${base.toFixed(2)}</td>
      <td class="text-right">${item.gst}%</td>
      ${isIGST?`<td class="text-right">₹${gstAmt.toFixed(2)}</td><td></td><td></td>`:`<td></td><td class="text-right">${item.gst/2}% | ₹${half.toFixed(2)}</td><td class="text-right">${item.gst/2}% | ₹${half.toFixed(2)}</td>`}
      <td class="text-right" style="font-weight:600">₹${totalAmt.toFixed(2)}</td>
    </tr>`;
  }).join('');

  const grand=subtotal+totalGST;

  const html=`<div class="invoice-page" id="quotation-page">
    <div style="text-align:center;margin-bottom:20px">
      <div style="font-size:24px;font-weight:700;color:#1D9E75;letter-spacing:2px">QUOTATION</div>
      <div style="font-size:11px;color:#666;margin-top:4px">For Buyer Confirmation</div>
      <div style="font-size:10px;color:#888;margin-top:8px">Date: ${dateStr}</div>
    </div>
    <hr style="border:none;border-top:2px solid #1D9E75;margin:16px 0">
    
    <table class="inv-table">
      <thead>
        <tr>
          <th>#</th><th>Product</th><th>Qty</th><th>Rate</th><th>Amount</th><th>Taxable</th><th>GST %</th>
          ${isIGST?'<th>IGST</th><th></th><th></th>':'<th></th><th>CGST</th><th>SGST</th>'}
          <th>Total</th>
        </tr>
      </thead>
      <tbody>${itemRows}</tbody>
      <tfoot>
        <tr style="background:#f9f9f9">
          <td colspan="2" style="font-weight:700">Total</td>
          <td class="text-right" style="font-weight:700">${billItems.reduce((a,b)=>a+b.qty,0)}</td>
          <td></td>
          <td class="text-right" style="font-weight:700">₹${(subtotal).toFixed(2)}</td>
          <td class="text-right" style="font-weight:700">₹${subtotal.toFixed(2)}</td>
          <td></td>
          ${isIGST?`<td class="text-right" style="font-weight:700">₹${totalGST.toFixed(2)}</td><td></td><td></td>`:`<td></td><td class="text-right" style="font-weight:700">₹${(totalGST/2).toFixed(2)}</td><td class="text-right" style="font-weight:700">₹${(totalGST/2).toFixed(2)}</td>`}
          <td class="text-right" style="font-weight:700;color:#1D9E75">₹${grand.toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>
    
    <div style="margin-top:20px;background:#EAF3DE;padding:12px;border-radius:6px">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div>
          <div style="font-size:11px;color:#666;margin-bottom:6px">Tax Summary</div>
          <div style="font-size:13px;color:#3B6D11">
            <div>Subtotal (Taxable): <strong>₹${subtotal.toFixed(2)}</strong></div>
            ${isIGST?`<div>IGST: <strong>₹${totalGST.toFixed(2)}</strong></div>`:`<div>CGST: <strong>₹${(totalGST/2).toFixed(2)}</strong></div><div>SGST: <strong>₹${(totalGST/2).toFixed(2)}</strong></div>`}
          </div>
        </div>
        <div style="text-align:right">
          <div style="font-size:11px;color:#666;margin-bottom:6px">Grand Total</div>
          <div style="font-size:20px;font-weight:700;color:#1D9E75">₹${grand.toFixed(2)}</div>
        </div>
      </div>
    </div>
    
    <div style="margin-top:24px;padding-top:16px;border-top:1px solid #eee;text-align:center;font-size:10px;color:#888">
      <div style="margin-bottom:8px">This is a quotation for buyer confirmation only. Not a tax invoice.</div>
      <div>Please confirm to proceed with the order.</div>
    </div>
  </div>`;

  document.getElementById('print-area').innerHTML=`
    <div style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);z-index:1000;overflow-y:auto;padding:20px" id="quotation-modal">
      <div style="max-width:900px;margin:0 auto;background:#fff;padding:20px;border-radius:8px">
        <div style="display:flex;gap:10px;margin-bottom:16px" class="no-print">
          <button onclick="window.print()" style="padding:10px 24px;background:#1D9E75;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer">Print / Save PDF</button>
          <button onclick="closeInvoice()" style="padding:10px 24px;background:#fff;border:0.5px solid #ccc;border-radius:8px;font-size:14px;cursor:pointer">Close</button>
          <span style="color:#333;font-size:12px;align-self:center">Quotation for buyer confirmation</span>
        </div>
        ${html}
      </div>
    </div>`;
  document.getElementById('print-area').style.display='block';
}

function closeInvoice(){
  document.getElementById('print-area').style.display='none';
  document.getElementById('print-area').innerHTML='';
}

document.addEventListener('click',e=>{
  if(!e.target.closest('.product-search-wrap'))document.getElementById('product-dropdown').style.display='none';
});

// Load products from API on page load
loadProducts(function() {
  renderInventory();
  updateBillSummary();
});
</script>
