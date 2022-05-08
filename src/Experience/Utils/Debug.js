import { LineLoop } from "three"
import * as dat from 'lil-gui'

export default class Debug
{
    constructor()
    {
        console.log('debug loading...');
        this.active = window.location.hash === '#debug'
        if(this.active)
        {
            this.ui = new dat.GUI()
            console.log('debug created!');
        }
    }
}