# Metronome

Advanced metronome extension for BBC micro:bit.

## Features

- BPM
- Time signatures
- LED beat indicator
- First beat accent
- Tap Tempo Wizard
- Tap countdown
- Success ✓
- Failure ✗
- First Beat Event
- Other Beat Event

## Tap Tempo

1. Start Tap Tempo
2. LED shows countdown
3. Press Button A rhythmically
4. After last tap:
   - ✓ success
   - BPM stored in Tap Result

## Example

```blocks
on button A pressed
    register tap

on button B pressed
    start tap tempo count 8
```

## License

MIT
