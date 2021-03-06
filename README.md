# fiddle

### osc sequencer application

fiddle will be a modern sequencer application specializing in arranging OSC data on a timeline. fiddle is pre-alpha software, and is a proof of concept for writing a performant web-based sequencer application using React, typescript, and an architecture centered around observable data.

```bash
yarn            # https://yarnpkg.com

yarn start      # Run dev mode in browser
# or
yarn storybook  # Run storybook component playground in browser
```

To run in electron, first rebuild native libraries to work properly with electron.

```bash
$(npm bin)/electron-rebuild
```

Then start both the main electron process and renderer webpack dev server.

```bash
yarn electron-main:dev

# Run the webpack dev server in a separate terminal
yarn electron-renderer:dev
```

#### Roadmap to v0.1

- [ ] Implement a simple grid-based clip / timeline positioning system
- [ ] Implement a simple clip-based parameter automation system
- [ ] Implement a bridge layer between the JS view process and C++ OSC engine
