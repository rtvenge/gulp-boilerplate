Hoverboard SCSS Boilerplate
===========================

This is a starting point for scss.

## Grid ##

Grids are purposefully simple. Here is some example code:

```
<div class="grid-columns">
  <div class="grid-column-4 grid-column--padded">
    column 1
  </div>
  <div class="grid-column-4">
    column 2
  </div>
  <div class="grid-column-6 grid-column--padded">
    column 3
  </div>
  <div class="grid-column-2 grid-column--padded">
    column 4
  </div>
</div>
```

The `grid-column--padded` class is optional. The number refers to the number of grid columns the container takes up.

## KSS ##

The `scss` is documented using [kss-node](https://github.com/kss-node/kss-node). Example doc:

```
// Section Title
//
// Section description. This shouldn't have any actual code. Just serves as a heading.
//
// Styleguide 1.0.0

// Sub-Section Title
//
// Description of code below.
//
// Markup:
// <p>Some markup that will act as the example for the code.</p>
//
// Styleguide 1.1.0
```

Notice the Styleguide comment at the bottom. The first must be `Styleguide X.0.0` and each sub section below should be `Styleguide X.1.0`, `Styleguide X.2.0` and so on.

This code can be in any file in the `partials` directory.

Run `./BUILD_STYLEGUIDE` to build the styleguide. It's advised to move this into your task runner.

Documentation is a little sparse. Read through comments in scss to get a better idea of how it works.
