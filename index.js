let allProducts  = [];
let currentPage  = 'dashboard';

const grid         = document.getElementById('productsGrid');
const loading      = document.getElementById('loadingState');
const errorState   = document.getElementById('errorState');
const emptyState   = document.getElementById('emptyState');
const searchInput  = document.getElementById('searchInput');
const catFilter    = document.getElementById('categoryFilter');
const clearBtn     = document.getElementById('clearFilters');
const retryBtn     = document.getElementById('retryBtn');
const resultsCount = document.getElementById('resultsCount');
const menuBtn      = document.getElementById('menuBtn');
const sidebar      = document.getElementById('sidebar');
const overlay      = document.getElementById('overlay');
const modalBackdrop= document.getElementById('modalBackdrop');


const FALLBACK = [
  {
    id:101, title:'Wireless Noise-Cancelling Headphones', price:249.99, discountPercentage:15,
    rating:4.7, stock:38, category:'electronics', brand:'SoundCore',
    thumbnail:'https://placehold.co/400x300/e0e7ff/4f46e5?text=Headphones',
    images:['https://placehold.co/400x300/e0e7ff/4f46e5?text=Headphones','https://placehold.co/400x300/c7d2fe/4f46e5?text=Side','https://placehold.co/400x300/ddd6fe/6d28d9?text=Case'],
    description:'Experience studio-quality sound with 30-hour battery, adaptive noise cancellation, and premium comfort ear cushions. Compatible with all Bluetooth devices.',
    warrantyInformation:'2 Year Limited Warranty', shippingInformation:'Ships in 1–2 business days',
    returnPolicy:'30-day returns', minimumOrderQuantity:1, weight:0.28,
    dimensions:{width:18.5,height:19.0,depth:8.5}, reviews:[{},{},{},{},{}]
  },
  {
    id:102, title:'Ergonomic Office Chair', price:399.00, discountPercentage:10,
    rating:4.5, stock:7, category:'furniture', brand:'ErgoSit',
    thumbnail:'https://placehold.co/400x300/dcfce7/16a34a?text=Chair',
    images:['https://placehold.co/400x300/dcfce7/16a34a?text=Chair','https://placehold.co/400x300/bbf7d0/15803d?text=Side'],
    description:'Fully adjustable lumbar support, breathable mesh back, and 4D armrests. Designed for all-day comfort with a 135° recline.',
    warrantyInformation:'5 Year Structural Warranty', shippingInformation:'Free white-glove delivery',
    returnPolicy:'60-day returns', minimumOrderQuantity:1, weight:18.0,
    dimensions:{width:68,height:118,depth:65}, reviews:[{},{},{}]
  },
  {
    id:103, title:'Mechanical Keyboard RGB', price:129.95, discountPercentage:0,
    rating:4.8, stock:55, category:'electronics', brand:'KeyMaster',
    thumbnail:'https://placehold.co/400x300/fef9c3/ca8a04?text=Keyboard',
    images:['https://placehold.co/400x300/fef9c3/ca8a04?text=Keyboard','https://placehold.co/400x300/fef08a/a16207?text=Backlit'],
    description:'Tactile brown switches, per-key RGB lighting, PBT double-shot keycaps and an aluminium body for that satisfying typing feel.',
    warrantyInformation:'1 Year Warranty', shippingInformation:'Ships in 2–3 days',
    returnPolicy:'14-day returns', minimumOrderQuantity:1, weight:1.1,
    dimensions:{width:36,height:14,depth:4}, reviews:[{},{},{},{},{},{}]
  },
  {
    id:104, title:'Minimalist Leather Wallet', price:49.99, discountPercentage:5,
    rating:4.3, stock:80, category:'accessories', brand:'SlimCo',
    thumbnail:'https://placehold.co/400x300/fce7f3/be185d?text=Wallet',
    images:['https://placehold.co/400x300/fce7f3/be185d?text=Wallet'],
    description:'Full-grain leather, RFID-blocking, holds up to 12 cards. Slim profile at just 6mm thick — fits every pocket.',
    warrantyInformation:'Lifetime Craftsmanship Guarantee', shippingInformation:'Ships in 1 day',
    returnPolicy:'30-day returns', minimumOrderQuantity:1, weight:0.06,
    dimensions:{width:10,height:8,depth:0.6}, reviews:[{},{}]
  },
  {
    id:105, title:'4K Ultra HD Smart TV 55"', price:699.00, discountPercentage:20,
    rating:4.6, stock:8, category:'electronics', brand:'VisionMax',
    thumbnail:'https://placehold.co/400x300/e0f2fe/0284c7?text=TV',
    images:['https://placehold.co/400x300/e0f2fe/0284c7?text=TV','https://placehold.co/400x300/bae6fd/0369a1?text=Back'],
    description:'Quantum dot display, 120Hz refresh rate, built-in Dolby Atmos, and smart OS with 10,000+ apps. Gaming mode with 4ms response time.',
    warrantyInformation:'3 Year Parts & Labour', shippingInformation:'Free delivery + installation',
    returnPolicy:'15-day returns', minimumOrderQuantity:1, weight:17.5,
    dimensions:{width:124,height:72,depth:8}, reviews:[{},{},{},{},{}]
  },
  {
    id:106, title:'Stainless Steel Water Bottle', price:34.99, discountPercentage:0,
    rating:4.4, stock:200, category:'sports', brand:'HydroFlow',
    thumbnail:'https://placehold.co/400x300/d1fae5/065f46?text=Bottle',
    images:['https://placehold.co/400x300/d1fae5/065f46?text=Bottle'],
    description:'18/8 food-grade stainless steel, triple-wall vacuum insulation keeps drinks cold 24h and hot 12h. BPA-free and leak-proof.',
    warrantyInformation:'Lifetime Guarantee', shippingInformation:'Ships same day',
    returnPolicy:'30-day returns', minimumOrderQuantity:1, weight:0.35,
    dimensions:{width:7,height:27,depth:7}, reviews:[{},{},{}]
  },
  {
    id:107, title:'Running Shoes Pro X', price:119.99, discountPercentage:12,
    rating:4.5, stock:42, category:'sports', brand:'SwiftStep',
    thumbnail:'https://placehold.co/400x300/ede9fe/7c3aed?text=Shoes',
    images:['https://placehold.co/400x300/ede9fe/7c3aed?text=Shoes','https://placehold.co/400x300/ddd6fe/6d28d9?text=Sole'],
    description:'Carbon-fibre plate, responsive foam midsole, and breathable mesh upper. Designed for long-distance runners seeking speed and comfort.',
    warrantyInformation:'6 Month Wear Guarantee', shippingInformation:'Ships in 1–2 days',
    returnPolicy:'45-day returns', minimumOrderQuantity:1, weight:0.32,
    dimensions:{width:30,height:11,depth:12}, reviews:[{},{},{},{}]
  },
  {
    id:108, title:'Scented Soy Candle Set', price:28.00, discountPercentage:0,
    rating:4.2, stock:130, category:'home', brand:'AromaCraft',
    thumbnail:'https://placehold.co/400x300/fff7ed/ea580c?text=Candles',
    images:['https://placehold.co/400x300/fff7ed/ea580c?text=Candles'],
    description:'Set of 6 hand-poured soy candles in linen, sandalwood, cedar, vanilla, sea salt and lavender. 45-hour burn time each.',
    warrantyInformation:'Satisfaction Guaranteed', shippingInformation:'Ships in 2–3 days',
    returnPolicy:'30-day returns', minimumOrderQuantity:1, weight:0.9,
    dimensions:{width:22,height:8,depth:22}, reviews:[{},{}]
  },
  {
    id:109, title:'Portable Bluetooth Speaker', price:89.99, discountPercentage:8,
    rating:4.6, stock:0, category:'electronics', brand:'BoomBox',
    thumbnail:'https://placehold.co/400x300/fef2f2/dc2626?text=Speaker',
    images:['https://placehold.co/400x300/fef2f2/dc2626?text=Speaker'],
    description:'360° immersive sound, IP67 waterproof rating, 20-hour battery, and built-in power bank. The perfect outdoor companion.',
    warrantyInformation:'1 Year Warranty', shippingInformation:'Ships in 2 days',
    returnPolicy:'30-day returns', minimumOrderQuantity:1, weight:0.55,
    dimensions:{width:18,height:7,depth:7}, reviews:[{},{},{},{}]
  },
  {
    id:110, title:'Yoga Mat Premium', price:59.99, discountPercentage:0,
    rating:4.7, stock:75, category:'sports', brand:'ZenFlex',
    thumbnail:'https://placehold.co/400x300/f0fdf4/15803d?text=Yoga+Mat',
    images:['https://placehold.co/400x300/f0fdf4/15803d?text=Yoga+Mat'],
    description:'6mm thick natural rubber, non-slip alignment lines, moisture-wicking surface and carrying strap included. Eco-certified materials.',
    warrantyInformation:'2 Year Quality Guarantee', shippingInformation:'Ships in 1–2 days',
    returnPolicy:'30-day returns', minimumOrderQuantity:1, weight:1.8,
    dimensions:{width:183,height:61,depth:0.6}, reviews:[{},{},{},{}]
  },
  {
    id:111, title:'Ceramic Coffee Mug Set', price:36.00, discountPercentage:0,
    rating:4.3, stock:90, category:'home', brand:'BrewHouse',
    thumbnail:'https://placehold.co/400x300/f5f3ff/7c3aed?text=Mugs',
    images:['https://placehold.co/400x300/f5f3ff/7c3aed?text=Mugs'],
    description:'Set of 4 hand-glazed 350ml ceramic mugs. Dishwasher and microwave safe. Four muted earth-tone colour ways.',
    warrantyInformation:'Satisfaction Guaranteed', shippingInformation:'Ships in 2 days',
    returnPolicy:'30-day returns', minimumOrderQuantity:1, weight:1.2,
    dimensions:{width:25,height:10,depth:12}, reviews:[{},{}]
  },
  {
    id:112, title:'Smart Watch Series 8', price:329.99, discountPercentage:18,
    rating:4.8, stock:22, category:'electronics', brand:'ChronoTech',
    thumbnail:'https://placehold.co/400x300/e0e7ff/4338ca?text=Watch',
    images:['https://placehold.co/400x300/e0e7ff/4338ca?text=Watch','https://placehold.co/400x300/c7d2fe/3730a3?text=Strap'],
    description:'Always-on AMOLED display, ECG & blood-oxygen sensor, sleep tracking, GPS and 5-day battery life. Works with iOS and Android.',
    warrantyInformation:'2 Year International Warranty', shippingInformation:'Ships in 1 day',
    returnPolicy:'30-day returns', minimumOrderQuantity:1, weight:0.045,
    dimensions:{width:4.4,height:3.8,depth:1.05}, reviews:[{},{},{},{},{},{}]
  },
];

menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('open');
});
overlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('open');
});

function initRouter() {
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navigateTo(link.dataset.page);
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    });
  });

  document.getElementById('btnGoProducts').addEventListener('click', () => navigateTo('products'));
}

function navigateTo(pageId) {
  currentPage = pageId;

  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    link.classList.toggle('active', link.dataset.page === pageId);
  });

  document.querySelectorAll('.page-section').forEach(section => {
    section.classList.toggle('active', section.id === `page-${pageId}`);
  });

  searchInput.placeholder = pageId === 'products'
    ? 'Search products by name…'
    : 'Search products…';
}

async function fetchProducts() {
  showLoading(true);
  errorState.style.display = 'none';
  clearCards();

  try {
    const res = await fetch('https://dummyjson.com/products?limit=20');
    if (!res.ok) throw new Error('Bad response');
    const data = await res.json();
    allProducts = data.products || [];
  } catch {
    allProducts = FALLBACK;
  }

  showLoading(false);
  populateCategories();
  updateStats();
  renderDashboard();
  renderProducts();

  document.getElementById('productsBadge').textContent = allProducts.length;
}

function showLoading(on) {
  loading.style.display = on ? 'flex' : 'none';
}

function clearCards() {
  Array.from(grid.querySelectorAll('.product-card')).forEach(el => el.remove());
}

