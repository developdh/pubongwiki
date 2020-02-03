function get_link_state(data, i = 0) { 
    console.log(i);
    console.log(data + 'link_finder');
    console.log(document.getElementsByClassName(data + 'link_finder')[i]);
    if(document.getElementsByClassName(data + 'link_finder')[i]) {
        var link_data = document.getElementsByClassName(data + 'link_finder')[i];

        var xhr = new XMLHttpRequest();
        xhr.open("GET", link_data.href.replace('/w/', '/api/w/') + "?exist=1", true);
        xhr.send(null);

        xhr.onreadystatechange = function() {
            if(this.readyState === 4 && this.status === 200) {
                if(JSON.parse(this.responseText)['exist'] !== '1') {
                    document.getElementsByClassName(data + 'link_finder')[i].id = "not_thing";
                } else {
                    document.getElementsByClassName(data + 'link_finder')[i].id = "";
                }

                get_link_state(data, i + 1);
            }
        }
    }
}

function get_file_state(data, i = 0) {       
    if(document.getElementsByClassName(data + 'file_finder_1')[i]) {
        var file_data = document.getElementsByClassName(data + 'file_finder_1')[i];

        var xhr = new XMLHttpRequest();
        xhr.open("GET", file_data.src.replace('/image/', '/api/image/'), true);
        xhr.send(null);
        
        xhr.onreadystatechange = function() {
            if(this.readyState === 4 && this.status === 200) {
                if(JSON.parse(this.responseText)['exist'] !== '1') {
                    document.getElementsByClassName(data + 'file_finder_1')[i].style = "display: none;";
                } else {
                    document.getElementsByClassName(data + 'file_finder_2')[i].innerHTML = "";
                }
            
                get_file_state(data, i + 1);
            }
        }
    }
}