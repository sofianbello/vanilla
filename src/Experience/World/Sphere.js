import Experience from "../Experience";
import * as THREE from "three";
import fragment from '../Shaders/Shader_01/fragment.glsl'
import vertex from '../Shaders/Shader_01/vertex.glsl'


export default class Sphere 
{
    constructor()
    {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time
        this.debug = this.experience.debug;

        this.setUniforms()
        this.setParams()
        this.setGeometry()

        this.setMaterial()
        this.setMesh()
        this.setDebug()

    }
    setParams()
    {
        this.radius = 0.8
        this.wSegments = 24
        this.hSegments = 32
        
    }
    setGeometry()
    {
        this.geometry = new THREE.SphereGeometry(this.radius,this.wSegments,this.hSegments)
    }

    setUniforms()
    {
        this.uniforms = {}
        this.uniforms.uTime = this.time.elapsed
        this.uniforms.uSpeed = 0.0005 // Default Speed


    }
    setMaterial()
    {
        this.material = new THREE.ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
            uniforms:{
                uTime: {type:'f',value: this.uniforms.uTime},
                uSpeed: {type:'f',value: this.uniforms.uSpeed}
                
            },
            side: THREE.DoubleSide
        })
    }
    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.y = 0.5
        this.scene.add(this.mesh)
        this.mesh.traverse((child)=>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.receiveShadow = true
            }
        })
    }
    setDebug()
    {
        if(this.debug.active){
            this.debugFolder = this.debug.active
            console.log(this.debugFolder.children[0].children[3]);
            for(let i = 0; i< this.debugFolder.children[0].children.length; i++) // Loop through all Debug Objects
            {
                if(this.objectControls )
                {
                    console.log('do nothing');
                }
                else
                {

                    this.objectControls = this.debugFolder.children[0].children[3].addFolder('Sphere Controls')
                }
            }
            // this.objectControls = this.debugFolder.children[0].children[3].addFolder('Sphere Controls')
            
            // Geometry Controls
            this.objectControls.add(this, 'radius').min(0).max(20).step(0.0001).name('Radius')
            .onChange((value)=>
            {
                this.radius = value;
                this.updateMesh()
            })
            
            this.objectControls.add(this.mesh.position, 'x').min(-2).max(2).step(0.0001).name('Position X')
            this.objectControls.add(this.mesh.position, 'y').min(-2).max(2).step(0.0001).name('Position Y')
            this.objectControls.add(this.mesh.position, 'z').min(-2).max(2).step(0.0001).name('Position Z')
            // Uniforms
            this.objectControls.add(this.mesh.material.uniforms.uSpeed, 'value').min(-0.15).max(0.15).step(0.000001).name('uSpeed')
            .onChange((value)=>
            {
                this.uniforms.uSpeed = value;
            })
        }
    }
    update()
    {
        this.material.uniforms.uTime.value = this.time.elapsed
        this.material.uniforms.uSpeed.value = this.uniforms.uSpeed;
        // console.log(this.uniforms.uTime);
    }
    updateMesh()
    {
        this.mesh.traverse((child)=>
        {
            if(child instanceof THREE.Mesh)
            {
                // child.geometry.dispose()
                child.geometry = this.geometry
            }
        })
        this.setGeometry()

    }
    destroy()
    {
        // Traverse Scene
        this.scene.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()
                for(const key in child.material)
                {
                    const value = child.material[key]
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
                
            }

        })
        this.scene.remove(this.mesh)
        this.objectControls.destroy()
    }

}