function updateStats() {
  const inStock  = allProducts.filter(p => p.stock > 10).length;
  const lowStock = allProducts.filter(p => p.stock > 0 && p.stock <= 10).length;
  const avg      = allProducts.reduce((s, p) => s + p.price, 0) / (allProducts.length || 1);

  document.getElementById('statTotal').textContent    = allProducts.length;
  document.getElementById('statInStock').textContent  = inStock;
  document.getElementById('statLow').textContent      = lowStock;
  document.getElementById('statAvgPrice').textContent = '$' + avg.toFixed(0);
}

function renderDashboard() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  document.getElementById('dashGreeting').textContent = `${greeting}, Favour 👋`;
  document.getElementById('dashDate').textContent = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  renderCategoryBars();
  renderTopRated();
  renderStockAlerts();
}

function renderCategoryBars() {
  const counts = {};
  allProducts.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });
  const sorted  = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const maxCount = sorted[0]?.[1] || 1;

  document.getElementById('categoryBars').innerHTML = sorted.map(([cat, n]) => `
    <div class="cat-bar-item">
      <div class="cat-bar-label">
        <span>${formatCategory(cat)}</span>
        <span>${n} item${n !== 1 ? 's' : ''}</span>
      </div>
      <div class="cat-bar-track">
        <div class="cat-bar-fill" style="width:${(n / maxCount * 100).toFixed(1)}%"></div>
      </div>
    </div>`).join('');
}

