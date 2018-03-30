import * as React from "react";

export const ThemeContext = React.createContext('light');

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

interface ThemeHash<S> {
    light: S,
    dark: S,
}

type Theme = keyof ThemeHash<any>;

interface StyledProps<S> {
    styles: S;
}

type StyledComponent<P extends StyledProps<S>, S> = React.ComponentType<P>;

// Given a hash of themes and a component that wants one of those
// themes, return another component that grabs the theme name from
// context, selects the right styles, and passes them to the wrapped
// component.
//
// https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb
export default function withTheme<S>(styles: ThemeHash<S>) {
    return function <P extends StyledProps<S>>(Component: StyledComponent<P, S>) {
        return class WrappedComponent extends React.Component<Omit<P, keyof StyledProps<S>>> {
            render() {
                return (
                    <ThemeContext.Consumer>{(theme: Theme) => (
                        <Component styles={styles[theme]} {...this.props} />
                    )}</ThemeContext.Consumer>
                );
            }

            static displayName = `WithTheme(${Component.displayName})`;
        }
    }
}
