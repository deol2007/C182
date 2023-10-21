/**
 * The App function returns the Main component.
 * @returns The App component is returning the Main component.
 */
import React from 'react';
import Main from "./screens/Main";

/**
 * The `App` function returns the `Main` component, which will be rendered when the `App` component is
 * rendered.
 * @returns The `Main` component is being returned.
 */
export default function App() {
 /* The `return` statement is returning the `Main` component. This means that when the `App` component
 is rendered, it will display the contents of the `Main` component. */
  return (
    /* `<Main />` is a JSX syntax that is used to render the `Main` component. It is equivalent to
    calling the `Main` component as a function and returning its result. In this case, it means that
    the contents of the `Main` component will be displayed/rendered when the `App` component is
    rendered. */
    <Main />
  )
}