function renderTopRated() {
  const top = [...allProducts].sort((a, b) => b.rating - a.rating).slice(0, 6);
  const container = document.getElementById('topRatedList');

  container.innerHTML = top.map(p => `
    <div class="top-rated-item" data-id="${p.id}">
      <img class="top-rated-img" src="${p.thumbnail}" alt="${escHtml(p.title)}"
           onerror="this.src='https://placehold.co/44x44/f1f5f9/94a3b8?text=?'" />
      <div class="top-rated-info">
        <div class="top-rated-name">${escHtml(p.title)}</div>
        <div class="top-rated-meta">
          <span style="color:#f59e0b">${renderStars(p.rating)}</span>
          ${p.rating.toFixed(1)}
        </div>
      </div>
      <div class="top-rated-price">$${p.price.toFixed(2)}</div>
    </div>`).join('');

  container.querySelectorAll('.top-rated-item').forEach(item => {
    item.addEventListener('click', () => {
      const p = allProducts.find(x => x.id === +item.dataset.id);
      if (p) openModal(p);
    });
  });
}

function renderStockAlerts() {
  const alerts    = allProducts.filter(p => p.stock <= 10).sort((a, b) => a.stock - b.stock);
  const chip      = document.getElementById('alertCount');
  const container = document.getElementById('stockAlerts');

  if (alerts.length) {
    chip.textContent  = `${alerts.length} alert${alerts.length !== 1 ? 's' : ''}`;
    chip.className    = 'alert-count-chip danger';
  } else {
    chip.textContent  = 'All clear';
    chip.className    = 'alert-count-chip safe';
  }

  if (!alerts.length) {
    container.innerHTML = `
      <div class="alert-empty">
        <div class="alert-empty-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <p>All products are well-stocked — nothing to action right now.</p>
      </div>`;
    return;
  }

  container.innerHTML = alerts.map(p => {
    const isOOS = p.stock === 0;
    return `
      <div class="alert-item ${isOOS ? '' : 'low-alert'}">
        <img class="alert-thumb" src="${p.thumbnail}" alt=""
             onerror="this.src='https://placehold.co/44x44/f1f5f9/94a3b8?text=?'" />
        <div class="alert-info">
          <div class="alert-name">${escHtml(p.title)}</div>
          <div class="alert-stock-txt">${isOOS ? 'No units remaining — restock needed' : `Only ${p.stock} unit${p.stock !== 1 ? 's' : ''} remaining`}</div>
        </div>
        <span class="stock-badge ${isOOS ? 'out-stock' : 'low-stock'}">${isOOS ? 'Out of Stock' : 'Low Stock'}</span>
        <button class="alert-view-btn" data-id="${p.id}">View Details</button>
      </div>`;
  }).join('');

  container.querySelectorAll('.alert-view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = allProducts.find(x => x.id === +btn.dataset.id);
      if (p) openModal(p);
    });
  });
}

