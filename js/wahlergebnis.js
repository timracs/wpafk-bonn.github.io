var teilergebniscounter=0

function ergebnis_onload(){
    //alert(window.location)
    var url_string = window.location
    var url = new URL(url_string);
    var first_day = url.searchParams.get("start");
    var last_day = url.searchParams.get("end");
    var data = url.searchParams.get("data");
    if (data)
    {
        fill_out_form_base64(data)
    }
    else
    {
        if (first_day){
            first_day = new Date(first_day)
            $( "#datestart" ).datepicker( "setDate" ,first_day)
        }
        
        if (last_day){
            last_day = new Date(last_day)
            $( "#dateend" ).datepicker( "setDate" ,last_day)
        }
        if(first_day && last_day)
        { 
            var anz_wahltage = new Date(last_day).getDate() - new Date(first_day).getDate()
            for (var i = 0; i <= anz_wahltage;i++)
            {
                add_urnenstandort()
            }
        }
    }
    update()
}

function update(){
    var first_day = $( "#datestart" ).datepicker( "getDate" );
    var last_day  = $( "#dateend" ).datepicker( "getDate" );

    if(first_day != null && last_day != null){
    //updateDates(first_day, last_day);
    //updateBekanntmachungLink(first_day, last_day);
    }
    //setze möglichen Zeitraum für Frist zum Einreichen der Wahlvorschläge
    var temp_day_1 = new Date(first_day)
    var temp_day_2 = new Date(first_day)

    if (first_day)
    {
        temp_day_1.setDate(temp_day_1.getDate() - 10);
        
        temp_day_2.setDate(temp_day_2.getDate() - 13);
        $('#wv').datepicker('option',{
            minDate: temp_day_2,
            maxDate: temp_day_1 

            });

    }
    
    
    //konst sitzung    
    temp_day_1 = new Date(last_day)
    temp_day_1.setDate(temp_day_1.getDate() + 5);
    
    temp_day_2 = new Date(last_day)
    temp_day_2.setDate(temp_day_2.getDate() + 14);
    $('#konsti_datum').datepicker('option',{
        minDate: temp_day_1,
        maxDate: temp_day_2 

        }); 
    
    
    
        
    update_button_clicked()
          
}

function get_anzahl_sitze() {
    let zahl_sitze = 7
    if ($("#anzwahlberechtigte").val() > 500) {
        zahl_sitze = 11
    } else if ($("#anzwahlberechtigte").val() > 2000) {
        zahl_sitze = 19;
    } else if ($("#anzwahlberechtigte").val() > 1000) {
        zahl_sitze = 15;
    }
    return zahl_sitze;
}

function update_button_clicked(){
    update_fsvfsr()
    update_fs_name()
    
    var first_day = $( "#datestart" ).datepicker( "getDate" );
    var last_day  = $( "#dateend" ).datepicker( "getDate" );
    
    var formatstring = "dd.mm.yy";
    update_wahlzeitraum($.datepicker.formatDate( formatstring, first_day),$.datepicker.formatDate( formatstring, last_day))
    
    
    update_wahlleitung($("#wahlleitung").val(),$("#wahlleitungkontakt").val())
    
    update_konsti($("#konsti_datum").val(),$("#konsti_zeit").val(),$("#konsti_ort").val())
    
    update_teilergebnisse()
    
    update_stimmen()

    
    //begrenze Auswahlmöglichkeiten auf Wahlzeitraum
    var first_day = $( "#datestart" ).datepicker( "getDate" );
    var last_day  = $( "#dateend" ).datepicker( "getDate" );
    if(first_day != null && last_day != null){
        $(".datepicker" ).datepicker('option',{
        minDate: first_day,
        maxDate: last_day 

        });     }
    update_link() 
}

