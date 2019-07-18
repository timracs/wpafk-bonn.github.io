function update(){
  var first_day = $( "#datestart" ).datepicker( "getDate" );
  var last_day  = $( "#dateend" ).datepicker( "getDate" );
  if(first_day != null && last_day != null){
    updateDates(first_day, last_day);
  }
}

function updateDates(first_day, last_day){
  var formatstring = "dd.mm.yy";
  //Festlegung Wahltermin 
  d = new Date(first_day);
  d.setDate(d.getDate() - 30);
  $('#flwahltermin').text($.datepicker.formatDate( formatstring, d ));
  //Wahl: Wahlleitung und Wahlausschuss
  d = new Date(first_day);
  d.setDate(d.getDate() - 30);
  $('#wlundwa').text($.datepicker.formatDate( formatstring, d ));
  //Stichtag Wahlberechtigung
  d = new Date(first_day);
  d.setDate(d.getDate() - 30);
  $('#stwber').text($.datepicker.formatDate( formatstring, d ));
  //konstituierende Sitzung des Wahlausschusses
  d = new Date(first_day);
  d.setDate(d.getDate() - 25);
  $('#konstwa').text($.datepicker.formatDate( formatstring, d ));
  //Festlegung Auslage des Wählendenverzeichnis (Fristen, Termine, Orte)
  d = new Date(first_day);
  d.setDate(d.getDate() - 25);
  $('#flaowvz').text($.datepicker.formatDate( formatstring, d ));
  //Übernahme Wählendenverzeichnis
  d = new Date(first_day);
  d.setDate(d.getDate() - 19);
  $('#uebernahmewvz').text($.datepicker.formatDate( formatstring, d ));
  //Wahlbekanntmachung
  d = new Date(first_day);
  d.setDate(d.getDate() - 18);
  $('#wbk').text($.datepicker.formatDate( formatstring, d ));
  //Auslage Wählendenverzeichnis (Start)
  d = new Date(first_day);
  d.setDate(d.getDate() - 13);
  $('#alwvzs').text($.datepicker.formatDate( formatstring, d ));
  //Auslage Wählendenverzeichnis (Ende)
  d = new Date(first_day);
  d.setDate(d.getDate() - 10);
  $('#alwvze').text($.datepicker.formatDate( formatstring, d ));
  //Frist zur Einreichung von Wahlvorschlägen (frühestens)
  d = new Date(first_day);
  d.setDate(d.getDate() - 13);
  $('#wvs').text($.datepicker.formatDate( formatstring, d ));
  //Frist zur Einreichung von Wahlvorschlägen (spätestens)
  d = new Date(first_day);
  d.setDate(d.getDate() - 10);
  $('#wve').text($.datepicker.formatDate( formatstring, d ));
  //Bekanntmachung von Wahlvorschlägen
  d = new Date(first_day);
  d.setDate(d.getDate() - 9);
  $('#bkwv').text($.datepicker.formatDate( formatstring, d ));
  //Frist zur Einreichung von Briefwahlanträgen Start
  d = new Date(first_day);
  d.setDate(d.getDate() - 13);
  $('#fbws').text($.datepicker.formatDate( formatstring, d ));
  //Frist zur Einreichung von Briefwahlanträgen Ende
  d = new Date(first_day);
  d.setDate(d.getDate() - 10);
  $('#fbwe').text($.datepicker.formatDate( formatstring, d ));
  //Erster Wahltag
  d = new Date(first_day);
  $('#ewt').text($.datepicker.formatDate( formatstring, d ));
  //letzter Wahltag
  d = new Date(last_day);
  $('#lwt').text($.datepicker.formatDate( formatstring, d ));
  // Veröffentlichung des Wahlergebnisses
  d = new Date(last_day);
  d.setDate(d.getDate() + 3);
  $('#vwep').text($.datepicker.formatDate( formatstring, d ));
  //konstituierende FSV Sitzung
  d = new Date(last_day);
  d.setDate(d.getDate() + 5);
  $('#konstfsvs').text($.datepicker.formatDate( formatstring, d ));
   //konstituierende FSV Sitzung Ende
  d = new Date(last_day);
  d.setDate(d.getDate() + 14);
  $('#konstfsve').text($.datepicker.formatDate( formatstring, d ));
}

function resetDates(){
  $('#flwahltermin').text("-");
  $('#wlundwa').text("-");
  $('#konstwa').text("-");
  $('#flaowvz').text("-");
  $('#wbk').text("-");
  $('#alwvzs').text("-");
  $('#alwvze').text("-");
  $('#bkwv').text("-");
  $('#ewt').text("-");
  $('#lwt').text("-");
  $('#vwep').text("-");
  $('#konstfsv').text("-");
}
