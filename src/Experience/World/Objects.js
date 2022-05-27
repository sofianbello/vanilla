import * as THREE from 'three'
import Cube from "./Cube";
import Sphere from "./Sphere";
import Torus from "./Torus";
import Portal from './Portal.js'

export default class Objects
{
    constructor()
    {
        // this.cube = new Cube()
        
    }
    cube()
    {
        this.newCube = new Cube()
    }
    sphere()
    {
        this.newSphere = new Sphere()
    }
    torus()
    {
        this.newTorus = new Torus()
    }
    portal()
    {
        this.newPortal = new Portal()
    }
        
    update()
    {
        if(this.newCube){
            this.newCube.update()
        }
        if(this.newSphere){
            this.newSphere.update()
        }
        if(this.newTorus){
            this.newTorus.update()
        }
        if(this.newPortal){
            this.newPortal.update()
        }
    }

}