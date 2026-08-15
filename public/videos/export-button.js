/* <export-video-button> — posts the host video-export request. */
if (!customElements.get('export-video-button')) customElements.define('export-video-button', class extends HTMLElement {
  connectedCallback() {
    const b = document.createElement('button');
    b.textContent = '⬇ Export video';
    b.title = 'Export this animation as a video file';
    b.style.cssText = "font-family:'Anek Latin',sans-serif;font-weight:800;font-size:12px;letter-spacing:.04em;color:#fff;background:#E11B22;border:none;border-radius:8px;padding:8px 16px;cursor:pointer;margin-left:16px;white-space:nowrap";
    b.onmouseover = () => b.style.background = '#C4151B';
    b.onmouseout = () => b.style.background = '#E11B22';
    b.onclick = () => window.parent.postMessage({ type: 'omelette:request-video-export' }, '*');
    this.appendChild(b);
  }
});
