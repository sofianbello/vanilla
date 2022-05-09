import Experience from "../Experience";
import * as THREE from "three";
import fragment from '../Shaders/fragment.glsl'
import vertex from '../Shaders/vertex.glsl'


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
        this.setGeometry()

        this.setMaterial()
        this.setMesh()

    }
    setGeometry()
    {
        this.geometry = new THREE.SphereGeometry(.8,24.0,64)
    }

    setUniforms()
    {
        this.uniforms = {}
        this.uniforms.uTime = this.time.elapsed

    }
    setMaterial()
    {
        this.material = new THREE.ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
            uniforms:{
                uTime: {type:'f',value: this.uniforms.uTime}
            }
        })
        this.material.needsUpdate = true
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
        console.log('Sphere Loaded');
    }
    update()
    {
        this.material.uniforms.uTime.value = this.time.elapsed
        
        // console.log(this.uniforms.uTime);
    }
    

}