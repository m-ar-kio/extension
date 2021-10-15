export function saveButtonElement() {
  // Define Markup
  const saveToKontextMarkup = `
    <div class="saveToMarkButton" style="display: flex;flex-flow: column;align-items: center;justify-content: center;" type="button" data-nav="share_tweet_to_kontext">
      <svg width="24px" height="24px" viewBox="0 0 1000 1000" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
        <g transform="matrix(1.48934,0,0,1.48934,-702.348,212.348)">
            <g transform="matrix(800,0,0,800,426.053,482.204)">
                <path d="M0.554,-0.697L0.659,-0.654C0.722,-0.627 0.773,-0.586 0.811,-0.529C0.85,-0.471 0.869,-0.409 0.869,-0.34C0.869,-0.246 0.835,-0.166 0.769,-0.099C0.703,-0.033 0.622,-0 0.528,-0C0.484,-0 0.441,-0.009 0.399,-0.026L0.294,-0.069C0.231,-0.095 0.18,-0.137 0.142,-0.194C0.104,-0.251 0.084,-0.314 0.084,-0.383C0.084,-0.477 0.118,-0.557 0.184,-0.623C0.25,-0.689 0.33,-0.723 0.424,-0.723C0.465,-0.723 0.509,-0.714 0.554,-0.697ZM0.13,-0.379C0.13,-0.299 0.159,-0.231 0.217,-0.174C0.275,-0.117 0.344,-0.088 0.424,-0.088C0.505,-0.088 0.575,-0.117 0.632,-0.175C0.69,-0.232 0.719,-0.302 0.719,-0.383C0.719,-0.464 0.69,-0.534 0.632,-0.591C0.575,-0.649 0.505,-0.678 0.424,-0.678C0.342,-0.678 0.272,-0.649 0.215,-0.591C0.158,-0.533 0.13,-0.462 0.13,-0.379Z" style="fill-rule:nonzero;"/>
            </g>
        </g>
        <g transform="matrix(1.0645,0,0,1.12585,-10.5114,-43.6583)">
            <ellipse cx="418.643" cy="457.031" rx="332.02" ry="315.811" style="fill:white;"/>
        </g>
        <g transform="matrix(1.38657,0,0,1.38657,154.236,-734.583)">
            <g transform="matrix(288,0,0,288,69.6322,940.669)">
                <path d="M0.115,-0.09L0.115,-0.423L0.029,-0.423L0.029,-0.513L0.216,-0.513L0.216,-0.448C0.276,-0.496 0.335,-0.52 0.393,-0.52C0.452,-0.52 0.493,-0.493 0.515,-0.44C0.581,-0.493 0.643,-0.52 0.701,-0.52C0.743,-0.52 0.775,-0.508 0.8,-0.483C0.825,-0.459 0.837,-0.422 0.837,-0.371L0.837,-0.09L0.927,-0.09L0.927,-0L0.737,-0L0.737,-0.325C0.737,-0.348 0.736,-0.366 0.733,-0.38C0.731,-0.394 0.725,-0.406 0.716,-0.416C0.706,-0.425 0.691,-0.43 0.67,-0.43C0.651,-0.43 0.63,-0.425 0.605,-0.414C0.58,-0.403 0.554,-0.386 0.527,-0.364L0.527,-0.09L0.614,-0.09L0.614,-0L0.426,-0L0.426,-0.338C0.426,-0.371 0.421,-0.394 0.411,-0.409C0.401,-0.423 0.385,-0.43 0.362,-0.43C0.325,-0.43 0.276,-0.408 0.216,-0.364L0.216,-0.09L0.306,-0.09L0.306,-0L0.023,-0L0.023,-0.09L0.115,-0.09Z" style="fill-rule:nonzero;"/>
            </g>
        </g>
      </svg>
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
