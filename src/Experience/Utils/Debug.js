import { LineLoop } from "three"
import * as dat from 'lil-gui'

export default class Debug
{
    constructor()
    {
        this.active = window.location.hash === '#debug' // Enables Debug only when putting '#debug' in the URL e.g. localhost:8080/#debug
        // this.ui = new dat.GUI()
        if(this.active)
        {
            this.ui = new dat.GUI()
            console.log('debug created!');
        }
    }
}