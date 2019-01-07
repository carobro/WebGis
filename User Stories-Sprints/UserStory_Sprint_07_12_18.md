# Supporting Usability Evaluation of WebGIS with Visual Analytics   
## User Stories

**Verschiedene Analysetools**   

- Als Nutzer möchte ich eine Auswahl an Analyse Tools haben, um die für meine Daten am besten geeignetsten Analysen durchführen zu können:

  - Als Nutzer möchte ich ein Visualisierungstool haben, um die verschiedenen Mausaktionen pro Zeiteinheit zu analysieren.

  - Als Nutzer möchte ich ein Visualisierungstool mit einer Karte haben, auf dem auch die unterschiedlichen Zoomstufen visualisiert sind, um zu sehen, in welchen Karten Bereichen weiter raus und in welchen weiter rein gezoomt wurde. 

  - Als Nutzer möchte ich eine Timeline haben, um vergleichen zu können, wie schnell die Nutzer mit der Studie fertig waren, in Abhängigkeit von den Indikatoren.

  - Als Nutzer möchte ich eine Timeline haben, die die Anzahl der ausgewählten Grundstücke/Hotels in Abhängigkeit der Zeit anzeigt.

  - Als Nutzer möchte ich eine Timeline haben, die die Startzeit und den Zeitpunkt des Exportes der ausgewählten Grundstücke/Hotels anzeigt, um Unterschiede in der Geschwindigkeit der durchgeführten Nutzerstudien zu sehen (mit und ohne Indikatoren). 


## Sprintplanung (ab dem 07.12.2018)
**Scrum Master für die nächsten zwei Wochen:**

 - Anika Graupner
 
**Bereits erledigt:**

- Ordnerstruktur steht fest (Index.js, …)
- Icons für Kibana
- erste Libraries gefunden 
- Test - Dashboard erstellt
- Filter zum Vergleich der beiden Gruppen (mit Indikator/ ohne Indikator) auf dem Dashboard (Hotels, Grundstücke)
- Folgende Plugins (vorerst) fertiggestellt:
  - Swimlane
  - Karte zur Darstellung der Veränderungen der “map-center”
Folgende Plugins begonnen:
Dotplot

**User Stories die wir beantworten können**

- Als Nutzer möchte ich eine Visualisierungstool haben, um die verschiedenen Zoomlevel zu erkennen. 

- Als Nutzer möchte ich ein Visualisierungstool mit einer Karte haben, um die Nutzer- Interaktionen auf der Karte sehen zu können, z.B. wo auf der Karte geklickt worden ist.

## Sprint / nächste Schritte (16.11.08 - 07.12.18)

- begonnene Plugins fertigstellen 
  - Dotplot
- GeoJson mit Grundstücken der Karte hinzufügen 
- neue Plugins beginnen:
  - Timeline (vlt. mit Timelion)
  - Stack-Chart
  - Karte mit Zoomstufen 

**Probleme und Fragen:**

- wenn wir Kibana starten mit einem neuen Plugin (was wir angepasst haben), passiert
es immer, dass Kibana auch startet, die Oberfläche aber nicht mehr richtig formatiert
ist und einige Anwendungen wie das Dashboard funktionieren gar nicht mehr
- es fällt uns schwer im Code zu erkennen, welche Daten genau visualisiert werden,
also ob von allen Teilnehmern die Daten dargestellt werden oder wie sich das
einstellen lässt (requestHandler, responseHandler)
- inwieweit dürfen wir jetzt schon bestehende Plugins verwenden bzw. ist die
eigentliche Aufgabe die Plugins selber zu schreiben oder die Daten an sich
darzustellen
- haben wirklich alle 60 Teilnehmer alle 4 Szenarien durchgespielt, oder jeweils 30
Personen mit Indikatoren und 30 Personen ohne Indikatoren
(between-group-design)
- Probleme beim Hinzufügen der Grundstücke in die Karte (Koordinatensystem, Links
in der Scriptdatei)
- wir würden gerne noch einmal den Aufbau der erfassten Daten besprechen
 - z.B. was bedeuten die einzelnen “messages”, was zählt als Mausklick, was
nicht

