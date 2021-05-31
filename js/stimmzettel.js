var kandidaturcounter = 0

function stimmzettel_onload(){
    //alert(window.location)
    var url_string = window.location
    var url = new URL(url_string);
    //var first_day = url.searchParams.get("start");
    //var last_day = url.searchParams.get("end");
    var data = url.searchParams.get("data");
    if (data)
    {
        fill_out_form_base64(data)
    }
    
    update()
}

function update(){
   
    
        
    update_button_clicked()
          
}

function update_button_clicked(){
    update_fsvfsr()
    update_fs_name()
    
    update_kandidaturen()
 
    update_link() 
    
    update_format()
}


//updatet das zu wählende Gremium
function update_fsvfsr(gremium)
{   
    var gremium = "Fachschaftsrat"
    var derdesfsvfsr = "des"
    var diederfsvfsr = "der"
    var diedenfsvfsr = "den"
    var zurzumfsvfsr = "zum"
    
    var zahl_sitze = 11
    if ($( "#anzwahlberechtigte" ).val() > 500)
    {
        gremium = "Fachschaftsvertretung"
        derdesfsvfsr = "der"
        diederfsvfsr = "die"
        diedenfsvfsr = "die"
        zurzumfsvfsr = "zur"
        
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
        zurzumfsvfsr = "zur"
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
    for (const element of document.getElementsByClassName('zurzumfsvfsr')){
        element.innerHTML = zurzumfsvfsr
    }
    for (const element of document.getElementsByClassName('zahl_sitze')){
        element.innerHTML = zahl_sitze
    }
    document.getElementById("zahl_sitze").value = zahl_sitze
    
}

function shuffle_children(parent){
    for (var i = parent.children.length; i >= 0; i--) {
        parent.appendChild(parent.children[Math.random() * i | 0]);
    }
}

function update_kandidaturen()
{   
    //lösche alle vorher hinzugefügten
    $(".kandidatur_script_added").each(function(){this.parentNode.removeChild(this)})
    
    var data = []
    var kandidaturen = document.getElementById("kandidaturen")
    //kopie erstellen
    kandidaturen = kandidaturen.cloneNode(true)
    
    $( kandidaturen ).find(".kandidatur").not( "#kandidatur_hiddenexample" ).each(function(){data.push(get_kandidatur(this))})
    
    
    
    for( i = 0 ; i<  data.length;i++)
    {
        var vorlage = document.getElementById("stimmzettel_kandidatur_hiddenexample")
        var clone = vorlage.cloneNode(true)
        clone.id = ""
        clone.style=""
        clone.setAttribute("class","kandidatur_script_added")
        $( clone ).find(".name1" ).text(data[i])
        

        document.getElementById("stimmzettel_kandidaturen").appendChild(clone)
    }
    if ($( "#shuffle_kandidaturen" ).is(":checked"))
    
    {
        shuffle_children(document.getElementById("stimmzettel_kandidaturen"))
    }
    if (data.length <= document.getElementById('zahl_sitze').value)
    {
       var vorlage = document.getElementById("stimmzettel_kandidatur_hiddenexample")
        var clone = vorlage.cloneNode(true)
        clone.id = ""
        clone.style=""
        clone.setAttribute("class","kandidatur_script_added")
        $( clone ).find(".name1" ).text("________________________")
        document.getElementById("stimmzettel_kandidaturen").appendChild(clone)
    }
}

function get_kandidatur(element)
{
    //console.log(element)
    return element.getElementsByClassName("kandidatur_name")[0].value
}

// updatet den Name der Fachschaft
function update_fs_name()
{
    for (const element of document.getElementsByClassName('fachschaft')){
        element.innerText = $( "#fsname" ).val()
    }
}


//fügt eine kandidatur hinzu
function add_kandidatur(number=kandidaturcounter)
{
    var vorlage = document.getElementById("kandidatur_hiddenexample")
    var clone = vorlage.cloneNode(true);
    clone.id = ""
    clone.style=""
    $(clone).find('input').each(function(){this.setAttribute('name',this.getAttribute('name') + number)})
    kandidaturcounter++
    vorlage.parentNode.appendChild(clone);
    update()
}
function delete_kandidatur(element)
{
    document.getElementById("kandidaturen").removeChild(element.parentNode.parentNode.parentNode)
    update()
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
        if(json[key]["name"].startsWith("kandidatur"))
        {
            
            var regex = /\d+/
            var number = regex.exec(json[key]["name"])
            if (number)
            {
                number = number[0]
                if ($('.kandidatur' + number).length == 0)
                {
                    add_kandidatur(number)
                }
                $('.' + json[key]["name"]).each(function(){this.value = json[key]["value"]})
               
             }
        }
        if(json.hasOwnProperty(key))
            $('input[name='+json[key]['name']+']').val(json[key]['value']);
    }

}

function update_format()
{
    if ($( "#format" ).val() == 'A5')
    {
        make_a5()
    }
    else if ($( "#format" ).val() == 'A4')
    {
        make_a4()
    }
    else if ($( "#format" ).val() == 'A6')
    {
        make_a6()
    }
    else
    {
        console.log ($('#format').val())
       
    }
}

function remove_stimmzettel_copys()
{
    $('.stimmzettel').each(
        function(){
            if  (this.id != 'stimmzettel')
            {
                this.remove()
            }
        }
    )
    $("#stimmzettel-row1").each(function(){this.remove()})
}

function make_a4()
{
    remove_stimmzettel_copys()
    document.getElementById('stimmzettel-paper').setAttribute('class','a4') 
    document.getElementById('stimmzettel').setAttribute('class','stimmzettel')
}

function make_a5()
{   
    remove_stimmzettel_copys()
    
    document.getElementById('stimmzettel-paper').setAttribute('class','a5')
    document.getElementById('stimmzettel').setAttribute('class','col-sm-6 stimmzettel')
    
    var vorlage = document.getElementById("stimmzettel")
    var clone = vorlage.cloneNode(true);
    clone.id += '1'
    
    clone.className += " right";
    
    vorlage.parentNode.appendChild(clone);
}

function make_a6(){
    remove_stimmzettel_copys()
    document.getElementById('stimmzettel-paper').setAttribute('class','a6')
    document.getElementById('stimmzettel').setAttribute('class','col-sm-6 stimmzettel')
    
    var vorlage = document.getElementById("stimmzettel")
    var clone = vorlage.cloneNode(true);
    clone.id += '1'
    
    vorlage.parentNode.appendChild(clone);
    
    
    var vorlage2 = document.getElementById("stimmzettel-row")
    
    var clone = vorlage2.cloneNode(true);
    clone.id += '1'
    
    //clone.className += " right";
    
    vorlage2.parentNode.appendChild(clone);
    
}




