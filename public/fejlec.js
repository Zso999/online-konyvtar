document.write(`
  <!--link rel="stylesheet" href="https://cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css"-->
  <div class="header">
    <a href="../index.html">
      <img
        id="head1"
        src="https://cdn.glitch.com/92265b33-682a-4100-b469-e11a9dd840f9%2Fkonyvtar%20(2).jpeg?v=1585416018050"
        alt="O"
      />
      <img
        id="head2"
        src="https://cdn.glitch.com/92265b33-682a-4100-b469-e11a9dd840f9%2Fkonyvtar%20felirat.png?v=1585416649214"
        alt="nline Könyvtár"
      />
    </a>
  </div>

  <div id="navbar" class="menu">
    <a href="../blog/blog.html">Blog</a>
    <!--a id="kolcson_gomb" href="../kolcson/kolcson.html">Könyvkölcsönzés</a-->
    <div class="dropdown">
      <a class="dropbtn">Könyvtár</a>
      <div class="dropdown-content">
        <a href="../konyv/sajatkonyvtar.html">Saját könyvtáram</a>
        <a id="kfelvev" href="felvesz/konyvfelvetel.html">Könyvek felvétele</a>
        <a href="../konyv/kivansaglista.html">Kívánságlistám</a>
      </div>
    </div>
    <div class="dropdown2">
      <a class="dropbtn2" id="profilgomb"></a>
      <div id="profillista" class="dropdown2-content">
        <a href="../profilom.html">Profil</a>
        <a id="kilepes">Kilépés</a>
      </div>
    </div>
    <a id="belepes" href="../signin.html">Belépés</a>
    <a id="regisztracio" href="../regiszt.html">Regisztráció</a>
  </div>
  `);
