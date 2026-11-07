# Metronome

Advanced musical metronome for BBC micro:bit.

## Features

- BPM control
- Time signatures
- LED beat display
- First beat accent
- Tap Tempo
- Reset Tap Tempo
- Current BPM
- Current Beat
- On Beat events
- Safe Start and Stop

## Example

```blocks
input.onButtonPressed(Button.A, function () {

    let bpm =
        metronome.tapTempo()

    if (bpm > 0) {
        basic.showNumber(bpm)
    }
})
```

## Starting Metronome

```blocks
metronome.start(
    120,
    4,
    metronome.NoteValue.Quarter
)
```

## Event Example

```blocks
metronome.onBeat(
    metronome.BeatNumber.One,
    function () {

    }
)
```

## License

MIT
