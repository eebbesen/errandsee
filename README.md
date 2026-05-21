# errandsee
Helping neighbors understand convenient transit options

## Requirements

### Playwright

If running the script to convert html to pdf/png node package [Playwright](https://playwright.dev/) is required

    npm install playwright

## Scripts

scripts/html_to_pdf_png_svg.js will convert an html file to pdf, png, and svg formats. It takes one parameter, the location of the html file to convert.

    node scripts/html_to_pdf_png_svg.js <area>

## Testing

Tests use Node's built-in test runner — no additional dependencies required.

    npm test

## Structure

`artifacts/<area>/` contains files for a specific area. I've included csv, txt, md, and kml files relevant to the area. Typically these are what I'll use in conjunction with Google Maps and an AI tool to generate the HTML version of the map.

`artifacts/<area>/user_maps/` is where the html, pdf, png, and svg files are stored. These files are the output which users will see.

In the above, `<area>` represents a geography, e.g., snel-west-rand-uni, that I'm proposing as the way to allow different locations in one repo.

## Cloudflare Pages deployment
[Cloudflare Pages](https://pages.cloudflare.com/) provides free, cached hosting for projects displaying static assets. See wrangler.jsonc if you want to change what is displayed. 

    npx wrangler deploy
