const form = document.getElementById('itemForm');
const itemList = document.getElementById('itemList');
const filterType = document.getElementById('filterType');

let items = JSON.parse(localStorage.getItem('items')) || [];

// Submit form
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const item = document.getElementById('item').value;
  const contact = document.getElementById('contact').value;
  const type = document.getElementById('type').value;
  const location = document.getElementById('location').value;
  const date = document.getElementById('date').value;
  const description = document.getElementById('description').value;

  const newItem = { name, item, contact, type, location, date, description };
  items.push(newItem);
  localStorage.setItem('items', JSON.stringify(items));
  form.reset();
  displayItems(items);
});

// Filter dropdown
filterType.addEventListener('change', function() {
  const selected = filterType.value;
  if (selected === "all") {
    displayItems(items);
  } else {
    const filtered = items.filter(i => i.type === selected);
    displayItems(filtered);
  }
});

// Remove item
function removeItem(index) {
  if (confirm("Are you sure you want to remove this entry?")) {
    items.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(items));
    displayItems(items);
  }
}

// Display items
function displayItems(data) {
  itemList.innerHTML = '';
  if (data.length === 0) {
    itemList.innerHTML = '<p>No reports found.</p>';
    return;
  }

  data.forEach((i, index) => {
    const div = document.createElement('div');
    div.className = 'item-card';
    div.innerHTML = `
      <h3>${i.item} (${i.type.toUpperCase()})</h3>
      <span><strong>Name:</strong> ${i.name}</span>
      <span><strong>Contact:</strong> ${i.contact}</span>
      <span><strong>Location:</strong> ${i.location}</span>
      <span><strong>Date:</strong> ${i.date}</span>
      <span><strong>Description:</strong> ${i.description}</span>
      <button onclick="removeItem(${index})">🗑️ Remove</button>
    `;
    itemList.appendChild(div);
  });
}

// Load on start
window.onload = () => displayItems(items);
