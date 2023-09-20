# Minimalist Hugo Template for Academic Websites

This repository contains the source code to https://pascalmichaillat.org: a personal academic website created with [Hugo](https://github.com/gohugoio/hugo) and the [PaperMod theme](https://github.com/adityatelange/hugo-PaperMod). The website is hosted on [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages).

The code is publicly available as a template repository so anyone can generate a new repository with the same directory structure and files, and quickly create their own website. The code might also be helpful to anyone who wishes to learn about Hugo or wants to recreate specific features of the website.

## Documentation

The source code is documented at https://pascalmichaillat.org/d5/.

## Features

The PaperMod theme is modified in several ways to be more adapted to academic websites:

+ Webpages are organized in three categories, which are available from any page through the menu and from the homepage through buttons: papers, courses, and other projects.
+ A list of tags (keywords) used in papers and courses is automatically generated so visitors can easily see the topics covered in research and teaching.
+ The website provides social icons specific to academia: office hours, Zoom, Substack, and Google Scholar.
+ The metadata for webpages, which appear below the webpage title, are tailored to the academic context.
+ Color scheme, font, spacing, buttons, and general appearance have been streamlined and made as minimalist as possible.
+ The website provides new archetypes for paper pages, course pages, an archive page, and a search page.

## Installation

+ Clone the repository to your local machine
+ Install [Hugo](https://gohugo.io/installation/). On a Mac, this is easily done with [Homebrew](https://brew.sh): simply run `brew install hugo` in the terminal.
+ Since the website is hosted on GitHub Pages, it is convenient to update the website through [GitHub Desktop](https://desktop.github.com).

## Usage

+ Website development – Navigate to the website directory and run `hugo server` in the terminal. The command builds the website on your machine and made it available at http://localhost:1313. 
+ Website compilation – Once the website is ready to be made public, run `hugo` in the terminal from the website directory.
+ Website deployment – With GitHub Desktop, commit the changes and push them to the website repository on GitHub. Then, [GitHub Actions](https://gohugo.io/hosting-and-deployment/hosting-on-github/) build the website and deploy it to GitHub Pages. The workflow is in the `.github/workflows/hugo.yml` file.

## Google Analytics

The website supports Google Analytics 4. **But do not forget to update the Google Analytics ID in `config.yml`.** Otherwise your website will appear in my Google Analytics dashboard.

+ Either replace the ID `G-97G4MZ4061` with your own ID in the line `googleAnalyticsID: "G-97G4MZ4061"`. 
+ Or simply comment the line `googleAnalyticsID: "G-97G4MZ4061"` if you do not wish to use Google Analytics.

## Configuration file

Beside the Google Analytics ID, make sure to update all the parameters that are specific to your website in the configuration file `config.yml`. Such parameters include:

+ `baseURL` – The website URL
+ `title` – Your name, to be used as title of the website
+ `params:author` - Your name, to be used in HTML meta tags to specify the author of the webpage's content (this only adds a meta tag to the header of the homepage, it doesn't have any direct impact on the appearance or functionality of the webpage itself)
+ `params:description` – A short description (less than 155 characters) of who you are, to be used in HTML meta tags to specify the content of the webpage (this description often appears in search engine results below the title of the webpage)
+ `params:profileMode:title` – Your name, to be used as title on the homepage
+ `params:profileMode:subtitle` – A description of who you are, to be used as a subtitle on the homepage
+ `params:profileMode:imageTitle` – Your name, to be used as tag for your profile picture
+ `params:socialIcons` – The URLs to your social accounts

## Content files

The files in the `content` folder are Markdown files that contain the content of the website. Each file corresponds to one page of the website. 

The folder in which the file is placed (`papers`, `courses`, or `design`) determines the category in which the page will appear (the [paper page](https://pascalmichaillat.org/papers/), the [course page](https://pascalmichaillat.org/courses/), or the [design page](https://pascalmichaillat.org/design/)). 

Keep the folders `papers`, `courses`, and `design` to preserve this website's structure. You can change the name of a folder to change the URL where the category page is located. Keep the `tags` folder to preserve the customization of the [tag page](https://pascalmichaillat.org/tags/).

All the files currently in the `content` folder pertain to this website and can be safely deleted, with the exception of the following files:

+ `location.md` – Page linked to the location icon on the homepage. Replace the content with your own addresses.
+ `officehours.md` – Page linked to the office hours icon on the homepage. Replace the content with your own office hours.

## Static files

The files in the `static` folder are PDF files and images to which the website links. All the files currently in the `static` folder pertain to this website and can be safely deleted, with the exception of the following files:

+ `picture.jpeg` – Picture appearing on the homepage. Replace it with your own picture.
+ `cv.pdf` – CV linked to the CV icon on the homepage. Replace it with your own CV.
+ `favicon.io`, `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png` – Favicon appearing in the menu bar next to the website title, and in the browser next to the URL. Replace it with the [favicon of your choice](https://favicon.io).

## Public folder

The `public` folder contains the fully generated static website files that are ready to be deployed to GitHub Pages. When you run the `hugo` command, Hugo processes your content, templates, and other project files and generates a static website. The resulting output is placed in the `public` folder by default.

The `public` folder can therefore be  safely deleted. A new version of the `public` folder will be created when you run the `hugo` command from your own repository.

## Performance

Despite the modifications to the PaperMod theme, the website continues to perform well on mobile and desktop devices. Here is an overview of the mobile performance from [PageSpeed Insights](https://pagespeed.web.dev/):

<img width="448" alt="mobile" src="https://github.com/pmichaillat/pmichaillat.github.io/assets/85443660/b54395b0-f9cb-4ad7-8daa-5f86e5f2cddc">

And here is an overview of the desktop performance:

<img width="453" alt="desktop" src="https://github.com/pmichaillat/pmichaillat.github.io/assets/85443660/eff134d2-6097-4bc2-bfd7-4f5c18571789">

Here are the [full report on mobile performance](https://pagespeed.web.dev/analysis/https-pascalmichaillat-org/hl96ythdue?form_factor=mobile) and the [full report on desktop performance](https://pagespeed.web.dev/analysis/https-pascalmichaillat-org/hl96ythdue?form_factor=desktop).

## License

+ The code used to generate this website is licensed under the terms of the MIT License.
+ Except where otherwise noted, the content of this website was created by Pascal Michaillat and is licensed under the [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).
