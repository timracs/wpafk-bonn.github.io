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
            start.setDate(start.getDate() - 13);
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
        }
        
    }
