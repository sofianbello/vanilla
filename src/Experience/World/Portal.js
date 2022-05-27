import * as THREE from 'three';
import Experience from "../Experience"

export default class Portal
{
    constructor()
    {
        // console.log('Portal start');
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Debug
        if(this.debug)
        {
            // this.debugFolder = this.debug.ui.addFolder('Portal')
        }
        
        // Setup
        this.resource = {}
        this.resource.bakedMesh = this.resources.items.portalModel.scene.children
        .find( child => child.name === 'baked')

        this.resource.portalLightMesh = this.resources.items.portalModel.scene.children
        .find( child => child.name === 'Portal')
        
        this.resource.lampAMesh = this.resources.items.portalModel.scene.children
        .find( child => child.name === 'poleLightA')
        
        this.resource.lampBMesh = this.resources.items.portalModel.scene.children
        .find( child => child.name === 'poleLightB')
        
        this.resource.lampCMesh = this.resources.items.portalModel.scene.children
        .find( child => child.name === 'poleLightC')
        
        this.resource.lampDMesh = this.resources.items.portalModel.scene.children
        .find( child => child.name === 'poleLightD')

        
        // Call functions
        this.setTexture()
        this.setMaterial()
        this.setModel()
        


    }

    setTexture()
    {
        this.texture = this.resources.items.portalTexture
        this.texture.flipY = false
        this.texture.encoding = THREE.sRGBEncoding

        this.texture.wrapS = THREE.RepeatWrapping
        this.texture.wrapT = THREE.RepeatWrapping
        

    }
    setMaterial()
    {

        this.bakedMaterial = new THREE.MeshBasicMaterial({
            map: this.texture,
        })
    }
    setModel()
    {   
        // World
        this.bakedModel = this.resource.bakedMesh
        this.bakedModel.material = this.bakedMaterial
        this.bakedModel.position.y += 0.001
        this.bakedModel.scale.set(1.5, 1.5, 1.5)
        
        // Portal light

        this.portalModel = this.resource.portalLightMesh
        this.portalModel.position.y += 0.295
        this.portalModel.position.x += 0.08
        this.portalModel.position.z -= 1.65
        this.portalModel.scale.set(1.5, 1.5, 1.5)
        // this.portalModel.material = this.material

        // Pole lights
        this.lampAModel = this.resource.lampAMesh
        this.lampBModel = this.resource.lampBMesh
        this.lampCModel = this.resource.lampCMesh
        this.lampDModel = this.resource.lampDMesh
        
        
        this.scene.add(this.bakedModel, this.portalModel)
        // this.scene.add(this.lampAModel, this.lampBModel, this.lampCModel, this.lampDModel)


        // Shadows
        this.bakedModel.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.receiveShadow = true
            }
        })
    }
    setAnimation()
    {
        this.animation = {}
        this.animation.mixer = new THREE.AnimationMixer(this.model)

        this.animation.actions = {}

        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[1])
        this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[2])
        
        
        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play()

        this.animation.play = (name) =>
        {
            const newAction = this.animation.actions[name]
            const oldAction = this.animation.actions.current

            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(oldAction, 1)

            this.animation.actions.current = newAction
        }

        // Debug
        if(this.debug.active)
        {
            const debugObject = {
                playIdle: () => { this.animation.play('idle') },
                playWalking: () => { this.animation.play('walking') },
                playRunning: () => { this.animation.play('running') }
            }
            this.debugFolder.add(debugObject, 'playIdle')
            this.debugFolder.add(debugObject, 'playWalking')
            this.debugFolder.add(debugObject, 'playRunning')
        }
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
        // this.objectControls.destroy()
        
    }
    update()
    {
        // this.animation.mixer.update(this.time.delta * 0.001)
    }
}