function populateCategories() {
  const cats = [...new Set(allProducts.map(p => p.category))].sort();
  catFilter.innerHTML = '<option value="">All Categories</option>';
  cats.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = formatCategory(c);
    catFilter.appendChild(opt);
  });
}

function getFiltered() {
  const q   = searchInput.value.trim().toLowerCase();
  const cat = catFilter.value;
  return allProducts.filter(p => {
    const matchQ   = !q   || p.title.toLowerCase().includes(q);
    const matchCat = !cat || p.category === cat;
    return matchQ && matchCat;
  });
}

function renderProducts() {
  clearCards();
  const filtered = getFiltered();

  resultsCount.textContent = filtered.length
    ? `${filtered.length} product${filtered.length !== 1 ? 's' : ''}`
    : '';

  if (!filtered.length) {
    emptyState.style.display = 'flex';
    return;
  }
  emptyState.style.display = 'none';
  filtered.forEach(p => grid.appendChild(buildCard(p)));
}

function buildCard(p) {
  const originalPrice = p.discountPercentage > 0
    ? (p.price / (1 - p.discountPercentage / 100)).toFixed(2)
    : null;

  const { label: stockLabel, cls: stockCls } = stockInfo(p.stock);

  const card = document.createElement('div');
  card.className = 'product-card';

  card.innerHTML = `
    <div class="card-img-wrap">
      <img src="${p.thumbnail}" alt="${escHtml(p.title)}" loading="lazy"
           onerror="this.src='https://placehold.co/400x300/f1f5f9/94a3b8?text=No+Image'" />
      ${p.discountPercentage > 0 ? `<span class="card-discount">-${Math.round(p.discountPercentage)}%</span>` : ''}
    </div>
    <div class="card-body">
      <span class="card-category">${formatCategory(p.category)}</span>
      <p class="card-title">${escHtml(p.title)}</p>
      <div class="card-price-row">
        <span class="card-price">$${p.price.toFixed(2)}</span>
        ${originalPrice ? `<span class="card-original">$${originalPrice}</span>` : ''}
      </div>
      <div class="card-rating">
        <span class="stars">${renderStars(p.rating)}</span>
        <span>${p.rating.toFixed(1)}</span>
      </div>
    </div>
    <div class="card-footer">
      <span class="stock-badge ${stockCls}">${stockLabel}</span>
      <button class="btn-details" data-id="${p.id}">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        See Details
      </button>
    </div>`;

  card.querySelector('.btn-details').addEventListener('click', () => openModal(p));
  return card;
}

