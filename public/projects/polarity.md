# Projekte

## 1. [Automatic documentation for Polarity lang](https://github.com/Phil-Ebsworth/polarity)

**Projektbeschreibung:**

Dieses Projekt ist meine Bachelorarbeit und befasst sich mit der automatischen Generierung von HTML-Dokumentation für die experimentelle Programmiersprache Polarity. Polarity basiert auf den dualen Konzepten „Daten“ und „Codaten“ und kombiniert funktionale und objektorientierte Programmierparadigmen. Ziel der Arbeit ist es, Polarity-Quellcodes in einen untypisierten Syntaxbaum zu parsen und diesen dann mit Rust-Bibliotheken wie `pretty` und `Askama` in gut strukturierte, template-basierte HTML-Seiten zu transformieren.

Die Trennung von Inhalt und Präsentation (über Askama-Templates und eine zentrale CSS-Stylesheet-Datei) ermöglicht es dem System, für jedes Polarity-Modul ein separates HTML-Dokument zu erstellen, das Syntax-Hervorhebungen und Hyperlinks enthält.

**Technologien:**
- Rust
- Askama (Template-Engine)
- Pretty (Textformatierung)
- HTML, CSS

**Herausforderungen:**
- Die Entwicklung eines robusten Parsers, der Polarity-Code korrekt verarbeitet.
- Integration von Rust-Bibliotheken, um den HTML-Dokumentationsprozess zu automatisieren.

**Ergebnisse:**
- Automatisch generierte HTML-Dokumentation für jedes Polarity-Modul.
- Gut strukturierte, wartbare und leicht anpassbare Dokumente, die die Polarity-Syntax und -Semantik veranschaulichen.

