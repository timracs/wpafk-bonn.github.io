var date_formatstring = "dd.mm.yy";



var fields_json = 

    [
        {
            name:"datestart",
            label:"Erster Wahltag",
            type:"text",
            default_value:"14.12.2020",
            datepicker:true,
            onupdate:function(){
                        var self = document.getElementById('datestart')
                        $( self ).datepicker("option", "beforeShowDay", function(date){return [date.getDay() != 0 && date.getDay() <=3]})
                        //$( self ).datepicker("option", "maxDate", new Date())
                       return self.value
            }
        },
        {
            name:"dateend",
            label:"Letzter Wahltag",
            type:"text",
            default_value:"16.12.2020",
            datepicker:true,
            onupdate:function(){
                        var self = document.getElementById('dateend')
                        $( self ).datepicker("option", "beforeShowDay", $.datepicker.noWeekends)
                        
                        var fristen_letzter_wahltag = fristen.get_frist_letzter_wahltag()
                        $( self ).datepicker("option", "minDate", fristen_letzter_wahltag.start)
                        $( self ).datepicker("option", "maxDate", fristen_letzter_wahltag.end)
                       return self.value
            }
        },
        {
            name:"wahlzeitraum",
            label:"Wahlzeitraum",
            type:"text",
            default_value:"ein Zeitraum",
            disabled:true,
            hidden:true,
            onupdate:function(){
                        
                        var first_day = $.datepicker.formatDate( date_formatstring, $( "#datestart" ).datepicker( "getDate" ))
                        var last_day = $.datepicker.formatDate( date_formatstring, $( "#dateend" ).datepicker( "getDate" ))
                        return "von "+ first_day + " bis " + last_day
            }
        },
        {
            name:"wahlzeitraum_engl",
            label:"Wahlzeitraum (englisch)",
            type:"text",
            default_value:"a timeperiod",
            disabled:true,
            hidden:true,
            onupdate:function(){
                        var first_day = $.datepicker.formatDate( date_formatstring, $( "#datestart" ).datepicker( "getDate" ))
                        var last_day = $.datepicker.formatDate( date_formatstring, $( "#dateend" ).datepicker( "getDate" ))
                        return "from "+ first_day + " to " + last_day
            }
        },
        {
            name:"fachschaft",
            label:"wählende Fachschaft",
            type:"text",
            default_value:"YOLO"
        },
        {
            name:"anzwahlberechtigte",
            label:"Anzahl der Wahlberechtigten",
            type:"number",
            default_value:"750"
        },
        {
            name:"fsvsatzung",
            label:"Wahl einer FSV in der Fachschaftssatzung vorgeschrieben",
            type:"checkbox",
            default_value:""
        },
        {
            name:"fsvfsr",
            label:"Zu wählendes Gremium",
            type:"text",
            default_value:"Fachschaftsvertretung",
            disabled:true,
            hidden:false,
            onupdate:function(){
                        if ($( "#fsvsatzung" ).is(":checked"))
                            return "Fachschaftsvertretung"
                        else if ($( "#anzwahlberechtigte" ).val() > 500)
                            return "Fachschaftsvertretung"
                        else
                            return "Fachschaftsrat" 
            }
        },
        {
            name:"derdesfsvfsr",
            label:"Pronomen des/der FSR/FSV im Genitiv",
            type:"text",
            default_value:"der",
            disabled:true,
            hidden:true,
            onupdate:function(){
                       if ($( "#fsvfsr" ).val() == "Fachschaftsvertretung")
                            return "der"
                        else
                            return "des" 
            }
        },
        {
            name:"diederfsvfsr",
            label:"Pronomen des/der FSR/FSV im Nominativ",
            type:"text",
            default_value:"die",
            disabled:true,
            hidden:true,
            onupdate:function(){
                       if ($( "#fsvfsr" ).val() == "Fachschaftsvertretung")
                            return "die"
                        else
                            return "der" 
            }
        },
        {
            name:"zahl_sitze",
            label:"Anzahl der zu besetzenden Sitze",
            type:"number",
            default_value:"11",
            disabled:true,
            hidden:false,
            onupdate:function(){
                       if ($( "#anzwahlberechtigte" ).val() > 2000)
                            return "19"
                        else if ($( "#anzwahlberechtigte" ).val() > 1000)
                            return "15" 
                        else
                            return "11"
            }
        },
        {
            name:"wahlleitung",
            label:"Wahlleitung",
            type:"text",
            default_value:"Mister X"
        },
        
        {
            name:"datum_konstituierende_sitzung",
            label:"Datum der Konstituierenden Sitzung)",
            type:"text",
            default_value:"19.11.2020",
            datepicker:true,
            onupdate:function(){
                        var self = document.getElementById('datum_konstituierende_sitzung')
                        
                        var frist_konsti = fristen.get_frist_konsti()
                        $( self ).datepicker("option", "minDate", frist_konsti.start)
                        $( self ).datepicker("option", "maxDate", frist_konsti.end)
                    
                       
                       return self.value
            }
        },
        {
            name:"ort_konstituierende_sitzung",
            label:"Ort der konstituierenden Sitzung",
            type:"text",
            default_value:"in Raum 0.016 im BIFI"
        },
        {
            name:"ort_konstituierende_sitzung_engl",
            label:"Ort der konstituierenden Sitzung (englisch)",
            type:"text",
            default_value:"in room 0.016 in BIFI builiding"
        },
        {
            name:"uhrzeit_konstituierende_sitzung",
            label:"Uhrzeit der konstituierenden Sitzung",
            type:"text",
            default_value:"20:00",
            clockpicker:true
        },
        {
            name:"datum_wahlergebnis",
            label:"Datum der Veröffentlichung des Wahlergebnisses",
            type:"text",
            default_value:"11.11.2020",
            datepicker:true,
            onupdate:function(){
                        var self = document.getElementById('datum_wahlergebnis')
                        
                        var frist_wahlergebnis = fristen.get_frist_wahlergebnis()
                        $( self ).datepicker("option", "minDate", frist_wahlergebnis.start)
                        $( self ).datepicker("option", "maxDate", frist_wahlergebnis.end)
                    
                       
                       return self.value
            }
        },
        {
            name:"ort_wahlergebnis",
            label:"Ort der Veröffentlichung des Wahlergebnisses",
            type:"text",
            default_value:"Bonn",
            
        },
        {
            name:"gueltige_stimmen",
            label:"Abgegebene, gültige Stimmen",
            type:"number",
            default_value:"1",
            disabled:false,
            
        },
        {
            name:"ungueltige_stimmen",
            label:"Abgegebene, ungültige Stimmen",
            type:"number",
            default_value:"0",
            
        },
        {
            name:"abgegebene_stimmen",
            label:"Abgegebene Stimmen",
            type:"number",
            default_value:"0",
            disabled:true,
            onupdate:function(){
                        var self = document.getElementById('abgegebene_stimmen')
                        
                        var gueltige_stimmen = Number($( "#gueltige_stimmen" ).val())
                        var ungueltige_stimmen = Number($( "#ungueltige_stimmen" ).val())
                    
                       
                       return gueltige_stimmen + ungueltige_stimmen
            }
            
        },
        {
            name:"wahlbeteiligung",
            label:"Wahlbeteiligung (in %)",
            type:"number",
            default_value:"0",
            disabled:true,
            onupdate:function(){
                        var self = document.getElementById('wahlbeteiligung')
                        
                        var gueltige_stimmen = Number($( "#gueltige_stimmen" ).val())
                        var wahlberechtigte = Number($( "#anzwahlberechtigte" ).val())
                    
                       
                       return (gueltige_stimmen/wahlberechtigte*100).toFixed(2)
            }
            
        },
        {
            name:"teilergebnisse",
            label:"Teilergebnisse",
            type:"dynamical_list",
            add_button_text:"Teilergebnis hinzufügen",
            //add_button_onlick:"add_urnenstandort()",
            listitem_heading:"Teilergebnis",
            listitem_fields:[
                {
                    name:"",
                    label:"Position",
                    type:"number",
                    default_value:1337,
                    disabled:true,
                },
                {
                    name:"",
                    label:"Kandidat:in",
                    type:"text",
                    default_value:"Max Musterperson",
                    
                },
                {
                    name:"",
                    label:"erhaltene Stimmen",
                    type:"number",
                    default_value:"0",
                },
                {
                    name:"",
                    label:"erhaltene Stimmen in Prozent",
                    type:"number",
                    default_value:"0",
                    disabled:true
                },

            ],
            onupdate:function(){
                var self = document.getElementById('teilergebnisse')
                
                $( self ).find(".dynamical_list_item").each(function(index)
                                                    {
                                                        console.log(index)
                                                        $( this) .find('.form-group input').eq(0).val(index+1)
                                                        var erhaltene_stimmen = Number($( this) .find('.form-group input').eq(2).val())
                                                        var gueltige_stimmen = Number($( "#gueltige_stimmen").val())
                                                        var stimmanteil = erhaltene_stimmen/gueltige_stimmen
                                                        $( this) .find('.form-group input').eq(3).val((stimmanteil*100).toFixed(2))
                                                        console.log(stimmanteil)
                                                    })
            }
            
        },
    ]
    

