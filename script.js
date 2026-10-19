async function sendMessage() {
    const inputField = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");
    const userText = inputField.value.trim();

    if (userText === "") return;

    // عرض رسالة المستخدم
    appendMessage(userText, "user-message");
    inputField.value = "";

    // رسالة مؤقتة أثناء الانتظار
    const loadingMessage = appendMessage("جاري التفكير...", "ai-message");

    try {
        // استدعاء واجهة الذكاء الاصطناعي (يمكنك ربطه بـ Backend خاص بك أو API مباشر)
        const response = await fetchAIResponse(userText);
        loadingMessage.innerText = response;
    } catch (error) {
        loadingMessage.innerText = "حدث خطأ أثناء الاتصال بالذكاء الاصطناعي.";
        console.error(error);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

function appendMessage(text, className) {
    const chatBox = document.getElementById("chatBox");
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${className}`;
    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return messageDiv;
}

// دالة محاكاة أو ربط بالـ API
async function fetchAIResponse(prompt) {
    /* 
       ملاحظة: لاستخدام نموذج حقيقي (مثل OpenAI أو Gemini)، 
       يُفضل إجراء الطلب من خلال خادم خلفي (Backend) لحماية مفتاح API الخاص بك.
    */
    
    // محاكاة استجابة بسيطة للتعليم
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`تم استلام سؤالك: "${prompt}". هذا رد تجريبي من الذكاء الاصطناعي.`);
        }, 1000);
    });
}