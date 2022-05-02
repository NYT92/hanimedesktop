const col2 = document.getElementById("col2");

$(document).ready(function () {
    $.ajax({
        url: "https://hani.nsdev.ml/browse",
        type: "GET",
        dataType: "json",
        success: async function (data) {
            for (let i = 0; i < data.tags.length; i++) {
                let div = document.createElement('div');
                div.innerHTML += `
                <a class="md-a" href="tags.html?t=${await data.tags[i].text}&p=0">
                    <div>
                        <div class="media-container">
                        <img src="${await data.tags[i].tall_image_url}" alt="${await data.tags[i].text}_img" loading="lazy"/>
                        <p>${await data.tags[i].text}</p>
                    </div>
                </div>
                </a>
                `;
                col2.appendChild(div);
            }
        }
    })
})