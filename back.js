document.addEventListener("DOMContentLoaded", function() {
    const btn = document.createElement("button");
    btn.innerText = "⬅ Back";
    btn.style.position = "fixed";
    btn.style.top = "15px";
    btn.style.left = "15px";
    btn.style.padding = "8px 14px";
    btn.style.fontSize = "14px";
    btn.style.border = "none";
    btn.style.borderRadius = "6px";
    btn.style.background = "#111";
    btn.style.color = "white";
    btn.style.cursor = "pointer";
    btn.style.zIndex = "9999";
    btn.onmouseover = function(){ btn.style.background = "#333"; };
    btn.onmouseout = function(){ btn.style.background = "#111"; };

    btn.onclick = function() {
        if (document.referrer !== "") {
            window.history.back();
        } else {
            window.location.href = "home.html";
        }
    };

    document.body.appendChild(btn);
});
