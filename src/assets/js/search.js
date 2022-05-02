const urlParams = new URLSearchParams(window.location.search);
const q = urlParams.get('q');

const col1 = document.getElementById("col1");
const hidres = document.getElementById("hidres");
hidres.style.display = "none";

document.getElementById("search").value = q;

$.ajax({
    url: `https://hani.nsdev.ml/search`,
    data: JSON.stringify({
        "search": q,
        "tags": [],
        "brands": [],
        "blacklist": [],
        "order_by": "desc",
        "ordering": "created_at_unix",
        "page": 0
    }),
    type: "POST",
    dataType: "json",
    success: async function (data) {
        for (let i = 0; i < data.results.length; i++) {
            let div = document.createElement("div");
            div.innerHTML = ` 
                <a class="md-a" href="watch.html?v_id=${data.results[i].slug}">    
                <div class="m-2 media-container">    
                    <img style="background: #ffffff;" loading="lazy" src="${await data.results[i].cover_url}" alt="${await data.results[i].slug}" />
                    <p>${await data.results[i].name}</p> 
                </div>
                </a>
                    `
            hidres.style.display = "block";
            col1.appendChild(div);
        }

    }
})
