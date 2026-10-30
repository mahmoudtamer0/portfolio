const API_URL = import.meta.env.VITE_API_URL;

export const track = (type, meta = {}) => {
    if (localStorage.getItem("owner") || navigator.webdriver) return;

    const visitorId = localStorage.getItem("vid");
    if (!visitorId) return;

    fetch(`${API_URL}/visitors/event`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId, type, meta }),
        keepalive: true,
    }).catch(() => { });
};