function load_fields(parent_id)
{
    $.datepicker.setDefaults( $.datepicker.regional[ "de" ] );
    for (field_data_index in fields_json) 
    {
        
        var data = fields_json[field_data_index]
        if (data.type == "dynamical_list")
        {
            document.getElementById(parent_id).appendChild(create_dynamical_list(data))
        }
        else
            document.getElementById(parent_id).appendChild(create_field(data))
    }
}

function create_field(data)
{
    var div = document.createElement("div")
    div.setAttribute("class","form-group")
        
        var label = document.createElement("label")
        label.setAttribute("class","col-sm-3")
        label.setAttribute("for",data.name)
        label.innerHTML=data.label
        
        var input = document.createElement("input")
        input.setAttribute("type",data.type)
        input.setAttribute("id",data.name)
        input.setAttribute("class","col-sm-5")
        input.setAttribute("value",data.default_value)
        input.onchange = function() {
            update_fields(data)
        }
        if (data.disabled)
        {
            input.setAttribute("disabled","disabled")
        }
    if (data.hidden)
    {
        div.setAttribute("style","display:none")
    }
   
    div.appendChild(label)    
    div.appendChild(input) 
    
    if (data.datepicker)
    {
        $(input).datepicker({dateFormat: "dd.mm.yy", firstDay: 1, onSelect: function(){update_fields(data);}});
    }
    if (data.clockpicker)
    {
        $(input).clockpicker()
    }   
    return div
    
    
}

//erzeugt eine dynamische liste zB für urnenstandorte
function create_dynamical_list(data)
{
    var div = document.createElement("div")
    div.setAttribute("id",data.name)
        var heading = document.createElement("h3")
        heading.innerHTML = data.label
        
        var add_button = document.createElement("button")
        add_button.setAttribute("type","button")
        add_button.innerHTML=data.add_button_text
        add_button.onclick = function() {
            add_list_entry(div,data)
        }
        
        
        
    div.appendChild(heading)
    div.appendChild(add_button)
    return div
}

//fügt einer dynamischen liste ein element hinzu
function add_list_entry(parent,data)
{
    var listitem = document.createElement("div")
    listitem.setAttribute("class","dynamical_list_item")
    //listitem.setAttribute("style","display:none")
    
        var listitem_heading = document.createElement("h4")
        listitem_heading.innerHTML = data.listitem_heading
    
    listitem.appendChild(listitem_heading)
    
    for (i in data.listitem_fields)
    {   
       var listitem_data = data.listitem_fields[i]
       listitem.appendChild(create_field(listitem_data)) 
    }
        var listitem_delete = document.createElement("button")
        listitem_delete.innerHTML = data.listitem_heading + " entfernen"
        listitem_delete.onclick = function(){
            delete_list_entry(listitem)
        }
        listitem.appendChild(listitem_delete)
    parent.appendChild(listitem)
    update_fields()
}

function delete_list_entry(entry)
{
    entry.parentNode.removeChild(entry)
    update_fields()
}

function update_fields()
{
    for (field_data_index in fields_json) 
    {
        
        var data = fields_json[field_data_index]
        if (data.type == "dynamical_list")
        {
            var parent = document.getElementById(data.name + "_table")
            update_dynamical_list(data,parent)
        }
        else
            update_field(data)
    }
}

function update_dynamical_list(data,parent)
{
    $( parent ).find(".scriptgenerated").remove()
    var list_data = get_dynamical_list_data(data.name)
    for (i=0;i<list_data.length;i++){
        var tr = document.createElement('tr')
        for (j=0;j<list_data[i].length;j++)
        {
            var td = document.createElement('td')
            td.setAttribute('class',list_data[i][j].label)
            td.classList.add("scriptgenerated")
            td.innerHTML = list_data[i][j].value
            tr.appendChild(td)
        }
        parent.appendChild(tr)
    }
    if (typeof data.onupdate != 'undefined') {
        data.onupdate()
        //$( "#"+data.name ).val(value) 
    }
}

