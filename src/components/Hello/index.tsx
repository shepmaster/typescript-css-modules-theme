import * as React from "react";

import withTheme from '../themeSelector';

import * as light from './css/light.css';
import * as dark from './css/dark.css';
const styles = { light, dark };

export interface HelloProps {
    compiler: string;
    framework: string;
    styles: typeof light;
}

const Hello: React.SFC<HelloProps> = ({ compiler, framework, styles }) => (
    <h1 className={styles.thing}>
        Hello from <span className={styles.word}>{compiler}</span> and {framework}!

    </h1>
);

export default withTheme(styles)(Hello);
