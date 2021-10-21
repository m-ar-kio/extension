import { createBookmark } from './helper'

export function appendTagModal(bm) {
  const tagModal = document.createElement('div')
  tagModal.innerHTML = `
    <div style="display: flex;flex-flow: column nowrap;align-items: center;align-content: center;justify-content: flex-start;">
      <p style="font-weight:bold;margin:8px;">Add Tags</p>
      <textarea id="mark-tags" style="width:250px;height:45px;border:1.5px solid #222326;display:block;outline-color:#222326;padding:6px;font-size: 18px;line-height: 24px;"></textarea>
      <p style="font-size:12px;margin:0px;margin-top:10px;color:#999;text-align:center;">Multi tags seprated by <b>comma</b>(,), or leave it empty</p>
      <div style="display:flex;flex-flow:row nowrap;align-items:center;justify-content:space-between;width:80%;">
        <button id="mark-cancel" style="box-shadow:6px 6px #b7b9bf;margin-top:10px;background:white;border:1.5px solid #b7b9bf;padding:6px 20px;cursor:pointer;">CANCEL</button>
        <button id="mark-confirm" style="box-shadow:6px 6px #222326;margin-top:10px;background:white;border:1.5px solid #222326;padding:6px 20px;cursor:pointer;">CONFIRM</button>
      </div>
    </div>
  `
  tagModal.style = `
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
    width: 300px;
    height: 190px;
    position: fixed;
    right: 25px;
    top: 25px;
    z-index: 1001;
    background: white;
    padding: 10px;
    box-shadow:6px 6px #222326;
    border:1.5px solid #222326;
  `
  document.body.appendChild(tagModal)
  tagModal.id = 'mark-tags-modal'

  let confirming = false
  const confirmButton = document.getElementById('mark-confirm')
  confirmButton.addEventListener('click', () => {
    if (confirming) {
      return
    }
    confirming = true
    confirmButton.innerText = 'CONFIRMING'
    const textarea = document.getElementById('mark-tags')
    const value = textarea.value.trim()
    if (value) {
      const tags = value
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t)
      createBookmark(bm, tags)
      document.body.removeChild(tagModal)
    }
  })

  const cancelButton = document.getElementById('mark-cancel')
  cancelButton.addEventListener('click', () => {
    document.body.removeChild(tagModal)
  })
}
