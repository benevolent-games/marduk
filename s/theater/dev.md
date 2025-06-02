
# Theater

This is the developer guide for the Theater, which is a harness for multithreaded harness for web game rendering.

BabylonJS has first-class support, though any renderer that outputs to a canvas can be plugged in.

### Glossary
- **Theater:** multithreaded babylon runner
- **Frontstage:** coordinates data to/from web worker, displaying frames onto dom canvas
- **Backstage:** runs inside web worker, renders frames onto an offscreen canvas, sends frames back to main thread
- **Figment:** a renderable item in the world
- **FigmentSpec:** describes all figments possible in a renderable world

### Dependency zones
Theater source code is organized into zones with rules about what dependencies are allowed:
- `pure/` universal typescript, no dependencies, not environment-specific
- `browser/` allowed to use pure and browser stuff (web-worker safe)
- `dom/` allowed pure, browser, and dom stuff like HTMLElement
- `babylon/` allowed to use pure, browser, dom, and babylon stuff like Scene

