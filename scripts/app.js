        class WorkExperience {
            constructor(data) {
                Object.assign(this, data);

            }

            static html (workEx) {

            let date_range;
            let html;
            if (workEx.start_date == workEx.end_date) { date_range = `(${workEx.start_date})`;}
            else {date_range = `(${workEx.start_date} to ${workEx.end_date})`;}
            html = `<div><h3>${workEx.company}</h3><div class="block-date">`+
                    `<div class="date">${date_range}</div>`+
                            `<h4>${workEx.title}</h4>`+
                            `<p>${workEx.summary}</p></div><ul>`;
                               
                                for(var pt of workEx.bulletpt){
                   html += `<li>${pt.bullet}</li>`;
                    
                    };
            html += '</ul>';
            return html;
                
            }

        }


        function ajax_get_json() {
            let hr = new XMLHttpRequest();
            let url = "/json/workExp.json";
            let results = $("#work"); 
            let unit = "<div>";
            let map = new Map();
            hr.open("GET",url,true);
            hr.setRequestHeader("Content-type","application/json",true);
            hr.onreadystatechange =function() {
                if(hr.readyState == 4 && hr.status == 200) {
                    let data = JSON.parse(hr.responseText);
                    let key = 0;
                    for (var prof of data){
                    

                    map.set(key,new WorkExperience(prof));
                    key++;
                    }
    
                    for (var value of map.values()) {
  

                    results.append(WorkExperience.html(value));
                       }      
                   
                    }
                }
            hr.send(null);
        

            }
            


$(document).ready(function() {
        
       ajax_get_json();
})