// updatet den Wochentag hinter den Eingabefeldern für erster und letzter Wahltag
// prüft außerdem ob die Tage legitim sind
function updateWochentag(first_day, last_day){
    var wochentag = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag' ]
  d_first = new Date(first_day)
  $('#wochentag_1').text( wochentag[d_first.getDay()])
  if (d_first.getDay() > 0 && d_first.getDay() < 4)
    $("#wochentag_1").css("color","green");
  else 
    $("#wochentag_1").css("color","red");
    
  d_last = new Date(last_day)
  $('#wochentag_2').text( wochentag[d_last.getDay()])
  if (d_last.getDay() > 0 && d_last.getDay() < 6 && (d_last - d_first)/1000/60/60/24 > 1 && (d_last - d_first)/1000/60/60/24 < 6)
    $("#wochentag_2").css("color","green");
  else 
    $("#wochentag_2").css("color","red");
}

//updatet das zu wählende Gremium
function update_fsvfsr(gremium)
{   
    var gremium = "Fachschaftsrat"
    var derdesfsvfsr = "des"
    var diederfsvfsr = "der"
    var diedenfsvfsr = "den"
    
    var zahl_sitze = 7
    if ($( "#anzwahlberechtigte" ).val() > 500)
    {
        zahl_sitze = 11;
        gremium = "Fachschaftsvertretung"
        derdesfsvfsr = "der"
        diederfsvfsr = "die"
        diedenfsvfsr = "die"
        
        if($( "#anzwahlberechtigte" ).val() > 2000)
            zahl_sitze = 19
        else if($( "#anzwahlberechtigte" ).val() > 1000)
            zahl_sitze = 15
    }
    if ($( "#fsvsatzung" ).is(":checked"))
    
    {
        gremium = "Fachschaftsvertretung"
        derdesfsvfsr = "der"
        diederfsvfsr = "die"
        diedenfsvfsr = "die"
    }
    for (const element of document.getElementsByClassName('fsvfsr')){
        element.innerHTML = gremium
    }
    for (const element of document.getElementsByClassName('derdesfsvfsr')){
        element.innerHTML = derdesfsvfsr
    }
    for (const element of document.getElementsByClassName('diederfsvfsr')){
        element.innerHTML = diederfsvfsr
    }
    for (const element of document.getElementsByClassName('diedenfsvfsr')){
        element.innerHTML = diedenfsvfsr
    }
    for (const element of document.getElementsByClassName('zahl_sitze')){
        element.innerHTML = zahl_sitze
    }
    
}

// updatet den Name der Fachschaft
function update_fs_name()
{
    for (const element of document.getElementsByClassName('fachschaft')){
        element.innerHTML = $( "#fsname" ).val()
    }
}


function update_wahlleitung(wahlleitung,kontakt)
{
    for (const element of document.getElementsByClassName('wahlleitung')){
        element.innerHTML = wahlleitung
    }
    for (const element of document.getElementsByClassName('wahlleitungkontakt')){
        element.innerHTML = kontakt
    }
}


function update_konsti(datum,zeit,ort)
{
    for (const element of document.getElementsByClassName('datum_uhrzeit_konstituierende_sitzung')){
        element.innerHTML = datum + ", " + zeit + " Uhr"
    }
    for (const element of document.getElementsByClassName('ort_konstituierende_sitzung')){
        element.innerHTML = ort
    }
}

//updatet den Wahlzeitraum
function update_wahlzeitraum(first_day,last_day)
{
    var zeitraum = "von "+ first_day + " bis " + last_day
   
    for (const element of document.getElementsByClassName('wahlzeitraum')){
        element.innerHTML = zeitraum
    }
}

function update_stimmen(){
   for (const element of document.getElementsByClassName('wahlberechtigte')){
        element.innerHTML = $( "#anzwahlberechtigte" ).val()
    }
    for (const element of document.getElementsByClassName('stimmen_ung')){
        element.innerHTML = $( "#anzahlstimmen_ung" ).val()
    }
    for (const element of document.getElementsByClassName('stimmen_g')){
        element.innerHTML = $( "#anzahlstimmen_g" ).val()
    }
    for (const element of document.getElementsByClassName('stimmen')){
        element.innerHTML = $( "#anzahlstimmen" ).val()
    }
    var wahlbeteiligung = $( "#anzahlstimmen" ).val() / $( "#anzwahlberechtigte" ).val()*100
    for (const element of document.getElementsByClassName('wahlbeteiligung')){
        element.innerHTML = wahlbeteiligung
    }
}

