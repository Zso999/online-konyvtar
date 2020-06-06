---
layout:     post
title:      "Online Könyvtár"
subtitle:   ""
date:       2020-06-05 9:00:00
author:     “Kiss Zsófi, Ottrok Veronika"
header-img: "img/projektek/konyvtar_header.png"
categories: projektek
---
<h2>Cél</h2>
Az emberek azóta szeretnek olvasni, mióta ez egy sokak által elsajátított képesség lett. A mai ember számára már nem ugyanazt jelenti az olvasás öröme, mint a régieknek, ám ez az évszázadok alatt nem sokat változott. Az igazi könyvmolyok számára pedig egy modern rendszerező könyvtár elengedhetetlen lehet, ha könnyen és gyorsan akarják könyveiket kezelni.

<h2>Működése</h2>
Felhasználói profil létrehozása után lehet felvenni a könyveket egyesével, vagy tömegesen csv fájl feltöltésével (ez utóbbihoz részletes leírás is tartozik:

<img src="{{ site.baseurl }}/img/projektek/konyvfelvetel.png" class="img-responsive" alt="Könyvek felvétele">

A könyvek részletei egy táblázatban tekinthetők meg, amely különféle funkciókkal segíti a rendszerezést:

<img src="{{ site.baseurl }}img/projektek/konyvtar_sajat_2.png" class="img-responsive" alt="Saját könyvtár”>

Az oldalon még található egy blog funkció is, ahol egy összetartó közösséget építhetnek az olvasni vágyók.

<h2>Megvalósítás</h2>
Először a projektünket <a href=”http://online-konyvtar.glitch.me/”>glitchen</a> hoztuk létre, ahol jelenleg is megtekinthető a demo változat, ám ott már jelenleg a legtöbb funkció nem működik, mert a projektünk elköltöztettük onnan. Erre azért volt szükség, mert sokszor nem akart megfelelően működni az oldal, így nem tudtunk hatékonyan dolgozni. Jelenleg Githubról üzemeltetjük az oldalunk egy <a href=”https://onlinekonyvtar.herokuapp.com/”>Heroku app</a> nevű felhő alapú szerver segítségével. A végső cél persze az lenne, hogy egy saját webszerverről üzemeltethessük az oldalunk, de ahhoz még sok munka szükséges.
