const urlParams = new URLSearchParams(window.location.search);
const t = urlParams.get('t');
const p = urlParams.get('p');

const tag = document.getElementById("tag");
const tgid = document.getElementById("tgid");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
prev.style.display = "none";
next.style.display = "none";

const tlt = document.querySelector('title');

$(document).ready(function () {
    $.ajax({
        url: `https://hani.nsdev.ml/browse/hentai-tags/${t}/${p}`,
        type: "GET",
        dataType: "json",
        success: async function (data) {
            tlt.innerHTML = "Tags : "+ t + " / " +"Page : " + p;
            prev.style.display = "block";
            next.style.display = "block";
            for (let i = 0; i < data.videos.length; i++) {
                let div = document.createElement('div');
                div.innerHTML += `
                <a class="md-a" href="watch.html?v_id=${await data.videos[i].slug}">
                    <div class="m-2 media-container">
                    <img src="${await data.videos[i].cover_url}" alt="${await data.videos[i].slug}_img" loading="lazy"/>
                    <p>${await data.videos[i].name}</p>
                </div>
                </a>
                `;
                tag.appendChild(div);
            }
            const pagination = document.getElementById("pagination");
            prev.addEventListener("click", function () {
                window.location.href = `tags.html?t=${t}&p=${parseInt(p) - 1}`;
            });
            next.addEventListener("click", function () {
                window.location.href = `tags.html?t=${t}&p=${parseInt(p) + 1}`;
            });
            if (parseInt(p) == "0") {
                prev.disabled = true;
            }
            if (parseInt(p) == await data.page) {
                next.disabled = true;
            }
            pagination.appendChild(prev);
            pagination.appendChild(next);

        },
        error: function () {
            console.log("error");
        }
    })
})