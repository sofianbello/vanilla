import { LineLoop } from "three"
import * as dat from 'lil-gui'

export default class Debug
{
    constructor()
    {
        // this.active = window.location.hash === '#debug' // Enables Debug only when putting '#debug' in the URL e.g. localhost:8080/#debug
        this.active = this.ui = new dat.GUI() //Enables Debug without '#debug' in the URL
        if(this.active)
        {
            // this.ui = new dat.GUI()
        }
    }
}