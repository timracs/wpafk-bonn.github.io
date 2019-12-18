function update_link()
{
    var input_array = $('form').serializeArray()
    var input_string = btoa(JSON.stringify(input_array,null,2))
    //console.log(input_string)
    //console.log(JSON.parse(atob(input_string)))
    var textfield = document.getElementById("link-copy-area")
    var getUrl = window.location
    textfield.value = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname + "?data=" + input_string
    var button = document.getElementById("generate_link")
    button.title = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname + "?data=" + input_string
    
    //copy_link()
   
}

function copy_link()
{
    var textfield = document.getElementById("link-copy-area")
    textfield.setAttribute("class","")
    textfield.select()
    textfield.focus()
    document.execCommand('copy')
    textfield.setAttribute("class","hidden")
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

