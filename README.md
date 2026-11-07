# Metronome

Metronome extension for BBC micro:bit.

## Features

- BPM control
- Time signatures
- Whole, half, quarter, eighth and sixteenth notes
- Accented first beat
- Start / Stop
- Custom frequencies

## Example

```blocks
metronome.start(
    120,
    4,
    metronome.NoteValue.Quarter
)
```

Creates a 4/4 metronome at 120 BPM.

The first beat is played with a higher pitch.

## Available Blocks

- start metronome
- stop metronome
- metronome running
- set accent frequency
- set beat frequency
- restart metronome

## License

MIT
