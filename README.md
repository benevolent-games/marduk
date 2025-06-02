
# MARDUK

**Marduk** is a [BabylonJS](https://www.babylonjs.com/) framework for rendering good web games.
- 🧵 **Multithreaded** — rendering happens in its own thread
- 🎳 **Smart architecture** — logic and rendering happen on separate threads

<br/>

## Install Marduk

```sh
npm install @benev/marduk
```

<br/>

## Theater

The theater coordinates your rendering thread and displays the results onto a canvas.

The theater is split into two main parts. Each will live in its own separate bundle.
- *The Frontstage* hosts the visible canvas in the dom. It doesn't import Babylon, and will be lean in filesize.
- *The Backstage* runs inside a web worker, and performs rendering work. It imports Babylon, and will be fat in filesize.

### Theater project setup
1. Write your `spec.ts` type, which describes your renderable world
    ```ts
    import {AsFigmentSpec} from "@benev/marduk/x/theater/index.pure.js"

    export type MySpec = AsFigmentSpec<{

      // Describe a renderable object in your world,
      // in terms of serializable data.
      hippo: {hungry: boolean}
    }>
    ```
    - notice the specific locations from where we're importing things
1. Establish your `backstage.ts` module (this will be a web worker)
    ```ts
    import {MySpec} from "./spec.js"
    import {babylonBackstage, theaterWorker} from "@benev/marduk/x/theater/index.babylon.js"

    void async function() {

      // defining a babylon backstage
      // (you could make a backstage for a different kind of renderer)
      const backstage = await babylonBackstage<MySpec>(async stagecraft => ({

        // now we define a renderer for this object
        hippo: (id, data) => {
          console.log("spawn", id, data)
          return {
            update: data => console.log("update", id, data),
            dispose: () => console.log("dispose", id, data),
          }
        },
      }))

      // establishing the web worker
      await theaterWorker(backstage)
    }()
    ```
    - now bundle this module as `backstage.bundle.js` using `rollup`, `esbuild`, `parcel`, `vite`, or whatever
1. Create your `frontstage.ts` module (this will be your app's main entrypoint)
    ```ts
    import {MySpec} from "./spec.js"
    import {Frontstage, register} from "@benev/marduk/x/theater/index.dom.js"

    void async function() {
      const workerUrl = new URL("./backstage.bundle.js", import.meta.url)
      const frontstage = await Frontstage.make<MySpec>({workerUrl})
      register(frontstage.getElements())

      // okay, now you're ready to manipulate your world

      // spawn, then update, then delete a hippo (lol, just to exercise the full lifecycle)
      await frontstage.syncFigments([[0, ["hippo", {hungry: false}]]])
      await frontstage.syncFigments([[0, ["hippo", {hungry: true}]]])
      await frontstage.syncFigments([[0, undefined]])
    }()
    ```
    - now bundle this module as `frontstage.bundle.js`
1. Load the frontstage bundle onto your web page
    ```html
    <script type=module src="./frontstage.bundle.js"></script>
    ```
1. Place the `<marduk-theater>` element in your html body
    ```html
    <marduk-theater></marduk-theater>
    ```
1. 🎉 You're done!
    - If you run the page, you should see the console logging about the hippo lifecycle events.