function openModal(p) {
  const mainImg = document.getElementById('modalImg');

  mainImg.src = p.thumbnail;
  mainImg.alt = p.title;
  mainImg.onerror = () => { mainImg.src = 'https://placehold.co/400x400/f1f5f9/94a3b8?text=No+Image'; };

  const thumbsEl = document.getElementById('modalThumbs');
  const images   = Array.isArray(p.images) && p.images.length ? p.images : [p.thumbnail];

  thumbsEl.innerHTML = images.slice(0, 6).map((src, i) =>
    `<img class="modal-thumb ${i === 0 ? 'active' : ''}" src="${src}" alt="Image ${i + 1}"
          onerror="this.style.display='none'" />`
  ).join('');

  thumbsEl.querySelectorAll('.modal-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      mainImg.style.opacity = '0.4';
      mainImg.src = thumb.src;
      mainImg.onload = () => { mainImg.style.opacity = '1'; };
      thumbsEl.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });

  const discBadge = document.getElementById('modalDiscount');
  if (p.discountPercentage > 0) {
    discBadge.textContent = `-${Math.round(p.discountPercentage)}%`;
    discBadge.style.display = 'block';
  } else {
    discBadge.style.display = 'none';
  }

  document.getElementById('modalCategory').textContent = formatCategory(p.category);

  const brandEl = document.getElementById('modalBrand');
  if (p.brand) {
    brandEl.textContent  = p.brand;
    brandEl.style.display = 'inline-block';
  } else {
    brandEl.style.display = 'none';
  }

  document.getElementById('modalTitle').textContent = p.title;

  const reviewCount = p.reviews?.length ?? Math.round(p.rating * 17);
  document.getElementById('modalRatingRow').innerHTML = `
    <span class="modal-stars">${renderStars(p.rating)}</span>
    <span class="modal-rating-num">${p.rating.toFixed(1)}</span>
    <span class="modal-reviews">(${reviewCount} review${reviewCount !== 1 ? 's' : ''})</span>`;

  const originalPrice = p.discountPercentage > 0
    ? p.price / (1 - p.discountPercentage / 100)
    : null;
  const savings = originalPrice ? originalPrice - p.price : 0;

  document.getElementById('modalPriceBlock').innerHTML = `
    <span class="modal-price">$${p.price.toFixed(2)}</span>
    ${originalPrice ? `<span class="modal-price-original">$${originalPrice.toFixed(2)}</span>` : ''}
    ${savings > 0 ? `<span class="modal-savings">You save $${savings.toFixed(2)}</span>` : ''}`;

  document.getElementById('modalDesc').textContent =
    p.description || 'No description available for this product.';

  const maxForBar  = Math.max(p.stock, 100);
  const pct        = ((p.stock / maxForBar) * 100).toFixed(1);
  const fillClass  = p.stock === 0 ? 'fill-red' : p.stock <= 10 ? 'fill-yellow' : 'fill-green';
  const { label: stockLabel, cls: stockCls } = stockInfo(p.stock);

  document.getElementById('modalStockBlock').innerHTML = `
    <div class="modal-stock-wrap">
      <div class="modal-stock-header">
        <span class="modal-stock-label">Stock Level</span>
        <span class="stock-badge ${stockCls}">${stockLabel}</span>
      </div>
      <div class="modal-stock-track">
        <div class="modal-stock-fill ${fillClass}" style="width:${pct}%"></div>
      </div>
      <span class="modal-stock-units">
        ${p.stock === 0 ? 'Currently out of stock' : `${p.stock} unit${p.stock !== 1 ? 's' : ''} available`}
      </span>
    </div>`;

  const specs = [];
  if (p.brand)                specs.push(['Brand',      p.brand]);
  if (p.sku)                  specs.push(['SKU',        p.sku]);
  if (p.weight)               specs.push(['Weight',     `${p.weight} kg`]);
  if (p.dimensions)           specs.push(['Dimensions', `${p.dimensions.width} × ${p.dimensions.height} × ${p.dimensions.depth} cm`]);
  if (p.warrantyInformation)  specs.push(['Warranty',   p.warrantyInformation]);
  if (p.shippingInformation)  specs.push(['Shipping',   p.shippingInformation]);
  if (p.returnPolicy)         specs.push(['Returns',    p.returnPolicy]);
  if (p.minimumOrderQuantity) specs.push(['Min. Order', `${p.minimumOrderQuantity} unit${p.minimumOrderQuantity !== 1 ? 's' : ''}`]);

  document.getElementById('modalSpecs').innerHTML = specs.length
    ? specs.map(([label, val]) => `
        <div class="spec-item">
          <div class="spec-label">${label}</div>
          <div class="spec-val">${escHtml(String(val))}</div>
        </div>`).join('')
    : '';

  modalBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalBackdrop.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('modalClose').addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', e => { if (e.target === modalBackdrop) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

let debounceTimer;
searchInput.addEventListener('input', () => {
  if (currentPage !== 'products') navigateTo('products');
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(renderProducts, 220);
});

catFilter.addEventListener('change', renderProducts);

clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  catFilter.value   = '';
  renderProducts();
});

retryBtn.addEventListener('click', fetchProducts);

function stockInfo(stock) {
  if (stock === 0)  return { label: 'Out of Stock', cls: 'out-stock' };
  if (stock <= 10)  return { label: `Low — ${stock} left`, cls: 'low-stock' };
  return { label: 'In Stock', cls: 'in-stock' };
}

function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function formatCategory(c) {
  return (c || '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

initRouter();
fetchProducts();
