# Mahadevan Syam | Mission Control Portfolio

A static, dependency-free portfolio site (HTML + CSS + JavaScript). No build step.

## Files

```
index.html        page content
style.css         all styling
script.js         interactions (+ the two things you will edit: CONFIG and CERTIFICATES)
certificates/     put your certificate scans here
```

## 1. Add your certificates

1. Copy each scan into the `certificates/` folder (JPG, JPEG, PNG or WEBP).
2. Name it to match the `file` value of its entry in `CERTIFICATES` at the top of `script.js`, for example:

| Certificate | File name |
|---|---|
| ISRO VSSC internship | `isro-vssc-internship.jpg` |
| iOrbit internship | `iorbit-embedded-internship.jpg` |
| C-DAC internship | `cdac-project-internship.jpg` |
| IEEE SPS chairperson | `ieee-sps-chairperson.jpg` |
| Patent publication | `patent-quad-core-vco.jpg` |
| Book chapter | `book-chapter-esl-iot.jpg` |
| Trinity Grade 5 | `trinity-grade5-keyboard.jpg` |
| B.Tech degree | `vit-btech-ece.jpg` |

Cards with a scan become clickable (full-size viewer with arrow-key navigation). Cards without a
scan still display as a tidy badge, so you can add files gradually. To add or remove a
certificate, edit the `CERTIFICATES` list; `cat` must be `internship`, `leadership`, `achievement`,
`music` or `education`.

PDF certificates: convert them to images first (a screenshot works fine).

## 2. Add your LinkedIn / GitHub links

At the top of `script.js`, fill in `CONFIG.linkedin` (and optionally `CONFIG.github`).

## 3. Publish on GitHub Pages

1. Create a new repository on GitHub (for a personal site, name it `<your-username>.github.io`).
2. Upload everything in this folder (`index.html`, `style.css`, `script.js`, `certificates/`, `README.md`) to the repository root.
3. Go to **Settings -> Pages**, set **Source** to **Deploy from a branch**, choose `main` and `/ (root)`, and save.
4. After a minute or two your site is live at `https://<your-username>.github.io/`.

## Fun stuff to know about

- **Launch sequence** plays on a visitor's first visit per browser session (skip button included). Footer link: "Replay launch".
- **Altimeter** on the right tracks scroll as altitude, with PSLV-style stage labels (solid, liquid, solid, liquid).
- **Jam session**: a playable piano (mouse, touch or computer keyboard).
- Respects `prefers-reduced-motion`, and works on phones.

## Local preview

Just double-click `index.html`, or run `python3 -m http.server` in this folder and open http://localhost:8000.
(Certificate scans load from the `certificates/` folder either way.)
