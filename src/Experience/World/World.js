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
                this.debugObjectPicker.add(this.object, 'object', [myObjects.cube, this.object.sphere])
                .name('Object')
                .onChange((value)=>{
                    if(value === myObjects.cube){
                        console.log('Cube selected');
                        if(this.cube){
                            console.log('Cube already present');
                        }else {
                            this.cube = new Cube()

                        }
                            
                    }else if(value === myObjects.sphere){
                        if(this.sphere){
                            console.log('Sphere already present');
                        }
                        this.sphere = new Sphere()
                    }else 
                    {console.log('no object');
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
    destroy()
    {

        // Traverse Scene
        this.scene.traverse((child) =>
        {
            // console.log(child);
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()
                // console.log(child.geometry);
                for(const key in child.material)
                {
                    // console.log(key);
                    const value = child.material[key]
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
                
            }
            // }
        })
        // Traverse Scene
        // this.scene.traverse((child) =>
        // {
        //     if(child instanceof THREE.Mesh)
        //     {
        //         child.geometry.dispose()
        //         for(const key in child.material)
        //         {
        //             const value = child.material[key]
        //             if(value && typeof value.dispose === 'function')
        //             {
        //                 value.dispose()
        //             }
        //         }
        //     }
        // })

        // if(this.debug.active)
        // {
            // this.debug.ui.destroy()
        // }
    }


}