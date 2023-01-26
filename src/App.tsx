import type { Component } from 'solid-js';
import axios from "axios";
import logo from './logo.svg';
import styles from './App.module.css';
import { ComparePreviousRanks } from "./components/utils/ComparePreviousRanks"
const App: Component = () => {

    function getQuotes() {
        axios
            .get('https://raw.githubusercontent.com/ValveSoftware/csgo/main/regional_standings/standings_europe.md')
            .then((response) => {
                console.log(response.data);
                ComparePreviousRanks(response.data)
            })
            .catch((error: any) => {
                console.error(error);
            });
    }
    getQuotes()

    return (
        <div class={styles.App}>
            <header class={styles.header}>
                <img src={logo} class={styles.logo} alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    class={styles.link}
                    href="https://github.com/solidjs/solid"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn Solid
                </a>
            </header>
        </div>
    );
};

export default App;
