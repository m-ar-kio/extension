export function saveButtonElement() {
  // Define Markup
  const saveToKontextMarkup = `
    <div class="saveToMarkButton" style="display: flex;flex-flow: column;align-items: center;justify-content: center;" type="button" data-nav="share_tweet_to_kontext">
      <p style="display: flex;flex-flow: row nowrap;align-items: center;justify-content: center;color: #999;margin: 0;">m<span style="display: inline-block;width: 24px;height: 24px;border-radius: 50%;border: 1px solid #999;padding: 1px 0px 0px 3px;box-sizing: border-box;margin: 0 1px;">ar</span>k</p>
    </div>
  `

  const saveToMarkButton = document.createElement('div')
  saveToMarkButton.classList.add('saveToKontextContainer')
  saveToMarkButton.innerHTML = saveToKontextMarkup
  saveToMarkButton.style = `align-items: center;
      align-content: center;
      display: flex;
      justify-content: flex-start;`
  return saveToMarkButton
}
