/**
 * Created by krishnasagar on 18/9/16.
 */

function f1(tag, link, like) {
    var numFound = 0;
    if(window.localStorage.getItem('results')) {f3(tag, link, like);}
    else {
            $.ajax({
            url : "https://hackerearth.0x10.info/api/one-push?type=json&query=list_websites",
            type : "GET",
            cache: true,
            success : function(result) {
                var res = result['websites'];
                var total = res.length;
                window.localStorage.setItem('results',JSON.stringify(res));
                $("#nextBttns").hide().empty();
                $("#listCon > ul").hide().empty();
                for(var i = 0;i<total;i++) {
                    if(res[i]['tag'].toLowerCase() == "personal") {
                        numFound += 1;
                    }

                    var li;
                    if(i<4) {
                        li = $("<li>", {id:'portfolio', class: i.toString()});
                    }
                    else {
                        li = $("<li>", {id:'portfolio', class: i.toString()}).hide();
                    }
                    var img=$("<img>", {id:"avatarid"});
                    if(res[i]['favicon_image']) {
                        img.attr('src', res[i]['favicon_image']);
                    }
                    else {
                        img.attr('src', '');
                    }
                    li.append(img);
                    var dt = $("<dt>", {id:"name"});
                    if(res[i]['title']) {
                        dt.text(res[i]['title']);
                    }
                    else {
                        dt.text("");
                    }
                    li.append(dt);
                    var dd = $("<dd>", {id:"details"});
                    dd.append($("<img>", {id:"tagId", src: tag}));
                    if(res[i]['tag']) {
                        dd.append(res[i]['tag'] + " | ");
                    }
                    else {dd.append(" | ");}
                    dd.append($("<img>", {id:"linkId", src: link}));
                    var a = $("<a>", {target:"_blank"});
                    if(res[i]['url_address']) {
                        a.attr('href', res[i]['url_address']).text(res[i]['url_address']);
                    }
                    else {a.attr('href', ' ').text('No address');}
                    dd.append(a);
                    dd.append($("<img>", {id:"likeid", src:like}).click(function() {
                        var divlikes = $(this).parent().find("#divlikes");
                        divlikes.text(parseInt(divlikes.text())+1);
                    }));
                    dd.append($("<span>", {id:"divlikes", class:"badge"}).text("0"));
                    li.append(dd);
                    $("#listCon > ul").append(li);
                }
                $("#info2").append("We'hv found <kbd>" + numFound +"</kbd> personal web portfolio");

                $("#listCon > ul").show("slow");
                for(var j = 3;j<total;j++) {
                    $("#nextBttns").append($("<button>",{type:"button",class:"btn btn-primary"}).text(j+1).click(function(){
                        //f3($(this), tag, link, like, total);
                        var t = parseInt($(this).text());
                        $("." + (t-4).toString()).replaceWith($("." + (t-3).toString()));
                        $("." + t).show();
                    }));
                }
                $("#nextBttns").show("slow");
            },
        });
    }
    setTimeout(f2, 1500);
}

function f2() {
    $("#loader").css("display", "none");
    $("#listCon").css("display", "inline-block");
}

function f3(tag, link, like) {
    var res = JSON.parse(window.localStorage.getItem('results'));
    var total = res.length;
    var numFound = 0;
    $("#nextBttns").hide().empty();
    $("#listCon > ul").hide().empty();
    for(var i = 0;i<total;i++) {
        if(res[i]['tag'].toLowerCase() == "personal") {
            numFound += 1;
        }

        var li;
        if(i<4) {
            li = $("<li>", {id:'portfolio', class: i.toString()});
        }
        else {
            li = $("<li>", {id:'portfolio', class: i.toString()}).hide();
        }
        var img=$("<img>", {id:"avatarid"});
        if(res[i]['favicon_image']) {
            img.attr('src', res[i]['favicon_image']);
        }
        else {
            img.attr('src', '');
        }
        li.append(img);
        var dt = $("<dt>", {id:"name"});
        if(res[i]['title']) {
            dt.text(res[i]['title']);
        }
        else {
            dt.text("");
        }
        li.append(dt);
        var dd = $("<dd>", {id:"details"});
        dd.append($("<img>", {id:"tagId", src: tag}));
        if(res[i]['tag']) {
            dd.append(res[i]['tag'] + " | ");
        }
        else {dd.append(" | ");}
        dd.append($("<img>", {id:"linkId", src: link}));
        var a = $("<a>", {target:"_blank"});
        if(res[i]['url_address']) {
            a.attr('href', res[i]['url_address']).text(res[i]['url_address']);
        }
        else {a.attr('href', ' ').text('No address');}
        dd.append(a);
        dd.append($("<img>", {id:"likeid", src:like}).click(function() {
            var divlikes = $(this).parent().find("#divlikes");
            divlikes.text(parseInt(divlikes.text())+1);
        }));
        dd.append($("<span>", {id:"divlikes", class:"badge"}).text("0"));
        li.append(dd);
        $("#listCon > ul").append(li);
    }
    $("#info2").append("We'hv found <kbd>" + numFound +"</kbd> personal web portfolio");

    $("#listCon > ul").show("slow");
    for(var j = 3;j<total;j++) {
        $("#nextBttns").append($("<button>",{type:"button",class:"btn btn-primary"}).text(j+1).click(function(){
            //f3($(this), tag, link, like, total);
            var t = parseInt($(this).text());
            $("." + (t-4).toString()).replaceWith($("." + (t-3).toString()));
            $("." + t).show();
        }));
    }
    $("#nextBttns").show("slow");
    setTimeout(f2, 1500);
}

