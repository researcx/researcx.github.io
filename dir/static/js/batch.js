const batchSize=200;let currentBatch=0;let isLoading=false;let allLoaded=false;function handleGlobalHover(parentEl){const exifContainer=parentEl.querySelector('.exif-info');if(!exifContainer)return;const content=exifContainer.querySelector('.exif-content');if(!content)return;const isActuallyOverflowing=content.scrollWidth>(exifContainer.offsetWidth+2);if(isActuallyOverflowing){exifContainer.classList.add('is-overflowing');}else{exifContainer.classList.remove('is-overflowing');}}
function resetOverflow(parentEl){const exifContainer=parentEl.querySelector('.exif-info');if(exifContainer){exifContainer.classList.remove('is-overflowing');}}
function createScrollableExif(item){if(item.shutter){let content=``;content+=`<span><i class="fa-solid fa-stopwatch"></i> ${item.shutter}</span>`;if(item.aperture)content+=`<span><i class="fa-solid fa-circle-dot"></i> ${item.aperture}</span>`;if(item.iso)content+=`<span>${item.iso}</span>`;}else{return``;}
return`
        <div class="exif-info" onmouseenter="checkOverflow(this)">
            <div class="exif-scroll-track">
                <div class="exif-content">${content}</div>
                <div class="exif-content">${content}</div>
            </div>
        </div>`;}
function checkOverflow(el){const track=el.querySelector('.exif-content');const container=el;if(track.offsetWidth>container.offsetWidth){el.classList.add('is-overflowing');}else{el.classList.remove('is-overflowing');}}
function createBatch(startIndex){const batch=document.createElement('div');batch.classList.add('panel-images');const slice=images.slice(startIndex,startIndex+batchSize);slice.forEach((item)=>{const previewSrc=`${item.url}-512${item.fext}`;const originalSrc=item.isVideo?item.isVideo:`${item.url}-2048${item.fext}`;const thumbSrc=`${item.url}-150${item.fext}`;const div=document.createElement('div');div.classList.add('image','item');div.addEventListener('mouseenter',function(){handleGlobalHover(this);});div.addEventListener('mouseleave',function(){resetOverflow(this);});mediaData=``
if(item.isVideo){mediaData=`
                <a href="${item.isVideo}" target="_blank">
                    <div class="imgbox">
                        <video src="${item.isVideo}" poster="${thumbSrc}" class="image-embed" controls preload="none" width="160" height="160"></video>
                    </div>
                    <div class="imgbox-full">
                        <video src="${item.isVideo}" poster="${thumbSrc}" class="image-embed" controls preload="none"></video>
                    </div>
                </a>
            `;}else{mediaData=`
                <a href="${originalSrc}" target="_blank">
                    <div class="imgbox">
                        <img src="${thumbSrc}" width="160" height="160" alt="">
                    </div>
                    <div class="imgbox-full">
                        <img class="image-embed" src="${previewSrc}" alt="">
                    </div>
                </a>
            `;}
if(!item.isVideo){mediaData+=`<div class="image-meta" title="${item.fname}">
            <div class="meta-left">
                    <span class="image-title">
                        <i class="fa-regular fa-file-image"></i> <span class="filename">${item.fname}</span>
                    </span>`;if(item.isPhoto=="True"){if(item.shutter){let tags=``
tags+=`<span><i class="fa-solid fa-stopwatch"></i> ${item.shutter}</span>`;if(item.aperture)tags+=`<span><i class="fa-solid fa-circle-dot"></i> ${item.aperture}</span>`;if(item.iso)tags+=`<span>${item.iso}</span>`;mediaData+=`
                        <div class="exif-info">
                            <div class="exif-scroll-track">
                                <div class="exif-content">${tags}</div>
                                <div class="exif-content duplicate-content">${tags}</div>
                            </div>
                        </div>`;}
mediaData+=`</div>`
mediaData+=`<a href="https://linktr.ee/researcx" target="_blank" class="buy-button" title="Buy original image">
                                    <i class="fa-solid fa-cart-shopping"></i> Buy
                            </a>`;}}
mediaData+=`</div>`;div.innerHTML=mediaData;const img=div.querySelector('.imgbox-full .image-embed');if(img&&img.tagName==='IMG'){if(img.complete){img.classList.add('loaded');}else{img.addEventListener('load',()=>img.classList.add('loaded'));}}
batch.appendChild(div);});return batch;}
function loadNextBatch(){if(isLoading||allLoaded)return;const startIndex=currentBatch*batchSize;if(startIndex>=images.length){allLoaded=true;observer.disconnect();return;}
isLoading=true;const batch=createBatch(startIndex);document.getElementById('gallery-container').appendChild(batch);applyImageMode(currentMode);currentBatch++;isLoading=false;}
const sentinel=document.getElementById('sentinel');if(sentinel){const observer=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){loadNextBatch();}});},{rootMargin:'400px'});observer.observe(sentinel);}else{console.error('Sentinel element not found!');}
loadNextBatch();