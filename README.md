#React Component Creator Boilerplate
This is the very first and simple startup project for creating the react component. If you are starting to create a react component publishing to NPM registry or want to make it reusable, this project will be helpful for you to start from this project.

### Get started
```
|--dist
  |--index.js
  |--index.js.map
|--src
  |--index.js
  |--yourComponent.js
  |--yourComponentStyle.css
|--stories (storybook things)
```

The folder that you will be involved is `/src`. 
- Rename file component to your component name.
- Fix the `/src/index.js` to import the right name that you have changed.

So now all ready. Go!!

### Developing

`npm run storybook`

This project use storybook for developing and testing. So you can just run storybook.

### Build and publish
`npm run build`
<br>

This will build the project from entry point (``/src/index.js``) to ``/dist/index.js``.

So now the project is ready for publishing. You need to set package.json to point main to file `/dist/index.js`.

### Support
Now this project support only `css`. 
`scss` is not supported in this project yet.