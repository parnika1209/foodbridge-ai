const listings = [
  { id: 1, donor: "Green Leaf Cafe", food: "Vegetable rice", quantity: 25, location: "Tambaram, Chennai", deadline: "Today, 6:30 PM", status: "available" },
  { id: 2, donor: "Campus Canteen", food: "Lemon rice", quantity: 40, location: "Chromepet, Chennai", deadline: "Today, 5:45 PM", status: "available" },
  { id: 3, donor: "Community Kitchen", food: "Chapati and dal", quantity: 55, location: "Pallavaram, Chennai", deadline: "Today, 7:00 PM", status: "requested" }
];
let nextId = 4;

const listRoot = document.getElementById("listings");
const filter = document.getElementById("filter");

function render() {
  const chosen = filter.value;
  const visible = listings.filter(item => chosen === "all" || item.status === chosen);
  listRoot.innerHTML = "";
  if (!visible.length) {
    listRoot.innerHTML = '<p class="muted">No listings in this category yet.</p>';
  }
  visible.forEach(item => {
    const card = document.createElement("article");
    card.className = "listing";
    const title = document.createElement("h3");
    title.textContent = item.food;
    const pill = document.createElement("span");
    pill.className = "pill" + (item.status === "requested" ? " requested" : "");
    pill.textContent = item.status === "available" ? "Available" : "Requested";
    const donor = document.createElement("p"); donor.textContent = "Donor: " + item.donor;
    const qty = document.createElement("p"); qty.textContent = "🍽 " + item.quantity + " meal portions";
    const loc = document.createElement("p"); loc.textContent = "📍 " + item.location;
    const deadline = document.createElement("p"); deadline.textContent = "Collect by: " + item.deadline;
    const btn = document.createElement("button");
    btn.textContent = item.status === "available" ? "Request pickup" : "Request submitted";
    btn.disabled = item.status !== "available";
    btn.addEventListener("click", () => {
      item.status = "requested";
      document.getElementById("requestsCount").textContent = String(Number(document.getElementById("requestsCount").textContent) + 1);
      render();
    });
    card.append(title, pill, donor, qty, loc, deadline, btn);
    listRoot.appendChild(card);
  });
  document.getElementById("foodCount").textContent = listings.filter(x => x.status === "available").length;
  document.getElementById("mealsCount").textContent = listings.reduce((sum, x) => sum + x.quantity, 0);
}

document.getElementById("foodForm").addEventListener("submit", event => {
  event.preventDefault();
  const donor = document.getElementById("donor").value.trim();
  const food = document.getElementById("food").value.trim();
  const quantity = Number(document.getElementById("quantity").value);
  const location = document.getElementById("location").value.trim();
  const rawDeadline = document.getElementById("deadline").value;
  if (!donor || !food || !location || !rawDeadline || quantity < 1) return;
  const date = new Date(rawDeadline);
  if (Number.isNaN(date.getTime())) return;
  listings.unshift({ id: nextId++, donor, food, quantity, location, deadline: date.toLocaleString(), status: "available" });
  document.getElementById("formMessage").textContent = "Food listing added to this demo!";
  event.target.reset();
  render();
});
filter.addEventListener("change", render);
render();
