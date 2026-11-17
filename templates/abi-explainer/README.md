# abi-explainer

Remotion-Vorlage für die Erklärvideos der Abi-Lernplattform. Stil: Video-Stil im Obsidian-Projekt
„Abi-Lernplattform“ (Swiss Motion, Papier `#F4F5F7`, Fachfarbe als einzige Signalfarbe, Einrasten mit
`cubic-bezier(.7,0,.2,1)`). Inhalt folgt der Lektion im interaktiven E-Book (Repo `Interaktive-Ebooks-EP`).

## Ablauf
```bash
npm install
python3 musik/video_musik.py 0.1     # Musik (public/musik-0.1.wav) + Taktplan (src/timing.json)
npm run studio                       # Vorschau
npm run render                       # out/video-0-1.mp4
```
`video_musik.py` braucht den Python des Lemo-Opuscar-Samplers (z. B. `$LEMO/.venv/bin/python`) und ffmpeg.

## Aufbau
- `src/timing.json` ist die einzige Zeitquelle: Tempo und die Teile des Skripts in Takten. Jede Szene beginnt
  auf einer Taktgrenze, jeder Auftritt in einer Szene ist in Schlägen angegeben (`useSchlag()`), damit er auf
  der Musik landet.
- `src/bausteine/`: Grund (Fachkürzel, Lektionsnummer), Kopf, Karte (Definition, Merksatz, neutral), Auf
  (Maske), Wisch, Abgang, Rechenweg, Koordinatensystem, Kurve, Punkt.
- `src/szenen/`: eine Datei pro Skript-Teil.
- `musik/musik.py`: Musik-Baukasten (Elektronisch, tiefe Marimba, Lo-Fi; eigene Fassung je Lektion).

Video 0.1 ist eine Fassung ohne Sprecher. Mit Sprecher werden die Teile nach der Aufnahme neu getaktet
(Takte in `video_musik.py`) und die Musik unter der Stimme mit `duck()` abgesenkt.
