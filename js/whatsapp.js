(function () {
    var PHONE = "917013421842";
    var CONNECT = "https://wa.me/" + PHONE + "?text=Hi%20Nikhil%2C%20I%27d%20like%20to%20connect%20with%20you.";
    var CALL = "https://wa.me/" + PHONE + "?text=Hi%20Nikhil%2C%20I%27d%20like%20to%20book%20a%20free%20clarity%20call.";


    function textOf(el) {
        return ((el && el.textContent) || "").replace(/\s+/g, " ").trim();
    }

    function match(el) {
        var a = el && el.closest ? el.closest("a") : null;
        if (!a) return null;

        var t = textOf(a);
        var href = a.getAttribute("href") || "";

        if (/Connect With Me/i.test(t)) return { a: a, url: CONNECT };
        if (/Get a FREE clarity call/i.test(t)) return { a: a, url: CALL };

        if (/wa\.me\/(?:91)?9703318999|api\.whatsapp\.com|919703318999/i.test(href)) {
            if (/connect/i.test(href)) return { a: a, url: CONNECT };
            return { a: a, url: CALL };
        }

        return null;
    }

    function apply() {
        document.querySelectorAll("a").forEach(function (a) {
            var hit = match(a);
            if (hit && a.getAttribute("href") !== hit.url) {
                a.setAttribute("href", hit.url);
            }
        });
    }

    function openHit(e) {
        var hit = match(e.target);
        if (!hit) return;

        hit.a.setAttribute("href", hit.url);
        e.preventDefault();
        e.stopPropagation();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        window.open(hit.url, "_blank", "noopener,noreferrer");
    }

    document.addEventListener("click", openHit, true);
    document.addEventListener("auxclick", openHit, true);
    document.addEventListener("keydown", function (e) {
        if (e.key === "Enter") openHit(e);
    }, true);

    var obs = new MutationObserver(apply);
    obs.observe(document.documentElement, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ["href"]
    });

    apply();
    document.addEventListener("DOMContentLoaded", apply);
    window.addEventListener("load", apply);

    var n = 0;
    var t = setInterval(function () {
        apply();
        if (++n > 40) clearInterval(t);
    }, 500);
})();
