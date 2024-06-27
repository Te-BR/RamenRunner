var newPontos = 0
const proximityTriggerComponent = {
  schema: {
    radius: {type: 'number', default: 1},
  },
  init() {
    this.pos = this.el.object3D.position
    
  },
  tick() {
    // get character position
    const characterPos = document.getElementById('character').object3D.position
    const pontos = document.getElementById('pontosN')

    // calculate distance between character and this entity
    const distance = Math.hypot(characterPos.x - this.pos.x, characterPos.z - this.pos.z)
    // enter proximity radius
    if (distance <= this.data.radius) {
      // cria som de mordida
      const chomp1 = document.querySelector('#chomp1').components.sound
      const chomp2 = document.querySelector('#chomp2').components.sound
      //const music = document.querySelector('#music').components.sound

      // cria posição aleatoria
      const newPositionX = Math.random() * (8 - -8) + -8
      const newPositionY = Math.random() * (-8 - -5) + -5
      const newPosition =  `${newPositionX} 0.5 ${newPositionY}`

      //escolhe som de mordida
      const  som = Math.random() * (2 - -2) + -2
      if (som > 0) {
        chomp1.stopSound()
        chomp2.stopSound()
        chomp1.playSound()
      } else {
        chomp1.stopSound()
        chomp2.stopSound()
        chomp2.playSound()
      }

      // aumenta pontuação

      newPontos++

      // debug
      console.log(newPosition)
      console.log(pontos.innerHTML)

      // atualiza pontuação e posiçao
      this.el.setAttribute('position', newPosition)
      document.getElementById('pontosN').innerHTML =  `Pontos: ${newPontos}`
    }

    // leave proximity radius
    if (distance > this.data.radius && this.el.classList.contains('inside')) {
      this.el.classList.remove('inside')
      this.el.setAttribute('visible', 'true')
    }
  },
}

export {proximityTriggerComponent}
