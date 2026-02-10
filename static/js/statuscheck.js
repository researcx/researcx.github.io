var cachebuster = Math.round(new Date().getTime() / 1000);
var check_file = "static/files/thumbnails/Imagedump/7cbe510033142eb7943d5b21ca251759fee64292f9f4e86eda9fd4c793343621-150.png?v=" + cachebuster;
var sites = {"https://7ug46mpbiaurogeospr3vx5kh4ad7bkiduqv7nyvtlm5awkdsve2z7ad.tor.pm/": "false",
            "https://7ug46mpbiaurogeospr3vx5kh4ad7bkiduqv7nyvtlm5awkdsve2z7ad.onion.re/": "false",
            "https://7ug46mpbiaurogeospr3vx5kh4ad7bkiduqv7nyvtlm5awkdsve2z7ad.onion.pet/": "false",
            "http://7ug46mpbiaurogeospr3vx5kh4ad7bkiduqv7nyvtlm5awkdsve2z7ad.onion.ws/": "false",
            "http://7ug46mpbiaurogeospr3vx5kh4ad7bkiduqv7nyvtlm5awkdsve2z7ad.onion.to/": "false",
            "https://7ug46mpbiaurogeospr3vx5kh4ad7bkiduqv7nyvtlm5awkdsve2z7ad.onion.foundation/": "false"};
var archive = ["https://archive.is/newest/http://7ug46mpbiaurogeospr3vx5kh4ad7bkiduqv7nyvtlm5awkdsve2z7ad.onion/",
            "https://archive.today/newest/http://7ug46mpbiaurogeospr3vx5kh4ad7bkiduqv7nyvtlm5awkdsve2z7ad.onion/",
            "https://archive.ph/newest/http://7ug46mpbiaurogeospr3vx5kh4ad7bkiduqv7nyvtlm5awkdsve2z7ad.onion/",
            "https://archive.vn/newest/http://7ug46mpbiaurogeospr3vx5kh4ad7bkiduqv7nyvtlm5awkdsve2z7ad.onion/",
            "https://archive.fo/newest/http://7ug46mpbiaurogeospr3vx5kh4ad7bkiduqv7nyvtlm5awkdsve2z7ad.onion/",
            "https://archive.li/newest/http://7ug46mpbiaurogeospr3vx5kh4ad7bkiduqv7nyvtlm5awkdsve2z7ad.onion/",
            "https://archive.md/newest/http://7ug46mpbiaurogeospr3vx5kh4ad7bkiduqv7nyvtlm5awkdsve2z7ad.onion/"]
var checked = [];
var img = [];
var url = "";
let i = 0;

function checkAvailable(){
    for (var key in sites) {
        if (sites.hasOwnProperty(key)) {
            if (sites[key] == "true"){
                checked.push(key);
                const randomSite = checked[Math.floor(Math.random() * checked.length)];
                console.log("picked " + randomSite)
                url = randomSite
                window.frames['iframe1'].location=url
                document.getElementById('url').innerHTML = 'Loaded.';
            }
        }
    }
    if (checked.length == 0){
        const randomMirror = archive[Math.floor(Math.random() * archive.length)];
        var elem = '<meta http-equiv="Refresh" content="2; url=\''+ randomMirror +'\'" />Loading failed, redirecting...';
        document.getElementById('url').innerHTML = elem;
    }
}

function checkServerStatus(){
    setTimeout(function () {
        checkAvailable();
    }, 7000);

    for(let key of Object.keys(sites)) {
        if (sites.hasOwnProperty(key)) {
            console.log(key + " -> " + sites[key]);
            img[i] = document.createElement("img");
            img[i].onerror = function(){ sites[key] = "false";  console.log(key + " -> " + sites[key]);};
            img[i].onload = function(){  sites[key] = "true"; console.log(key + " -> " + sites[key]);};
            img[i].src = key + check_file;
            i++;
        }
    }
}
checkServerStatus();