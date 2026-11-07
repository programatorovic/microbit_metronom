# Metronome

Advanced musical metronome for BBC micro:bit.

## Features

- BPM control
- Time signatures
- LED beat display
- First beat accent
- Custom frequencies
- TAP tempo
- On Beat events
- Current BPM
- Current Beat
- Safe Start / Stop

## Example

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
