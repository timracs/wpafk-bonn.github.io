var date_formatstring = "dd.mm.yy";



var fields_json = 

    [
        {
            name:"datestart",
            label:"Erster Wahltag",
            type:"text",
            default_value:"14.12.2020",
            datepicker:true
        },
        {
            name:"dateend",
            label:"Letzter Wahltag",
            type:"text",
            default_value:"16.12.2020",
            datepicker:true
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
            name:"wahlleitungkontakt",
            label:"Kontakt der Wahlleitung",
            type:"text",
            default_value:"misterX@uni-bonn.de"
        },
        {
            name:"frist_einreichung_wahlvorschlaege",
            label:"Gemeinsame Frist für die Einreichung von Kandidaturen, Briefwahlanträgen und Einsprüchen gegen das Wählendenverzeichnis",
            type:"text",
            default_value:"01.11.2020",
            datepicker:true,
            onupdate:function(){
                        var self = document.getElementById('frist_einreichung_wahlvorschlaege')
                        
                        var fristen_wahlvorschlaege = fristen.get_frist_wahlvorschlaege()

                        $( self ).datepicker("option", "minDate", fristen_wahlvorschlaege.start)
                        $( self ).datepicker("option", "maxDate", fristen_wahlvorschlaege.end)
                    
                       
                       return self.value
            }
        },
        {
            name:"frist_einreichung_wahlvorschlaege_uhrzeit",
            label:"Zeit",
            type:"text",
            default_value:"18:00",
            clockpicker:true
        },
        {
            name:"start_auslage_waehlerverzeichnis",
            label:"Auslage des Wählendenverzeichnisses (von)",
            type:"text",
            default_value:"29.10.2020",
            datepicker:true,
            onupdate:function(){
                        var self = document.getElementById('start_auslage_waehlerverzeichnis')
                        
                        var fristen_waehlendenverzeichnis = fristen.get_frist_waehlendenverzeichnis()
                        $( self ).datepicker("option", "minDate", fristen_waehlendenverzeichnis.start)
                        fristen_waehlendenverzeichnis.end.setDate(fristen_waehlendenverzeichnis.end.getDate() -2)
                        $( self ).datepicker("option", "maxDate", fristen_waehlendenverzeichnis.end)
                        //$( self ).datepicker("option", "maxDate", )
                    
                       
                       return self.value
            }
        },
        {
            name:"ende_auslage_waehlerverzeichnis",
            label:"Auslage des Wählendenverzeichnisses (bis)",
            type:"text",
            default_value:"01.11.2020",
            datepicker:true,
            onupdate:function(){
                        var self = document.getElementById('ende_auslage_waehlerverzeichnis')
                        
                        var fristen_waehlendenverzeichnis = fristen.get_frist_waehlendenverzeichnis()
                        fristen_waehlendenverzeichnis.start.setDate(fristen_waehlendenverzeichnis.start.getDate() +2)
                         $( self ).datepicker("option", "minDate", fristen_waehlendenverzeichnis.start)
                        //$( self ).datepicker("option", "minDate", fristen_waehlendenverzeichnis.start.setDate(fristen_waehlendenverzeichnis.start.getDate() +3))
                        $( self ).datepicker("option", "maxDate", fristen_waehlendenverzeichnis.end)
                    
                       
                       return self.value
            }
        },
        {
            name:"auslage_wv_ort",
            label:"Ort der Auslage",
            type:"text",
            default_value:"im FS-Büro"
        },
        {
            name:"auslage_wv_ort_engl",
            label:"Ort der Auslage (englisch)",
            type:"text",
            default_value:"in the office of studend body (room 0.006)"
        },
        {
            name:"zeit_auslegung_waehlerverzeichnis",
            label:"Zeit der Auslage",
            type:"text",
            default_value:"während der allgemeinen Öffnungszeiten"
        },
        {
            name:"zeit_auslegung_waehlerverzeichnis_engl",
            label:"Zeit der Auslage (englisch)",
            type:"text",
            default_value:"during opening hours"
        },
        {
            name:"datum_auszaehlung",
            label:"Datum der Auszählung",
            type:"text",
            default_value:"14.11.2020",
            datepicker:true,
            onupdate:function(){
                        var self = document.getElementById('datum_auszaehlung')
                        
                        var frist_auszaehlung = fristen.get_frist_auszaehlung()
                        $( self ).datepicker("option", "minDate", frist_auszaehlung.start)
                        $( self ).datepicker("option", "maxDate", frist_auszaehlung.end)
                    
                       
                       return self.value
            }
        },
        {
            name:"ort_auszaehlung",
            label:"Ort der Auszählung",
            type:"text",
            default_value:"im Foyer"
        },
        {
            name:"ort_auszaehlung_engl",
            label:"Ort der Auszählung (englisch)",
            type:"text",
            default_value:"in Foyer"
        },
        {
            name:"auszaelung_zeit",
            label:"Zeit der Auszählung ",
            type:"text",
            default_value:"18:30",
            clockpicker:true
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
            name:"urnenstandorte",
            label:"Urnenstandorte",
            type:"dynamical_list",
            add_button_text:"Urnenstandort hinzufügen",
            //add_button_onlick:"add_urnenstandort()",
            listitem_heading:"Urnenstandort",
            listitem_fields:[
                {
                    name:"",
                    label:"Datum",
                    type:"text",
                    default_value:"11.11.2020",
                    datepicker:true
                },
                {
                    name:"",
                    label:"von",
                    type:"text",
                    default_value:"10:00",
                    clockpicker:true
                },
                {
                    name:"",
                    label:"bis",
                    type:"text",
                    default_value:"18:00",
                    clockpicker:true
                },
                {
                    name:"",
                    label:"Ort",
                    type:"text",
                    default_value:"FOYER des YOLO-Instituts",
                },
            ]
        },
    ]
    

