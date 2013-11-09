
function expand_tasks(){
    for (var i in Capsule.capsules) {
            Capsule.capsules[i].expand();
    }
}

function task_details(tab){
    var first_name = $(tab).find(".capsulelink")[0].text;
    var first_url = $($(tab).find(".capsulelink")[1]).find("a")[0].href;
    
    var details = $($(tab).find("tr")[4]).find(".capsule_field_text");
    var requester_name = $(details[0]).find("a").text();
    var requester_url = $(details[0]).find("a")[0].href;
    var expiration_date = $(details[1]).text().trim();
    var time_allotted = $(details[2]).text().trim();
    var price = $(details[3]).text();
    var available_HITs = $(details[4]).text();
    var group_id = first_url.substring(first_url.indexOf("=") + 1);
    var requester_id = requester_url.substring(requester_url.indexOf("requesterId=") + 12);

    // expanded fields
    var capsule = $(tab).find(".capsuletarget").find(".capsule_field_text");
    var desc = $(capsule[0]).html();
    var keywords = $.map($(capsule[1]).children(), function(e) {return e.text});

    // check qualification
    var qual = $($(tab).find(".capsulelink")[1]).children().filter(":last")[0].href != "";

    
    return {
        "group_id":group_id,
        "requester_id":requester_id,
        "available_hits":available_HITs,
        "reward":price,
        "name":first_name,
        "description":desc,
        "time_allot":time_allotted,
        "expiration_date":expiration_date,
        "keywords":keywords,
        "requester_name":requester_name,
        "task_url":first_url,
        "qualified":qual 
    };
          
}

// the script
function make_json(){
    expand_tasks();
    var master_table = $("table")[6];
    var tasks = $(master_table).children().children();
    var task_tables = $.map(tasks, function(e) {
                        return $(e).children().children()[0]});
    var tasks_json = $.map(task_tables, function(e) {return task_details(e)});
    return tasks_json
}
