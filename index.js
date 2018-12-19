#!/usr/bin/env node

const fs = require('fs')
const getStdin = require('get-stdin')
const figureParser = require('it-figures/bin/parser').default
const path = require('path')
const yamlFront = require('yaml-front-matter')

getStdin().then(content => {
  const frontMatter = yamlFront.loadFront(content)
  let figures = (frontMatter.pandemic || {}).figures

  // if there aren't any figure descriptions set, exit
  if (!figures) {
    process.stdout.write(content)
    process.exit(0)
  }

  if (!Array.isArray(figures)) {
    figures = [figures]
  }

  // generate all the figure files
  figures.forEach((figure) => {
    // check the path
    let filePath = path.join((process.env.PANDOC_SOURCE_PATH || process.cwd()), figure)
    if (!fs.existsSync(filePath)) {
      throw new Error(`Could not find the figure file for it-figures: ${filePath}`)
    }

    // build the figures silently
    const parser = new figureParser(filePath, true, process.env.PANDOC_SOURCE_PATH || process.cwd())
    parser.OnReady.then(async () => await parser.run(false))
  })

  // echo the content back to stdout for the next hook in the pipeline
  process.stdout.write(content)
})