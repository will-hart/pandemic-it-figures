# pandemic-it-figures

A pandemic wrapper around [it-figures](https://github.com/will-hart/it-figures) for generating multi-panel figures prior to publishing with pandemic

## Usage

Install the package

```bash
npm i -g pandemic-it-figures
```

In the front matter of document, specify a list of .json files that contain the panel definitions. See the readme for [it-figures](https://github.com/will-hart/it-figures) for more information:

```yaml
pandemic:
  figures: "panels.json"
```

or

```yaml
pandemic:
  figures:
  - "panels.json"
  - "panels2.json"
```

In your pandemic recipe, specify this pandemic-mustache in your list of preprocessing hooks:

```json
{
  "prehooks": [
    "pandemic-it-figures"
  ]
}
```

## Changelog

### 0.1.0

Initial release
