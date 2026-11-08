# Metronome

Musical metronome extension for BBC micro:bit.

## Features

- BPM control
- Time signatures
- Whole, half, quarter, eighth and sixteenth notes
- Accented first beat
- LED beat display
- First beat event
- Other beat event
- Safe start/stop

## Example

```blocks
metronome.start(
    120,
    4,
    metronome.NoteValue.Quarter
)
```

## Events

```blocks
metronome.onFirstBeat(function () {

})
```

```blocks
metronome.onOtherBeat(function () {

})
```

## License

MIT
