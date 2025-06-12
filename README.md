# Toy Robot Simulator

Web page written in TypeScript and React to parse commands to control a simulated toy robot.

Live version of the simulator here: https://msb-dev.github.io/robot-simulator/

[See below](#discussion-about-the-design) for discussion about the design of this solution. 

Scaffolded with `npm create vite`.

## Installation

1. Install the version of node in `.nvmrc`, e.g. by installing Node Version Manager and running `nvm install`.
2. `npm install` to install node packages.
3. `npm run dev` to spin up a dev server and open a browser at the displayed URL.
4. `npm run build` to build a static site that can be deployed on a web server
   
## Testing

Run unit tests with `npm run test`.

With more time I would have likely added 

* React component and hook tests
* End-to-end UI tests using something like Playwright

## Linting

Lint the TypeScript with `npm run lint`. I have defined a [Prettier](https://prettier.io) config for autoformatting the code.

With more time I would have added

* linting for CSS
* a check-prettier script that's also run in the pipeline

## CI

The site is linted, tested, built, and deployed to Github pages using a Github Actions workflow defined in ./github/workflows/pipeline.yml.

## Licensing

The robot icon I used is in the Public Domain: https://commons.wikimedia.org/wiki/File:Robot_icon.svg.

I've licensed this site using a LICENSE.md file.

## Discussion about the design

I wanted to build this in React since I'm a predominantly front-end developer! This forced some design decisions that I wouldn't have taken in a command line application. In that case I would likely have written things in a more object-orientated style.

There would likely be a class called `Config` whose constructor would take two numbers and an orientation, and which would throw an exception if the inputs were invalid in some way. Unlike the code I wrote, this design would mean there could never be a Config object that was invalid, whereas in my code there has to be a separate validation step.

There would then be a class called `Robot` which would encapsulate a private `config: Config | undefined` state. It would have `place`, `move`, `left`, `right` methods that would mutate the internal `config` state, and a `report` method that would output it.

There would be another class called `Parser` that would parse input commands and dispatch to the relevant methods on `Robot`.

I think this design would be the most intuitive. However, React needs to own the state of anything that is going to be rendered on the screen. When you want to change state, you need to specifically call a React `setState` function. This is counter to encapsulating state inside a class.

It would be possible to write a shim that would call `Robot.report` after every command to get the state out and then write it into React state, but having two sources of truth for the state is a recipe for bugs, and I think it would be more confusing. Another way would be to invert control, having the `Robot` constructor take a `ConfigStore` object that has methods that it should call when it wants to update and retrieve state. In that way, the state could remain owned by React. But I think this introduces unnecessary complexity so I've tried to keep things simpler.

### Exceptions

I'm not particularly happy with how the error handling ended up. There's a lot of boilerplate. I was tempted to have the exceptions themselves own their friendly error messages. But I ended up thinking that this would blur the concerns of the internals and the user-interface parts a bit too much. The interface should "know" about the possible exceptions the underlying business logic can throw, and decide itself how to display those messages to the user. The undelying business logic shouldn't have to know anything the UI. 

Still, it feels like there's a better way of dealing with all this that I'm not seeing.