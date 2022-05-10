import * as THREE from 'three'
import Experience from "../Experience.js";
import Objects from "./Objects.js";


export default class ObjectPicker
{
    constructor()
    {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.debug = this.experience.debug;
        
        this.objects = new Objects()
    }
    update()
    {   
        if(this.objects){
            this.objects.update()
        }
        
    }
    setDebug()
    {
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.active
            this.debugObjectPicker = this.debugFolder.children[0].addFolder('Object Picker')
            
            // Create ObjectPicker

            if(this.debugObjectPicker){
                const myObjects = {
                    cube: new THREE.BoxGeometry(1,1,1),
                    sphere: new THREE.SphereGeometry(0.7,12,64),
                    torus: new THREE.TorusGeometry(1.5,1.0,1.5)
                }
                // Define Objects
                this.object = {}
                this.debugObjectPicker.add(this.object, 'object', {Box:myObjects.cube, Sphere:myObjects.sphere, Torus: myObjects.torus})
                .name('Geometry')
                .onChange((value)=>
                {
                    switch(value){
                        case myObjects.cube:
                            if( this.objects ){
                                if(this.objects.newSphere){
                                    this.objects.newSphere.destroy()
                                }
                                if( this.objects.newTorus ){
                                    this.objects.newTorus.destroy()
                                }
                                this.object = this.objects.cube()
                            }else{
                                this.object = this.objects.cube()
                            }
                            break;
                            
                        case myObjects.sphere:
                            if( this.objects ){
                                if(this.objects.newCube){
                                    this.objects.newCube.destroy()
                                }
                                if( this.objects.newTorus ){
                                    this.objects.newTorus.destroy()
                                }
                                this.object = this.objects.sphere()
                            }else{
                                this.object = this.objects.sphere()
                            }
                            break;     
                            
                        case myObjects.torus:
                            if( this.objects ){
                                if(this.objects.newCube){
                                    this.objects.newCube.destroy()
                                }
                                if( this.objects.newSphere ){
                                    this.objects.newSphere.destroy()
                                }
                                this.object = this.objects.torus()
                            }else{
                                this.object = this.objects.torus()
                            }
                            break;     
                    }
                })
            } 
            
            
            
            
            
        }
    }
}