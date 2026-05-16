# errandsee
Helping neighbors understand convenient transit options

## Requirements

### Playwright

If running the script to convert html to pdf/png node package [Playwright](https://playwright.dev/) is required

    npm install playwright

## Scripts

scripts/html_to_pdf_png_svg.js will convert an html file to pdf, png, and svg formats. It takes two parameters
* html file to convert
* destination of converted files

    node html_to_pdf_png.js <file.html> <output_dir>