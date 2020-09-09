# Sewer AI Takehome

## Tech stack
library: React with Typescript

bundler: Parcel

CSS: Tailwind

## How to run

### yarn start -- start in dev mode
### yarn build -- build static assets

The static assets are in the dist folder. If you click on `index.html` you will see the project start up.

## Tech stack reasoning

### Functional CSS
I take a functional CSS approach using a functional CSS library called Tailwind.css. Functional CSS has started to become widly adoped over the past couple years with companies like Twitch and Facebook rewriting their frontends to use the methodology. It is one of the few technologies I have seen that has distinct advantages on both small as well as large projects. A quick explanation is traditional CSS relies on cascading functionality of CSS. This can be seen as inheritance and is generally an anti-pattern in regular development because fragle base classes and the gorilla banna problem. Functional CSS uses class composition instead of inheratance to solve these issues. In essence, I am allowing my react components to encapsulate my css classes together instead of css itself. Please let me know if you would like more detail about this choice.

### React with Typescript
React is currently the most popular Javascript UI library. Its functional apprach to state makes dealing with state less error prone and it is light weight and unopinionated. As for Typescript maybe it can be debated if it is overkill for a project of this size, but I find the saftey and confidence I gain in static typing saves me time. Expecially when foregoing unit tests for a project of this size, this saftey is worth it.

## Code Architecture
The code is located in `src` folder and there are 2 main files that are used: 
- `App.tsx`
- `components/Form/index.tsx`

I generally like to componentize as late as posible to avoid the overhead that comes with components. In my experience I have seen much more dificulty navigating overcomponentized forms as opposed to under. I also decided to use a form state management library despite the size of the project. Form state can be one of the hardest things to manage in React and having a library to mange this complexity can save a ton of time. In this case I used [`react-hook-form`](https://react-hook-form.com/) a newer form management solution, but one that is much simpler than the competitor `Formik`. 

The validations for the form are generated dynamically using the provided schema. This means new validation codes can be added and everything should work smoothly.

I would ordinarly add Cypress tests but i'm not sure if that is outside of the scope of the assignment. Please let me know if you would like me to add them.

## UI Details
I stuck fairly close to the UI Mockup that was that was given. Some details to note:

-  I tried to optimize for labeler speed, with the goal of having the labeler have the least amount of key presses to submit a form. This means I focus automatically on the first input so the user does not need to click. The user can also submit with enter. This should make labeling fast and efficient.
- I added a magnifer to the image because it will often be impractical to show images at full size.

## Small Suggestion
I'm not sure if this was intentional, but the current schema is very close to the [json-schema](https://json-schema.org/) spec. If `json-schema` is adoped fully we can use somthing like [ajv](https://ajv.js.org/) and automatically suport complex validations.

