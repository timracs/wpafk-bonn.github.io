function bekanntmachung_onload(){
    //alert(window.location)
    var url_string = window.location
    var url = new URL(url_string);
    var first_day = url.searchParams.get("start");
    var last_day = url.searchParams.get("end");
    
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
    
        // auslage Wählendenverzeichnis
        temp_day_1 = $( "#wv" ).datepicker( "getDate" );
        if(temp_day_1){
            temp_day_1.setDate(temp_day_1.getDate() - 3);
            
            temp_day_2 = new Date(first_day)
            temp_day_2.setDate(temp_day_2.getDate() - 30);
            $('#auslage_wv_start').datepicker('option',{
                minDate: temp_day_2,
                maxDate: temp_day_1 

                });
        }
    }
    temp_day_1 = $( "#wv" ).datepicker( "getDate" );
    //temp_day_1.setDate(temp_day_1.getDate());
    
    temp_day_2 = $( "#auslage_wv_start" ).datepicker( "getDate" );
    temp_day_2.setDate(temp_day_2.getDate() +3);
    $('#auslage_wv_ende').datepicker('option',{
        minDate: temp_day_2,
        maxDate: temp_day_1 

        });   
    
    temp_day_1 = new Date(last_day)
    temp_day_1.setDate(temp_day_1.getDate() + 5);
    
    temp_day_2 = new Date(last_day)
    temp_day_2.setDate(temp_day_2.getDate());
    $('#auszaehlung_datum').datepicker('option',{
        minDate: temp_day_2,
        maxDate: temp_day_1 

        });       
    
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

