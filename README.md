# KNIT AND CODE

Generative Mixed Reality app for the 2023 Pratt Design Show in Brooklyn NY.

## About the project

KNIT + CODE was a design collaboration by Pratt School of Design faculty Hannah Berkin-Harper and Benjamin Howes, and Tracey Weisman of the the School of Design Knit Lab. It was fabricated in Brooklyn NY in the Spring of 2023 by a dedicated team of Industrial and Fashion Design students, and was the ceterpiece of Pratt Shows: Design 2023. This repo contains the source code for the generative AR part of the project. To learn more about the CNC-knit physical installation hit us up on twitter or IG or something!

## Generative 3D and Mixed Reality

The generative 3D geometry is created on the fly in the browser using [threejs](https://threejs.org/). Each fiberous iteration is very probably unique - we use Math.Random() all over the place. The generative geometry codebase was cobbled together using a combination of some traditional reseach and design workflows (google it, experiment, repeat), and some experiments with generative AI coding assistants (Chat-GPT, Github co-pilot).

We're using the [google model viewer](https://modelviewer.dev/) to handle interactive 3D interactions on the web page, and to natively handle Augmented Reality / Mixed Reality modes on AR-enabled mobile and tablet devices.

When the page loads, and when the generate new iteration button is pressed, a new set of fibers is generated, and a `.glb` file is passed to the model viewer as a `Blob`.

## Local Development and Github pages hosting

This is a single page react website that was bootstrapped using vite. To run the site locally, fork or clone this repo, install the npm packages, and use the following commands in a terminal to develop, build, and deploy:

local development startup: `yarn run dev`

local build: `yarn run build`

github pages deploy: `npm run deploy`
