import * as React from "react";
import * as ReactDOM from "react-dom";

import { ThemeContext } from './components/themeSelector';
import Hello from "./components/Hello";

class Root extends React.Component<{}, { theme: 'dark' | 'light' }> {
    constructor(props: {}) {
        super(props);
        this.state = {
            theme: 'dark',
        }
    }

    toggleTheme = () => {
        if (this.state.theme === 'light') {
            this.setState({ theme: 'dark' });
        } else {
            this.setState({ theme: 'light' });
        }
    }

    render() {
        return (
            <ThemeContext.Provider value={this.state.theme}>
                <Hello compiler="TypeScript" framework="React" />
                <button onClick={this.toggleTheme}>TOGGLE</button>
            </ThemeContext.Provider>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById("example"));