function update_teilergebnisse()
{   
    //lösche alle vorher hinzugefügten
    $(".ergebnis_script_added").each(function(){this.parentNode.removeChild(this)})
    
    var data = []
    var teilergenisse = document.getElementById("teilergebnis")
    //kopie erstellen
    teilergenisse = teilergenisse.cloneNode(true)
    //beispiel entfernen
    //urnenstandorte.removeChild(document.getElementById( "urnen_standort_hiddenexample" ))
    
    $( teilergebnis ).find(".teilergebnis").not( "#teilergebnis_hiddenexample" ).each(function(){data.push(get_teilergebnis(this))})

    //console.log(data)

    //sortiere data nach Anzahl abgegebener Stimmen
    data.sort((a, b) => (parseInt(a.stimmen) < parseInt(b.stimmen)) ? 1 : -1)
    
    var anzahl_sitze=get_anzahl_sitze()
    
    for( i = 0 ; i<  data.length;i++)
    {
        //alert(data[i])
        var vorlage = document.getElementById("ergebnis_hiddenexample")
        var clone = vorlage.cloneNode(true)
        clone.id = ""
        clone.style=""
        if (i < anzahl_sitze && data[i].stimmen > 0)
        {
            clone.setAttribute("class","ergebnis_script_added gewaehlt")
        }
        else
        {
            clone.setAttribute("class","ergebnis_script_added")
        }
        $( clone ).find(".teilergebnis_position" ).text(i)
        $( clone ).find(".teilergebnis_name" ).text(data[i].nachname)
        $( clone ).find(".teilergebnis_vorname" ).text(data[i].vorname)
        $( clone ).find(".teilergebnis_stimmen" ).text(data[i].stimmen)
        
        stimmen_g=$( "#anzahlstimmen_g" ).val()
        $( clone ).find(".teilergebnis_stimmen_prozent" ).text(data[i].stimmen/stimmen_g*100)
        document.getElementById("ergebnis_table").appendChild(clone)
    }
}

function get_teilergebnis(teilergebnis)
{
    var data = {}
    data.nachname = teilergebnis.getElementsByClassName("teilergebnis_name")[0].value
    data.vorname = teilergebnis.getElementsByClassName("teilergebnis_vorname")[0].value
    data.stimmen = teilergebnis.getElementsByClassName("teilergebnis_stimmen")[0].value
    return data
}

//fügt einen urnenstandort hinzu
function add_teilergebnis(number=teilergebniscounter)
{
    var vorlage = document.getElementById("teilergebnis_hiddenexample")
    var clone = vorlage.cloneNode(true);
    clone.id = ""
    clone.style=""
    clone.classList.add("teilergebnis" + number)
    $(clone).find('input').each(function(){this.setAttribute('name',this.getAttribute('name') + number)})
    if (number <= teilergebniscounter)
    {
        teilergebniscounter = number +1
    }
    vorlage.parentNode.appendChild(clone);

    
    return clone
}
function delete_teilergebnis(element)
{
    document.getElementById("teilergebnis").removeChild(element.parentNode.parentNode.parentNode)
}

function fill_out_form_base64(base64_string)
{
    fill_out_form(atob(base64_string))
}

function fill_out_form(json_string)
{
    var json = JSON.parse(json_string)
    for(key in json)
    {
        
        if(json[key]["name"].startsWith("urnenstandort"))
        {
            
            var regex = /\d+/
            var number = regex.exec(json[key]["name"])
            if (number)
            {
                number = number[0]
                if ($('.urnenstandort' + number).length == 0)
                {
                    add_urnenstandort(number)
                }
                $('.' + json[key]["name"]).each(function(){this.value = json[key]["value"]})
               
             }
        }
        if(json.hasOwnProperty(key))
            $('input[name='+json[key]['name']+']').val(json[key]['value']);
    }

}