function update_button_clicked(){
    update_fsvfsr()
    update_fs_name()
    
    var first_day = $( "#datestart" ).datepicker( "getDate" );
    var last_day  = $( "#dateend" ).datepicker( "getDate" );
    
    var formatstring = "dd.mm.yy";
    update_wahlzeitraum($.datepicker.formatDate( formatstring, first_day),$.datepicker.formatDate( formatstring, last_day))
    
    var wahlvorschlaege = $( "#wv" ).datepicker( "getDate" );
    update_wahlfristen($.datepicker.formatDate( formatstring, wahlvorschlaege),$("#wvtime").val())
    
    update_wahlleitung($("#wahlleitung").val(),$("#wahlleitungkontakt").val())
    
    update_frist_wahlberechtigung(first_day)
    
    update_waehlerverzeichnis($("#auslage_wv_start").val(),$("#auslage_wv_ende").val(),$("#auslage_wv_ort").val())
    
    update_auszaehlung($("#auszaehlung_datum").val(),$("#auszaehlung_zeit").val(),$("#auszaehlung_ort").val())
    
    update_konsti($("#konsti_datum").val(),$("#konsti_zeit").val(),$("#konsti_ort").val())
    
    update_urnenstandorte()

    
    //begrenze Auswahlmöglichkeiten auf Wahlzeitraum
    var first_day = $( "#datestart" ).datepicker( "getDate" );
    var last_day  = $( "#dateend" ).datepicker( "getDate" );
    if(first_day != null && last_day != null){
        $(".datepicker" ).datepicker('option',{
        minDate: first_day,
        maxDate: last_day 

        });     }
    
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
    
    var zahl_sitze = 11
    if ($( "#anzwahlberechtigte" ).val() > 500)
    {
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

function update_wahlfristen(wahlvorschlaege,wahlvorschlaege_zeit)
{
    for (const element of document.getElementsByClassName('frist_einreichung_wahlvorschlaege')){
        element.innerHTML = wahlvorschlaege
    }
    for (const element of document.getElementsByClassName('frist_einreichung_wahlvorschlaege_uhrzeit')){
        element.innerHTML = wahlvorschlaege_zeit
    }
    for (const element of document.getElementsByClassName('frist_briefwahlantraege')){
        element.innerHTML = wahlvorschlaege + ', ' + wahlvorschlaege_zeit
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

function update_frist_wahlberechtigung(first_day)
{
    var formatstring = "dd. MM yy"
    var temp_day = new Date(first_day)
    temp_day.setDate(temp_day.getDate() - 30);
    for (const element of document.getElementsByClassName('frist_wahlberechtigung')){
        element.innerHTML = $.datepicker.formatDate( formatstring, temp_day)
    }
}

function  update_waehlerverzeichnis(start,end,ort)
{
    for (const element of document.getElementsByClassName('start_auslage_waehlerverzeichnis')){
        element.innerHTML = start
    }
    for (const element of document.getElementsByClassName('ende_auslage_waehlerverzeichnis')){
        element.innerHTML = end
    }
    for (const element of document.getElementsByClassName('ort_auslage_waehlerverzeichnis')){
        element.innerHTML = ort
    }
}

function update_auszaehlung(datum,zeit,ort)
{
    for (const element of document.getElementsByClassName('datum_auszaehlung')){
        element.innerHTML = datum
    }
    for (const element of document.getElementsByClassName('uhrzeit_auszaehlung')){
        element.innerHTML = zeit
    }
    for (const element of document.getElementsByClassName('ort_auszaehlung')){
        element.innerHTML = ort
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

function update_urnenstandorte()
{   
    //lösche alle vorher hinzugefügten
    $(".urnenstandort_script_added").each(function(){this.parentNode.removeChild(this)})
    
    var data = []
    var urnenstandorte = document.getElementById("urnenstandorte")
    //kopie erstellen
    urnenstandorte = urnenstandorte.cloneNode(true)
    //beispiel entfernen
    //urnenstandorte.removeChild(document.getElementById( "urnen_standort_hiddenexample" ))
    
    $( urnenstandorte ).find(".urnenstandort").not( "#urnen_standort_hiddenexample" ).each(function(){data.push(get_urnenstandort(this))})

    //console.log(data)

    for( i = 0 ; i<  data.length;i++)
    {
        //alert(data[i])
        var vorlage = document.getElementById("urnen_standort_table_hiddenexample")
        var clone = vorlage.cloneNode(true)
        clone.id = ""
        clone.style=""
        clone.setAttribute("class","urnenstandort_script_added")
        $( clone ).find(".urnenstandort_datum" ).text(data[i].datum)
        $( clone ).find(".urnenstandort_beginn" ).text(data[i].beginn)
        $( clone ).find(".urnenstandort_ende" ).text(data[i].end)
        $( clone ).find(".urnenstandort_ort" ).text(data[i].ort)
        document.getElementById("urnenstandorte_table").appendChild(clone)
    }
}

function get_urnenstandort(urnenstandort)
{
    var data = {}
    data.datum = urnenstandort.getElementsByClassName("urnenstandort_datum")[0].value
    data.ort = urnenstandort.getElementsByClassName("urnenstandort_ort")[0].value
    data.beginn = urnenstandort.getElementsByClassName("urnenstandort_start")[0].value
    data.end = urnenstandort.getElementsByClassName("urnenstandort_end")[0].value
    return data
}

//fügt einen urnenstandort hinzu
function add_urnenstandort()
{
    var vorlage = document.getElementById("urnen_standort_hiddenexample")
    var clone = vorlage.cloneNode(true);
    clone.id = ""
    clone.style=""
    
    vorlage.parentNode.appendChild(clone);
    $( clone ).find(".datepicker" ).datepicker({beforeShowDay: $.datepicker.noWeekends, dateFormat: "dd.mm.yy", firstDay: 1, onSelect: function(){update();}});
    $('.clockpicker').clockpicker();
    
    //begrenze Auswahlmöglichkeiten auf Wahlzeitraum
    var first_day = $( "#datestart" ).datepicker( "getDate" );
    var last_day  = $( "#dateend" ).datepicker( "getDate" );
    if(first_day != null && last_day != null){
        $( clone ).find(".datepicker" ).datepicker('option',{
        minDate: first_day,
        maxDate: last_day 

        });     }
}
function delete_urnenstandort(element)
{
    document.getElementById("urnenstandorte").removeChild(element.parentNode.parentNode.parentNode)
}



function gen_link()
{
    var input_array = $('form').serializeArray()
    var input_string = btoa(JSON.stringify(input_array,null,2))
    console.log(input_string)
    console.log(JSON.parse(atob(input_string)))
    
    
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
        console.log(key)
        if(json.hasOwnProperty(key))
            $('input[name='+json[key]['name']+']').val(json[key]['value']);
    }

}

