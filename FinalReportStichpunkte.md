# Studienprojekt Supporting Usability Evaluation of WebGIS with Visual Analytics – Final Report
## Szenario für diesen Kurs
Ziel ist es, eine Studie zu analysieren und die Darstellung für den „Leser“ der Studie möglichst einfach zu gestalten. Inhalt der Studie waren Karten Interaktionen unter Verwendung von "off-screen indicators“ bzw. ohne. Teilgenommen haben 60 Personen die je 2 Aufgaben bekommen haben.


## Ansatz für die Durchführung
- Kibana installation
- Einlesen in „POST“ und „GET“ Abfragen in Postman
- Einlesen in verschiedenen Plugin Tutorials
- Verstehen von schon vorhandenen Plugins
   
Jede Woche haben wir unseren Scrum Master getauscht, das bedeutet, dass jeder von uns mehrere Male der Scrum Master war. Dieser war vor allem für die Erstellung neuer Sprints zuständig und der Gruppenorganisation in der jeweiligen Woche. Jeden Montag haben wir uns von 10 – 16 Uhr und Freitag (abhängig davon ob der Kurs stattfand) von 10 – 14 Uhr getroffen. Da wir uns auch an den anderen Tagen in der Uni gesehen haben wurde auch dort über Probleme/Erfolge ausgetauscht. Die Arbeit als Gruppe hat sehr gut funktioniert, da wir uns auch privat gut verstehen. Bei Problemen wurde gemeinsam nach einer Lösung gesucht.

## Unsere Technologien
1. GitKraken (inklusive des integrierten Dashboards „Glo“)
2. GitHub
3. Mattermost als Chat 
4. WhatsApp Gruppe zur Kommunikation
5. GoogleDrive 
6. D3.js
7. esri.js

## Unsere Visualisierungen (inklusive Fragestellung, Motivation, Erkenntnisse, Interaktions- und Filtermöglichkeiten für den Nutzer)
1. Timeline
2. Map- Levels
3. Map-Tracks
4. Pie-Chart
5. Average-Zoom-Level

## Kurze Anleitung für die Inbetriebnahme
Nach der Installation von Kibana und dem hinzufügen von elasticsearch.url: „http://giv-project16.uni-muenster.de:80“ in der kibana.yml, ist unser fertiges Dashboard unter UEWVA18 Dashboard zu finden. Die ergänzenden Plugins sind auf GitHub unter https://github.com/carobro/UEWVA18/tree/master/Plugins zu finden. Diese müssen vor dem Kibana Start in den Plugins Ordner geschoben werden. Danach sind sie auch in der Anwendung sichtbar

## Aufteilung der Teammitglieder
Zu beginn haben wir alle allein im Internet geschaut, welche Tutorials etc. für uns in Frage kommen würden. Nachdem wir ein paar Beispiel Plugins gefunden haben, haben wir versucht Ähnlichkeiten zu erkennen und uns sie gegenseitig vorgestellt. Jedem Gruppenmitglied wurde dann jeweils ein Plugin Typ zugeordnet. Dieser wurde dann eine Art Experte und hat versucht das Plugin anzupassen. Bei Problemen wurde gemeinsam auf das Plugin bei unseren Sitzungen geschaut. Die Sprints hat der jeweilige Scrum Master der Woche mit Hilfe der anderen Mitglieder erstellt und diese dann auch abgeschickt

## Future Work 
Da wir während des Semesters noch ein zweites großes Projekt am laufen hatten, mussten wir uns die Zeiten gut einteilen. Dies war auch der Grund warum viele andere diesen Kurs nicht belegen wollten/konnten. Wir haben uns trotzdem dazu entschieden und haben uns dafür zwei feste Tage freigehalten. Wenn wir mehr Zeit hätten, um uns auf das Projekt fokussieren zu können, wären uns sicher noch mehr Ideen eingefallen. Da wir auch nur zu viert waren, ist es möglich, dass wir etwas einseitig gedacht haben und so wenig neue Ideen entstanden sind.
Die Anpassung der Plugins auf genau diese Studie könnte noch vertieft werden

## Probleme
Die Kibana Installation hat uns leider sehr viele Probleme bereitet. Dies betraf vor allem zwei Gruppenmitglieder. Wir haben herausgefunden, dass Kibana erst ab mindestens 8GB Arbeitsspeicher einigermaßen problemlos läuft. Leider liefen zwei Rechner nur mit 4GB Arbeitsspeicher. So musste vor dem Start, sowie bei jeder größeren Änderung der „src“ Ordner gelöscht und wieder hinzugefügt werden. Außerdem dauerte der Start jedes Mal um die 7 min und lud sehr langsam. Dies war sehr Nervenaufreibend, und nahm auch oft den Spaß am Entwickeln der Plugins

## Fazit
