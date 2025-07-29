const quotes = [
  "“Her dalga bir gün kıyıya ulaşır.”",
  "“Bugün hissettiğin fırtına, yarının güneşine yer açar.”",
  "“Derin nefes al, çünkü bu da geçecek.”",
  "“Senin gülüşün, dünyanın en güzel sabahı.”",
  "“Yalnız değilsin, seni düşünen biri var.”",
  "“İçinden gelen sesi duy: 'Geçecek.'”",
  "“Bazen en güzel şeyler, en sessiz anlarda gelir.”",
  "“Rüzgar bile sakinleştirir seni bazen.”",
  "“Kalbinin kıyısında hep bir deniz var unutma.”",
  "“Doğanın ritmi, iç sesinle aynı melodidedir.”",
  "“Güneş her sabah yeniden başlar, sen de öyle.”",
  "“Ağaçlar gibi sabırlı, dalgalar gibi güçlü ol.”",
  "“Denizin şarkısı yavaşça ruhunu sarar.”",
  "“Bir nefes al; içinden geçen fırtına dinecek.”",
  "“Ev bazen bir insanın sesi olur.”",
  "“Aile, sırtını dayayabileceğin görünmez bir dağdır.”",
  "“Kendini bırakman gerek bazen, tıpkı dalgalar gibi.”",
  "“Sakinlik, bazen en büyük zaferdir.”",
  "“Denize baktığında hissettiklerin, içinde hâlâ yaşıyor.”",
  "“Toprağa çıplak ayak basmak gibi biriyle konuşmak.”",
  "“Bazen sadece sessizlik iyi gelir.”",
  "“Uzakta olsalar da, aile her zaman seninledir hem unutma mertinde senin ailen.”",
  "“Sen iyiysen, dünya biraz daha huzurlu olur.”",
  "“Dalgalar seni alıp götürmez, seni kendine getirir.”",
  "“Güneş ışığına gözlerini kapatmak bile yeter bazen.”",
  "“Birinin seni düşündüğünü bilmek, her şeyi değiştirir.”"
];


window.onload = function () {
  const today = new Date().toLocaleDateString("tr-TR");
  document.getElementById("current-date").textContent = `📅 Bugünün Tarihi: ${today}`;
  showEntries();
};

function changeQuote() {
  const text = document.getElementById("quote-text");
  const random = Math.floor(Math.random() * quotes.length);
  text.textContent = quotes[random];
}

function saveEntry(editIndex = null) {
  const today = new Date().toLocaleDateString("tr-TR");
  const entryText = document.getElementById("entry").value.trim();
  const quoteText = document.getElementById("quote-text").textContent;

  if (entryText === "") {
    alert("Boş kayıt kaydedemezsin Ilayda Hanım 🌸");
    return;
  }

  let entries = JSON.parse(localStorage.getItem("ilayda-diary")) || [];

  if (editIndex !== null) {
    entries[editIndex] = { date: today, quote: quoteText, text: entryText };
  } else {
    entries.push({ date: today, quote: quoteText, text: entryText });
  }

  localStorage.setItem("ilayda-diary", JSON.stringify(entries));
  document.getElementById("entry").value = "";
  showEntries();
    alert("Kaydedildi 💙");

  const button = document.querySelector("button[onclick^='saveEntry']");
  button.setAttribute("onclick", `saveEntry()`);
  button.textContent = "Kaydet";
}

function showEntries() {
  const list = document.getElementById("entry-list");
  list.innerHTML = "";

  let entries = JSON.parse(localStorage.getItem("ilayda-diary")) || [];

  entries.forEach((entry, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>📅 ${entry.date}</strong><br>
      <em>💬 ${entry.quote}</em><br>
      📝 ${entry.text}<br>
      <button onclick="editEntry(${index})">✏️ Düzenle</button>
      <button onclick="deleteEntry(${index})">🗑️ Sil</button>
      <hr>
    `;
    list.appendChild(li);
  });
}

function deleteEntry(index) {
  if (confirm("Bu kaydı silmek istediğine emin misin su perisi?")) {
    let entries = JSON.parse(localStorage.getItem("ilayda-diary")) || [];
    entries.splice(index, 1);
    localStorage.setItem("ilayda-diary", JSON.stringify(entries));
    showEntries();
  }
}

function editEntry(index) {
  let entries = JSON.parse(localStorage.getItem("ilayda-diary")) || [];
  const entry = entries[index];
  document.getElementById("entry").value = entry.text;
  document.getElementById("quote-text").textContent = entry.quote;

  // Butona yeniden fonksiyon bağla
  const button = document.querySelector("button[onclick^='saveEntry']");
  button.setAttribute("onclick", `saveEntry(${index})`);
  button.textContent = "Güncelle";
}
