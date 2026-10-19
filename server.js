const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(express.json());
app.use(cors());

// ضع مفتاح الـ API الخاص بك هنا
const ai = new GoogleGenAI({ apiKey: 'AQ.Ab8RN6KUzdhF1A9e2NpWqIb2DMas5nXDXDTYWDdSKiukhZ4eiA' });

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;

        // استخدام النموذج المحدث والثابت
        const response = await ai.models.generateContent({
            model: 'gemini-flash-latest',
            contents: message,
        });

        const replyText = response.text || response.candidates?.[0]?.content?.parts?.[0]?.text || "عذراً، لم أتمكن من جلب الرد.";

        res.json({ reply: replyText });
    } catch (error) {
        console.error("خطأ تفصيلي:", error);
        res.status(500).json({ error: error.message || 'حدث خطأ أثناء الاتصال' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});