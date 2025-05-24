let currentLesson = 0;
let userName = "";
let score = 0;

const lessons = [
  "الدرس 1: مقدمة في التعلم الذاتي.",
  "الدرس 2: تحديد الأهداف الشخصية.",
  "الدرس 3: التخطيط الأسبوعي.",
  "الدرس 4: متابعة التقدّم.",
  "الدرس 5: التغلب على المشتتات.",
  "الدرس 6: استراتيجيات التلخيص.",
  "الدرس 7: أدوات رقمية للتنظيم.",
  "الدرس 8: تقييم الأداء والتحسين."
];

const quiz = [
  {
    q: "ما أهمية تحديد الأهداف؟",
    options: ["يساعد في التركيز", "يزيد من الفوضى", "لا تأثير له"],
    answer: 0
  },
  {
    q: "ما الأداة المناسبة للتخطيط؟",
    options: ["دفتر ملاحظات", "لا شيء", "الهاتف فقط"],
    answer: 0
  }
];

function startLessons() {
  const input = document.getElementById("userName").value.trim();
  if (input === "") {
    alert("يرجى إدخال الاسم");
    return;
  }
  userName = input;
  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("lessonScreen").classList.remove("hidden");
  document.getElementById("welcomeName").textContent = "مرحبًا، " + userName;
  showLesson();
}

function showLesson() {
  const lessonContent = document.getElementById("lessonContent");
  lessonContent.textContent = lessons[currentLesson];
  updateProgress();
}

function nextLesson() {
  currentLesson++;
  if (currentLesson < lessons.length) {
    showLesson();
  } else {
    document.getElementById("lessonScreen").classList.add("hidden");
    showQuiz();
  }
}

function updateProgress() {
  const percent = ((currentLesson + 1) / lessons.length) * 100;
  document.getElementById("progress").style.width = percent + "%";
}

function showQuiz() {
  document.getElementById("quizScreen").classList.remove("hidden");
  const quizContent = document.getElementById("quizContent");
  quizContent.innerHTML = "";
  quiz.forEach((q, i) => {
    const div = document.createElement("div");
    div.innerHTML = `<p>${q.q}</p>` + q.options.map((opt, j) =>
      `<label><input type="radio" name="q${i}" value="${j}"> ${opt}</label><br>`
    ).join("");
    quizContent.appendChild(div);
  });
}

function submitQuiz() {
  score = 0;
  quiz.forEach((q, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (selected && parseInt(selected.value) === q.answer) {
      score++;
    }
  });
  document.getElementById("quizScreen").classList.add("hidden");
  document.getElementById("resultScreen").classList.remove("hidden");
  document.getElementById("resultText").textContent = 
    `أحسنت يا ${userName}! نتيجتك ${score} من ${quiz.length}`;
}
