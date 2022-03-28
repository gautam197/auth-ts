function nonLeakingLoop () {
    delay(1)
      .then(() => {
        console.log(`Tick ${Date.now()}`)
        nonLeakingLoop()
      })
  }


  nonLeakingLoop()