function get_dynamical_list_data(id)
{   
    var return_list = []
    
    var parent = document.getElementById(id)
    var list = parent.getElementsByClassName('dynamical_list_item')
    for (i=0;i < list.length;i++){
        var listitem = list[i]
        var listitem_children = list[i].getElementsByClassName('form-group')
        var return_item = []
        for (j=0; j < listitem_children.length;j++){
        
            return_item.push({
                label:listitem_children[j].getElementsByTagName("label")[0].innerHTML,
                value:listitem_children[j].getElementsByTagName("input")[0].value
            });
        }
        
        return_list.push(return_item)
    }
    return return_list
}

function update_field(data)
{   
    
    if (typeof data.onupdate !== 'undefined') {
        var value = data.onupdate()
        $( "#"+data.name ).val(value) 
    }
    
    
    for (const element of document.getElementsByClassName(data.name)){
        element.innerHTML = $( "#"+data.name ).val()
    }
}

function create_json()
{
    var data = {}
    for (field_data_index in fields_json) 
    {
        var name = fields_json[field_data_index].name
        var value = ""
        if (fields_json[field_data_index].type == "checkbox")
        {
            value = document.getElementById(name).checked
        }
        else if (fields_json[field_data_index].type == "dynamical_list")
        {
            value = get_dynamical_list_data(name)
        }
        else
            value = document.getElementById(name).value
        data[name] = value
    }
    return JSON.stringify(data,null,0); 
}

function load_json(json)
{
    var data = JSON.parse(json)
    for (field_data_index in fields_json) 
    {
        var name = fields_json[field_data_index].name
        var value = data[name]
        if (fields_json[field_data_index].type == "checkbox")
        {
            document.getElementById(name).checked = value
        }
        else if (fields_json[field_data_index].type == "dynamical_list")
        {
            var parent = document.getElementById(name )
            template = fields_json[field_data_index]
            for (ii=0;i<value.length;ii++)
            {
                for(j=0;j<template.listitem_fields.length;j++)
                {
                    var new_value = template.listitem_fields[j].default_value
                    for (k=0;k<value[i].length;k++)
                    {
                        if(value[ii][k].label == template.listitem_fields[j].label)
                        {
                            new_value = value[i][k].value
                            //break
                        }
                    }
                    template.listitem_fields[j].default_value = new_value
                }
                
                add_list_entry(parent,template)
            }
        }
        else
            document.getElementById(name).value = value

    }
}

function create_link()
{
    var json = create_json()
    var base64_string = btoa(encodeURIComponent(json))
    var textfield = document.getElementById("link-copy-area")
    var getUrl = window.location
    textfield.value = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname + "?data=" + base64_string
    var button = document.getElementById("generate_link")
    button.title = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname + "?data=" + base64_string
}

function copy_link()
{       
    create_link()
    var textfield = document.getElementById("link-copy-area")
    textfield.setAttribute("class","")
    textfield.select()
    textfield.focus()
    document.execCommand('copy')
    textfield.setAttribute("class","hidden")
}

function load_link()
{
    var url_string = window.location
    var url = new URL(url_string);
    var base64_string = url.searchParams.get("data");
    if (base64_string)
    {
        var json_string = decodeURIComponent(atob(base64_string))
        load_json(json_string)
        update_fields()
    }
}

function save_to_local_storage(key)
{
    var json = create_json()
    var base64_string = btoa(encodeURIComponent(json))
    localStorage.setItem(key,base64_string)
}

function load_from_local_storage(key)
{
    var base64_string = localStorage.getItem(key)
    if (base64_string)
    {
        var json_string = decodeURIComponent(atob(base64_string))
        load_json(json_string)
        update_fields()
    }
}

function hide(element)
{
    element.classList.add('hidden')
}

function unhide(element)
{
    element.classList.remove('hidden')
}

function on_pageload()
{
    load_fields("wahl_fields")
    update_fields()
    load_link()
    
}
