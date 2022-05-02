const recent = document.getElementById('recent')
const newr = document.getElementById('newr')
const trend = document.getElementById('trend')
const content = document.getElementById('ctn')

content.style.display = 'none';

$(document).ready(function () {
    $.ajax({
        url: 'https://hani.nsdev.ml/getLanding/recent',
        type: 'GET',
        dataType: 'json',
        success: async function (data) {
            $('#ctn').show();
            for (let i = 0; i < data.results.length; i++) {
                const ctn = document.createElement('div');
                ctn.innerHTML = `
                <a class="md-a" href="watch.html?v_id=${await data.results[i].slug}">
                <div class="media-container">
                <img style="background: #ffffff;" src="${await data.results[i].cover_url}" alt="${await data.results[i].slug}_img"/>
                <p>${await data.results[i].name}</p>
                </div>
                </a>
                `
                recent.appendChild(ctn);
            }
        },
    })
    $.ajax({
        url: 'https://hani.nsdev.ml/getLanding/newest',
        type: 'GET',
        dataType: 'json',
        cache: false,
        success: async function (data) {
            for (let i = 0; i < data.results.length; i++) {
                const ctn = document.createElement('div');
                ctn.innerHTML = `
                <a class="md-a" href="watch.html?v_id=${await data.results[i].slug}">
                <div class="media-container">
                <img style="background: #ffffff;" src="${await data.results[i].cover_url}" alt="${await data.results[i].slug}_img" loading="lazy"/>
                <p>${await data.results[i].name}</p>
                </div>
                </a>
                `
                newr.appendChild(ctn);
            }
        },
    })
    $.ajax({
        url: 'https://hani.nsdev.ml/getLanding/trending',
        type: 'GET',
        dataType: 'json',
        cache: false,
        success: async function (data) {
            for (let i = 0; i < data.results.length; i++) {
                const ctn = document.createElement('div');
                ctn.innerHTML = `
                <a class="md-a" href="watch.html?v_id=${await data.results[i].slug}">
                <div class="media-container">
                <img style="background: #ffffff;" src="${await data.results[i].cover_url}" alt="${await data.results[i].slug}_img"/>
                <p>${data.results[i].name}</p>
                </div>
                </a>
                `
                trend.appendChild(ctn);
            }
        },
    })
})
