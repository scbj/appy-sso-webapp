<template lang="pug">
.MobileActivateLicenceNotAvailable
  .container
    span.feeling {{ $t('message.tooCramped') }}
    span.instructions {{ $t('message.tooCrampedInstructions') }}
    span.why
      | «&nbsp;
      span.content {{ $t('message.tooCrampedWhy') }}
      | &nbsp;»
</template>

<style lang="scss" scoped>
.MobileActivateLicenceNotAvailable {
  user-select: none;
  background-color: white;
  padding: 3rem;
  flex-direction: column;
  justify-content: center;
}

.container {
  max-width: 24rem;

  .feeling,
  .instructions,
  .why {
    display: block;
  }
}

.feeling {
  font-weight: 500;
  font-size: 1.9rem;
  opacity: .8;
}

.instructions {
  color: #9E3AA6;
  font-weight: 600;
  font-size: 2.5rem;
  margin: 1em 0;
  margin-bottom: 3em;
}

.why {
  font-size: 1.2rem;
  font-weight: 500;
  opacity: .8;

  .content {
    font-style: italic;
  }
}
</style>
