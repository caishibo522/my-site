import getComponentRoot from "./getComponentRoot";
import Icon from "@/components/Icon";
import styles from "./showMessage.module.less";
/**
 *
 * @param {Object} options
 * type代表消息的类型 info信息 success正确 error错误 warn警告
 * content消息的内容
 * container容器
 * duration 消息提示多久后消失
 * callback 处理完成后的回调函数
 */
export default function(options) {
  const content = options.content || '';
  const container = options.container || document.body;
  const type = options.type || 'info';
  const duration = options.duration || 1500;
  const div = document.createElement('div');
  const iconDom = getComponentRoot(Icon,{type})
  div.className = `${styles.message} ${styles[`message-${type}`]}`
  div.innerHTML = `<div class="${styles.icon}">${iconDom.outerHTML}</div><span>${content}</span>`
  if(options.container) {
    const containerStyle = getComputedStyle(options.container);
    if(containerStyle.position === 'static') {
      options.container.style.position = 'relative';
    }
  }
  container.appendChild(div);
  div.clientHeight;
  div.style.opacity = 1;
  div.style.transform = `translate(-50%, -50%)`;
  setTimeout(() => {
    div.style.opacity = 0;
    div.style.transform = `translate(-50%, -50%) translateY(-25px)`;
    div.addEventListener('transitionend',() => {
      div.remove();
      options.callback && options.callback();
    },{once:true})
  },duration)
}