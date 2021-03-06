import Experience from "../Experience.js";
import Environment from './Environment.js'
import Floor from './Floor.js'
import Portal from './Portal.js'
import Picker from './Picker.js'
import * as THREE from 'three'



export default class World 
{
    constructor()
    {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.loaders = this.resources.loaders;
        this.debug = this.experience.debug;
        this.objectPicker = new Picker()

        
        this.resources.on('ready', () => 
        {
            // Setup

            // this.floor = new Floor()
            // this.portal = new Portal()
            // this.environment = new Environment()
            
            this.setDebug()
        })        
    }
    
    setDebug()
    {
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('World')
            this.objectPicker.setDebug()
            
            
            // Create Debug if Environment
            if(this.environment){
                this.debugEnvironment = this.debugFolder.addFolder('Environment')

                this.debugEnvironment
                .add(this.environment.sunLight, 'intensity')
                .name('SunLight')
                .min(0)
                .max(3)
                .step(0.0001)
                
                            this.debugEnvironment
                                .add(this.environment.sunLight.position, 'x')
                                .name('SunPosX')
                                .min(-10)
                                .max(10)
                                .step(0.0001)
                
                            this.debugEnvironment
                                .add(this.environment.sunLight.position, 'y')
                                .name('SunPosY')
                                .min(0)
                                .max(10)
                                .step(0.0001)
                
                            this.debugEnvironment
                                .add(this.environment.sunLight.position, 'z')
                                .name('SunPosZ')
                                .min(-10)
                                .max(10)
                                .step(0.0001)
                            
                            this.debugEnvironment
                            .add(this.environment.environmentMap, 'intensity')
                                .name('AmbientLight')
                                .min(0)
                                .max(1)
                                .step(0.0001)
                                .onChange(this.environment.environmentMap.updateMaterials)

            }
            
            // Create Debug if Cube
            if(this.cube){
                this.debugCube = this.debugFolder.addFolder('Cube')
                
                this.debugCube
                .add(this.cube.mesh.position, 'z')
                .name('Position Z')
                .min(0)
                .max(1)
                .step(0.0001)
            }
            
        }
        
    }
    update()
    {   
        if(this.objectPicker){
            this.objectPicker.update()
        }

    }




    
    


}