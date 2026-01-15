// ============================================
// Newsletter Signup → Telegram Channel
// ============================================

const NEWSLETTER_BOT_TOKEN = API_KEYS.telegramToken();
const NEWSLETTER_CHAT_ID  = API_KEYS.telegramChatID();

document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.getElementById("newsletter-email");
    const btn = document.getElementById("newsletter-button");

    if (!emailInput || !btn) return;

    btn.addEventListener("click", async () => {
        const email = emailInput.value.trim();

        if (!email) {
            alert("Please enter an email.");
            return;
        }

        const text =
            `📩 *New Newsletter Signup*\n\n` +
            `*Email:* ${email}`;

        const url = `https://api.telegram.org/bot${NEWSLETTER_BOT_TOKEN}/sendMessage`;

        try {
            await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: NEWSLETTER_CHAT_ID,
                    text: text,
                    parse_mode: "Markdown"
                }),
            });

            alert("Thanks! You are now subscribed.");
            emailInput.value = "";

        } catch (err) {
            console.error("Newsletter error:", err);
            alert("Could not subscribe. Please try again.");
        }
    });
});
