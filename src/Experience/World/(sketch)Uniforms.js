import Experience from "../Experience.js";
import EventEmitter from '../Utils/EventEmitter'

export default class uniforms extends EventEmitter
{
    constructor()
    {
        super()
        this.experience = new Experience()
        this.time = this.experience.time

        this.uniforms = {}
        this.uniforms.uTime = this.time
        
        window.requestAnimationFrame(() =>
        {
            console.log('Uniforms.js loaded');
            this.uTime()
        })
    }
    uTime()
    {
        console.log('make me "tick"');
        
    }
}