$("#bttnPush").click(function() {
    if(window.localStorage.getItem('button')) {
        $("#container2").append($("<div>", {class:"alert alert-info"}).append("<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Info!</strong> Addition in website is allowed after 1 hour."));
    }
    else {
        var title = $("#titleIn").val(), url = $("#urlIn").val(), tag = $("#tagIn").val();
        var name_regex = /^[a-zA-Z]+$/, url_regex = /^(http(s)?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
        if(!title.match(name_regex) || title.length == 0) {
            $("#titleIn").val("");
            $("#container2").append($("<div>", {class:"alert alert-danger"}).append("<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Danger!</strong> Enter title value properly."));
        }
        else if(url.length==0 || !url_regex.test(url)) {
            $("#urlIn").val("");
            $("#container2").append($("<div>", {class:"alert alert-danger"}).append("<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Danger!</strong> Enter url in standard fashion."));
        }
        else if(!tag.match(name_regex) || tag.length == 0) {
            $("#tagIn").val("");
            $("#container2").append($("<div>", {class:"alert alert-danger"}).append("<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Danger!</strong> Enter tag field properly."));
        }
        else {
            $.ajax({
                url : 'https://hackerearth.0x10.info/api/one-push?type=json&query=push',
                type : "POST",
                data : {'title':title,'url':url, 'tag':tag},
                success: function () {
                    $("#titleIn").val("");
                    $("#urlIn").val("");
                    $("#tagIn").val("");
                }
            });
            $(this).attr('disabled', 'disabled');
            f4($(this));
            $("#container2").append($("<div>", {class:"alert alert-info"}).append("<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Info!</strong> Success .... Addition in website is allowed after 1 hour."));
            window.localStorage.setItem('button', 'yes');
        }
    }
});

function f4(ele) {
    setTimeout (function() {
        ele.attr('disabled','');
        window.localStorage.delete('button');
    }, 1000 * 60);
}

$('#searchBttn').click(function(e) {
        if (e.keyCode == 13) {
            var txt = $("#searchbox").val().toLowerCase();
            //var li = $("#portfolio:contains(' "+ txt +" ')").find('*');
            if(window.localStorage.getItem('results')) {
                var liArr = [],ul = $("<ul>", {style:"list-style-type : None;"});
                var dl = $("<dl>", {id:"listCon"});
                $.each(JSON.parse(window.localStorage.getItem('results')), function(i,obj) {
                    var t=false,u=false,tg=false;
                    if(obj['title'].toLowerCase().indexOf(txt)>0) { t=true;}
                    if(obj['url_address'].toLowerCase().indexOf(txt)>0) {u=true;}
                    if(obj['tag'].toLowerCase().indexOf(txt)>0) {tg=true;}
                    console.log(t + u + tg);
                    if(t == true || u == true || tg == true) {
                        console.log(obj['title'] + obj['url_address'] + obj['tag']);
                        var li = $("<li>", {id:"portfolio"});
                        var dd = $("<dd>", {id:"details"});
                        dd.append($("<img>", {id:"tagId", src:tag}) + " ");
                        dd.append(obj['tag'] + " | ");
                        dd.append($("<img>", {id:"linkId", src:link}));
                        dd.append($("<a>", {href:obj['url_address'],target:"_blank"}).text(obj['url_address']));
                        dd.append($("<img>", {src:like}));
                        dd.append($("<span>", {class:"badge", id:"divlikes"}).text("0"));
                        li.append($("<img>", {id:"avatarid", src:obj['favicon_image']}));
                        li.append($("<dt>", {id:"name"}).text(obj['title']));
                        li.append(dd);
                        dl.append(li);
                    }
                });
                $("#searchBody").empty().append(dl);
            }
        }
});