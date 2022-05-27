import defaultImgUrl from "@/assets/default.gif";
import {debounde} from "@/utils";
import eventBus from "@/eventBus";
let imgs = [];
function setImg(img) {
  img.dom.src= defaultImgUrl;
  const clientheihgt = document.documentElement.clientHeight;
  const rect = img.dom.getBoundingClientRect();
  const height = 100 || rect.height
  if(rect.top >= -height && rect.top <= clientheihgt) {
      img.dom.src = img.src;
  }
  imgs = imgs.filter(i => i !== img)
}
function setImages() {
  imgs.forEach(img => {
    setImg(img)
  })
}
function handleScroll(dom) {
  setImages()
}
eventBus.$on('mainScroll',debounde(handleScroll,50))
export default {
  inserted(el,binding) {
    const img = {
      dom:el,
      src: binding.value
    }
    imgs.push(img)
    setImg(img)
  },
  unbind(el) {
    imgs = imgs.filter(img => img.dom !== el)
  }
}