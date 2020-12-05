var fristen = 
    {
        get_frist_wahlvorschlaege: function(){
            var first_day = $( "#datestart" ).datepicker( "getDate" );
            var start = new Date(first_day);
            start.setDate(start.getDate() - 13);
            var end = new Date(first_day);
            end.setDate(end.getDate() - 10);
            return {start:start,end:end}
        },
        get_frist_waehlendenverzeichnis: function(){
            var first_day = $( "#datestart" ).datepicker( "getDate" );
            var start = new Date(first_day);
            start.setDate(start.getDate() - 30);
            var end = new Date(first_day);
            end.setDate(end.getDate() - 10);
            return {start:start,end:end}
        },
        get_frist_auszaehlung: function(){
            var last_day = $( "#dateend" ).datepicker( "getDate" );
            var start = new Date(last_day);
            
            var end = new Date(last_day);
            end.setDate(end.getDate() +1);
            return {start:start,end:end}
        },
        get_frist_konsti: function(){
            var last_day = $( "#dateend" ).datepicker( "getDate" );
            var start = new Date(last_day);
            start.setDate(start.getDate() +5);
            var end = new Date(last_day);
            end.setDate(end.getDate() +14);
            return {start:start,end:end}
        },
        get_frist_wahlbekanntmachung: function(){
            var first_day = $( "#datestart" ).datepicker( "getDate" );
            var start = new Date(first_day);
            start.setDate(start.getDate() - 30);
            var end = new Date(first_day);
            end.setDate(end.getDate() - 18);
            return {start:start,end:end}
        },
        get_frist_letzter_wahltag: function(){
            var first_day = $( "#datestart" ).datepicker( "getDate" );
            var start = new Date(first_day);
            start.setDate(start.getDate() +2);
            var end = new Date(first_day);
            end.setDate(end.getDate() +4);
            return {start:start,end:end}
        },
        get_wahlzeitraum: function(){
            var first_day = $( "#datestart" ).datepicker( "getDate" );
            var start = new Date(first_day);
            
            var last_day = $( "#dateend" ).datepicker( "getDate" );
            var end = new Date(last_day);
            
            return {start:start,end:end}
        },
        
    }
