import Experience from "../Experience.js";
import Environment from './Environment.js'
import * as THREE from 'three'
import Floor from './Floor.js'
import Cube from "./Cube.js";
import Sphere from "./Sphere.js";



export default class World 
{
    constructor()
    {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.debug = this.experience.debug;


        // // Test Mesh
        // const testMesh = new THREE.Mesh(
        //     new THREE.BoxGeometry(1,1,1),
        //     new THREE.MeshStandardMaterial({color: 0xff1c77,wireframe: false})
        // )
        // testMesh.position.y = 0.7
        // this.scene.add(testMesh)
        
        
        this.resources.on('ready', () => 
        {
            // Setup
            this.floor = new Floor()
            // this.cube = new Cube()
            this.environment = new Environment()
            
            
            this.setDebug()
        })        
    }
    update()
    {   
        if(this.cube){
            this.cube.update()
        }
        if(this.sphere){
            this.sphere.update()
        }

    }
    setDebug()
    {
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('World')
            this.debugObjectPicker = this.debugFolder.addFolder('ObjectPicker')
            
            // Create ObjectPicker
            if(this.debugObjectPicker){
                const myObjects = {
                    cube: new THREE.BoxGeometry(1,1,1),
                    sphere: new THREE.SphereGeometry(0.7,12,64),
                }
                // Define Objects
                this.object = {cube: myObjects.cube, sphere: myObjects.sphere}
                this.debugObjectPicker.add(this.object, 'object', {Box:myObjects.cube, Sphere:myObjects.sphere})
                .name('Object')
                .onChange((value)=>{
                    if(value === myObjects.cube){
                        if(this.cube && !this.sphere){
                            this.cube.destroy()
                            this.cube = new Cube()
                        }else if(this.sphere){
                            this.sphere.destroy()
                            this.cube = new Cube()
                        }else {
                            this.cube = new Cube()
                            
                        }
                        
                    }else if(value === myObjects.sphere){
                        if(this.sphere && !this.cube){
                            this.sphere.destroy()
                            this.sphere = new Sphere() 
                        }else if(this.cube){
                            this.cube.destroy()
                            this.sphere = new Sphere() 
                        }else {
                            this.sphere = new Sphere() 
                        }
                    }
                
                })
            } 
            
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
    
    


}