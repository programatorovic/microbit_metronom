# Metronome

Professional metronome extension for BBC micro:bit.

## Features

- BPM tempo control
- Time signatures
- Quarter, half, whole, eighth and sixteenth notes
- Accented first beat
- Start and stop blocks
- Custom beat frequencies
- Safe restart protection

## Example

```blocks
metronome.start(
    120,
    4,
    metronome.NoteValue.Quarter
)
```

4/4 metronome at 120 BPM.

## Blocks

- start metronome
- stop metronome
- metronome running
- set accent frequency
- set beat frequency
- restart metronome

## License

MIT
