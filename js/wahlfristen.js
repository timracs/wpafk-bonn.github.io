function update(){
  var first_day = $( "#datestart" ).datepicker( "getDate" );
  var last_day  = $( "#dateend" ).datepicker( "getDate" );
  if(first_day != null && last_day != null){
    updateDates(first_day, last_day);
  }
}

function updateDates(first_day, last_day){
  var formatstring = "dd.mm.yy";
  d = new Date(first_day);
  d.setDate(d.getDate() - 30);
  $('#flwahltermin').text($.datepicker.formatDate( formatstring, d ));
  d = new Date(first_day);
  d.setDate(d.getDate() - 30);
  $('#wlundwa').text($.datepicker.formatDate( formatstring, d ));
  d = new Date(first_day);
  d.setDate(d.getDate() - 25);
  $('#konstwa').text($.datepicker.formatDate( formatstring, d ));
  d = new Date(first_day);
  d.setDate(d.getDate() - 19);
  $('#flaowvz').text($.datepicker.formatDate( formatstring, d ));
  d = new Date(first_day);
  d.setDate(d.getDate() - 18);
  $('#wbk').text($.datepicker.formatDate( formatstring, d ));
  d = new Date(first_day);
  d.setDate(d.getDate() - 15);
  $('#alwvzs').text($.datepicker.formatDate( formatstring, d ));
  d = new Date(first_day);
  d.setDate(d.getDate() - 11);
  $('#alwvze').text($.datepicker.formatDate( formatstring, d ));
  d = new Date(first_day);
  d.setDate(d.getDate() - 12);
  $('#wv').text($.datepicker.formatDate( formatstring, d ));
  d = new Date(first_day);
  d.setDate(d.getDate() - 9);
  $('#bkwv').text($.datepicker.formatDate( formatstring, d ));
  d = new Date(first_day);
  $('#ewt').text($.datepicker.formatDate( formatstring, d ));
  d = new Date(last_day);
  $('#lwt').text($.datepicker.formatDate( formatstring, d ));
  d = new Date(last_day);
  d.setDate(d.getDate() + 3);
  $('#vwep').text($.datepicker.formatDate( formatstring, d ));
  d = new Date(last_day);
  d.setDate(d.getDate() + 14);
  $('#konstfsv').text($.datepicker.formatDate( formatstring, d ));
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
