import loadingUrl from "@/assets/loading.svg";
import styles from "./loading.module.less";
function getImg(el)  {
  return el.querySelector('img[data-rol=loading]')
}
function createImg() {
  const img = document.createElement('img');
  img.src = loadingUrl;
  img.dataset.rol = 'loading';
  img.className = styles.loading;
  return img
}
export default function(el,binding) {
  const curImg = getImg(el);
  if(binding.value) {
    if(!curImg) {
      const img = createImg();
      el.appendChild(img)
    }
  }else {
    if(curImg) {
      curImg.remove();
    }
  }
}