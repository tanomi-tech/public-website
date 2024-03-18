---
title: 'Hugo Templating Mini-Guide and Cheat Sheet'
series: 'How to Hugo'
featured_image: 'media/post-header.jpg'
author: 'Jesse Barkdoll'
authorimage: '../assets/images/jesse.png'
date: 2024-03-18
draft: false
type: posts
tags:
  - Hugo
  - Go (Golang)
  - JAMstack
  - 'Static Site Generators'
---
Hugo templates are based on the `html/template` and `text/template` Go libraries. Most, if not all reference documentation for these libraries is applicable to Hugo as well.

Topics covered in this article:
- [Context](#context)
    - [Changing Context using `range` and `with` blocks](#changing-context-using-range-and-with-blocks)
- [Blocks](#blocks)
- [Global Site Data in Templates](#global-site-data-in-templates)
- [Custom Data Sources](#custom-data-sources)
- [Querying Pages for Lists (Iteration)](#querying-pages-for-lists-iteration)


## Context

Context is the data passed to a template. Current context of a template is always represented with a dot (`.`) and can be used like so:
```html
<p>Hi my name is {{ .Name }}</p>
```

### Changing Context using `range` and `with` blocks
The current context (`.`) changes inside of `range` and `with` blocks to be the specified range or value.

#### Example

Let's say you have a product listing post (markdown file) in your Hugo site with the following frontmatter:
`cheese.md`
```yaml
params:
    product:
        id: 32
        label: 'Sharp Cheddar'
        price: 2.99
```


And in your Hugo post template, you have the following:
`layouts/_default/single.html`
```html
{{ with .Params.product }}
    <span id="product-{{ .id }}">{{ .label }} (${{ .cost }})</span>
{{ end }}
```

__RESULT:__ the template should parse to the following snippet when you build the site.
```html
<span id="product-32">Sharp Cheddar ($2.99)</span>
```




## Blocks
Blocks are reusable chunks of Hugo/Go template markup.

There are 2 types of template files. 
- __Base templates__: used to define blocks; the default base template is located at `layouts/_default/baseof.html`
- __Site templates__: used to compose blocks together into layouts

We can define blocks in __base templates__, and then compose them together in a __site template__ (and optionally override their base template content).

`layouts/_default/baseof.html`
```html
<main>
{{ block "main" . }}
  <span>I AM THE DEFAULT</span>
{{ end }}
</main>
```
Here we have defined the "main" block's location in a base template and given it default content when no content is rendered for this block in an inheriting site template. Notice how the context dot (`.`) is at the end of the block definition open statement.




## Global Site Data in Templates

We can access data related to the site's main configuration using `.Site` in a template like so:
```html
{{ with .Site.Author }}
    <p>This site was built by {{ . }}</p>
{{ end }}
```

  Properties available in `.Site` (referenced like `.Site.<property>`, example `.Site.AllPages`)
 - `.AllPages` 
 - `.Author`
 - `.BaseURL`
 - `.BuildDrafts`
 - `.Copyright`
 - `.Data` (for [custom data](#custom-data-sources))
 - `.DisqusShortname`
 - `.Files`
 - `.GoogleAnalytics`
 - `.IsMultiLingual`
 - `.Language.Lang`
 - `.Language`
 - `.Languages`
 - `.Language.LanguageCode`
 - `.Language.LanguageName`
 - `.Language.LanguagePrefix`
 - `.Language.Weight`
 - `.LastChange`
 - `.Menus`
 - `.Pages`
 - `.Permalinks`
 - `.RegularPages` (gets pages matching `where .Site.Pages "Kind" "page"`)
 - `.Site.RSSLink`
 - `.Site.Sections`
 - `.Site.Taxonomies`
 - `.Site.Title`



## Custom Data Sources

Data does not always need to be input into markdown post frontmatter.

What if you wanted to use an isolated set of data on your site for some purpose? 

Well, there is the `data/` directory for this exact reason. You can add static data from any of the supported formats.
### Supported Formats
- JSON (`.json`)
- YAML (`.yml`, `.yaml`)
- TOML ( `.toml`)
- XML (`.xml`)

If you had the following file in your Hugo project's `data/` directory...
`data/my-magnets.yaml`
```yaml
Title: 'My Magnets'
Collection:
- 'magnet 1'
- 'magnet 2'
- 'magnet 3'
- 'magnet 4'
```

...you can bind it in context using `range`/`with` blocks and the `index` function in a template like so:
```html
{{ with index .Site.Data "my-magnets" }}
<span>{{ .Title }}</span>
<ul>
    {{ range .Collection }}
    <li>{{ . }}</li>
    {{ end }}
</ul>
{{ end }}
```

__Result__
```html
<span>My Magnets</span>
<ul>
    <li>magnet 1</li>
    <li>magnet 2</li>
    <li>magnet 3</li>
    <li>magnet 4</li>
</ul>
```

## Querying Pages for Lists (Iteration)

We can query for certain pages using an `index` or `where` function or aggregate pages into groups using a `.GroupBy` function. Then we can iterate through those pages and groups with `range`.

Here are some examples.


### Get pages with `"hobbies"` as a tag
```html
<h3>Posts related to Hobbies</h3>
<ul>
    {{ range (index .Site.Taxonomies.tags (lower "hobbies")).Pages }}
    <li>{{ .LinkTitle }}</li>
    {{ end }}
</ul>
```

### Get pages that are "posts"
```html
{{ $posts := where .Site.RegularPages "Type" "posts" }}
{{ range $posts }}
<div class="post">
    {{ .Title }}
</div>
{{ end }}
```

Sort them by date using `.ByDate`:
```html
{{ range $posts.ByDate }}
<!-- ... -->
{{ end }}
```

Sort them by date in descending order using `.Reverse`:
```html
{{ range $posts.ByDate.Reverse }}
<!-- ... -->
{{ end }}
```


### Get pages published in the last 30 days
Here we wrap a base `where` statement in another `where` statement together to further refine results. 
```html
{{ $latest := where (
      where .Site.RegularPages "Type" "posts"
    ) 
    "Date" "ge" (now.AddDate 0 0 -30) 
}}
{{ range $latest.ByDate.Reverse }}
<div class="post">{{ .Date | time.Format "2006-01-02" }} / {{ .Title }}</div>
{{ end }}
```
This entire query handles the following:
- gets our "posts"-type pages in the base `where` statement `(where .SiteRegularPages "Type" "posts")`
- sorts pages by date (`.Pages.ByDate`)
- returns pages that are greater than or equal to (`ge`) the date matching 30 days ago (`(now.AddDate 0 0 -30)`)

### Group pages by a custom parameter (in YAML frontmatter)
In this case, the parameter is `product_category`. Markdown files with a `product_category` param will be grouped by it's value. So if we have a few posts with the `params.product_category` value set to `'kitchenware'`, they will be grouped here and you can iterate over them for display in your template.
```yaml
params:
  product_category: kitchenware
```

And in our template:
```html
<section>
    <div>Product Categories</div>
    {{ range .Site.RegularPages.GroupByParam "product_category" }}
    <span>{{ .Key | title }}</span>
    <ul>
        {{ range .Pages }}
        <li>{{ .Title }}</li>
        {{ end }}
    </ul>
    {{ end }}
</section>
```

### There's so much more...
There are many foundational concepts to cover within Go templates and their usage in Hugo. If there are any specific ones you'd like me to include with quick examples in this guide, feel free to [ping me on X (formerly Twitter)](https://twitter.com/jessebarkdoll).