(function () {
    var HERO = "Stop Letting People & Situations Control How You Feel.";
    var PROBLEMS = [
        {
            title: "“I don’t understand what I’m feeling.”",
            quote: "You feel emotionally confused, stuck, or overwhelmed and don’t know what’s really going on inside.",
            icon: "./images/icons/expression-problem.png",
            alt: "Expression Problem"
        },
        {
            title: "“I don’t feel good enough.”",
            quote: "You often question yourself, fear judgment and feel like you’re not enough no matter what you do.",
            icon: "./images/icons/self-doubt-problem.png",
            alt: "Self-Doubt Problem"
        },
        {
            title: "“I can’t let go.”",
            quote: "You’re holding on to past experiences, emotions or people that still affect your present.",
            icon: "./images/icons/holding-on-problem.png",
            alt: "Holding-On Problem"
        },
        {
            title: "“I don’t know who I am anymore.”",
            quote: "You feel lost, unsure about your direction and disconnected from your true self.",
            icon: "./images/icons/identity-problem.png",
            alt: "Identity Problem"
        },
        {
            title: "“I don’t feel connected.”",
            quote: "You feel alone, even when surrounded by people, and find it difficult to build or maintain meaningful connections.",
            icon: "./images/icons/loneliness-problem.png",
            alt: "Loneliness Problem"
        }
    ];
    var TESTIMONIAL = {
        name: "K. Jithendra Sai Kumar",
        role: "Civil Quality & HSE, Amara raja Infra Pvt Ltd, Age-25",
        quote: "\"I attended Nikhil’s EASE session two months ago, and it gave me valuable insights into handling real-life challenges. I started trying to implement what I learned from the session in my daily life and became more aware of my thoughts, emotions, and the way my mind responds to different situations. The session helped me understand myself better and encouraged me to approach life with greater awareness and understanding.\"",
        photo: "./images/testimonials/k-jithendra-sai-kumar.jpg",
        photoFallback: "./images/testimonials/k-jithendra-sai-kumar.svg"
    };
    function setText(el, value) {
        if (!el) return;
        if (el.textContent.replace(/\s+/g, " ").trim() !== value) el.textContent = value;
    }

    function applyHero() {
        document.querySelectorAll(".framer-46tpku h3, .framer-46tpku .framer-text").forEach(function (el) {
            setText(el, HERO);
        });
    }

    function applyProblems() {
        var cards = document.querySelectorAll('[data-framer-name="Single Faq"]');
        if (!cards.length) return;
        PROBLEMS.forEach(function (item, i) {
            var card = cards[i];
            if (!card && cards[0] && cards[0].parentNode) {
                card = cards[0].cloneNode(true);
                card.classList.add("nce-problem-05");
                card.removeAttribute("data-framer-appear-id");
                cards[0].parentNode.appendChild(card);
                cards = document.querySelectorAll('[data-framer-name="Single Faq"]');
                card = cards[i];
            }
            if (!card) return;
            var h = card.querySelector("h4");
            var p = card.querySelector("p");
            setText(h, item.title);
            setText(p, item.quote);
            var iconWrap = card.querySelector("[data-framer-background-image-wrapper='true']");
            if (!iconWrap) return;
            iconWrap.querySelectorAll("svg.nce-problem-icon").forEach(function (el) { el.remove(); });
            iconWrap.querySelectorAll("img").forEach(function (img) {
                if (!img.classList.contains("nce-problem-icon")) img.style.display = "none";
            });
            var asset = iconWrap.querySelector("img.nce-problem-icon");
            if (!asset) {
                asset = document.createElement("img");
                asset.className = "nce-problem-icon";
                asset.decoding = "async";
                iconWrap.appendChild(asset);
            }
            asset.alt = item.alt || "";
            if (asset.getAttribute("src") !== item.icon) asset.setAttribute("src", item.icon);
        });
        Array.prototype.forEach.call(cards, function (card, i) {
            if (i >= PROBLEMS.length) card.remove();
        });
    }

    function removeSpots() {
        document.querySelectorAll(".framer-124us7i").forEach(function (el) {
            el.remove();
        });
    }

    function applyCoachCard() {
        document.querySelectorAll(".framer-ybovhd .framer-text, .framer-ybovhd h1").forEach(function (el) {
            var t = el.textContent.replace(/\s+/g, " ").trim();
            if (/ICBI/i.test(t)) setText(el, t.replace(/ICBI\s*/i, "").trim());
        });
    }

    function applyRRRIcons() {
        document.querySelectorAll(".framer-7k9c3y [data-nce-sid='110jmnc']").forEach(function (card) {
            card.querySelectorAll(".framer-ow3852 img").forEach(function (img) {
                img.style.display = "block";
            });
            card.querySelectorAll(".framer-ow3852 .nce-rrr-icon").forEach(function (el) {
                el.remove();
            });
        });
    }

    function fillTestimonialCard(root) {
        if (!root) return;
        setText(root.querySelector(".framer-tdlmu7 p"), TESTIMONIAL.quote);
        setText(root.querySelector(".framer-1t8zf9t p"), TESTIMONIAL.name);
        setText(root.querySelector(".framer-1fg67l5 p"), TESTIMONIAL.role);
        var photoEl = root.querySelector(".framer-1xaw4ro img");
        if (!photoEl) return;
        photoEl.setAttribute("alt", TESTIMONIAL.name);
        function usePhotoFallback() {
            photoEl.dataset.ncePhotoFailed = "1";
            if (photoEl.getAttribute("src") !== TESTIMONIAL.photoFallback) {
                photoEl.src = TESTIMONIAL.photoFallback;
            }
        }
        if (!photoEl.dataset.ncePhotoBound) {
            photoEl.dataset.ncePhotoBound = "1";
            photoEl.addEventListener("error", usePhotoFallback);
        }
        if (photoEl.dataset.ncePhotoFailed) {
            usePhotoFallback();
        } else if (photoEl.getAttribute("src") !== TESTIMONIAL.photo) {
            photoEl.setAttribute("src", TESTIMONIAL.photo);
        }
        if (photoEl.complete && photoEl.naturalWidth === 0 && photoEl.getAttribute("src") !== TESTIMONIAL.photoFallback) {
            usePhotoFallback();
        }
    }

    function uniqueTestimonialSlides(list) {
        var seen = {};
        var out = [];
        list.querySelectorAll(":scope > li").forEach(function (li) {
            var n = li.querySelector(".framer-1t8zf9t p");
            if (!n) return;
            var name = n.textContent.replace(/\s+/g, " ").trim();
            if (!name || seen[name]) return;
            seen[name] = true;
            out.push(li);
        });
        return out;
    }

    function ensureJithendraSlide(list) {
        var found = null;
        list.querySelectorAll(".framer-UwP8R").forEach(function (card) {
            var n = card.querySelector(".framer-1t8zf9t p");
            if (n && /Jithendra/i.test(n.textContent)) {
                card.classList.add("nce-testimonial-jithendra");
                found = card.closest("li") || card.parentElement;
            }
        });
        if (found) {
            fillTestimonialCard(found.querySelector(".framer-UwP8R") || found);
            return found;
        }
        var donor = null;
        list.querySelectorAll(":scope > li").forEach(function (li) {
            if (!donor && li.querySelector(".framer-UwP8R")) donor = li;
        });
        if (!donor) return null;
        var clone = donor.cloneNode(true);
        clone.setAttribute("aria-hidden", "false");
        clone.querySelectorAll("[data-framer-appear-id]").forEach(function (el) {
            el.removeAttribute("data-framer-appear-id");
        });
        var wrap = clone.querySelector(":scope > div");
        if (wrap) {
            wrap.classList.add("nce-jithendra-slide");
            wrap.style.visibility = "visible";
            wrap.style.opacity = "1";
        }
        var card = clone.querySelector(".framer-UwP8R");
        if (card) card.classList.add("nce-testimonial-jithendra");
        fillTestimonialCard(clone);
        list.appendChild(clone);
        return clone;
    }

    function sizeStoryViewport(section) {
        var track = section.querySelector(".nce-story-track");
        if (!track) return;
        var idx = parseInt(track.dataset.nceIdx || section._nceSlideIdx || "0", 10) || 0;
        var slide = track.children[idx];
        if (!slide) return;
        var card = slide.querySelector(".framer-UwP8R") || slide;
        card.style.height = "auto";
        var arrowPad = 88;
        var h = Math.ceil(card.scrollHeight || 0) + arrowPad;
        var minH = window.matchMedia("(max-width: 767.98px)").matches ? 637 : 473;
        if (h < minH) h = minH;
        var viewport = section.querySelector(".framer-1035v0p-container, .framer-jqk7fg-container");
        if (viewport) {
            viewport.style.height = h + "px";
            viewport.style.minHeight = h + "px";
        }
        var slideshow = viewport && viewport.querySelector(":scope > section");
        if (slideshow) {
            slideshow.style.height = h + "px";
            slideshow.style.maxHeight = "none";
        }
        var clip = track.parentElement;
        if (clip) {
            clip.style.height = h + "px";
            clip.style.overflow = "hidden";
        }
        track.style.height = h + "px";
        Array.prototype.forEach.call(track.children, function (el) {
            el.style.height = "auto";
            el.style.minHeight = h + "px";
        });
        var arrows = section.querySelector(".framer--slideshow-controls > div");
        if (arrows) {
            arrows.style.top = "unset";
            arrows.style.bottom = "12px";
        }
    }

    function goToStorySlide(section, idx) {
        var track = section.querySelector(".nce-story-track");
        if (!track || !track.children.length) return;
        var n = track.children.length;
        var next = ((idx % n) + n) % n;
        section._nceSlideIdx = next;
        track.dataset.nceIdx = String(next);
        track.style.transform = "translateX(" + (-next * 100) + "%)";
        sizeStoryViewport(section);
    }

    function buildStoryTrack(section) {
        var list = section.querySelector("ul");
        if (!list) return;
        ensureJithendraSlide(list);
        var uniques = uniqueTestimonialSlides(list);
        if (uniques.length < 4) return;
        var viewport = list.parentElement;
        if (!viewport) return;
        var track = section.querySelector(".nce-story-track");
        if (track && track.isConnected && track.children.length >= 4) {
            fillTestimonialCard(track.querySelector(".nce-testimonial-jithendra"));
            sizeStoryViewport(section);
            return;
        }
        if (track && track.parentNode) track.parentNode.removeChild(track);
        track = document.createElement("div");
        track.className = "nce-story-track";
        track.dataset.nceIdx = String(section._nceSlideIdx || 0);
        track.style.cssText = "position:absolute;inset:0;z-index:2;display:flex;height:100%;width:100%;margin:0;padding:0;transition:transform .45s ease;will-change:transform;";
        uniques.forEach(function (li) {
            var src = li.querySelector(":scope > div") || li;
            var slide = src.cloneNode(true);
            slide.classList.add("nce-story-slide");
            slide.style.flex = "0 0 100%";
            slide.style.width = "100%";
            slide.style.maxWidth = "100%";
            slide.style.height = "auto";
            slide.style.visibility = "visible";
            slide.style.opacity = "1";
            slide.style.flexShrink = "0";
            track.appendChild(slide);
        });
        list.style.display = "none";
        list.setAttribute("aria-hidden", "true");
        viewport.appendChild(track);
        fillTestimonialCard(track.querySelector(".nce-testimonial-jithendra"));
        goToStorySlide(section, section._nceSlideIdx || 0);
        window.requestAnimationFrame(function () {
            sizeStoryViewport(section);
        });
    }

    function bindTestimonialSlider(section) {
        if (!section) return;
        if (!section.dataset.nceSliderBound) {
            section.dataset.nceSliderBound = "1";
            section._nceSlideIdx = section._nceSlideIdx || 0;
            section.addEventListener("click", function (e) {
                var btn = e.target.closest("button[aria-label='Next'], button[aria-label='Previous']");
                if (!btn || !section.contains(btn)) return;
                e.preventDefault();
                e.stopPropagation();
                if (e.stopImmediatePropagation) e.stopImmediatePropagation();
                var track = section.querySelector(".nce-story-track");
                if (!track || !track.children.length) return;
                var delta = /Next/i.test(btn.getAttribute("aria-label") || "") ? 1 : -1;
                goToStorySlide(section, (section._nceSlideIdx || 0) + delta);
            }, true);
        }
        if (!window.__nceStoryResizeBound) {
            window.__nceStoryResizeBound = "1";
            var resizeTimer = null;
            window.addEventListener("resize", function () {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function () {
                    applyTestimonial();
                }, 120);
            });
        }
    }

    function applyTestimonial() {
        var section = document.querySelector(".framer-16j44rp");
        if (!section) return;
        buildStoryTrack(section);
        bindTestimonialSlider(section);
    }

    function applyAll() {
        applyHero();
        applyProblems();
        removeSpots();
        applyCoachCard();
        applyRRRIcons();
        applyTestimonial();
    }

    applyAll();
    document.addEventListener("DOMContentLoaded", applyAll);
    window.addEventListener("load", applyAll);
    var n = 0;
    var t = setInterval(function () {
        applyAll();
        if (++n > 40) clearInterval(t);
    }, 500);
    // Keep testimonials stable after Framer remounts on breakpoint changes
    var storyWatch = setInterval(function () {
        var section = document.querySelector(".framer-16j44rp");
        if (!section) return;
        if (!section.querySelector(".nce-story-track")) applyTestimonial();
    }, 1500);
})();
