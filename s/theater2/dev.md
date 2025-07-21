
# marduk theater

the marduk theater is a toolkit for workerized rendering.

it works like a layercake.

<br/>

## rendering — unopinionated minimal setup

`rendering` is the abstract base layer..
- it doesn't know about canvases, or babylon
- it doesn't care what your State, Payload, or Result is

`types.ts`
```ts
// these all must be serializable
export type MyState = {}
export type MyPayload = {}
export type MyResult = {}
```

`work.bundle.ts`
```ts
import {renderingWorker} from "@benev/marduk/theater"
import {MyState, MyPayload, MyResult} from "./types.js"

renderingWorker<MyState, MyPayload, MyResult>((shell, rig) => ({

  // the main thread wants to set the "state" of the renderer
  async set(state) {
    // you do something with your state.
    // maybe it's set to "play" or "pause" or something.
  },

  // the main thread is supplying stuff to render
  async supply(payload) {

    // here's how you send back a rendered result to the host.
    // doesn't have to be in the supply call, can be on its own schedule..
    await shell.host.deliver({})
  },
}))
```

`thread.ts`
```ts
import {renderingThread} from "@benev/marduk/theater"
import {MyState, MyPayload, MyResult} from "./types.js"

export async function setupRenderingThread(workerUrl: URL | string) {
  const thread = await renderingThread<MyState, MyPayload, MyResult>({
    label: "mardukRendering",
    workerUrl,
    timeout: 1_000,
    setupHost: () => ({
      async deliver(result) {

        // handle the result back from the worker
        console.log(result)
      },
    }),
  })

  // set the state
  await thread.work.set({})

  // supply a payload
  await thread.work.supply({})

  return thread
}
```

<br/>

## stages — aware of canvases

stages are the next layer, where we're aware of html canvas.

`types.ts`
```ts
export type MyPayload = {}
```

`work.bundle.ts`
```ts
import {renderingWorker, setupBackstage} from "@benev/marduk/theater"
import {MyPayload} from "./types.js"

renderingWorker(asBackstage<MyPayload>(canvas => {
  const ctx = canvas.getContext("2d")!
  let count = 0

  return (shell, rig) => ({
    async supply(payload) {
      // do some rendering with the ctx or something
      
      // deliver a frame
      await shell.host.deliver({
        count: count++,
        bitmap: canvas.transferToImageBitmap(),
      })
    },
  })
})
```

`thread.ts`
```ts
import {renderingThread} from "@benev/marduk/theater"
import {MyState, MyPayload, MyResult} from "./types.js"

export async function setupRenderingThread(workerUrl: URL | string) {
  const thread = await renderingThread<MyState, MyPayload, MyResult>({
    label: "mardukRendering",
    workerUrl,
    timeout: 1_000,
    setupHost: () => ({
      async deliver(result) {

        // handle the result back from the worker
        console.log(result)
      },
    }),
  })

  // set the state
  await thread.work.set({})

  // supply a payload
  await thread.work.supply({})

  return thread
}
```


