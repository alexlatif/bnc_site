const TELEGRAM_TOKEN = API_KEYS.telegramToken();
const TELEGRAM_CHAT_ID = API_KEYS.telegramChatID();

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const name    = document.getElementById("name").value;
        const email   = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;

        const text =
            `📩 *New Contact Message*\n\n` +
            `👤 *Name:* ${name}\n` +
            `📧 *Email:* ${email}\n` +
            `🏷 *Subject:* ${subject}\n\n` +
            `💬 *Message:*\n${message}`;

        const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

        try {
            await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: text,
                    parse_mode: "Markdown"
                }),
            });

            alert("Thank you — your message has been sent!");
            form.reset();

        } catch (err) {
            console.error("Telegram send error:", err);
            alert("Error sending message. Please try again.");
        }
    });
});
