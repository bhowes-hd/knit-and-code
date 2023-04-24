# KNIT AND CODE

Generative Mixed Reality app for the 2023 Pratt Design Show in Brooklyn NY.

## About the project

KNIT + CODE is a collaboration by Pratt Professors Hannah Berkin-Harper and Benjamin Howes, the School of Design CNC-Knitting lab, and a dedicated team of design students. This github-specific project blurb will be improved, and we'll add a nice image directly below.

## Generative 3D and Mixed Reality

The generative 3D geometry is created on the fly in the browser using [threejs](https://threejs.org/). Each iteration is probably unique - we use Math.Random() all over the place!

We're using the [google model viewer](https://modelviewer.dev/) to handle interactive 3D interactions on the web page, and to natively handle Augmented Reality / Mixed Reality modes on cabable mobile and tablet devices.

When the page loads, and when the generate new iteration button is pressed, a new set of fibers is generated, and a .glb file is passed to the model viewer

## Local Development and Github pages hosting

This is a single page react website that was bootstrapped using vite. To run the site locally, fork or clone this repo, install the npm packages, and use the following commands in a terminal to develop, build, and deploy:

local development startup: `yarn run dev`

local build: `yarn run build`

github pages deploy: `npm run deploy`
