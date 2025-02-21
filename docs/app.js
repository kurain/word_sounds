const searchInput = document.getElementById("searchInput");
const wordList = document.getElementById("wordList");
const synth = window.speechSynthesis;

// 検索機能の実装
searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredWords = words.filter((item) =>
    item.word.toLowerCase().startsWith(searchTerm)
  );
  displayWords(filteredWords);
});

// 単語リストの表示
function displayWords(filteredWords) {
  wordList.innerHTML = "";
  filteredWords.forEach((item) => {
    const li = document.createElement("li");
    li.className = "word-item";
    li.textContent = item.word;
    li.addEventListener("click", () => speakWord(item.word));
    wordList.appendChild(li);
  });
}

// 発音機能の実装
function speakWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US";
  utterance.rate = 0.3;

  // iOS向けの音声設定
  const voices = synth.getVoices();
  const englishVoice = voices.find((voice) => voice.lang.includes("en"));

  if (englishVoice) {
    utterance.voice = englishVoice;
  }

  synth.speak(utterance);
}
