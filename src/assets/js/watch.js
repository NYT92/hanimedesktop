const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('v_id');

const dlbtn = document.getElementById('dlbtn');
const unorcen = document.getElementById('unorcen');
const title = document.getElementById('title');
const desc = document.getElementById('description');
const tags = document.getElementById('tags');
const ifr = document.getElementById('ifr');
const view = document.getElementById('views');
const img = document.getElementById('img');
const brand = document.getElementById('brand');
const update = document.getElementById('update');
const reldate = document.getElementById('reldate');

const ctndt = document.getElementById('ctndt');
ctndt.style.display = "none";

const tlt = document.querySelector('title');

$(document).ready(function () {
    $.ajax({
            url: `https://hani.nsdev.ml/getVideo/player?id=${id}`,
            type: "GET",
            dataType: "json",
            success: async function (data) {
                ifr.innerHTML = await data.iframe_api
                ctndt.style.display = "block";
            }
        })
    $.ajax({
        url: `https://hani.nsdev.ml/getInfo?id=${id}`,
        type: "GET",
        dataType: "json",
        success: async function (data) {
            tlt.innerHTML = await data.title;
            title.innerHTML = await data.title;
            desc.innerHTML = await data.description;
            view.innerHTML = "Views : " + await data.views;
            img.setAttribute("src", await data.poster);
            img.setAttribute("alt", await data.slug+"_srcImg");
            brand.innerHTML = "Brand : " + await data.info.brand;
            update.innerHTML = "Uploads Date : " + await data.info.uploaded_date;
            reldate.innerHTML = "Releases Date : " + await data.info.released_date;
            if (data.info.censored == true) {   
                const btn = document.createElement("a");
                btn.innerHTML = "Censored";
                btn.className = "btn btn-outline-danger";
                btn.href = "tags.html?t=censored&p=0";
                unorcen.appendChild(btn);
            } 
            else{
                const btn = document.createElement("a");
                btn.innerHTML = "Uncensored";
                btn.className = "btn btn-outline-success";
                btn.href = "tags.html?t=uncensored&p=0";
                unorcen.appendChild(btn);
            }
            dlbtn.innerHTML = `<a href="${await data.downloadURL}" target="_blank" class="btn btn-primary"><i class="fas fa-cloud-download-alt" style="padding-right: 10px;"></i>Download</a>`
            for (let i = 0; i < await data.tags.length; i++) {
                const tag = document.createElement("a");
                tag.innerHTML = `<a class="btn btn-outline-light my-1 mx-1" href="tags.html?t=${await data.tags[i]}&p=0">${data.tags[i]}</a>`;
                tag.style.textTransform = "uppercase";
                tags.appendChild(tag);
            }
        }
    })

})


