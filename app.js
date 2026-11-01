const verifiedAnswers = [
  {
    match: /website|web app|web application|build|develop|experience|background|role fit|web developer/i,
    answer: "The resume describes website development and maintenance across freelance and organizational roles, plus creating and testing web applications. It lists the current role as Web Developer and 7+ years of experience.",
    source: "EXPERIENCE · PROFILE"
  },
  {
    match: /performance|usability|feature|optimi[sz]/i,
    answer: "The resume says Faizan collaborated with development teams to improve features and optimize performance, and created and tested web applications for performance and usability.",
    source: "EXPERIENCE"
  },
  {
    match: /skill|technology|tool|stack|programming|code/i,
    answer: "Skills listed include front-end and back-end web development, software architecture, code structure, web performance optimization, Agile, source control, test-driven development, AI data annotation, LLM response evaluation, transcription, and technical documentation.",
    source: "SKILLS"
  },
  {
    match: /language|speak|english|hindi|tamil|gujarati|marathi|kannada|urdu/i,
    answer: "The resume lists English, Hindi, Tamil, Gujarati, Marathi, Kannada, and Urdu, with C2 proficiency listed for each.",
    source: "LANGUAGES"
  },
  {
    match: /education|degree|university|study|college/i,
    answer: "The resume lists a Bachelor of Computer Science in Software Engineering, dated 2018–2022.",
    source: "EDUCATION"
  },
  {
    match: /delloitte|hinduja|freelance|current role|current job|responsibilit|work history|employer/i,
    answer: "The experience section lists Web Developer at Delloitte Global Solutions (January 2023–present), Junior Web Developer at Hinduja Global Solutions (June 2021–December 2022), and Freelance Web Developer (January 2019–May 2021). See the timeline for details.",
    source: "EXPERIENCE"
  },
  {
    match: /annotation|llm|transcri|documentation|quality|ai /i,
    answer: "Across the listed roles, the resume includes AI data annotation, LLM response review or evaluation, transcription, quality verification, and documentation.",
    source: "EXPERIENCE · SKILLS"
  }
];

const refusal = "I don’t have verified information about that.";
const chatLog = document.querySelector("#chat-log");
const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");

function addMessage(text, kind, source = "") {
  const article = document.createElement("article");
  article.className = `message ${kind}-message`;
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  article.append(paragraph);
  if (source) {
    const label = document.createElement("span");
    label.className = "message-source";
    label.textContent = `SOURCE: ${source}`;
    article.append(label);
  }
  chatLog.append(article);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function answerFor(question) {
  const normalized = question.trim();
  if (!normalized || normalized.length > 300) return refusal;
  const unsafeOrPrivate = /ignore (all |any )?(previous|prior|your)|system prompt|reveal.*prompt|home address|phone number|email address|salary|relocat|how old|date of birth|confirm.*(10|ten) years/i;
  if (unsafeOrPrivate.test(normalized)) return refusal;
  const answer = verifiedAnswers.find((item) => item.match.test(normalized));
  return answer || null;
}

function submitQuestion(question) {
  const clean = question.trim();
  if (!clean) return;
  addMessage(clean, "user");
  const result = answerFor(clean);
  if (result) {
    addMessage(typeof result === "string" ? result : result.answer, "assistant", typeof result === "string" ? "" : result.source);
  } else {
    addMessage(refusal, "assistant", "");
  }
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  submitQuestion(chatInput.value);
  chatInput.value = "";
});

document.querySelectorAll("[data-question]").forEach((button) => {
  button.addEventListener("click", () => submitQuestion(button.dataset.question));
});
